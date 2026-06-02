# Phase 16: Throughput Expansion and Deferral Ledger - Research

**Researched:** 2026-06-02
**Domain:** Source-backed state content publication and candidate deferral ledger
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

Source: `.planning/phases/16-throughput-expansion-and-deferral-ledger/16-CONTEXT.md` [VERIFIED: local file read]

### Locked Decisions

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

### Deferred Ideas (OUT OF SCOPE)

- Catalog, cluster, comparison, and browser-surface QA remain Phase 17.
- Full 50-state deep publication remains a future milestone unless source availability and throughput support it later.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CATA-12 | Maintainer can record why high-interest states remain unpublished without exposing unverified claims as public state entries. [VERIFIED: `.planning/REQUIREMENTS.md`] | Use `content/data/state-candidate-intake.json` only for unpublished deferrals, with `readiness: "defer"`, `nextAction: "defer-until-stronger-official-source"`, and `deferralReason`; if both current candidates publish, the ledger becomes `candidates: []` and generated priority artifacts report no first-publication candidates. [VERIFIED: `src/lib/content/schema.ts`, `scripts/build-refresh-queue.ts`, `content/data/README.md`] |
| CATA-13 | Reader can access a larger published state registry beyond the current ten entries, with every new entry passing the canonical source, schema, confidence, and dated-snapshot contract. [VERIFIED: `.planning/REQUIREMENTS.md`] | Publish South Dakota HB 1155 and Wyoming HB0201 as terminal failed/inactive reserve-side records because current official sources confirm bill text and final status; update manifest rows to `published`, remove both candidate rows, regenerate generated artifacts, and update count/group tests for a 17-record registry. [VERIFIED: official SD/WY sources, `content/states/*.md` patterns, `content/data/state-registry-manifest.json`, `src/lib/site/content.test.ts`] |
</phase_requirements>

## Project Constraints (from AGENTS.md)

- Root `AGENTS.md` exists and contains the Bright Builds managed block; no additional repo-local guidance section was present in the file read during research. [VERIFIED: `AGENTS.md`]
- Before plan, review, implementation, or audit work, agents must read `AGENTS.md`, `AGENTS.bright-builds.md`, `standards-overrides.md` when present, and relevant pinned canonical standards pages. [VERIFIED: `AGENTS.md`, `AGENTS.bright-builds.md`]
- `standards-overrides.md` exists, but its active override table contains only placeholder text and no substantive local exception for this phase. [VERIFIED: `standards-overrides.md`]
- The repo does not contain a local `standards/index.md`; canonical standards were fetched from the Bright Builds pinned commit `05f8d7a6c9c2e157ec4f922a05273e72dab97676`. [VERIFIED: local `sed standards/index.md` failure, `AGENTS.bright-builds.md`, official GitHub raw pages]
- Relevant Bright Builds rules for this phase are: functional core / imperative shell, parse boundary data into domain types, make illegal states unrepresentable, prefer early returns, use `maybe` names for nullable internal values, run repo-native verification before commit, unit-test pure business logic, and keep TS/JS automation in Bun instead of adding Python scripts. [CITED: `standards/core/architecture.md`, `standards/core/code-shape.md`, `standards/core/verification.md`, `standards/core/testing.md`, `standards/languages/typescript-javascript.md` at Bright Builds commit `05f8d7a6c9c2e157ec4f922a05273e72dab97676`]
- No `.claude/skills/` or `.agents/skills/` directory exists in this repo, so there are no repo-local skill patterns to apply. [VERIFIED: `find .claude/skills .agents/skills -maxdepth 2 -type f -name SKILL.md`]

## Summary

Phase 16 should plan to publish both remaining candidates, South Dakota and Wyoming, as terminal failed/inactive public reserve-side entries. [VERIFIED: official SD bill/vote/text/minutes/report sources; official WY OData/text/digest sources] South Dakota HB 1155 now has official bill metadata, official introduced text, official committee vote/action data, official committee minutes, and official committee report/journal evidence showing deferral to the 41st legislative day on 2026-02-06. [VERIFIED: `https://sdlegislature.gov/api/Bills/26633`, `https://mylrc.sdlegislature.gov/api/Documents/298084.pdf`, `https://sdlegislature.gov/api/Votes/83383`, `https://mylrc.sdlegislature.gov/api/Documents/Minutes/301323.pdf?Year=2026`, `https://mylrc.sdlegislature.gov/api/Documents/CommitteeReport/301846.pdf?Year=2026`, `https://mylrc.sdlegislature.gov/api/Documents/Journal/301710.pdf?Year=2026`] Wyoming HB0201 has official OData bill status, official bill information, official introduced text, official digest, roll call, and bill-action evidence showing inactive status and death in committee on 2025-03-03. [VERIFIED: `https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments($expand=amendmentBudgetSections)`, `https://api.wyoleg.gov/v1/odata/BillInformations?...HB0201`, `https://www.wyoleg.gov/2025/Introduced/HB0201.pdf`, `https://www.wyoleg.gov/2025/Digest/HB0201.pdf`]

