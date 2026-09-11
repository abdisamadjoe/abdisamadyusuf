/**
 * Configuration for the resume chatbot.
 *
 * `VITE_CHATBOT_API_URL` follows the project's existing Vite environment
 * convention (the same pattern as `VITE_ADSENSE_CLIENT` in `src/root.tsx`),
 * so the production backend URL is never hardcoded in components.
 *
 * Local development  → set it in `.env.local`:
 *     VITE_CHATBOT_API_URL=http://localhost:3001
 * Production         → set it as a BUILD variable on the Cloudflare Pages
 *                      project (Settings → Environment variables) to the
 *                      deployed backend, e.g. https://chat.abdisamadjoe.com
 *
 * Vite inlines `import.meta.env.*` at build time, so this value is baked into
 * the bundle when Cloudflare runs `npm run build` — changing it requires a new
 * deployment, not just a runtime variable.
 */
const configuredUrl = (import.meta.env.VITE_CHATBOT_API_URL as string | undefined)
  ?.trim()

/** Default for local development when the variable is absent. */
export const CHATBOT_API_URL = (
  configuredUrl || "http://localhost:3001"
).replace(/\/+$/, "")

/** Surfaced in the UI so a misconfigured deployment is obvious, not silent. */
export const IS_CHATBOT_API_CONFIGURED = Boolean(configuredUrl)

// A production build without the variable would silently call localhost, which
// fails for every visitor. Warn loudly in the browser console instead.
if (
  import.meta.env.PROD &&
  !configuredUrl &&
  typeof console !== "undefined"
) {
  console.error(
    "[ResumeChatbot] VITE_CHATBOT_API_URL is not set for this build. The chat " +
      "widget will try http://localhost:3001 and fail. Set it as a build " +
      "variable on the Cloudflare Pages project and redeploy."
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
  disclaimer: "Rule-based answers from Abdisamad's resume — not an AI.",
} as const
