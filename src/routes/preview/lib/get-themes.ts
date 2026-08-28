import { cache } from "react"
import type { RegistryItem } from "shadcn/schema"

import { getShadcnThemes } from "./shadcn"
import { getTweakcnThemes } from "./tweakcn"

let tweakcnThemesCache: RegistryItem[] | null = null
let tweakcnThemesCacheTime = 0

async function getCachedTweakcnThemes() {
  const now = Date.now()
  if (
    tweakcnThemesCache &&
    now - tweakcnThemesCacheTime < 1000 * 60 * 60 * 24
  ) {
    return tweakcnThemesCache
  }
  const themes = await getTweakcnThemes()
  tweakcnThemesCache = themes
  tweakcnThemesCacheTime = now
  return themes
}

export const getCachedThemes = cache(
  async (): Promise<Map<string, RegistryItem>> => {
    const shadcnThemes = getShadcnThemes()
    const tweakcnThemes = await getCachedTweakcnThemes()
    const themes = [...shadcnThemes, ...tweakcnThemes]
    return new Map(themes.map((theme) => [theme.name, theme]))
  }
)
