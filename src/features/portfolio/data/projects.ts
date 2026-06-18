import type { Project } from "@/features/portfolio/types/projects"

export const PROJECTS: Project[] = [
  {
    id: "aws-login-alerts",
    title: "AWS Login Alert System with CloudTrail, EventBridge, and SNS",
    period: {
      start: "05.2025",
    },
    link: "https://github.com/abdisamadjoe/aws-login-alerts",
    skills: ["CloudTrail", "EventBridge", "SNS (Simple Notification Service)", "AWS Security"],
    description: "Built a real-time AWS login alert system that sends email notifications whenever the root account or any IAM user logs into the AWS console. Implemented using AWS CloudTrail tracking, EventBridge pattern matching rules, and SNS email subscribers.",
    logo: "/aws-login.png",
    isExpanded: true,
  },
  {
    id: "ad-lab",
    title: "Active Directory Lab Setup",
    period: {
      start: "03.2024",
      end: "04.2024",
    },
    link: "https://github.com/abdisamadjoe/AD-PS-User-Management",
    skills: ["Active Directory", "Identity Management (IAM)", "PowerShell", "Virtual Machine"],
    description: "Configured a complete virtualized Windows domain environment using Oracle VirtualBox. Created an Active Directory Domain Controller and automated user provisioning/de-provisioning with PowerShell scripts to manage groups and permissions.",
    logo: "/activedirectory.png",
    isExpanded: true,
  },
  {
    id: "vulnerability-management-lab",
    title: "Vulnerability Management Lab",
    period: {
      start: "07.2024",
      end: "08.2024",
    },
    link: "https://github.com/abdisamadjoe/VulnerabilityGVM-Kali-Setup",
    skills: ["Vulnerability Scanner", "OpenVAS", "Kali Linux"],
    description: "Established a dedicated vulnerability scanning lab environment running OpenVAS/GVM on Kali Linux. Ran credentialed and non-credentialed scans against target assets, analyzed vulnerability metrics, and drafted remediation plans.",
    logo: "/VulnerabilityGVM.png",
  },
  {
    id: "s3-static-hosting",
    title: "Static Website Hosting on Amazon S3",
    period: {
      start: "01.2025",
      end: "02.2025",
    },
    link: "https://github.com/abdisamadjoe/host-website-on-s3",
    skills: ["AWS", "Amazon S3", "Encryption", "Identity Management (IAM)"],
    description: "Hosted and secured a production static website on Amazon S3. Configured versioning, bucket policies, access control lists (ACLs), TLS enforcement via CloudFront, and default server-side encryption (SSE-S3).",
    logo: "/AmazonS3.png",
  },
  {
    id: "password-checker",
    title: "Password Complexity Checker",
    period: {
      start: "06.2024",
      end: "06.2024",
    },
    link: "https://github.com/abdisamadjoe/Password-Checker",
    skills: ["Python", "Password policy"],
    description: "Created a command-line Python application that analyzes the cryptographic strength and complexity of passwords. Evaluates length, character variety (uppercase, numbers, symbols), and compares inputs against common dictionary leaks.",
    logo: "/PasswordChecker.png",
  },
  {
    id: "python-keylogger",
    title: "Simple Python Keylogger",
    period: {
      start: "05.2024",
      end: "05.2024",
    },
    link: "https://github.com/abdisamadjoe/Simple-Python-Keylogger",
    skills: ["Python", "Ethical Hacking"],
    description: "Developed a lightweight background keylogger tool in Python for ethical testing and educational purposes. Logs keystrokes to a local secure file and uses standard system libraries to interact with OS input handlers.",
    logo: "/SimpleKeylogger.png",
  },
]
