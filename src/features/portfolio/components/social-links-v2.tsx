import { addQueryParams } from "@/utils/url"

import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/base/ui/tooltip"
import { Panel, PanelContent } from "@/features/portfolio/components/panel"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links-v2"

export function SocialLinks() {
  return (
    <Panel>
      <h2 className="sr-only">Social Links</h2>

      <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {SOCIAL_LINKS.map((item) => (
            <li key={item.name}>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <a
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg",
                        "gradient-border gradient-border-to-tl",
                        "gradient-border-from-foreground/10 gradient-border-to-foreground/20 gradient-border-via-foreground/5",
                        "dark:gradient-border-from-foreground/20 dark:gradient-border-to-foreground/30 dark:gradient-border-via-foreground/6",
                        "bg-linear-to-t from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800",
                        "shadow-[inset_0_-1px_1px_1px] shadow-white dark:shadow-[inset_0_1px_1px_0px] dark:shadow-zinc-900",
                        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-foreground/80 [&_svg]:drop-shadow-xs [&_svg]:drop-shadow-foreground/15 [&_svg:not([class*='size-'])]:size-5"
                      )}
                      href={addQueryParams(item.href, UTM_PARAMS)}
                      target="_blank"
                      rel="noopener"
                    >
                      {item.icon}
                      <span className="sr-only">{item.title}</span>
                    </a>
                  }
                />
                <TooltipContent>{item.title}</TooltipContent>
              </Tooltip>
            </li>
          ))}
        </ul>
      </PanelContent>
    </Panel>
  )
}
