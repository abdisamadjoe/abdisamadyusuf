import type { NavItem } from "@/types/nav"

import { SOCIAL } from "../features/portfolio/data/social-links"
import { USER } from "../features/portfolio/data/user"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.NEXT_PUBLIC_APP_URL || "https://abdisamadjoe.com",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const LICENSE = {
  name: "MIT License",
  url: "https://github.com/abdisamadjoe/abdisamadyusuf/blob/dev/LICENSE",
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem[] = [
  {
    title: "Blog",
    href: "/blog",
  },
]

export const MOBILE_NAV: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  ...MAIN_NAV,
]

export const X_HANDLE = SOCIAL.x.handle
export const GITHUB_USERNAME = SOCIAL.github.handle
export const SOURCE_CODE_GITHUB_REPO = "abdisamadjoe/abdisamadyusuf"
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/abdisamadjoe/abdisamadyusuf"

export const SPONSORSHIP_URL = "https://github.com/sponsors/abdisamadjoe"

export const UTM_PARAMS = {
  utm_source: "abdisamadjoe.com",
}
