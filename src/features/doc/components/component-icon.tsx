import {
  IconBlockquote,
  IconCircle,
  IconCircleSquare,
  IconGridDots,
  IconRipple,
} from "@tabler/icons-react"
import {
  BriefcaseBusinessIcon,
  ChevronsUpDownIcon,
  CopyIcon,
  LayoutGridIcon,
  PaintbrushIcon,
  QuoteIcon,
  ScissorsIcon,
  SeparatorHorizontalIcon,
  SunDimIcon,
  VibrateIcon,
} from "lucide-react"

import { ReactIcon, XIcon } from "@/components/icons"

const COMPONENT_ICONS: Record<string, React.ReactNode> = {
  "work-experience-component": <BriefcaseBusinessIcon />,
  testimonial: <QuoteIcon />,
  "github-contributions": (
    // Icon designed by @abdisamadjoe
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M11 5h2v2h-2zM15 17h2v2h-2zM7 17h2v2H7zM15 5h2v2h-2zM15 13h2v2h-2zM11 13h2v2h-2zM11 17h2v2h-2zM15 9h2v2h-2zM3 13h2v2H3zM3 17h2v2H3zM3 9h2v2H3zM3 5h2v2H3zM7 9h2v2H7zM19 17h2v2h-2zM19 9h2v2h-2zM7 5h2v2H7z"
      />
    </svg>
  ),
  "copy-button": <CopyIcon />,
  "text-flip": <SeparatorHorizontalIcon />,
  haptic: <VibrateIcon />,
  "testimonial-spotlight": <SunDimIcon />,
  "glow-card-grid": <LayoutGridIcon />,
  "middle-truncation": <ScissorsIcon />,
  twemoji: <XIcon />,
  "theme-toggle-effect": <PaintbrushIcon />,
  "icon-swap": <IconCircleSquare />,
  "dot-grid-spotlight": <IconGridDots />,
  "spinning-circular-text": <IconCircle />,
  "chevrons-up-down-icon": <ChevronsUpDownIcon />,
  "logos-carousel": <IconRipple />,
  "testimonial-2": <IconBlockquote />,
  timescale: (
    // Icon designed by @abdisamadjoe
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="3" y1="7" x2="3" y2="17" />
      <line x1="21" y1="7" x2="21" y2="17" />
      <path d="M6 12H8" />
      <path d="M16 12H18" />
      <path d="M11 12H13" />
    </svg>
  ),
}

export function ComponentIcon({ slug }: { slug: string }) {
  return COMPONENT_ICONS[slug] ?? <ReactIcon />
}
