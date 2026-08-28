import { getRegistryItemUrl } from "@/utils/registry"
import type { Registry } from "shadcn/schema"

export const components: Registry["items"] = [
  {
    name: "text-flip",
    type: "registry:component",
    title: "Text Flip",
    description:
      "Animated text that cycles through items with a smooth flip transition.",
    dependencies: ["motion"],
    files: [
      {
        path: "components/text-flip/text-flip.tsx",
        type: "registry:component",
        target: "@components/text-flip.tsx",
      },
    ],
    categories: ["text-effects"],
    docs: "https://abdisamadjoe.com/components/text-flip",
  },
  {
    name: "chevrons-up-down-icon",
    type: "registry:component",
    description:
      "Animated chevrons icon that morphs between up and down directions.",
    dependencies: ["motion"],
    files: [
      {
        path: "components/chevrons-up-down-icon/chevrons-up-down-icon.tsx",
        type: "registry:component",
        target: "@components/chevrons-up-down-icon.tsx",
      },
    ],
    categories: ["effects"],
    docs: "https://abdisamadjoe.com/components/chevrons-up-down-icon",
  },
  {
    name: "testimonial",
    type: "registry:component",
    title: "Testimonial",
    description:
      "Display user feedback with author info, avatar, and verified badge.",
    files: [
      {
        path: "components/testimonial/testimonial.tsx",
        type: "registry:component",
        target: "@components/testimonial.tsx",
      },
    ],
    categories: ["marketing"],
    docs: "https://abdisamadjoe.com/components/testimonial",
  },
  {
    name: "copy-button",
    type: "registry:component",
    title: "Copy Button",
    description:
      "Copy text to clipboard with visual, haptic, and audio feedback.",
    dependencies: ["motion", "@rexa-developer/tiks", "web-haptics"],
    registryDependencies: ["button", getRegistryItemUrl("icon-swap")],
    files: [
      {
        path: "components/copy-button/copy-button.tsx",
        type: "registry:component",
        target: "@components/copy-button.tsx",
      },
      {
        path: "src/hooks/use-copy-to-clipboard.ts",
        type: "registry:hook",
        target: "@hooks/use-copy-to-clipboard.ts",
      },
    ],
    categories: ["utilities"],
    docs: "https://abdisamadjoe.com/components/copy-button",
  },
  {
    name: "testimonial-spotlight",
    type: "registry:component",
    title: "Testimonial Spotlight",
    description: "Testimonial card with spotlight effect on hover.",
    registryDependencies: [getRegistryItemUrl("testimonial")],
    files: [
      {
        path: "components/testimonial-spotlight/testimonial-spotlight.tsx",
        type: "registry:component",
        target: "@components/testimonial-spotlight.tsx",
      },
    ],
    categories: ["marketing"],
    docs: "https://abdisamadjoe.com/components/testimonial-spotlight",
  },
  {
    name: "glow-card-grid",
    type: "registry:component",
    title: "Glow Card Grid",
    description: "Display cards with glowing border and background effects.",
    files: [
      {
        path: "components/glow-card-grid/glow-card-grid.tsx",
        type: "registry:component",
        target: "@components/glow-card-grid.tsx",
      },
    ],
    categories: ["effects"],
  },
  {
    name: "middle-truncation",
    type: "registry:component",
    title: "Middle Truncation",
    description: "Truncate text in the middle while preserving start and end.",
    files: [
      {
        path: "components/middle-truncation/middle-truncation.tsx",
        type: "registry:component",
        target: "@components/middle-truncation.tsx",
      },
    ],
    categories: ["typography"],
    docs: "https://abdisamadjoe.com/components/middle-truncation",
  },
  {
    name: "twemoji",
    type: "registry:component",
    title: "Twemoji",
    description: "Render Unicode emoji as Twemoji SVG images inline with text.",
    files: [
      {
        path: "components/twemoji/twemoji.tsx",
        type: "registry:component",
        target: "@components/twemoji.tsx",
      },
      {
        path: "components/twemoji/lib/twemoji-regex.ts",
        type: "registry:lib",
        target: "@lib/twemoji-regex.ts",
      },
    ],
    css: {
      "@layer base": {
        ".twemoji": {
          display: "inline-block",
          height: "1em",
          width: "1em",
          margin: "0 0.05em 0 0.1em",
          "vertical-align": "-0.1em",
        },
      },
    },
    categories: ["typography"],
    docs: "https://abdisamadjoe.com/components/twemoji",
  },
  {
    name: "contribution-graph",
    type: "registry:component",
    title: "Contribution Graph",
    description:
      "A GitHub-style contribution graph component that displays activity levels over time.",
    dependencies: ["date-fns"],
    files: [
      {
        path: "components/contribution-graph/contribution-graph.tsx",
        type: "registry:component",
        target: "@components/contribution-graph.tsx",
      },
    ],
    categories: ["data-display"],
    docs: "https://www.kibo-ui.com/components/contribution-graph",
  },
  {
    name: "github-contributions",
    type: "registry:component",
    title: "GitHub Contributions",
    description:
      "Visualize year-long GitHub contribution activity with daily counts, tooltips, and a profile link.",
    dependencies: ["date-fns"],
    registryDependencies: [
      "tooltip",
      "spinner",
      getRegistryItemUrl("contribution-graph"),
    ],
    files: [
      {
        path: "components/github-contributions/github-contributions.tsx",
        type: "registry:component",
        target: "@components/github-contributions.tsx",
      },
      {
        path: "components/github-contributions/lib/get-cached-contributions.ts",
        type: "registry:lib",
        target: "@lib/get-cached-contributions.ts",
      },
    ],
    css: {
      "@utility link-underline": {
        "@apply underline decoration-current/30 decoration-1 underline-offset-3 transition-colors hover:decoration-current":
          {},
      },
    },
    categories: ["data-display"],
    docs: "https://abdisamadjoe.com/components/github-contributions",
  },
  {
    name: "icon-swap",
    type: "registry:component",
    title: "Icon Swap",
    description: "Animate icon swaps with scale, blur, and fade transitions.",
    dependencies: ["motion"],
    files: [
      {
        path: "components/icon-swap/icon-swap.tsx",
        type: "registry:component",
        target: "@components/icon-swap.tsx",
      },
    ],
    categories: ["effects"],
    docs: "https://abdisamadjoe.com/components/icon-swap",
  },
  {
    name: "spinning-circular-text",
    type: "registry:component",
    title: "Spinning Circular Text",
    description:
      "Text arranged in a circle with a continuous spinning animation.",
    files: [
      {
        path: "components/spinning-circular-text/spinning-circular-text.tsx",
        type: "registry:component",
        target: "@components/spinning-circular-text.tsx",
      },
    ],
    cssVars: {
      theme: {
        "--animate-spin-ccw":
          "spin-ccw var(--tw-animation-duration, var(--tw-duration, 6s)) linear infinite",
      },
    },
    css: {
      "@keyframes spin-ccw": {
        to: {
          rotate: "-360deg",
        },
      },
    },
    categories: ["text-effects"],
    docs: "https://abdisamadjoe.com/components/spinning-circular-text",
  },
  {
    name: "logos-carousel",
    type: "registry:component",
    title: "Logos Carousel",
    description: "Cycle through logos column by column in a staggered wave.",
    dependencies: ["motion"],
    files: [
      {
        path: "components/logos-carousel/logos-carousel.tsx",
        type: "registry:component",
        target: "@components/logos-carousel.tsx",
      },
    ],
    categories: ["marketing"],
    docs: "https://abdisamadjoe.com/components/logos-carousel",
  },
  {
    name: "testimonial-2",
    type: "registry:component",
    title: "Testimonial 2",
    description:
      "Display a testimonial quote with author attribution and source link.",
    files: [
      {
        path: "components/testimonial-2/testimonial-2.tsx",
        type: "registry:component",
        target: "@components/testimonial-2.tsx",
      },
    ],
    categories: ["marketing"],
    docs: "https://abdisamadjoe.com/components/testimonial-2",
  },
  {
    name: "timescale",
    type: "registry:component",
    title: "Timescale",
    description:
      "Ruler-style timeline for plotting milestones along a horizontal or vertical axis.",
    files: [
      {
        path: "components/timescale/timescale.tsx",
        type: "registry:component",
        target: "@components/timescale.tsx",
      },
    ],
    categories: ["data-display"],
    docs: "https://abdisamadjoe.com/components/timescale",
  },
  {
    name: "work-experience",
    type: "registry:component",
    title: "Work Experience",
    description:
      "Display work experiences with role details, company logos, and durations.",
    dependencies: ["react-markdown", "date-fns"],
    registryDependencies: [
      "collapsible",
      "separator",
      getRegistryItemUrl("chevrons-up-down-icon"),
    ],
    files: [
      {
        path: "components/work-experience/work-experience.tsx",
        type: "registry:component",
        target: "@components/work-experience.tsx",
      },
    ],
    categories: ["marketing"],
    docs: "https://abdisamadjoe.com/components/work-experience-component",
  },
  {
    name: "dot-grid-spotlight",
    type: "registry:component",
    title: "Dot Grid Spotlight",
    description:
      "Interactive dot grid with a cursor-tracking spotlight effect.",
    files: [
      {
        path: "components/dot-grid-spotlight/dot-grid-spotlight.tsx",
        type: "registry:component",
        target: "@components/dot-grid-spotlight.tsx",
      },
    ],
    categories: ["effects"],
    docs: "https://abdisamadjoe.com/components/dot-grid-spotlight",
  },
]