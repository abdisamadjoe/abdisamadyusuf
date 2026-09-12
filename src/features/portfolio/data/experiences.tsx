import { CodeXmlIcon } from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "groundwork",
    companyName: "Groundwork Technologies",
    companyLogo: "/icons/groundwork.svg",
    companyWebsite: "https://groundwork.co.ke",
    location: "Nairobi, Kenya",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "Founder",
        employmentPeriod: {
          start: "05.2023",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description: `- Founded Groundwork Technologies, building full-stack software products for East African SMEs and organizations with enterprise-grade security built in.
- Built [Nidamiye](https://nidamiye.com), a property management SaaS for landlords in Kenya and Somalia, with M-Pesa rent collection, WhatsApp payment reminders, and multi-property dashboards.
- Built [Snap2Sell](https://www.snap2sell.co.ke), a marketplace app for Nairobi and Mogadishu, grown to 12,000+ sellers.
- Built [DifaacSec](https://difaacsec.groundwork.co.ke), a free, hands-on cybersecurity training platform for Somali learners.
- Built and open-sourced [Hearline](https://hearline.groundwork.co.ke), a privacy-first browser extension that reads any webpage aloud using the Web Speech API.`,
        skills: [
          "DevSecOps",
          "Cloud Security",
          "SaaS Architecture",
          "M-Pesa API",
          "WhatsApp API",
          "React",
          "Vite",
          "Browser Extensions",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
]
