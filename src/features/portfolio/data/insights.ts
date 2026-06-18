import "server-only"

import { unstable_cache } from "next/cache"

type ISODateString = string

type InsightsSummary = {
  unique_visitors: number
  total_sessions: number
  total_screen_views: number
}

type InsightsSeriesItem = {
  date: ISODateString
  unique_visitors: number
  total_sessions: number
}

type InsightsResponse = {
  summary: InsightsSummary
  series: InsightsSeriesItem[]
  startDate: ISODateString
  endDate: ISODateString
}

export const getInsights = unstable_cache(
  async (): Promise<InsightsResponse | null> => {
    try {
      const res = await fetch(
        `https://api.openpanel.dev/insights/${process.env.OPENPANEL_PROJECT_ID}/overview`,
        {
          headers: {
            "openpanel-client-id": process.env.OPENPANEL_CLIENT_ID!,
            "openpanel-client-secret": process.env.OPENPANEL_CLIENT_SECRET!,
          },
        }
      )

      if (!res.ok) {
        return null
      }

      const data = (await res.json()) as InsightsResponse
      return data
    } catch {
      return null
    }
  },
  ["openpanel-insights"],
  { revalidate: 86400 } // Cache for 1 day (86400 seconds)
)
