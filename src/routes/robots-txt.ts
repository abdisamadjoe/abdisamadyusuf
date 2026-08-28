import { SITE_INFO } from "@/config/site"

export async function loader() {
  const robotsText = `User-agent: *
Disallow:

Sitemap: ${SITE_INFO.url}/sitemap.xml`

  return new Response(robotsText, {
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
  })
}
