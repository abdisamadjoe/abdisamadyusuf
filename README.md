<p align="center">
  <img src="https://github.com/user-attachments/assets/3cf26672-4a03-46c2-8b56-2bef5b9d5165" alt="abdisamadjoe.com" width="110" />
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
    <img src="https://github.com/user-attachments/assets/2e577ec6-6d4c-4053-82d0-6bae64ae7379" alt="abdisamadjoe.com screenshot" width="720" />
  </a>
</p>

---

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Resume Chatbot](#resume-chatbot)
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

## Resume Chatbot

The site includes a floating **Ask Abdisamad** resume assistant — a small chat
widget that answers recruiter questions about experience, certifications,
projects, education, and skills.

It is **not an AI**. There is no LLM, no API key, no database, no embeddings and
no RAG. Every answer is a predefined rule in a plain-text RiveScript file, served
by a tiny standalone Node/Express process.

```
Existing React Router portfolio
        │
        │  POST /api/chat   (CHATBOT_APP_URL)
        ▼
chatbot/  (Node + Express, independent deployment)
        │
        ▼
RiveScript engine  →  chatbot/brain/resume.rive
        │
        ▼
{ "reply": "…" }  →  React chat UI
```

### Layout

The chatbot is deliberately split into two independent deployables. The widget
must live with the site (it belongs to the design system and the visitor never
leaves the portfolio); the rule engine needs a long-running Node process, which
Cloudflare Pages cannot host.

```
chatbot/                         # backend — deploy independently
├── server.js                    # Express: POST /api/chat, GET /health, GET / status page
├── package.json                 # isolated deps: express, cors, rivescript, express-rate-limit
├── .env.example                 # PORT, CORS_ORIGIN
└── brain/
    └── resume.rive              # ← ALL resume knowledge lives here

src/components/ResumeChatbot/    # frontend — ships with the site
├── ResumeChatbot.tsx            # floating button + chat window
├── ResumeChatbot.css            # styles built on the site's design tokens
├── api.ts                       # POST /api/chat client
├── config.ts                    # CHATBOT_APP_URL + UI copy
└── index.ts                     # barrel export

src/routes/app-layout.tsx        # global mount point (existing layout)
```

The site itself stays at the repository root, because the build tooling
(`react-router.config.ts`, `vite.config.ts`, `wrangler.jsonc`, the `@/*` alias,
the registry scripts) resolves paths from the repo root. Only the backend is
folder-isolated; that is what makes it independently deployable.

### Editing the answers

`chatbot/brain/resume.rive` is the single source of truth. Nothing about
the resume is hardcoded in JavaScript — to change an answer, edit one rule:

```
+ [*] what certifications does (he|abdisamad) (have|hold) [*] {weight=80}
- Abdisamad holds 8 certifications:
^ - IELTS Academic: Overall Band 7.0 (C1)
^ - Google Cybersecurity Professional Certificate
```

Three RiveScript behaviours are worth knowing before you edit:

1. **Two `+` lines in a row share one reply, so the first gets none.** Always put
   alternatives inside a single line with `|`: `+ [*] (hello|hi|hey) [*]`.
2. **`{weight=N}` decides priority** and must be written inside the trigger line.
   The engine tries higher weights first. A broad rule such as
   `[*] experience [*]` will shadow a narrow one like `[*] linux experience [*]`,
   which is why narrow rules carry higher weights here. If a new rule never
   fires, give it a higher weight.
3. **The `*` trigger is the fallback.** Anything the brain does not cover replies
   exactly as specified, with no invented information:

   > I don't have that information in Abdisamad's profile.

The file is organised into `ABOUT`, `EDUCATION`, `EXPERIENCE`, `CYBERSECURITY`,
`CERTIFICATIONS`, `PROJECTS`, `SKILLS`, `TRyHACKME`, `CAREER`, `TESTIMONIALS`,
`IT OPERATIONS`, `BLOG & WRITING`, `ACTIVITY & TOOLING`, `META` and `FALLBACK`.

### Formatting answers

Answers are plain text, but the chat renders `\n` breaks as real paragraphs and
bullet lists, so a written-out answer reads well instead of arriving as one wall
of prose:

```
- Abdisamad holds 8 certifications:\n\n- IELTS Academic: Overall Band 7.0 (C1)\n- Google Cybersecurity Professional Certificate\n- AWS Cloud Practitioner
```

| In the reply | Renders as |
| --- | --- |
| `\n\n` | new paragraph |
| `\n` | next line (use between bullets) |
| `- ` at the start of a line | a bullet |

**Do not use `^` continuation lines for multi-line answers.** RiveScript joins
them with no separator, which silently flattens a list into
`"Here are the certs:- IELTS 7.0- Google..."`. Keep the whole answer on the one
`- ` line and use `\n`. `scratch/test-brain.mjs` fails the build if a reply leaks
a literal `\n` to the user, glues bullets onto a paragraph, or leaves ragged
blank lines.

### Running it locally

Two processes, two terminals.

```bash
# 1. Frontend
npm install
npm run dev                      # http://localhost:5173

# 2. Backend
npm run chatbot:install          # first time only
cp chatbot/.env.example chatbot/.env
npm run dev:chatbot              # http://localhost:3001
```

Or from inside the folder, which is equivalent:

```bash
cd chatbot
npm install
cp .env.example .env
npm run dev                      # http://localhost:3001
```

Open the site at **http://localhost:5173** — the launcher is in the bottom-right
corner. http://localhost:3001 is the API only and serves a small status page
(plus a one-question tester) rather than the chat itself.

Create the `.env` file once. It ships with working defaults (port `3001`,
permissive CORS), so you only need to touch it to change the port or lock down
origins. Node's `--watch` mode cannot start if `--env-file-if-exists` points at a
missing file, which is why the copy step exists. In development, editing
`brain/resume.rive` reloads the brain without restarting the server.

Configure the frontend by copying the variable into `.env.local`:

```env
CHATBOT_APP_URL=http://localhost:3001
```

If the widget cannot reach the backend it says so in the chat window and tells
you which URL it tried, rather than failing silently.

### API

`POST /api/chat`

```json
{ "message": "What certifications does he have?", "userId": "session-id" }
```

```json
{ "reply": "Abdisamad holds 8 certifications: …" }
```

`userId` keeps each visitor's RiveScript session separate. `GET /health` returns
`{ "status": "ok", "brain": "resume.rive" }`.

Also included: a 30-requests-per-minute in-memory rate limit per IP, a 500
character message cap, and an optional `CORS_ORIGIN` allow-list so no other site
can call your endpoint.

### Deploying

The two halves are deployed separately, and only the frontend is tied to the
Cloudflare Pages project that already serves the site.

**1. Backend → Railway / Render / any VPS** (a real Node process is required;
Cloudflare Pages cannot run this):

| Setting | Value |
| --- | --- |
| Root directory | `chatbot` |
| Install | `npm install` |
| Start | `npm start` |
| Health check | `/health` |

Environment variables for the backend:

```env
CORS_ORIGIN=https://abdisamadjoe.com,https://www.abdisamadjoe.com
```

Point your DNS at the host (for example `chat.abdisamadjoe.com` → CNAME to the
Railway/Render hostname). `PORT` is injected by most hosts automatically.

**2. Frontend → Cloudflare Workers / Pages**

Secrets and API keys are stored securely on Cloudflare without committing sensitive keys to Git or `wrangler.jsonc`.

Upload encrypted environment secrets using Wrangler CLI:

```bash
# Upload YouTube API Key
npx wrangler secret put YOUTUBE_API_KEY

# Upload Chatbot Backend URL
npx wrangler secret put CHATBOT_APP_URL
```

When prompted, enter:
* `YOUTUBE_API_KEY`: Your Google Cloud YouTube Data API key
* `CHATBOT_APP_URL`: `https://chat.abdisamadjoe.com`

> `chatbot/` is excluded from the root `tsconfig.json` and has its own
> `package.json`, so the site build never compiles or bundles the backend, and
> root `npm install` does not pull in Express or RiveScript.

### Tests

Two local harnesses live in `scratch/` (gitignored) and drive the real engine and
a real browser:

```bash
# 80+ rule-level checks: every trigger fires, no reply is empty, wordings vary
cd chatbot && node ../scratch/test-brain.mjs

# 20 end-to-end checks in headless Chrome against the dev server + backend
node scratch/test-chatbot-ui.mjs
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
chatbot/      # Standalone Node + Express + RiveScript backend (see Resume Chatbot)
```

## Acknowledgments

This project is a fork of [chanhdai.com](https://github.com/ncdai/chanhdai.com) by [NCDAI](https://github.com/ncdai). A big thank you to the original author for building such a solid foundation; this portfolio wouldn't exist without it.
