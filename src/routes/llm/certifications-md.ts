import { CERTIFICATIONS } from "@/features/portfolio/data/certifications"

const content = `# Certifications

${CERTIFICATIONS.map((item) => `- [${item.title}](${item.credentialURL})`).join("\n")}
`

export const revalidate = false
export const dynamic = "force-static"

export async function loader() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  })
}