The plan should not broaden beyond these two states. [VERIFIED: `16-CONTEXT.md` D-01] If execution-time source checks still match this research, publish `content/states/south-dakota-hb-1155.md` and `content/states/wyoming-hb-0201.md`, mark both manifest rows `published`, remove both rows from `content/data/state-candidate-intake.json`, regenerate `generated/content-graph.json` and `generated/refresh/*`, and update tests for 17 published records. [VERIFIED: `content/states/*.md` naming patterns, `content/data/state-registry-manifest.json`, `content/data/state-candidate-intake.json`, `scripts/compile-content.ts`, `scripts/build-refresh-queue.ts`, `src/lib/site/content.test.ts`]

**Primary recommendation:** Publish both South Dakota HB 1155 and Wyoming HB0201 as high-confidence failed/inactive reserve-side public entries; use the deferral ledger only as a contingency if implementation re-checks lose official final-status footing. [VERIFIED: official SD/WY sources, `16-CONTEXT.md` D-05/D-06/D-09]

## Standard Stack

### Core

| Library / Tool | Version | Purpose | Why Standard |
|----------------|---------|---------|--------------|
| Bun | `1.3.9` local; package manager pinned as `bun@1.3.9` | Script runner, test runner, package-manager surface | Existing repo scripts use `bun run`, `bun test`, `bunx`, and Bright Builds TS guidance says existing Bun repos should keep Bun. [VERIFIED: local `bun --version`, `package.json`; CITED: Bright Builds TS/JS standards] |
| TypeScript | `6.0.2` local via `bunx tsc --version`; npm latest `6.0.3`, modified 2026-04-16 | Type checking and TS scripts | Existing compile/validate/refresh scripts and site code are TypeScript. [VERIFIED: local command, npm registry, `package.json`, `scripts/*.ts`] |
| Zod | package range `^4.3.6`; npm latest `4.4.3`, modified 2026-05-04 | Boundary parsing for manifest, state frontmatter, and candidate intake | Existing schema parses all content contracts and enforces deferral invariants. [VERIFIED: npm registry, `package.json`, `src/lib/content/schema.ts`] |
| gray-matter | package range `^4.0.3`; npm latest `4.0.3`, modified 2023-07-12 | Markdown frontmatter parsing | Existing Markdown collection loader depends on parsed frontmatter for state entries. [VERIFIED: npm registry, `package.json`, `src/lib/content/load-markdown.ts` via imports observed in scripts] |
| markdown-it | package range `^14.1.1`; npm latest `14.2.0`, modified 2026-05-23 | Markdown rendering | Existing content pipeline includes Markdown rendering dependency; Phase 16 should not replace it. [VERIFIED: npm registry, `package.json`] |

### Supporting

| Library / Tool | Version | Purpose | When to Use |
|----------------|---------|---------|-------------|
| SolidStart / SolidJS | `@solidjs/start` package range `^1.3.2`, npm latest `1.3.2`; `solid-js` package range `^1.9.12`, npm latest `1.9.13` | Existing public site and route model consumer | Use only through existing content graph and route models; Phase 16 should not add route-specific exceptions. [VERIFIED: npm registry, `package.json`, `16-CONTEXT.md` D-05/D-10] |
| Biome | package range `^2.4.10`; npm latest `2.4.16`, modified 2026-05-27 | Format and lint checks | Use existing `format:check` and `lint` scripts during verification. [VERIFIED: npm registry, `package.json`] |
| Poppler `pdftotext` | `26.03.0` local | Official PDF spot-check extraction | Use for implementation verification of official PDF text, not as an app dependency. [VERIFIED: local `pdftotext -v`] |
| curl | `8.7.1` local | Official API and PDF source spot checks | Use for implementation-time official-source re-checks. [VERIFIED: local `curl --version`] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Existing repo Markdown + manifest + generated graph | A database-backed admin workflow | Out of scope for v1.3, and current requirements explicitly preserve repo-owned Markdown and generated artifacts. [VERIFIED: `.planning/REQUIREMENTS.md` Out of Scope, `content/data/README.md`] |
| Existing Zod parsers | Ad hoc JSON/frontmatter checks in tasks | Would bypass existing illegal-state guards for candidate deferrals and state frontmatter. [VERIFIED: `src/lib/content/schema.ts`, Bright Builds architecture standards] |
| Existing generated scripts | Manual edits under `generated/` | Generated files are derived from canonical inputs and should be regenerated through repo-owned scripts. [VERIFIED: `16-CONTEXT.md` D-10, `scripts/compile-content.ts`, `scripts/build-refresh-queue.ts`] |

**Installation:**

```bash
# No new package installation is recommended for Phase 16.
```

**Version verification:** Package versions above were checked with `npm view <package> version time.modified` on 2026-06-02; local runtime/tool versions were checked with `bun --version`, `bunx tsc --version`, `pdftotext -v`, and `curl --version`. [VERIFIED: npm registry and local commands]

## Official Source Findings

### South Dakota HB 1155

