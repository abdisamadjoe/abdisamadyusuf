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
const bot = new RiveScript({ utf8: true })

async function loadBrain() {
  await bot.loadDirectory(BRAIN_DIR)
  bot.sortReplies()
}

await loadBrain()

// In development, reload the brain whenever resume.rive changes so answers can
// be edited without restarting the server. In production the brain is loaded
// once at boot.
if (process.env.NODE_ENV !== "production") {
  const brainFile = path.join(BRAIN_DIR, "resume.rive")

  fs.watch(brainFile, { persistent: false }, () => {
    loadBrain()
      .then(() => console.log("[brain] resume.rive reloaded"))
      .catch((error) => console.error("[brain] reload failed:", error))
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
  const ruleCount = bot._topics.random.length

  res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Resume chatbot API</title>
    <style>
      :root { color-scheme: light dark; }
      body {
        margin: 0; padding: 2.5rem 1.5rem;
        font: 15px/1.6 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
        background: Canvas; color: CanvasText;
      }
      main { max-width: 34rem; margin: 0 auto; }
      h1 { font-size: 1.25rem; margin: 0 0 .25rem; }
      p { margin: 0 0 1.25rem; opacity: .75; }
      code {
        padding: .15em .35em; border-radius: .35rem;
        background: color-mix(in oklab, CanvasText 8%, Canvas);
        font-size: .9em;
      }
      ul { padding-left: 1.1rem; margin: 0 0 1.5rem; }
      li { margin-bottom: .5rem; }
      .ok { color: #16a34a; font-weight: 600; }
      form { margin: 0 0 1rem; }
      input, button {
        font: inherit; padding: .55rem .7rem; border-radius: .5rem;
        border: 1px solid color-mix(in oklab, CanvasText 20%, Canvas);
        background: Canvas; color: CanvasText;
      }
      input { width: 100%; box-sizing: border-box; margin-bottom: .5rem; }
      button { cursor: pointer; font-weight: 500; }
      pre {
        white-space: pre-wrap; word-wrap: break-word;
        padding: .85rem 1rem; border-radius: .6rem; margin: 1rem 0 0;
        background: color-mix(in oklab, CanvasText 6%, Canvas);
        font-size: .875rem;
      }
      small { opacity: .65; display: block; margin-top: 1.75rem; }
    </style>
  </head>
  <body>
    <main>
      <h1>Resume chatbot API <span class="ok">&#10003; running</span></h1>
      <p>
        This is the RiveScript backend only — there is no page to browse here.
        The chat widget lives on the portfolio itself, at
        <strong>http://localhost:5173/</strong> (button in the bottom-right corner).
      </p>
      <ul>
        <li><code>POST /api/chat</code> — send <code>{ "message": "…", "userId": "…" }</code>, get <code>{ "reply": "…" }</code></li>
        <li><code>GET /health</code> — service status</li>
      </ul>
      <p><strong>${ruleCount}</strong> rules loaded from <code>brain/resume.rive</code>.
      Edit that file and the brain reloads automatically in development.</p>

      <form id="probe">
        <input id="q" value="What certifications does he have?" aria-label="Question" />
        <button type="submit">Send test question</button>
      </form>
      <pre id="out" hidden></pre>

      <small>
        Rule-based RiveScript. No AI, no API key, no database — answers come only
        from Abdisamad's resume file.
      </small>
    </main>
    <script>
      // Tiny inline tester so the endpoint can be checked without the site.
      document.getElementById("probe").addEventListener("submit", async (event) => {
        event.preventDefault();
        const out = document.getElementById("out");
        out.hidden = false;
        out.textContent = "…";
        try {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              message: document.getElementById("q").value,
              userId: "browser-probe",
            }),
          });
          const data = await response.json();
          out.textContent = data.reply || JSON.stringify(data);
        } catch (error) {
          out.textContent = "Request failed: " + error.message;
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
