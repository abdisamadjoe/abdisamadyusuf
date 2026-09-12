import cors from "cors"
import express from "express"
import rateLimit from "express-rate-limit"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import RiveScript from "rivescript"

/**
 * Minimal RiveScript resume-chatbot backend for abdisamadjoe.com.
 *
 * No AI, no LLM APIs, no database, no embeddings. Every reply comes from a
 * predefined rule in brain/resume.rive.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BRAIN_DIR = path.join(__dirname, "brain")

const PORT = Number(process.env.PORT) || 3001

/**
 * Comma-separated allow-list of origins, e.g.
 *   CORS_ORIGIN="https://abdisamadjoe.com,https://www.abdisamadjoe.com"
 * When unset, every origin is allowed — convenient for local development.
 */
const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)

const MAX_MESSAGE_LENGTH = 500

/** RiveScript only — the server never writes a reply of its own. */
/**
 * The live RiveScript instance.
 *
 * Held in a mutable binding because reloading requires a *fresh* bot:
 * `loadDirectory()` merges into the existing brain instead of replacing it, so
 * reusing one instance after an edit would leave the previous rules in memory
 * (89 triggers became 178 after two loads) and stale answers could win. Swapping
 * the whole instance makes an edit take effect immediately and exactly.
 */
let bot = new RiveScript({ utf8: true })

async function loadBrain() {
  const next = new RiveScript({ utf8: true })
  await next.loadDirectory(BRAIN_DIR)
  next.sortReplies()
  bot = next
}

await loadBrain()

// In development, reload the brain whenever resume.rive changes so answers can
// be edited without restarting the server. In production the brain is loaded
// once at boot.
if (process.env.NODE_ENV !== "production") {
  const brainFile = path.join(BRAIN_DIR, "resume.rive")
  let reloadTimer = null

  // Editors often write in several steps (truncate, then write). Debouncing
  // avoids parsing a half-written file.
  fs.watch(brainFile, { persistent: false }, () => {
    clearTimeout(reloadTimer)
    reloadTimer = setTimeout(() => {
      loadBrain()
        .then(() => console.log(`[brain] resume.rive reloaded (${bot._topics.random.length} triggers)`))
        .catch((error) => console.error("[brain] reload failed:", error))
    }, 120)
  })
}

const app = express()

// Behind Railway/Render/a reverse proxy, so rate limiting sees the real client.
app.set("trust proxy", 1)

app.use(
  cors({
    origin: ALLOWED_ORIGINS.length > 0 ? ALLOWED_ORIGINS : true,
    methods: ["POST", "GET", "OPTIONS"],
  })
)
app.use(express.json({ limit: "16kb" }))

// Lightweight in-memory rate limit: 30 messages per minute per IP. Enough for a
// recruiter reading a resume, tight enough to stop scripted abuse.
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    error: "Too many messages. Please wait a minute and try again.",
  },
})

app.get("/health", (_req, res) => {
  res.json({ status: "ok", brain: "resume.rive" })
})

/**
 * Friendly root page.
 *
 * This is an API, not a website — the chat UI lives in the portfolio. Opening
 * this URL in a browser should say so instead of showing Express's bare
 * "Cannot GET /".
 */
