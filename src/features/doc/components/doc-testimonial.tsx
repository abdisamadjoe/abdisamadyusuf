import { cn } from "@/lib/utils"
import type { Testimonial2Props } from "@/registry/components/testimonial-2"
import { Testimonial2 } from "@/registry/components/testimonial-2"

export function DocTestimonial({ className, ...props }: Testimonial2Props) {
  return (
    <Testimonial2
      className={cn("not-prose my-[2.5em]", className)}
      {...props}
    />
  )
}
