<p align="center">
  <img src="https://github.com/user-attachments/assets/9ca02e6d-37d8-48a9-872e-06f561090574" alt="abdisamadjoe.com" width="110" />
</p>

<h1 align="center">abdisamadjoe.com</h1>

<p align="center">
  The portfolio of <strong>Abdisamad Yusuf</strong>, a DevSecOps Engineer with 5+ years of experience building full-stack SaaS platforms and digital products from idea to production.
</p>

<p align="center">
  <a href="https://github.com/abdisamadjoe/abdisamadyusuf/stargazers"><img src="https://img.shields.io/github/stars/abdisamadjoe/abdisamadyusuf?style=flat-square&label=Stars&color=gold" alt="GitHub Stars" /></a>
  <a href="https://github.com/abdisamadjoe/abdisamadyusuf/network"><img src="https://img.shields.io/github/forks/abdisamadjoe/abdisamadyusuf?style=flat-square&label=Forks&color=blue" alt="GitHub Forks" /></a>
  <a href="https://github.com/abdisamadjoe/abdisamadyusuf/blob/main/LICENSE"><img src="https://img.shields.io/github/license/abdisamadjoe/abdisamadyusuf?style=flat-square&label=License&color=brightgreen" alt="License" /></a>
  <a href="https://github.com/abdisamadjoe/abdisamadyusuf/commits/dev"><img src="https://img.shields.io/github/last-commit/abdisamadjoe/abdisamadyusuf?style=flat-square&label=Last%20Commit&color=orange" alt="Last Commit" /></a>
  <a href="https://github.com/abdisamadjoe/abdisamadyusuf"><img src="https://img.shields.io/github/repo-size/abdisamadjoe/abdisamadyusuf?style=flat-square&label=Repo%20Size&color=6f42c1" alt="Repo Size" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-%3E%3D%2022-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js >= 22" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/React%20Router-7-CA4245?style=flat-square&logo=reactrouter&logoColor=white" alt="React Router 7" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/MDX-1B1F24?style=flat-square&logo=mdx&logoColor=white" alt="MDX" />
  <img src="https://img.shields.io/badge/Cloudflare%20Pages-F38020?style=flat-square&logo=cloudflarepages&logoColor=white" alt="Cloudflare Pages" />
</p>

<p align="center">
  <a href="https://abdisamadjoe.com">
    <img src="https://github.com/user-attachments/assets/4b52b758-5c17-4379-9acb-f0515b4e3e09" alt="abdisamadjoe.com screenshot" width="720" />
  </a>
</p>

---

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Acknowledgments](#acknowledgments)

## About

**abdisamadjoe.com** is the personal portfolio of **Abdisamad Yusuf**, a DevSecOps Engineer with 5+ years of experience building full-stack SaaS platforms and digital products from idea to production. He builds software for SMEs and organizations that solves their problems, with enterprise-grade security built in.

This repository is also a working design system: it ships a custom component registry for the shadcn CLI, an MDX-powered content layer for the blog and component documentation, and a set of Next.js-style APIs (`next/image`, `next/link`, `next/dynamic`, `next/navigation`) implemented as lightweight shims on top of React Router.

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | [React 19](https://react.dev) + [React Router 7](https://reactrouter.com) on [Vite](https://vite.dev) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| **Language** | [TypeScript](https://www.typescriptlang.org), strict mode |
| **Content** | MDX via [fumadocs](https://fumadocs.com) |
| **Registry** | Custom component registry for the [shadcn CLI](https://ui.shadcn.com/docs/cli) |
| **Deployment** | [Cloudflare Pages](https://pages.cloudflare.com) |
| **Tooling** | [npm](https://www.npmjs.com) with Node.js ≥ 22 |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) version 22 or newer
- [npm](https://www.npmjs.com) (bundled with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/abdisamadjoe/abdisamadyusuf.git
cd abdisamadyusuf

# Install dependencies
npm install
```

### Local Development

```bash
# Start the development server with hot reload
npm run dev
```

### Production Build

```bash
# Build the component registry, then prerender the static site
npm run build

# Preview the production build locally (Cloudflare Pages runtime)
npm run start
```

## Project Structure

```
src/
├── routes/          # Pages: home, blog, blocks, docs, llms.txt, RSS, sitemap, vCard
├── components/      # UI components and registry components
├── features/        # Feature-scoped modules (portfolio, blog, docs)
├── lib/             # Utilities, rehype plugins, Next-compat shims
├── registry/        # shadcn-style registry source
├── hooks/           # Shared hooks
├── scripts/         # Build and capture tooling
└── styles/          # Global styles
public/
└── r/               # Generated registry output
```

## Acknowledgments

This project is a fork of [chanhdai.com](https://github.com/ncdai/chanhdai.com) by [NCDAI](https://github.com/ncdai). A big thank you to the original author for building such a solid foundation; this portfolio wouldn't exist without it.
