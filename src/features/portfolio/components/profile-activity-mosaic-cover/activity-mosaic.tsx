"use client"

import {
  createContext,
  Fragment,
  useContext,
  useMemo,
  type HTMLAttributes,
  type ReactNode,
} from "react"
import { eachDayOfInterval, formatISO, parseISO } from "date-fns"

import { cn } from "@/lib/utils"

export type Activity = {
  date: string
  count: number
  level: number
}

type ActivityColumn = Array<Activity | undefined>

// const CELL_LEVEL_CLASSES = cn(
//   'data-[level="0"]:fill-muted-foreground/10',
//   'data-[level="1"]:fill-muted-foreground/20',
//   'data-[level="2"]:fill-muted-foreground/40',
//   'data-[level="3"]:fill-muted-foreground/60',
//   'data-[level="4"]:fill-muted-foreground/80'
// )

type ActivityMosaicContextType = {
  activities: Activity[]
  activityColumns: ActivityColumn[]

  rowCount: number
  columnCount: number

  cellMargin: number
  cellRadius: number
  cellSize: number

  maxLevel: number

  width: number
  height: number
}

const ActivityMosaicContext = createContext<ActivityMosaicContextType | null>(
  null
)

const useActivityMosaic = () => {
  const context = useContext(ActivityMosaicContext)

  if (!context) {
    throw new Error(
      "ActivityMosaic components must be used within a ActivityMosaic"
    )
  }

  return context
}

const fillMissingDates = (activities: Activity[]): Activity[] => {
  if (activities.length === 0) {
    return []
  }

  const sortedActivities = [...activities].sort((a, b) =>
    a.date.localeCompare(b.date)
  )

  const activityDateMap = new Map<string, Activity>(
    activities.map((a) => [a.date, a])
  )

  const oldestActivity = sortedActivities[0] as Activity
  const latestActivity = sortedActivities.at(-1)

  if (!latestActivity) {
    return []
  }

  return eachDayOfInterval({
    start: parseISO(oldestActivity.date),
    end: parseISO(latestActivity.date),
  }).map((day) => {
    const date = formatISO(day, { representation: "date" })

    if (activityDateMap.has(date)) {
      return activityDateMap.get(date) as Activity
    }

    return {
      date,
      count: 0,
      level: 0,
    }
  })
}

const groupActivitiesByColumn = (
  activities: Activity[],
  rowCount: number,
  columnCount: number
): ActivityColumn[] => {
  if (activities.length === 0) {
    return []
  }

  const activitiesWithFilledDates = fillMissingDates(activities)

  return new Array(columnCount)
    .fill(undefined)
    .map((_, columnIndex) =>
      activitiesWithFilledDates.slice(
        columnIndex * rowCount,
        columnIndex * rowCount + rowCount
      )
    )
}

export type ActivityMosaicProps = HTMLAttributes<HTMLDivElement> & {
  activities: Activity[]

  rowCount?: number
  columnCount?: number

  cellMargin?: number
  cellRadius?: number
  cellSize?: number

  maxLevel?: number

  children: ReactNode
  className?: string
}

export const ActivityMosaic = ({
  activities,

  rowCount = 10,
  columnCount = 48,

  cellMargin = 2,
  cellRadius = 0,
  cellSize = 14,

  maxLevel: maxLevelProp = 4,

  className,
  ...props
}: ActivityMosaicProps) => {
  const maxLevel = Math.max(1, maxLevelProp)
  const activityColumns = useMemo(
    () => groupActivitiesByColumn(activities, rowCount, columnCount),
    [activities, rowCount, columnCount]
  )

  const width = activityColumns.length * (cellSize + cellMargin) - cellMargin
  const height = (cellSize + cellMargin) * rowCount - cellMargin

  if (activities.length === 0) {
    return null
  }

  return (
    <ActivityMosaicContext.Provider
      value={{
        activities,
        activityColumns,

        rowCount,
        columnCount,

        cellMargin,
        cellRadius,
        cellSize,

        maxLevel,

        width,
        height,
      }}
    >
      <div
        className={cn(
          "flex items-center justify-center overflow-x-clip",
          className
        )}
        {...props}
      />
    </ActivityMosaicContext.Provider>
  )
}

export type ActivityMosaicGridProps = Omit<
  HTMLAttributes<SVGSVGElement>,
  "children"
> & {
  className?: string
  children: (props: {
    activity: Activity
    rowIndex: number
    columnIndex: number
  }) => ReactNode
}

export const ActivityMosaicGrid = ({
  className,
  children,
  ...props
}: ActivityMosaicGridProps) => {
  const { activityColumns, width, height } = useActivityMosaic()

  return (
    <svg
      className={cn("shrink-0", className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      {...props}
    >
      {activityColumns.map((column, columnIndex) => {
        return column.map((activity, rowIndex) => {
          if (!activity) {
            return null
          }

          return (
            <Fragment key={`${columnIndex}-${rowIndex}`}>
              {children({ activity, rowIndex, columnIndex })}
            </Fragment>
          )
        })
      })}
    </svg>
  )
}

export type ActivityMosaicCellProps = HTMLAttributes<SVGRectElement> & {
  activity: Activity
  rowIndex: number
  columnIndex: number
}

export const ActivityMosaicCell = ({
  activity,
  rowIndex,
  columnIndex,
  className,
  ...props
}: ActivityMosaicCellProps) => {
  const { cellSize, cellMargin, cellRadius, maxLevel } = useActivityMosaic()

  if (activity.level < 0 || activity.level > maxLevel) {
    throw new RangeError(
      `Provided activity level ${activity.level} for ${activity.date} is out of range. It must be between 0 and ${maxLevel}.`
    )
  }

  return (
    <rect
      data-level={activity.level}
      className={cn("activity-mosaic-cell", className)}
      width={cellSize}
      height={cellSize}
      x={(cellSize + cellMargin) * columnIndex}
      y={(cellSize + cellMargin) * rowIndex}
      rx={cellRadius}
      ry={cellRadius}
      {...props}
    />
  )
}
