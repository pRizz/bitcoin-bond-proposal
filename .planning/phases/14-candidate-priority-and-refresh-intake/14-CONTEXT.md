---
generated_by: gsd-discuss-phase
lifecycle_mode: yolo
phase_lifecycle_id: 14-2026-05-27T13-54-27
generated_at: 2026-05-27T13:59:07.880Z
---

# Phase 14: Candidate Priority and Refresh Intake - Context

**Gathered:** 2026-05-27
**Status:** Ready for planning
**Mode:** Yolo

<domain>

## Phase Boundary

Phase 14 extends the repo-owned refresh workflow so maintainers can choose the next state work from both stale published records and unpublished candidate readiness. It does not publish new public state pages. It produces dated maintainer artifacts that prepare Phase 15 to refresh blockers and select the first credible expansion candidates.

</domain>

<decisions>

## Implementation Decisions

### Priority Artifact Shape

- **D-01:** Keep the existing published-record refresh queue behavior intact and add a combined priority artifact under `generated/refresh/` that includes both published refresh work and unpublished candidate work.
- **D-02:** Generate both machine-readable JSON and maintainer-readable Markdown for the combined priority queue, with a timestamp, summary counts, source boundaries, and separate sections for refresh work and first publication candidates.
- **D-03:** The priority artifact must show a concrete first publication queue for Phase 15, even when stale published records also require refresh first.

### Candidate Classification

- **D-04:** Store unpublished candidate intake as a repo-owned controlled data input, not as public state-entry content. The preferred location is `content/data/state-candidate-intake.json` unless planning finds an existing better local pattern.
- **D-05:** Candidate rows must classify source availability, proposal relevance, readiness, status, status date, official source URL, evidence note, and next action.
- **D-06:** Official legislature or state-source availability is required for a candidate to be marked ready to author. Secondary coverage can explain interest, but it cannot by itself make a state ready.
- **D-07:** Do not create or modify `content/states/*.md` in this phase. Candidate rows are maintainer guidance only.

### Prioritization Rules

- **D-08:** Prioritize active or review-due published records ahead of lower-risk expansion work when stale status could undermine a new publication or comparison claim.
- **D-09:** Rank unpublished candidates by readiness first, then source strength, then proposal relevance, then state name for deterministic output.
- **D-10:** Treat terminal but source-rich failed or enacted proposals as valid first-publication candidates when they can be authored accurately from official sources.

### Verification Contract

- **D-11:** Add unit coverage for pure candidate-priority classification and sorting logic.
- **D-12:** Extend repo-owned refresh generation so `bun run refresh:queue` writes the new combined artifacts and keeps existing outputs valid.
- **D-13:** Verification must cover content validation, content compilation, refresh generation, type checking, build, tests, and the existing precommit script where feasible.

### the agent's Discretion

- Exact type names, section headings, score labels, and Markdown table columns are flexible as long as the generated artifact is deterministic, scan-friendly, and explicit about generated-output boundaries.
- The planner may split implementation into a pure-model plan and a generation/docs plan if that keeps tests focused.

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Planning And Requirements

- `.planning/ROADMAP.md` - Phase 14 goal, requirements, success criteria, and dependency boundary.
- `.planning/REQUIREMENTS.md` - CATA-10, CATA-11, REFR-04, and REFR-06 acceptance intent.
- `.planning/PROJECT.md` - v1.3 trust model, source-quality constraints, and out-of-scope boundaries.
- `AGENTS.md` - repo-local Bright Builds entrypoint.
- `AGENTS.bright-builds.md` - Bright Builds defaults materially affecting verification and code shape.

### Existing Refresh And Content Contracts

