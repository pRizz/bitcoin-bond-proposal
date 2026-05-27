# Phase 14: Candidate Priority and Refresh Intake - Research

**Researched:** 2026-05-27
**Domain:** TypeScript content-data modeling, generated refresh artifacts, maintainer priority queues
**Confidence:** HIGH

<user_constraints>

## User Constraints (from CONTEXT.md)

The following section is copied from `.planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md`. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]

### Locked Decisions

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

### Deferred Ideas (OUT OF SCOPE)

- Creating public state-detail pages for the newly ranked candidates belongs to Phase 15.
- Recording final deferral reasons for all remaining high-interest states belongs to Phase 16.
- Catalog, cluster, and comparison surface changes for the expanded count belong to Phase 17 unless Phase 14 implementation needs a narrow maintainer-only preview.

</user_constraints>

<phase_requirements>

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CATA-10 | Maintainer can triage unpublished state manifest entries by source availability, proposal relevance, freshness risk, readiness, and explicit deferral reason. [VERIFIED: .planning/REQUIREMENTS.md] | Add `content/data/state-candidate-intake.json`, parse it with Zod at the boundary, derive freshness risk in a pure TypeScript model, and require a deferral reason for deferred rows. [VERIFIED: .planning/REQUIREMENTS.md; content/data/README.md; src/lib/content/schema.ts; CITED: https://zod.dev/packages/zod] |
| CATA-11 | Maintainer can identify the next best publication candidates from a queue or report that considers both unpublished candidates and stale published records. [VERIFIED: .planning/REQUIREMENTS.md] | Extend `bun run refresh:queue` to keep existing refresh files and add combined JSON/Markdown priority artifacts under `generated/refresh/`. [VERIFIED: scripts/build-refresh-queue.ts; generated/refresh/README.md; .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md] |
| REFR-04 | Refresh workflow output prioritizes stale published records and promising unpublished candidates with transparent reasons instead of manual guesswork. [VERIFIED: .planning/REQUIREMENTS.md] | Reuse `buildRefreshQueueModel` for published due/aging work, then append a ranked candidate subqueue with explicit reasons. [VERIFIED: src/lib/site/registry-freshness.ts; src/lib/site/registry-freshness.test.ts] |
| REFR-06 | Generated refresh and candidate-priority artifacts remain clearly dated and outside canonical published state content. [VERIFIED: .planning/REQUIREMENTS.md] | Write new generated files only under `generated/refresh/`, and update `generated/refresh/README.md` to name the generated boundary. [VERIFIED: generated/refresh/README.md; content/data/README.md] |

</phase_requirements>

## Project Constraints (from AGENTS.md)

- `AGENTS.md` requires loading `AGENTS.bright-builds.md`, `standards-overrides.md`, and relevant pinned Bright Builds standards before plan, review, implementation, or audit work. [VERIFIED: AGENTS.md; AGENTS.bright-builds.md; standards-overrides.md]
- Bright Builds defaults favor functional core / imperative shell for business logic, parsing boundary data into domain types, unit-testing pure business logic, and keeping I/O in thin adapters. [VERIFIED: AGENTS.bright-builds.md; CITED: https://github.com/bright-builds-llc/bright-builds-rules/blob/05f8d7a6c9c2e157ec4f922a05273e72dab97676/standards/core/architecture.md]
- Bright Builds code-shape rules favor early returns, intentional nullable naming with `maybe`, and splitting functions that grow beyond the local readability threshold. [VERIFIED: AGENTS.bright-builds.md; CITED: https://github.com/bright-builds-llc/bright-builds-rules/blob/05f8d7a6c9c2e157ec4f922a05273e72dab97676/standards/core/code-shape.md]
- Before commit, Bright Builds requires relevant repo-native verification for the changed paths, and this repo exposes `bun run precommit` as the aggregate local guard. [VERIFIED: AGENTS.bright-builds.md; scripts/precommit.ts; CITED: https://github.com/bright-builds-llc/bright-builds-rules/blob/05f8d7a6c9c2e157ec4f922a05273e72dab97676/standards/core/verification.md]
- The root TypeScript/JavaScript guidance says to respect the existing lock file and package manager, and this repo uses Bun with `bun.lock`. [VERIFIED: AGENTS.md; package.json; bun.lock]
- No project-local `.claude/skills/` or `.agents/skills/` directories were found. [VERIFIED: local `find .claude/skills .agents/skills -maxdepth 2 -name SKILL.md`]

## Summary

Phase 14 should be planned as a narrow maintainer-workflow extension, not a public-content expansion. [VERIFIED: .planning/ROADMAP.md; .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md] The existing refresh generator already writes dated JSON and Markdown outputs under `generated/refresh/`, and the existing freshness model already produces deterministic due/aging published-record entries. [VERIFIED: scripts/build-refresh-queue.ts; src/lib/site/registry-freshness.ts; generated/refresh/state-refresh-queue.json]

Use a controlled candidate intake JSON file in `content/data/`, parse it with a Zod schema at the content boundary, derive candidate freshness risk from dated status fields in the pure model, require deferral reasons for deferred rows, and keep the generator script as the imperative shell that reads typed inputs and writes generated artifacts. [VERIFIED: .planning/REQUIREMENTS.md; content/data/README.md; src/lib/content/schema.ts; scripts/build-refresh-queue.ts; CITED: https://github.com/bright-builds-llc/bright-builds-rules/blob/05f8d7a6c9c2e157ec4f922a05273e72dab97676/standards/core/architecture.md] Do not create `content/states/*.md` files, route data, or public placeholder pages in Phase 14. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md; content/data/state-registry-manifest.README.md]

**Primary recommendation:** Create `src/lib/site/candidate-priority.ts` plus `src/lib/site/candidate-priority.test.ts`, add `content/data/state-candidate-intake.json`, extend `scripts/build-refresh-queue.ts` to emit `generated/refresh/state-priority-queue.{json,md}`, and document the new generated files in `generated/refresh/README.md`. [VERIFIED: src/lib/site/registry-freshness.ts; src/lib/site/registry-freshness.test.ts; scripts/build-refresh-queue.ts; generated/refresh/README.md]

## Standard Stack

### Core

| Library / Tool | Version | Purpose | Why Standard |
|----------------|---------|---------|--------------|
| Bun | 1.3.9 local runtime and `packageManager` | Run TypeScript scripts, package scripts, and tests. | Existing repo scripts use Bun, Bun runs TypeScript files directly, and `bun test` is already the test runner. [VERIFIED: package.json; local `bun --version`; CITED: https://bun.sh/docs/runtime; CITED: https://bun.sh/docs/test/writing] |
| TypeScript | 6.0.2 locked; npm latest 6.0.3 on 2026-05-27 | Strict domain types for candidate intake and priority models. | The repo has `strict`, `noUncheckedIndexedAccess`, `resolveJsonModule`, and `noEmit` enabled. [VERIFIED: tsconfig.json; bun.lock; npm registry] |
| Zod | 4.3.6 locked; npm latest 4.4.3 on 2026-05-27 | Parse controlled JSON intake and enforce date/URL/enums at the boundary. | Existing content schema uses Zod parsing helpers, and Zod 4 documents `parse` / `safeParse` as schema parsing APIs. [VERIFIED: src/lib/content/schema.ts; bun.lock; npm registry; CITED: https://zod.dev/packages/zod] |
| Bun test | 1.3.9 | Unit-test pure candidate classification and sorting. | Existing pure model tests import `expect` and `test` from `bun:test`, and a local run passed 24 tests. [VERIFIED: src/lib/site/registry-freshness.test.ts; local `bun test --version` run; CITED: https://bun.sh/docs/test/writing] |
| Biome | 2.4.10 locked; npm latest 2.4.16 on 2026-05-27 | Formatting and linting through existing package scripts. | The repo uses `bunx @biomejs/biome` for format checks and lint, and Biome supports `--error-on-warnings`. [VERIFIED: package.json; biome.jsonc; local `bunx @biomejs/biome --version`; CITED: https://biomejs.dev/reference/cli/] |

### Supporting

| Library / Tool | Version | Purpose | When to Use |
|----------------|---------|---------|-------------|
| SolidStart / SolidJS | `@solidjs/start` 1.3.2 locked; `solid-js` 1.9.12 locked | Existing public site runtime. | Do not touch public routes in Phase 14 unless a maintainer-only generated-artifact doc link is unavoidable. [VERIFIED: package.json; bun.lock; .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md] |
| Vinxi / Vite | `vinxi` 0.5.11 locked; `vite` 8.0.3 locked | Existing production build tooling. | Use only for verification with `bun run build`; do not add route-specific exceptions. [VERIFIED: package.json; bun.lock] |
| Official legislature/state pages | Florida, Ohio, Kansas, North Dakota, South Dakota, Wyoming, and Utah official sources were reachable or partially reachable during research. | Seed candidate intake with official-source availability evidence. | Use official pages or official PDFs as candidate evidence; use secondary sources only as explanatory context. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md; CITED: https://www.flsenate.gov/Session/Bill/2025/550; CITED: https://www.legislature.ohio.gov/legislation/136/hb18; CITED: https://kslegislature.gov/b2025_26/bills/sb352/; CITED: https://ndlegis.gov/assembly/69-2025/regular/bill-overview/bo1184.html?bill_number=1184&bill_year=2025; CITED: https://mylrc.sdlegislature.gov/api/Documents/298084.pdf; CITED: https://wyoleg.gov/2025/Introduced/HB0201.pdf; CITED: https://le.utah.gov/Session/2025/bills/enrolled/HB0230.pdf] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Controlled JSON intake in `content/data/` | Hard-code candidates in `scripts/build-refresh-queue.ts` | Hard-coding would bury maintained data inside a generator and make candidate diffs harder to review. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md; content/data/README.md] |
| Pure model plus generator shell | Put classification logic directly in the script | Script-only logic would be harder to unit-test and would violate the existing pure-model pattern. [VERIFIED: src/lib/site/registry-freshness.ts; src/lib/site/registry-freshness.test.ts; CITED: https://github.com/bright-builds-llc/bright-builds-rules/blob/05f8d7a6c9c2e157ec4f922a05273e72dab97676/standards/core/architecture.md] |
| Generated artifacts under `generated/refresh/` | Canonical candidate pages under `content/states/` | Public pages are explicitly out of scope for Phase 14, and generated refresh outputs already have a documented boundary. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md; generated/refresh/README.md] |
| Repo-owned snapshot intake | Live web scraping in the generator | Live scraping would imply a pseudo-live tracking system and would add network flakiness to a deterministic artifact build. [VERIFIED: .planning/PROJECT.md; .planning/REQUIREMENTS.md; generated/refresh/README.md] |

**Installation:**

```bash
# No new packages are recommended for Phase 14.
bun install
```

**Version verification:**

```bash
bun --version
bunx tsc --version
bunx @biomejs/biome --version
npm view zod version time.modified --json
npm view @biomejs/biome version time.modified --json
npm view typescript version time.modified --json
```

The locked dependency versions are adequate for the phase, and no dependency upgrade is required to plan the work. [VERIFIED: package.json; bun.lock; npm registry]

## Architecture Patterns

### Recommended Project Structure

```text
content/data/
├── state-candidate-intake.json          # controlled maintainer input, not public state prose
├── README.md                            # add candidate-intake ownership note
└── state-registry-manifest.json         # existing 50-state skeleton

src/lib/content/
└── schema.ts                            # add candidate intake schema + parser

src/lib/site/
├── candidate-priority.ts                # pure classification and ranking model
├── candidate-priority.test.ts           # focused Bun unit tests
├── registry-freshness.ts                # existing published refresh model
└── content.ts                           # keep public accessors unchanged unless a non-public script accessor is needed

scripts/
└── build-refresh-queue.ts               # read typed candidate input; write all refresh/priority generated outputs

generated/refresh/
├── state-refresh-queue.json             # existing output preserved
├── state-refresh-queue.md               # existing output preserved
├── state-priority-queue.json            # new combined machine-readable artifact
├── state-priority-queue.md              # new maintainer-readable artifact
└── README.md                            # update generated boundary documentation
```

This structure matches existing ownership boundaries: controlled source data under `content/data/`, pure model logic under `src/lib/site/`, imperative generation under `scripts/`, and generated maintainer artifacts under `generated/refresh/`. [VERIFIED: content/data/README.md; src/lib/site/registry-freshness.ts; scripts/build-refresh-queue.ts; generated/refresh/README.md]

### Pattern 1: Parse Candidate Intake at the Boundary

**What:** Define a Zod schema for candidate intake rows and export a `parseStateCandidateIntake` helper from the content schema layer. [VERIFIED: src/lib/content/schema.ts; CITED: https://zod.dev/packages/zod]
**When to use:** Use this when `scripts/build-refresh-queue.ts` reads `content/data/state-candidate-intake.json`. [VERIFIED: scripts/build-refresh-queue.ts; content/data/README.md]
**Example:**

```typescript
// Source: existing schema.ts Zod parser pattern + Zod parse API.
const CandidateReadinessSchema = z.enum([
	"ready-to-author",
	"needs-status-confirmation",
	"defer",
]);

const StateCandidateIntakeEntrySchema = z.object({
	state: NonEmptyStringSchema,
	slug: SlugSchema,
	sourceAvailability: z.enum([
		"official-bill-page",
		"official-pdf-only",
		"secondary-only",
		"none-found",
	]),
	proposalRelevance: z.enum(["high", "medium", "low"]),
	readiness: CandidateReadinessSchema,
	status: NonEmptyStringSchema,
	statusAsOf: IsoDateSchema,
	officialSourceUrl: SourceLinkSchema,
	evidenceNote: NonEmptyStringSchema,
	nextAction: NonEmptyStringSchema,
	deferralReason: z.string().trim().optional(),
});
```

This example should be adapted to exact enum labels chosen in planning, but it should keep official-source availability, readiness, status date, next action, and deferral reason explicit. [VERIFIED: .planning/REQUIREMENTS.md; .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]

### Pattern 2: Pure Priority Model, Thin Generator Shell

**What:** Implement `buildCandidatePriorityModel` and `buildCombinedPriorityQueueModel` as data-in/data-out functions that accept typed candidate entries, existing refresh entries, and `generatedAt`. [VERIFIED: src/lib/site/registry-freshness.ts; AGENTS.bright-builds.md]
**When to use:** Use this for classification, candidate freshness-risk derivation, reason generation, summary counts, and deterministic sorting. [VERIFIED: .planning/REQUIREMENTS.md; .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md; src/lib/site/registry-freshness.test.ts]
**Example:**

```typescript
// Source: existing buildRefreshQueueModel sorting style.
export function buildCandidatePriorityModel(
	candidates: ReadonlyArray<StateCandidateIntakeEntry>,
): CandidatePriorityEntry[] {
	return candidates
		.map((candidate) => ({
			...candidate,
			reasons: buildCandidateReasons(candidate),
			sortKey: getCandidateSortKey(candidate),
		}))
		.sort((left, right) => {
			const readinessDelta = left.sortKey.readiness - right.sortKey.readiness;
			if (readinessDelta !== 0) {
				return readinessDelta;
			}

			const sourceDelta = left.sortKey.sourceStrength - right.sortKey.sourceStrength;
			if (sourceDelta !== 0) {
				return sourceDelta;
			}

			const relevanceDelta = left.sortKey.relevance - right.sortKey.relevance;
			if (relevanceDelta !== 0) {
				return relevanceDelta;
			}

			return left.state.localeCompare(right.state);
		});
}
```

This model keeps the D-09 sorting rule testable without file I/O. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md; src/lib/site/registry-freshness.test.ts]

### Pattern 3: Preserve Existing Refresh Outputs

**What:** Keep `state-refresh-queue.{json,md}` generation byte-for-byte compatible except for normal date regeneration, and add new `state-priority-queue.{json,md}` outputs. [VERIFIED: scripts/build-refresh-queue.ts; .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
**When to use:** Use this in `scripts/build-refresh-queue.ts` so `bun run refresh:queue` remains the single refresh generation command. [VERIFIED: package.json; scripts/build-refresh-queue.ts]
**Example:**

```typescript
// Source: existing scripts/build-refresh-queue.ts Promise.all write pattern.
await Promise.all([
	writeFile(refreshJsonPath, `${JSON.stringify(refreshQueue, null, "\t")}\n`),
	writeFile(refreshMarkdownPath, renderRefreshMarkdown(refreshQueue)),
	writeFile(priorityJsonPath, `${JSON.stringify(priorityQueue, null, "\t")}\n`),
	writeFile(priorityMarkdownPath, renderPriorityMarkdown(priorityQueue)),
]);
```

This keeps the existing published-record workflow intact while adding the combined maintainer artifact. [VERIFIED: scripts/build-refresh-queue.ts; .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]

### Anti-Patterns to Avoid

- **Public placeholders:** Do not create `content/states/*.md` files, route data, or placeholder state pages in Phase 14. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
- **Secondary-source readiness:** Do not allow secondary-only coverage to mark a candidate as ready to author. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
- **Flat opaque scores:** Do not collapse refresh work and candidate work into one unexplained numeric score; the artifact needs separate sections and transparent reasons. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
- **Generated data in `content/`:** Do not write priority output into `content/data/`; generated refresh artifacts belong under `generated/refresh/`. [VERIFIED: content/data/README.md; generated/refresh/README.md]
- **Live scraping during generation:** Do not fetch official pages during `bun run refresh:queue`; candidate intake should be a repo-controlled snapshot. [VERIFIED: .planning/PROJECT.md; .planning/REQUIREMENTS.md; generated/refresh/README.md]

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| JSON validation | Ad hoc `typeof` checks scattered through the generator | Zod schema and parser in `src/lib/content/schema.ts` | Existing content boundaries already parse with Zod, and Zod documents typed schema parsing APIs. [VERIFIED: src/lib/content/schema.ts; CITED: https://zod.dev/packages/zod] |
| Published refresh prioritization | A second stale-record sorter | Existing `buildRefreshQueueModel` | Existing model already classifies current/aging/due entries and sorts due active records before lower-priority entries. [VERIFIED: src/lib/site/registry-freshness.ts; src/lib/site/registry-freshness.test.ts] |
| Candidate persistence | A database, admin UI, or external tracker | `content/data/state-candidate-intake.json` | The milestone keeps repo-owned content and generated artifacts as the workflow model. [VERIFIED: .planning/PROJECT.md; .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md] |
| Candidate source discovery | Network scraping in the refresh generator | Human-maintained official-source URLs in controlled data | The project explicitly prefers dated snapshots over pseudo-live tracking. [VERIFIED: .planning/PROJECT.md; .planning/REQUIREMENTS.md] |
| Public publication gate | Placeholder route creation from candidate rows | Existing canonical `content/states/*.md` publication path in later phases | Phase 14 is maintainer guidance only, and public state entries remain canonical Markdown. [VERIFIED: .planning/ROADMAP.md; content/data/state-registry-manifest.README.md] |
| Markdown rendering | Complex templating library | Existing string renderer style in `scripts/build-refresh-queue.ts` | Current generator uses simple deterministic Markdown rendering without extra dependencies. [VERIFIED: scripts/build-refresh-queue.ts; package.json] |

**Key insight:** The hard part is not a new library; it is preserving the content boundary between controlled candidate intake, generated maintainer artifacts, and public canonical state pages. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md; content/data/README.md; generated/refresh/README.md]

## Candidate Source Snapshot

| Candidate | Official Evidence Checked | Planning Implication |
|-----------|---------------------------|----------------------|
| Florida | The Florida Senate pages for SB 550 and HB 487 show official bill text links and June 16, 2025 died statuses. [CITED: https://www.flsenate.gov/Session/Bill/2025/550; CITED: https://www.flsenate.gov/Session/Bill/2025/487] | Source-rich terminal candidate; classify as eligible to author if the intake row records failed status and official source trail. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md] |
| Ohio | The Ohio HB 18 page identifies the Ohio Strategic Cryptocurrency Reserve Act, shows the current version, and marks the bill as in House committee. [CITED: https://www.legislature.ohio.gov/legislation/136/hb18] | Active official-source candidate; prioritize only after stale published blockers per D-08. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md] |
| Kansas | The Kansas SB 352 page identifies a bitcoin and digital assets reserve fund bill, marks it died, and lists official committee testimony. [CITED: https://kslegislature.gov/b2025_26/bills/sb352/] | Source-rich terminal candidate; candidate output should explain failed posture and official evidence. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md] |
| North Dakota | The North Dakota HB 1184 overview marks the measure failed and lists the last official action as failed second reading. [CITED: https://ndlegis.gov/assembly/69-2025/regular/bill-overview/bo1184.html?bill_number=1184&bill_year=2025] | Source-rich terminal candidate; ready if official text/source URL is captured in intake. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md] |
| South Dakota | The official HB 1155 PDF describes a 2026 bill to permit state investment in Bitcoin, and the official status report shows committee deferral to the 41st legislative day. [CITED: https://mylrc.sdlegislature.gov/api/Documents/298084.pdf; CITED: https://sdlegislature.gov/Session/BillStatus/71] | Candidate should likely use `needs-status-confirmation` or equivalent until the intake records status from the official bill-status source. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md] |
| Wyoming | The official HB0201 PDF authorizes investment of state funds and permanent funds in Bitcoin, but the official summary page did not expose status text through static fetch during research. [CITED: https://wyoleg.gov/2025/Introduced/HB0201.pdf; CITED: https://www.wyoleg.gov/Legislation/2025/HB0201] | Intake should mark official text available and set next action to confirm final status before authoring. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md] |
| Utah | The official HB 230 static page and enrolled PDF are available, and the enrolled PDF is broader blockchain/digital innovation legislation with official effective-date text. [CITED: https://le.utah.gov/Session/2025/bills/static/HB0230.html; CITED: https://le.utah.gov/Session/2025/bills/enrolled/HB0230.pdf] | Intake should preserve evidence while making proposal relevance explicit because final enrolled content may not match a narrow Bitcoin-reserve candidate. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md] |

## Common Pitfalls

### Pitfall 1: Public Content Leakage

**What goes wrong:** Candidate data is treated as public state content or a placeholder page. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
**Why it happens:** The manifest already has all 50 state slugs, so it is easy to confuse an intake row with a publishable state entry. [VERIFIED: content/data/state-registry-manifest.json; content/data/state-registry-manifest.README.md]
**How to avoid:** Keep candidate intake under `content/data/`, generate outputs under `generated/refresh/`, and leave `content/states/` unchanged in Phase 14. [VERIFIED: content/data/README.md; generated/refresh/README.md; .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
**Warning signs:** A Phase 14 diff adds `content/states/*.md`, changes route code, or adds public links to candidate-only rows. [VERIFIED: .planning/ROADMAP.md; .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]

### Pitfall 2: Secondary Sources Accidentally Become Readiness Gates

**What goes wrong:** A candidate with only media or tracker coverage gets ranked as ready to author. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
**Why it happens:** Several candidate states have easy-to-find secondary summaries, but D-06 requires official legislature or state-source availability. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
**How to avoid:** Encode source availability as a controlled enum and make `ready-to-author` impossible when availability is `secondary-only` or `none-found`. [VERIFIED: src/lib/content/schema.ts; .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
**Warning signs:** A test fixture marks `secondary-only` as ready, or generated reasons omit official-source status. [VERIFIED: src/lib/site/registry-freshness.test.ts]

### Pitfall 3: Existing Refresh Queue Regresses

**What goes wrong:** The new combined artifact changes the shape or sort order of `state-refresh-queue.{json,md}`. [VERIFIED: scripts/build-refresh-queue.ts; generated/refresh/state-refresh-queue.json]
**Why it happens:** It is tempting to merge candidate and refresh logic directly into the current refresh renderer. [VERIFIED: scripts/build-refresh-queue.ts]
**How to avoid:** Preserve `getRefreshQueueModel` and existing render behavior, then add separate priority renderers. [VERIFIED: src/lib/site/content.ts; scripts/build-refresh-queue.ts]
**Warning signs:** Existing refresh tests fail, generated `state-refresh-queue.json` loses `thresholds`, or existing Markdown sections are renamed. [VERIFIED: src/lib/site/registry-freshness.test.ts; generated/refresh/state-refresh-queue.md]

### Pitfall 4: Deferral and Freshness Risk Are Not Visible

**What goes wrong:** Candidate rows show readiness but do not explain freshness risk or why a high-interest state is deferred. [VERIFIED: .planning/REQUIREMENTS.md]
**Why it happens:** D-05 lists candidate status and status date, but CATA-10 also requires freshness-risk triage and explicit deferral reasons. [VERIFIED: .planning/REQUIREMENTS.md; .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
**How to avoid:** Derive a `freshnessRisk` or equivalent output field from `statusAsOf` and `generatedAt`, and require `deferralReason` when readiness is `defer` or source availability is insufficient. [VERIFIED: src/lib/site/registry-freshness.ts; .planning/REQUIREMENTS.md]
**Warning signs:** Generated candidate rows have a `nextAction` but no stale-status warning or deferral explanation. [VERIFIED: .planning/REQUIREMENTS.md]

### Pitfall 5: Non-Deterministic Candidate Ordering

**What goes wrong:** Candidate order changes between runs with the same source data. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
**Why it happens:** Sorting only by a coarse readiness label leaves ties dependent on input order. [VERIFIED: src/lib/site/registry-freshness.ts]
**How to avoid:** Sort by readiness, source strength, proposal relevance, and then state name exactly as D-09 requires. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
**Warning signs:** Tests assert only membership rather than full ordered arrays. [VERIFIED: src/lib/site/registry-freshness.test.ts]

### Pitfall 6: Typecheck Does Not Cover Test Files

**What goes wrong:** Planner assumes `tsc --noEmit` validates tests. [VERIFIED: tsconfig.json]
**Why it happens:** `tsconfig.json` excludes `src/**/*.test.ts`. [VERIFIED: tsconfig.json]
**How to avoid:** Run both `bunx tsc --noEmit` and `bun test`; keep model tests compile-safe through Bun's test runner. [VERIFIED: package.json; local `bun test --version` run]
**Warning signs:** A failing test import or type error appears only when running `bun test`. [VERIFIED: src/lib/site/*.test.ts; tsconfig.json]

## Code Examples

Verified patterns from local source and official docs:

### Boundary Parser

```typescript
// Source: src/lib/content/schema.ts and Zod docs.
export function parseStateCandidateIntake(
	rawCandidates: unknown,
): StateCandidateIntake {
	return StateCandidateIntakeSchema.parse(rawCandidates);
}
```

Use this shape because existing content parsing helpers return domain-typed data after one boundary parse. [VERIFIED: src/lib/content/schema.ts; CITED: https://zod.dev/packages/zod]

### Focused Model Test

```typescript
// Source: src/lib/site/registry-freshness.test.ts and Bun test docs.
test("ready official candidates sort ahead of status-confirmation candidates", () => {
	// Arrange
	const candidates = [
		buildCandidateFixture({
			state: "Wyoming",
			readiness: "needs-status-confirmation",
			sourceAvailability: "official-pdf-only",
			proposalRelevance: "high",
		}),
		buildCandidateFixture({
			state: "Ohio",
			readiness: "ready-to-author",
			sourceAvailability: "official-bill-page",
			proposalRelevance: "high",
		}),
	];

	// Act
	const model = buildCandidatePriorityModel(candidates);

	// Assert
	expect(model.map((entry) => entry.state)).toEqual(["Ohio", "Wyoming"]);
});
```

Use full ordered assertions because D-09 requires deterministic ranking. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md; src/lib/site/registry-freshness.test.ts; CITED: https://bun.sh/docs/test/writing]

### Generated Markdown Sections

```typescript
// Source: scripts/build-refresh-queue.ts renderQueueSection pattern.
function renderCandidateSection(entries: CandidatePriorityEntry[]): string {
	if (!entries.length) {
		return "## First Publication Candidates\n\nNone.\n";
	}

	return `## First Publication Candidates

| Rank | State | Readiness | Official source | Next action | Reasons |
|------|-------|-----------|-----------------|-------------|---------|
${entries
	.map((entry, index) => renderCandidateRow(index + 1, entry))
	.join("\n")}
`;
}
```

Use simple deterministic Markdown rendering because existing refresh output uses that pattern and the artifact is maintainer-readable, not a public UI. [VERIFIED: scripts/build-refresh-queue.ts; generated/refresh/README.md]

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Published-only refresh queue | Combined maintainer priority artifact with separate published-refresh and candidate-publication sections | Phase 14 planned for v1.3 [VERIFIED: .planning/ROADMAP.md] | Maintainers can choose Phase 15 work from stale published blockers and unpublished candidates without public placeholder pages. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md] |
| Manual candidate judgment outside repo | Controlled candidate intake JSON plus generated dated output | Phase 14 planned for v1.3 [VERIFIED: .planning/ROADMAP.md] | Candidate readiness becomes reviewable in diffs while remaining outside canonical state entries. [VERIFIED: content/data/README.md; .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md] |
| Live legislative tracking temptation | Dated snapshot intake and generated refresh artifacts | Existing project trust model before Phase 14 [VERIFIED: .planning/PROJECT.md; generated/refresh/README.md] | The site avoids implying real-time certainty and keeps official-source checks explicit. [VERIFIED: .planning/PROJECT.md; .planning/REQUIREMENTS.md] |

**Deprecated/outdated for this phase:**

- Placeholder public pages for candidates are out of scope. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
- Database-first intake and admin UI are out of scope for v1.3. [VERIFIED: .planning/PROJECT.md; .planning/REQUIREMENTS.md]
- Live source-fetch automation is out of scope for v1.3. [VERIFIED: .planning/REQUIREMENTS.md]

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|

All claims in this research were verified against local files, local commands, npm registry output, official documentation, or official legislature/state pages; no `[ASSUMED]` claims are present. [VERIFIED: local research commands; web sources listed below]

## Open Questions (RESOLVED)

1. **Exact candidate enum names — RESOLVED**
   - What we know: D-05 requires source availability, proposal relevance, readiness, status, status date, official source URL, evidence note, and next action. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
   - Resolution: Use the enum strings specified in `14-01-PLAN.md`: `official-bill-page`, `official-pdf-only`, `official-state-record`, `secondary-only`, `none-found`; `high`, `medium`, `low`; `ready-to-author`, `needs-status-confirmation`, `defer`; `author-state-entry`, `confirm-final-status`, `defer-until-stronger-official-source`.
   - Recommendation: Use short stable enum values in JSON and human-readable labels only in Markdown renderers. [VERIFIED: src/lib/content/schema.ts; scripts/build-refresh-queue.ts]

2. **Whether to expose combined priority through `src/lib/site/content.ts` — RESOLVED**
   - What we know: Existing `content.ts` exposes `getRefreshQueueModel()` to scripts from the compiled content graph. [VERIFIED: src/lib/site/content.ts]
   - Resolution: Do not expose candidate priority through `src/lib/site/content.ts` in Phase 14. Let `scripts/build-refresh-queue.ts` read `content/data/state-candidate-intake.json` through `parseStateCandidateIntake` and pass typed rows into `src/lib/site/candidate-priority.ts`.
   - Recommendation: Let `scripts/build-refresh-queue.ts` read candidate intake directly through a content parser and pass typed data into the pure model. [VERIFIED: scripts/build-refresh-queue.ts; src/lib/content/schema.ts]

3. **How many candidates belong in the first publication queue — RESOLVED**
   - What we know: D-03 requires a concrete first publication queue for Phase 15. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]
   - Resolution: Include all ready or near-ready candidate rows in deterministic priority order; do not hard-code a top-N cutoff. The seeded Phase 14 intake contains seven candidates, and the generated artifact should surface their order and summary counts.
   - Recommendation: Generate a ranked list of all ready or near-ready candidates and include summary counts instead of hard-coding a top-N limit. [VERIFIED: .planning/ROADMAP.md; .planning/REQUIREMENTS.md]

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Bun | Scripts, tests, package runner | yes | 1.3.9 | Blocking if missing; install Bun matching `packageManager`. [VERIFIED: local `bun --version`; package.json] |
| Node.js | GSD tooling and npm registry checks | yes | v24.13.0 | Use Bun for project scripts; Node still needed for GSD init tooling. [VERIFIED: local `node --version`; GSD init command] |
| npm | Registry version verification | yes | 11.6.2 | Use package lock metadata if registry is unavailable. [VERIFIED: local `npm --version`; npm registry commands] |
| Git | Diff review and optional research commit | yes | 2.53.0 | Blocking for commit workflow. [VERIFIED: local `git --version`] |
| TypeScript CLI | Typecheck | yes | 6.0.2 | Use `bunx tsc --noEmit`; no fallback needed. [VERIFIED: local `bunx tsc --version`; bun.lock] |
| Biome CLI | Format/lint | yes | 2.4.10 | Use repo scripts; no fallback needed. [VERIFIED: local `bunx @biomejs/biome --version`; package.json] |
| Official candidate pages | Intake evidence | partially | Florida, Ohio, Kansas, North Dakota, South Dakota PDF/status, Wyoming PDF, Utah static/PDF were reachable; Wyoming summary and South Dakota SPA route had limited static extraction. | Store status-confirmation next actions in intake for pages with limited static extraction. [CITED: official candidate URLs listed in Candidate Source Snapshot] |

**Missing dependencies with no fallback:**

- None found for planning Phase 14. [VERIFIED: Environment Availability commands above]

**Missing dependencies with fallback:**

- Static extraction for some legislature SPA pages was incomplete, but official PDFs and status pages provide a fallback evidence path. [CITED: https://sdlegislature.gov/#/Session/Bill/26633; CITED: https://mylrc.sdlegislature.gov/api/Documents/298084.pdf; CITED: https://wyoleg.gov/2025/Introduced/HB0201.pdf]

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V2 Authentication | no | No users or auth are in scope for Phase 14. [VERIFIED: .planning/PROJECT.md; .planning/REQUIREMENTS.md] |
| V3 Session Management | no | No session state is in scope for Phase 14. [VERIFIED: .planning/PROJECT.md; .planning/REQUIREMENTS.md] |
| V4 Access Control | yes, content boundary only | Do not expose candidate intake as public pages or public route data. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md; content/data/state-registry-manifest.README.md] |
| V5 Input Validation | yes | Parse `content/data/state-candidate-intake.json` with Zod and controlled enums. [VERIFIED: src/lib/content/schema.ts; CITED: https://zod.dev/packages/zod] |
| V6 Cryptography | no | Phase 14 reads policy-source URLs and does not implement cryptography. [VERIFIED: .planning/ROADMAP.md; scripts/build-refresh-queue.ts] |

### Known Threat Patterns for Bun/TypeScript Content Generators

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Untrusted URL or status text silently enters generated output | Tampering | Validate candidate JSON fields with Zod, require valid URLs, and use controlled enums for readiness/source strength. [VERIFIED: src/lib/content/schema.ts; CITED: https://zod.dev/packages/zod] |
| Generated artifacts are mistaken for canonical public content | Information disclosure / Repudiation | Keep outputs under `generated/refresh/` and document that they are maintainer artifacts, not public state entries. [VERIFIED: generated/refresh/README.md; content/data/README.md] |
| Live network fetch makes generated output non-reproducible | Repudiation | Use repo-controlled intake snapshots and dated generated artifacts. [VERIFIED: .planning/PROJECT.md; generated/refresh/README.md] |
| Markdown table injection from raw notes | Tampering | Keep evidence notes concise and escape pipe/newline characters in Markdown renderers if freeform notes are rendered in tables. [VERIFIED: scripts/build-refresh-queue.ts; content/data/README.md] |

## Sources

### Primary (HIGH confidence)

- `.planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md` - locked decisions, discretion, deferred scope, candidate source URLs. [VERIFIED: local file read]
- `.planning/ROADMAP.md` - Phase 14 goal and success criteria. [VERIFIED: local file read]
- `.planning/REQUIREMENTS.md` - CATA-10, CATA-11, REFR-04, REFR-06 acceptance intent. [VERIFIED: local file read]
- `AGENTS.md`, `AGENTS.bright-builds.md`, `standards-overrides.md` - repo workflow constraints. [VERIFIED: local file read]
- `scripts/build-refresh-queue.ts` - current generator behavior and write pattern. [VERIFIED: local file read]
- `src/lib/site/registry-freshness.ts` and `src/lib/site/registry-freshness.test.ts` - existing pure freshness model and unit-test style. [VERIFIED: local file read]
- `src/lib/content/schema.ts` - Zod boundary parser pattern and controlled schemas. [VERIFIED: local file read]
- `content/data/README.md`, `content/data/state-registry-manifest.README.md`, `generated/refresh/README.md` - content and generated-artifact boundaries. [VERIFIED: local file read]
- Bun runtime and test docs - TypeScript execution and `bun:test` API. [CITED: https://bun.sh/docs/runtime; CITED: https://bun.sh/docs/test/writing]
- Zod 4 docs - schema parse APIs. [CITED: https://zod.dev/packages/zod]
- Biome CLI docs - lint/format CLI behavior including `--error-on-warnings`. [CITED: https://biomejs.dev/reference/cli/]
- Official candidate pages and PDFs listed in Candidate Source Snapshot. [CITED: candidate URLs above]
- npm registry commands for `zod`, `@biomejs/biome`, `typescript`, `@solidjs/start`, `solid-js`, `tailwindcss`, `vite`, `vinxi`, and `bun-types`. [VERIFIED: npm registry]

### Secondary (MEDIUM confidence)

- Bright Builds pinned GitHub pages for architecture, code shape, and verification standards. [CITED: https://github.com/bright-builds-llc/bright-builds-rules/tree/05f8d7a6c9c2e157ec4f922a05273e72dab97676/standards]

### Tertiary (LOW confidence)

- None used as authoritative support. [VERIFIED: source review]

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - verified from `package.json`, `bun.lock`, local CLI versions, npm registry, and official docs. [VERIFIED: package.json; bun.lock; local CLI commands; npm registry; cited docs]
- Architecture: HIGH - directly follows existing local pure-model/generator/content-boundary patterns. [VERIFIED: src/lib/site/registry-freshness.ts; scripts/build-refresh-queue.ts; content/data/README.md; generated/refresh/README.md]
- Pitfalls: HIGH - derived from locked decisions and existing generated/public content boundaries. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md; content/data/state-registry-manifest.README.md]
- Candidate source readiness: MEDIUM - official source pages were checked, but Phase 14 implementation should still store snapshot dates and status-confirmation next actions where static extraction was incomplete. [CITED: official candidate URLs; VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md]

**Research date:** 2026-05-27
**Valid until:** 2026-06-03 for candidate-source status facts; 2026-06-26 for local stack and architecture guidance. [VERIFIED: current date; official source pages are time-sensitive]
