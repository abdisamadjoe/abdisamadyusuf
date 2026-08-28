"use client"

import { useTheme } from "next-themes"

export function RemountOnThemeChange(props: React.ComponentProps<"div">) {
  const { resolvedTheme } = useTheme()

  return <div key={resolvedTheme} {...props} />
}
