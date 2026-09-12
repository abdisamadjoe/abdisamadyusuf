import { format } from "date-fns"
import { ArrowUpRightIcon, TrophyIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Markdown } from "@/components/markdown"
import { IconTile } from "@/components/ui/icon-tile"
import { Separator } from "@/components/base/ui/separator"

import type { Award } from "../../types/awards"

export function AwardItem({
  className,
  award,
}: {
  className?: string
  award: Award
}) {
  return (
    <div
      className={cn(
        "group/award relative flex items-start pr-2 hover:bg-accent-muted",
        className
      )}
    >
      <IconTile className="mx-4 mt-4 shrink-0">
        {award.icon ?? <TrophyIcon />}
      </IconTile>

      <div className="flex-1 space-y-1 border-l border-dashed border-line p-4 pr-2">
        <h3 className="leading-snug font-medium text-balance">
          {award.referenceLink ? (
            <a href={award.referenceLink} target="_blank" rel="noopener">
              <span className="absolute inset-0" aria-hidden />
              {award.title}
            </a>
          ) : (
            award.title
          )}
        </h3>

        <dl className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
          <div>
            <dt className="sr-only">Prize</dt>
            <dd>{award.prize}</dd>
          </div>

          <Separator
            className="data-vertical:h-4 data-vertical:self-center"
            orientation="vertical"
            aria-hidden
          />

          <div>
            <dt className="sr-only">Context</dt>
            <dd>{award.grade}</dd>
          </div>

          <Separator
            className="data-vertical:h-4 data-vertical:self-center"
            orientation="vertical"
            aria-hidden
          />

          <div>
            <dt className="sr-only">Date</dt>
            <dd>
              <time dateTime={award.date}>
                {format(new Date(`${award.date}-01`), "MMM yyyy")}
              </time>
            </dd>
          </div>
        </dl>

        {award.description && (
          <div className="text-sm text-muted-foreground">
            <Markdown>{award.description}</Markdown>
          </div>
        )}
      </div>

      {award.referenceLink && (
        <ArrowUpRightIcon className="mt-4 size-4 text-muted-foreground" />
      )}
    </div>
  )
}
