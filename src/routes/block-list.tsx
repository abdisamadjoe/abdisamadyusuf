import { useLoaderData } from "react-router"
import type { CollectionPage, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { blockCategories } from "@/config/registry"
import { X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl } from "@/lib/utils"
import { BlockList } from "@/features/blocks/components/block-list"
import { getBlocks } from "@/features/blocks/data/blocks"

const defaultTitle = "Blocks"
const defaultDescription = "Beautifully designed, production-ready."

export async function loader({ params }: { params: { category?: string } }) {
  const { category } = params
  const blocks = getBlocks(category)
  const categoryItem = category
    ? blockCategories.find((item) => item.name === category)
    : undefined
  return { category, blocks, categoryItem }
}

export function meta({
  data,
}: {
  data: { category?: string; categoryItem?: any } | undefined
}) {
  const title = data?.categoryItem ? data.categoryItem.title : defaultTitle
  const description = data?.categoryItem
    ? data.categoryItem.description
    : defaultDescription
  const canonicalUrl = data?.category ? `/blocks/${data.category}` : "/blocks"
  const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

  return [
    { title: `${title} – Abdisamad Yusuf` },
    { name: "description", content: description },
    {
      tagName: "link",
      rel: "canonical",
      href: canonicalUrl,
    },
    { property: "og:url", content: canonicalUrl },
    { property: "og:type", content: "website" },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: X_HANDLE },
    { name: "twitter:creator", content: X_HANDLE },
    { name: "twitter:image", content: ogImage },
  ]
}

function getCollectionPageJsonLd(
  category: { name: string; title: string; description: string } | undefined,
  blocks: ReturnType<typeof getBlocks>
): WithContext<CollectionPage> {
  const categoryUrl = category ? `/blocks/${category.name}` : "/blocks"
  const name = category ? category.title : defaultTitle
  const description = category ? category.description : defaultDescription

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl(categoryUrl),
    name,
    description,
    url: absoluteUrl(categoryUrl),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: blocks.length,
      itemListElement: blocks.map((block, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(
          `/blocks/${category ? category.name : block.categories?.[0]}/${block.name}`
        ),
      })),
    },
    isPartOf: category
      ? {
          "@type": "CollectionPage",
          "@id": absoluteUrl("/blocks"),
          name: "Blocks",
          url: absoluteUrl("/blocks"),
        }
      : { "@id": JSON_LD_ID.website },
  }
}

export default function BlocksPage() {
  const { category, blocks, categoryItem } = useLoaderData<typeof loader>()

  const breadcrumbs = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Blocks",
      href: "/blocks",
    },
  ]

  if (categoryItem) {
    breadcrumbs.push({
      name: categoryItem.title,
      href: `/blocks/${category}`,
    })
  }

  return (
    <>
      <JsonLdScript data={getCollectionPageJsonLd(categoryItem, blocks)} />
      <JsonLdScript data={jsonLdBreadcrumbList(breadcrumbs)} />
      <BlockList blocks={blocks} />
    </>
  )
}
