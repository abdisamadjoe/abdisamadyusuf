"use client"

import type { Activity } from "./activity-mosaic"
import {
  ActivityMosaic,
  ActivityMosaicCell,
  ActivityMosaicGrid,
} from "./activity-mosaic"

export function ActivityMosaicCover({
  activities,
  rowCount,
  columnCount,
}: {
  activities: Activity[]
  rowCount: number
  columnCount: number
}) {
  return (
    <div
      className="screen-line-top screen-line-bottom w-full border-x border-line p-0.5 before:-top-px after:-bottom-px"
      aria-hidden
    >
      <ActivityMosaic
        className="opacity-50"
        activities={activities}
        rowCount={rowCount}
        columnCount={columnCount}
      >
        <ActivityMosaicGrid>
          {({ activity, rowIndex, columnIndex }) => (
            <ActivityMosaicCell
              activity={activity}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
            />
          )}
        </ActivityMosaicGrid>
      </ActivityMosaic>
    </div>
  )
}
