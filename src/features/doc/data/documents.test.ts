import { describe, expect, it } from "vitest"

import { findNeighbour } from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"

const docs = [{ slug: "a" }, { slug: "b" }, { slug: "c" }] as unknown as Doc[]

describe("findNeighbour", () => {
  it("returns previous and next for a middle item", () => {
    const result = findNeighbour(docs, "b")
    expect(result.previous?.slug).toBe("a")
    expect(result.next?.slug).toBe("c")
  })

  it("returns null previous and a next for the first item", () => {
    const result = findNeighbour(docs, "a")
    expect(result.previous).toBeNull()
    expect(result.next?.slug).toBe("b")
  })

  it("returns a previous and null next for the last item", () => {
    const result = findNeighbour(docs, "c")
    expect(result.previous?.slug).toBe("b")
    expect(result.next).toBeNull()
  })

  it("returns both null for a single-element list", () => {
    const single = [{ slug: "only" }] as unknown as Doc[]
    const result = findNeighbour(single, "only")
    expect(result.previous).toBeNull()
    expect(result.next).toBeNull()
  })

  it("returns both null when the slug is missing", () => {
    const result = findNeighbour(docs, "missing")
    expect(result.previous).toBeNull()
    expect(result.next).toBeNull()
  })
})
