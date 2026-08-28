import { LinkedInIcon } from "@/components/icons"

import type { Testimonial } from "../types/testimonials"

// Long quotes (more than 50 characters), ordered by date ascending
export const TESTIMONIALS_1: Testimonial[] = [
  {
    authorAvatar: "/founders/mohamed-tochenet.webp",
    authorName: "Mohamed Abdirahman",
    authorTagline: "Business Development Manager @Tochenet",
    url: "https://www.linkedin.com/in/mohamed-abdirahman-9169b7430",
    quote:
      "Abdisamad built tochenet.com exactly as needed, on time. Skilled and easy to work with.",
    date: "2026-08-24",
    isVerified: true,
    isFeatured: false,
    order: 4,
    icon: <LinkedInIcon />,
  },
  {
    authorAvatar: "/founders/magan.webp",
    authorName: "Magan Mohamud",
    authorTagline: "CEO @Azhartel",
    url: "https://www.linkedin.com/in/magan-mohamud-016382ab/",
    quote:
      "Abdisamad built our website and web app. Reliable, on time, delivered great results. I'd hire him again.",
    date: "2026-08-23",
    isVerified: true,
    isFeatured: true,
    order: 1,
    icon: <LinkedInIcon />,
  },
  {
    authorAvatar: "/founders/abdiwahid.webp",
    authorName: "Abdiwahid Ali",
    authorTagline: "Founder @Yoolify",
    url: "https://www.linkedin.com/in/abdiwahid-ali",
    quote:
      "Abdisamad and I built Nidamiye together. Clear communicator, turns ideas into working solutions. Great co-founder.",
    date: "2026-08-22",
    isVerified: true,
    isFeatured: true,
    order: 2,
    icon: <LinkedInIcon />,
  },
  {
    authorAvatar: "/founders/souleiman.webp",
    authorName: "Souleiman Guedi",
    authorTagline: "Founder @Guedi Training Institute",
    url: "https://www.linkedin.com/in/souleimanguediharreh/",
    quote:
      "Abdisamad and I built DifaacSec together. His passion for accessible cybersecurity education shows in his work.",
    date: "2026-08-21",
    isVerified: true,
    isFeatured: false,
    order: 3,
    icon: <LinkedInIcon />,
  },
]

// Short quotes (50 characters or fewer), ordered by date ascending
export const TESTIMONIALS_2: Testimonial[] = []
