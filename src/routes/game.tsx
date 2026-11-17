import { Suspense } from "react"
import { useSearchParams } from "react-router"

import { X_HANDLE } from "@/config/site"
import { absoluteUrl } from "@/lib/utils"
import { Daikanoid } from "@/components/daikanoid"

export function meta() {
  return [
    { title: "Abdisamad Yusuf: Daikanoid Browser Game" },
    {
      name: "description",
      content:
        "Play Daikanoid, a free brick-breaker game in your browser, built by Abdisamad Yusuf.",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: absoluteUrl("/game"),
    },
    { property: "og:url", content: absoluteUrl("/game") },
    { property: "og:type", content: "website" },
    {
      property: "og:image",
      content: "https://assets.abdisamadjoe.com/images/blog/daikanoid.webp",
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: X_HANDLE },
    { name: "twitter:creator", content: X_HANDLE },
    {
      name: "twitter:image",
      content: "https://assets.abdisamadjoe.com/images/blog/daikanoid.webp",
    },
  ]
}

export function Game() {
  const [searchParams] = useSearchParams()
  const defaultLogo = searchParams.get("logo")

  return <Daikanoid defaultLogo={defaultLogo ?? undefined} />
}

export default function GamePage() {
  return (
    <div className="grid min-h-svh place-items-center py-6">
      <h1 className="sr-only">Daikanoid</h1>

      <section className="flex flex-col items-center gap-6 lg:hidden">
        <p>Open this page on a desktop to play.</p>
      </section>

      <section className="max-lg:hidden">
        <Suspense fallback={<div className="h-150 w-200 ring-1 ring-border" />}>
          <Game />
        </Suspense>
      </section>
    </div>
  )
}
