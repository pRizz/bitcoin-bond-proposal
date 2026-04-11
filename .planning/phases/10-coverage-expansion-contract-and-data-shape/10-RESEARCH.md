# Phase 10: Coverage Expansion Contract and Data Shape - Research

**Researched:** 2026-04-11
**Status:** Ready for planning

## Objective

Research how to extend the canonical registry contract and generated content graph so
Phase 10 can support broader grouping and refresh workflows without drifting into
publication-batch work or comparison-page work.

## Current Repo State

### Canonical data surfaces already in place

- `content/data/state-registry-manifest.json` defines a 50-state manifest with:
  - `state`
  - `slug`
  - `registryStatus`
  - `proposalFocus`
  - `shortNote`
  - `editorialPriority`
- `content/data/proposal-taxonomy.json` defines controlled values for `proposalKind` and
  `proposalSubtype`.
- `content/states/*.md` holds the publishable state entries with source, freshness, and
  classification frontmatter.

### Compile and validation path

- `src/lib/content/schema.ts` is the current canonical contract for manifest data and
  state-entry frontmatter.
- `scripts/validate-content.ts` validates the manifest, canonical docs, and published
  state entries against that contract.
- `scripts/compile-content.ts` emits `generated/content-graph.json` as the runtime read
  model for the site.

### Runtime consumer path

- `src/lib/site/content.ts` exposes shared selectors such as `getPublishedStates()` and
  `getRegistryStats()`.
- `src/routes/(site)/states/index.tsx` currently filters/sorts only the published state
  subset and owns simple focus/sort UI controls.
- `src/components/editorial/StateCard.tsx` renders the current state-list card shell and
  already surfaces status, proposal kind, significance, and `lastReviewed`.

## Phase 10 Implications

### What this phase should do

- Strengthen the canonical data contract for grouping and refresh support.
- Derive comparison-ready and freshness-ready data in the compile layer.
- Expose those derived slices through shared site loaders.
- Keep UI changes thin and in service of the stronger data shape.

### What this phase should not do

- Publish the next state batch in depth — that is Phase 11.
- Build comparison or cluster pages as full experiences — that is Phase 12.
- Implement refresh queue execution or cross-surface freshness QA — that is Phase 13.
- Introduce a live tracker or auto-publish path.

## Key Technical Decisions Suggested by the Existing Code

### 1. Extend the manifest contract before touching routes

The current manifest already carries registry-wide descriptive metadata. Phase 10 should
keep that pattern and extend it there rather than teaching `states/index.tsx` to infer
grouping or refresh signals on its own.

Planning implication:
- Start with `src/lib/content/schema.ts`
- Then update `content/data/state-registry-manifest.json`
- Keep route components as consumers, not inventors, of grouping logic

### 2. Derive richer groupings in the compile layer

The current generated graph already merges manifest data into published state entries.
That makes `scripts/compile-content.ts` the right place to emit:
- status-group-ready fields
- region/group-ready fields
- freshness or refresh-needed signals
- pre-grouped collections if that proves simpler for route consumers

Planning implication:
- Phase 10 should likely split into:
  - canonical schema/manifest/data-shape work
  - compile/runtime-loader propagation work

### 3. Preserve the published-vs-refresh boundary structurally

The repo already distinguishes authored content from generated artifacts. Phase 10 should
do the same for refresh workflow support:
- published canonical state content stays under `content/`
- refresh workflow artifacts should live outside canonical published content
- build/validation should be explicit about what is canonical and what is queued/reporting

Planning implication:
- a small refresh artifact contract or directory convention belongs in this phase
- automatic rewriting of published state Markdown does not

### 4. Keep the states index as the first consumer, not the design target

`src/routes/(site)/states/index.tsx` is currently the thin registry surface. It is useful
as the first consumer of the stronger read model, but Phase 10 should not overinvest in
new UI here. The route should validate the contract, not become a proto-dashboard.

Planning implication:
- minimal route updates are enough if shared loader helpers expose the new data cleanly

## Risks and Gotchas

- If manifest and state-frontmatter changes drift apart, `validate-content` and
  `compile-content` will disagree and later publication work will become fragile.
- If grouping logic is split between compile code and route code, Phase 12 comparison
  surfaces will inherit duplicate rules and inconsistent behavior.
- If refresh artifacts land inside `content/` without a strong boundary, the project may
  start treating queued work as published truth.
- If Phase 10 tries to solve publication and comparison at once, the plan will sprawl
  beyond the roadmap goal.

## Recommended Plan Shape

Two plans remain the cleanest split for this phase.

### Plan 10-01

**Canonical schema and manifest contract**

Focus:
- extend canonical registry schemas
- define grouping/freshness-supporting fields
- document or enforce the refresh-artifact boundary

Likely files:
- `src/lib/content/schema.ts`
- `content/data/state-registry-manifest.json`
- `content/data/README.md`
- possibly small supporting content/data docs or refresh-contract scaffolding

### Plan 10-02

**Compile-path and runtime-loader propagation**

Focus:
- propagate the stronger contract through validation and compile
- expose grouped/freshness-aware selectors from `src/lib/site/content.ts`
- keep any states-index changes thin and consumer-oriented

Likely files:
- `scripts/validate-content.ts`
- `scripts/compile-content.ts`
- `src/lib/site/content.ts`
- `src/routes/(site)/states/index.tsx`
- possibly `src/components/editorial/StateCard.tsx` if a small freshness cue is needed to
  validate the new read model

## Sources

- `.planning/PROJECT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/ROADMAP.md`
- `.planning/phases/10-coverage-expansion-contract-and-data-shape/10-CONTEXT.md`
- `content/data/README.md`
- `content/data/state-registry-manifest.json`
- `content/data/proposal-taxonomy.json`
- `src/lib/content/schema.ts`
- `scripts/validate-content.ts`
- `scripts/compile-content.ts`
- `src/lib/site/content.ts`
- `src/routes/(site)/states/index.tsx`
- `src/components/editorial/StateCard.tsx`

---
*Phase: 10-coverage-expansion-contract-and-data-shape*
*Research completed: 2026-04-11*
