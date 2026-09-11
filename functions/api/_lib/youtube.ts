// Runtime-agnostic YouTube Data API logic, shared by:
// - functions/api/youtube-views.ts (Cloudflare Pages Function, production
//   and `npm run preview` / `wrangler pages dev`)
// - the Vite dev-server middleware in vite.config.ts (`npm run dev`)
//
// Only uses `fetch`/`URL`, both available as globals in Workers and in
// Node >= 22, so it needs no bundler-specific APIs.

// Somali Linux course playlist referenced from the "When I'm Not Building"
// bio entry: https://www.youtube.com/playlist?list=PL6zJ5N-7oCScU0wMS0cqM_sAoruf2RRLw
export const PLAYLIST_ID = "PL6zJ5N-7oCScU0wMS0cqM_sAoruf2RRLw"

// View counts don't need to be fresh to the minute. Caching for 6 hours
// keeps this comfortably inside the YouTube Data API's free daily quota
// regardless of traffic.
export const CACHE_TTL_SECONDS = 60 * 60 * 6

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3"

type PlaylistItemsResponse = {
  items?: { contentDetails?: { videoId?: string } }[]
  nextPageToken?: string
}

type VideosResponse = {
  items?: { statistics?: { viewCount?: string } }[]
}

async function fetchPlaylistVideoIds(apiKey: string): Promise<string[]> {
  const videoIds: string[] = []
  let pageToken: string | undefined

  do {
    const url = new URL(`${YOUTUBE_API_BASE}/playlistItems`)
    url.searchParams.set("part", "contentDetails")
    url.searchParams.set("playlistId", PLAYLIST_ID)
    url.searchParams.set("maxResults", "50")
    url.searchParams.set("key", apiKey)
    if (pageToken) url.searchParams.set("pageToken", pageToken)

    const res = await fetch(url.toString())
    if (!res.ok) {
      throw new Error(`playlistItems request failed with status ${res.status}`)
    }

    const data = (await res.json()) as PlaylistItemsResponse
    for (const item of data.items ?? []) {
      const videoId = item.contentDetails?.videoId
      if (videoId) videoIds.push(videoId)
    }

    pageToken = data.nextPageToken
  } while (pageToken)

  return videoIds
}

async function fetchTotalViews(
  videoIds: string[],
  apiKey: string,
): Promise<number> {
  let totalViews = 0

  // The `videos` endpoint accepts at most 50 ids per request.
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50)

    const url = new URL(`${YOUTUBE_API_BASE}/videos`)
    url.searchParams.set("part", "statistics")
    url.searchParams.set("id", batch.join(","))
    url.searchParams.set("key", apiKey)

    const res = await fetch(url.toString())
    if (!res.ok) {
      throw new Error(`videos request failed with status ${res.status}`)
    }

    const data = (await res.json()) as VideosResponse
    for (const item of data.items ?? []) {
      totalViews += Number(item.statistics?.viewCount ?? 0)
    }
  }

  return totalViews
}

export async function fetchYouTubePlaylistViews(
  apiKey: string,
): Promise<number> {
  const videoIds = await fetchPlaylistVideoIds(apiKey)
  return fetchTotalViews(videoIds, apiKey)
}
