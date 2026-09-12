import { CollapsibleList } from "@/components/collapsible-list"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { AWARDS } from "@/features/portfolio/data/awards"

import { AwardItem } from "./award-item"

const ID = "awards"

export function Awards() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Awards</a>
          <PanelTitleSup>({AWARDS.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={AWARDS}
        max={4}
        renderItem={(item) => <AwardItem award={item} />}
      />
    </Panel>
  )
}
