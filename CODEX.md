# PROJECT CODEX: YASH SRIVASTAVA — AI ENGINEER PORTFOLIO

This document serves as the architectural reference manual and source-of-truth specification for the Yash Srivastava portfolio app. Any coding agent (including Antigravity AI, Deep Research models, or other AI engines) MUST read this file to understand the system architecture, file structure, routing, and assets without hardcoding.

---

## 1. TECHNICAL STACK OVERVIEW

- **Framework**: React 18+ with TypeScript
- **Bundler & Dev Server**: Vite (bound to port `3000`, host `0.0.0.0`)
- **Styling**: Tailwind CSS (v4 structure configured via `@import "tailwindcss";` in `src/index.css`)
- **Animations**: `motion` (imported from `motion/react`) for smooth entry reveals and scroll-linked components, supplemented by custom Tailwind keyframes.
- **Icons**: Lucide Icons (`lucide-react`) exclusively.
- **Data Engine**: Monolithic schema-driven static payload declared in `src/data.ts`.

---

## 2. FILE DIRECTORY STRUCTURE

The workspace is organized cleanly as follows:
```text
/
├── .env.example              # Example environment declarations
├── .gitignore                # Ignored paths (node_modules, dist, build logs)
├── index.html                # Main index entry (updates title and meta)
├── metadata.json             # AI Studio app permissions & capabilities metadata
├── package.json              # App scripts, dev tools, and dependencies
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite build configuration (port 3000)
├── CODEX.md                  # This file: Project code specifications
├── ANTIGRAVITY.md            # Guidelines for AI automated updates
└── src/
    ├── main.tsx              # Application React mounting entry point
    ├── App.tsx               # Root router, viewport manager, state container
    ├── data.ts               # Source-of-truth portfolio payload & image paths
    ├── types.ts              # Strict TypeScript definitions for data structures
    ├── index.css             # Tailwind v4 root, custom scrollbars & animations
    ├── utils/
    │   └── analytics.ts      # Lightweight, non-blocking Google Sheets tracker
    └── components/
        ├── FixedNav.tsx                  # Floating horizontal menu capsule
        ├── HeroSection.tsx              # Cinematic headline & 3D card portrait
        ├── AboutSection.tsx             # Grayscale portrait grid & text overview
        ├── ManifestoSection.tsx         # Word-by-word scroll-linked text revealer
        ├── ServicesSection.tsx          # Custom horizontal interactive rules
        ├── ExperienceAndSkillsSection.tsx # Chronological experience, education, tags
        ├── ProjectsSection.tsx          # Hover-interactive grid of projects
        ├── ProjectDetailPage.tsx        # Dynamic layout for deep-dive case studies
        ├── TestimonialsSection.tsx      # Dark-accented quote carousel
        ├── ThoughtsSection.tsx          # Grid card view of technical publications
        ├── ThoughtDetailPage.tsx        # Full markdown-friendly article viewer
        ├── ContactSection.tsx           # Inline interactive dark email form
        ├── Starfield.tsx                # Twinkling celestial coordinate particles
        └── Footer.tsx                   # Structural sitemap and dynamic clock
```

---

## 3. STATE ROUTING ARCHITECTURE (NO HARDCODING)

The application uses an ultra-fast, client-side, dependency-free route state manager instead of `react-router-dom` to support seamless loading inside sandboxed iframe containers.

### Routing Mechanism
Defined and orchestrated inside `src/App.tsx`:
1. **Current Path Tracking**: Represented by the `currentPath` state hook.
2. **Synchronized History popstate**: Back and forward browser actions are bound via:
   ```typescript
   useEffect(() => {
     const handlePopState = () => setCurrentPath(window.location.pathname);
     window.addEventListener("popstate", handlePopState);
     return () => window.removeEventListener("popstate", handlePopState);
   }, []);
   ```
3. **Programmatic Navigation (`navigate`)**: Handles standard route pushes as well as animated anchor jumps:
   ```typescript
   const navigate = (path: string, hash?: string) => {
     window.history.pushState({}, "", path + (hash || ""));
     setCurrentPath(path);
     if (hash) {
       setTimeout(() => {
         const el = document.querySelector(hash);
         if (el) el.scrollIntoView({ behavior: "smooth" });
       }, 100);
     } else {
       window.scrollTo({ top: 0, behavior: "instant" });
     }
   };
   ```

### Active Routes
- **`/`**: Displays the core Landing Layout consisting of sections: `HeroSection` -> `AboutSection` -> `ManifestoSection` -> `ServicesSection` -> `ExperienceAndSkillsSection` -> `ProjectsSection` -> `TestimonialsSection` -> `ThoughtsSection` -> `ContactSection` -> `Footer`.
- **`/work/:slug`**: Captures slugs and finds matching projects in `portfolioContent.projects` to render the custom `ProjectDetailPage`.
- **`/thoughts/:slug`**: Captures slugs and finds matching articles in `portfolioContent.thoughts` to render `ThoughtDetailPage`.

---

## 4. STAGGERED ENTRANCE TRANSITION STAGES