| Fact Needed for Publication | Finding |
|-----------------------------|---------|
| Bill identity | Official South Dakota bill API reports BillId `26633`, House Bill `1155`, title `permit the state to invest in Bitcoin.`, and SessionId `71`. [VERIFIED: `https://sdlegislature.gov/api/Bills/26633`] |
| Sponsors | Official South Dakota bill API reports primary sponsors Rep. Logan Manhart and Sen. Tom Pischke, plus House co-sponsors Tim Goodwin, Phil Jensen, and Dylan Jordan. [VERIFIED: `https://sdlegislature.gov/api/Bills/26633`] |
| Text mechanics | Official introduced PDF states the act would permit state investment in Bitcoin; it would allow the State Investment Council to invest Bitcoin up to ten percent of state moneys made available for investment and hold Bitcoin directly, through a qualified custodian, or through an exchange-traded product. [VERIFIED: `https://mylrc.sdlegislature.gov/api/Documents/298084.pdf`] |
| Final status | Official vote API reports House Commerce and Energy, ActionDate `2026-02-06T10:00:00-06:00`, StatusText `Deferred to the 41st legislative day`, Yeas `10`, Nays `3`. [VERIFIED: `https://sdlegislature.gov/api/Votes/83383`] |
| Cross-check | Official committee minutes record HB 1155, the motion to defer to the 41st legislative day, and a 10-3-0-0 result. [VERIFIED: `https://mylrc.sdlegislature.gov/api/Documents/Minutes/301323.pdf?Year=2026`] |
| Cross-check | Official committee report and House journal record that House Commerce and Energy had HB 1155 under consideration and deferred it to the 41st Legislative Day. [VERIFIED: `https://mylrc.sdlegislature.gov/api/Documents/CommitteeReport/301846.pdf?Year=2026`, `https://mylrc.sdlegislature.gov/api/Documents/Journal/301710.pdf?Year=2026`] |
| Publication recommendation | Publish as `legislativeStatusGroup: failed`, `proposalKind: reserve`, `proposalSubtype: strategic-reserve`, `confidence: high`, `statusAsOf: 2026-02-06`, `lastReviewed: 2026-06-02`. [VERIFIED: official SD sources; INFERRED from repo taxonomy in `src/lib/content/schema.ts` and `content/data/proposal-taxonomy.json`] |

### Wyoming HB0201

| Fact Needed for Publication | Finding |
|-----------------------------|---------|
| Bill identity | Official Wyoming BillReferences OData reports bill `HB0201`, catchTitle `State funds-investment in Bitcoin.`, sponsor `Representative Wasserburger`, billStatus `inactive`, lastAction `H:Died in Committee Returned Bill Pursuant to HR 5-4`, and lastActionDate `2025-03-03T07:00:00Z`. [VERIFIED: `https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments($expand=amendmentBudgetSections)`] |
| Sponsors | Official Wyoming BillReferences OData reports House sponsors Wasserburger, Brown, G, Filer, Lucas, Singh and Senate sponsor Smith, D. [VERIFIED: `https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments($expand=amendmentBudgetSections)`] |
| Text mechanics | Official introduced PDF states the act would authorize investment of state funds and permanent funds in Bitcoin; text extraction confirms a three-percent cap for the general fund and three-percent cap for the permanent funds, plus secure-custody and qualified-custodian mechanics. [VERIFIED: `https://www.wyoleg.gov/2025/Introduced/HB0201.pdf`] |
| Final status | Official Wyoming BillInformations OData reports BillNum `HB0201`, shortTitle `State funds-investment in Bitcoin.`, billStatus `inactive`, lastAction `H:Died in Committee Returned Bill Pursuant to HR 5-4`, and lastActionDate `2025-03-03T00:00:00Z`. [VERIFIED: `https://api.wyoleg.gov/v1/odata/BillInformations?select=BillNum,ShortTitle,Year,ChapterNo,Sponsor,EnrolledNo,LastActionDate,LastAction,SignedDate,EffectiveDate,BillType,SpecialSessionValue,BillStatus&filter=Year%20eq%202025%20and%20SpecialSessionValue%20eq%20null%20and%20BillNum%20eq%20%27HB0201%27`] |
| Vote/action cross-check | Official digest PDF reports H09 Minerals Do Pass failed `1-7-1-0-0` on 2025-02-10 and final action `H:Died in Committee Returned Bill Pursuant to HR 5-4` on 2025-03-03. [VERIFIED: `https://www.wyoleg.gov/2025/Digest/HB0201.pdf`] |
| Publication recommendation | Publish as `legislativeStatusGroup: failed`, `proposalKind: reserve`, `proposalSubtype: strategic-reserve`, `confidence: high`, `statusAsOf: 2025-03-03`, `lastReviewed: 2026-06-02`. [VERIFIED: official WY sources; INFERRED from repo taxonomy in `src/lib/content/schema.ts` and `content/data/proposal-taxonomy.json`] |

## Architecture Patterns

### Recommended Project Structure

```text
content/
  states/
    south-dakota-hb-1155.md    # new canonical public state entry [VERIFIED: content/states naming patterns]
    wyoming-hb-0201.md         # new canonical public state entry [VERIFIED: content/states naming patterns]
  data/
    state-registry-manifest.json # manifest rows become published [VERIFIED: manifest contract]
    state-candidate-intake.json  # remove published rows or keep only deferred rows [VERIFIED: candidate schema]
generated/
  content-graph.json            # regenerated from content [VERIFIED: compile script]
  refresh/
    state-refresh-queue.*       # regenerated refresh artifacts [VERIFIED: refresh script]
    state-priority-queue.*      # regenerated candidate/refresh priority artifacts [VERIFIED: refresh script]
src/lib/site/content.test.ts    # update published/group count expectations [VERIFIED: current test file]
```

### Pattern 1: Publish Terminal Official-Source Records

