import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ArrowRightIcon, MessageCircleIcon, SendIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import {
  isOfflineError,
  sendChatMessage,
  type ChatMessage,
} from "./api"
import {
  CHATBOT_API_URL,
  CHATBOT_CONTENT,
  IS_CHATBOT_API_CONFIGURED,
} from "./config"
import { parseReply } from "./parseReply"

import "./ResumeChatbot.css"

/**
 * Floating "Ask Abdisamad" resume assistant.
 *
 * A rule-based RiveScript bot served by `chatbot/` — deliberately not an
 * AI, so the wording here never calls it one.
 */

const STORAGE_KEY = "resume-chatbot-session"
const MAX_STORED_MESSAGES = 40

/** Stable per-visitor id so the backend keeps conversations separate. */
function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `session-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
}

function createMessageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `msg-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
}

type StoredSession = {
  userId: string
  messages: ChatMessage[]
  isOpen: boolean
}

function readStoredSession(): StoredSession | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== "object" || parsed === null) return null

    const candidate = parsed as Partial<StoredSession>
    if (typeof candidate.userId !== "string" || !Array.isArray(candidate.messages)) {
      return null
    }

    const messages = candidate.messages.filter(
      (message): message is ChatMessage =>
        typeof message === "object" &&
        message !== null &&
        typeof (message as ChatMessage).text === "string" &&
        ((message as ChatMessage).role === "user" ||
          (message as ChatMessage).role === "bot")
    )

    return {
      userId: candidate.userId,
      messages,
      isOpen: candidate.isOpen === true,
    }
  } catch {
    // Private mode, disabled storage, or corrupt payload — start fresh.
    return null
  }
}

