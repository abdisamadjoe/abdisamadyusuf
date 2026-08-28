import { promises as fs } from "fs"
import path from "path"
import { LRUCache } from "lru-cache"
import { registryItemSchema } from "shadcn/schema"
import type { registryItemFileSchema } from "shadcn/schema"
import type { z } from "zod"

import { Index } from "../registry/__index__"
import { fixFilePaths, fixImport } from "./registry"

// LRU cache for cross-request caching of registry items.

const registryCache = new LRUCache<string, any>({
  max: 500,
  ttl: 1000 * 60 * 5, // 5 minutes
})

export async function getRegistryItem(name: string) {
  const cacheKey = name

  if (registryCache.has(cacheKey)) {
    return registryCache.get(cacheKey)
  }

  const item = Index[name]

  if (!item) {
    registryCache.set(cacheKey, null)
    return null
  }

  const result = registryItemSchema.safeParse(item)

  if (!result.success) {
    registryCache.set(cacheKey, null)
    return null
  }

  let files: typeof result.data.files = await Promise.all(
    item.files.map(async (file: z.infer<typeof registryItemFileSchema>) => {
      const content = await getFileContent(file)
      const relativePath = path.relative(process.cwd(), file.path)

      return {
        ...file,
        path: relativePath,
        content,
      }
    })
  )

  files = fixFilePaths(files)

  const parsed = registryItemSchema.safeParse({
    ...result.data,
    files,
  })

  if (!parsed.success) {
    console.error(parsed.error.message)
    registryCache.set(cacheKey, null)
    return null
  }

  registryCache.set(cacheKey, parsed.data)

  return parsed.data
}

async function getFileContent(file: z.infer<typeof registryItemFileSchema>) {
  let code = await fs.readFile(file.path, "utf-8")

  if (file.type !== "registry:page") {
    code = code.replaceAll("export default", "export")
  }

  code = fixImport(code)

  return code
}
