/**
 * Configuration for the resume chatbot.
 *
 * `CHATBOT_APP_URL` defines the production backend URL so it is never hardcoded.
 *
 * Local development  → set it in `.env.local`:
 *     CHATBOT_APP_URL=http://localhost:3001
 * Production         → set it as an Environment Variable on your host (e.g. Cloudflare Pages)
 *                      to the deployed backend, e.g. https://chat.abdisamadjoe.com
 *
 * Vite inlines `import.meta.env.*` at build time.
 */
const configuredUrl = (
  (import.meta.env.CHATBOT_APP_URL ||
    import.meta.env.CHATBOT_API_URL ||
    import.meta.env.VITE_CHATBOT_API_URL) as string | undefined
)?.trim()

const defaultUrl = import.meta.env.DEV
  ? "http://localhost:3001"
  : "https://chat.abdisamadjoe.com"

/** Default for production backend when the variable is absent. */
export const CHATBOT_API_URL = (configuredUrl || defaultUrl).replace(/\/+$/, "")

/** Surfaced in the UI so a misconfigured deployment is obvious, not silent. */
export const IS_CHATBOT_API_CONFIGURED = true

// A production build without the variable would silently call localhost, which
// fails for every visitor. Warn loudly in the browser console instead.
if (
  import.meta.env.PROD &&
  !configuredUrl &&
  typeof console !== "undefined"
) {
  console.error(
    "[ResumeChatbot] CHATBOT_APP_URL is not set for this build. The chat " +
      "widget will try http://localhost:3001 and fail. Set it as an environment " +
      "variable on your host project and redeploy."
  )
}

export const CHATBOT_CONTENT = {
  title: "Ask Abdisamad",
  subtitle: "Career & Resume Assistant",
  launcherLabel: "Ask Abdisamad",
  greeting: `Hi! I'm Abdisamad's career assistant.

Ask me about his experience, cybersecurity background, projects, certifications, education, or skills.`,
  suggestions: [
    "What cybersecurity experience does he have?",
    "What certifications does he have?",
    "Tell me about his projects",
    "Why should we hire him?",
  ],
  inputPlaceholder: "Ask about his experience, certifications, projects…",
  disclaimer: "Official Career Assistant for Abdisamad Yusuf",
} as const
