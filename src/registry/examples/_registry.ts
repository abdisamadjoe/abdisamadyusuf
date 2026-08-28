import { getRegistryItemUrl } from "@/utils/registry"
import type { Registry } from "shadcn/schema"

export const examples: Registry["items"] = [
  {
    name: "text-flip-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("text-flip")],
    files: [
      {
        path: "examples/text-flip-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "testimonial-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("testimonial")],
    files: [
      {
        path: "examples/testimonial-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "copy-button-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("copy-button")],
    files: [
      {
        path: "examples/copy-button-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "haptic-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("haptic")],
    files: [
      {
        path: "examples/haptic-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "testimonial-spotlight-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("testimonial-spotlight")],
    files: [
      {
        path: "examples/testimonial-spotlight-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "glow-card-grid-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("glow-card-grid")],
    files: [
      {
        path: "examples/glow-card-grid-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "glow-card-grid-dialkit",
    type: "registry:example",
    dependencies: ["dialkit"],
    registryDependencies: [getRegistryItemUrl("glow-card-grid")],
    files: [
      {
        path: "examples/glow-card-grid-dialkit.tsx",
        type: "registry:example",
      },
    ],
    meta: {
      previewClassName: "min-h-svh place-items-center-safe content-center-safe",
    },
  },
  {
    name: "middle-truncation-demo",
    type: "registry:example",
    registryDependencies: [
      "resizable",
      getRegistryItemUrl("middle-truncation"),
    ],
    files: [
      {
        path: "examples/middle-truncation-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "twemoji-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("twemoji")],
    files: [
      {
        path: "examples/twemoji-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "theme-toggle-effect-demo",
    type: "registry:example",
    files: [
      {
        path: "examples/theme-toggle-effect-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "github-contributions-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("github-contributions")],
    files: [
      {
        path: "examples/github-contributions-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "github-contributions-default-theme",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("github-contributions")],
    files: [
      {
        path: "examples/github-contributions-default-theme.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "github-contributions-winter-theme",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("github-contributions")],
    files: [
      {
        path: "examples/github-contributions-winter-theme.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "github-contributions-halloween-theme",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("github-contributions")],
    files: [
      {
        path: "examples/github-contributions-halloween-theme.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "icon-swap-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("icon-swap")],
    files: [
      {
        path: "examples/icon-swap-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "spinning-circular-text-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("spinning-circular-text")],
    files: [
      {
        path: "examples/spinning-circular-text-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "spinning-circular-text-demo-2",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("spinning-circular-text")],
    files: [
      {
        path: "examples/spinning-circular-text-demo-2.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "chevrons-up-down-icon-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("chevrons-up-down-icon")],
    files: [
      {
        path: "examples/chevrons-up-down-icon-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "logos-carousel-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("logos-carousel")],
    files: [
      {
        path: "examples/logos-carousel-demo.tsx",
        type: "registry:example",
      },
    ],
    meta: {
      previewClassName: "min-h-svh place-items-center-safe content-center-safe",
    },
  },
  {
    name: "testimonial-2-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("testimonial-2")],
    files: [
      {
        path: "examples/testimonial-2-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "timescale-demo",
    type: "registry:example",
    registryDependencies: [getRegistryItemUrl("timescale")],
    files: [
      {
        path: "examples/timescale-demo.tsx",
        type: "registry:example",
      },
    ],
  },
]