**What:** Author a public Markdown state entry only after official text and official terminal status are confirmed. [VERIFIED: `16-CONTEXT.md` D-04/D-05, Phase 15 terminal entries]

**When to use:** Use this for both South Dakota and Wyoming if implementation-time official checks still match this research. [VERIFIED: official SD/WY sources]

**Recommended South Dakota frontmatter shape:**

```yaml
---
title: South Dakota HB 1155
slug: south-dakota
summary: South Dakota House bill to permit State Investment Council Bitcoin investment authority, later deferred to the 41st legislative day.
state: South Dakota
recordType: legislative-bill
proposalKind: reserve
proposalSubtype: strategic-reserve
billId: HB 1155
chamber: South Dakota House
status: Deferred to the 41st legislative day
legislativeStatusGroup: failed
statusAsOf: 2026-02-06
lastReviewed: 2026-06-02
sponsors:
  - Rep. Logan Manhart
  - Sen. Tom Pischke
primarySources:
  - https://sdlegislature.gov/Session/Bill/26633
  - https://mylrc.sdlegislature.gov/api/Documents/298084.pdf
  - https://sdlegislature.gov/api/Votes/83383
  - https://mylrc.sdlegislature.gov/api/Documents/Minutes/301323.pdf?Year=2026
secondarySources: []
confidence: high
effect: Would have authorized State Investment Council Bitcoin investment authority for state moneys up to a ten-percent cap, but the bill was deferred to the 41st legislative day and did not become law.
---
```

Source: official SD sources and existing state frontmatter schema. [VERIFIED: official SD sources, `src/lib/content/schema.ts`, `content/states/florida-sb-550.md`, `content/states/north-dakota-hb-1184.md`]

**Recommended Wyoming frontmatter shape:**

```yaml
---
title: Wyoming HB0201
slug: wyoming
summary: Wyoming House bill to authorize limited state-fund and permanent-fund Bitcoin investment authority, later dying in committee.
state: Wyoming
recordType: legislative-bill
proposalKind: reserve
proposalSubtype: strategic-reserve
billId: HB0201
chamber: Wyoming House
status: H:Died in Committee Returned Bill Pursuant to HR 5-4
legislativeStatusGroup: failed
statusAsOf: 2025-03-03
lastReviewed: 2026-06-02
sponsors:
  - Rep. Wasserburger
  - Rep. Brown, G
  - Rep. Filer
  - Rep. Lucas
  - Rep. Singh
  - Sen. Smith, D
primarySources:
  - https://www.wyoleg.gov/Legislation/2025/HB0201
  - https://www.wyoleg.gov/2025/Introduced/HB0201.pdf
  - https://www.wyoleg.gov/2025/Digest/HB0201.pdf
secondarySources: []
confidence: high
effect: Would have authorized the State Treasurer to invest specified state and permanent funds in Bitcoin under three-percent caps, but the bill became inactive after dying in committee.
---
```

Source: official WY sources and existing state frontmatter schema. [VERIFIED: official WY sources, `src/lib/content/schema.ts`, `content/states/florida-sb-550.md`, `content/states/north-dakota-hb-1184.md`]

### Pattern 2: Manifest And Candidate Intake Are Mutually Honest

**What:** A published state needs a Markdown file and a manifest row with `registryStatus: "published"`; a published candidate must be removed from candidate intake. [VERIFIED: `content/data/state-registry-manifest.README.md`, `16-CONTEXT.md` D-09, `scripts/compile-content.ts`]

**When to use:** Use after each state entry is authored and validated. [VERIFIED: Phase 15 verification, `15-VERIFICATION.md`]

**Recommended manifest edits:**

```json
{
  "state": "South Dakota",
  "slug": "south-dakota",
  "registryStatus": "published",
  "proposalFocus": "reserve",
  "shortNote": "Failed 2026 proposal to permit State Investment Council Bitcoin investment authority.",
  "editorialPriority": "reserve-priority",
  "region": "midwest"
}
```

```json
{
  "state": "Wyoming",
  "slug": "wyoming",
  "registryStatus": "published",
  "proposalFocus": "reserve",
  "shortNote": "Inactive 2025 proposal to authorize capped state-fund Bitcoin investment authority.",
  "editorialPriority": "reserve-priority",
  "region": "west"
}
```

Source: manifest schema and official source findings. [VERIFIED: `content/data/state-registry-manifest.json`, `src/lib/content/schema.ts`, official SD/WY sources]

**Recommended candidate intake after both publish:**

```json
{
  "candidates": []
}
```

Source: the candidate schema allows an empty array because it uses `z.array(...)` without `.min(1)`. [VERIFIED: `src/lib/content/schema.ts`]

### Pattern 3: Deferral Is A Fallback, Not The Expected Path

**What:** If execution-time official source checks fail for one state, keep that candidate unpublished and record a concrete deferral reason in candidate intake. [VERIFIED: `16-CONTEXT.md` D-06/D-07/D-08]

**When to use:** Use only if official final status cannot be re-confirmed from official state sources during execution. [VERIFIED: `16-CONTEXT.md` D-04/D-06]

**Example fallback row:**

