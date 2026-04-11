---
generated_by: gsd-discuss-phase
lifecycle_mode: yolo
phase_lifecycle_id: 10-2026-04-11T18-51-47
generated_at: 2026-04-11T18:53:49.912Z
---

# Phase 10: Coverage Expansion Contract and Data Shape - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning
**Mode:** Yolo

<domain>
## Phase Boundary

Phase 10 extends the canonical registry contract and generated content graph so broader
coverage, grouping, and refresh cues have a trustworthy foundation. It is the
data-shape and integration phase for milestone v1.2, not the publication-batch phase
and not the comparison-page phase.

</domain>

<decisions>
## Implementation Decisions

### Registry metadata contract
- **D-01:** Add grouping and freshness-supporting fields through the canonical content
  contract first, centered on `content/data/state-registry-manifest.json` and
  `src/lib/content/schema.ts`, instead of inventing route-local grouping logic.
- **D-02:** Keep the grouping dimensions limited to the milestone scope:
  legislative status, proposal type/focus, and region. Do not broaden the contract to
  unrelated taxonomy expansion in this phase.
- **D-03:** Preserve the distinction between published canonical state content and
  non-published refresh workflow artifacts. Phase 10 must make that boundary harder to
  violate, not blur it.

### Derived data and compile path
- **D-04:** Comparison-ready and freshness-ready data should be derived in the compile
  layer (`scripts/compile-content.ts`) and exposed through shared site loaders such as
  `src/lib/site/content.ts`, not recomputed ad hoc inside route components.
- **D-05:** The generated content graph remains the runtime read model. New grouping or
  freshness signals should flow into that graph so later comparison and refresh work can
  reuse one source of truth.

### Refresh workflow boundary
- **D-06:** Refresh support in this phase is structural only: define where queued or
  review-needed artifacts live and how they differ from published content. Do not create
  a public-facing live tracker or silent auto-publish path.
- **D-07:** Refresh outputs should be repo-owned and auditable. They can suggest or
  queue work, but they must not mutate canonical published state content without a
  normal authored-content review path.

### Surface scope
- **D-08:** The current states index and shared loaders are the main integration points
  for this phase. Any UI changes here should be minimal and in service of the new data
  contract, not a comparison-surface redesign.

### the agent's Discretion
- Exact field names and whether some grouping signals are stored canonically versus
  derived from existing canonical fields.
- Exact file layout for refresh artifacts, as long as it stays outside published
  canonical content and is clearly documented.
- Whether Phase 10 needs a small shared helper layer for grouping/freshness selectors in
  `src/lib/site/content.ts` or a nearby module.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Milestone and phase contract
- `.planning/PROJECT.md` — current milestone framing, scope boundaries, and active
  requirements.
- `.planning/REQUIREMENTS.md` — `CATA-08` and `REFR-02` define the phase requirement
  contract.
- `.planning/ROADMAP.md` — Phase 10 goal, success criteria, and milestone sequencing.
- `.planning/STATE.md` — current milestone position and lifecycle state.

### Canonical registry inputs
- `content/data/README.md` — boundary between canonical small data artifacts and
  generated/runtime artifacts.
- `content/data/state-registry-manifest.json` — current registry-wide canonical manifest
  surface.
- `content/data/proposal-taxonomy.json` — controlled taxonomy for proposal kind and
  subtype classification.
- `content/states/*.md` — current published state entries and freshness/source shape.

### Compile and runtime read model
- `src/lib/content/schema.ts` — canonical validation contract for manifest and state
  entry data.
- `scripts/compile-content.ts` — build-time generation of the runtime content graph.
- `src/lib/site/content.ts` — shared selectors and read-model accessors used by routes.
- `src/lib/site/raw-content.ts` — current raw Markdown body access boundary.

### Existing consumer surface
- `src/routes/(site)/states/index.tsx` — current registry listing surface that should
  consume the stronger grouped/freshness-aware read model.

### Local standards
- `AGENTS.md` — repo-local orchestration and verification expectations.
- `AGENTS.bright-builds.md` — Bright Builds workflow guidance and standards routing.
- `standards-overrides.md` — no active local overrides; keep Bright Builds defaults.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/content/schema.ts`: already validates manifest and state frontmatter, so it is
  the natural place to extend canonical grouping/freshness contracts.
- `scripts/compile-content.ts`: already compiles canonical content into
  `generated/content-graph.json`, so it should own new derived grouping/freshness data.
- `src/lib/site/content.ts`: already exposes published-state selectors and registry
  stats, making it the right place for grouped/comparison-ready accessors.
- `src/routes/(site)/states/index.tsx`: already consumes shared selectors and can be kept
  as a thin consumer instead of owning grouping logic directly.

### Established Patterns
- Canonical Markdown and controlled JSON inputs feed a generated runtime graph; routes do
  not parse raw canonical content ad hoc.
- Zod-backed validation guards the boundary before data reaches the site.
- The editorial site keeps interpretation in route copy and reusable components while the
  data contract stays centralized in content and compile helpers.

### Integration Points
- Manifest and state-entry schema updates must stay synchronized across
  `content/data/state-registry-manifest.json`, `src/lib/content/schema.ts`, and
  `scripts/compile-content.ts`.
- Any freshness or grouping additions should be reflected through `src/lib/site/content.ts`
  before they reach `src/routes/(site)/states/index.tsx`.

</code_context>

<specifics>
## Specific Ideas

- Keep Phase 10 structural: comparison pages themselves belong in Phase 12.
- Preserve the current editorial trust posture: no dashboardification, no pseudo-live
  language, no hidden automation.
- Treat region/status/type grouping as first-class milestone inputs because later
  comparison surfaces will depend on them.

</specifics>

<deferred>
## Deferred Ideas

- Actual broader publication batch — Phase 11.
- Editorial cluster and comparison routes — Phase 12.
- Repo-owned refresh queue execution and cross-surface freshness QA — Phase 13.
- Theme toggle and selective `mystic-ui` adoption — future follow-on or backlog work.

</deferred>

---
*Phase: 10-coverage-expansion-contract-and-data-shape*
*Context gathered: 2026-04-11*
