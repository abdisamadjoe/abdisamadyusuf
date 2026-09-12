/// <reference types="@cloudflare/workers-types" />
import { onRequestGet } from "../functions/api/youtube-views"

interface Env {
  ASSETS: Fetcher
  YOUTUBE_API_KEY: string
  CHATBOT_APP_URL?: string
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext,
  ): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === "/api/youtube-views") {
      const context = {
        request,
        env,
        params: {},
        waitUntil: ctx.waitUntil.bind(ctx),
        next: async () => new Response("Not found", { status: 404 }),
        data: {},
      }
      return onRequestGet(context as any)
    }

    return env.ASSETS.fetch(request)
  },
}
