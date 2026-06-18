import { Icons } from "@/components/icons"
import type { SocialLink } from "@/features/portfolio/types/social-links-v2"

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "linkedin",
    icon: <Icons.linkedin />,
    title: "LinkedIn",
    handle: "abdisamadjoe",
    href: "https://linkedin.com/in/abdisamadjoe",
  },
  {
    name: "github",
    icon: <Icons.github />,
    title: "GitHub",
    handle: "abdisamadjoe",
    href: "https://github.com/abdisamadjoe",
  },
  {
    name: "x",
    icon: <Icons.x />,
    title: "X",
    handle: "@abdisamadjoe",
    href: "https://x.com/abdisamadjoe",
  },
]

export function getSocialLinkByName(name: string) {
  return SOCIAL_LINKS.find((link) => link.name === name)
}
