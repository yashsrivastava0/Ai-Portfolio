# ANTIGRAVITY AI OPERATIONAL GUIDELINES: YASH SRIVASTAVA PORTFOLIO

Welcome, Antigravity AI / Deep Research Agent. 

This instruction file guides your automated workflows, research, and code generations for this repository. It ensures that any modifications you make to pages, routes, styles, or data schemas are safe, coherent, and highly premium in output.

---

## 1. STRATEGIC RESEARCH PROTOCOL

Before modifying any file in this codebase, execute the following search and study steps:
1. **Read `CODEX.md`**: Study the system architecture, file structure, state-flows, and technical stacks listed in the main codex file.
2. **Review `src/data.ts`**: This is the application's core data store. Never hardcode strings, descriptions, bullet lists, or links directly in JSX components unless they represent universal interface elements. Always write/read them from the static payload exported here.
3. **Verify Routes**: Review `src/App.tsx` and check the route patterns (`/`, `/work/:slug`, `/thoughts/:slug`) before proposing routing updates.

---

## 2. INTEGRITY OF STATE ROUTING (CRITICAL)

To maintain single-page-app compatibility and perfect loading inside sandboxed frames:
- **No Hardcoded Anchors for Internal Routing**: Never use standard anchor tags with `href="/some-path"` (e.g., `<a href="/work/slug">`) for internal routes. This causes full-page reloads and breaks iframe sandboxing!
- **Unified Navigation Binding**: Always bind click handlers to the passed-in `onNavigate` callback function:
  ```typescript
  // Right way:
  <button onClick={() => onNavigate("/work/slug")}>View Case Study</button>
  
  // Wrong way:
  <a href="/work/slug">View Case Study</a>
  ```
- **Sync Browser History**: When creating new sub-pages or custom routes, make sure they are checked inside `src/App.tsx`'s currentPath evaluation and synchronized with browser `popstate` events.

---

## 3. VISUAL STYLE & PREMIUM POLISH PRINCIPLES

This portfolio follows a strict, high-fidelity **Swiss Editorial Brutalist** style. Respect these rules when adding or modifying elements:
1. **Bullet Points**: Do NOT use standard browser `list-disc` lists inside containers with horizontal shifts or negative margins. Always implement custom flex bullet items to ensure pixel-perfect, clean spacing without overlaps:
   ```typescript
   <li className="flex items-start">
     <span className="text-ink/40 mr-3 select-none mt-2.5 shrink-0 block w-1.5 h-1.5 rounded-full bg-ink/40" />
     <span className="flex-1">{bulletText}</span>
   </li>
   ```
2. **Twinkling Space Backgrounds**: The `Starfield` component in `/src/components/Starfield.tsx` projects coordinate grids and soft twinkling stars behind the page. Always keep this background layer at `z-0` and set overlay components (such as content cards, headers, and grids) with relative positions to let stars float elegantly in the background.
3. **Responsive Text**: Use fluid sizes like `clamp(...)` inside your CSS rules (or relative units like `sm:`, `md:`, `lg:`) to guarantee layouts look breathtakingly crisp across mobile, tablet, and wide desktop views.
4. **Cinematic Entry Stages**: Respect the `loadStage` transitions inside `HeroSection.tsx`. Do not interrupt or bypass the staged entrance timings (0ms -> 850ms -> 1800ms) that animate text opacity, portraits, and fixed floating menus.

---

## 4. CODE PRE-FLIGHT VERIFICATION

After performing edits:
1. Run `npm run lint` or `tsc --noEmit` to verify TypeScript typing safety.
2. Confirm that there are no absolute system paths used in imports.
3. Ensure no trailing debug logs, telemetry indicators, or mock server messages are injected.

---

## 5. ANALYTICS PIPELINE & NON-BLOCKING BEHAVIOR

When adding or modifying components, pages, links, or layouts:
1. **Preserve Analytics Hooks**: Do not delete or disrupt the `useEffect` trigger inside `src/App.tsx` that executes `analytics.trackInitialVisit()` approximately 1.5 seconds after mounting.
2. **Handle Interceptable Clicks Safely**: Keep link or button text descriptions clear and structural (such as "Resume", "CV", "Contact", "Let's Talk"). The global tracking listener in `analytics.ts` matches lowercased content or attributes to register download or form events smoothly without throwing blocking exceptions.
3. **Avoid Blocking Fetch Requests**: Always ensure analytics requests are fired using standard async fetches with `mode: "no-cors"`, `keepalive: true`, and with automatic timeouts around geolocation lookups (max 1000ms), maintaining ultra-lightweight rendering footprints.
4. **Environment Variables**: Use `import.meta.env.VITE_ANALYTICS_URL` for configuring the target Apps Script URL. Always ensure the fallback Google Apps Script URL matches the correct production URL.
5. **Scroll Progress Tracking**: If introducing new deep article layouts or document detail view templates, integrate `useScrollTracker("<unique-page-id>")` from `src/hooks/useScrollTracker` to preserve readers' engagement tracking at standard 25%, 50%, 75%, and 100% scrolling depth benchmarks.

*This file acts as your automated workspace guide. Follow these rules, and you will produce magnificent, production-ready iterations on this portfolio!*
