# Autonomous Editorial Portfolio & Companion Engine

<p align="center">
  <strong>A full-stack, Swiss editorial web experience featuring a procedurally animated, Gemini-powered autonomous desktop companion, real-time context streaming, and an iframe-safe micro-router.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white" alt="Google Gemini" />
</p>

---

## Overview

This project is a high-performance, full-stack web application that combines **Swiss Editorial Brutalism** with **Autonomous Agentic Interaction**. 

Rather than presenting content through standard static landing pages or generic templates, the platform pairs an editorial publication layout with a live, procedural vector companion (`PortfolioSidekick`). The companion observes viewport scroll positions, monitors user inactivity, performs contextual gesturing, and leverages server-side Gemini 2.5 Flash streaming to provide structured conversational responses.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        EDITORIAL BROWSER CLIENT                        │
│  ┌───────────────────────┐   ┌──────────────────────────────────────┐  │
│  │   Swiss Typography    │   │      Procedural Vector Sidekick      │  │
│  │  • Archivo Headings   │   │  • Multi-state SVG animation rig     │  │
│  │  • Playfair Display   │   │  • Dynamic proximity tracking        │  │
│  │  • JetBrains Monospace│   │  • Boredom & section-gesture engines │  │
│  └───────────┬───────────┘   └──────────────────┬───────────────────┘  │
│              │                                  │                      │
│              │ Popstate Router                  │ JSON RPC             │
│              ▼                                  ▼                      │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │              Full-Stack Node.js Runtime (Port 3000)              │  │
│  │    • Express HTTP Server             • Vite Middleware HMR       │  │
│  │    • Healthchecks & API routes       • @google/genai SDK Proxy   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Core Systems & Highlights

### 1. The Procedural Vector Companion (`PortfolioSidekick`)
An interactive, SVG-rendered robotic companion that floats seamlessly alongside the content. Built without heavy 3D canvases or external sprite sheets:
- **Procedural Kinematics**: Dynamic SVG articulation for head tilt, bouncing antenna, glowing status LED, waving arms, and reactive eye expressions.
- **Section Gesture Triggers**:
  - Automatically raises its arm to **`pointing`** when the user navigates into technical showcase areas (Projects, Skills, Architecture).
  - Shifts to a warm **`wave`** gesture with smiling inverted curve eyes (`^^`) upon entering welcoming sections (Hero, About, Contact).
- **Secondary Boredom Engine**:
  - Monitors global interaction events (`mousemove`, `keydown`, `scroll`, `touchstart`).
  - If no interaction occurs for **15 seconds**, the companion slumps into a **`bored`** animation cycle: its antenna droops, its bulb dims to slate, its eyes half-lid, and it lets out periodic deep sighs. Moving the cursor or scrolling instantly snaps it back to attention.
- **Proximity Awareness**: Senses cursor distance, leaning curiously toward the cursor when approached or entering a defensive/curious stance.
- **Organic Sarcastic Commentary**: Periodically displays contextual editorial remarks tailored to the section currently under view.
- **Native Speech Synthesis**: Built-in voice toggle powered by the Web Speech API with synchronized mouth vibrations.

### 2. Swiss Editorial Brutalist Design Language
- **Palette**: Warm editorial eggshell (`#faf7f3`) and recessed paper (`#f4f0eb`) contrasted against deep carbon ink (`#111111`).
- **Accent Radiance**: Cyan pulse (`#33D1FF`) for active robotic circuits and amber alerts (`#FFAA33`) for thinking states.
- **Typographic Hierarchy**:
  - Primary sans-serif: **Archivo** (high-density geometric neo-grotesque).
  - Editorial accents: **Playfair Display** (italic contrast serif).
  - Metrics & timestamps: **JetBrains Mono** (monospace data badges).
- **Zero-Pill Discipline**: No gratuitous floating capsules or blurry neon gradients. Every boundary is defined by razor-thin borders (`border-ink/10`) and crisp structural grids.

### 3. Full-Stack Unified Dev Architecture
- The application executes as a single full-stack instance via `server.ts`.
- In development, **Express** mounts **Vite middleware** directly (`vite.middlewares`), serving the React client and handling API routes concurrently on port `3000`.
- In production, static assets are bundled to `/dist` while `server.ts` compiles via `esbuild` to a standalone Node.js server (`dist/server.cjs`).
- **Server-Side AI Proxy**: Client requests to `/api/gemini/chat` are proxied securely on the backend, communicating with Gemini 2.5 Flash via `@google/genai` and enforcing strict JSON-schema responses.

### 4. Zero-Dependency Iframe-Safe Router
- Traditional hash or history routing can trigger nested iframe loops or break inside containerized sandboxes.
- Uses a custom, zero-dependency `popstate` router located in `App.tsx` that coordinates:
  - Top-level section jumping (`/#projects`, `/#skills`, `/#manifesto`) with scroll restoration.
  - Deep case-study views (`/work/:slug`).
  - Technical essay views (`/thoughts/:slug`).

### 5. Telemetry & Reading Depth
- Lightweight, non-blocking telemetry engine (`analytics.ts`) tracking key user journey milestones.
- **Passive Scroll Depth**: Fires discreet milestone pings at 25%, 50%, 75%, and 100% viewport coverage with beacon persistence (`keepalive: true`, `mode: "no-cors"`).

---

## Directory Layout

