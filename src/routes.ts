import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes"

export default [
  // Layout route wrapping the main user interface (header, footer, navigation)
  layout("routes/app-layout.tsx", [
    index("routes/home.tsx"),

    // Pages container layout wrapping standard list/timeline pages
    layout("routes/pages-layout.tsx", [
      route("timeline", "routes/timeline.tsx"),
      route("blog", "routes/blog-index.tsx"),
      route("testimonials", "routes/testimonials.tsx"),
    ]),

    // Docs spacing layout wrapping blog posts
    layout("routes/docs-layout.tsx", [
      route("blog/:slug", "routes/blog-post.tsx"),
    ]),

    // Wide containers wrapping blocks
    layout("routes/blocks-wide-layout.tsx", [
      // Block viewer
      route("blocks/:category/:name", "routes/block-view.tsx"),

      // Blocks list container wrapping search listing pages
      layout("routes/blocks-list-layout.tsx", [
        route("blocks/:category?", "routes/block-list.tsx"),
      ]),
    ]),
  ]),

  // Non-layout pages (standalone)
  route("game", "routes/game.tsx"),
  route("og", "routes/og-visualizer.tsx"),

  // Custom registry preview standalone layout
  layout("routes/preview-layout.tsx", [
    route("preview/:name", "routes/preview-item.tsx"),
  ]),

  // Resource/API text endpoints
  route("vcard", "routes/vcard.ts"),
  route("robots.txt", "routes/robots-txt.ts"),
  route("sitemap.xml", "routes/sitemap-xml.ts"),
  route("ads.txt", "routes/ads-txt.ts"),
  route("llms.txt", "routes/llms-txt.ts"),

  // Markdown pages for AI agents / LLM scraping
  route("about.md", "routes/llm/about-md.ts"),
  route("experience.md", "routes/llm/experience-md.ts"),
  route("awards.md", "routes/llm/awards-md.ts"),
  route("blocks.md", "routes/llm/blocks-md.ts"),
  route("components.md", "routes/llm/components-md.ts"),
  route("blog.md", "routes/llm/blog-md.ts"),
  route("bookmarks.md", "routes/llm/bookmarks-md.ts"),
  route("certifications.md", "routes/llm/certifications-md.ts"),
  route("education.md", "routes/llm/education-md.ts"),
  route("projects.md", "routes/llm/projects-md.ts"),

  // Dynamic raw MDX document requests
  route("blog/:slug.mdx", "routes/llm/doc-mdx-blog.ts"),
  route("components/:slug.mdx", "routes/llm/doc-mdx-components.ts"),

  // RSS XML Feed endpoints
  route("blog/rss", "routes/rss/blog-rss.ts"),
  route("components/rss", "routes/rss/components-rss.ts"),
  route("blocks/rss", "routes/rss/blocks-rss.ts"),

  // Redirect compatibility endpoints
  route("rss", "routes/rss/blog-rss-redirect.ts"),
  route("registry/rss", "routes/rss/components-rss-redirect.ts"),
] satisfies RouteConfig
