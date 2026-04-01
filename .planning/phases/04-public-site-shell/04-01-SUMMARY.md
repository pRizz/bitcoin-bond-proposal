---
phase: 04-public-site-shell
plan: "01"
subsystem: ui
tags: [solidstart, shell, theme, editorial, tailwind]
requires: []
provides:
  - SolidStart app shell
  - Global theme layer
  - Shared editorial component system
affects: [homepage, methodology, catalog, state-detail]
tech-stack:
  added: [@solidjs/start, @solidjs/router, @solidjs/meta, vinxi, tailwindcss, @tailwindcss/vite, clsx, tailwind-merge, class-variance-authority, vite]
  patterns: [static prerender shell, editorial primitives, tokenized theme]
key-files:
  created:
    - app.config.ts
    - src/app.tsx
    - src/entry-client.tsx
    - src/entry-server.tsx
    - src/env.d.ts
    - src/styles/app.css
    - src/components/editorial/*
    - src/lib/site/*
  modified:
    - package.json
    - bun.lock
    - tsconfig.json
    - .gitignore
key-decisions:
  - "Used SolidStart with explicit prerender routes for a static-first public shell."
  - "Encoded the design system in theme tokens and shared editorial primitives before route composition."
patterns-established:
  - "Routes build on a shared editorial component system instead of bespoke page chrome."
  - "The site shell uses a restrained editorial-financial visual language, not dashboard or crypto-hype defaults."
requirements-completed: [SITE-01, SITE-02]
duration: 12 min
completed: 2026-04-01
---

# Phase 4 Plan 01: Public shell foundation Summary

**SolidStart public shell with static prerendering, theme tokens, and shared editorial primitives**

## Performance

- **Duration:** 12 min
- **Started:** 2026-04-01T12:00:00Z
- **Completed:** 2026-04-01T12:12:00Z
- **Tasks:** 3
- **Files modified:** 20

## Accomplishments
- Bootstrapped the repo into a real SolidStart public app with prerendered routes.
- Added a dedicated theme layer tuned for editorial-financial seriousness.
- Created shared editorial primitives and site utilities for the Phase 4 routes.

## Task Commits

Each task was committed atomically:

1. **Task 1: Bootstrap the SolidStart site shell** - `75c7874` (feat)
2. **Task 2: Create the dedicated theme layer and global shell styles** - `8c76453` (feat)
3. **Task 3: Add shared editorial primitives for Phase 4 routes** - `ed56a5d` (feat)

**Plan metadata:** Pending

## Files Created/Modified
- `app.config.ts` - Static prerender config and Tailwind Vite integration.
- `src/app.tsx` - Root app shell with persistent header/footer chrome.
- `src/entry-client.tsx` / `src/entry-server.tsx` - SolidStart runtime entrypoints.
- `src/styles/app.css` - Tokenized global theme and layout styles.
- `src/components/editorial/*` - Shared editorial primitives used by all Phase 4 routes.
- `src/lib/site/*` - Navigation, SEO, markdown, and data helpers for the public shell.

## Decisions Made
- Chose a static-first SolidStart shell so the site can prerender known packet and registry routes.
- Built the shared editorial component set before route work so Phase 4 pages would feel like one product, not three separate demos.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Corrected the client entry export shape**
- **Found during:** Task 1 (Bootstrap the SolidStart site shell)
- **Issue:** The initial client entry shape produced a build warning about a missing default export from `src/entry-client.tsx`.
- **Fix:** Exported the `mount()` result as the default client entry.
- **Files modified:** `src/entry-client.tsx`
- **Verification:** `bunx tsc --noEmit` and `bun run build` passed cleanly after the correction.
- **Committed in:** `75c7874` (part of Task 1 work)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** The fix removed build noise without changing the planned architecture.

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- The route layer can now focus on actual content presentation instead of shell bootstrap.
- Shared components and theme tokens are in place for the homepage, methodology, catalog, and detail routes.

---
*Phase: 04-public-site-shell*
*Completed: 2026-04-01*
