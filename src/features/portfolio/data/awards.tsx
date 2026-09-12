import { ClaudeIcon } from "@/components/icons"

import type { Award } from "../types/awards"

// TODO(abdisamad): add any real awards/recognitions (hackathons, TryHackMe
// rank milestones, competitions) - only verified entries live here for now.
export const AWARDS: Award[] = [
  {
    id: "1b4db7eb-4057-5ddf-91e0-36dec72071f5",
    prize: "Claude Max 20x",
    title: "Claude for Open Source Program",
    date: "2026-07",
    grade: "Open source project",
    icon: <ClaudeIcon />,
    description:
      "- Selected for [Claude for Open Source Program](https://claude.com/contact-sales/claude-for-oss)\n- Received 6 months of Claude Max 20x in support of my open source work\n- Project: [abdisamadjoe.com](https://github.com/abdisamadjoe/abdisamadyusuf)",
  },
]
