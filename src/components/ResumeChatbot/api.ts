/**
 * Resume chatbot API client.
 *
 * The backend is a standalone Express service (see
 * `chatbot/`). The reply is returned by `chatbot/brain/resume.rive`.
 */
import { CHATBOT_API_URL } from "./config"

/** Non-AI: the bot is a rule engine, so a short network timeout is plenty. */
const REQUEST_TIMEOUT_MS = 15_000

export type ChatRole = "user" | "bot"

export type ChatMessage = {
  id: string
  role: ChatRole
  text: string
  /** True when the message reports a delivery/config problem rather than a reply. */
  isError?: boolean
}

/**
 * Sends one message to `POST /api/chat`.
 *
 * `userId` keeps each visitor's RiveScript session separate, so conversation
 * state (topics, `% Previous` rules) never leaks between recruiters.
 */
export async function sendChatMessage(
  message: string,
  userId: string,
  signal?: AbortSignal
): Promise<string> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  // Let a caller-supplied abort (component unmount) also cancel the request.
  signal?.addEventListener("abort", () => controller.abort(), { once: true })

  try {
    const response = await fetch(`${CHATBOT_API_URL}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message, userId }),
      signal: controller.signal,
    })

    if (response.status === 429) {
      return "I'm getting a lot of questions at the moment. Please wait a minute and try again."
    }

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const data: unknown = await response.json()

    if (
      typeof data === "object" &&
      data !== null &&
      "reply" in data &&
      typeof (data as { reply: unknown }).reply === "string"
    ) {
      return (data as { reply: string }).reply
    }

    throw new Error("Malformed response from the chatbot API")
  } finally {
    clearTimeout(timeout)
  }
}

/** True when the request failed because the visitor's browser went offline. */
export function isOfflineError(error: unknown): boolean {
  return (
    typeof navigator !== "undefined" &&
    !navigator.onLine &&
    error instanceof TypeError
  )
}
