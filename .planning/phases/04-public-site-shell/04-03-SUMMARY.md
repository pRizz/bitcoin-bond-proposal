---
phase: 04-public-site-shell
plan: "03"
subsystem: ui
tags: [catalog, state-detail, registry, record-type, generated-content]
requires:
  - phase: 04-01
    provides: SolidStart shell, theme layer, editorial primitives
provides:
  - Catalog route
  - State detail route
  - Generated-content-backed route integration
affects: [public-shell, registry-discovery, phase-5]
tech-stack:
  added: []
  patterns: [generated-graph-driven routes, raw markdown rendering with frontmatter stripping]
key-files:
  created:
    - src/routes/(site)/states/index.tsx
    - src/routes/(site)/states/[slug].tsx
  modified:
    - src/lib/site/raw-content.ts
    - src/lib/site/content.ts
    - scripts/compile-content.ts
    - generated/content-graph.json
key-decisions:
  - "State detail pages must preserve honest record typing, especially for the New Hampshire authority-action entry."
  - "Generated registry data should carry enough state metadata to support the routes directly."
patterns-established:
  - "Catalog cards are medium-density and metadata-rich without becoming spreadsheet clutter."
  - "State detail routes render canonical markdown bodies only after frontmatter is stripped from raw imports."
requirements-completed: [SITE-03, SITE-04]
duration: 8 min
completed: 2026-04-01
---

# Phase 4 Plan 03: Catalog and state detail Summary

**Registry catalog and state-detail routes backed by generated content with explicit record-type honesty**

## Performance

- **Duration:** 8 min
- **Started:** 2026-04-01T12:18:00Z
- **Completed:** 2026-04-01T12:26:00Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments
- Built the catalog route with the first published registry batch, density controls, and basic filters/sorts.
- Built the dynamic state detail route with record-type visibility and narrative-first structure.
- Wired the public routes to richer generated registry data and fixed raw markdown rendering to avoid frontmatter leaks.

## Task Commits

Each task was committed atomically:

1. **Task 1: Build the registry catalog route** - `e5ec573` (feat)
2. **Task 2: Build the state detail route with honest record typing** - `3e14a6e` (feat)
3. **Task 3: Wire generated registry data into public routes** - `1bc5c0e` (feat)

**Plan metadata:** Pending

## Files Created/Modified
- `src/routes/(site)/states/index.tsx` - Public registry catalog route.
- `src/routes/(site)/states/[slug].tsx` - Public state detail route.
- `src/lib/site/raw-content.ts` - Strips frontmatter before markdown rendering.
- `src/lib/site/content.ts` - Exposes richer generated state metadata to routes.
- `scripts/compile-content.ts` - Enriches generated state data for the public shell.
- `generated/content-graph.json` - Regenerated with route-facing state metadata.

## Decisions Made
- The catalog should stay medium-density and reader-friendly rather than imitating a terminal or tracker grid.
- New Hampshire must remain visibly typed as an authority action, not flattened into a normal bill record.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Stripped markdown frontmatter before rendering public methodology and state pages**
- **Found during:** Task 2 (Build the state detail route with honest record typing)
- **Issue:** The initial route implementation rendered raw markdown files directly, which surfaced YAML frontmatter on public pages and undermined the shell’s credibility.
- **Fix:** Added frontmatter stripping in `src/lib/site/raw-content.ts` and updated the state detail route to use the cleaned body plus a human-readable record-type label.
- **Files modified:** `src/lib/site/raw-content.ts`, `src/routes/(site)/states/[slug].tsx`
- **Verification:** `bunx tsc --noEmit`, `bun run build`, and live preview fetches confirmed the frontmatter leak disappeared.
- **Committed in:** `44d985f` (fix)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** The fix was necessary for public-shell correctness and did not change the route architecture.

## Issues Encountered
None

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- The public shell can now browse the registry and render state detail pages cleanly.
- Phase 5 can focus on polish and explainers instead of compensating for missing route architecture.

---
*Phase: 04-public-site-shell*
*Completed: 2026-04-01*
