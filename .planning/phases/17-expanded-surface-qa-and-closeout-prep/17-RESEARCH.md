---
generated_by: gsd-phase-researcher
lifecycle_mode: yolo
phase_lifecycle_id: 17-2026-06-02T21-06-55
generated_at: 2026-06-02T21:07:03Z
---
# Phase 17: Expanded Surface QA and Closeout Prep - Research

**Researched:** 2026-06-02 [VERIFIED: current_date]  
**Domain:** SolidStart registry-surface QA, generated content artifacts, browser closeout evidence [VERIFIED: .planning/phases/17-expanded-surface-qa-and-closeout-prep/17-CONTEXT.md]  
**Confidence:** HIGH [VERIFIED: codebase grep, targeted tests, package registry probes, and upstream phase verification]

<user_constraints>
## User Constraints (from CONTEXT.md)

**Source:** `.planning/phases/17-expanded-surface-qa-and-closeout-prep/17-CONTEXT.md` [VERIFIED: required initial read]

### Locked Decisions

### Catalog scanability

- **D-01:** Preserve the existing medium-density `/states` catalog pattern and shared `StateCard` component. The QA pass should protect confidence, completeness, freshness, status, proposal-type, region, and drill-down cues instead of redesigning the catalog.
- **D-02:** Prefer derived counts and generated model data over hard-coded public-count copy wherever the route already has access to `getStatesIndexModel()` or `getRegistryStats()`.
- **D-03:** Treat stale count copy, missing generated data, broken links, awkward mobile wrapping, and unclear empty/filter states as Phase 17 defects.

### Cluster and comparison routes

- **D-04:** Keep `/states/clusters` as an editorial grouping surface by legislative posture, proposal focus, and region. Update grouping copy only where the expanded seventeen-state mix makes existing language stale or misleading.
- **D-05:** Keep `/states/compare` narrative and selective. Do not turn it into a ranking table or full matrix in this phase.
- **D-06:** Every card, supporting-state link, and cross-route call to action on cluster and comparison routes must route to the canonical state-detail path or the known registry sibling route.

### State-detail consistency

- **D-07:** New and existing detail pages should continue through the canonical content graph path and expose the same provenance, status, record footing, freshness, and comparison context affordances.
- **D-08:** Detail-page work should be consistency-focused: fix missing context or confusing surface copy, but avoid creating state-specific route exceptions beyond the existing Illinois packet distinction.

### Verification and closeout evidence

- **D-09:** Verification must cover content validation, content compilation, refresh/candidate generation, TypeScript, production build, tests, and targeted browser checks across catalog, cluster, comparison, and representative detail pages.
- **D-10:** Closeout records should name the final v1.3 published count, shipped states added during the milestone, the current empty deferral/candidate outcome, and the verification evidence. The record should be suitable for milestone archive/audit use.
- **D-11:** Browser QA should be targeted and evidence-driven, not a broad visual redesign exercise. Use representative desktop and mobile checks that prove pages render, key links work, and text remains readable without overlap.

### the agent's Discretion

- Choose the smallest route or model copy edits needed to remove stale assumptions.
- Decide the exact browser viewport set and representative state detail pages, as long as newly added Phase 16 states and at least one older benchmark state are covered.
- Add focused tests where pure model behavior or link assumptions need protection; otherwise rely on existing tests plus browser/build verification.

### Deferred Ideas (OUT OF SCOPE)

