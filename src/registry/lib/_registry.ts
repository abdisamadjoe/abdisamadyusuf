import type { Registry } from "shadcn/schema"

export const lib: Registry["items"] = [
  {
    name: "haptic",
    type: "registry:lib",
    title: "Haptic Feedback",
    description: "Trigger haptic feedback on mobile devices.",
    files: [
      {
        path: "lib/haptic/haptic.ts",
        type: "registry:lib",
        target: "@lib/haptic.ts",
      },
    ],
    categories: ["utilities"],
    docs: "https://abdisamadjoe.com/components/haptic-feedback",
  },
]
