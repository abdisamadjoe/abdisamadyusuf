import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "nidamiye",
    title: "Nidamiye",
    period: {
      start: "04.2026",
    },
    link: "https://nidamiye.com",
    skills: ["M-Pesa API", "WhatsApp API", "SaaS", "Multi-tenant"],
    description:
      "Cloud property management platform for landlords in Kenya and Somalia - M-Pesa rent collection, automated WhatsApp payment reminders, and multi-property dashboards.",
    logo: "/Projects/nidamiye.svg",
    isExpanded: true,
  },
  {
    id: "hearline",
    title: "Hearline",
    period: {
      start: "03.2026",
    },
    link: "https://hearline.groundwork.co.ke",
    skills: ["Browser Extension", "Web Speech API", "Open Source", "Privacy"],
    description:
      "Open-source, privacy-first browser extension (Chrome, Brave, Edge, Opera, Vivaldi) that reads any webpage aloud with real-time word highlighting, entirely on-device via the Web Speech API - no server, no tracking.",
    logo: "/Projects/hearline.svg",
  },
  {
    id: "snap2sell",
    title: "Snap2Sell",
    period: {
      start: "02.2026",
    },
    link: "https://www.snap2sell.co.ke",
    skills: ["iOS", "Android", "Marketplace"],
    description:
      "Marketplace app for Nairobi and Mogadishu - photo-based listings, in-app offer negotiation, and hidden phone numbers for safety. Grown to 12,000+ sellers.",
    logo: "/Projects/snap2sell.svg",
  },
  {
    id: "difaacsec",
    title: "DifaacSec",
    period: {
      start: "09.2025",
    },
    link: "https://difaacsec.groundwork.co.ke",
    skills: ["React", "Vite", "Cybersecurity Education"],
    description:
      "Free, hands-on cybersecurity training platform for Somali learners, with real-world labs and scenarios.",
    logo: "/Projects/difaacsec.svg",
  },
]
