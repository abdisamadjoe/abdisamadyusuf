import type { DetailedHTMLProps, HTMLAttributes } from "react"

// Custom element defined by https://www.groundwork.co.ke/credit.js
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "groundwork-credit": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { theme?: "auto" | "light" | "dark" }
    }
  }
}
