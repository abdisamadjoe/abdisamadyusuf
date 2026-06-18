import { format } from "date-fns"

import { cn } from "@/lib/utils"
import Grid from "@/components/charts/grid"
import LineChart, { Line } from "@/components/charts/line-chart"
import { ChartTooltip } from "@/components/charts/tooltip"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { getInsights } from "@/features/portfolio/data/insights"

const ID = "insights"

export async function Insights() {
  const data = await getInsights()

  if (data === null) {
    return null
  }

  return (
    <Panel id={ID} className="screen-line-bottom-none">
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Insights</a>
          <PanelTitleSup>
            ({format(new Date(data.startDate), "dd.MM")} –{" "}
            {format(new Date(data.endDate), "dd.MM")})
          </PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-2 sm:grid-cols-3">
          <div className="border-r border-line" />
          <div className="border-r border-line max-sm:hidden" />
        </div>

        <dl className="grid grid-cols-2 sm:grid-cols-3">
          <Metric>
            <MetricLabel>Unique Visitors</MetricLabel>
            <MetricValue>
              {data.summary.unique_visitors.toLocaleString()}
            </MetricValue>
          </Metric>

          <Metric>
            <MetricLabel>Sessions</MetricLabel>
            <MetricValue>
              {data.summary.total_sessions.toLocaleString()}
            </MetricValue>
          </Metric>

          <Metric>
            <MetricLabel>Views</MetricLabel>
            <MetricValue>
              {data.summary.total_screen_views.toLocaleString()}
            </MetricValue>
          </Metric>
        </dl>
      </div>

      <figure>
        {data.series.length > 0 ? (
          <LineChart
            className={cn(
              "sm:aspect-3/1!",
              "[--chart-1:var(--color-zinc-900)] [--chart-2:var(--color-zinc-400)]",
              "dark:[--chart-1:var(--color-zinc-100)] dark:[--chart-2:var(--color-zinc-600)]"
            )}
            data={data.series}
            margin={{ top: 16, right: 32, bottom: 40, left: 32 }}
          >
            <Grid horizontal />
            <Line
              dataKey="total_sessions"
              stroke="var(--chart-2)"
              strokeWidth={2}
            />
            <Line
              dataKey="unique_visitors"
              stroke="var(--chart-1)"
              strokeWidth={2}
            />
            <ChartTooltip
              rowLabels={{
                total_sessions: "Sessions",
                unique_visitors: "Unique Visitors",
              }}
            />
          </LineChart>
        ) : (
          <div className="grid aspect-2/1 w-full place-content-center sm:aspect-3/1">
            <p className="text-muted-foreground">No insights available.</p>
          </div>
        )}

        <figcaption className="pointer-events-none absolute right-2 bottom-2 bg-background font-mono text-xs leading-none text-zinc-400 select-none sm:right-4 dark:text-zinc-700">
          FIG_002
        </figcaption>
      </figure>
    </Panel>
  )
}

function Metric({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="metric"
      className={cn(
        "flex flex-col gap-2 p-4",
        "max-sm:nth-[2n+1]:screen-line-bottom sm:nth-[3n+1]:screen-line-bottom",
        className
      )}
      {...props}
    />
  )
}

function MetricLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <dt
      data-slot="metric-label"
      className={cn("text-sm leading-none text-muted-foreground", className)}
      {...props}
    />
  )
}

function MetricValue({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <dd
      data-slot="metric-value"
      className={cn(
        "text-lg leading-none font-semibold tabular-nums",
        className
      )}
      {...props}
    />
  )
}

export function InsightsSkeleton() {
  return <Panel className="h-90.75" />
}
