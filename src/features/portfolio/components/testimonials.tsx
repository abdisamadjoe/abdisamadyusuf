"use client"

import { useRef } from "react"
import { ArrowUpRightIcon } from "lucide-react"
import { useInView, usePageInView } from "motion/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee"
import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialQuote,
} from "@/registry/transformed/components/testimonial"
import { TestimonialSpotlight } from "@/registry/transformed/components/testimonial-spotlight"
import { Twemoji } from "@/registry/transformed/components/twemoji/twemoji"
import {
  TESTIMONIALS_1,
  TESTIMONIALS_2,
} from "@/features/portfolio/data/testimonials"
import type { Testimonial as TestimonialType } from "@/features/portfolio/types/testimonials"

const FEATURED_TESTIMONIALS = [...TESTIMONIALS_1, ...TESTIMONIALS_2]
  .filter((item) => item.isFeatured)
  .sort((a, b) => Number(a.order ?? 999) - Number(b.order ?? 999))

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isPageInView = usePageInView()
  const isInView = useInView(ref)
  const play = isPageInView && isInView

  return (
    <div
      ref={ref}
      className="screen-line-bottom [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!"
    >
      <h3 className="sr-only">Testimonials</h3>

      <div className="grid gap-2 py-2">
        <div className="grid gap-2 px-2 [--spotlight-size:50%] sm:grid-cols-2">
          {FEATURED_TESTIMONIALS.map((item) => (
            <TestimonialSpotlight key={item.url} className="bg-background">
              <TestimonialItem {...item} />
            </TestimonialSpotlight>
          ))}
        </div>

        <TestimonialList data={TESTIMONIALS_1} play={play} />
        <TestimonialList data={TESTIMONIALS_2} direction="right" play={play} />
      </div>

      <div className="absolute right-0 bottom-0 z-10 -translate-x-2 -translate-y-2 rounded-lg bg-background">
        <Button
          className="size-7 border-none shadow-sm ring-1 ring-foreground/10 dark:ring-foreground/15"
          variant="ghost"
          size="icon-sm"
          asChild
        >
          <a
            href="/testimonials"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View more testimonials"
          >
            <ArrowUpRightIcon />
          </a>
        </Button>
      </div>

      <div className="flex h-px" />
    </div>
  )
}

function TestimonialList({
  data,
  direction,
  play,
}: {
  data: TestimonialType[]
  direction?: "right" | "left"
  play?: boolean
}) {
  return (
    <Marquee>
      <MarqueeFade side="left" />
      <MarqueeFade side="right" />

      <MarqueeContent
        direction={direction}
        autoFill={false}
        play={play}
        speed={40}
      >
        {data
          .filter((item) => !item.isFeatured)
          .map((item) => (
            <MarqueeItem
              key={item.url}
              className={cn(
                "mx-1 h-full max-w-xs min-w-2xs rounded-xl bg-background transition-[background-color] ease-out hover:bg-accent-muted",
                "gradient-border gradient-border-from-foreground/0 gradient-border-to-foreground/15 gradient-border-via-foreground/5 gradient-border-to-t"
              )}
              style={item.style}
            >
              <TestimonialItem {...item} />
            </MarqueeItem>
          ))}
      </MarqueeContent>
    </Marquee>
  )
}

function TestimonialItem({
  authorAvatar,
  authorName,
  authorTagline,
  url,
  quote,
  // isVerified,
}: TestimonialType) {
  return (
    <Testimonial className="relative">
      <TestimonialQuote className="font-serif text-base/snug">
        <p>
          <Twemoji>{quote}</Twemoji>
        </p>
      </TestimonialQuote>

      <TestimonialAuthor>
        <TestimonialAvatar>
          <TestimonialAvatarImg src={authorAvatar} alt={authorName} />
          <TestimonialAvatarRing />
        </TestimonialAvatar>

        <TestimonialAuthorName>
          <a href={url} target="_blank" rel="noopener">
            <span className="absolute inset-0" aria-hidden />
            {authorName}
          </a>
          {/* {isVerified && (
            <TestimonialVerifiedBadge className="text-info">
              <VerifiedIcon />
            </TestimonialVerifiedBadge>
          )} */}
        </TestimonialAuthorName>
        <TestimonialAuthorTagline>{authorTagline}</TestimonialAuthorTagline>
      </TestimonialAuthor>
    </Testimonial>
  )
}
