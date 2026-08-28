import { Provider as JotaiProvider } from "jotai"
import { ThemeProvider } from "next-themes"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider as RadixTooltipProvider } from "@/components/ui/tooltip"
import { TooltipProvider as BaseTooltipProvider } from "@/components/base/ui/tooltip"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ThemeProvider
        enableSystem
        disableTransitionOnChange
        enableColorScheme
        storageKey="theme"
        defaultTheme="system"
        attribute="class"
      >
        <BaseTooltipProvider>
          <RadixTooltipProvider>{children}</RadixTooltipProvider>
        </BaseTooltipProvider>

        <KeyboardShortcuts />

        <Toaster position="top-center" />
      </ThemeProvider>
    </JotaiProvider>
  )
}
