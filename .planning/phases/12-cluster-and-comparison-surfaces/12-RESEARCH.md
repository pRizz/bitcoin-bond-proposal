# Phase 12: Cluster and Comparison Surfaces - Research

**Researched:** 2026-04-11
**Status:** Ready for planning

## Objective

Research how to turn the ten-state published registry into clearer cluster and comparison
reading paths without drifting into dashboard UI, new publication work, or refresh-queue
work.

## Current Repo State

### What already exists

- `/states` already exposes:
  - proposal type filtering
  - sort modes
  - grouped mix chips for focus, region, and legislative status
  - calm `Record footing` confidence/completeness cues on every card
- `/states/[slug]` already exposes:
  - canonical detail content
  - record footing in the sidebar
  - registry note and financing-case support panel
- `src/lib/site/content.ts` already provides:
  - grouped buckets by region, proposal focus, and legislative status
  - `StatesIndexModel`
  - `getStateBySlug()`
  - confidence-cue derivation

### What Phase 12 still needs

- reader-facing grouped views by status, type, and region
- comparison surfaces that explain meaningful differences across the current ten-state set
- clear links back to the canonical state-detail pages

## Architecture Implications

### 1. Keep new reading paths under `/states`

The cleanest fit is to add dedicated routes under the registry subtree, such as:
- `src/routes/(site)/states/clusters.tsx`
- `src/routes/(site)/states/compare.tsx`

This preserves `/states` as the gateway and keeps the new surfaces semantically tied to
the registry.

### 2. Derive new route models in `src/lib/site/content.ts`

Phase 10 and Phase 11 already pushed grouping and confidence logic into the shared site
model. Phase 12 should continue that pattern:
- add cluster model helpers
- add comparison model helpers
- test them in `src/lib/site/content.test.ts`

That avoids route-local recomputation and keeps future refresh work compatible with the
same data path.

### 3. Reuse the existing editorial shell

Current reusable pieces:
- `PageSection`
- `StateCard`
- existing registry copy tone from `/states`

Planning implication:
- new routes should likely reuse those pieces plus at most a small new editorial
  component for comparison panels or cluster summaries

## Current Data Shapes That Matter

The current ten-state batch gives enough signal for meaningful comparisons:
- enacted reserve benchmark: Texas
- advanced reserve bills: Missouri, Oklahoma, Michigan
- early-stage reserve bills: Illinois, Maryland, South Carolina, Arizona as failed signal
- bond-side authority action: New Hampshire
- reserve-plus-bond crossover bill: North Carolina

That suggests a strong comparison frame around:
- enacted versus early-stage reserve posture
- reserve-only versus reserve-plus-bond versus authority-action bond signal
- regional clusters and what kinds of records each region currently contributes

## Recommended Phase Split

### Plan 12-01

**Cluster reading paths**

Owns:
- shared cluster route model in `src/lib/site/content.ts`
- tests for cluster/group models
- `/states/clusters` route
- light cross-linking from `/states` into the cluster route

### Plan 12-02

**Comparison storytelling surfaces**

Owns:
- shared comparison route model in `src/lib/site/content.ts`
- tests for comparison model or key selector behavior
- `/states/compare` route
- comparison panels/sections and cross-links back to state detail pages

This split keeps browse clusters and narrative comparisons separate while still building
on the same shared registry model.

## Risks and Gotchas

- It is easy to turn clusters into giant all-state tables; Phase 12 should prefer grouped
  sections plus cards.
- It is easy to let comparison text become uncited opinion; the route should keep its
  examples anchored in the existing ten canonical records.
- It is easy to duplicate grouping logic between `/states`, `/states/clusters`, and
  `/states/compare`; keep the logic centralized in `src/lib/site/content.ts`.
- Mobile layout risk is real if too many chips, cards, and comparison columns stack
  poorly; route sections should stay simple.

## Sources

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/phases/11-broader-national-publication-batch/11-01-SUMMARY.md`
- `.planning/phases/11-broader-national-publication-batch/11-02-SUMMARY.md`
- `src/lib/site/content.ts`
- `src/routes/(site)/states/index.tsx`
- `src/routes/(site)/states/[slug].tsx`
- `src/components/editorial/StateCard.tsx`
- `src/components/editorial/PageSection.tsx`

---
*Phase: 12-cluster-and-comparison-surfaces*
*Research completed: 2026-04-11*
