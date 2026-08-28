import Link from "next/link"

import { Separator } from "@/components/base/ui/separator"
import { DmcaIcon, GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons"
import { SiteFooterInteractiveLogotype } from "@/components/site-footer-brand"
import { SOCIAL } from "@/features/portfolio/data/social-links"

// Imported here rather than through `@/config/site`, which client components
// pull in, to keep the manifest out of client bundles.
import packageJson from "../../package.json"
import { LogoWordmark } from "./logo-wordmark"

// Not derived from `SITE_INFO.url`: that follows `NEXT_PUBLIC_APP_URL` and
// would read `abdisamadjoe.localhost` in dev.
const SITE_TITLE = "abdisamadjoe.com"

const SITE_SUBTITLE = packageJson.description

/** Footer laid out as the title block of a technical drawing. */
export function SiteFooterCad() {
  const xLink = SOCIAL.x
  const githubLink = SOCIAL.github
  const linkedinLink = SOCIAL.linkedin

  return (
    <footer className="max-w-screen overflow-x-clip px-2">
      <div className="mx-auto border-x border-line group-has-data-[slot=layout-wide]/layout:container md:max-w-3xl">
        <div className="screen-line-top screen-line-bottom after:z-1 after:bg-border">
          <div className="stripe-divider h-12" />
        </div>

        <div className="relative">
          <div className="screen-line-bottom flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3 font-mono text-sm">
            <span className="font-medium">{SITE_TITLE}</span>
            <span className="font-sans text-muted-foreground">
              {SITE_SUBTITLE}
            </span>
          </div>
        </div>

        <div className="screen-line-top h-4" />

        <div className="screen-line-top screen-line-bottom flex items-center gap-3 px-4 py-3 text-muted-foreground">
          <Link href="/" className="mr-auto text-foreground">
            <LogoWordmark className="h-4" />
          </Link>

          <a
            className="flex items-center transition-[color] hover:text-foreground"
            href={xLink.href}
            target="_blank"
            rel="noopener"
            aria-label="X Profile"
          >
            <XIcon className="size-4" />
          </a>

          <Separator
            orientation="vertical"
            className="data-vertical:h-4 data-vertical:self-center"
          />

          <a
            className="flex items-center transition-[color] hover:text-foreground"
            href={githubLink.href}
            target="_blank"
            rel="noopener"
            aria-label="GitHub Profile"
          >
            <GitHubIcon className="size-4" />
          </a>

          <Separator
            orientation="vertical"
            className="data-vertical:h-4 data-vertical:self-center"
          />

          <a
            className="flex items-center transition-[color] hover:text-foreground"
            href={linkedinLink.href}
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn Profile"
          >
            <LinkedInIcon className="size-4" />
          </a>

          <Separator
            orientation="vertical"
            className="data-vertical:h-4 data-vertical:self-center"
          />

          <a
            className="flex items-center transition-[color] hover:text-foreground"
            href={
              process.env.NEXT_PUBLIC_DMCA_URL ||
              "https://www.dmca.com/ProtectionPro.aspx"
            }
            target="_blank"
            rel="noopener"
            aria-label="DMCA.com Protection Status"
          >
            <DmcaIcon className="h-4 w-auto" />
          </a>
        </div>
      </div>

      <SiteFooterInteractiveLogotype />

      <div className="h-(--fade-bottom-height)" />
      <div className="pb-[env(safe-area-inset-bottom,0)]" />
    </footer>
  )
}
