---
generated_by: gsd-discuss-phase
lifecycle_mode: yolo
phase_lifecycle_id: 13-2026-04-12T01-19-57
generated_at: 2026-04-12T01:19:57.768Z
---

# Phase 13: Refresh Workflow and Freshness QA - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning
**Mode:** Yolo

<domain>
## Phase Boundary

Phase 13 adds repo-owned refresh workflow support for the published state registry and
makes freshness cues explicit across the public registry surfaces. It should help a
maintainer see which published records need another source check because their review
dates or active legislative posture are aging, and it should help readers understand
that every state page remains a dated snapshot rather than a live tracker. This phase
does not publish a new batch of states, does not auto-update canonical content, and does
not create an admin surface.

</domain>

<decisions>
## Implementation Decisions

### Refresh workflow shape
- **D-01:** Keep refresh support repo-owned and generated. The maintainer artifact should
  live under `generated/refresh/`, not inside canonical state content or a new runtime
  database.
- **D-02:** Generate both a machine-readable queue (`.json`) and a maintainer-readable
  queue (`.md`) so the workflow stays auditable and easy to inspect in git.
- **D-03:** Wire refresh queue generation into the existing Bun script surface and
  pre-commit workflow so refresh artifacts are regenerated alongside the compiled content
  graph instead of depending on a separate manual toolchain.

### Queue triggers
- **D-04:** The queue should be driven by explicit review-date age and status-snapshot
  age thresholds, not by ad hoc judgment.
- **D-05:** Active records (`introduced`, `advanced`, `approved`) are more
  refresh-sensitive than terminal records (`enacted`, `failed`), so active-status age
  should escalate queue priority while terminal records rely mainly on review cadence.
- **D-06:** Queue output is advisory only. It must never auto-promote content or imply
  that the project has live legislative tracking.

### Public freshness cues
- **D-07:** Public routes should show a shared freshness summary so readers can see that
  the registry is explicitly dated and that some records are more current than others.
- **D-08:** State cards should surface exact `status as of` and `last reviewed` dates
  across catalog, cluster, and comparison surfaces rather than hiding freshness inside
  route-local copy.
- **D-09:** State detail pages should add a short freshness explanation panel using the
  same thresholds as the maintainer queue so public-facing cues and internal workflow
  stay aligned.

### UI boundaries
- **D-10:** Freshness work should reinforce the calm editorial shell. Use light panels,
  dates, and cue copy rather than dashboards, alert colors, or pseudo-live widgets.
- **D-11:** Comparison and cluster routes should gain freshness context without changing
  their narrative role or displacing canonical state-detail links.

### the agent's Discretion
- Exact freshness thresholds as long as they clearly differentiate active versus terminal
  records and remain simple enough to explain in code and docs.
- Exact file names for generated refresh outputs under `generated/refresh/`.
- Exact copy for route-level freshness summaries and detail-page explanations, as long as
  it stays honest about snapshot-based coverage.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Milestone contract
- `.planning/PROJECT.md` — current v1.2 framing, trust model, and active milestone
  requirement.
- `.planning/REQUIREMENTS.md` — `REFR-01` and `REFR-03` define the Phase 13 contract.
- `.planning/ROADMAP.md` — Phase 13 goal, success criteria, and plan split.
- `.planning/STATE.md` — current project position and session state.

### Prior phase context
- `.planning/phases/10-coverage-expansion-contract-and-data-shape/10-CONTEXT.md` —
  locks the `generated/refresh/` boundary and compile-time freshness contract.
- `.planning/phases/10-coverage-expansion-contract-and-data-shape/10-02-SUMMARY.md` —
  shows how freshness facts already flow through the compiled graph and shared selectors.
- `.planning/phases/11-broader-national-publication-batch/11-02-SUMMARY.md` — current
  confidence/freshness cues on existing registry surfaces.
- `.planning/phases/12-cluster-and-comparison-surfaces/12-01-SUMMARY.md` — cluster
  surface pattern that Phase 13 must preserve.
- `.planning/phases/12-cluster-and-comparison-surfaces/12-02-SUMMARY.md` — comparison
  surface pattern and grouped-surface badge expectations.

### Data and workflow boundaries
- `content/data/README.md` — canonical versus generated data boundary.
- `content/data/state-registry-manifest.README.md` — registry-status meanings and
  refresh-artifact boundary.
- `generated/refresh/README.md` — dedicated home for refresh-only artifacts.
- `scripts/compile-content.ts` — source of truth for generated content-graph freshness
  fields.

### Runtime surfaces
- `src/lib/site/content.ts` — shared site-model access layer over the compiled graph.
- `src/routes/(site)/states/index.tsx` — base catalog surface.
- `src/routes/(site)/states/clusters.tsx` — grouped browse surface.
- `src/routes/(site)/states/compare.tsx` — narrative comparison surface.
- `src/routes/(site)/states/[slug].tsx` — canonical state-detail surface.
- `src/components/editorial/StateCard.tsx` — shared card shell used across registry
  surfaces.

### Repo and standards guidance
- `AGENTS.md` — repo-local orchestration and verification rules.
- `AGENTS.bright-builds.md` — Bright Builds workflow and standards routing.
- `standards-overrides.md` — no active local overrides.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/site/content.ts` already exposes shared published-state and registry-summary
  selectors, so Phase 13 should derive queue and freshness summaries once and reuse them.
- `src/components/editorial/StateCard.tsx` already carries confidence cues, making it the
  natural place to surface exact freshness dates on catalog-like routes.
- `generated/content-graph.json` already contains `reviewAgeDays`, `statusAgeDays`,
  `statusAsOf`, and `lastReviewed`, so Phase 13 can stay data-driven without new source
  scraping.

### Established Patterns
- Refresh-only artifacts belong under `generated/refresh/`, not `content/`.
- Shared route-model logic should live in small pure modules consumed by routes rather
  than in route-local transforms.
- Public registry surfaces stay editorial, card-led, and explicitly dated rather than
  dashboard-like or live-tracker-like.

### Integration Points
- Refresh queue generation should sit beside other Bun scripts in `scripts/`.
- Shared freshness logic should plug into `src/lib/site/content.ts` so routes and scripts
  consume the same thresholds.
- Catalog, cluster, comparison, and detail routes all need the new freshness contract,
  but no new top-level navigation surface is necessary.

</code_context>

<specifics>
## Specific Ideas

- Use one shared set of freshness thresholds so maintainer artifacts and public cues never
  drift.
- Keep public language plain: dates plus cue text such as current, review soon, or review
  due are better than pseudo-real-time phrasing.
- Let the refresh queue stay generated and committed like the content graph rather than
  requiring a separate database or task runner.

</specifics>

<deferred>
## Deferred Ideas

- Auto-opening review tasks or issue creation from refresh queue output.
- Any semi-automated live-intake workflow beyond static queue generation.
- Broader publication expansion beyond the current ten-state set.

</deferred>

---

*Phase: 13-refresh-workflow-and-freshness-qa*
*Context gathered: 2026-04-11*
