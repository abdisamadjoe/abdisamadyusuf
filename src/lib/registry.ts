import type { registryItemFileSchema, registryItemSchema } from "shadcn/schema"
import type { z } from "zod"

export function fixImport(content: string) {
  const regex = /@\/(.+?)\/((?:.*?\/)?(?:components|ui|hooks|lib))\/([\w-]+)/g

  const replacement = (
    match: string,
    _path: string,
    type: string,
    component: string
  ) => {
    if (type.endsWith("components")) {
      return `@/components/${component}`
    } else if (type.endsWith("ui")) {
      return `@/components/ui/${component}`
    } else if (type.endsWith("hooks")) {
      return `@/hooks/${component}`
    } else if (type.endsWith("lib")) {
      return `@/lib/${component}`
    }

    return match
  }

  return content.replace(regex, replacement)
}

export function fixFilePaths(
  files: z.infer<typeof registryItemSchema>["files"]
) {
  if (!files) {
    return []
  }

  const firstFilePath = files[0].path
  const firstFilePathDir = firstFilePath.substring(
    0,
    firstFilePath.lastIndexOf("/")
  )

  return files.map((file) => {
    return {
      ...file,
      path: getRelativePath(firstFilePathDir, file.path),
      target: getFileTarget(file),
    }
  })
}

function getRelativePath(from: string, to: string) {
  const fromParts = from.split("/").filter(Boolean)
  const toParts = to.split("/").filter(Boolean)

  while (fromParts.length && toParts.length && fromParts[0] === toParts[0]) {
    fromParts.shift()
    toParts.shift()
  }

  return [...Array(fromParts.length).fill(".."), ...toParts].join("/")
}

export function getFileTarget(file: z.infer<typeof registryItemFileSchema>) {
  let target = file.target

  if (!target || target === "") {
    const fileName = file.path.split("/").pop()
    if (
      file.type === "registry:block" ||
      file.type === "registry:component" ||
      file.type === "registry:example"
    ) {
      target = `components/${fileName}`
    }

    if (file.type === "registry:ui") {
      target = `components/ui/${fileName}`
    }

    if (file.type === "registry:hook") {
      target = `hooks/${fileName}`
    }

    if (file.type === "registry:lib") {
      target = `lib/${fileName}`
    }

    return target ?? ""
  }

  return normalizeAliasTarget(target)
}

export function normalizeAliasTarget(target: string) {
  const regex = /^@(components|ui|hooks|lib)\/(.+)$/

  return target.replace(regex, (_, type, rest) => {
    if (type === "components") {
      return `components/${rest}`
    }

    if (type === "ui") {
      return `components/ui/${rest}`
    }

    if (type === "hooks") {
      return `hooks/${rest}`
    }

    if (type === "lib") {
      return `lib/${rest}`
    }

    return target
  })
}

export type FileTree = {
  name: string
  path?: string
  children?: FileTree[]
}

export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>
) {
  const root: FileTree[] = []

  for (const file of files) {
    const path = file.target ?? file.path
    const parts = path.split("/")
    let currentLevel = root

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const isFile = i === parts.length - 1
      const existingNode = currentLevel.find((node) => node.name === part)

      if (existingNode) {
        if (isFile) {
          existingNode.path = path
        } else {
          currentLevel = existingNode.children!
        }
      } else {
        const newNode: FileTree = isFile
          ? { name: part, path }
          : { name: part, children: [] }

        currentLevel.push(newNode)

        if (!isFile) {
          currentLevel = newNode.children!
        }
      }
    }
  }

  return root
}
