---
generated_by: gsd-discuss-phase
lifecycle_mode: yolo
phase_lifecycle_id: 11-2026-04-11T20-59-51
generated_at: 2026-04-11T20:59:51.548Z
---

# Phase 11: Broader National Publication Batch - Context

**Gathered:** 2026-04-11
**Status:** Ready for planning
**Mode:** Yolo

<domain>
## Phase Boundary

Phase 11 publishes the next deliberate batch of state entries under the stronger Phase 10
registry contract and adds confidence/completeness cues where needed. This is the
coverage-expansion phase for v1.2. It does not own cluster/comparison pages and it does
not own refresh workflow execution.

</domain>

<decisions>
## Implementation Decisions

### Batch shape
- **D-01:** Treat Phase 11 as a deliberate expansion batch, not an open-ended sweep.
  The phase should add a finite number of new publishable state entries that materially
  broadens the registry beyond the first five while staying finishable in one phase.
- **D-02:** Target a batch of roughly 4 new states unless the available official source
  quality clearly supports one more without lowering the trust bar.

### Candidate selection
- **D-03:** Prioritize states with official legislature or authority sources that make
  current status and operative mechanics explicit enough for a publishable entry.
- **D-04:** Missouri is a preferred batch candidate because the manifest already flags it
  as a likely reserve-side follow-on; the rest of the batch should be chosen by source
  quality and useful breadth, not by forcing a perfect geographic pattern.
- **D-05:** A reserve-heavy batch is acceptable if bond-side official signals remain
  sparse. Do not add weak bond entries just to create symmetry with the existing set.

### Confidence and completeness cues
- **D-06:** Every new entry should include an explicit confidence/completeness note that
  matches the strength of its official source trail and current legislative posture.
- **D-07:** Confidence/completeness cues should remain descriptive and editorial, not
  dashboard-like scoring or pseudo-quantitative rankings.
- **D-08:** If integrating the new batch reveals a small gap in how the current registry
  surfaces confidence/completeness, Phase 11 may make narrow supporting updates to the
  existing catalog/detail surfaces, but it must not drift into Phase 12 comparison work.

### Scope boundaries
- **D-09:** Preserve the current five published records unless a small consistency update
  is required to align them with the new confidence/completeness contract.
- **D-10:** Do not add cluster pages, comparison pages, or refresh queue execution in
  this phase. Publication depth and confidence cues are the only reader-facing expansion
  goals here.

### the agent's Discretion
- Exact shortlist of new states beyond Missouri, based on official-source strength at
  execution time.
- Whether the batch lands at 4 or 5 new entries depending on research quality.
- Exact wording and placement of confidence/completeness cues, as long as they remain
  calm, explicit, and non-dashboard-like.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Milestone and phase contract
- `.planning/PROJECT.md` — current milestone framing, validated/active requirements, and
  scope boundaries.
- `.planning/REQUIREMENTS.md` — `CATA-07` and `CATA-09` define the Phase 11 requirement
  contract.
- `.planning/ROADMAP.md` — Phase 11 goal, success criteria, and sequence after Phase 10.
- `.planning/STATE.md` — current project position and session continuity.
- `.planning/phases/10-coverage-expansion-contract-and-data-shape/10-CONTEXT.md` —
  locked Phase 10 contract decisions that Phase 11 must build on.
- `.planning/phases/10-coverage-expansion-contract-and-data-shape/10-RESEARCH.md` —
  compile/data-shape implications already established in the previous phase.

### Canonical content and registry inputs
- `content/data/README.md` — boundary for canonical data artifacts.
- `content/data/state-registry-manifest.README.md` — manifest field contract and
  authored-content expectations.
- `content/data/state-registry-manifest.json` — current 50-state manifest, now including
  region metadata.
- `content/data/proposal-taxonomy.json` — controlled reserve/bond taxonomy.
- `content/states/*.md` — current published state entries and existing confidence-note
  style.

### Validation and runtime surfaces
- `src/lib/content/schema.ts` — canonical manifest and state-entry frontmatter boundary.
- `scripts/validate-content.ts` — content validation entrypoint for new state entries.
- `scripts/compile-content.ts` — grouped/freshness-aware content-graph generation.
- `src/lib/site/content.ts` — shared loader model that Phase 11 batch work must feed.
- `src/routes/(site)/states/index.tsx` — current registry listing consumer of the shared
  model.
- `src/routes/(site)/states/[slug].tsx` — current state-detail consumer surface.

### Repo and standards guidance
- `AGENTS.md` — repo-local orchestration and verification rules.
- `AGENTS.bright-builds.md` — Bright Builds workflow and standards routing.
- `standards-overrides.md` — no active overrides; keep Bright Builds defaults.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `content/states/*.md`: current published entries provide the reference shape for new
  state records and confidence/completeness notes.
- `content/data/state-registry-manifest.json`: already separates published, queued, and
  unresearched state-level records, so Phase 11 should update it rather than invent a
  new batch tracker.
- `src/lib/content/schema.ts`: now enforces `region` and `legislativeStatusGroup`, so
  new entries must satisfy the stronger contract from the start.
- `src/lib/site/content.ts` and `src/routes/(site)/states/*`: already consume grouped and
  freshness-aware registry data, making them the narrow places to expose any new
  confidence/completeness cues.

### Established Patterns
- Canonical published entries live in Markdown under `content/states/` with official
  source trails and explicit freshness dates.
- The manifest and state files are validated before compile and then emitted into the
  generated content graph for route consumers.
- The public registry stays editorial and medium-density rather than turning into a live
  tracker or table-heavy dashboard.

### Integration Points
- Any new published state entry must stay synchronized across the new Markdown file, its
  manifest row, validation, compile output, and the existing catalog/detail surfaces.
- Confidence/completeness cues should align between the state file content, manifest
  notes, and any small supporting UI changes in the current registry surfaces.

</code_context>

<specifics>
## Specific Ideas

- Missouri should be considered first because it is already seeded in the manifest as a
  likely follow-on candidate.
- Additional likely candidates should come from official reserve or bond signals in
  currently unpublished states with clear bill or authority pages, likely producing a
  reserve-heavy second batch.
- The batch should feel like a meaningful expansion, not just one or two more records and
  not a rushed national sweep.

</specifics>

<deferred>
## Deferred Ideas

- Cluster or comparison reading paths — Phase 12.
- Refresh queue/report execution and cross-surface freshness QA — Phase 13.
- Broader `mystic-ui` or visual-system experimentation — backlog/future work.

</deferred>

---
*Phase: 11-broader-national-publication-batch*
*Context gathered: 2026-04-11*
