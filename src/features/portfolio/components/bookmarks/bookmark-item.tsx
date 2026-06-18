import { addQueryParams } from "@/utils/url"
import { format } from "date-fns"
import { ArrowUpRightIcon, BookmarkIcon } from "lucide-react"

import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import type { Bookmark } from "@/features/portfolio/types/bookmarks"

export function BookmarkItem({
  className,
  bookmark,
}: {
  className?: string
  bookmark: Bookmark
}) {
  return (
    <div
      className={cn(
        "relative flex items-center pr-2 hover:bg-accent-muted",
        className
      )}
    >
      <div
        className={cn(
          "mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg select-none",
          "border border-muted-foreground/15 ring-1 ring-line ring-offset-1 ring-offset-background",
          "bg-muted text-muted-foreground [&_svg]:size-4"
        )}
      >
        {bookmark.icon ?? <BookmarkIcon />}
      </div>

      <div className="flex-1 space-y-1 border-l border-dashed border-line p-4 pr-2">
        <h3 className="leading-snug font-medium text-balance">
          <a
            href={addQueryParams(bookmark.url, UTM_PARAMS)}
            target="_blank"
            rel="noopener"
          >
            <span className="absolute inset-0" aria-hidden />
            {bookmark.title}
          </a>
        </h3>

        <dl className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          {bookmark.author && (
            <>
              <div>
                <dt className="sr-only">Author</dt>
                <dd>{bookmark.author}</dd>
              </div>

              <Separator
                className="data-vertical:h-4 data-vertical:self-center"
                orientation="vertical"
                aria-hidden
              />
            </>
          )}

          <div>
            <dt className="sr-only">Bookmarked on</dt>
            <dd>
              <time dateTime={new Date(bookmark.bookmarkedAt).toISOString()}>
                {format(new Date(bookmark.bookmarkedAt), "dd.MM.yyyy")}
              </time>
            </dd>
          </div>
        </dl>
      </div>

      <ArrowUpRightIcon className="size-4 text-muted-foreground" />
    </div>
  )
}
