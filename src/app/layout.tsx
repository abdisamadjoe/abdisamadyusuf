import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { Providers } from "@/components/providers"
import { fontVariables } from "@/lib/fonts"
import { META_THEME_COLORS } from "@/config/site"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Abdisamad Yusuf – Cybersecurity Professional",
  description: "Portfolio of Abdisamad Yusuf, cybersecurity professional and founder of GuardAura.",
  keywords: "Abdisamad Yusuf, Cybersecurity, GuardAura, Cloud Security, Cybersecurity Professional, Security Portfolio, Abdisamad Yusuf Portfolio",
  authors: [{ name: "Abdisamad Yusuf" }],
  openGraph: {
    title: "Abdisamad Yusuf – Cybersecurity Professional",
    description: "Portfolio of Abdisamad Yusuf, cybersecurity professional and founder of GuardAura.",
    type: "website",
    url: "https://abdisamadjoe.com/",
    images: ["https://abdisamadjoe.com/dp.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdisamad Yusuf – Cybersecurity Professional",
    description: "Portfolio of Abdisamad Yusuf, cybersecurity professional and founder of GuardAura.",
    images: ["https://abdisamadjoe.com/dp.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
}

const darkModeScript = String.raw`
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
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: darkModeScript }}
        />
        <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var value = localStorage.getItem('avatarLights');
                document.documentElement.dataset.avatarLights = JSON.parse(value || '"on"');
              } catch(_) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Abdisamad Yusuf",
              url: "https://abdisamadjoe.com/",
              image: "https://abdisamadjoe.com/dp.png",
              sameAs: [
                "https://linkedin.com/in/abdisamadjoe",
                "https://x.com/abdisamadjoe",
                "https://medium.com/@abdisamadjoe",
              ],
              jobTitle: "Cybersecurity Professional",
              worksFor: {
                "@type": "Organization",
                name: "GuardAura",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Providers>
      </body>
    </html>
  );
}
