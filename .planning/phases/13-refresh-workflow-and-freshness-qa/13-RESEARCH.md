# Phase 13: Refresh Workflow and Freshness QA - Research

**Researched:** 2026-04-11
**Status:** Ready for planning

## Objective

Research how to add a repo-owned refresh queue plus shared freshness cues across the
public registry surfaces without drifting into live-tracker semantics, new publication
scope, or a maintainer dashboard.

## Current Repo State

### What already exists

- `scripts/compile-content.ts` writes `generated/content-graph.json` with:
  - `statusAsOf`
  - `lastReviewed`
  - `statusAgeDays`
  - `reviewAgeDays`
- `generated/refresh/README.md` already names the non-canonical home for refresh-only
  artifacts.
- `src/lib/site/content.ts` already centralizes published-state and registry-summary
  selectors for the public routes.
- `src/components/editorial/StateCard.tsx` is reused by the catalog, cluster, and
  comparison surfaces.
- `/states/[slug]` already exposes exact freshness dates in the sidebar, but grouped
  routes do not yet surface freshness consistently.

### What Phase 13 still needs

- one shared rule set for when a published record is current, aging, or due for review
- a generated refresh queue/report under `generated/refresh/`
- public freshness summaries on catalog and grouped routes
- explicit freshness cue copy on the state-detail surface that aligns with the maintainer
  queue

## Architecture Implications

### 1. Keep refresh logic in a pure shared helper

The queue and the public routes both need the same thresholds. The cleanest shape is a
small pure helper module under `src/lib/site/` that:

- classifies a state record into current / review soon / review due
- summarizes freshness counts across the registry
- builds a queue model for generated artifacts

Then `src/lib/site/content.ts` can stay the access layer that re-exports those derived
models.

### 2. Generate queue artifacts from the compiled graph

Phase 10 already made the content graph the single derivation point for freshness data.
Phase 13 should keep that rule:

- run `bun run compile:content`
- run a new `bun run refresh:queue`
- write queue outputs under `generated/refresh/`

This keeps the queue reproducible and auditable in git.

### 3. Use route-level summaries plus exact dates

The public requirement is reader-facing trust, not maintainer workflow exposure. That
means:

- route-level freshness summary panels on `/states`, `/states/clusters`, and
  `/states/compare`
- exact `status as of` and `last reviewed` dates on shared state cards
- a short freshness explanation panel on `/states/[slug]`

This is enough to make freshness visible without inventing a scoreboard or alarm UI.

## Threshold Guidance

Active records should refresh sooner than terminal ones:

- active statuses: `introduced`, `advanced`, `approved`
- terminal statuses: `enacted`, `failed`

Recommended rule shape:

- active records:
  - review soon at 14 days
  - review due at 30 days
  - active-status snapshot review soon at 21 days
  - active-status snapshot review due at 45 days
- terminal records:
  - review soon at 21 days
  - review due at 45 days
  - status age alone should not escalate priority

This keeps the policy legible: older active legislative posture is the real refresh risk.

## Recommended Phase Split

### Plan 13-01

**Repo-owned refresh queue workflow**

Owns:

- shared freshness / queue helper module
- unit coverage for thresholds and queue behavior
- `refresh:queue` Bun script
- generated queue artifacts under `generated/refresh/`
- pre-commit integration so artifacts regenerate with the compiled graph

### Plan 13-02

**Cross-surface freshness cues**

Owns:

- shared freshness summary wiring in `src/lib/site/content.ts`
- exact freshness dates on shared state cards
- route-level freshness summary panels on `/states`, `/states/clusters`, and
  `/states/compare`
- detail-page freshness explanation panel on `/states/[slug]`

## Risks and Gotchas

- Queue thresholds can become too clever. Keep them explicit and easy to explain in docs
  and tests.
- Public copy must not imply live tracking. Every cue should reinforce dated snapshots,
  not current-feed semantics.
- State-card changes hit the catalog, cluster, and comparison routes together, so route
  QA must cover all three surfaces.
- Refresh queue outputs should not quietly drift out of date; regeneration belongs in the
  Bun workflow rather than a manual side path.

## Sources

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/phases/10-coverage-expansion-contract-and-data-shape/10-CONTEXT.md`
- `.planning/phases/10-coverage-expansion-contract-and-data-shape/10-02-SUMMARY.md`
- `.planning/phases/11-broader-national-publication-batch/11-02-SUMMARY.md`
- `.planning/phases/12-cluster-and-comparison-surfaces/12-01-SUMMARY.md`
- `.planning/phases/12-cluster-and-comparison-surfaces/12-02-SUMMARY.md`
- `content/data/README.md`
- `content/data/state-registry-manifest.README.md`
- `generated/refresh/README.md`
- `scripts/compile-content.ts`
- `src/lib/site/content.ts`
- `src/components/editorial/StateCard.tsx`
- `src/routes/(site)/states/index.tsx`
- `src/routes/(site)/states/clusters.tsx`
- `src/routes/(site)/states/compare.tsx`
- `src/routes/(site)/states/[slug].tsx`
