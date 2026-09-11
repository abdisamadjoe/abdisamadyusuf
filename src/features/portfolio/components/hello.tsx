import { Markdown } from "@/components/markdown"
import { HelloTitle } from "@/features/portfolio/components/hello-title"
import {
  Panel,
  PanelContent,
  PanelHeader,
} from "@/features/portfolio/components/panel"
import {
  USER,
  YOUTUBE_VIEWS_FALLBACK,
  YOUTUBE_VIEWS_PLACEHOLDER,
} from "@/features/portfolio/data/user"
import { useYouTubeViews } from "@/hooks/use-youtube-views"

const ID = "hello"

export function Hello() {
  const views = useYouTubeViews()
  const formattedViews =
    views !== null
      ? `${new Intl.NumberFormat("en-US").format(views)}+`
      : YOUTUBE_VIEWS_FALLBACK
  const about = USER.about.replace(YOUTUBE_VIEWS_PLACEHOLDER, formattedViews)

  return (
    <Panel id={ID}>
      <PanelHeader>
        <HelloTitle />
      </PanelHeader>

      <PanelContent>
        <div className="typeset typeset-description [&_li]:ps-0.5 [&_ul]:ps-3.5">
          <Markdown>{about}</Markdown>
        </div>
      </PanelContent>
    </Panel>
  )
}
