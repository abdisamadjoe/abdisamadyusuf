import path from "node:path"
import mdx from "@mdx-js/rollup"
import { reactRouter } from "@react-router/dev/vite"
import { remarkHeading } from "fumadocs-core/mdx-plugins/remark-heading"
import rehypeExternalLinks from "rehype-external-links"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

import { UTM_PARAMS } from "./src/config/site"
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

export default defineConfig({
  define: {
    "process.env.BUILD_TIMESTAMP": JSON.stringify(new Date().toISOString()),
  },
  resolve: {
    alias: {
      "next/cache": path.resolve(__dirname, "./src/lib/cache.ts"),
      "next/dynamic": path.resolve(__dirname, "./src/lib/shims/dynamic.tsx"),
      "next/image": path.resolve(__dirname, "./src/lib/shims/image.tsx"),
      "next/link": path.resolve(__dirname, "./src/lib/shims/link.tsx"),
      "next/navigation": path.resolve(
        __dirname,
        "./src/lib/shims/navigation.tsx"
      ),
      "@bprogress/next/app": path.resolve(
        __dirname,
        "./src/lib/shims/bprogress.tsx"
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
})
