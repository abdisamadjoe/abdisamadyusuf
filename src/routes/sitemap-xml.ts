import { SITE_INFO } from "@/config/site"
import { getBlogPosts } from "@/features/doc/data/documents.server"

export async function loader() {
  const posts = getBlogPosts().map((post) => ({
    url: `${SITE_INFO.url}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.updatedAt).toISOString(),
  }))

  const routes = ["", "/blog", "/testimonials"].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const allUrls = [...routes, ...posts]

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (item) => `<url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastModified}</lastmod>
  </url>`
    )
    .join("\n")}
</urlset>`

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml;charset=utf-8",
    },
  })
}
