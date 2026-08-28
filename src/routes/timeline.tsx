import { X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { TimescaleIntroScroll } from "@/registry/components/timescale"
import { Timeline } from "@/features/portfolio/components/timeline"

const title = "Timeline"
const description = "A life in milestones."
const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export function meta() {
  return [
    { title: `${title} – Abdisamad Yusuf` }, // Or get SITE_INFO.name dynamically
    { name: "description", content: description },
    {
      tagName: "link",
      rel: "canonical",
      href: "/timeline",
    },
    { property: "og:url", content: "/timeline" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: X_HANDLE },
    { name: "twitter:creator", content: X_HANDLE },
    { name: "twitter:image", content: ogImage },
  ]
}

export default function TimelinePage() {
  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Timeline",
            href: "/timeline",
          },
        ])}
      />

      <PageHeading>
        <PageHeadingTagline>Timeline</PageHeadingTagline>
        <PageHeadingTitle>A life in milestones.</PageHeadingTitle>
      </PageHeading>

      <div className="h-4" />
      <div className="screen-line-top h-3" />

      <TimescaleIntroScroll>
        <Timeline orientation="horizontal" className="hidden md:flex" />
      </TimescaleIntroScroll>

      <Timeline orientation="vertical" className="px-4 md:hidden" />

      <div className="screen-line-top h-4" />
    </>
  )
}
