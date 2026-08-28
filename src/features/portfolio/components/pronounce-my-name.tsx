"use client"

import { useRef } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import type { VolumeIconHandle } from "@/components/animated-icons/volume-icon"
import { VolumeIcon } from "@/components/animated-icons/volume-icon"
import { useSound } from "@/registry/hooks/sound/use-sound"

export function PronounceMyName({
  className,
  namePronunciationUrl,
}: {
  className?: string
  namePronunciationUrl: string
}) {
  const [play] = useSound(namePronunciationUrl)

  const volumeIconRef = useRef<VolumeIconHandle>(null)

  const handlePlayClick = () => {
    volumeIconRef.current?.startAnimation()
    play()
    trackEvent({
      name: "play_name_pronunciation",
    })
  }

  useHotkeys("p", handlePlayClick)

  return (
    <button
      className={cn(
        "relative flex touch-manipulation items-center justify-center text-muted-foreground transition-[color,scale] will-change-[scale] select-none hover:text-foreground active:scale-[0.9]",
        className
      )}
      onClick={handlePlayClick}
      aria-label="Pronounce my name"
    >
      <span className="absolute size-12 pointer-fine:hidden" aria-hidden />
      <VolumeIcon ref={volumeIconRef} className="size-4.5" aria-hidden />
    </button>
  )
}
