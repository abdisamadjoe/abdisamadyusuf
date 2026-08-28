import fs from "node:fs"
import path from "node:path"
import type { Config } from "@react-router/dev/config"

import { blockCategories } from "./src/config/registry"

export default {
  appDirectory: "src",
  ssr: true,
  // Point to out folder to preserve Cloudflare Pages static assets path
  buildDirectory: "out",

  // The site is prerendered and deployed as static assets with no server, so
  // fog-of-war route discovery (which fetches /__manifest on navigation)
  // would 404. Embed the full route manifest in the initial HTML instead.
  routeDiscovery: { mode: "initial" },

  async prerender() {
    const paths = [
      "/",
      "/blog",
      "/timeline",
      "/testimonials",
      "/game",
      "/og",
      "/robots.txt",
      "/sitemap.xml",
      "/ads.txt",
      "/vcard",
      "/llms.txt",
      "/about.md",
      "/experience.md",
      "/awards.md",
      "/blocks.md",
      "/components.md",
      "/blog.md",
      "/bookmarks.md",
      "/certifications.md",
      "/education.md",
      "/projects.md",
      "/blog/rss",
      "/components/rss",
      "/blocks/rss",
    ]

    // Load blog posts dynamically from the filesystem to prerender them
    const blogDir = path.join(process.cwd(), "src/features/doc/content/blog")
    if (fs.existsSync(blogDir)) {
      const files = fs
        .readdirSync(blogDir)
        .filter((file) => file.endsWith(".mdx"))
      for (const file of files) {
        const slug = path.basename(file, ".mdx")
        paths.push(`/blog/${slug}`)
        paths.push(`/blog/${slug}.mdx`)
        paths.push(`/components/${slug}.mdx`)
      }
    }

    // Load registry components and blocks from generated Index
    // We try to load this dynamically. If it doesn't exist yet (before build), we catch gracefully.
    try {
      const indexPath = path.join(process.cwd(), "src/registry/__index__.tsx")
      if (fs.existsSync(indexPath)) {
        const indexContent = fs.readFileSync(indexPath, "utf8")
        // Simple regex extract keys from: export const Index: Record<string, any> = { "name": { ... } }
        const itemNames: string[] = []
        const matches = indexContent.matchAll(/"([^"]+)":\s*\{/g)
        for (const match of matches) {
          itemNames.push(match[1])
        }

        // Parse registry type for blocks/examples
        for (const name of itemNames) {
          paths.push(`/preview/${name}`)

          // For blocks, add categories
          for (const category of blockCategories) {
            paths.push(`/blocks/${category.name}/${name}`)
          }
        }
      }
    } catch (e) {
      console.warn(
        "Could not read registry __index__.tsx for prerendering, skipping registry items:",
        e
      )
    }

    // Add block category lists
    for (const category of blockCategories) {
      paths.push(`/blocks/${category.name}`)
    }
    paths.push("/blocks")

    return paths
  },
} satisfies Config
