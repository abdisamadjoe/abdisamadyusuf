import { Suspense } from "react"
import { useLoaderData } from "react-router"

import { JSON_LD_ID } from "@/config/json-ld"
import { JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl, cn } from "@/lib/utils"
import { getBlogPosts } from "@/features/doc/data/documents.server"
import { Blog } from "@/features/portfolio/components/blog"
import { Certifications } from "@/features/portfolio/components/certifications"
import { Education } from "@/features/portfolio/components/education"
import { GitHubContributions } from "@/features/portfolio/components/github-contributions"
import { Hello } from "@/features/portfolio/components/hello"
import {
  Insights,
  InsightsSkeleton,
} from "@/features/portfolio/components/insights"
import { Overview } from "@/features/portfolio/components/overview"
import { ProfileHeader } from "@/features/portfolio/components/profile-header"
import { Projects } from "@/features/portfolio/components/projects"
import { SocialLinks } from "@/features/portfolio/components/social-links"
import { TechStack } from "@/features/portfolio/components/tech-stack"
import { Testimonials } from "@/features/portfolio/components/testimonials"
import { getInsights } from "@/features/portfolio/data/insights"
import { USER } from "@/features/portfolio/data/user"

export function meta() {
  return [
    { title: `${USER.displayName} – ${USER.jobTitle}` },
    { name: "description", content: USER.bio },
    {
      tagName: "link",
      rel: "canonical",
      href: absoluteUrl("/"),
    },
  ]
}

export async function loader() {
  const insightsData = await getInsights()
  const blogPosts = getBlogPosts()
  return { insightsData, blogPosts }
}

export default function Home() {
  const { insightsData, blogPosts } = useLoaderData<typeof loader>()
  return (
    <>
      <JsonLdScript data={getProfilePageJsonLd()} />

      <div className="[--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
        <div className="mx-auto md:max-w-3xl">
          <ProfileHeader />
          <Separator />

          <Overview />
          <SocialLinks />
          <GitHubContributions />
          <Separator />

          <Hello />
          <Separator />

          <Testimonials />
          <Separator />

          <Blog posts={blogPosts} />
          <Separator />

          <TechStack />
          <Separator />

          <Education />
          <Separator />

          <Projects />
          <Separator />

          <Certifications />
          <Separator />

          <Suspense fallback={<InsightsSkeleton />}>
            <Insights data={insightsData} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

function getProfilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/"),
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: { "@id": JSON_LD_ID.person },
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