To provide a high-end editorial feel on mounting, the landing page uses a state variable `loadStage` (from `0` to `2`) which triggers progressive CSS transitions:
- **`stage 0`** (0ms to 850ms): Empty backdrop or heavily blurred content.
- **`stage 1`** (850ms to 1800ms): Sharp headings fade in, 3D card portrait rises from bottom-right.
- **`stage 2`** (1800ms+): Stars, thunderbolts, floating horizontal navigation menu, and meta rows fade into fully interactive states.

---

## 5. DESIGN & STYLING TOKENS

The interface adheres to a clean, warm Swiss-Brutalist editorial style:
- **Primary Background (`--color-paper`)**: `#faf7f3` (Warm eggshell/off-white)
- **Deep Background (`--color-paper-deep`)**: `#f4f0eb` (Darker structural accent)
- **Primary Ink/Text (`--color-ink`)**: `#111111` (Deep charcoal black)
- **Secondary Ink/Muted (`--color-ink-soft`)**: `#252525` (Soft charcoal)
- **Typography (`--font-sans`)**: `"Archivo"`, sans-serif (Structured geometric gothic font)
- **Serif Accents (`--font-serif`)**: `"Playfair Display"`, serif (High-end contrast)

---

## 6. DATA PATTERNS & STATIC CONTENT SCHEMA

All content data is maintained in `/src/data.ts`.
Do not embed hardcoded data inside components. All textual fields, list items, project case studies, and career bullet points must reside inside the `portfolioContent` object, adhering to `/src/types.ts`.

### Assets Mapping
- **Portrait Dark URL** (`PORTRAIT_DARK_URL`): Imported directly from `./assets/images/regenerated_image_1783807737742.jpg` (represents the premium high-contrast studio portrait).
- **Portrait Red Accent URL** (`PORTRAIT_RED_URL`): Loaded dynamically from Unsplash (`@ts-expect-error` ignores module warnings).

---

## 7. CODING PRINCIPLES & GUIDELINES FOR AUTOMATION

1. **Keep Imports Simple**: Ensure named imports are declared cleanly at the top of files.
2. **Avoid Absolute System Paths**: Always reference relative workspace paths (e.g., `./components/Starfield` instead of absolute server container directory paths).
3. **No Inline Styling**: Rely strictly on Tailwind utility classes or custom variables integrated inside `@theme` in `src/index.css`.
4. **Preserve Navigation**: When updating components, never hardcode simple buttons or normal links (`<a href="...">`) if they point to internal routes. Always bind their click handlers to the unified `onNavigate` handler to maintain popstate consistency!

---

## 8. VISITOR ANALYTICS ENGINE

A lightweight, high-performance, and non-blocking visitor tracking system is integrated directly into the root app.

### Overview of Tracking System
- **File**: `src/utils/analytics.ts`
- **Initial Trigger**: Initiated inside `src/App.tsx` approximately 1.5 seconds after mounting (`trackInitialVisit`).
- **Endpoint**: Configured dynamically using `import.meta.env.VITE_ANALYTICS_URL` with a reliable fallback to Google Apps Script.
- **Payload Schema**: Matches the requirements for the Google Sheets backend:
  - `visitorId`: Anonymous unique key stored in `localStorage`.
  - `visitNumber`: Total visits count.
  - `visitorType`: `"new"` or `"returning"` visitor state.
  - `sessionId`: Session UUID stored in `sessionStorage`.
  - `event`: `"page_view"`, `"resume_click"`, `"contact_click"`, or `"scroll_progress_X"` (where X is 25, 50, 75, or 100).
  - `page`: Fully-resolved current URL path.
  - `previousPage` & `referrer`: Previous and HTTP referrers.
  - `utmSource`, `utmMedium`, `utmCampaign`: Querystring campaign parameters.
  - Geolocation (`country`, `region`, `city`): Retrieved via lightweight IP lookup with a maximum 1-second delay.
  - Browser/Device Details (`device`, `browser`, `os`, `screenSize`, `viewport`, `language`, `timezone`).
  - Interaction flags: `resumeClicked` (boolean) and `timeOnPage` (seconds).

### Scroll Progress Tracking
- **Hook**: `src/hooks/useScrollTracker.ts` handles non-blocking passive tracking of scrolling percentages.
- **Trigger**: Embedded directly in the article pages (`ThoughtDetailPage`) and project detail pages (`ProjectDetailPage`).
- **Milestones**: Captures exactly when the visitor reads/views 25%, 50%, 75%, and 100% of the content and dispatches individual checkpoint events (e.g. `"scroll_progress_50"`) once per page load.
- **Short Pages**: Instantly triggers milestones with a slight stagger on extremely short non-scrollable viewports to ensure complete visit coverage.

### Core Optimization Features
1. **Strict Mode Protection**: Utilizes `portfolio_page_view_sent_v2` in `sessionStorage` to prevent duplicate `page_view` events caused by React's initial mount/remount cycle.
2. **Non-Blocking Operation**: Geolocation lookups utilize an automatic race timeout (1000ms), falling back to `"Unknown"` gracefully so analytics events do not block user interactions or UI performance.
3. **No-Cors Pipeline**: Sends payloads asynchronously utilizing standard `fetch` with `mode: "no-cors"` and `keepalive: true` to prevent CORS Preflight overhead and preserve browser page-navigation telemetry.