- Advanced filtering or matrix-style comparison remains future requirement SITE-13, not Phase 17 scope.
- Selective `mystic-ui` or broad theme upgrades remain future requirement UI-01/backlog Phase 999.1, not Phase 17 scope.
- Additional state publication beyond the current seventeen-state registry belongs in a future coverage phase unless a blocking data defect is discovered.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SITE-10 | Reader can scan the expanded state catalog without losing confidence, completeness, freshness, status, proposal-type, and region cues. [VERIFIED: .planning/REQUIREMENTS.md] | Preserve `/states`, `StateCard`, `RegistryFreshnessPanel`, derived counts, filter empty state, and browser desktop/mobile checks. [VERIFIED: src/routes/(site)/states/index.tsx, src/components/editorial/StateCard.tsx, src/components/editorial/RegistryFreshnessPanel.tsx] |
| SITE-11 | Reader can use cluster and comparison routes with the expanded registry without stale assumptions, broken grouping, or unclear drill-down paths. [VERIFIED: .planning/REQUIREMENTS.md] | Use `buildStatesClusterModelFromIndexModel()` and `buildStatesComparisonModelFromIndexModel()` as the protected model layer; test stale copy and canonical hrefs. [VERIFIED: src/lib/site/states-surfaces.ts, src/lib/site/content.test.ts] |
| SITE-12 | Reader can move from any expanded catalog, cluster, or comparison entry into the canonical state-detail page and see consistent provenance and freshness context. [VERIFIED: .planning/REQUIREMENTS.md] | Validate `/states/${slug}` links, `getStateBySlug()`, `readStateBody()`, state-detail side rail, and representative details for South Dakota, Wyoming, and an older benchmark. [VERIFIED: src/lib/site/content.ts, src/routes/(site)/states/[slug].tsx] |
| QA-01 | Maintainer verification proves content validation, content compilation, refresh/candidate generation, TypeScript, build, tests, and targeted browser checks pass after the expanded batch. [VERIFIED: .planning/REQUIREMENTS.md] | Plan the exact command ladder from package scripts plus browser evidence across `/states`, `/states/clusters`, `/states/compare`, `/states/south-dakota`, `/states/wyoming`, and one older benchmark. [VERIFIED: package.json, 17-CONTEXT.md, Phase 16 verification] |
| QA-02 | Milestone closeout records the final newly published state count, shipped states, deferred candidates, and verification evidence. [VERIFIED: .planning/REQUIREMENTS.md] | Closeout should record 17 final public states, seven v1.3 additions, zero candidate rows, zero first-publication candidates, and the verification evidence set. [VERIFIED: Phase 15 summaries, Phase 16 verification, generated/content-graph.json, content/data/state-candidate-intake.json, generated/refresh/state-priority-queue.json] |
</phase_requirements>

## Summary

Phase 17 is a closeout QA phase, not a publication or UI-library phase. [VERIFIED: 17-CONTEXT.md] The existing stack already exposes the expanded registry through generated graph adapters, shared model builders, `StateCard`, and `RegistryFreshnessPanel`, so the planner should focus tasks on stale copy cleanup, model/link consistency, targeted test additions, browser evidence, and closeout records. [VERIFIED: src/lib/site/content.ts, src/lib/site/states-surfaces.ts, src/components/editorial/StateCard.tsx, src/components/editorial/RegistryFreshnessPanel.tsx]

The current generated graph has 17 published state entries, including South Dakota and Wyoming, and the candidate intake is empty. [VERIFIED: `jq ... generated/content-graph.json`; `jq ... content/data/state-candidate-intake.json`] The priority queue reports `candidateCount: 0` and `firstPublicationCandidateCount: 0`, while the published refresh queue reports 11 due entries that remain visible maintainer work but are not new publication scope for Phase 17. [VERIFIED: `jq ... generated/refresh/state-priority-queue.json`; `jq ... generated/refresh/state-refresh-queue.json`]

**Primary recommendation:** Plan one focused route/model QA pass plus one closeout evidence pass; do not add new state records, advanced filtering, matrix comparison UI, new component libraries, or broad theme work. [VERIFIED: 17-CONTEXT.md, .planning/REQUIREMENTS.md]

## Project Constraints (from AGENTS.md)

