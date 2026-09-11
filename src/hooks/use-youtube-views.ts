import { useEffect, useState } from "react"

type YouTubeViewsResponse = { views: number }

/**
 * Fetches the aggregated view count for the YouTube course playlist from
 * the `/api/youtube-views` Cloudflare Pages Function (see
 * `functions/api/youtube-views.ts`), which keeps the YouTube API key
 * server-side and caches the result at the edge.
 *
 * Runs client-side only (the site is prerendered as static assets, so
 * there's no server available during the build to call this endpoint).
 * Returns `null` until the request resolves, so callers can fall back to a
 * static value while loading or if the request fails.
 */
export function useYouTubeViews() {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch("/api/youtube-views")
      .then((res) =>
        res.ok ? (res.json() as Promise<YouTubeViewsResponse>) : null,
      )
      .then((data) => {
        if (!cancelled && data && typeof data.views === "number") {
          setViews(data.views)
        }
      })
      .catch(() => {
        // Keep the fallback value on any network/API failure.
      })

    return () => {
      cancelled = true
    }
  }, [])

  return views
}
