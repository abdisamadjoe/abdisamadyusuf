"use client"

import { useTiks } from "@rexa-developer/tiks/react"
import { toast } from "sonner"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { IconPlaceholder } from "@/registry/icons/icon-placeholder"

export type BrandAssetsMenuProps = {
  logomark: React.ReactElement
  logomarkSVG: string
  logotypeSVG: string
  brandGuidelinesURL: string
  brandAssetsURL: string
  children: React.ReactElement
}

export function BrandAssetsMenu({
  logomark,
  logomarkSVG,
  logotypeSVG,
  brandGuidelinesURL,
  brandAssetsURL,
  children,
}: BrandAssetsMenuProps) {
  const { success } = useTiks()

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-fit">
        <ContextMenuItem
          onClick={() => {
            copyText(logomarkSVG)
            toast.success("Logomark as SVG copied")
            success()
          }}
        >
          {logomark}
          Copy Logomark as SVG
        </ContextMenuItem>

        <ContextMenuItem
          onClick={() => {
            copyText(logotypeSVG)
            toast.success("Logotype as SVG copied")
            success()
          }}
        >
          <IconPlaceholder
            lucide="TypeIcon"
            tabler="IconLetterT"
            hugeicons="TextIcon"
            phosphor="TextTIcon"
            remixicon="RiText"
          />
          Copy Logotype as SVG
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem asChild>
          <a
            href={brandGuidelinesURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconPlaceholder
              lucide="SquareDashedIcon"
              tabler="IconShape"
              hugeicons="DashedLine02Icon"
              phosphor="BoundingBoxIcon"
              remixicon="RiShapeLine"
            />
            Brand Guidelines
          </a>
        </ContextMenuItem>

        <ContextMenuItem asChild>
          <a
            href={brandAssetsURL}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <IconPlaceholder
              lucide="DownloadIcon"
              tabler="IconDownload"
              hugeicons="Download01Icon"
              phosphor="DownloadSimpleIcon"
              remixicon="RiDownloadLine"
            />
            Download Brand Assets
          </a>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
