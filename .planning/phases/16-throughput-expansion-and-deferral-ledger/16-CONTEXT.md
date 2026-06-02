---
generated_by: gsd-discuss-phase
lifecycle_mode: yolo
phase_lifecycle_id: 16-2026-06-02T12-12-22
generated_at: 2026-06-02T12:13:31.844Z
---

# Phase 16: Throughput Expansion and Deferral Ledger - Context

**Gathered:** 2026-06-02
**Status:** Ready for planning
**Mode:** Yolo

<domain>
## Phase Boundary

Phase 16 continues the v1.3 publication workflow from the verified Phase 15 state: a fifteen-record public registry, two remaining first-publication candidates, and regenerated refresh/candidate priority artifacts. The phase should either publish any remaining credible candidates that pass current official-source checks or record explicit deferral reasons for candidates that cannot be published without weakening the source, schema, confidence, or dated-snapshot contract.

This phase owns CATA-12 and CATA-13. It does not own catalog/cluster/comparison QA or visual-surface polish; those remain Phase 17.

</domain>

<decisions>
## Implementation Decisions

### Candidate Scope

- **D-01:** Start from the remaining candidate intake and generated priority queue: South Dakota and Wyoming. Do not broaden into a new multi-state search unless research proves one of these entries needs replacement to satisfy the same CATA-12/CATA-13 boundary.
- **D-02:** Attempt South Dakota first, then Wyoming, following the generated priority order and the existing candidate-priority sort contract.
- **D-03:** Do not force both states into publication. The phase succeeds when every remaining high-interest candidate is either published with official-source footing or left unpublished with a clear deferral reason.

### Official-Source Gate

- **D-04:** Re-check current official state sources before authoring either record. The prior official PDF-only intake is not enough by itself; planners and researchers must confirm final status from official legislature pages, status routes, journals, calendars, bill histories, or equivalent official records.
- **D-05:** If current official status can be confirmed, author the public state entry using the existing `content/states/*.md` structure, conservative classification, source trail, confidence/completeness note, and dated `lastReviewed` field.
- **D-06:** If official final status cannot be confirmed from current state sources, do not create a public state entry. Update candidate intake with `readiness: "defer"`, `nextAction: "defer-until-stronger-official-source"`, and a specific deferral reason instead.

### Deferral Ledger

- **D-07:** The deferral ledger should stay outside public state-entry content. Prefer the existing `content/data/state-candidate-intake.json` `deferralReason` field as the canonical machine-readable ledger and add or update a maintainer-readable planning handoff only if planners need a clearer human narrative.
- **D-08:** Deferral reasons must be concrete enough for future work to resume: name the missing official evidence, the official sources checked, and the condition that would make the candidate publishable later.
- **D-09:** If a candidate is published, remove it from candidate intake and update the manifest row to `published`; if deferred, keep the manifest row `unresearched` and preserve the candidate row with a deferral reason.

### Generated Artifacts And Verification

- **D-10:** After any publication or deferral change, regenerate `generated/content-graph.json` and `generated/refresh/*` from repo-owned scripts so public route data and maintainer queues match the canonical inputs.
- **D-11:** Update focused tests when counts or candidate-readiness expectations change, but do not weaken existing schema or freshness checks.
- **D-12:** Verification must include content validation, content compilation, refresh queue generation, TypeScript, tests, build, precommit, code review, lifecycle validation, and official-source spot checks for South Dakota and Wyoming.

### the agent's Discretion

- Exact filenames, prose, manifest `shortNote` wording, and whether a small human-readable deferral note is useful are the agent's discretion as long as the machine-readable candidate ledger and public-content boundary remain clear.
- The planner may split work into source confirmation, publication/deferral updates, generated artifacts, and verification plans to keep commits reviewable.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase And Requirements

