import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  GraduationCapIcon,
  LightbulbIcon,
} from "lucide-react"

import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "guardaura",
    companyName: "GuardAura",
    companyWebsite: "https://guardaura.com",
    positions: [
      {
        id: "1",
        title: "Founder & Cybersecurity Lead",
        employmentPeriod: {
          start: "05.2024",
        },
        employmentType: "Part-time",
        icon: <LightbulbIcon />,
        description:
          "- Founded GuardAura to offer cloud security audits, threat detection policies, and vulnerability assessments.\n- hardens AWS and Azure cloud resources (IAM, CloudTrail logs, bucket policies) to prevent unauthorized access and data leakage.",
        skills: [
          "AWS Security",
          "Cloud Infrastructure",
          "Identity & Access Management (IAM)",
          "Vulnerability Assessment",
          "Threat Analysis",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "groundwork",
    companyName: "Groundwork Technologies",
    companyWebsite: "https://www.groundwork.co.ke/",
    positions: [
      {
        id: "1",
        title: "Founder & Solutions Architect",
        employmentPeriod: {
          start: "06.2023",
        },
        employmentType: "Part-time",
        icon: <BriefcaseBusinessIcon strokeWidth={1.8} />,
        description:
          "- Lead client relations and technical design of digital platforms, web systems, and custom web applications.\n- Deploy secure web hosting stacks using Nginx, TLS encryption, and server security controls to safeguard data transmission.",
        skills: [
          "Next.js",
          "React",
          "Tailwind CSS",
          "Server Security",
          "Web Design",
        ],
        isExpanded: true,
      },
    ],
  },
  {
    id: "education",
    companyName: "Education",
    companyIcon: <GraduationCapIcon strokeWidth={1.8} />,
    positions: [
      {
        id: "1",
        title: "Bachelor of Science in Computer Science",
        employmentPeriod: {
          start: "2020",
          end: "2024",
        },
        icon: <GraduationCapIcon />,
        description:
          "- Specialized in Network Infrastructures, Security Policies, Software Engineering, and Database Systems.\n- Active member of the cybersecurity CTF club, specializing in Linux host forensics and cloud configuration reviews.",
        skills: [
          "Network Security",
          "Linux & Bash",
          "Python programming",
          "Database Security",
          "Software Engineering",
        ],
      },
    ],
  },
]
