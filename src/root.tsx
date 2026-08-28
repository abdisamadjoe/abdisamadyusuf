import NProgress from "nprogress"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "react-router"

import "nprogress/nprogress.css"

import { useEffect } from "react"

import "@/styles/globals.css"

import { MDXProvider } from "@mdx-js/react"
import { NuqsAdapter } from "nuqs/adapters/react-router"

import { JSON_LD_ID, personJsonLd } from "@/config/json-ld"
import { META_THEME_COLORS, SITE_INFO } from "@/config/site"
import { JsonLdScript } from "@/lib/json-ld"
import { components } from "@/components/mdx"
import { Providers } from "@/components/providers"

/**
 * Catches errors thrown while navigating. After a redeploy the browser can
 * hold a stale bundle whose lazy route chunks no longer exist, so
 * patchRoutesOnNavigation 404s. Reload once to fetch the fresh bundle
 * instead of leaving the user on an error screen.
 */
export function ErrorBoundary({ error }: { error: unknown }) {
  useEffect(() => {
    // Stale-client chunk loads surface as a plain Error with message "404"
    // (loader 404s are ErrorResponse objects with a status field instead).
    if (!(error instanceof Error)) return

    const message = error.message.trim()
    const isStaleClient =
      /^404$|Failed to fetch dynamically imported module|Importing a module script failed/i.test(
        message
      )

    if (isStaleClient && !sessionStorage.getItem("rr-stale-client-reload")) {
      sessionStorage.setItem("rr-stale-client-reload", "1")
      window.location.reload()
    }
  }, [error])

  const message =
    error instanceof Error
      ? error.message
      : typeof error === "object" &&
          error !== null &&
          "data" in error &&
          typeof (error as { data?: unknown }).data === "string"
        ? ((error as { data: string }).data as string)
        : String(error)

  return (
    <div className="flex min-h-screen items-center justify-center p-8 text-center">
      <div>
        <h1 className="text-2xl font-medium">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

// Configure standard link tags
export function links() {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=IBM+Plex+Serif:ital,wght@0,400;1,400&display=swap",
    },
    { rel: "icon", type: "image/png", href: "/icon.png" },
    { rel: "apple-touch-icon", href: "/apple-icon.png" },
    { rel: "manifest", href: "/manifest.webmanifest" },
  ]
}

// Meta tags for SEO & social sharing
export function meta() {
  return [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1, viewport-fit=cover",
    },
    { name: "theme-color", content: META_THEME_COLORS.light },
    { name: "description", content: SITE_INFO.description },
    { name: "keywords", content: SITE_INFO.keywords.join(", ") },
    { name: "author", content: "abdisamadjoe" },
    { name: "creator", content: "abdisamadjoe" },

    // Open Graph
    { property: "og:site_name", content: SITE_INFO.name },
    { property: "og:type", content: "profile" },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: SITE_INFO.ogImage },

    // Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: SITE_INFO.ogImage },
  ]
}

export default function Root() {
  const navigation = useNavigation()

  // Dynamic route transition progress bar
  useEffect(() => {
    if (navigation.state === "loading") {
      NProgress.start()
    } else {
      NProgress.done()
    }
  }, [navigation.state])

  const darkModeScript = `
    try {
      if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
      }
    } catch (_) {}

    try {
      if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
        document.documentElement.classList.add('os-macos')
      }
    } catch (_) {}
    
    try {
      var value = localStorage.getItem('avatarLights');
      document.documentElement.dataset.avatarLights = JSON.parse(value || '"on"');
    } catch(_) {}
  `

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": JSON_LD_ID.website,
    name: SITE_INFO.name,
    url: SITE_INFO.url,
    author: personJsonLd,
  }

  const gtmId = import.meta.env.VITE_GTM_ID || ""
  const adsenseClient = import.meta.env.VITE_ADSENSE_CLIENT || ""

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
        <JsonLdScript data={webSiteJsonLd} />
        {adsenseClient && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
            }}
          />
        )}
      </head>
      <body>
        {gtmId && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
            }}
          />
        )}
        <Providers>
          <NuqsAdapter>
            <MDXProvider components={components}>
              <Outlet />
            </MDXProvider>
          </NuqsAdapter>
        </Providers>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
