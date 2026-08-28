import { Suspense } from "react"
import { useLoaderData } from "react-router"
import type { Blog as BlogSchema, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl } from "@/lib/utils"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { PostList } from "@/features/blog/components/post-list"
import { PostListWithSearch } from "@/features/blog/components/post-list-with-search"
import { PostSearchInput } from "@/features/blog/components/post-search-input"
import { getBlogPosts } from "@/features/doc/data/documents.server"

export async function loader() {
  const allPosts = getBlogPosts()
  return { allPosts }
}

const title = "Blog"
const description =
  "Writing about code, Cybersecurity, and everything in between."
const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export function meta() {
  return [
    { title: `${title} – Abdisamad Yusuf` },
    { name: "description", content: description },
    {
      tagName: "link",
      rel: "canonical",
      href: "/blog",
    },
    { property: "og:url", content: "/blog" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: X_HANDLE },
    { name: "twitter:creator", content: X_HANDLE },
    { name: "twitter:image", content: ogImage },
  ]
}

function getBlogJsonLd(
  posts: { slug: string; metadata: { title: string; createdAt: string } }[]
): WithContext<BlogSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog"),
    name: title,
    description,
    url: absoluteUrl("/blog"),
    isPartOf: { "@id": JSON_LD_ID.website },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`/blog/${post.slug}`),
      headline: post.metadata.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: new Date(post.metadata.createdAt).toISOString(),
    })),
  }
}

export default function BlogIndexPage() {
  const { allPosts } = useLoaderData<typeof loader>()

  return (
    <>
      <JsonLdScript data={getBlogJsonLd(allPosts)} />

      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Blog",
            href: "/blog",
          },
        ])}
      />

      <div className="min-h-svh">
        <PageHeading>
          <PageHeadingTagline>Blog</PageHeadingTagline>
          <PageHeadingTitle>
            Writing about code, Cybersecurity, and everything in between.
          </PageHeadingTitle>
        </PageHeading>

        <div className="h-4" />

        <div className="screen-line-top screen-line-bottom p-2">
          <Suspense
            fallback={
              <div className="flex h-9 w-full rounded-lg border border-input dark:bg-input/30" />
            }
          >
            <PostSearchInput />
          </Suspense>
        </div>

        <Suspense fallback={<PostList posts={allPosts} />}>
          <PostListWithSearch posts={allPosts} />
        </Suspense>

        <div className="h-4" />
      </div>
    </>
  )
}
