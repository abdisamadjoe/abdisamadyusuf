// Cloudflare Pages Function: GET /api/youtube-views
//
// The site itself is prerendered and deployed as static assets (see
// react-router.config.ts), so it has no long-running server that can hold a
// secret or do periodic work. Pages Functions run alongside the static
// assets as on-demand edge Workers, which is what lets this route keep the
// YouTube API key server-side and cache the result, instead of calling the
// YouTube Data API from the browser on every page load.
//
// Local dev: `npm run dev` (Vite) does NOT run Pages Functions — it's
// served there by the middleware in vite.config.ts instead (same fetch
// logic, see ./_lib/youtube.ts). To exercise this file itself, set
// YOUTUBE_API_KEY in `.dev.vars` (gitignored) and run `npm run preview`
// (or `wrangler pages dev`).
// Production: set YOUTUBE_API_KEY as an encrypted environment variable on
// the Cloudflare Pages project. Never commit it or reference it from
// client-side code.

import { CACHE_TTL_SECONDS, fetchYouTubePlaylistViews } from "./_lib/youtube"

interface Env {
  YOUTUBE_API_KEY: string
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  // Cloudflare's edge cache, keyed by the request. This is what avoids
  // calling the YouTube Data API on every page load.
  const cache = caches.default
  const cacheKey = new Request(context.request.url, context.request)

  const cached = await cache.match(cacheKey)
  if (cached) return cached

  if (!context.env.YOUTUBE_API_KEY) {
    console.error("YOUTUBE_API_KEY is not configured.")
    return Response.json(
      { error: "YouTube API key is not configured." },
      { status: 500 },
    )
  }

  try {
    const views = await fetchYouTubePlaylistViews(context.env.YOUTUBE_API_KEY)

    const response = Response.json(
      { views },
      {
        headers: {
          "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}`,
        },
      },
    )

    context.waitUntil(cache.put(cacheKey, response.clone()))

    return response
  } catch (error) {
    console.error("Failed to fetch YouTube views:", error)
    return Response.json(
      { error: "Failed to fetch YouTube views." },
      { status: 502 },
    )
  }
}
