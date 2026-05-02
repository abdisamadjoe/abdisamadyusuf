import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
    images: ["https://abdisamadjoe.com/hero.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdisamad Yusuf – Cybersecurity Professional",
    description: "Portfolio of Abdisamad Yusuf, cybersecurity professional and founder of GuardAura.",
    images: ["https://abdisamadjoe.com/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Abdisamad Yusuf",
              url: "https://abdisamadjoe.com/",
              image: "https://abdisamadjoe.com/hero.png",
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
      <body
        className={`${inter.variable} bg-[#0f172a] text-white min-h-screen flex flex-col relative overflow-x-hidden font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