```json
{
  "state": "South Dakota",
  "slug": "south-dakota",
  "sourceAvailability": "official-pdf-only",
  "proposalRelevance": "high",
  "readiness": "defer",
  "status": "Official introduced text found; final status could not be re-confirmed during Phase 16 execution",
  "statusAsOf": "2026-06-02",
  "officialSourceUrl": "https://mylrc.sdlegislature.gov/api/Documents/298084.pdf",
  "evidenceNote": "Official introduced text exists, but public publication is deferred until an official bill history, vote, journal, committee report, or status page confirms final posture.",
  "nextAction": "defer-until-stronger-official-source",
  "deferralReason": "Execution re-check could not access an official final-status source; checked official bill page/status route, vote API, committee minutes/report, and bill-status report."
}
```

Source: candidate parser invariants and context deferral rules. [VERIFIED: `src/lib/content/schema.ts`, `16-CONTEXT.md` D-06/D-08]

### Anti-Patterns to Avoid

- **Publishing from introduced PDF alone:** Phase 16 explicitly says prior PDF-only intake is not enough; official final status must be confirmed before authoring. [VERIFIED: `16-CONTEXT.md` D-04]
- **Leaving a published state in candidate intake:** Published rows must be removed from candidate intake so generated priority artifacts do not keep surfacing completed work. [VERIFIED: `16-CONTEXT.md` D-09, Phase 15 verification]
- **Manual generated-file editing:** Generated graph and refresh artifacts are derived from canonical inputs and should be regenerated by scripts. [VERIFIED: `16-CONTEXT.md` D-10, `scripts/compile-content.ts`, `scripts/build-refresh-queue.ts`]
- **Overclaiming live status or enacted authority:** Both recommended entries are terminal failed/inactive records, not enacted authority or current momentum. [VERIFIED: official SD/WY status sources]
- **Broadening to more states:** Scope is South Dakota and Wyoming unless research proves a replacement is necessary, and this research found both publishable. [VERIFIED: `16-CONTEXT.md` D-01, official SD/WY sources]

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Content/schema validation | One-off JSON or YAML checks in shell | `parseStateEntryFrontmatter`, `parseStateRegistryManifest`, `parseStateCandidateIntake` | Existing Zod parsers already enforce slug/date/enums and deferral invariants. [VERIFIED: `src/lib/content/schema.ts`] |
| Public route data | Manual edits to `generated/content-graph.json` | `bun run compile:content` | Compile script reads authored content and manifest, checks slugs/classification, and writes the graph. [VERIFIED: `scripts/compile-content.ts`] |
| Refresh/candidate artifacts | Manual edits under `generated/refresh/` | `bun run refresh:queue` | Refresh script rebuilds refresh and combined priority artifacts from compiled content and candidate intake. [VERIFIED: `scripts/build-refresh-queue.ts`] |
| Candidate ordering and authorability | Custom sorting in a task script | `buildCandidatePriorityModel` and `buildCombinedPriorityQueueModel` | Existing model encodes readiness, source availability, relevance, freshness risk, and deferral reasons. [VERIFIED: `src/lib/site/candidate-priority.ts`] |
| Official PDF inspection | Hand-parsed binary/PDF text | `pdftotext` for source spot checks | Local Poppler `pdftotext` extracted official SD and WY bill/digest PDFs successfully. [VERIFIED: local `pdftotext -v` and PDF extraction commands] |
| Source quality decision | Secondary-source summaries | Official legislature APIs/pages/PDFs/minutes/journals/status routes | Phase 16 requires official-source footing; official sources are available for both states. [VERIFIED: `16-CONTEXT.md` D-04, official SD/WY sources] |

**Key insight:** Phase 16 is not a new architecture phase; it is a disciplined content-state transition through existing parsers, manifest boundaries, generated scripts, and official-source evidence. [VERIFIED: `16-CONTEXT.md`, codebase audit]

## Common Pitfalls

### Pitfall 1: Treating South Dakota's SPA Route As Missing Evidence

**What goes wrong:** A direct `curl` of guessed South Dakota nested API routes returns the SPA shell, which can look like no official status exists. [VERIFIED: local curl attempts against guessed `/api/Bills/26633/*` routes]

**Why it happens:** South Dakota's public site is JavaScript-backed, while official evidence is available through specific API/document URLs and indexed official status/report pages. [VERIFIED: official SD bill API, vote API, PDF documents, web search of official SD pages]

**How to avoid:** Use the confirmed official URLs: bill API, introduced PDF, vote API, committee minutes, committee report, journal, and public bill/status pages. [VERIFIED: official SD sources]

**Warning signs:** A source check returns `Loading... | South Dakota Legislature` instead of bill data. [VERIFIED: local curl output]

### Pitfall 2: Forgetting Count And Group Test Updates

**What goes wrong:** `bun test` fails because published count and group expectations remain at 15 records. [VERIFIED: `src/lib/site/content.test.ts`]

**Why it happens:** `content.test.ts` currently asserts `publishedCount` is 15, Midwest count is 6, West count is 2, and failed status count is 4. [VERIFIED: `src/lib/site/content.test.ts`, `generated/content-graph.json`]

**How to avoid:** If both states publish, update expected region counts to Midwest 7, Northeast 1, South 6, West 3; update failed status count to 6; update published count to 17. [VERIFIED: current graph groups plus recommended SD/WY classifications]

**Warning signs:** Tests fail in `buildStatesIndexModel groups published states...` or `buildStatesClusterModel returns editorial sections...`. [VERIFIED: `src/lib/site/content.test.ts`]

