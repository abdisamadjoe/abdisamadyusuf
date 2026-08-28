"use client"

import { useEffect, useState } from "react"

import { SOURCE_CODE_GITHUB_REPO } from "@/config/site"
import { GitHubStars } from "@/components/github-stars"

export function NavItemGitHub() {
  const [stargazersCount, setStargazersCount] = useState(0)

  useEffect(() => {
    let cancelled = false

    fetch(`https://api.github.com/repos/${SOURCE_CODE_GITHUB_REPO}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10",
      },
    })
      .then((response) => {
        if (!response.ok) return null
        return response.json() as Promise<{ stargazers_count?: number }>
      })
      .then((json: { stargazers_count?: number } | null) => {
        if (!cancelled) {
          setStargazersCount(Number(json?.stargazers_count) || 0)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStargazersCount(0)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <GitHubStars
      repo={SOURCE_CODE_GITHUB_REPO}
      stargazersCount={stargazersCount}
    />
  )
}
