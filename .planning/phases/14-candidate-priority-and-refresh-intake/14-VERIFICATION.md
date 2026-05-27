---
phase: 14-candidate-priority-and-refresh-intake
verified: 2026-05-27T14:47:21Z
status: passed
score: 15/15 must-haves verified
generated_by: gsd-verifier
lifecycle_mode: yolo
phase_lifecycle_id: 14-2026-05-27T13-54-27
generated_at: 2026-05-27T14:47:21Z
lifecycle_validated: true
overrides_applied: 0
---

# Phase 14: Candidate Priority and Refresh Intake Verification Report

**Phase Goal:** Extend the repo-owned queue workflow so maintainers can choose the next state work from both stale published records and unpublished candidate readiness.
**Verified:** 2026-05-27T14:47:21Z
**Status:** passed
**Re-verification:** No - initial verification. No previous `14-VERIFICATION.md` was present.

Material guidance applied: root `AGENTS.md`, `AGENTS.bright-builds.md`, `standards-overrides.md`, pinned Bright Builds architecture, code-shape, verification, testing, and TypeScript/JavaScript standards, plus GSD verifier override/gate guidance. No repo-local `.claude/skills/` or `.agents/skills/` were present.

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Maintainer can generate or read a dated priority artifact that includes stale published records and unpublished candidate states. | VERIFIED | `bun run refresh:queue` passed and wrote `state-refresh-queue.{json,md}` plus `state-priority-queue.{json,md}`; priority JSON has 10 published refresh entries and 7 first-publication candidates. |
| 2 | Each unpublished candidate can be classified by source availability, proposal relevance, readiness, and next action without creating an unverified public state page. | VERIFIED | `content/data/state-candidate-intake.json` has 7 rows with the required fields; `parseStateCandidateIntake` validates them; `git diff --quiet -- content/states` passed. |
| 3 | Refresh and candidate-priority outputs remain under `generated/refresh/` with clear generated-artifact boundaries. | VERIFIED | `generated/refresh/README.md` documents all four generated outputs and states priority artifacts must remain under `generated/refresh/`. |
| 4 | The workflow gives a concrete first publication queue for Phase 15. | VERIFIED | `generated/refresh/state-priority-queue.md` includes `## First Publication Candidates`; JSON first-publication slugs are `florida`, `kansas`, `north-dakota`, `ohio`, `utah`, `south-dakota`, `wyoming`. |
| 5 | Maintainer can review unpublished candidate intake as controlled repo data, not public state-entry content. | VERIFIED | `content/data/README.md` states candidate intake is controlled maintainer input and not canonical public state content; no candidate files were added under `content/states/`. |
| 6 | Candidate intake rows classify source availability, proposal relevance, readiness, status, status date, official source URL availability, evidence note, next action, and deferral reason. | VERIFIED | Schema lines define the fields and enums; JSON rows include required source/status/evidence/next-action fields; deferral reason is enforced for deferred rows. |
| 7 | Ready-to-author candidates require official legislature or state-source evidence. | VERIFIED | `StateCandidateIntakeEntrySchema.superRefine` rejects ready rows without official source availability or URL; spot-check confirmed all ready generated candidates have official evidence. |
| 8 | Maintainer can see candidate readiness derived from typed intake without file I/O in the model. | VERIFIED | `candidate-priority.ts` imports `StateCandidateIntakeEntry` and exposes pure `buildCandidatePriorityModel(candidates, generatedAt)`; file I/O stays in `scripts/build-refresh-queue.ts`. |
| 9 | Unpublished candidates sort by readiness, source strength, proposal relevance, then state name. | VERIFIED | Comparator weights in `candidate-priority.ts` implement that order; `candidate-priority.test.ts` asserts ordered arrays. |
| 10 | Terminal but source-rich failed or enacted proposals remain valid first-publication candidates. | VERIFIED | Parser and model tests cover Florida terminal status; generated queue includes failed/enrolled official-source candidates as first-publication entries. |
| 11 | Combined priority modeling keeps stale published refresh work visible while still producing a concrete first publication queue. | VERIFIED | `buildCombinedPriorityQueueModel` preserves `refreshQueue.entries`, counts due entries, and includes non-deferred candidate entries. |
| 12 | Maintainer can run `bun run refresh:queue` and receive the existing published refresh queue plus new combined priority artifacts. | VERIFIED | Command passed with exact success log: `Wrote generated/refresh/state-refresh-queue.{json,md} and generated/refresh/state-priority-queue.{json,md}`. |
| 13 | Combined priority artifacts include JSON and Markdown with timestamp, summary counts, source boundaries, published refresh work, and first publication candidates. | VERIFIED | `state-priority-queue.json` and `.md` include `generatedAt`, summary counts, `sourceBoundary`, `publishedRefreshWork`, and `firstPublicationCandidates`. |
| 14 | All generated refresh and priority artifacts remain under `generated/refresh/`. | VERIFIED | Required generated files are under `generated/refresh/`; no generated artifacts were placed under `content/`. |
| 15 | Existing `state-refresh-queue.{json,md}` outputs preserve current behavior while combined artifacts are added. | VERIFIED | Existing refresh Markdown still has `State Refresh Queue`, `Review Due`, and `Review Soon`; refresh JSON still has thresholds, summary, and 10 due entries. |

