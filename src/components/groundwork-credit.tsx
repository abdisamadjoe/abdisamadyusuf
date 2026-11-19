"use client"

import { useTheme } from "next-themes"

/**
 * Groundwork Technologies credit. The element is upgraded by the hosted
 * script loaded in `root.tsx`; the inner link stays visible without JS.
 */
export function GroundworkCredit() {
  const { resolvedTheme } = useTheme()
  const theme =
    resolvedTheme === "dark" || resolvedTheme === "light"
      ? resolvedTheme
      : "auto"

  return (
    <groundwork-credit theme={theme} suppressHydrationWarning>
      <a href="https://www.groundwork.co.ke/">
        Powered by Groundwork Technologies
      </a>
    </groundwork-credit>
  )
}
