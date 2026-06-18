import { Suspense } from "react"
import type { Metadata } from "next"
import type { ProfilePage as PageSchema, WithContext } from "schema-dts"

import Navbar from "@/components/Navbar"
import { JsonLdScript } from "@/lib/json-ld"
import { cn } from "@/lib/utils"
import { Awards } from "@/features/portfolio/components/awards"
import { Blog } from "@/features/portfolio/components/blog"
import { Bookmarks } from "@/features/portfolio/components/bookmarks"
import { Certifications } from "@/features/portfolio/components/certifications"
import { Components } from "@/features/portfolio/components/components"
import { Experiences } from "@/features/portfolio/components/experiences"
import { Hello } from "@/features/portfolio/components/hello"
import {
  Insights,
  InsightsSkeleton,
} from "@/features/portfolio/components/insights"
import { Overview } from "@/features/portfolio/components/overview"
import { ProfileHeader } from "@/features/portfolio/components/profile-header"
import { Projects } from "@/features/portfolio/components/projects"
import { SocialLinks } from "@/features/portfolio/components/social-links-v2"
import { Sponsors } from "@/features/portfolio/components/sponsors"
import { TechStack } from "@/features/portfolio/components/tech-stack"
import { USER } from "@/features/portfolio/data/user"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <>
      <JsonLdScript data={getPageJsonLd()} />
      <Navbar />

      <main className="max-w-screen overflow-x-clip px-2 group/layout">
        <div className="[--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
          <div className="mx-auto md:max-w-3xl">
            <ProfileHeader />
            <Separator />

            <Overview />
            <SocialLinks />
            <Separator />

            <Hello />
            <Separator />

            <TechStack />
            <Separator />

            <Components />
            <Separator />

            <Blog />
            <Separator />

            <Sponsors />
            <Separator />

            <Experiences />
            <Separator />

            <Projects />
            <Separator />

            <Awards />
            <Separator />

            <Certifications />
            <Separator />

            <Bookmarks />
            <Separator />

            <Suspense fallback={<InsightsSkeleton />}>
              <Insights />
            </Suspense>
          </div>
        </div>
      </main>
    </>
  )
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  }
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "stripe-divider h-(--separator-height) w-full border-x border-line",
        className
      )}
    />
  )
}
