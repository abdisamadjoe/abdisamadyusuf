"use client"

import { toast } from "sonner"

import { useSound } from "@/registry/hooks/sound/use-sound"
import { ShimmeringText } from "@/registry/transformed/components/shimmering-text"
import {
  SlideToUnlock,
  SlideToUnlockHandle,
  SlideToUnlockText,
  SlideToUnlockTrack,
} from "@/registry/transformed/components/slide-to-unlock"

export default function SlideToUnlockDemo() {
  const [play] = useSound("https://assets.chanhdai.com/sounds/ios/unlock.mp3", {
    volume: 0.5,
  })

  return (
    <SlideToUnlock
      onUnlock={() => {
        play()
        toast.success("Unlocked")
      }}
    >
      <SlideToUnlockTrack>
        <SlideToUnlockText>
          {({ isDragging }) => (
            <ShimmeringText text="slide to unlock" isStopped={isDragging} />
          )}
        </SlideToUnlockText>
        <SlideToUnlockHandle />
      </SlideToUnlockTrack>
    </SlideToUnlock>
  )
}
