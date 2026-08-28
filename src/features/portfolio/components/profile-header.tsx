import { AvatarLights } from "@/features/portfolio/components/avatar-lights"
import { USER } from "@/features/portfolio/data/user"

import { AvatarLightsToggle } from "./avatar-lights-toggle"
import { FlipSentences } from "./flip-sentences"
import { PronounceMyName } from "./pronounce-my-name"
import { VerifiedIcon } from "./verified-icon"

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom flex flex-col items-center overflow-y-clip border-x border-line">
      <div className="flex w-full flex-col items-center pt-4 sm:pt-8">
        <AvatarLightsToggle className="group/avatar-lights-toggle flex outline-none">
          <AvatarLights
            className="ring-border ring-offset-background group-focus-visible/avatar-lights-toggle:ring-1 group-focus-visible/avatar-lights-toggle:ring-offset-2"
            variants={USER.avatarVariants}
          />
        </AvatarLightsToggle>
      </div>

      <div className="screen-line-top z-1 mt-6 flex w-full flex-col items-center sm:mt-8">
        <div className="flex items-center justify-center gap-2 py-3">
          <h1 className="-translate-y-px text-[2rem]/none font-medium tracking-tight">
            {USER.displayName}
          </h1>

          <VerifiedIcon className="size-4.5 select-none" aria-hidden />

          {USER.namePronunciationUrl && (
            <PronounceMyName namePronunciationUrl={USER.namePronunciationUrl} />
          )}
        </div>

        <FlipSentences className="screen-line-top flex h-12.5 w-full items-center justify-center py-1 text-center sm:h-9">
          {USER.flipSentences}
        </FlipSentences>
      </div>
    </div>
  )
}
