import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      className={cn(
        "group/collapsible not-prose relative my-[1.25em]",
        className
      )}
      {...props}
    >
      <CollapsibleContent
        className="overflow-hidden *:data-rehype-pretty-code-figure:my-0 data-[state=closed]:max-h-80"
        forceMount
      >
        {children}
      </CollapsibleContent>

      <div className="absolute inset-x-0 bottom-0 flex h-32 items-end justify-center group-data-[state=open]/collapsible:hidden">
        <div className="absolute inset-0 bg-linear-to-t from-background to-transparent mask-linear-[to_top,var(--background)_25%,transparent] backdrop-blur-[1px]" />

        <CollapsibleTrigger asChild>
          <Button
            className="z-1 shadow-none dark:border-border dark:bg-background dark:hover:bg-zinc-900"
            variant="outline"
            size="sm"
          >
            Expand
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  )
}
