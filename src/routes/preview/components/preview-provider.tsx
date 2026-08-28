"use client"

import { useLayoutEffect, useState } from "react"
import { useIframeMessageListener } from "@/routes/preview/hooks/use-iframe-sync"
import { usePreviewSearchParams } from "@/routes/preview/lib/search-params"
import {
  applyThemeCSSVars,
  clearThemeCSSVars,
  THEME_VARS_STYLE_ID,
} from "@/routes/preview/lib/theme-css-vars"
import {
  applyThemeFonts,
  THEME_FONT_LINK_ID,
} from "@/routes/preview/lib/theme-fonts"
import type { RegistryItem } from "shadcn/schema"

export function PreviewProvider({
  themes,
  children,
}: {
  themes: Map<string, RegistryItem>
  children: React.ReactNode
}) {
  const [previewParams, setPreviewParams] = usePreviewSearchParams()

  const themeParam = previewParams?.theme

  const themeItem = themeParam ? themes.get(themeParam) : null

  const [themeApplied, setThemeApplied] = useState(false)

  // Ready when no theme or theme is applied.
  const isReady = !themeParam || (!!themeItem && themeApplied)

  useIframeMessageListener("preview-params", (nextParams) => {
    setPreviewParams(nextParams)
  })

  useLayoutEffect(() => {
    if (typeof document === "undefined" || !!themeParam || !themeApplied) {
      return
    }

    clearThemeCSSVars(document, THEME_VARS_STYLE_ID)
  }, [themeParam, themeApplied])

  useLayoutEffect(() => {
    if (typeof document === "undefined" || !themeItem) {
      return
    }

    applyThemeFonts(document, themeItem, THEME_FONT_LINK_ID)
    applyThemeCSSVars(document, themeItem, THEME_VARS_STYLE_ID)

    setThemeApplied(true)
  }, [themeItem])

  if (!isReady) {
    return null
  }

  return <>{children}</>
}
