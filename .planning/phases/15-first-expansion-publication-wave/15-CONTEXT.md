---
generated_by: gsd-discuss-phase
lifecycle_mode: yolo
phase_lifecycle_id: 15-2026-05-31T23-51-15
generated_at: 2026-05-31T23:53:42.037Z
---

# Phase 15: First Expansion Publication Wave - Context

**Gathered:** 2026-05-31
**Status:** Ready for planning
**Mode:** Yolo

<domain>

## Phase Boundary

Phase 15 publishes the first high-readiness v1.3 state batch through the existing canonical Markdown, manifest, compiled content graph, and public state-detail route path. It may refresh active or review-due published records when stale source posture would weaken the expansion batch, but it does not redesign catalog, cluster, or comparison surfaces beyond data-contract compatibility.

</domain>

<decisions>

## Implementation Decisions

### Publication Batch Selection

- **D-01:** Use the Phase 14 generated priority queue as the initial source of truth for candidate ordering.
- **D-02:** Publish ready-to-author candidates first: Florida, Kansas, North Dakota, Ohio, and Utah, provided each current official source still supports the status and mechanics claimed in the authored entry.
- **D-03:** Treat South Dakota and Wyoming as optional Phase 15 candidates only if final official status can be confirmed quickly from official state sources without broad research drift. Otherwise keep them out of the public set for Phase 16 deferral or follow-up.
- **D-04:** Do not force a fixed state count. The first wave is successful when every newly published state clears the official-source, schema, confidence, and dated-snapshot contract.

### Source And Refresh Gate

- **D-05:** Check official source pages before authoring any new state entry. If prior candidate intake is stale, update the canonical public entry to the current official posture rather than repeating old intake text.
- **D-06:** Active or review-due existing published records should be refreshed before lower-risk expansion only when their stale posture would block trustworthy comparison, catalog, or freshness claims. Terminal records can remain dated if their official status remains stable and the entry is not otherwise touched.
- **D-07:** Every newly published entry needs official primary sources, status date, review date, proposal classification, confidence cue support, and a concise policy-effect summary. Secondary sources are optional and should not substitute for official source footing.
- **D-08:** Terminal but official-source-rich failed proposals are publishable because they are useful evidence of state legislative posture. They must be framed as failed or inactive records, not as live momentum.

### Public Content Shape

- **D-09:** Reuse the existing `content/states/*.md` structure, headings, tone, and source-trail pattern from the current registry entries.
- **D-10:** Update `content/data/state-registry-manifest.json` for each newly published slug with the right `registryStatus`, `proposalFocus`, region, `shortNote`, and `editorialPriority`.
- **D-11:** Keep proposal classification conservative. Use `mixed-digital-asset-reserve` when statutory text covers digital assets more broadly than bitcoin, even if the bill title or advocacy frame emphasizes bitcoin.
- **D-12:** Keep the public site path canonical. New entries must compile into `generated/content-graph.json` and render through the existing `/states/[slug]` route without route-specific exceptions.

### Verification Contract

- **D-13:** Verification must cover content validation, content compilation, refresh/candidate generation, TypeScript, build, tests, and precommit where feasible.
- **D-14:** Include a targeted generated-content check proving the published state count increased and the expected new slugs are present in the compiled content graph.
- **D-15:** If any source cannot be confirmed from official pages or official PDFs, exclude that candidate from Phase 15 instead of weakening confidence.

### the agent's Discretion

- Exact prose, entry filenames, secondary source inclusion, and how many optional candidates to attempt are the agent's discretion as long as the official-source gate and first-wave goal stay intact.
- The planner may split work into source refresh, new state authoring, manifest/generated data, and verification plans if that keeps review and rollback easy.

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Planning And Requirements

- `.planning/ROADMAP.md` - Phase 15 goal, dependency on Phase 14, requirements, and success criteria.
- `.planning/REQUIREMENTS.md` - CATA-14, CATA-15, and REFR-05 acceptance intent for the first publication wave.
- `.planning/PROJECT.md` - v1.3 trust model, source-quality constraints, and out-of-scope boundaries.
- `.planning/STATE.md` - current phase and milestone state.
- `AGENTS.md` - repo-local Bright Builds entrypoint and required standards loading order.
- `AGENTS.bright-builds.md` - Bright Builds defaults materially affecting verification, source quality, code shape, and task artifacts.
- `standards-overrides.md` - local standards override register; no active substantive override is currently recorded.

### Direct Prior Phase Outputs

- `.planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md` - prior locked decisions for candidate priority and generated artifact boundaries.
- `.planning/phases/14-candidate-priority-and-refresh-intake/14-03-SUMMARY.md` - summary of generated priority artifact wiring and Phase 15 readiness.
- `.planning/phases/14-candidate-priority-and-refresh-intake/14-VERIFICATION.md` - proof that Phase 14 outputs passed and the first-publication queue exists.
- `generated/refresh/state-priority-queue.md` - maintainer-readable first-publication queue.
- `generated/refresh/state-priority-queue.json` - machine-readable combined priority queue.
- `content/data/state-candidate-intake.json` - controlled candidate intake data created in Phase 14.

### Existing Content And Generated Contracts

