import { format } from "date-fns"

import Grid from "@/components/charts/grid"
import LineChart, { Line } from "@/components/charts/line-chart"
import { ChartTooltip } from "@/components/charts/tooltip"
import {
  Metric,
  MetricLabel,
  MetricValue,
} from "@/registry/blocks/metrics-01/components/metric"

export function Metrics01() {
  return (
    <div className="max-w-screen overflow-x-clip">
      <div className="container mx-auto px-4">
        <div className="border-x border-line py-8">
          <div className="screen-line-top screen-line-bottom">
            <h2 className="screen-line-bottom ml-4 font-heading text-3xl font-semibold tracking-tight">
              Insights
              <sup className="top-[-0.75em] ml-1 text-sm font-medium tracking-normal text-muted-foreground">
                ({format(new Date(data.startDate), "dd.MM")} –{" "}
                {format(new Date(data.endDate), "dd.MM")})
              </sup>
            </h2>

            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-2 md:grid-cols-4">
                <div className="border-r border-line" />
                <div className="border-r border-line max-md:hidden" />
                <div className="border-r border-line max-md:hidden" />
              </div>

              <dl className="grid grid-cols-2 md:grid-cols-4">
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

                <Metric>
                  <MetricLabel>Pages per session</MetricLabel>
                  <MetricValue>
                    {data.summary.views_per_session.toLocaleString()}
                  </MetricValue>
                </Metric>
              </dl>
            </div>

            {data.series.length > 0 ? (
              <LineChart
                className="md:aspect-3/1!"
                data={data.series}
                margin={{ top: 16, right: 32, bottom: 40, left: 32 }}
              >
                <Grid horizontal />
                <Line
                  dataKey="total_sessions"
                  stroke="var(--chart-line-secondary)"
                  strokeWidth={2}
                />
                <Line
                  dataKey="unique_visitors"
                  stroke="var(--chart-line-primary)"
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
              <div className="grid aspect-2/1 w-full place-content-center md:aspect-3/1">
                <p className="text-muted-foreground">No insights available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

type ISODateString = string

type InsightsSummary = {
  unique_visitors: number
  total_sessions: number
  total_screen_views: number
  views_per_session: number
}

type InsightsSeriesItem = {
  date: ISODateString
  unique_visitors: number
  total_sessions: number
}

type InsightsData = {
  summary: InsightsSummary
  series: InsightsSeriesItem[]
  startDate: ISODateString
  endDate: ISODateString
}

const data: InsightsData = {
  summary: {
    unique_visitors: 13582,
    total_sessions: 16010,
    total_screen_views: 102216,
    views_per_session: 6.38,
  },
  series: [
    {
      date: "2026-04-24T00:00:00.000Z",
      unique_visitors: 295,
      total_sessions: 362,
    },
    {
      date: "2026-04-25T00:00:00.000Z",
      unique_visitors: 320,
      total_sessions: 375,
    },
    {
      date: "2026-04-26T00:00:00.000Z",
      unique_visitors: 324,
      total_sessions: 405,
    },
    {
      date: "2026-04-27T00:00:00.000Z",
      unique_visitors: 435,
      total_sessions: 490,
    },
    {
      date: "2026-04-28T00:00:00.000Z",
      unique_visitors: 548,
      total_sessions: 624,
    },
    {
      date: "2026-04-29T00:00:00.000Z",
      unique_visitors: 627,
      total_sessions: 694,
    },
    {
      date: "2026-04-30T00:00:00.000Z",
      unique_visitors: 537,
      total_sessions: 612,
    },
    {
      date: "2026-05-01T00:00:00.000Z",
      unique_visitors: 391,
      total_sessions: 455,
    },
    {
      date: "2026-05-02T00:00:00.000Z",
      unique_visitors: 377,
      total_sessions: 428,
    },
    {
      date: "2026-05-03T00:00:00.000Z",
      unique_visitors: 401,
      total_sessions: 475,
    },
    {
      date: "2026-05-04T00:00:00.000Z",
      unique_visitors: 407,
      total_sessions: 487,
    },
    {
      date: "2026-05-05T00:00:00.000Z",
      unique_visitors: 582,
      total_sessions: 661,
    },
    {
      date: "2026-05-06T00:00:00.000Z",
      unique_visitors: 1366,
      total_sessions: 1517,
    },
    {
      date: "2026-05-07T00:00:00.000Z",
      unique_visitors: 777,
      total_sessions: 885,
    },
    {
      date: "2026-05-08T00:00:00.000Z",
      unique_visitors: 474,
      total_sessions: 549,
    },
    {
      date: "2026-05-09T00:00:00.000Z",
      unique_visitors: 397,
      total_sessions: 466,
    },
    {
      date: "2026-05-10T00:00:00.000Z",
      unique_visitors: 363,
      total_sessions: 425,
    },
    {
      date: "2026-05-11T00:00:00.000Z",
      unique_visitors: 411,
      total_sessions: 494,
    },
    {
      date: "2026-05-12T00:00:00.000Z",
      unique_visitors: 520,
      total_sessions: 598,
    },
    {
      date: "2026-05-13T00:00:00.000Z",
      unique_visitors: 466,
      total_sessions: 552,
    },
    {
      date: "2026-05-14T00:00:00.000Z",
      unique_visitors: 447,
      total_sessions: 517,
    },
    {
      date: "2026-05-15T00:00:00.000Z",
      unique_visitors: 369,
      total_sessions: 411,
    },
    {
      date: "2026-05-16T00:00:00.000Z",
      unique_visitors: 372,
      total_sessions: 421,
    },
    {
      date: "2026-05-17T00:00:00.000Z",
      unique_visitors: 328,
      total_sessions: 385,
    },
    {
      date: "2026-05-18T00:00:00.000Z",
      unique_visitors: 415,
      total_sessions: 492,
    },
    {
      date: "2026-05-19T00:00:00.000Z",
      unique_visitors: 396,
      total_sessions: 462,
    },
    {
      date: "2026-05-20T00:00:00.000Z",
      unique_visitors: 416,
      total_sessions: 473,
    },
    {
      date: "2026-05-21T00:00:00.000Z",
      unique_visitors: 431,
      total_sessions: 491,
    },
    {
      date: "2026-05-22T00:00:00.000Z",
      unique_visitors: 409,
      total_sessions: 397,
    },
    {
      date: "2026-05-23T00:00:00.000Z",
      unique_visitors: 419,
      total_sessions: 407,
    },
  ],
  startDate: "2026-04-24",
  endDate: "2026-05-24",
}
