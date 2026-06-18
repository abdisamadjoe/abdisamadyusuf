import "server-only"

import { unstable_cache } from "next/cache"

import { GITHUB_USERNAME } from "@/config/site"
import type { Activity } from "@/registry/components/contribution-graph"

type GitHubContributionsResponse = {
  contributions: Activity[]
}

export const getGitHubContributions = unstable_cache(
  async () => {
    const apiUrl = process.env.GITHUB_CONTRIBUTIONS_API_URL
    if (!apiUrl) {
      console.warn("GITHUB_CONTRIBUTIONS_API_URL is not set.")
      return []
    }
    try {
      const res = await fetch(
        `${apiUrl}/v4/${GITHUB_USERNAME}?y=last`
      )
      if (!res.ok) {
        throw new Error(`Failed to fetch GitHub contributions: ${res.statusText}`)
      }
      const data = (await res.json()) as GitHubContributionsResponse
      return data.contributions
    } catch (error) {
      console.error("Error fetching GitHub contributions:", error)
      return []
    }
  },
  ["github-contributions"],
  { revalidate: 86400 } // Cache for 1 day (86400 seconds)
)