export function ResumeChatbot() {
  // Rendering the launcher on the server would produce markup that depends on
  // nothing, but the panel's open state comes from sessionStorage, so the whole
  // widget mounts after hydration to avoid a mismatch.
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [userId, setUserId] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [draft, setDraft] = useState("")
  const [isSending, setIsSending] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const requestRef = useRef<AbortController | null>(null)

  const greeting = useMemo<ChatMessage>(
    () => ({ id: "greeting", role: "bot", text: CHATBOT_CONTENT.greeting }),
    []
  )

  // Restore the conversation for this browsing session.
  useEffect(() => {
    const stored = readStoredSession()

    setUserId(stored?.userId ?? createSessionId())
    setMessages(stored?.messages.length ? stored.messages : [greeting])
    setIsOpen(stored?.isOpen ?? false)
    setIsMounted(true)
  }, [greeting])

  // Persist so the chat survives route changes (this component lives in the
  // root layout and remounts on navigation).
  useEffect(() => {
    if (!isMounted || !userId) return

    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          userId,
          isOpen,
          messages: messages.slice(-MAX_STORED_MESSAGES),
        } satisfies StoredSession)
      )
    } catch {
      // Storage unavailable — the chat still works for this page view.
    }
  }, [isMounted, userId, isOpen, messages])

  // Keep the newest message in view.
  //
  // Bot answers are long (a "why hire him" answer is taller than the panel), so
  // scrolling to the very bottom would drop the reader into the middle of the
  // answer. For a new bot reply the message is aligned to the TOP of the scroll
  // area instead, so a long answer starts where it should. Short replies and the
  // user's own message still snap to the bottom.
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    // Measure after the browser has laid the new message out, so heights are
    // final. A smooth scroll would also be interrupted by the next render,
    // which is why aligning a long answer jumps instantly instead.
    const frame = requestAnimationFrame(() => {
      const rows = container.querySelectorAll<HTMLElement>("[data-chat-row]")
      const last = rows[rows.length - 1]
      if (!last) return

      // Measure relative to the scroll container. `offsetTop` would be measured
      // against the nearest positioned ancestor instead, which is not the
      // element that actually scrolls here.
      const containerTop = container.getBoundingClientRect().top
      const offsetWithinContainer =
        last.getBoundingClientRect().top - containerTop + container.scrollTop

      const isLongAnswer =
        last.dataset.chatRole === "bot" &&
        last.getBoundingClientRect().height > container.clientHeight

      if (isLongAnswer) {
        container.scrollTo({
          top: Math.max(0, offsetWithinContainer - 8),
          behavior: "auto",
        })
        return
      }

      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" })
    })

    return () => cancelAnimationFrame(frame)
  }, [messages, isSending, isOpen])

  // Focus the input when the panel opens, and cancel in-flight work on unmount.
  useEffect(() => {
    if (!isOpen) return

    const timeout = setTimeout(() => inputRef.current?.focus(), 220)
    return () => clearTimeout(timeout)
  }, [isOpen])

  useEffect(() => {
    return () => requestRef.current?.abort()
  }, [])

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  // Flag the open state on <html> so CSS can step aside the site's existing
  // floating controls (the ScrollToTop button shares this corner).
  useEffect(() => {
    const root = document.documentElement

    if (isOpen) {
      root.setAttribute("data-resume-chatbot-open", "")
    } else {
      root.removeAttribute("data-resume-chatbot-open")
    }

    return () => {
      root.removeAttribute("data-resume-chatbot-open")
    }
  }, [isOpen])

  const ask = useCallback(
    async (question: string) => {
      const text = question.trim()
      if (!text || isSending) return

      requestRef.current?.abort()
      const controller = new AbortController()
      requestRef.current = controller

      setMessages((current) => [
        ...current,
        { id: createMessageId(), role: "user", text },
      ])
      setDraft("")
      setIsSending(true)

      try {
        const reply = await sendChatMessage(text, userId, controller.signal)
        setMessages((current) => [
          ...current,
          { id: createMessageId(), role: "bot", text: reply },
        ])
      } catch (error) {
        if (controller.signal.aborted && requestRef.current !== controller) {
          // Superseded by a newer question — drop this response silently.
          return
        }

        const offline = isOfflineError(error)
        const detail = offline
          ? "It looks like you're offline."
          : IS_CHATBOT_API_CONFIGURED
            ? "I couldn't reach the assistant."
            : `I couldn't reach the assistant at ${CHATBOT_API_URL}. If you're running locally, start it with \`cd chatbot && npm run dev\`, or set CHATBOT_APP_URL.`

        setMessages((current) => [
          ...current,
          {
            id: createMessageId(),
            role: "bot",
            isError: true,
            text: `${detail} You can reach Abdisamad directly at abdisamadjoe@gmail.com.`,
          },
        ])
      } finally {
        if (requestRef.current === controller) {
          requestRef.current = null
          setIsSending(false)
        }
      }
    },
    [isSending, userId]
  )

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends; Shift+Enter makes a new line.
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      void ask(draft)
    }
  }

  if (!isMounted) return null

  const showSuggestions = messages.length <= 1

  return (
    <div className="resume-chatbot" data-open={isOpen ? "true" : "false"}>
      {/* Chat panel */}
      <div
        id="resume-chatbot-panel"
        role="dialog"
        aria-label={`${CHATBOT_CONTENT.title} — ${CHATBOT_CONTENT.subtitle}`}
        aria-hidden={!isOpen}
        data-open={isOpen ? "true" : "false"}
        className="resume-chatbot__panel"
      >
        <header className="resume-chatbot__header">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="resume-chatbot__avatar" aria-hidden>
              <MessageCircleIcon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="resume-chatbot__title">{CHATBOT_CONTENT.title}</p>
              <p className="resume-chatbot__subtitle">
                {CHATBOT_CONTENT.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="resume-chatbot__icon-button"
            aria-label="Close chat"
          >
            <XIcon className="size-4" />
          </button>
        </header>

        <div
          ref={scrollRef}
          className="resume-chatbot__messages"
          role="log"
          aria-live="polite"
          aria-label="Conversation"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              data-chat-row
              data-chat-role={message.role}
              className={cn(
                "resume-chatbot__row",
                message.role === "user" && "resume-chatbot__row--user"
              )}
            >
              <div
                className={cn(
                  "resume-chatbot__bubble",
                  message.role === "user"
                    ? "resume-chatbot__bubble--user"
                    : "resume-chatbot__bubble--bot",
                  message.isError && "resume-chatbot__bubble--error"
                )}
              >
                <MessageBody message={message} />
              </div>
            </div>
          ))}

          {showSuggestions && !isSending && (
            <div className="resume-chatbot__suggestions">
              <p className="resume-chatbot__suggestions-label">
                Suggested questions
              </p>
              {CHATBOT_CONTENT.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="resume-chatbot__suggestion"
                  onClick={() => void ask(suggestion)}
                >
                  <span>{suggestion}</span>
                  <ArrowRightIcon className="size-3.5 shrink-0 opacity-60" />
                </button>
              ))}
            </div>
          )}

          {isSending && (
            <div className="resume-chatbot__row">
              <div
                role="status"
                aria-label="Checking the resume"
                className="resume-chatbot__bubble resume-chatbot__bubble--bot resume-chatbot__typing"
                data-slot="typing-indicator"
              >
                <span className="sr-only">Checking the resume…</span>
                <span className="resume-chatbot__dot" />
                <span className="resume-chatbot__dot" />
                <span className="resume-chatbot__dot" />
              </div>
            </div>
          )}
        </div>

        <form
          className="resume-chatbot__composer"
          onSubmit={(event) => {
            event.preventDefault()
            void ask(draft)
          }}
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={CHATBOT_CONTENT.inputPlaceholder}
            aria-label="Your question"
            maxLength={500}
            className="resume-chatbot__input"
          />
          <button
            type="submit"
            className="resume-chatbot__send"
            disabled={isSending || draft.trim().length === 0}
            aria-label="Send question"
          >
            <SendIcon className="size-4" />
          </button>
        </form>

        <p className="resume-chatbot__footnote">{CHATBOT_CONTENT.disclaimer}</p>
      </div>

      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="resume-chatbot__launcher"
        aria-expanded={isOpen}
        aria-controls="resume-chatbot-panel"
      >
        <span className="resume-chatbot__launcher-icon" aria-hidden>
          {isOpen ? (
            <XIcon className="size-4" />
          ) : (
            <MessageCircleIcon className="size-4" />
          )}
        </span>
        <span className="resume-chatbot__launcher-label">
          {CHATBOT_CONTENT.launcherLabel}
        </span>
      </button>
    </div>
  )
}

/**
 * Renders one message.
 *
 * User messages are short and rendered as-is. Bot answers come from RiveScript
 * as plain text with `\n` breaks, so they are parsed into paragraphs and bullet
 * lists — an 800-character wall of prose is what made the chat look
 * unstructured.
 */
function MessageBody({ message }: { message: ChatMessage }) {
  if (message.role === "user") return message.text

  const blocks = parseReply(message.text)

  return blocks.map((block, index) =>
    block.type === "list" ? (
      <ul key={index} className="resume-chatbot__list">
        {block.items.map((item) => (
          <li key={item} className="resume-chatbot__list-item">
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p key={index} className="resume-chatbot__paragraph">
        {block.text}
      </p>
    )
  )
}

export default ResumeChatbot
