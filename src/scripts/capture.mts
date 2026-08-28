import fs from "node:fs"
import path from "node:path"
import type { Browser } from "puppeteer"
import puppeteer from "puppeteer"

const url = process.env.URL || "https://abdisamadjoe.localhost"
const outputDir = path.join(process.cwd(), ".abdisamadjoe/screenshots")

const SIZE = {
  // MacBook Pro 14-inch
  desktop: {
    width: 1512,
    height: 982,
  },
  // iPhone 16 Pro Max
  mobile: {
    width: 440,
    height: 956,
  },
  // Open Graph image size
  "og-image": {
    width: 1200,
    height: 630,
  },
} as const

type Theme = "light" | "dark"

async function captureScreenshot({
  browser,
  name,
  url,
  size,
  themes = ["light"],
  type = "webp",
}: {
  browser: Browser
  name: string
  url: string
  size: keyof typeof SIZE
  themes?: Theme[]
  type?: "webp" | "png" | "jpeg"
}) {
  // Ensure the output directory exists
  await fs.promises.mkdir(outputDir, { recursive: true })

  const page = await browser.newPage()

  const { width, height } = SIZE[size]
  await page.setViewport({ width, height })

  await page.goto(url, { waitUntil: "networkidle2" })

  for (const theme of themes) {
    const fileName = `${name}-${size}-${theme}.${type}`
    const filePath = path.join(outputDir, fileName) as
      | `${string}.webp`
      | `${string}.png`
      | `${string}.jpeg`

    if (fs.existsSync(filePath)) {
      console.log(`⚠️ Screenshot already exists, skipping:`, filePath)
      continue
    }

    await page.emulateMediaFeatures([
      { name: "prefers-color-scheme", value: theme },
    ])

    await page.reload({ waitUntil: "networkidle0" })

    await page.screenshot({
      path: filePath,
      type,
      quality: type !== "png" ? 90 : undefined,
    })

    console.log(`✅ Screenshot saved:`, filePath)
  }

  await page.close()
}

async function main() {
  const browser = await puppeteer.launch()

  try {
    await captureScreenshot({
      browser,
      name: "screenshot",
      url,
      size: "desktop",
      themes: ["light", "dark"],
    })

    await captureScreenshot({
      browser,
      name: "screenshot",
      url,
      size: "mobile",
      themes: ["light", "dark"],
    })

    await captureScreenshot({
      browser,
      name: "screenshot",
      url: `${url}/og`,
      size: "og-image",
      themes: ["light", "dark"],
      type: "png",
    })

    console.log("✅ All screenshots captured successfully.")
  } catch (error) {
    console.error("⛔️ Error capturing screenshots:", error)
  } finally {
    await browser.close()
  }
}

main()