app.get("/", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ask Abdisamad — Assistant API</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
      :root {
        --bg: #090d16;
        --card-bg: rgba(17, 24, 39, 0.75);
        --card-border: rgba(255, 255, 255, 0.08);
        --text-main: #f3f4f6;
        --text-muted: #9ca3af;
        --accent: #6366f1;
        --accent-hover: #4f46e5;
        --accent-glow: rgba(99, 102, 241, 0.25);
        --success: #22c55e;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        background-color: var(--bg);
        color: var(--text-main);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        line-height: 1.6;
        background-image: 
          radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.1) 0px, transparent 50%);
      }
      header {
        border-bottom: 1px solid var(--card-border);
        padding: 1.25rem 2rem;
        backdrop-filter: blur(12px);
        background: rgba(9, 13, 22, 0.85);
        position: sticky;
        top: 0;
        z-index: 10;
      }
      .nav-container {
        max-width: 900px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 700;
        font-size: 1.1rem;
        text-decoration: none;
        color: var(--text-main);
      }
      .badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.35rem 0.85rem;
        border-radius: 9999px;
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.25);
        color: var(--success);
        font-size: 0.825rem;
        font-weight: 500;
      }
      .badge-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background-color: var(--success);
        box-shadow: 0 0 10px var(--success);
      }
      main {
        flex: 1;
        max-width: 900px;
        width: 100%;
        margin: 0 auto;
        padding: 3rem 1.5rem;
      }
      .hero {
        margin-bottom: 2.5rem;
      }
      .hero h1 {
        font-size: 2.25rem;
        font-weight: 800;
        letter-spacing: -0.025em;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, #ffffff 0%, #c7d2fe 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .hero p {
        color: var(--text-muted);
        font-size: 1.05rem;
        max-width: 620px;
      }
      .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      .card {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 1rem;
        padding: 1.75rem;
        backdrop-filter: blur(12px);
        box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6);
      }
      .card-title {
        font-size: 1.15rem;
        font-weight: 600;
        margin-bottom: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .suggestions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.25rem;
      }
      .chip {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--card-border);
        color: var(--text-muted);
        padding: 0.45rem 0.85rem;
        border-radius: 0.6rem;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .chip:hover {
        background: rgba(99, 102, 241, 0.18);
        color: #c7d2fe;
        border-color: rgba(99, 102, 241, 0.35);
      }
      .form-group {
        display: flex;
        gap: 0.75rem;
        margin-bottom: 1.25rem;
      }
      input[type="text"] {
        flex: 1;
        background: rgba(0, 0, 0, 0.35);
        border: 1px solid var(--card-border);
        border-radius: 0.6rem;
        padding: 0.75rem 1rem;
        color: var(--text-main);
        font-size: 0.95rem;
        outline: none;
        transition: all 0.2s;
      }
      input[type="text"]:focus {
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-glow);
      }
      button.btn-primary {
        background: var(--accent);
        color: white;
        border: none;
        border-radius: 0.6rem;
        padding: 0.75rem 1.5rem;
        font-weight: 600;
        font-size: 0.95rem;
        cursor: pointer;
        transition: background-color 0.2s, transform 0.1s;
      }
      button.btn-primary:hover {
        background-color: var(--accent-hover);
      }
      button.btn-primary:active {
        transform: scale(0.98);
      }
      .response-box {
        background: rgba(0, 0, 0, 0.45);
        border: 1px solid var(--card-border);
        border-radius: 0.6rem;
        padding: 1.25rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.875rem;
        white-space: pre-wrap;
        word-break: break-word;
        color: #e2e8f0;
        min-height: 90px;
      }
      .api-routes {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .route-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.85rem 1.25rem;
        background: rgba(0, 0, 0, 0.25);
        border: 1px solid var(--card-border);
        border-radius: 0.6rem;
      }
      .method {
        font-family: 'JetBrains Mono', monospace;
        font-weight: 700;
        font-size: 0.8rem;
        padding: 0.25rem 0.6rem;
        border-radius: 0.4rem;
      }
      .method.post { background: rgba(99, 102, 241, 0.2); color: #818cf8; }
      .method.get { background: rgba(34, 197, 94, 0.2); color: #4ade80; }
      .path {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.95rem;
        color: #f3f4f6;
      }
      .desc {
        color: var(--text-muted);
        font-size: 0.875rem;
        margin-left: auto;
      }
      footer {
        border-top: 1px solid var(--card-border);
        padding: 2rem 1.5rem;
        text-align: center;
        color: var(--text-muted);
        font-size: 0.875rem;
        margin-top: auto;
      }
      footer a {
        color: #a5b4fc;
        text-decoration: none;
      }
      footer a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <header>
      <div class="nav-container">
        <a href="https://abdisamadjoe.com" class="brand">
          <span>Abdisamad Yusuf</span>
        </a>
        <div class="badge">
          <span class="badge-dot"></span>
          <span>API Operational</span>
        </div>
      </div>
    </header>

    <main>
      <div class="hero">
        <h1>Career Assistant API</h1>
        <p>Interactive backend service powering the official assistant on abdisamadjoe.com.</p>
      </div>

      <div class="grid">
        <div class="card">
          <div class="card-title">
            <span>Interactive Playground</span>
          </div>
          
          <div class="suggestions">
            <button type="button" class="chip" onclick="setQuestion('What cybersecurity experience does he have?')">Cybersecurity experience</button>
            <button type="button" class="chip" onclick="setQuestion('What certifications does he hold?')">Certifications</button>
            <button type="button" class="chip" onclick="setQuestion('Tell me about his projects')">Projects</button>
            <button type="button" class="chip" onclick="setQuestion('Why should we hire him?')">Why hire him</button>
          </div>

          <form id="probe">
            <div class="form-group">
              <input id="q" type="text" value="What certifications does he hold?" placeholder="Type a question..." required />
              <button type="submit" class="btn-primary">Send Query</button>
            </div>
          </form>

          <pre id="out" class="response-box">Click "Send Query" or select a prompt above to test the API response...</pre>
        </div>

        <div class="card">
          <div class="card-title">Available Endpoints</div>
          <div class="api-routes">
            <div class="route-item">
              <span class="method post">POST</span>
              <span class="path">/api/chat</span>
              <span class="desc">Query career assistant</span>
            </div>
            <div class="route-item">
              <span class="method get">GET</span>
              <span class="path">/health</span>
              <span class="desc">Service health status</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <p>&copy; ${new Date().getFullYear()} Abdisamad Yusuf &bull; <a href="https://abdisamadjoe.com">Return to Portfolio</a></p>
    </footer>

    <script>
      function setQuestion(text) {
        document.getElementById("q").value = text;
        document.getElementById("probe").dispatchEvent(new Event("submit"));
      }

      document.getElementById("probe").addEventListener("submit", async (event) => {
        event.preventDefault();
        const out = document.getElementById("out");
        out.textContent = "Processing query...";
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              message: document.getElementById("q").value,
              userId: "playground-tester",
            }),
          });
          const data = await response.json();
          out.textContent = JSON.stringify(data, null, 2);
        } catch (error) {
          out.textContent = "Error: " + error.message;
        }
      });
    </script>
  </body>