**Score:** 15/15 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/lib/content/schema.ts` | Candidate intake Zod parser and exported types | VERIFIED | Exports `StateCandidateIntakeEntrySchema`, `StateCandidateIntakeSchema`, inferred types, and `parseStateCandidateIntake`. |
| `src/lib/content/schema.test.ts` | Parser regression tests | VERIFIED | Covers official ready rows, secondary-only rejection, deferral reason, impossible dates, next-action mismatch, and terminal source-rich rows. |
| `content/data/state-candidate-intake.json` | Controlled unpublished candidate intake rows | VERIFIED | Contains exactly 7 unresearched manifest slugs: Florida, Ohio, Kansas, North Dakota, South Dakota, Wyoming, Utah. |
| `content/data/README.md` | Candidate intake boundary docs | VERIFIED | Names `state-candidate-intake.json` as controlled maintainer input, not public content, parsed before use. |
| `src/lib/site/candidate-priority.ts` | Pure candidate and combined priority queue model | VERIFIED | Exports `buildCandidatePriorityModel` and `buildCombinedPriorityQueueModel`; no file I/O in model. |
| `src/lib/site/candidate-priority.test.ts` | Candidate classification and sorting tests | VERIFIED | Covers readiness ordering, source/relevance/state ties, terminal authorability, source exclusion, freshness risk, and combined model. |
| `scripts/build-refresh-queue.ts` | Generator for refresh and priority artifacts | VERIFIED | Reads candidate JSON, parses it, builds combined model, escapes Markdown rows, writes both refresh and priority outputs. |
| `generated/refresh/state-priority-queue.json` | Machine-readable combined priority queue | VERIFIED | Contains source boundary, 10 published refresh entries, 7 candidate intake entries, and 7 first-publication candidates. |
| `generated/refresh/state-priority-queue.md` | Maintainer-readable combined priority queue | VERIFIED | Includes Summary, Source Boundaries, Published Refresh Work, First Publication Candidates, and Candidate Intake Notes. |
| `generated/refresh/README.md` | Generated artifact boundary documentation | VERIFIED | Lists all four refresh/priority outputs and says priority artifacts must not replace `content/states/*.md`. |
| `generated/refresh/state-refresh-queue.json` | Existing refresh queue output preserved | VERIFIED | Still contains thresholds, summary, and due queue entries from canonical published records. |
| `generated/refresh/state-refresh-queue.md` | Existing refresh Markdown preserved | VERIFIED | Still renders `State Refresh Queue`, `Review Due`, and `Review Soon`. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `content/data/state-candidate-intake.json` | `src/lib/content/schema.ts` | `parseStateCandidateIntake` | WIRED | Candidate data parses through `parseStateCandidateIntake`; behavior spot-check returned all 7 slugs. |
| `content/data/README.md` | `content/states/*.md` boundary | Explicit non-public candidate intake note | WIRED | Manual check confirmed equivalent wording: intake is not canonical public state content and generated artifacts must not replace state records. |
| `src/lib/site/candidate-priority.ts` | `src/lib/content/schema.ts` | `StateCandidateIntakeEntry` type import | WIRED | Type-only import keeps model input tied to parsed schema contract. |
| `src/lib/site/candidate-priority.ts` | `src/lib/site/registry-freshness.ts` | `RefreshQueueModel` type import | WIRED | Combined model preserves published refresh entries with typed refresh queue input. |
| `scripts/build-refresh-queue.ts` | `content/data/state-candidate-intake.json` | `readFile` plus `parseStateCandidateIntake` | WIRED | `readCandidateIntake()` reads controlled JSON and parses it before generator use. |
| `scripts/build-refresh-queue.ts` | `src/lib/site/candidate-priority.ts` | `buildCombinedPriorityQueueModel` | WIRED | Generator passes refresh queue and parsed candidates into the pure combined model. |
| `scripts/build-refresh-queue.ts` | `generated/refresh/state-priority-queue.json` | `writeFile` | WIRED | Manual check found `priorityJsonPath = path.join(outputDir, "state-priority-queue.json")` and `writeFile(priorityJsonPath, ...)`. |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| `src/lib/content/schema.ts` | `StateCandidateIntake.candidates` | `content/data/state-candidate-intake.json` | Yes - parser spot-check returned 7 real candidate rows. | FLOWING |
| `src/lib/site/candidate-priority.ts` | `CandidatePriorityModel.entries` | Parsed candidate rows passed into `buildCandidatePriorityModel` | Yes - generated model has 7 entries with ranks, risks, authorability, and reasons. | FLOWING |
| `src/lib/site/candidate-priority.ts` | `publishedRefreshWork` | `RefreshQueueModel.entries` from `getRefreshQueueModel()` | Yes - generated combined model has 10 published refresh entries. | FLOWING |
| `scripts/build-refresh-queue.ts` | `priorityQueue` | Parsed intake plus refresh queue passed to `buildCombinedPriorityQueueModel` | Yes - recomputed model matched `generated/refresh/state-priority-queue.json`. | FLOWING |
| `generated/refresh/state-priority-queue.md` | Markdown tables | `renderPriorityMarkdown(priorityQueue)` | Yes - Markdown includes timestamp, summary counts, source boundary, refresh work, first publication candidates, and intake notes. | FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Format check passes | `bun run format:check` | Exit 0; Biome checked 55 files, no fixes applied. | PASS |
| Lint passes | `bun run lint` | Exit 0; Biome checked 55 files with `--error-on-warnings`, no fixes applied. | PASS |
| TypeScript passes | `bunx tsc --noEmit` | Exit 0. | PASS |
| Content validation passes | `bun run validate:content` | Exit 0; validated 4 documents, 50 manifest entries, 10 published state entries. | PASS |
| Content compilation passes | `bun run compile:content` | Exit 0; compiled 4 documents and 10 state entries. | PASS |
| Refresh queue generation passes | `bun run refresh:queue` | Exit 0; wrote refresh and priority queue JSON/Markdown artifacts. | PASS |
| Test suite passes | `bun test` | Exit 0; `38 pass`, `0 fail`, 77 expectations across 4 files. | PASS |
| Production build passes | `bun run build` | Exit 0; Vinxi built SSR, client, server-fns, and prerendered 17 routes. | PASS |
| Precommit passes | `bun run precommit` | Exit 0; formatting, lint, content validation, compile, refresh queue, and PDF checks passed. | PASS |
| Public state content unchanged | `git diff --quiet -- content/states` | Exit 0. | PASS |
| Candidate intake parses | `bun -e 'import { parseStateCandidateIntake } ...'` | Exit 0; returned all 7 expected candidate slugs. | PASS |
| Generated priority output is current | Recompute combined model from current source data and compare to JSON | Exit 0; generated priority artifact matches current model. | PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| CATA-10 | 14-01, 14-02 | Maintainer can triage unpublished state manifest entries by source availability, proposal relevance, freshness risk, readiness, and explicit deferral reason. | SATISFIED | Candidate JSON and schema cover source/relevance/readiness/status/evidence/next action/deferral; pure model derives freshness risk and reasons. |
| CATA-11 | 14-02, 14-03 | Maintainer can identify next best publication candidates from a queue/report considering unpublished candidates and stale published records. | SATISFIED | Combined priority JSON/Markdown includes 10 published refresh records and 7 ranked first-publication candidates. |
| REFR-04 | 14-02, 14-03 | Refresh workflow output prioritizes stale published records and promising unpublished candidates with transparent reasons. | SATISFIED | Published refresh work is preserved with reasons; first-publication candidates include source/relevance/freshness reasons. |
| REFR-06 | 14-01, 14-03 | Generated refresh and candidate-priority artifacts remain clearly dated and outside canonical published state content. | SATISFIED | Priority artifacts include `generatedAt`; docs define generated boundary; `git diff --quiet -- content/states` passed. |

No orphaned Phase 14 requirements were found in `.planning/REQUIREMENTS.md`; CATA-10, CATA-11, REFR-04, and REFR-06 all appear in Phase 14 plans.

### Code Review Closure

| Review Item | Status | Evidence |
|-------------|--------|----------|
| WR-01 invalid calendar dates | RESOLVED | `isValidIsoDate` refinement exists and tests reject `2026-02-30` and `2026-99-99`. |
| WR-02 readiness and next action disagreement | RESOLVED | `expectedNextActionByReadiness` is enforced in schema refinement and tested. |
| WR-03 Markdown table cell escaping | RESOLVED | `renderMarkdownRow` routes generated table rows through `escapeMarkdownCell`. |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `scripts/build-refresh-queue.ts` | 235 | `console.log` | Info | Expected CLI success log, not a stub or console-only implementation. |

No TODO/FIXME/placeholder stubs, hardcoded empty rendered data, orphaned core artifacts, or blocker anti-patterns were found in the Phase 14 files.

### Human Verification Required

None. Phase 14 produces repo-owned data/model/generated artifacts, and automated evidence was sufficient to verify the goal.

### Gaps Summary

No gaps found. All roadmap success criteria, plan must-haves, key links, requirement mappings, review-warning closures, and requested verification commands passed.

---

_Verified: 2026-05-27T14:47:21Z_
_Verifier: the agent (gsd-verifier)_
