import {
  getRegistryItemNamespace,
  getRegistryItemUrl,
  getRegistryItemUrls,
} from "@/utils/registry"
import { describe, expect, it } from "vitest"

import { registryConfig } from "@/config/registry"

describe("getRegistryItemNamespace", () => {
  it("prefixes the configured namespace and suffixes the item", () => {
    const result = getRegistryItemNamespace("foo")
    expect(result.startsWith(registryConfig.namespace)).toBe(true)
    expect(result.endsWith("/foo")).toBe(true)
  })
})

describe("getRegistryItemUrl", () => {
  it("replaces the {name} placeholder with the item", () => {
    const result = getRegistryItemUrl("foo")
    expect(result).not.toContain("{name}")
    expect(result).toContain("foo")
  })
})

describe("getRegistryItemUrls", () => {
  it("maps each item to a transformed url", () => {
    const result = getRegistryItemUrls("a", "b")
    expect(result).toHaveLength(2)
    expect(result[0]).toBe(getRegistryItemUrl("a"))
    expect(result[1]).toBe(getRegistryItemUrl("b"))
    result.forEach((url) => expect(url).not.toContain("{name}"))
  })
})
