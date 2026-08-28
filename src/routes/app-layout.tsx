import { lazy, Suspense } from "react"
import { Outlet, useLoaderData } from "react-router"

import { SiteBottomNav } from "@/components/site-bottom-nav"
import { SiteFooterCad } from "@/components/site-footer-cad"
import { SiteHeader } from "@/components/site-header"
import { getAllDocs } from "@/features/doc/data/documents.server"
import type { DocPreview } from "@/features/doc/types/document"

export async function loader() {
  const docs = getAllDocs()
  const docPreviews: DocPreview[] = docs.map((doc) => ({
    slug: doc.slug,
    title: doc.metadata.title,
    category: doc.metadata.category,
  }))
  return { docPreviews }
}

const ScrollToTop = lazy(() =>
  import("@/components/scroll-to-top").then((mod) => ({
    default: mod.ScrollToTop,
  }))
)

export default function AppLayout() {
  const { docPreviews } = useLoaderData<typeof loader>()

  return (
    <div className="group/layout relative isolate">
      <SiteHeader docPreviews={docPreviews} />
      <main className="max-w-screen overflow-x-clip px-2">
        <Outlet />
      </main>
      <SiteFooterCad />
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-50"
        aria-hidden
      >
        <div className="h-(--fade-bottom-height) bg-linear-to-b from-transparent to-background mask-linear-[to_top,var(--background)_25%,transparent] backdrop-blur-[1px]" />
        <div className="bg-background pb-[env(safe-area-inset-bottom,0)]" />
      </div>
      <SiteBottomNav docPreviews={docPreviews} />
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </div>
  )
}