- `.planning/ROADMAP.md` — Phase 16 goal, requirements, and success criteria.
- `.planning/REQUIREMENTS.md` — CATA-12 and CATA-13 definitions and v1.3 out-of-scope guardrails.
- `.planning/STATE.md` — Current milestone decisions and Phase 15 carry-forward state.
- `.planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md` — Locked Phase 15 decisions, especially South Dakota/Wyoming carry-forward and official-source gate.
- `.planning/phases/15-first-expansion-publication-wave/15-VERIFICATION.md` — Verified Phase 15 end state, remaining candidate count, and deferred Phase 16 items.

### Candidate And Generated Data

- `content/data/state-candidate-intake.json` — Canonical maintainer input and machine-readable deferral ledger for unpublished candidates.
- `content/data/state-registry-manifest.json` — Publication boundary for all state rows.
- `generated/refresh/state-priority-queue.md` — Maintainer-readable priority queue showing South Dakota and Wyoming as remaining first-publication candidates.
- `generated/refresh/state-priority-queue.json` — Machine-readable combined refresh/candidate queue.
- `content/data/README.md` — Authored-content versus generated-artifact ownership boundaries.

### Code And Verification

- `src/lib/content/schema.ts` — Candidate intake schema, deferral reason rules, and publication schema contracts.
- `src/lib/site/candidate-priority.ts` — Candidate sorting, freshness risk, authorability, and combined priority model.
- `scripts/build-refresh-queue.ts` — Repo-owned refresh and priority artifact generator.
- `scripts/compile-content.ts` — Repo-owned content graph compiler.
- `src/lib/site/content.test.ts` — Public state model and registry count expectations.
- `src/lib/site/candidate-priority.test.ts` — Candidate priority and deferral behavior coverage.
- `src/lib/content/schema.test.ts` — Candidate schema and state-entry schema coverage.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets

- `content/states/*.md`: Reuse the existing state-entry frontmatter and narrative section pattern if South Dakota or Wyoming becomes publishable.
- `content/data/state-candidate-intake.json`: Use as the canonical non-public candidate ledger, including `deferralReason` for unpublished high-interest states.
- `scripts/build-refresh-queue.ts`: Regenerates both refresh and combined priority artifacts from canonical inputs.

### Established Patterns

- Published state records are authored Markdown plus manifest rows, then compiled into `generated/content-graph.json`.
- Candidate intake is controlled maintainer data, not public content. It must be parsed through `parseStateCandidateIntake`.
- Deferred candidates require `readiness: "defer"`, `nextAction: "defer-until-stronger-official-source"`, and a non-empty `deferralReason`.
- Official-source-rich terminal failed proposals are publishable when framed as failed or inactive and backed by current official status evidence.

### Integration Points

- Publication changes touch `content/states/*.md`, `content/data/state-registry-manifest.json`, generated content graph, generated refresh artifacts, and focused tests.
- Deferral-only changes touch `content/data/state-candidate-intake.json`, generated refresh artifacts, and focused tests.
- Phase 17 will consume the final Phase 16 shipped/deferred list for catalog, cluster, comparison, browser QA, and closeout evidence.

</code_context>

<specifics>
## Specific Ideas

- South Dakota and Wyoming should be treated as high-interest candidate records, not guaranteed public records.
- South Dakota currently has official introduced text at `https://mylrc.sdlegislature.gov/api/Documents/298084.pdf`; final status must be confirmed from official South Dakota legislature status/history materials before publication.
- Wyoming currently has official introduced text at `https://www.wyoleg.gov/2025/Introduced/HB0201.pdf`; final status must be confirmed from official Wyoming legislature summary/status materials before publication.
- If either state cannot be confirmed from official status sources, the output should explain exactly what was checked and what remains missing.

</specifics>

<deferred>
## Deferred Ideas

- Catalog, cluster, comparison, and browser-surface QA remain Phase 17.
- Full 50-state deep publication remains a future milestone unless source availability and throughput support it later.

</deferred>

---

*Phase: 16-throughput-expansion-and-deferral-ledger*
*Context gathered: 2026-06-02*