### Pitfall 3: Candidate Intake Still Lists Published States

**What goes wrong:** `generated/refresh/state-priority-queue.*` keeps surfacing South Dakota or Wyoming after publication. [VERIFIED: `scripts/build-refresh-queue.ts`, `generated/refresh/state-priority-queue.md`]

**Why it happens:** `firstPublicationCandidates` are generated from candidate intake entries whose readiness is not `defer`. [VERIFIED: `src/lib/site/candidate-priority.ts`]

**How to avoid:** Remove published candidate rows; if both publish, commit `content/data/state-candidate-intake.json` as `{ "candidates": [] }`. [VERIFIED: `src/lib/content/schema.ts`, `16-CONTEXT.md` D-09]

**Warning signs:** Priority queue summary still reports `First publication candidates: 1` or `2` after the state entry is published. [VERIFIED: `generated/refresh/state-priority-queue.md`]

### Pitfall 4: Weakening The Public Trust Contract With Ambiguous Status

**What goes wrong:** The entry describes a proposal as active, enacted, or general momentum instead of failed/inactive. [VERIFIED: official SD/WY final-status sources]

**Why it happens:** The introduced text is high-interest and Bitcoin-specific, but the final status is terminal. [VERIFIED: official SD/WY text and status sources]

**How to avoid:** Use failed/inactive language in summary, status table, analysis, limitations, and confidence note. [VERIFIED: `content/states/florida-sb-550.md`, `content/states/north-dakota-hb-1184.md`]

**Warning signs:** Phrases such as `would authorize` are not paired with `but the bill did not become law` or an equivalent terminal-status qualifier. [VERIFIED: Phase 15 terminal entry patterns]

### Pitfall 5: Public Source Trail Uses Only API URLs When Human Pages/PDFs Exist

**What goes wrong:** The public entry is harder for readers to inspect even though official human-readable PDFs/pages exist. [VERIFIED: official SD/WY public PDF/page availability]

**Why it happens:** APIs are convenient for verification, but public content should favor inspectable official pages, PDFs, minutes, reports, and digests. [VERIFIED: existing `content/states/*.md` source trail patterns]

**How to avoid:** Use public bill pages and official PDFs in `primarySources`; keep API URLs acceptable when they are the only precise official status endpoint. [VERIFIED: existing source trail patterns and official SD/WY sources]

**Warning signs:** Source Trail contains only a long OData URL or JSON endpoint while official PDF/page URLs are available. [VERIFIED: official WY introduced/digest PDFs; official SD bill/status/PDF documents]

## Code Examples

### Publication Verification Commands

```bash
bun run validate:content
bun run compile:content
bun run refresh:queue
bunx tsc --noEmit
bun test
bun run build
bun run precommit
```

Source: package scripts and Phase 16 verification decision. [VERIFIED: `package.json`, `16-CONTEXT.md` D-12]

### Targeted Generated-Content Check After Both Publish

```bash
bun -e 'const graph = await Bun.file("generated/content-graph.json").json(); const expected = new Set(["south-dakota", "wyoming"]); if (graph.states.length !== 17) throw new Error(`Expected 17 states, got ${graph.states.length}`); for (const slug of expected) { if (!graph.registry.publishedSlugs.includes(slug)) throw new Error(`Missing published slug: ${slug}`); } console.log("Compiled 17 states with South Dakota and Wyoming published.");'
```

Source: existing Phase 15 generated-content check pattern adapted to Phase 16 state count. [VERIFIED: `.planning/phases/15-first-expansion-publication-wave/15-03-PLAN.md`, `generated/content-graph.json`]

### Targeted Candidate Queue Check After Both Publish

```bash
bun -e 'const priority = await Bun.file("generated/refresh/state-priority-queue.json").json(); if (priority.firstPublicationCandidates.length !== 0) throw new Error(`Expected no first-publication candidates, got ${priority.firstPublicationCandidates.length}`); if (priority.candidateIntake.summary.candidateCount !== 0) throw new Error("Candidate intake summary should be empty after publishing both states"); console.log("Candidate priority queue has no remaining first-publication candidates.");'
```

Source: candidate priority model and Phase 15 queue checks. [VERIFIED: `src/lib/site/candidate-priority.ts`, `.planning/phases/15-first-expansion-publication-wave/15-03-PLAN.md`]

### Official-Source Spot Checks

```bash
curl -fsSL https://sdlegislature.gov/api/Votes/83383
curl -fsSL https://mylrc.sdlegislature.gov/api/Documents/298084.pdf | pdftotext - -
curl -fsSL 'https://api.wyoleg.gov/v1/odata/BillInformations?select=BillNum,ShortTitle,Year,ChapterNo,Sponsor,EnrolledNo,LastActionDate,LastAction,SignedDate,EffectiveDate,BillType,SpecialSessionValue,BillStatus&filter=Year%20eq%202025%20and%20SpecialSessionValue%20eq%20null%20and%20BillNum%20eq%20%27HB0201%27'
curl -fsSL https://www.wyoleg.gov/2025/Digest/HB0201.pdf | pdftotext - -
```

