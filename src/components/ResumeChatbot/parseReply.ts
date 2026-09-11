/**
 * Turns a plain-text bot reply into blocks the chat can render properly.
 *
 * RiveScript answers are plain text with `\n` line breaks (see
 * `chatbot/brain/resume.rive`). A raw bubble of 800 characters of prose reads
 * badly, so lines starting with `- ` become a real bullet list and blank lines
 * become paragraph breaks.
 *
 * The parser is deliberately tiny and dependency-free: no Markdown library, and
 * nothing the brain author has to learn beyond "use \\n and start bullets with
 * '- '".
 */
export type ReplyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }

/** Matches `- item`, `* item` or `• item` — the bullet styles used in the brain. */
const BULLET = /^\s*[-*•]\s+/

export function parseReply(reply: string): ReplyBlock[] {
  const blocks: ReplyBlock[] = []
  let paragraph: string[] = []
  let list: string[] = []

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() })
      paragraph = []
    }
  }

  const flushList = () => {
    if (list.length) {
      blocks.push({ type: "list", items: list })
      list = []
    }
  }

  for (const rawLine of reply.split("\n")) {
    const line = rawLine.trim()

    if (line === "") {
      // A blank line ends whatever came before it.
      flushParagraph()
      flushList()
      continue
    }

    if (BULLET.test(line)) {
      flushParagraph()
      list.push(line.replace(BULLET, "").trim())
      continue
    }

    flushList()
    paragraph.push(line)
  }

  flushParagraph()
  flushList()

  return blocks
}
