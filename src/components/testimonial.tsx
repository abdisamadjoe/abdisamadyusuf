import { cn } from "@/lib/utils"
import type { Testimonial as TestimonialType } from "@/features/portfolio/types/testimonials"

export function Testimonial({
  className,
  authorName,
  authorTagline,
  url,
  quote,
}: TestimonialType & { className?: string }) {
  return (
    <div
      className={cn(
        "not-prose relative my-[2.5em] flex flex-col gap-6 pl-3",
        className
      )}
    >
      <div className="relative block w-full font-serif text-xl text-foreground md:w-lg md:text-2xl">
        <span
          className="absolute -left-3 text-muted-foreground select-none"
          aria-hidden="true"
        >
          “
        </span>
        <p className="inline text-pretty">{quote}</p>
        <span
          className="absolute translate-x-0.5 text-muted-foreground select-none"
          aria-hidden="true"
        >
          ”
        </span>
      </div>

      <div className="ml-auto flex w-full items-center gap-2 md:w-1/2">
        <div className="hidden h-px grow translate-y-px bg-border md:block" />

        <div className="flex flex-col md:ml-auto md:text-right">
          <span className="text-sm leading-none font-medium">
            <a href={url} target="_blank" rel="noopener">
              <span className="absolute inset-0" aria-hidden />
              {authorName}
            </a>
            <span className="mt-1 block text-muted-foreground md:mt-0 md:inline">
              <span className="hidden text-foreground md:inline">, </span>
              {authorTagline}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
