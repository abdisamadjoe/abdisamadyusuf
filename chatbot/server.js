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
 * When unset, every origin is allowed - convenient for local development.
 */
const ALLOWED_ORIGINS = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)

const MAX_MESSAGE_LENGTH = 500

/** RiveScript only - the server never writes a reply of its own. */
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
 * This is an API, not a website - the chat UI lives in the portfolio. Opening
 * this URL in a browser should say so instead of showing Express's bare
 * "Cannot GET /".
 */
app.get("/", (_req, res) => {
  res.json({
    service: "Elmify, Personal Knowledge API",
    status: "ok",
    endpoints: {
      chat: "POST /api/chat",
      health: "GET /health",
    },
  })
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

    // `bot.reply` returns an empty string when the brain has no reply - the
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