- `scripts/build-refresh-queue.ts` - current refresh artifact generator to extend.
- `src/lib/site/registry-freshness.ts` - pure freshness model and current refresh queue sorting behavior.
- `src/lib/site/registry-freshness.test.ts` - existing freshness unit tests and Arrange/Act/Assert style.
- `src/lib/site/content.ts` - public model accessors that expose refresh data from the compiled content graph.
- `src/lib/content/schema.ts` - content schema and manifest contract.
- `scripts/compile-content.ts` - compiled content graph generation and age calculations.
- `content/data/state-registry-manifest.json` - 50-state skeleton and published/unresearched boundary.
- `content/data/README.md` - data-directory ownership rules.
- `content/data/state-registry-manifest.README.md` - registry manifest status meanings and public-content boundary.
- `generated/refresh/README.md` - generated refresh artifact boundary.

### Official Candidate Source Pages

- `https://www.flsenate.gov/Session/Bill/2025/550` - Florida SB 550 official page for public-funds-in-Bitcoin proposal.
- `https://www.flsenate.gov/Session/Bill/2025/487` - Florida HB 487 official companion page.
- `https://www.legislature.ohio.gov/legislation/136/hb18` - Ohio HB 18 official page for Strategic Cryptocurrency Reserve Act.
- `https://kslegislature.gov/b2025_26/bills/sb352/` - Kansas SB 352 official page for bitcoin and digital assets reserve fund.
- `https://ndlegis.gov/assembly/69-2025/regular/bill-overview/bo1184.html?bill_number=1184&bill_year=2025` - North Dakota HB 1184 official page.
- `https://sdlegislature.gov/#/Session/Bill/26633` - South Dakota HB 1155 official page route.
- `https://mylrc.sdlegislature.gov/api/Documents/298084.pdf` - South Dakota HB 1155 official introduced text.
- `https://www.wyoleg.gov/Legislation/2025/HB0201` - Wyoming HB 201 official page.
- `https://www.wyoleg.gov/2025/Introduced/HB0201.pdf` - Wyoming HB 201 official introduced text.
- `https://le.utah.gov/Session/2025/bills/static/HB0230.html` - Utah HB 230 official page.
- `https://le.utah.gov/Session/2025/bills/enrolled/HB0230.pdf` - Utah HB 230 official enrolled text.

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- `buildRefreshQueueModel` already maps published state freshness into a deterministic maintainer queue.
- `getRefreshQueueModel` already gives scripts a content-layer accessor for generated refresh output.
- `scripts/build-refresh-queue.ts` already owns JSON and Markdown generation under `generated/refresh/`.
- `content/data/state-registry-manifest.json` already carries all 50 unpublished slugs without creating public pages.

### Established Patterns

- Pure model logic lives under `src/lib/site/` and is unit-tested with `bun:test`.
- Generated artifacts are written by Bun scripts and documented under `generated/refresh/`.
- Public state pages are created only from canonical authored Markdown in `content/states/`.
- Schema parsing uses Zod at content boundaries and plain typed objects internally.

### Integration Points

- Add candidate-priority model logic next to the existing freshness model or in a small sibling module.
- Add a controlled candidate intake JSON file and parse it before generating combined priority output.
- Extend `scripts/build-refresh-queue.ts` so one command regenerates existing refresh files plus the new priority files.

</code_context>

<specifics>

## Specific Ideas

- The first candidate queue should include official-source-backed unpublished states such as Florida, Ohio, Kansas, North Dakota, South Dakota, Wyoming, and Utah when their source classification clears the readiness gate.
- Candidate rows should be explicit about whether the next action is "refresh published record first", "author state entry", "confirm final status", or "defer until stronger official source is found".

</specifics>

<deferred>

## Deferred Ideas

- Creating public state-detail pages for the newly ranked candidates belongs to Phase 15.
- Recording final deferral reasons for all remaining high-interest states belongs to Phase 16.
- Catalog, cluster, and comparison surface changes for the expanded count belong to Phase 17 unless Phase 14 implementation needs a narrow maintainer-only preview.

</deferred>

---

*Phase: 14-candidate-priority-and-refresh-intake*
*Context gathered: 2026-05-27*
