import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Abdisamad",
  lastName: "Yusuf",
  displayName: "Abdisamad Yusuf",
  username: "abdisamadjoe",
  gender: "male",
  pronouns: "he/him",
  bio: "Protecting systems from cyber threats through cloud security and training.",
  flipSentences: [
    "Cybersecurity Professional",
    "Founder of GuardAura",
    "Cloud Security Architect",
  ],
  address: "Nairobi, Kenya",
  phoneNumberB64: "", // Empty or optional
  emailB64: "YWJkaXNhbWFkam9lQGdtYWlsLmNvbQ==", // base64 encoded 'abdisamadjoe@gmail.com'
  website: "https://abdisamadjoe.com",
  jobTitle: "Cybersecurity Professional",
  jobs: [
    {
      title: "Founder",
      company: "GuardAura",
      website: "https://guardaura.com",
      experienceId: "guardaura",
    },
    {
      title: "Founder",
      company: "Groundwork Technologies",
      website: "https://www.groundwork.co.ke",
      experienceId: "groundwork",
    },
  ],
  about: `
- I’m Abdisamad Yusuf — a Cybersecurity Professional with a Computer Science degree and a deep focus on Cloud Security, Vulnerability Management, and Identity & Access Management (IAM).
- Founder of [GuardAura](https://guardaura.com), providing modern cyber defense and cloud security consultation, and [Groundwork Technologies](https://www.groundwork.co.ke), creating high-performance digital web solutions.
- Ranked in the **Top 1% globally** on [TryHackMe](https://tryhackme.com/p/bobst0ne) (username: *bobst0ne*), with extensive experience on platforms like [LetsDefend](https://app.letsdefend.io/user/bobst0ne) and [CyberDefenders](https://cyberdefenders.org/p/bobst0ne).
`,
  avatar: "/dp.png",
  avatarVariants: {
    lightOff: "/dp.png",
    lightOn: "/dp.png",
    darkOff: "/dp.png",
    darkOn: "/dp.png",
  },
  ogImage: "/dp.png",
  namePronunciationUrl: "",
  timeZone: "Africa/Nairobi",
  keywords: [
    "Abdisamad Yusuf",
    "Cybersecurity",
    "GuardAura",
    "Cloud Security",
    "Information Security",
    "abdisamadjoe",
  ],
  dateCreated: "2024-01-01",
}