Source: official source checks performed during research. [VERIFIED: local curl/pdftotext commands]

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Treating unpublished high-interest states as informal notes | Controlled candidate intake with readiness, source availability, next action, and optional deferral reason | Phase 14 | The planner can record deferrals without creating public placeholder pages. [VERIFIED: Phase 14 plans/summaries, `src/lib/content/schema.ts`] |
| Publishing only the original or v1.2 batch | Expanding through official-source-backed Markdown entries and generated route data | Phase 15 | The registry now has 15 published records and a proven publication path for additional entries. [VERIFIED: `15-VERIFICATION.md`, `generated/content-graph.json`] |
| Hard-coded public count copy | Route copy uses registry model counts and tests guard against stale count phrases | Phase 15 | Publishing to 17 records should mostly require generated data and focused test expectation updates, not route copy rewrites. [VERIFIED: `15-VERIFICATION.md`, `src/lib/site/content.test.ts`, route files] |
| Forcing count goals | Publish-or-defer based on source quality | Phase 16 context | If source status cannot be confirmed, deferral is correct and public content stays clean. [VERIFIED: `16-CONTEXT.md`] |

**Deprecated/outdated:**

- Treating South Dakota or Wyoming as `official-pdf-only` and `needs-status-confirmation` is outdated after this research because current official status evidence exists for both. [VERIFIED: official SD/WY sources; current `content/data/state-candidate-intake.json`]
- Treating Phase 16 as a new multi-state search is out of scope because both remaining candidates are publishable and the context forbids broadening unless replacement is necessary. [VERIFIED: `16-CONTEXT.md` D-01]

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | None. All planning-relevant claims are supported by local repo files, official state sources, npm registry checks, local tool checks, or pinned Bright Builds standards. | All sections | N/A |

## Open Questions

1. **None blocking.**
   - What we know: Official source footing is sufficient to plan publication for South Dakota and Wyoming. [VERIFIED: official SD/WY sources]
   - What's unclear: Execution must still perform the D-04 re-check immediately before authoring because the phase context requires it. [VERIFIED: `16-CONTEXT.md` D-04]
   - Recommendation: Plan a source-confirmation task first, then publish both if checks match this research; use the deferral fallback only on a source regression. [VERIFIED: `16-CONTEXT.md` D-05/D-06]

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Bun | Repo scripts, tests, build | Yes | `1.3.9` | None needed. [VERIFIED: local command] |
| Node.js | npm registry checks and possible one-off JSON assertions | Yes | `v24.13.0` | Use Bun for repo scripts. [VERIFIED: local command, `package.json`] |
| npm | Package version verification | Yes | `11.6.2` | Use existing lock/deps if registry is unavailable during execution. [VERIFIED: local command] |
| TypeScript compiler | Typecheck gate | Yes | `6.0.2` via `bunx tsc --version` | None needed. [VERIFIED: local command] |
| curl | Official source spot checks | Yes | `8.7.1` | Browser/manual official-page checks if a URL blocks CLI access. [VERIFIED: local command] |
| pdftotext | Official PDF spot checks | Yes | `26.03.0` | Manual PDF inspection if extraction fails. [VERIFIED: local command] |
| ripgrep | Source/test audit and source-output checks | Yes | `15.1.0` | Use `grep` only if unavailable. [VERIFIED: local command] |
| git | Commit and diff hygiene | Yes | `2.53.0` | None needed. [VERIFIED: local command] |

**Missing dependencies with no fallback:** None. [VERIFIED: environment audit]

**Missing dependencies with fallback:** None. [VERIFIED: environment audit]

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|------------------|
| V2 Authentication | No | Phase 16 changes static content/data and generated artifacts, not authentication flows. [VERIFIED: phase scope and codebase audit] |
| V3 Session Management | No | Phase 16 does not touch sessions or stateful user flows. [VERIFIED: phase scope and codebase audit] |
| V4 Access Control | No | Phase 16 does not add protected routes or permissions. [VERIFIED: phase scope and codebase audit] |
| V5 Input Validation | Yes | Use existing Zod parsers for state frontmatter, manifest, and candidate intake; run content validation. [VERIFIED: `src/lib/content/schema.ts`, `scripts/validate-content.ts`] |
| V6 Cryptography | No | Phase 16 describes official legislation involving Bitcoin custody but does not implement cryptography. [VERIFIED: phase scope and official bill text review] |

### Known Threat Patterns for Static Content Pipeline

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Publishing unverified or stale claims as public state entries | Tampering / Repudiation | Require official source trail, `statusAsOf`, `lastReviewed`, confidence note, and validation before publication. [VERIFIED: `16-CONTEXT.md`, `src/lib/content/schema.ts`, existing state entries] |
| Candidate data leaking into public content as if verified | Information Disclosure / Tampering | Keep deferred/unpublished rows only in `content/data/state-candidate-intake.json`; do not create `content/states/*.md` without official status. [VERIFIED: `content/data/README.md`, `16-CONTEXT.md` D-06/D-07] |
| Generated artifacts drifting from canonical inputs | Tampering | Regenerate graph and refresh artifacts with repo-owned scripts after canonical edits. [VERIFIED: `scripts/compile-content.ts`, `scripts/build-refresh-queue.ts`] |
| Markdown/frontmatter injection through malformed authored content | Tampering | Parse frontmatter with Zod, validate URLs/dates/enums, and run content validation before build. [VERIFIED: `src/lib/content/schema.ts`, `scripts/validate-content.ts`] |

## Sources

### Primary (HIGH confidence)

