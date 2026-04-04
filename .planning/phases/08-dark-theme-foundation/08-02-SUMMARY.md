---
phase: 08-dark-theme-foundation
plan: "02"
subsystem: ui
tags: [dark-mode, components, shell, accents, blockers]
requires:
  - phase: 08-01
    provides: dark token layer and shell foundation
provides:
  - dark shared editorial components
  - restrained orange emphasis across shared surfaces
  - structurally dark route output
affects: [homepage, methodology, packet, explainer, catalog, state-detail]
tech-stack:
  added: []
  patterns: [shared component dark adoption, blocker-only route fixes]
key-files:
  created: []
  modified:
    - src/components/editorial/ActionLink.tsx
    - src/components/editorial/Badge.tsx
    - src/components/editorial/SiteHeader.tsx
    - src/components/editorial/SiteFooter.tsx
    - src/components/editorial/PageSection.tsx
    - src/components/editorial/MarkdownContent.tsx
    - src/components/editorial/ProofStrip.tsx
    - src/components/editorial/StateCard.tsx
    - src/components/editorial/RegistrySnapshot.tsx
    - src/components/editorial/BondReservePathway.tsx
    - src/styles/app.css
    - src/routes/(site)/index.tsx
    - src/routes/(site)/packet/illinois.tsx
    - src/routes/(site)/states/[slug].tsx
key-decisions:
  - "Shared components should carry the dark language far enough that every route is structurally dark before Phase 9 polish."
  - "Route edits in this phase are allowed only to remove hardcoded light-surface blockers."
patterns-established:
  - "Header, footer, cards, chips, badges, and proof surfaces now consume the dark token system consistently."
  - "Shared long-form content surfaces use dark prose treatment rather than the prior light prose defaults."
requirements-completed: [THEME-01, THEME-02]
duration: 9 min
completed: 2026-04-04
---

# Phase 8 Plan 02: Shared component adoption Summary

**Dark system adopted across shared editorial components, with blocker-only route fixes to eliminate lingering light surfaces**

## Performance

- **Duration:** 9 min
- **Started:** 2026-04-04T00:19:00Z
- **Completed:** 2026-04-04T00:28:00Z
- **Tasks:** 3
- **Files modified:** 14

## Accomplishments
- Applied the dark system to shared shell chrome, reading surfaces, interactive elements, proof components, and shared cards.
- Introduced restrained orange emphasis across CTAs, badges, nav states, and proof chips without letting the shell drift into hype styling.
- Removed a few hardcoded light-surface blockers in the homepage, packet page, and state-detail page so prerendered output is structurally dark across routes.

## Task Commits

Each task was committed atomically:

1. **Task 1: Adopt the dark system in shared shell components** - `7f83bf3` (feat)
2. **Task 2: Apply restrained Bitcoin-orange emphasis to shared UI elements** - `afa16f8` (feat)
3. **Task 3: Carry the dark system into shared proof and pathway components** - `57af2b8` (feat)

**Plan metadata:** Pending

## Files Created/Modified
- `src/components/editorial/SiteHeader.tsx` / `src/components/editorial/SiteFooter.tsx` - Shared shell chrome now uses dark surfaces and restrained active-state emphasis.
- `src/components/editorial/PageSection.tsx` / `src/components/editorial/MarkdownContent.tsx` - Shared reading surfaces now support the dark system.
- `src/components/editorial/ActionLink.tsx` / `src/components/editorial/Badge.tsx` / `src/components/editorial/ProofStrip.tsx` / `src/components/editorial/StateCard.tsx` - Shared controls and informational surfaces now use the new accent behavior.
- `src/components/editorial/RegistrySnapshot.tsx` / `src/components/editorial/BondReservePathway.tsx` - Shared proof and pathway components now match the dark foundation.
- `src/routes/(site)/index.tsx`, `src/routes/(site)/packet/illinois.tsx`, and `src/routes/(site)/states/[slug].tsx` - Minimal blocker fixes for hardcoded light route surfaces.

## Decisions Made
- Treated Markdown content rendering as a shared-surface concern, not route-level polish.
- Limited route edits to obvious hardcoded light blockers that would have made the dark foundation look broken.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Shared markdown content still carried light-theme reading defaults**
- **Found during:** Task 1 (Adopt the dark system in shared shell components)
- **Issue:** Long-form content across methodology, packet, explainer, and state pages would have kept light-theme prose defaults even after the shell turned dark.
- **Fix:** Updated `src/components/editorial/MarkdownContent.tsx` as part of the shared-shell pass.
- **Files modified:** `src/components/editorial/MarkdownContent.tsx`
- **Verification:** Built output showed dark long-form content surfaces with preserved hierarchy.
- **Committed in:** `7f83bf3`

**2. [Rule 3 - Blocking] A few route files still hardcoded light-surface fills**
- **Found during:** Task 3 (Carry the dark system into shared proof and pathway components)
- **Issue:** The homepage hero text, packet PDF links, and state-detail callout boxes would have remained visibly light against the new shell.
- **Fix:** Applied minimal blocker-only route edits in `src/routes/(site)/index.tsx`, `src/routes/(site)/packet/illinois.tsx`, and `src/routes/(site)/states/[slug].tsx`.
- **Files modified:** those three route files
- **Verification:** Prerendered output for homepage, packet, methodology, and states pages is structurally dark.
- **Committed in:** `57af2b8`

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 9 can now focus on route-specific readability, contrast, and mobile regression QA instead of shared token or component groundwork.

---
*Phase: 08-dark-theme-foundation*
*Completed: 2026-04-04*
