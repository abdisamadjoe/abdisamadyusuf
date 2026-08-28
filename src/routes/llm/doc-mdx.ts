import { getAllDocs } from "@/features/doc/data/documents.server"
import { getLLMText } from "@/features/doc/lib/get-llm-text"

export async function loader({ params }: { params: { slug: string } }) {
  const { slug } = params

  const allDocs = getAllDocs()
  const post = allDocs.find((doc) => doc.slug === slug)

  if (!post) {
    throw new Response("Not Found", { status: 404 })
  }

  return new Response(await getLLMText(post), {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  })
}