- `.planning/phases/16-throughput-expansion-and-deferral-ledger/16-CONTEXT.md` - locked Phase 16 scope, publication/deferral decisions, verification contract. [VERIFIED: local file read]
- `.planning/REQUIREMENTS.md` - CATA-12 and CATA-13 requirement text. [VERIFIED: local file read]
- `.planning/STATE.md` and `.planning/ROADMAP.md` - current milestone state and Phase 16 success criteria. [VERIFIED: local file read]
- `.planning/phases/15-first-expansion-publication-wave/15-VERIFICATION.md` - verified 15-record baseline and two remaining candidates. [VERIFIED: local file read]
- `content/data/state-candidate-intake.json`, `content/data/state-registry-manifest.json`, `content/data/README.md`, `content/data/state-registry-manifest.README.md` - current candidate/manifest state and content boundary. [VERIFIED: local file read]
- `src/lib/content/schema.ts`, `scripts/validate-content.ts`, `scripts/compile-content.ts`, `scripts/build-refresh-queue.ts`, `src/lib/site/candidate-priority.ts`, `src/lib/site/content.ts`, `src/lib/site/states-surfaces.ts`, `src/lib/site/registry-freshness.ts` - implementation contracts and generated-data flow. [VERIFIED: local file read]
- `src/lib/site/content.test.ts`, `src/lib/site/candidate-priority.test.ts`, `src/lib/content/schema.test.ts` - focused test expectations and candidate/schema behavior. [VERIFIED: local file read]
- `https://sdlegislature.gov/api/Bills/26633` - South Dakota HB 1155 metadata and sponsors. [VERIFIED: curl]
- `https://mylrc.sdlegislature.gov/api/Documents/298084.pdf` - South Dakota HB 1155 introduced text. [VERIFIED: curl + pdftotext]
- `https://sdlegislature.gov/api/Votes/83383` - South Dakota HB 1155 committee vote/action. [VERIFIED: curl]
- `https://mylrc.sdlegislature.gov/api/Documents/Minutes/301323.pdf?Year=2026`, `https://mylrc.sdlegislature.gov/api/Documents/CommitteeReport/301846.pdf?Year=2026`, `https://mylrc.sdlegislature.gov/api/Documents/Journal/301710.pdf?Year=2026` - South Dakota committee minutes/report/journal cross-checks. [VERIFIED: curl + pdftotext]
- `https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments($expand=amendmentBudgetSections)` - Wyoming HB0201 bill reference, status, actions, roll call, sponsors, bill HTML. [VERIFIED: curl]
- `https://api.wyoleg.gov/v1/odata/BillInformations?select=BillNum,ShortTitle,Year,ChapterNo,Sponsor,EnrolledNo,LastActionDate,LastAction,SignedDate,EffectiveDate,BillType,SpecialSessionValue,BillStatus&filter=Year%20eq%202025%20and%20SpecialSessionValue%20eq%20null%20and%20BillNum%20eq%20%27HB0201%27` - Wyoming HB0201 status cross-check. [VERIFIED: curl]
- `https://www.wyoleg.gov/2025/Introduced/HB0201.pdf` and `https://www.wyoleg.gov/2025/Digest/HB0201.pdf` - Wyoming introduced text and digest/final action. [VERIFIED: curl + pdftotext]
- Bright Builds canonical standards at commit `05f8d7a6c9c2e157ec4f922a05273e72dab97676`: `standards/index.md`, `standards/core/architecture.md`, `standards/core/code-shape.md`, `standards/core/verification.md`, `standards/core/testing.md`, `standards/languages/typescript-javascript.md`. [CITED: official GitHub raw URLs]
- npm registry checks for `zod`, `gray-matter`, `markdown-it`, `@solidjs/start`, `solid-js`, `@biomejs/biome`, and `typescript`. [VERIFIED: npm registry]

### Secondary (MEDIUM confidence)

- Official South Dakota search-index snippets for `https://sdlegislature.gov/Session/BillStatus/71`, `https://sdlegislature.gov/Session/Bills/71`, and `https://sdlegislature.gov/Session/Committee/1261/Bills`, used only to corroborate official public page discoverability because the direct HTML route is SPA-backed in curl. [CITED: web search result snippets from official `sdlegislature.gov`]
- Official Wyoming search-index snippets for `https://wyoleg.gov/2025/Digest/HB0201.pdf`, used only to corroborate official digest discoverability. [CITED: web search result snippets from official `wyoleg.gov`]

### Tertiary (LOW confidence)

- None. [VERIFIED: source review]

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH - existing repo stack verified from package scripts, local commands, and npm registry checks; no new dependency is recommended. [VERIFIED: `package.json`, local commands, npm registry]
- Architecture: HIGH - publication, deferral, generated-artifact, and validation paths are established by existing code and Phase 15 verification. [VERIFIED: codebase audit, `15-VERIFICATION.md`]
- Official source sufficiency: HIGH - both candidates have current official text plus official final-status evidence from state legislature sources. [VERIFIED: official SD/WY sources]
- Pitfalls: HIGH - derived from existing tests, generated-artifact flow, and official source behavior observed during research. [VERIFIED: codebase audit and local source checks]

**Research date:** 2026-06-02
**Valid until:** 2026-06-09 for official-source posture checks; content architecture findings are stable until the repo changes its content pipeline. [VERIFIED: current date and repo audit]
