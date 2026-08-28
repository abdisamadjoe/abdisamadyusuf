import { MapPinIcon } from "lucide-react"

import { USER } from "@/features/portfolio/data/user"

import { Panel, PanelContent } from "../panel"
import { CurrentLocalTimeItem } from "./current-local-time-item"
import { EmailItem } from "./email-item"
import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item"
import { JobItem } from "./job-item"

export function Overview() {
  return (
    <Panel className="screen-line-bottom-none">
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
        <div className="flex flex-col gap-y-2.5">
          {USER.jobs.map((job, index) => {
            return (
              <JobItem
                key={index}
                title={job.title}
                company={job.company}
                website={job.website}
                experienceId={job.experienceId}
              />
            )
          })}

          <IntroItem>
            <IntroItemIcon>
              <MapPinPinIconWrapper />
            </IntroItemIcon>
            <IntroItemContent>
              <IntroItemLink
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(USER.address)}`}
                aria-label={`Location: ${USER.address}`}
              >
                {USER.address}
              </IntroItemLink>
            </IntroItemContent>
          </IntroItem>
        </div>

        <div className="flex flex-col gap-y-2.5">
          <CurrentLocalTimeItem timeZone={USER.timeZone} />

          <EmailItem emailB64={USER.emailB64} />
        </div>
      </PanelContent>

      <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-1 w-px -translate-x-2.25 border-r border-dashed border-line max-sm:hidden" />
    </Panel>
  )
}

function MapPinPinIconWrapper() {
  return <MapPinIcon />
}
