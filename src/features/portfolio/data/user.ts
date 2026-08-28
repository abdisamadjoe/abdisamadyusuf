import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Abdisamad",
  lastName: "Yusuf",
  displayName: "Abdisamad Yusuf",
  username: "abdisamadjoe",
  gender: "male",
  pronouns: "he/him",
  bio: "DevSecOps Engineer building secure full-stack SaaS platforms.",
  flipSentences: ["DevSecOps Engineer."],
  address: "Nairobi, Kenya",
  phoneNumberB64: "", // Empty or optional
  emailB64: "aGVsbG9AYWJkaXNhbWFkam9lLmNvbQ==", // base64 encoded 'hello@abdisamadjoe.com'
  website: "https://abdisamadjoe.com",
  jobTitle: "DevSecOps Engineer",
  jobs: [
    {
      title: "Founder",
      company: "Groundwork Technologies",
      website: "https://groundwork.co.ke/",
      experienceId: "groundwork",
    },
  ],
  about: `
- I'm Abdisamad Yusuf, a [DevSecOps](https://www.redhat.com/en/topics/devops/what-is-devsecops) Engineer with 5+ years of experience, building full-stack SaaS platforms and digital products from idea to production, I build software for SMEs and organizations that solve their problems, with enterprise-grade security built in.
- Founder of <img src="/icons/groundwork.svg" alt="groundwork logo" style="height: 1.2em; width: auto; display: inline-block; vertical-align: middle; margin-left: 0.5em; margin-right: 0.2em;" /> [Groundwork Technologies](https://groundwork.co.ke/), where I build software products and digital solutions for businesses, including <img src="/icons/nidamiye.svg" alt="nidamiye logo" style="height: 1.2em; width: auto; display: inline-block; vertical-align: middle; margin-left: 0.5em; margin-right: 0.2em;" /> [Nidamiye](https://nidamiye.com/), a property management platform for East African property managers.
- When I'm Not Building, I create Cybersecurity and Linux courses and tutorials. My Somali Linux course, <img src="https://img.logo.dev/udemy.com?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN || "pk_AA1JIHN2QAisZYnOhY9-Cw"}" alt="udemy.com logo" style="height: 1.2em; width: auto; display: inline-block; vertical-align: middle; margin-left: 0.5em; margin-right: 0.2em;" /> [Barashada Linux: Bilaw ilaa Dhamaad](https://www.udemy.com/course/linux-fundamentals-somali/), has been taken by 200+ students on Udemy and has reached 14,000+ views on <img src="/icons/youtube.svg" alt="youtube logo" style="height: 1.2em; width: auto; display: inline-block; vertical-align: middle; margin-left: 0.5em; margin-right: 0.2em;" /> [YouTube](https://www.youtube.com/playlist?list=PL6zJ5N-7oCScU0wMS0cqM_sAoruf2RRLw).
- I spend most of my time deepening my expertise in Cloud Security, currently working toward the <img src="/icons/microsoft.svg" alt="microsoft logo" style="height: 1.2em; width: auto; display: inline-block; vertical-align: middle; margin-left: 0.5em; margin-right: 0.2em;" /> [Microsoft SC-200](https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/) and <img src="/icons/aws.svg" alt="aws logo" style="height: 1.2em; width: auto; display: inline-block; vertical-align: middle; margin-left: 0.5em; margin-right: 0.2em;" /> [AWS Solutions Architect Associate](https://aws.amazon.com/certification/certified-solutions-architect-associate/) certifications.
- I’m ranked in the **Top 1% globally** on <img src="/icons/tryhackme.svg" alt="tryhackme logo" style="height: 1.2em; width: auto; display: inline-block; vertical-align: middle; margin-left: 0.5em; margin-right: 0.2em;" /> [TryHackMe](https://tryhackme.com/p/bobst0ne), and practice on platforms like <img src="/icons/letsdefend.svg" alt="letsdefend logo" style="height: 1.2em; width: auto; display: inline-block; vertical-align: middle; margin-left: 0.5em; margin-right: 0.2em;" /> [LetsDefend](https://app.letsdefend.io/user/bobst0ne) and <img src="/icons/cyberdefenders.svg" alt="cyberdefenders logo" style="height: 1.2em; width: auto; display: inline-block; vertical-align: middle; margin-left: 0.5em; margin-right: 0.2em;" /> [CyberDefenders](https://cyberdefenders.org/p/bobst0ne).
`,
  avatar: "/abdisamad-yusuf.webp",
  avatarVariants: {
    lightOff: "/abdisamad-yusuf.webp",
    lightOn: "/abdisamad-yusuf.webp",
    darkOff: "/abdisamad-yusuf.webp",
    darkOn: "/abdisamad-yusuf.webp",
  },
  ogImage: "/abdisamad-yusuf.webp",
  namePronunciationUrl: "",
  timeZone: "Africa/Nairobi",
  keywords: [
    "Abdisamad Yusuf",
    "Cybersecurity",
    "Cloud Security",
    "Information Security",
    "abdisamadjoe",
  ],
  dateCreated: "2024-01-01",
}