```text
.
├── server.ts                    # Full-stack Express backend + Vite middleware + AI proxy
├── index.html                   # HTML entry point (SEO metadata, typography, SVG favicon)
├── package.json                 # Project dependencies, build targets, and scripts
├── tsconfig.json                # Strict TypeScript configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS integration
├── agent.md                     # Universal AI Agent collaboration instructions & rules
├── CODEX.md                     # Visual architecture and design constitution
├── public/                      # Static assets & architectural SVG diagrams
│   ├── favicon.svg              # Minimalist cybernetic SVG favicon
│   ├── oryxenai-hero.svg        # 5-stage agent workflow vector illustration
│   ├── oryxenai-architecture.svg# Architectural DAG vector illustration
│   └── oryxenai-preview.svg     # Live platform preview vector graphic
└── src/
    ├── main.tsx                 # React DOM mount
    ├── App.tsx                  # Popstate client-side router & stage coordinator
    ├── data.ts                  # Single source of truth (content, projects, timeline, skills)
    ├── types.ts                 # Strict TypeScript schemas and component contracts
    ├── index.css                # Tailwind CSS v4 setup, color tokens, and custom animations
    ├── hooks/
    │   └── useScrollTracker.ts  # Reading depth observer hook
    ├── utils/
    │   ├── analytics.ts         # Non-blocking telemetry dispatcher
    │   └── scroll.ts            # Smooth viewport scrolling utility
    └── components/
        ├── PortfolioSidekick.tsx# Interactive Gemini AI robot companion
        ├── FixedNav.tsx         # Floating header bar with status indicators
        ├── HeroSection.tsx      # Editorial masthead with 3D tilt portrait
        ├── AboutSection.tsx     # Narrative summary, links, and status pills
        ├── ManifestoSection.tsx # Word-by-word scroll-linked reveal
        ├── ServicesSection.tsx  # Architectural principles & service offerings
        ├── ExperienceAndSkillsSection.tsx # Work history with metrics & categorized skills
        ├── ProjectsSection.tsx  # Interactive project grid
        ├── ProjectDetailPage.tsx# Long-form case study layout
        ├── TestimonialsSection.tsx # Credential badges & recommendations
        ├── ThoughtsSection.tsx  # Grid of technical essays
        ├── ThoughtDetailPage.tsx# Long-form essay reader
        ├── ContactSection.tsx   # Direct inquiry form & communication channels
        ├── Starfield.tsx        # Subtle background coordinate grid & twinkling stars
        ├── ScrollReveal.tsx     # Viewport entrance animation wrapper
        └── Footer.tsx           # Structural Swiss colophon with live clock
```

---

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun**

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   Configure the optional environment keys:
   - `GEMINI_API_KEY`: Google Gemini API key (enables real-time companion chat via server proxy).
   - `VITE_ANALYTICS_URL`: Webhook URL for scroll and event logging.

4. **Run the Full-Stack Dev Server**:
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:3000`.

---

## Production Build & Deployment

To verify and bundle the project for production:

```bash
# 1. Type-check TypeScript without emitting output
npm run lint

# 2. Build client bundle and bundle server.ts via esbuild
npm run build

# 3. Start the production server
npm run start
```

The production server will listen on port `3000` (or the `PORT` specified in your environment).

---

## Companion Emotion & Animation States

The `PortfolioSidekick` state machine supports the following kinematic emotional transitions:

| State | Visual Behavior | Trigger Condition |
| :--- | :--- | :--- |
| `idle` | Gentle breathing, floating hover, natural periodic blinking | Default resting state |
| `wave` / `waving` | Arms raised, rapid welcoming wave, curved happy eyes (`^^`) | Transitioning into conversational sections (Hero, About, Contact) |
| `pointing` | Extended pointing arm toward page content, focused gaze | Transitioning into showcase sections (Projects, Skills, Experience) |
| `bored` | Slumped posture, drooping antenna, dim slate bulb, slow sigh | User inactive for >15 seconds |
| `curious` | Cocked head, enlarged luminous pupils, leans toward cursor | Cursor moves within 160px of the robot |
| `thinking` | Rapid antenna micro-jitter, pulsating amber bulb | Waiting for Gemini API response stream |
| `speaking` | Vocalizer mouth-bars dancing, torso bouncing, audio output | Returning AI answer or reading speech synthesis |
| `happy` / `excited` | Continuous vertical bounce, wide crescent eyes | Positive conversational feedback |
| `sleepy` | Drowsy eyelids, lowered position, minimal floating movement | Extended idle without cursor movement |

---

## Design System Reference

```css
/* Core Color Tokens (Defined in src/index.css) */
--color-paper:          #faf7f3;  /* Main editorial canvas */
--color-paper-deep:     #f4f0eb;  /* Recessed surface cards */
--color-ink:            #111111;  /* High-contrast text & borders */
--color-ink-soft:       #252525;  /* Secondary paragraphs & labels */
--color-accent-cyan:    #33D1FF;  /* Active companion glowing circuits */
--color-accent-amber:   #FFAA33;  /* Thinking & warning states */
--color-accent-crimson: #FF4757;  /* High-priority indicators */
```

---

## Quality Assurance & Verification

All code changes must pass the strict verification pipeline:

```bash
# Validate zero TypeScript compilation or typing errors
npm run lint

# Validate full production build pipeline
npm run build
```

---

<p align="center">
  <sub>Built with precision using React 19, TypeScript, Tailwind CSS v4, and Google Gemini.</sub>
</p>