- Read root `AGENTS.md`, `AGENTS.bright-builds.md`, `standards-overrides.md`, and relevant canonical standards before planning, implementation, review, or audit work. [VERIFIED: AGENTS.md, AGENTS.bright-builds.md, standards-overrides.md, Bright Builds standards fetched from pinned commit 05f8d7a6c9c2e157ec4f922a05273e72dab97676]
- Do not edit the Bright Builds managed block in `AGENTS.md` or the managed `AGENTS.bright-builds.md`; local exceptions belong in `standards-overrides.md`. [VERIFIED: AGENTS.md, AGENTS.bright-builds.md]
- `standards-overrides.md` currently contains only placeholder rows and no active real override. [VERIFIED: standards-overrides.md]
- Keep business logic in a functional core and imperative shell; route files should stay thin shells around pure model builders. [CITED: https://raw.githubusercontent.com/bright-builds-llc/bright-builds-rules/05f8d7a6c9c2e157ec4f922a05273e72dab97676/standards/core/architecture.md]
- Parse boundary data into domain types, make illegal states unrepresentable where practical, use early returns, and keep nullable internal names visibly `maybe...`. [CITED: Bright Builds architecture/code-shape/typescript-javascript standards at pinned commit]
- In Bun-friendly TypeScript repositories, do not add new Python scripts for repo-owned automation; use TypeScript or JavaScript through Bun. [CITED: Bright Builds TypeScript/JavaScript standard at pinned commit]
- Pure model and business logic must have unit tests; unit tests should cover one concern and clearly show Arrange, Act, Assert unless trivially obvious. [CITED: Bright Builds testing standard at pinned commit; VERIFIED: src/lib/site/content.test.ts, src/lib/site/candidate-priority.test.ts]
- Prefer repo-owned verification entrypoints and do not commit if relevant verification fails. [CITED: Bright Builds verification standard at pinned commit]
- Hook-managed verification is active: `core.hooksPath` is `.githooks`, and `.githooks/pre-commit` runs `bun run precommit`. [VERIFIED: `git config --get core.hooksPath`; `.githooks/pre-commit`]
- `bun run precommit` runs formatting check, lint, content validation, content compilation, refresh queue generation, PDF build, and PDF artifact checks. [VERIFIED: scripts/precommit.ts]
- Session lesson review found one relevant lesson: when guardrail phases touch tooling, do not assume precommit scope should stay unchanged. [VERIFIED: .codex/tasks/lessons.md]
- No project-local skills were found under `.claude/skills` or `.agents/skills`. [VERIFIED: `test -d .claude/skills ...`; `test -d .agents/skills ...`]

## Standard Stack

### Core

| Library/Tool | Local Version | Registry Current | Purpose | Why Standard |
|--------------|---------------|------------------|---------|--------------|
| Bun | 1.3.9 | package manager declares `bun@1.3.9` | Script runner, tests, package manager. | Existing package manager and script surface. [VERIFIED: package.json; `bun --version`] |
| SolidStart / Vinxi | `@solidjs/start` 1.3.2, `vinxi` 0.5.11 | `@solidjs/start` 1.3.2, `vinxi` 0.5.11 | Route rendering, dev server, production build. | Existing webapp framework; Phase 17 should not migrate frameworks. [VERIFIED: node_modules package versions; `npm view @solidjs/start`; `npm view vinxi`; package.json] |
| SolidJS router/meta | `solid-js` 1.9.12, `@solidjs/router` 0.16.1, `@solidjs/meta` 0.29.4 | `solid-js` 1.9.13, router 0.16.1, meta 0.29.4 | `A`, preload routing, page titles, meta descriptions. | Existing route/link pattern used by `ActionLink` and `StateCard`. [VERIFIED: node_modules package versions; npm view commands; src/components/editorial/ActionLink.tsx] |
| Tailwind CSS | `tailwindcss` 4.2.2, `@tailwindcss/vite` 4.2.2 | 4.3.0 for both packages | Existing utility styling and responsive behavior. | Phase 17 should adjust only focused wrapping/readability defects and avoid broad theme/library changes. [VERIFIED: node_modules package versions; npm view commands; 17-CONTEXT.md] |
| Zod | 4.3.6 | 4.4.3 | Content, manifest, candidate, date, slug, and source URL parsing. | Existing parse-at-boundary enforcement for content trust contracts. [VERIFIED: src/lib/content/schema.ts; node_modules zod version; `npm view zod`] |
| Markdown-it | 14.1.1 | 14.2.0 | Markdown body rendering for detail and packet routes. | Existing renderer has `html: false` and base-path link rewriting. [VERIFIED: src/lib/site/markdown.ts; node_modules markdown-it version; `npm view markdown-it`] |

### Supporting

| Library/Tool | Local Version | Registry Current | Purpose | When to Use |
|--------------|---------------|------------------|---------|-------------|
| Playwright | 1.59.0 local CLI | 1.60.0 | Browser QA and PDF build support. | Use for targeted screenshots/click checks if the Browser plugin is unavailable or if scripted proof is useful. [VERIFIED: `bunx playwright --version`; node_modules playwright version; `npm view playwright`; scripts/build-pdf.ts] |
| TypeScript | 6.0.2 | 6.0.3 | Static type checking. | Run `bunx tsc --noEmit` in verification. [VERIFIED: `bunx tsc --version`; node_modules typescript version; `npm view typescript`] |
| Biome | 2.4.10 | 2.4.16 | Format check and lint. | Use existing `format:check` and `lint` scripts. [VERIFIED: package.json; `bunx @biomejs/biome --version`; `npm view @biomejs/biome`] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Existing `StateCard` and route copy | New card component or component library | Out of scope and contradicts D-01 and deferred UI-01/mystic-ui boundary. [VERIFIED: 17-CONTEXT.md] |
| Current narrative `/states/compare` | Full ranking table or matrix | Out of scope and contradicts D-05 plus future SITE-13 boundary. [VERIFIED: 17-CONTEXT.md, .planning/REQUIREMENTS.md] |
| Existing route/model tests plus targeted browser QA | New broad e2e harness | No Playwright config exists, and Phase 17 only needs evidence-driven checks. [VERIFIED: `rg --files` test/config scan; 17-CONTEXT.md] |

**Installation:** No new package installation is recommended for Phase 17. [VERIFIED: 17-CONTEXT.md, package.json] If dependencies are missing locally, use the existing package manager contract:

```bash
bun install
```

**Version verification performed:** `npm view @solidjs/start`, `solid-js`, `@solidjs/router`, `@solidjs/meta`, `tailwindcss`, `@tailwindcss/vite`, `zod`, `markdown-it`, `playwright`, `typescript`, `@biomejs/biome`, `vinxi`, and `vite` returned current registry versions and modified timestamps on 2026-06-02. [VERIFIED: npm registry commands]

## Architecture Patterns

### Recommended Project Structure

```text
src/routes/(site)/states/
  index.tsx       # catalog route shell, filters, sort, StateCard grid
  clusters.tsx    # cluster route shell over shared cluster model
  compare.tsx     # narrative comparison route shell over shared comparison model
  [slug].tsx      # canonical state detail route
src/lib/site/
  content.ts          # generated graph adapter and public state model helpers
  states-surfaces.ts  # pure cluster and comparison model builders
  registry-freshness.ts # freshness cues and refresh queue model
src/components/editorial/
  StateCard.tsx
  RegistryFreshnessPanel.tsx
generated/
  content-graph.json
  refresh/state-refresh-queue.{json,md}
  refresh/state-priority-queue.{json,md}
```

Structure above is the current code organization. [VERIFIED: required file reads and `rg --files`]

### Pattern 1: Generated Graph as Route Data

**What:** Public registry routes consume `generated/content-graph.json` through `src/lib/site/content.ts` rather than each route reading authored Markdown or the manifest directly. [VERIFIED: src/lib/site/content.ts, scripts/compile-content.ts]

**When to use:** Use this for every Phase 17 count, group, slug, freshness, confidence, and detail lookup. [VERIFIED: D-02, D-07 in 17-CONTEXT.md]

**Example:**

```typescript
// Source: src/routes/(site)/states/index.tsx [VERIFIED: codebase]
const statesIndexModel = getStatesIndexModel();
const publishedRecordCount = statesIndexModel.stats.publishedCount;
```

### Pattern 2: Pure Models, Thin Routes

**What:** `states-surfaces.ts` builds cluster and comparison models from `StatesIndexModel`; the routes map the resulting model to shared components. [VERIFIED: src/lib/site/states-surfaces.ts, src/routes/(site)/states/clusters.tsx, src/routes/(site)/states/compare.tsx]

**When to use:** Put link, grouping, or selected-comparison fixes in `states-surfaces.ts` when they are pure model behavior; keep route files for layout/copy only. [CITED: Bright Builds functional-core standard; VERIFIED: existing code]

**Example:**

```typescript
// Source: src/lib/site/states-surfaces.ts [VERIFIED: codebase]
return {
  ...maybeState,
  href: `/states/${maybeState.slug}`,
  badgeLabel: getProposalFocusBadgeLabel(maybeState.proposalFocus),
  badgeTone: getProposalFocusBadgeTone(maybeState.proposalFocus),
};
```

### Pattern 3: Shared Registry Affordances

**What:** `StateCard` is the common entry card for catalog, cluster, and comparison surfaces; `RegistryFreshnessPanel` is the shared freshness summary. [VERIFIED: src/routes/(site)/states/index.tsx, clusters.tsx, compare.tsx]

**When to use:** If Phase 17 finds card text wrapping, status/freshness cue, or record-footing issues shared across surfaces, fix the shared component only when the defect is component-level. [VERIFIED: D-01, D-03 in 17-CONTEXT.md]

**Example:**

```typescript
// Source: src/components/editorial/RegistryFreshnessPanel.tsx [VERIFIED: codebase]
Generated {props.summary.generatedAt.slice(0, 10)}. Latest review{" "}
{props.summary.latestReview ?? "Unavailable"}.
```

### Pattern 4: State Detail Consistency Through Canonical Slugs

**What:** `/states/[slug]` calls `getStateBySlug(slug)` and renders the body from the compiled state path through `readStateBody()`. [VERIFIED: src/routes/(site)/states/[slug].tsx, src/lib/site/content.ts, src/lib/site/raw-content.ts]

**When to use:** QA detail pages by representative slugs; do not add slug-specific detail routes except the existing Illinois packet side panel distinction. [VERIFIED: D-07, D-08 in 17-CONTEXT.md]

### Anti-Patterns to Avoid

- **Hard-coded count copy:** Use derived `publishedRecordCount` or `registryStats.publishedCount`; stale count text is a Phase 17 defect. [VERIFIED: D-02, D-03 in 17-CONTEXT.md]
- **Route-specific state exceptions:** South Dakota and Wyoming already publish through the canonical graph path; do not add per-state route logic. [VERIFIED: Phase 16 verification, src/routes/(site)/states/[slug].tsx]
- **Comparison matrix drift:** The comparison model intentionally returns three narrative sections and keeps featured states selective. [VERIFIED: src/lib/site/states-surfaces.ts, src/lib/site/content.test.ts]
- **Manual generated artifact edits:** `compile:content` and `refresh:queue` own generated outputs. [VERIFIED: scripts/compile-content.ts, scripts/build-refresh-queue.ts, scripts/precommit.ts]

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Published counts and group totals | Manual count strings in routes | `getStatesIndexModel()` and `getRegistryStats()` | Current graph has 17 states and grouped counts already generated. [VERIFIED: src/lib/site/content.ts, generated/content-graph.json] |
| Cluster/comparison links | Ad hoc path arrays in route JSX | `href: /states/${slug}` from `states-surfaces.ts` | Existing tests assert canonical hrefs for cluster and comparison entries. [VERIFIED: src/lib/site/states-surfaces.ts, src/lib/site/content.test.ts] |
| Candidate/deferral outcome | Manual prose detached from artifacts | `content/data/state-candidate-intake.json` plus `generated/refresh/state-priority-queue.json` | Current closeout state is zero candidate rows and zero first-publication candidates. [VERIFIED: jq checks] |
| Browser evidence | Broad redesign checklist or subjective visual notes | Targeted route/viewport QA with screenshots and click-through notes | D-11 requires evidence-driven browser checks, not broad redesign. [VERIFIED: 17-CONTEXT.md] |
| Content validation | Custom string checks for frontmatter | Existing Zod schemas and `bun run validate:content` | Schema enforces slugs, 50 manifest rows, official source URLs, dates, candidate next-action invariants, and manifest-state consistency. [VERIFIED: src/lib/content/schema.ts, scripts/validate-content.ts] |

**Key insight:** Phase 17 defects should be corrected at the narrowest source of truth: generated/model data for counts and links, shared components for repeated card/freshness behavior, route copy for stale language, and closeout docs for milestone evidence. [VERIFIED: codebase architecture and 17-CONTEXT.md]

## Common Pitfalls

### Pitfall 1: Stale Copy Lives Outside Routes

**What goes wrong:** Route tests can pass while planning docs or product state still say the public site has only 15 detail pages. [VERIFIED: `rg -n ... .planning/PROJECT.md`]  
**Why it happens:** Existing stale-copy tests scan route/model copy, not `.planning/PROJECT.md`. [VERIFIED: src/lib/site/content.test.ts]  
**How to avoid:** Plan a closeout-doc scan that includes `.planning/PROJECT.md`, phase summaries, and public route files. [VERIFIED: QA-02 in .planning/REQUIREMENTS.md]  
**Warning signs:** `rg` finds `fifteen published state-detail pages`, `ten-state`, or `15-state` in closeout-facing files. [VERIFIED: rg stale-copy scan]

### Pitfall 2: Generated Artifacts Look Current Until the Date Changes

**What goes wrong:** `compile:content` and `refresh:queue` rewrite generated files with a generated date derived from the current day. [VERIFIED: scripts/compile-content.ts, scripts/build-refresh-queue.ts]  
**Why it happens:** `compileContentGraph()` uses `new Date().toISOString().slice(0, 10)` for `generatedAt`. [VERIFIED: scripts/compile-content.ts]  
**How to avoid:** Regenerate artifacts intentionally in the verification sequence and include diffs or no-diff evidence in closeout. [VERIFIED: scripts/precommit.ts, Phase 15 and 16 summaries]  
**Warning signs:** `generated/content-graph.json` or `generated/refresh/*` changes after verification without an accompanying summary. [VERIFIED: Phase 15/16 summaries]

### Pitfall 3: Model Tests Do Not Prove Mobile Readability

**What goes wrong:** Unit tests can prove counts and links while cards still wrap badly or overlap in mobile browser viewports. [VERIFIED: existing tests are model/unit tests; 17-CONTEXT D-11 requires browser checks]  
**Why it happens:** Existing test suite has Bun unit tests and no Playwright config or e2e files. [VERIFIED: `rg --files` test/config scan]  
**How to avoid:** Plan explicit browser checks at desktop and mobile viewports for catalog, clusters, compare, South Dakota, Wyoming, and one benchmark detail page. [VERIFIED: 17-CONTEXT specifics]  
**Warning signs:** Long state/bill/status text, stacked `data-chip` controls, or supporting-state links crowd the viewport. [VERIFIED: src/routes/(site)/states/index.tsx, src/components/editorial/StateCard.tsx]

### Pitfall 4: Over-Fixing Into Deferred UI Scope

**What goes wrong:** QA defects turn into advanced filtering, matrix comparison, or component-library adoption. [VERIFIED: 17-CONTEXT deferred ideas]  
**Why it happens:** Expanded count pressure can invite broader UX redesign when the locked decision is medium-density QA. [VERIFIED: D-01, D-05 in 17-CONTEXT.md]  
**How to avoid:** Limit Phase 17 edits to stale route/model copy, link/data consistency, focused tests, generated artifacts, browser QA, and closeout records. [VERIFIED: user additional_context and 17-CONTEXT.md]  
**Warning signs:** New dependency proposals, new comparison matrix files, or route rewrites unrelated to the defects. [VERIFIED: package.json baseline and Phase 17 boundary]

## Code Examples

### Derived Count Copy on `/states`

```typescript
// Source: src/routes/(site)/states/index.tsx [VERIFIED: codebase]
const statesIndexModel = getStatesIndexModel();
const publishedRecordCount = statesIndexModel.stats.publishedCount;
```

Use this pattern for count copy instead of hard-coded public-state totals. [VERIFIED: D-02 in 17-CONTEXT.md]

### Canonical Detail Links from Shared Models

```typescript
// Source: src/lib/site/states-surfaces.ts [VERIFIED: codebase]
href: `/states/${state.slug}`,
```

Use this pattern for cluster and comparison card/supporting links. [VERIFIED: src/lib/site/content.test.ts]

### Focused Stale-Copy Regression Test

```typescript
// Source: src/lib/site/content.test.ts [VERIFIED: codebase]
const staleCountTerms = ["ten-state", "ten published records"];
```

Extend this style only if Phase 17 finds a specific stale term worth protecting, such as `fifteen published state-detail pages` in closeout-facing text. [VERIFIED: rg stale-copy scan]

### Canonical State Detail Lookup

```typescript
// Source: src/routes/(site)/states/[slug].tsx [VERIFIED: codebase]
const state = slug ? getStateBySlug(slug) : undefined;
```

Use representative slug browser checks rather than adding state-specific route exceptions. [VERIFIED: D-07, D-08 in 17-CONTEXT.md]

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Ten-state public registry baseline | Seventeen-state public registry with South Dakota and Wyoming published | Phase 16, verified 2026-06-02 | Phase 17 must QA surfaces at 17 records and record closeout evidence. [VERIFIED: Phase 16 verification] |
| Hard-coded expanded counts | Derived model counts and generated graph stats | Phase 15/16 generated artifact work | Avoids stale route copy when public count changes. [VERIFIED: Phase 15 summaries, src/routes/(site)/states/index.tsx] |
| Remaining candidate queue with South Dakota/Wyoming | Empty candidate intake and zero first-publication candidates | Phase 16 | Closeout should record no current deferred candidates. [VERIFIED: content/data/state-candidate-intake.json, generated/refresh/state-priority-queue.json] |
| Broad UI experiment as possible future | Focused QA and closeout, with advanced UI deferred | Phase 17 context | Planner must not add `mystic-ui`, matrix UI, or new publication work. [VERIFIED: 17-CONTEXT.md] |

**Deprecated/outdated:**
- `.planning/PROJECT.md` line saying `fifteen published state-detail pages` is stale after Phase 16. [VERIFIED: rg stale-copy scan]
- Route/model tests only search `ten-state` and `ten published records`; they do not protect every closeout-facing stale count phrase. [VERIFIED: src/lib/site/content.test.ts]

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| None | All planning-critical claims in this research were verified from required context, codebase inspection, command output, package registry probes, or pinned Bright Builds standards. | All sections | None identified. |

## Open Questions

1. **Which exact closeout document should receive the final milestone record before archive?** [VERIFIED: QA-02 requires closeout evidence, but the archive command creates milestone artifacts later]
   - What we know: Phase 17 must record final published count, shipped states, deferred candidates, and verification evidence. [VERIFIED: .planning/REQUIREMENTS.md, 17-CONTEXT.md]
   - What's unclear: Whether execution should update only Phase 17 summary/verification artifacts or also patch `.planning/PROJECT.md` before milestone archive. [VERIFIED: .planning/PROJECT.md currently has one stale 15-page line]
   - Recommendation: Plan a closeout record task that updates `.planning/PROJECT.md` stale current-state copy and ensures Phase 17 summary/verification artifacts contain the final evidence table. [VERIFIED: rg stale-copy scan; QA-02]

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Bun | Scripts, tests, validation, build | yes | 1.3.9 | None needed. [VERIFIED: `bun --version`] |
| Node.js | npm registry probes and package metadata checks | yes | v24.13.0 | Use Bun where possible. [VERIFIED: `node --version`] |
| Git | Commit and closeout diff review | yes | 2.53.0 | None needed. [VERIFIED: `git --version`] |
| TypeScript CLI | Type check | yes | 6.0.2 | None needed. [VERIFIED: `bunx tsc --version`] |
| Biome CLI | Format/lint | yes | 2.4.10 | Existing `bun run format:check` and `bun run lint`. [VERIFIED: `bunx @biomejs/biome --version`; package.json] |
| Playwright CLI | Browser/PDF support | yes | 1.59.0 | Use Codex Browser plugin for manual browser QA if preferred. [VERIFIED: `bunx playwright --version`; plugin context] |
| Browser plugin | Local browser QA evidence | yes | Available in session plugin list | Use Playwright CLI if Browser tooling is unavailable. [VERIFIED: session plugin context] |

**Missing dependencies with no fallback:** None found. [VERIFIED: environment probes]  
**Missing dependencies with fallback:** None found. [VERIFIED: environment probes]

## Security Domain

Security enforcement is included because `.planning/config.json` does not set `security_enforcement: false`. [VERIFIED: .planning/config.json and GSD security instruction]

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V2 Authentication | no | Phase 17 public routes have no auth/session/login surface in scope. [VERIFIED: `rg auth/session/token/password/login/user ...`] |
| V3 Session Management | no | No session or cookie state was found in the Phase 17 route/data paths. [VERIFIED: rg auth/session scan] |
| V4 Access Control | no | Public content routes expose only published registry entries through `getStateBySlug()`. [VERIFIED: src/routes/(site)/states/[slug].tsx, src/lib/site/content.ts] |
| V5 Input Validation | yes | Zod parses slugs, ISO dates, source URLs, manifest rows, state entry frontmatter, and candidate intake. [VERIFIED: src/lib/content/schema.ts] |
| V6 Cryptography | no | No crypto, secrets, or credentials are part of Phase 17 scope. [VERIFIED: rg auth/session scan, 17-CONTEXT.md] |

### Known Threat Patterns for This Stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Stale or misleading public policy claims | Tampering/Repudiation | Use generated graph data, dated status/review fields, validation, and closeout evidence. [VERIFIED: scripts/validate-content.ts, generated/content-graph.json, 17-CONTEXT.md] |
| Broken or non-canonical detail links | Tampering | Generate links as `/states/${slug}` and test model hrefs. [VERIFIED: src/lib/site/states-surfaces.ts, src/lib/site/content.test.ts] |
| Unsafe Markdown HTML injection | Tampering/Elevation of Privilege | `markdown-it` is configured with `html: false`; content remains repo-authored and schema-validated before build. [VERIFIED: src/lib/site/markdown.ts, scripts/validate-content.ts] |
| External source URL drift or malformed source URL | Spoofing/Tampering | `SourceLinkSchema` requires valid URLs in state frontmatter and candidate intake. [VERIFIED: src/lib/content/schema.ts] |

## Sources

### Primary (HIGH confidence)

- `.planning/phases/17-expanded-surface-qa-and-closeout-prep/17-CONTEXT.md` - locked scope, decisions, discretion, deferred ideas, browser route set. [VERIFIED: required initial read]
- `.planning/REQUIREMENTS.md` - SITE-10, SITE-11, SITE-12, QA-01, QA-02. [VERIFIED: required initial read]
- `.planning/PROJECT.md`, `.planning/ROADMAP.md`, `.planning/STATE.md` - milestone state and phase success criteria. [VERIFIED: required initial read]
- `.planning/phases/15-first-expansion-publication-wave/15-01-SUMMARY.md`, `15-02-SUMMARY.md`, `15-03-SUMMARY.md` - five Phase 15 additions and verification handoff. [VERIFIED: file reads]
- `.planning/phases/16-throughput-expansion-and-deferral-ledger/16-VERIFICATION.md`, `16-02-SUMMARY.md` - South Dakota/Wyoming publication, 17-state graph, zero-candidate outcome. [VERIFIED: required initial read]
- `src/routes/(site)/states/*.tsx`, `src/lib/site/content.ts`, `src/lib/site/states-surfaces.ts`, `src/components/editorial/StateCard.tsx`, `RegistryFreshnessPanel.tsx` - implementation surfaces. [VERIFIED: required initial read]
- `generated/content-graph.json`, `generated/refresh/state-refresh-queue.json`, `generated/refresh/state-priority-queue.json`, `content/data/state-candidate-intake.json` - current generated and candidate state. [VERIFIED: jq probes]
- `package.json`, `scripts/precommit.ts`, `scripts/compile-content.ts`, `scripts/build-refresh-queue.ts`, `scripts/validate-content.ts` - command and generated-artifact contracts. [VERIFIED: file reads]
- Bright Builds pinned standards at commit `05f8d7a6c9c2e157ec4f922a05273e72dab97676` - architecture, code shape, verification, testing, TypeScript/JavaScript guidance. [CITED: raw.githubusercontent.com/bright-builds-llc/bright-builds-rules]

### Secondary (MEDIUM confidence)

- npm registry version probes for core dependencies and tooling. [VERIFIED: `npm view ... version time.modified` commands]

### Tertiary (LOW confidence)

- None. [VERIFIED: no unverified web-search-only claims used]

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - existing package metadata, local executable versions, and npm registry probes were checked. [VERIFIED: package.json, node_modules version probes, npm view commands]
- Architecture: HIGH - based on direct reads of route, model, component, generated artifact, and script files. [VERIFIED: codebase reads]
- Pitfalls: HIGH - based on existing tests, stale-copy grep, generated script behavior, and Phase 15/16 verification summaries. [VERIFIED: rg scans, script reads, phase summaries]
- Browser QA approach: MEDIUM - route set and need are locked, but final viewport choice remains within the agent discretion granted in context. [VERIFIED: 17-CONTEXT.md]

**Research date:** 2026-06-02 [VERIFIED: current_date]  
**Valid until:** Re-run research checks before planning if `package.json`, generated registry artifacts, Phase 17 context, or registry count changes. [VERIFIED: current findings depend on those files]  
**Nyquist validation section:** Omitted because `.planning/config.json` does not set `workflow.nyquist_validation` to `true`. [VERIFIED: .planning/config.json]  
**Runtime state inventory:** Omitted because Phase 17 is not a rename, rebrand, refactor, string replacement, or migration phase. [VERIFIED: 17-CONTEXT.md]