</html>`)
})

app.post("/api/chat", chatLimiter, async (req, res) => {
  const { message, userId } = req.body ?? {}

  if (typeof message !== "string" || message.trim().length === 0) {
    res.status(400).json({ error: "A non-empty `message` string is required." })
    return
  }

  const text = message.trim().slice(0, MAX_MESSAGE_LENGTH)

  // The React client sends a per-session id; fall back to the client IP so
  // conversations never leak between visitors.
  const session = typeof userId === "string" && userId ? userId : req.ip || "anon"

  try {
    const reply = await bot.reply(session, text)

    // `bot.reply` returns an empty string when the brain has no reply — the
    // `*` fallback in resume.rive means this should not happen in practice.
    res.json({
      reply:
        reply ||
        "I don't have that information in Abdisamad's profile.\n\nTry asking me about his experience, cybersecurity background, projects, certifications, education, or skills.",
    })
  } catch (error) {
    console.error("[chat] RiveScript error:", error)
    res.status(500).json({
      error:
        "The assistant hit an unexpected error. Please try again, or email hello@abdisamadjoe.com.",
    })
  }
})

app.listen(PORT, () => {
  console.log(`Resume chatbot listening on http://localhost:${PORT}`)
  console.log(`  POST /api/chat   GET /health`)
})
