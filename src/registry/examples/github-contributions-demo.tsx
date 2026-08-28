import { Suspense } from "react"

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/registry/transformed/components/github-contributions"
import { getCachedContributions } from "@/registry/transformed/components/github-contributions/lib/get-cached-contributions"

const GITHUB_USERNAME = "abdisamadjoe"
const GITHUB_PROFILE_URL = "https://github.com/abdisamadjoe"

export default function GitHubContributionsDemo() {
  const contributions = getCachedContributions(GITHUB_USERNAME)

  return (
    <Suspense fallback={<GitHubContributionsFallback />}>
      <GitHubContributions
        contributions={contributions}
        githubProfileUrl={GITHUB_PROFILE_URL}
      />
    </Suspense>
  )
}
