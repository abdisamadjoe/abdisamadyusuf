import path from "node:path"
import mdx from "@mdx-js/rollup"
import { reactRouter } from "@react-router/dev/vite"
import { remarkHeading } from "fumadocs-core/mdx-plugins/remark-heading"
import rehypeExternalLinks from "rehype-external-links"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import { defineConfig, loadEnv, type Plugin } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

import { fetchYouTubePlaylistViews } from "./functions/api/_lib/youtube"
import { UTM_PARAMS } from "./src/config/site"
import { unstable_cache } from "./src/lib/cache"
import { rehypeAddQueryParams } from "./src/lib/rehype-add-query-params"
import {
  rehypeCodeRawString,
  rehypeHighlightCode,
  rehypeHighlightCodeRawString,
} from "./src/lib/rehype-code-block"
import { rehypeComponent } from "./src/lib/rehype-component"
import { rehypeNpmCommand } from "./src/lib/rehype-npm-command"
// Custom plugins from our codebase
import { remarkCodeImport } from "./src/lib/remark-code-import"
import { remarkStripFrontmatter } from "./src/lib/remark-strip-frontmatter"

// `npm run dev` runs the plain Vite dev server, which doesn't execute
// Cloudflare Pages Functions (that's `functions/api/youtube-views.ts`,
// only live under `wrangler pages dev` / `npm run preview`). This
// middleware serves the same route in `npm run dev` by calling the same
// shared fetch logic, so the Hello section's live view count also works
// during day-to-day development. Reads YOUTUBE_API_KEY from `.env.local`.
const getCachedYouTubeViews = unstable_cache(
  fetchYouTubePlaylistViews,
  ["youtube-views-dev"],
  { revalidate: 21600 },
)

function youtubeViewsDevMiddleware(): Plugin {
  return {
    name: "youtube-views-dev-middleware",
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), "")

      server.middlewares.use("/api/youtube-views", async (req, res) => {
        if (req.method !== "GET") {
          res.statusCode = 405
          res.end()
          return
        }

        res.setHeader("content-type", "application/json")

        const apiKey = env.YOUTUBE_API_KEY
        if (!apiKey) {
          console.error(
            "YOUTUBE_API_KEY is not set. Add it to .env.local to test /api/youtube-views locally.",
          )
          res.statusCode = 500
          res.end(
            JSON.stringify({ error: "YouTube API key is not configured." }),
          )
          return
        }

        try {
          const views = await getCachedYouTubeViews(apiKey)
          res.statusCode = 200
          res.end(JSON.stringify({ views }))
        } catch (error) {
          console.error("Failed to fetch YouTube views (dev):", error)
          res.statusCode = 502
          res.end(JSON.stringify({ error: "Failed to fetch YouTube views." }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const chatbotAppUrl = env.CHATBOT_APP_URL || process.env.CHATBOT_APP_URL || ""

  return {
    envPrefix: ["VITE_", "CHATBOT_"],
    define: {
      "process.env.BUILD_TIMESTAMP": JSON.stringify(new Date().toISOString()),
      ...(chatbotAppUrl
        ? { "import.meta.env.CHATBOT_APP_URL": JSON.stringify(chatbotAppUrl) }
        : {}),
    },
  resolve: {
    alias: {
      "next/cache": path.resolve(__dirname, "./src/lib/cache.ts"),
      "next/dynamic": path.resolve(__dirname, "./src/lib/shims/dynamic.tsx"),
      "next/image": path.resolve(__dirname, "./src/lib/shims/image.tsx"),
      "next/link": path.resolve(__dirname, "./src/lib/shims/link.tsx"),
      "next/navigation": path.resolve(
        __dirname,
        "./src/lib/shims/navigation.tsx",
      ),
      "@bprogress/next/app": path.resolve(
        __dirname,
        "./src/lib/shims/bprogress.tsx",
      ),
    },
  },
  plugins: [
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        remarkStripFrontmatter,
        remarkGfm,
        remarkCodeImport,
        remarkHeading,
      ],
      rehypePlugins: [
        [rehypeExternalLinks, { target: "_blank", rel: "nofollow noopener" }],
        rehypeSlug,
        rehypeComponent,
        rehypeCodeRawString,
        rehypeHighlightCode,
        rehypeHighlightCodeRawString,
        rehypeNpmCommand,
        [rehypeAddQueryParams, UTM_PARAMS],
      ],
      providerImportSource: "@mdx-js/react",
    }),
    reactRouter(),
    tsconfigPaths(),
    youtubeViewsDevMiddleware(),
  ],
  ssr: {
    noExternal: [/^@visx\/.*/],
  },
  server: {
    host: true,
    allowedHosts: [
      "abdisamadjoe.localhost",
      "abdisamadjoe.local",
      "abdisamadjoe.localhost",
      "abdisamadjoe.local",
    ],
  },
  }
})
