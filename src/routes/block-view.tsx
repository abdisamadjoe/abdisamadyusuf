import { cache } from "react"
import { BlockViewer } from "@/routes/preview/components/block-viewer"
import { getCachedThemes } from "@/routes/preview/lib/get-themes"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { Link, useLoaderData } from "react-router"
import type { SoftwareSourceCode, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { blockCategories } from "@/config/registry"
import { LICENSE, SOURCE_CODE_GITHUB_URL, X_HANDLE } from "@/config/site"
import { getAllBlockStaticParams } from "@/lib/blocks"
import { formatCode } from "@/lib/format-code"
import { highlightCode } from "@/lib/highlight-code"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { createFileTreeForRegistryItemFiles } from "@/lib/registry"
import { getRegistryItem } from "@/lib/registry.server"
import { absoluteUrl } from "@/lib/utils"
import { Kbd } from "@/components/ui/kbd"
import { Button } from "@/components/base/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { DocKeyboardShortcuts } from "@/features/doc/components/doc-keyboard-shortcuts"
import { DocShareMenu } from "@/features/doc/components/doc-share-menu"

const getCachedStaticParams = cache(getAllBlockStaticParams)

const getCachedRegistryItem = cache(async (name: string) => {
  return await getRegistryItem(name)
})

export async function loader({
  params,
}: {
  params: { category: string; name: string }
}) {
  const { category, name } = params
  const blocks = await getCachedStaticParams()

  const item = await getCachedRegistryItem(name)
  if (!item) {
    throw new Response("Not Found", { status: 404 })
  }

  const tree = item.files
    ? createFileTreeForRegistryItemFiles(item.files)
    : null
  const highlightedFiles = item.files
    ? await Promise.all(
        item.files.map(async (file: any) => ({
          ...file,
          highlightedContent: await highlightCode(
            await formatCode(file.content ?? "", "radix-vega")
          ),
        }))
      )
    : null

  const themesMap = await getCachedThemes()
  const themes = Array.from(themesMap.entries())

  return { category, name, item, blocks, tree, highlightedFiles, themes }
}

export function meta({
  data,
}: {
  data: { category: string; name: string; item: any } | undefined
}) {
  if (!data || !data.item) {
    return [{ title: "Block Not Found" }]
  }

  const { category, name, item } = data
  const title = item.name
  const description = item.description || ""
  const blockUrl = `/blocks/${category}/${item.name}`
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
    { property: "og:type", content: "article" },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: X_HANDLE },
    { name: "twitter:creator", content: X_HANDLE },
    { name: "twitter:image", content: ogImage },
  ]
}

function getSoftwareSourceCodeJsonLd(
  category: string,
  item: { name: string; description?: string; meta?: { createdAt?: string } }
): WithContext<SoftwareSourceCode> {
  const blockUrl = `/blocks/${category}/${item.name}`
  const description = item.description ?? ""

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": absoluteUrl(blockUrl),
    name: item.name,
    description,
    image: absoluteUrl(
      `/og/simple?title=${encodeURIComponent(item.name)}&description=${encodeURIComponent(description)}`
    ),
    url: absoluteUrl(blockUrl),
    datePublished: item.meta?.createdAt
      ? new Date(item.meta.createdAt).toISOString()
      : undefined,
    codeRepository: SOURCE_CODE_GITHUB_URL,
    programmingLanguage: [{ "@type": "ComputerLanguage", name: "TypeScript" }],
    runtimePlatform: "React 19",
    codeSampleType: "full (compile ready) solution",
    keywords: ["react", "shadcn", "block"],
    license: LICENSE.url,
    author: { "@id": JSON_LD_ID.person },
    isPartOf: {
      "@type": "CollectionPage",
      "@id": absoluteUrl("/blocks"),
      name: "Blocks",
      url: absoluteUrl("/blocks"),
    },
  }
}

export default function BlockViewPage() {
  const {
    category,
    name,
    item,
    blocks,
    tree,
    highlightedFiles,
    themes: themesEntries,
  } = useLoaderData<typeof loader>()
  const themes = new Map(themesEntries)

  const { previous, next } = findNeighbour(
    blocks.map((block) => `${block.category}/${block.name}`),
    `${category}/${name}`
  )

  const categoryItem = blockCategories.find((c) => c.name === category)

  return (
    <>
      {item && (
        <JsonLdScript data={getSoftwareSourceCodeJsonLd(category, item)} />
      )}

      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Blocks",
            href: "/blocks",
          },
          {
            name: categoryItem?.title || category,
            href: `/blocks/${category}`,
          },
          {
            name,
            href: `/blocks/${category}/${name}`,
          },
        ])}
      />

      <DocKeyboardShortcuts
        previous={previous ? `/blocks/${previous}` : null}
        next={next ? `/blocks/${next}` : null}
      />

      <div className="screen-line-bottom flex h-px" />

      <div className="flex items-center justify-between p-2 pl-4">
        <Button
          className="h-7 gap-2 border-none px-0 text-muted-foreground hover:text-foreground"
          variant="link"
          size="sm"
          nativeButton={false}
          render={
            <Link to={`/blocks/${category}`}>
              <ArrowLeftIcon />
              {categoryItem?.title || "Blocks"}
            </Link>
          }
        />

        <div className="flex items-center gap-2">
          <DocShareMenu title={name} url={`/blocks/${category}/${name}`} />

          {previous && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    className="size-7 border-none"
                    variant="secondary"
                    size="icon-sm"
                    nativeButton={false}
                    render={
                      <Link
                        to={`/blocks/${previous}`}
                        aria-label="Previous Block"
                      >
                        <ArrowLeftIcon />
                      </Link>
                    }
                  />
                }
              />
              <TooltipContent className="pr-2 pl-3">
                <div className="flex items-center gap-3">
                  Previous Block
                  <Kbd>
                    <ArrowLeftIcon />
                  </Kbd>
                </div>
              </TooltipContent>
            </Tooltip>
          )}

          {next && (
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    className="size-7 border-none"
                    variant="secondary"
                    size="icon-sm"
                    nativeButton={false}
                    render={
                      <Link to={`/blocks/${next}`} aria-label="Next Block">
                        <ArrowRightIcon />
                      </Link>
                    }
                  />
                }
              />
              <TooltipContent className="pr-2 pl-3">
                <div className="flex items-center gap-3">
                  Next Block
                  <Kbd>
                    <ArrowRightIcon />
                  </Kbd>
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="screen-line-top h-px" />

      <BlockViewer
        item={item}
        tree={tree}
        highlightedFiles={highlightedFiles}
        themes={themes}
      />

      <div className="screen-line-top h-px" />

      <div className="stripe-divider" />
    </>
  )
}

function findNeighbour(blocks: string[], slug: string) {
  const len = blocks.length

  for (let i = 0; i < len; ++i) {
    if (blocks[i] === slug) {
      return {
        previous: i > 0 ? blocks[i - 1] : null,
        next: i < len - 1 ? blocks[i + 1] : null,
      }
    }
  }

  return { previous: null, next: null }
}
