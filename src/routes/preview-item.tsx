import { cache, useEffect, useState } from "react"
import { PreviewProvider } from "@/routes/preview/components/preview-provider"
import { getCachedThemes } from "@/routes/preview/lib/get-themes"
import { useLoaderData } from "react-router"

import { X_HANDLE } from "@/config/site"
import { getRegistryItem } from "@/lib/registry.server"
import { cn } from "@/lib/utils"
import { Index } from "@/registry/__index__"

const getCachedRegistryItem = cache(async (name: string) => {
  return await getRegistryItem(name)
})

export async function loader({ params }: { params: { name: string } }) {
  const { name } = params
  const [item, themes] = await Promise.all([
    getCachedRegistryItem(name),
    getCachedThemes(),
  ])

  if (!item || !Index[name]) {
    throw new Response("Not Found", { status: 404 })
  }

  return { name, item, themes }
}

export function meta({
  data,
}: {
  data: { name: string; item: any } | undefined
}) {
  if (!data || !data.item) {
    return [{ title: "Not Found" }]
  }

  const { item } = data
  const title = item.name
  const description = item.description || ""
  const blockUrl = `/preview/${item.name}`
  const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

  return [
    { title: `${title} – Abdisamad Yusuf` },
    { name: "description", content: description },
    {
      tagName: "link",
      rel: "canonical",
      href: blockUrl,
    },
    { property: "og:url", content: blockUrl },
    { property: "og:type", content: "website" },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: X_HANDLE },
    { name: "twitter:creator", content: X_HANDLE },
    { name: "twitter:image", content: ogImage },
    { name: "robots", content: "noindex, nofollow" },
  ]
}

export default function PreviewPage() {
  const { name, item, themes } = useLoaderData<typeof loader>()
  const Component = Index[name]?.component

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (
    !Component ||
    item?.type === "registry:hook" ||
    item?.type === "registry:lib"
  ) {
    return null
  }

  if (!mounted) {
    return <div className={cn("style-preview", item?.meta?.previewClassName)} />
  }

  return (
    <div className={cn("style-preview", item?.meta?.previewClassName)}>
      <PreviewProvider themes={themes}>
        <Component />
      </PreviewProvider>
    </div>
  )
}
