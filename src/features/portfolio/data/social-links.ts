import type { SocialProfile } from "@/features/portfolio/types/social-links"

/**
 * Keyed registry of social profiles — the single source of truth. Icons are
 * bound separately in `social-link-icons.tsx` (keyed by the same `SocialName`),
 * so adding a profile here forces the icon map to stay in sync at compile time.
 */
export const SOCIAL = {
  x: {
    title: "X",
    handle: "@abdisamadjoe",
    href: "https://x.com/abdisamadjoe",
    sameAs: true,
  },
  github: {
    title: "GitHub",
    handle: "abdisamadjoe",
    href: "https://github.com/abdisamadjoe",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "abdisamadjoe",
    href: "https://linkedin.com/in/abdisamadjoe",
    sameAs: true,
  },
  discord: {
    title: "Discord",
    handle: "abdisamadjoe",
    href: "https://discord.gg/PG4Xvwn4QM",
  },
  youtube: {
    title: "YouTube",
    handle: "@MrElmiCyber",
    href: "https://www.youtube.com/@MrElmiCyber",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