- `content/data/state-registry-manifest.json` - manifest entries and published/unresearched boundary.
- `content/data/state-registry-manifest.README.md` - registry status meanings and public-content boundary.
- `content/data/README.md` - data directory ownership rules.
- `content/states/texas-sb-21.md` - enacted reserve-law entry pattern.
- `content/states/arizona-sb-1025.md` - failed terminal proposal entry pattern.
- `content/states/north-carolina-s-327.md` - crossover reserve and bond-side entry pattern.
- `src/lib/content/schema.ts` - state entry frontmatter schema, manifest schema, and candidate intake parser.
- `scripts/validate-content.ts` - content validation entrypoint.
- `scripts/compile-content.ts` - compiled content graph generation and manifest assertion path.
- `scripts/build-refresh-queue.ts` - refresh and priority artifact generator.
- `src/lib/site/content.ts` - public model accessors for registry routes.
- `src/routes/(site)/states/[slug].tsx` - canonical state-detail route.
- `src/routes/(site)/states/index.tsx` - state catalog route that should consume new entries without custom cases.
- `src/routes/(site)/states/clusters.tsx` - cluster route that should continue to group expanded content.
- `src/routes/(site)/states/compare.tsx` - comparison route that should continue to group expanded content.

### Official Candidate Source Pages

- `https://www.flsenate.gov/Session/Bill/2025/550` - Florida SB 550 official page; current source check found last action `6/16/2025 Senate - Died in Banking and Insurance`.
- `https://www.flsenate.gov/Session/Bill/2025/487` - Florida HB 487 official companion page; current source check found last action `6/16/2025 House - Died in Government Operations Subcommittee`.
- `https://kslegislature.gov/b2025_26/bills/sb352/` - Kansas SB 352 official page; current source check found `Died` with 2026 hearing materials.
- `https://www.legislature.ohio.gov/legislation/136/hb18` - Ohio HB 18 official summary page.
- `https://www.legislature.ohio.gov/legislation/136/hb18/status` - Ohio HB 18 official status page; current source check found `1-28-2025 House Referred to committee Technology and Innovation`.
- `https://ndlegis.gov/assembly/69-2025/regular/bill-overview/bo1184.html?bill_number=1184&bill_year=2025` - North Dakota HB 1184 official overview; current source check found `Failed` and `Second reading, failed to pass, yeas 32 nays 57`.
- `https://le.utah.gov/Session/2025/bills/static/HB0230.html` - Utah HB 230 official bill page.
- `https://le.utah.gov/Session/2025/bills/enrolled/HB0230.pdf` - Utah HB 230 enrolled text; current source check found effective date May 7, 2025 and broader blockchain/digital-asset provisions.
- `https://sdlegislature.gov/#/Session/Bill/26633` - South Dakota HB 1155 official JS route; needs browser or API confirmation before publication.
- `https://mylrc.sdlegislature.gov/api/Documents/298084.pdf` - South Dakota HB 1155 official introduced text.
- `https://www.wyoleg.gov/Legislation/2025/HB0201` - Wyoming HB 201 official page; needs browser or alternate official confirmation before publication.
- `https://www.wyoleg.gov/2025/Introduced/HB0201.pdf` - Wyoming HB 201 official introduced text.

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- `parseStateEntryFrontmatter` and `assertManifestMatchesPublishedStates` already enforce the new public-entry contract during content validation and compilation.
- Existing state Markdown files provide stable frontmatter, heading order, source-trail, and confidence-note patterns for new entries.
- `buildRefreshQueueModel` and `buildCombinedPriorityQueueModel` will automatically surface new review dates and candidate changes after content compilation and refresh generation.
- Existing SolidStart state routes consume compiled content graph data, so no custom route should be necessary for new states.

### Established Patterns

- Public state entries are canonical authored Markdown under `content/states/`.
- `content/data/state-registry-manifest.json` must mark a state as `published` when a corresponding state entry exists.
- Generated files under `generated/` are derived artifacts and should be regenerated through repo scripts.
- Trust cues depend on conservative `proposalFocus`, `proposalKind`, `proposalSubtype`, `legislativeStatusGroup`, `confidence`, `statusAsOf`, and `lastReviewed` values.

### Integration Points

- Add new Markdown entries under `content/states/`.
- Update matching manifest rows from `unresearched` to `published`.
- Run `bun run validate:content`, `bun run compile:content`, and `bun run refresh:queue` so generated graph and refresh artifacts reflect the new batch.
- Run tests/build/precommit before phase verification.

</code_context>

<specifics>

## Specific Ideas

- Florida should be framed as a failed high-relevance public-funds-in-Bitcoin proposal with both Senate and House official pages in the source trail.
- Kansas should use the current Kansas Legislature SB 352 page rather than stale Phase 14 intake details, because the official page now shows 2026 hearing/testimony data and a `Died` posture.
- North Dakota should be framed as a failed digital asset and precious metal investment bill, with the official failed floor vote posture visible.
- Ohio should be framed as an active early-stage House committee bill and should avoid claiming enactment or passage.
- Utah should be framed carefully: the enrolled text is real and effective, but the final law is broader blockchain and digital-asset legislation rather than a narrow Bitcoin reserve act.

</specifics>

<deferred>

## Deferred Ideas

- South Dakota and Wyoming publication should be deferred unless official final status can be confirmed cleanly during this phase.
- Full deferral ledger coverage for all remaining high-interest states belongs to Phase 16.
- Catalog, cluster, comparison, and visual surface changes for the expanded registry belong to Phase 17 unless existing data surfaces break with the larger published set.

</deferred>

---

*Phase: 15-first-expansion-publication-wave*
*Context gathered: 2026-05-31*
