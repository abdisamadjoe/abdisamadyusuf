import { X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { cn } from "@/lib/utils"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialQuote,
} from "@/registry/components/testimonial"
import { Twemoji } from "@/registry/components/twemoji/twemoji"
import {
  TESTIMONIALS_1,
  TESTIMONIALS_2,
} from "@/features/portfolio/data/testimonials"

const title = "Testimonials"
const description = "Trusted by top builders."
const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export function meta() {
  return [
    { title: `${title} – Abdisamad Yusuf` },
    { name: "description", content: description },
    {
      tagName: "link",
      rel: "canonical",
      href: "/testimonials",
    },
    { property: "og:url", content: "/testimonials" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: X_HANDLE },
    { name: "twitter:creator", content: X_HANDLE },
    { name: "twitter:image", content: ogImage },
  ]
}

const TESTIMONIALS = [...TESTIMONIALS_1, ...TESTIMONIALS_2].sort(
  (a, b) => Number(a.order ?? 999) - Number(b.order ?? 999)
)

export default function TestimonialsPage() {
  return (
    <>
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "Home",
            href: "/",
          },
          {
            name: "Testimonials",
            href: "/testimonials",
          },
        ])}
      />

      <div className="min-h-svh">
        <PageHeading>
          <PageHeadingTagline>Testimonials</PageHeadingTagline>
          <PageHeadingTitle>
            Trusted by top builders on <span aria-label="X">𝕏</span>
          </PageHeadingTitle>
        </PageHeading>

        <div className="relative pt-4">
          <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
            <div className="border-r border-line" />
            <div className="border-l border-line" />
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {TESTIMONIALS.map((item) => (
              <li
                key={item.url}
                className={cn(
                  "group/testimonial",
                  "max-sm:screen-line-top max-sm:screen-line-bottom",
                  "sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom"
                )}
              >
                <Testimonial className="relative transition-[background-color] ease-out hover:bg-accent-muted">
                  <TestimonialQuote className="font-serif text-base/snug">
                    <p>
                      <Twemoji className="grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/testimonial:grayscale-0">
                        {item.quote}
                      </Twemoji>
                    </p>
                  </TestimonialQuote>

                  <TestimonialAuthor>
                    <TestimonialAvatar>
                      <TestimonialAvatarImg
                        className="grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/testimonial:grayscale-0"
                        src={item.authorAvatar}
                        alt={item.authorName}
                      />
                      <TestimonialAvatarRing />
                    </TestimonialAvatar>

                    <TestimonialAuthorName>
                      <a href={item.url} target="_blank" rel="noopener">
                        <span className="absolute inset-0" aria-hidden />
                        {item.authorName}
                      </a>
                    </TestimonialAuthorName>
                    <TestimonialAuthorTagline>
                      {item.authorTagline}
                    </TestimonialAuthorTagline>
                  </TestimonialAuthor>
                </Testimonial>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-4" />
      </div>
    </>
  )
}
