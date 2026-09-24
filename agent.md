# AGENT.MD: AI COLLABORATION & REPOSITORY BIBLE

> **Target Audience:** Autonomous AI Coding Agents (Claude, OpenAI Codex, ChatGPT, Cursor, GitHub Copilot, Google AI Studio, Gemini, and human engineers).  
> **Repository:** Yash Srivastava — AI Engineer Portfolio & Autonomous Agent Systems.  
> **Runtime Environment:** Google AI Studio Build / Full-Stack Node.js (Vite + Express + React 19 + TypeScript).  
> **Dev Server:** Port `3000` (`http://localhost:3000` / `0.0.0.0:3000`).

---

## 1. PURPOSE & AGENT CONTEXT

This repository is the production editorial portfolio and agentic showcase for **Yash Srivastava**, an **AI Engineer** specializing in:
- Production **Agentic AI** & **Multi-Agent Orchestration** (LangGraph, AutoGen, CrewAI, MCP)
- **Context Engineering** (dynamic assembly, priority compression, selective handoffs, claim provenance)
- **Full-Stack AI Backends** (Python 3.13, FastAPI, Pydantic v2, SQLAlchemy, Asyncpg, PostgreSQL, Docker, AWS, Azure)
- Flagship Platform: **OryxenAI** ([https://app.oryxenai.me/](https://app.oryxenai.me/)), an autonomous 5-stage multi-agent portfolio generation engine.

Whether you are **Claude**, **ChatGPT**, **OpenAI Codex**, or a **Gemini/AI Studio agent**, you must treat this document as the **immutable operational guide**. Follow every constraint herein to ensure that any code changes you make compile without error, preserve iframe sandboxing, maintain Swiss Editorial Brutalist design integrity, and sync cleanly between Google AI Studio and GitHub.

---

## 2. THE GOOGLE AI STUDIO & GITHUB SYNC MECHANISM

This codebase is natively developed and hosted inside the **Google AI Studio Build** environment and synchronized with **GitHub**. Understanding how the two environments interface is vital so you do not break the continuous delivery loop.

```
       ┌─────────────────────────────────────────────────────────────┐
       │                 Google AI Studio Build                      │
       │  • Autonomous Agent: Gemini 2.5 Coding Engine               │
       │  • Containerized Full-Stack Dev Server (Node.js, Port 3000) │
       │  • Live Preview Frame & Server-Side Gemini API Proxy        │
       └──────────────────────────────┬──────────────────────────────┘
                                      │
                                      ▼  [Sync / Export to GitHub UI]
       ┌─────────────────────────────────────────────────────────────┐
       │                     GitHub Repository                       │
       │              (e.g., origin/main or feature branch)          │
       └──────────────────────────────┬──────────────────────────────┘
                                      │
                   [Git Clone / Git Pull by Local Tools]
                                      ▼
       ┌─────────────────────────────────────────────────────────────┐
       │             External AI / Developer Environments            │
       │  • Claude (Anthropic) / Claude Code CLI                     │
       │  • Cursor / OpenAI Codex / ChatGPT                          │
       │  • Local Terminal (`npm run dev`, `git push`)               │
       └─────────────────────────────────────────────────────────────┘
```

### How the Sync Lifecycle Operates:

1. **AI Studio Native Environment**:
   - The in-browser IDE runs on a cloud container.
   - It executes `npm run dev` which runs `tsx server.ts` (Express backend + Vite middleware mounted simultaneously on port 3000).
   - In-app preview runs inside a sandboxed `iframe`.
   - The file `metadata.json` stores AI Studio project capabilities (e.g. `MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API`). **Never rename, delete, or remove permissions from `metadata.json`**.

2. **Syncing to GitHub**:
   - In Google AI Studio, clicking the **GitHub** button commits the current container file tree and pushes to the linked GitHub repository.
   - When external agents (Claude, Codex, ChatGPT) pull from GitHub (`git pull origin main`), they receive the exact snapshot created in AI Studio.

3. **External Modifications & Pushing Back**:
   - When working locally with Claude, Codex, or Cursor:
     ```bash
     git pull origin main
     npm install
     npm run dev       # Starts full-stack server on http://localhost:3000
     npm run lint      # Runs `tsc --noEmit`
     npm run build     # Runs Vite build + esbuild server bundle
     git add .
     git commit -m "feat(agent): description of your enhancement"
     git push origin main
     ```
   - When the user returns to Google AI Studio and pulls or refreshes from GitHub, AI Studio ingests those commits directly into the cloud container.

### Golden Rules for External Agents (Claude / Codex / ChatGPT):
- **Never Change the Dev Server Port**: AI Studio expects port `3000`. Do not change `server.ts` or `vite.config.ts` to port 5173, 8080, etc.
- **Never Change `package.json` Scripts**:
  - `"dev": "tsx server.ts"` (Must remain full-stack).
  - `"build": "vite build && esbuild server.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs"`
  - `"start": "node dist/server.cjs"`
  - `"lint": "tsc --noEmit"`
- **No System-Specific Absolute Paths**: Always use relative imports (`../components/...`). Never write machine-specific paths like `/Users/username/...` or `/home/...`.
- **Environment Variables**: Never hardcode secrets. All public frontend variables must start with `VITE_` (e.g., `VITE_ANALYTICS_URL`). Server-only keys like `GEMINI_API_KEY` are read exclusively in `server.ts`.

---

## 3. COMPLETE REPOSITORY STRUCTURE & FILE DIRECTORY

Here is the exact structural directory tree of the workspace:

```text
/
├── .env.example                     # Environment template (VITE_ANALYTICS_URL, GEMINI_API_KEY)
├── .gitignore                       # Git ignore list (node_modules, dist, .env, build logs)
├── metadata.json                    # Google AI Studio configuration & Gemini API capabilities
├── package.json                     # NPM packages & build pipelines
├── tsconfig.json                    # TypeScript compiler options
├── vite.config.ts                   # Vite bundler configuration (Tailwind & React plugins)
├── server.ts                        # Full-stack Express server + Vite middlewares + Gemini proxy
├── index.html                       # HTML entry point (SEO metadata, typography, favicon)
├── agent.md                         # This file: Universal AI agent instruction manual
├── CODEX.md                         # Architectural reference & styling specs
├── ANTIGRAVITY.md                   # Automated research & state integrity rules
├── public/                          # Static public web assets
│   ├── favicon.svg                  # Cybernetic minimalist SVG favicon
│   ├── oryxenai-hero.svg            # Custom 5-stage multi-agent pipeline vector artwork
│   ├── oryxenai-architecture.svg    # Deep dive architectural DAG diagram
│   └── oryxenai-preview.svg         # Live verification preview vector diagram
└── src/
    ├── main.tsx                     # React 19 client mount point
    ├── App.tsx                      # Root client-side router, page-stage coordinator, state
    ├── data.ts                      # SINGLE SOURCE OF TRUTH (Profile, projects, experience, skills)
    ├── types.ts                     # Strict TypeScript interfaces for all data structures
    ├── index.css                    # Tailwind CSS v4 root styling, themes, keyframes
    ├── assets/
    │   └── images/                  # High-resolution portrait photographs
    ├── hooks/
    │   └── useScrollTracker.ts      # Passive 25%, 50%, 75%, 100% reading depth tracker
    ├── utils/
    │   ├── analytics.ts             # Non-blocking Google Sheets visitor tracking engine
    │   └── scroll.ts                # Smooth scroll utility helpers
    └── components/                  # Modular React UI components
        ├── FixedNav.tsx             # Floating pill navigation with status pulse
        ├── HeroSection.tsx          # Editorial hero, 3D tilt portrait, typography
        ├── AboutSection.tsx         # Executive bio, skills overview, availability pill
        ├── ManifestoSection.tsx     # Word-by-word scroll-linked reveal for AI philosophy
        ├── ServicesSection.tsx      # Interactive architectural rules & services
        ├── ExperienceAndSkillsSection.tsx # Chronological experience, education & 6 skill groups
        ├── ProjectsSection.tsx      # Showcase grid highlighting #1 OryxenAI, Medifindx, etc.
        ├── ProjectDetailPage.tsx    # Case study template with tech stack pills & gallery
        ├── TestimonialsSection.tsx  # Verifiable credentials & certifications
        ├── ThoughtsSection.tsx      # Grid of engineering essays & publications
        ├── ThoughtDetailPage.tsx    # Full-length technical essay reader
        ├── ContactSection.tsx       # Direct contact form & communication channels
        ├── PortfolioSidekick.tsx    # Autonomous interactive Gemini AI companion
        ├── Starfield.tsx            # Background celestial coordinate grid & twinkles
        ├── ScrollReveal.tsx         # Reusable scroll viewport entrance wrapper
        └── Footer.tsx               # Structural Swiss brutalist footer with live clock
```

---

## 4. DETAILED COMPONENT & MODULE DIRECTORY

### 1. `server.ts` (Full-Stack Backend & AI Companion Proxy)
- **Role**: Combines Express and Vite in development (`"dev": "tsx server.ts"`).
- **In Development**: Mounts `vite.middlewares` directly into Express so front-end HMR and API routes share port `3000`.
- **In Production**: Serves built static assets from `dist/` and runs the Express API server.
- **Endpoints**:
  - `GET /api/health`: Healthcheck endpoint returning uptime and server timestamp.
  - `POST /api/gemini/chat`: Server-side proxy communicating with the `@google/genai` SDK using `gemini-2.5-flash`. It injects the comprehensive `portfolioContext` (grounded in `src/data.ts`) and enforces strict JSON schema output:
    ```typescript
    {
      message: string;        // 1-2 sentence concise answer
      emotion: SidekickState; // "idle" | "hello" | "wave" | "pointing" | "curious" | "excited" | "happy" | "sleepy" | "bored" | etc.
      action: string;         // "none" | "scrollToSection" | "openResume" | "openProject" | "openContact"
      target: string;         // e.g. "oryxenai", "skills", "experience", "contact"
      quickReplies: string[]; // 2-3 interactive reply chips
    }
    ```

### 2. `src/data.ts` (THE SINGLE SOURCE OF TRUTH)
- **CRITICAL**: Do **NOT** hardcode text, project bullets, dates, URLs, or skills inside JSX files!
- All portfolio content lives in `src/data.ts` under the typed export `portfolioContent`:
  - `identity`: Name, title (`"AI Engineer | Agentic AI"`), email, links, location.
  - `about`: Phrasing must remain strictly factual (*"AI Engineer with 1 year of experience..."* — **never** use vague qualifiers like *"approximately"*).
  - `services`: Agentic AI, Context Engineering, AI Backends, RAG, Tool/MCP, Cloud.
  - `projects`:
    - **`oryxenai`** (Flagship #1 project): 5-stage multi-agent platform, live at `https://app.oryxenai.me/`.
    - `medifindx`: 9-agent multimodal medical platform.
    - `parserai-yashai`: RAG document intelligence & resume analysis.
    - `yashoda`: Full-stack e-commerce platform.
  - `experience`:
    - **Xpression Technologies** (Founding AI Engineer, Oct 2025 – Present): 5 production bullets on end-to-end SDLC platform, multi-agent DAG runtime (30-40% faster), relationship-aware context engineering (-73% errors in production testing), long-horizon memory (~63.4K tokens / -33%), MCP contracts, reliability layer, 6-person startup team, and technical hiring interviews.
    - **JUTEQ Inc** (AI Engineer, Jul 2024 – Oct 2024): AutoTrader Canada chatbot, VAPI voice agents, Playwright, Twilio 2FA.
    - **Indian Institute of Technology, Mandi** (Backend Developer, Jan 2024 – Jun 2024): HIMCOSTE smart blood & medicine monitoring system, Firestore, Arduino telemetry.
  - `skills`:
    - Category 1 must always be **"Languages"**: `["Python", "SQL", "JavaScript", "TypeScript"]`.
    - Other categories: `AI / Agentic Systems`, `Backend & APIs`, `Cloud & DevOps`, `Databases & Storage`, `Testing & Observability`.
  - `education`: AKTU (B.Tech - IT, 2021-2025) and St. Xavier's (CBSE Intermediate, 2019-2021).
  - `testimonials` & `thoughts`: Verifiable credentials and technical essays.

### 3. `src/App.tsx` (Client-Side State Routing Engine)
- **Why no `react-router-dom`?** Standard React Router can cause navigation conflicts and full-page reload loops inside sandboxed iframes. `App.tsx` implements a rock-solid, zero-dependency popstate router.
- **Routes**:
  - `/` -> Landing page view (`Hero` -> `About` -> `Manifesto` -> `Services` -> `ExperienceAndSkills` -> `Projects` -> `Testimonials` -> `Thoughts` -> `Contact` -> `Footer`).
  - `/work/:slug` -> Renders `ProjectDetailPage` with full case study, tech stack badges, and gallery.
  - `/thoughts/:slug` -> Renders `ThoughtDetailPage` with essay body.
- **The Navigation Rule**: When navigating between pages or section anchors in JSX, **always** call the passed `onNavigate` handler:
  ```tsx
  // CORRECT:
  <button onClick={() => onNavigate("/work/oryxenai")}>View Case Study</button>
  <button onClick={() => onNavigate("/", "#skills")}>View Skills</button>

  // WRONG (will break iframe sandboxing!):
  <a href="/work/oryxenai">View Case Study</a>
  ```

### 4. `src/components/PortfolioSidekick.tsx` (AI Companion)
- **Visuals**: A custom procedural vector robot rendered with motion keyframes, glowing antenna, responsive eyes, and articulated limbs.
- **Interactive State Machine**:
  - `idle`: Gentle organic breathing and periodic irregular blinking.
  - `wave` / `waving` / `hello`: Welcoming arm wave with happy eyes (`^^`). Triggered on conversational sections (`hero`, `about`, `contact`).
  - `pointing`: Directed arm pointing with focused posture. Triggered when switching to showcase sections (`projects`, `skills`, `experience`, `thoughts`).
  - `bored`: Triggered when the user remains **inactive for >15 seconds**. The robot sighs, slouches, droops its antenna, dims its bulb to slate `#94A3B8`, half-lids its eyes, and taps its hip. Instantly wakes up on mouse movement, scroll, or click!
  - `thinking` / `speaking`: Live animated feedback during Gemini API calls.
  - `curious` / `sleepy`: Distance-based proximity detection to user cursor.
- **Commentary Engine**: Context-aware, sarcastic, intelligent comments about the currently viewed section. Throttled to prevent spam.
- **Audio Synthesis**: Integrated speech synthesizer (Web Speech API) with toggleable voice responses.

### 5. `src/utils/analytics.ts` & `src/hooks/useScrollTracker.ts`
- Non-blocking telemetry sent to Google Sheets via Apps Script (`VITE_ANALYTICS_URL`).
- Fired with `mode: "no-cors"` and `keepalive: true` to prevent CORS preflight delay or page exit interruption.
- Tracks page views, resume clicks, contact events, and 25% / 50% / 75% / 100% scroll depth.

---

## 5. DESIGN SYSTEM & STYLING SPECIFICATIONS

The application strictly adheres to a **Swiss Editorial Brutalist** design system.

### Color Tokens (defined in `src/index.css` via Tailwind v4 `@theme`):
- `--color-paper`: `#faf7f3` (Warm editorial eggshell)
- `--color-paper-deep`: `#f4f0eb` (Recessed card background)
- `--color-ink`: `#111111` (Deep charcoal black typography)
- `--color-ink-soft`: `#252525` (Secondary text and metadata)
- `--color-accent-cyan`: `#33D1FF` (Robotic antenna glow and interactive accents)
- `--color-accent-amber`: `#FFAA33` (Thinking state and highlight indicators)
- `--color-accent-crimson`: `#FF4757` (Cybernetic energy conduits and urgent alerts)

### Typography:
- `font-sans`: **"Archivo"**, sans-serif (High-density geometric gothic)
- `font-serif`: **"Playfair Display"**, serif (Editorial contrast headlines)
- `font-mono`: **"JetBrains Mono"**, monospace (Tech stack badges, timestamps, code metrics)

### Anti-AI Slop Guidelines:
1. **No generic purple/blue gradients or blurry blobs**: Every border is crisp (`border-ink/10` or `border-ink/20`).
2. **No floating pills without purpose**: Badges must have structured monospace labels and borders.
3. **Typography first**: Visual hierarchy is driven by size scale (`text-6xl`, `text-7xl`, `clamp(...)`), tracked uppercase headers, and clean vertical rhythm.
4. **Lists**: Avoid generic `list-disc` that overflows. Use structured custom flex bullet items:
   ```tsx
   <li className="flex items-start gap-3">
     <span className="w-1.5 h-1.5 rounded-full bg-ink/40 mt-2 shrink-0 select-none" />
     <span className="text-ink-soft leading-relaxed">{bulletText}</span>
   </li>
   ```

---

## 6. PRE-FLIGHT VERIFICATION CHECKLIST (FOR ALL AI AGENTS)

Before committing, pushing, or concluding your task, ALWAYS perform these validation steps:

```bash
# 1. Type-check TypeScript without emitting JS:
npm run lint

# 2. Verify complete full-stack build:
npm run build

# 3. Test dev server boot:
npm run dev
```

### Self-Check Questions:
- [ ] Did I maintain `src/data.ts` as the single source of truth instead of hardcoding text into JSX?
- [ ] Are all internal links wired using `onNavigate` instead of `<a href="/...">`?
- [ ] Does `package.json` still use `"dev": "tsx server.ts"` on port 3000?
- [ ] Is `metadata.json` intact with its permissions and original name?
- [ ] Does `src/data.ts` skill categories have **"Languages"** at the top with `Python`, `SQL`, `JavaScript`, `TypeScript`?
- [ ] Does the bio clearly say *"AI Engineer with 1 year of experience"* without vague words like *"approximately"*?
- [ ] Is **OryxenAI** present with its live URL ([https://app.oryxenai.me/](https://app.oryxenai.me/)) and tech stack badges?
- [ ] Does `PortfolioSidekick` support gestures (`wave`, `pointing`) on section change and `bored` state after 15 seconds of inactivity?

---

*This document is maintained for seamless collaboration between Google AI Studio, Gemini, Claude, Codex, ChatGPT, and human software engineers.*
