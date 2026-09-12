import type { TimelineMilestone } from "../types/timeline"

export const TIMELINE_BIRTH_YEAR = 2001

// Only years with verified facts carry content; the rest are blank filler
// entries so the timescale rail stays continuous year-to-year.
const MILESTONE_CONTENT: Record<number, string> = {
  2001: "Born in November 2001.",
  2017: "Started a Bachelor's degree in Computer Science at SIMAD University.",
  2021: "Graduated from SIMAD University.",
  2023: "Founded [Groundwork Technologies](https://groundwork.co.ke).",
  2025: `Launched [DifaacSec](https://difaacsec.groundwork.co.ke), a free cybersecurity training platform for Somali learners.

Earned Microsoft Azure Fundamentals and the LetsDefend SOC Analyst Learning Path certification.`,
  2026: `Launched [Snap2Sell](https://www.snap2sell.co.ke), [Hearline](https://hearline.groundwork.co.ke), and [Nidamiye](https://nidamiye.com).

Earned the Microsoft Security, Compliance, and Identity Fundamentals and Google Project Management Professional certifications.

Selected for the Claude for Open Source Program.`,
}

const CURRENT_YEAR = new Date().getFullYear()

export const TIMELINE_MILESTONES: TimelineMilestone[] = Array.from(
  { length: CURRENT_YEAR - TIMELINE_BIRTH_YEAR + 1 },
  (_, i) => {
    const year = TIMELINE_BIRTH_YEAR + i
    const content = MILESTONE_CONTENT[year]
    return content ? { year, content } : { year }
  }
)
