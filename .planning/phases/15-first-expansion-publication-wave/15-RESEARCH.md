# Phase 15: First Expansion Publication Wave - Research

**Researched:** 2026-05-31 [VERIFIED: current_date]
**Domain:** Repo-owned legislative content publication through canonical Markdown, manifest, compiled content graph, refresh queue, and SolidStart state routes. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; scripts/compile-content.ts; src/routes/(site)/states/[slug].tsx]
**Confidence:** HIGH for the required five-state batch and repo implementation path; MEDIUM for optional South Dakota/Wyoming inclusion because their final statuses are official-source-confirmed but were originally outside the ready-to-author queue. [VERIFIED: generated/refresh/state-priority-queue.md; CITED: https://sdlegislature.gov/api/Bills/ActionLog/26633; CITED: https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments]

<user_constraints>
## User Constraints (from CONTEXT.md)

Source: copied from `.planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md`. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]

### Locked Decisions

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

### Deferred Ideas (OUT OF SCOPE)

- South Dakota and Wyoming publication should be deferred unless official final status can be confirmed cleanly during this phase.
- Full deferral ledger coverage for all remaining high-interest states belongs to Phase 16.
- Catalog, cluster, comparison, and visual surface changes for the expanded registry belong to Phase 17 unless existing data surfaces break with the larger published set.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CATA-14 | Newly published state entries compile into the manifest, content graph, generated route data, and public state-detail pages without route-specific exceptions. [VERIFIED: .planning/REQUIREMENTS.md] | Use existing `content/states/*.md`, manifest rows, `bun run validate:content`, `bun run compile:content`, and the `/states/[slug]` route path. [VERIFIED: scripts/validate-content.ts; scripts/compile-content.ts; src/routes/(site)/states/[slug].tsx] |
| CATA-15 | Each newly published state entry includes official primary sources, status dates, review dates, proposal classification, confidence cues, and a concise policy-effect summary. [VERIFIED: .planning/REQUIREMENTS.md] | The frontmatter schema already requires primary sources, status date, review date, proposal classification, confidence, and effect fields. [VERIFIED: src/lib/content/schema.ts] |
| REFR-05 | Active or review-due records that need source refresh before publication or comparison work are surfaced ahead of lower-risk expansion work. [VERIFIED: .planning/REQUIREMENTS.md] | Phase 14 generated refresh/priority artifacts already surface all 10 currently published records as due and list the first publication queue. [VERIFIED: generated/refresh/state-priority-queue.md] |
</phase_requirements>

## Summary

Phase 15 should publish the first expansion batch as content work, not route work: author canonical Markdown entries, change only matching manifest records to `published`, regenerate `generated/content-graph.json`, regenerate refresh artifacts, and verify the existing state-detail route consumes the expanded graph. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: content/data/state-registry-manifest.README.md; VERIFIED: scripts/compile-content.ts]

Publish Florida, Kansas, North Dakota, Ohio, and Utah as the required first wave because they are the locked ready-to-author candidates and current official sources still support publication with conservative framing. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; CITED: https://www.flsenate.gov/Session/Bill/2025/550; CITED: https://kslegislature.gov/b2025_26/bills/sb352/; CITED: https://ndlegis.gov/assembly/69-2025/regular/bill-overview/bo1184.html?bill_number=1184&bill_year=2025; CITED: https://www.legislature.ohio.gov/legislation/136/hb18; CITED: https://le.utah.gov/Session/2025/bills/enrolled/HB0230.pdf]

South Dakota and Wyoming can be included only as optional add-ons because final official statuses are now confirmed from official APIs/PDFs, but the plan should keep them separable from the required five-state batch to preserve rollback and avoid broad research drift. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; CITED: https://sdlegislature.gov/api/Bills/ActionLog/26633; CITED: https://mylrc.sdlegislature.gov/api/Documents/298084.pdf; CITED: https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments; CITED: https://www.wyoleg.gov/2025/Introduced/HB0201.pdf]

**Primary recommendation:** Plan a required five-state publication wave, then a separate optional task for South Dakota/Wyoming only if the implementation owner wants to spend the small extra authoring budget after the required batch passes validation. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: generated/refresh/state-priority-queue.md]

## Project Constraints (from AGENTS.md)

- Load repo-local `AGENTS.md`, then `AGENTS.bright-builds.md`, `standards-overrides.md`, and relevant pinned standards before planning or implementation. [VERIFIED: AGENTS.md]
- Use the existing repo conventions and keep recurring repo facts in `AGENTS.md`; record deliberate exceptions in `standards-overrides.md`. [VERIFIED: AGENTS.md; VERIFIED: standards-overrides.md]
- Prefer functional-core/imperative-shell boundaries, parse data at boundaries, and represent invalid states with schemas instead of loose data. [VERIFIED: AGENTS.bright-builds.md; CITED: https://raw.githubusercontent.com/pRizz-Builds/bright-builds/05f8d7a6c9c2e157ec4f922a05273e72dab97676/standards/core/architecture.md]
- Use Bun and the existing TypeScript toolchain; do not introduce Python scripts into this Bun/TypeScript repo for project automation. [VERIFIED: package.json; CITED: https://raw.githubusercontent.com/pRizz-Builds/bright-builds/05f8d7a6c9c2e157ec4f922a05273e72dab97676/standards/languages/typescript-javascript.md]
- Minimize nesting with early returns and use `maybe` prefixes for nullable or optional values when code changes are needed. [VERIFIED: AGENTS.md; CITED: https://raw.githubusercontent.com/pRizz-Builds/bright-builds/05f8d7a6c9c2e157ec4f922a05273e72dab97676/standards/core/code-shape.md]
- Verification before done must include relevant tests, lint/build checks, behavior validation, and diff review. [VERIFIED: AGENTS.md; CITED: https://raw.githubusercontent.com/pRizz-Builds/bright-builds/05f8d7a6c9c2e157ec4f922a05273e72dab97676/standards/core/verification.md]
- Unit tests should verify behavior, not implementation details, and use Arrange/Act/Assert when adding tests. [VERIFIED: AGENTS.md; CITED: https://raw.githubusercontent.com/pRizz-Builds/bright-builds/05f8d7a6c9c2e157ec4f922a05273e72dab97676/standards/core/testing.md]
- No project-specific skills were present under `.claude/skills` or `.agents/skills`. [VERIFIED: shell test -d .claude/skills .agents/skills]

## Standard Stack

### Core

| Library/Tool | Repo Version | Current Registry Version | Purpose | Why Standard |
|--------------|--------------|--------------------------|---------|--------------|
| Bun | 1.3.9 | 1.3.9 installed | Run scripts, tests, and package commands. | The repo declares `bun@1.3.9` and scripts use Bun entrypoints. [VERIFIED: package.json; VERIFIED: bun --version] |
| TypeScript | ^6.0.2 | 6.0.3 latest | Content scripts and application code. | Existing scripts and app code are TypeScript, and Bright Builds points this repo to the TypeScript/Bun toolchain. [VERIFIED: package.json; VERIFIED: npm view typescript version/time.modified; VERIFIED: AGENTS.bright-builds.md] |
| Zod | ^4.3.6 | 4.4.3 latest | Runtime schemas for frontmatter, manifest, taxonomy, and candidate intake. | The existing validators parse all content boundary data with Zod. [VERIFIED: package.json; VERIFIED: npm view zod version/time.modified; VERIFIED: src/lib/content/schema.ts] |
| gray-matter | ^4.0.3 | 4.0.3 latest | Markdown frontmatter parsing. | Existing Markdown collection loading depends on parsed frontmatter. [VERIFIED: package.json; VERIFIED: npm view gray-matter version/time.modified; VERIFIED: src/lib/content/load-markdown.ts] |
| markdown-it | ^14.1.1 | 14.2.0 latest | Markdown body rendering for public content routes. | Existing state detail rendering uses Markdown body content through repo content helpers. [VERIFIED: package.json; VERIFIED: npm view markdown-it version/time.modified; VERIFIED: src/routes/(site)/states/[slug].tsx] |
| SolidStart / Solid | @solidjs/start ^1.3.2, solid-js ^1.9.12 | @solidjs/start 1.3.2, solid-js 1.9.13 latest | Public site framework and routes. | The existing `/states/[slug]` route is SolidStart and consumes the compiled graph without state-specific routes. [VERIFIED: package.json; VERIFIED: npm view @solidjs/start version/time.modified; VERIFIED: npm view solid-js version/time.modified; VERIFIED: src/routes/(site)/states/[slug].tsx] |
| Biome | ^2.4.10 | 2.4.16 latest | Formatting and linting. | Repo scripts use Biome for format and lint checks. [VERIFIED: package.json; VERIFIED: npm view @biomejs/biome version/time.modified] |
| vinxi | ^0.5.11 | 0.5.11 latest | SolidStart build/dev runner. | Repo `build` and `dev` scripts use vinxi. [VERIFIED: package.json; VERIFIED: npm view vinxi version/time.modified] |

### Supporting

| Asset | Version/State | Purpose | When to Use |
|-------|---------------|---------|-------------|
| `content/states/*.md` | 10 current entries | Canonical published state records. | Add Phase 15 entries here and mirror existing headings/tone. [VERIFIED: content/states/texas-sb-21.md; VERIFIED: content/states/arizona-sb-1025.md] |
| `content/data/state-registry-manifest.json` | 50 rows, 10 currently published | Registry status, proposal focus, region, short note, and editorial priority. | Flip only authored states from `unresearched` to `published`. [VERIFIED: content/data/state-registry-manifest.json] |
| `generated/content-graph.json` | 10 current compiled states | Public route data and registry grouping read model. | Regenerate after Markdown/manifest edits. [VERIFIED: generated/content-graph.json; VERIFIED: scripts/compile-content.ts] |
| `generated/refresh/state-priority-queue.md` | Generated 2026-05-31 | Maintainer queue combining refresh work and unpublished candidates. | Use for ordering and then regenerate after publication. [VERIFIED: generated/refresh/state-priority-queue.md] |
| `pdftotext` | 26.03.0 installed | Inspect official PDF bill text when pages are PDFs or JS routes link to PDFs. | Use for official PDF confirmation during authoring. [VERIFIED: pdftotext -v] |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Existing Markdown + manifest + compiled graph | Add route-specific data or hard-coded state pages | Rejected because Phase 15 locks the canonical content path and no route-specific exceptions. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md] |
| Existing Zod schemas | Ad hoc JSON/frontmatter checks | Rejected because `validate-content` and `compile-content` already parse the canonical boundary schemas. [VERIFIED: scripts/validate-content.ts; VERIFIED: scripts/compile-content.ts; VERIFIED: src/lib/content/schema.ts] |
| Official state pages/PDFs/APIs | Secondary legal/news summaries | Rejected for primary status/mechanics claims because Phase 15 requires official source footing. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md] |

**Installation:** No new installation is recommended for Phase 15. [VERIFIED: package.json; VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]

```bash
# Use existing dependencies; no package add/install step is needed unless the local checkout lacks node_modules.
bun install
```

**Version verification:** The registry versions above were checked with `npm view <package> version time.modified` on 2026-05-31. [VERIFIED: npm view @solidjs/start solid-js zod gray-matter markdown-it @biomejs/biome typescript vinxi]

## Architecture Patterns

### Recommended Project Structure

```text
content/
├── states/                         # New canonical public Markdown entries. [VERIFIED: content/states/texas-sb-21.md]
└── data/
    └── state-registry-manifest.json # Publish/unresearched boundary and registry metadata. [VERIFIED: content/data/state-registry-manifest.json]
generated/
├── content-graph.json              # Derived public read model. [VERIFIED: scripts/compile-content.ts]
└── refresh/
    ├── state-refresh-queue.json    # Derived refresh queue. [VERIFIED: scripts/build-refresh-queue.ts]
    └── state-priority-queue.json   # Derived combined priority queue. [VERIFIED: scripts/build-refresh-queue.ts]
src/routes/(site)/states/[slug].tsx # Existing canonical detail route. [VERIFIED: src/routes/(site)/states/[slug].tsx]
```

### Pattern 1: Official-Source Gate Before Authoring

**What:** Confirm current official status/mechanics from state pages, PDFs, or official APIs before drafting each state entry. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]

**When to use:** Use before every new Phase 15 entry, including entries already listed as ready in the Phase 14 queue. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: generated/refresh/state-priority-queue.md]

**Example candidate decisions:** Florida remains failed on 2025-06-16, Kansas should use 2026-04-10 rather than stale queue data, North Dakota failed on 2025-01-31, Ohio remains in House committee as of 2025-01-28, and Utah is effective 2025-05-07 with broader blockchain/digital-asset provisions. [CITED: https://www.flsenate.gov/Session/Bill/2025/550; CITED: https://kslegislature.gov/b2025_26/bills/SB352/history/; CITED: https://ndlegis.gov/assembly/69-2025/regular/bill-overview/bo1184.html?bill_number=1184&bill_year=2025; CITED: https://www.legislature.ohio.gov/legislation/136/hb18/status; CITED: https://le.utah.gov/Session/2025/bills/enrolled/HB0230.pdf]

### Pattern 2: Mirror Existing State Entry Shape

**What:** Use the same frontmatter contract and section sequence as current enacted/failed entries. [VERIFIED: content/states/texas-sb-21.md; VERIFIED: content/states/arizona-sb-1025.md; VERIFIED: src/lib/content/schema.ts]

**When to use:** Use for all new entries so validation, compilation, route rendering, and reader expectations remain stable. [VERIFIED: scripts/validate-content.ts; VERIFIED: scripts/compile-content.ts; VERIFIED: src/routes/(site)/states/[slug].tsx]

**Entry skeleton:** Source pattern is the existing state Markdown plus `StateEntryFrontmatterSchema`. [VERIFIED: content/states/texas-sb-21.md; VERIFIED: src/lib/content/schema.ts]

```markdown
---
title: "State Bill Title"
slug: "state-bill-id"
summary: "One-sentence verified summary."
state: "State"
recordType: "legislative-bill"
proposalKind: "reserve"
proposalSubtype: "strategic-reserve"
billId: "HB 0000"
chamber: "House"
status: "Official status text"
legislativeStatusGroup: "failed"
statusAsOf: "YYYY-MM-DD"
lastReviewed: "2026-05-31"
sponsors:
  - "Sponsor Name"
primarySources:
  - "https://official.example.gov/bill"
secondarySources: []
confidence: "high"
effect: "Concise policy-effect summary."
classificationNote: "Use when the classification needs conservative context."
---

## At a Glance

## Legislative Status

## What This Would Actually Do

## Bond / Reserve Analysis

## Key Statutory Mechanics

## Why This Matters

## Source Trail

## Confidence / Completeness Note
```

### Pattern 3: Publish by Manifest + Compile, Not Routes

**What:** Mark the matching manifest rows as `published`, add Markdown entries, then run compile and refresh scripts so public routes consume the graph. [VERIFIED: content/data/state-registry-manifest.README.md; VERIFIED: scripts/compile-content.ts; VERIFIED: src/lib/site/content.ts]

**When to use:** Use for each new state entry and never create route-specific exceptions for new slugs. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: src/routes/(site)/states/[slug].tsx]

**Manifest row pattern:** Manifest fields are enforced by `StateRegistryManifestEntrySchema`. [VERIFIED: src/lib/content/schema.ts]

```json
{
  "state": "Florida",
  "slug": "florida",
  "registryStatus": "published",
  "proposalFocus": "reserve",
  "region": "south",
  "shortNote": "Failed 2025 public-funds Bitcoin investment proposal.",
  "editorialPriority": "reserve-priority"
}
```

### Pattern 4: Targeted Generated-Content Check

**What:** After `bun run compile:content`, check `generated/content-graph.json` for count growth and expected slugs. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: scripts/compile-content.ts]

**When to use:** Use in the verification plan because normal validation confirms authored files have legal manifest rows but does not prove every intended new slug is present. [VERIFIED: scripts/validate-content.ts; VERIFIED: scripts/compile-content.ts]

```bash
bun -e 'const graph = JSON.parse(await Bun.file("generated/content-graph.json").text()); const slugs = graph.states.map((s) => s.slug).sort(); const expected = ["florida-sb-550","kansas-sb-352","north-dakota-hb-1184","ohio-hb-18","utah-hb-230"]; console.log({ count: slugs.length, expectedPresent: expected.every((slug) => slugs.includes(slug)), missing: expected.filter((slug) => !slugs.includes(slug)) });'
```

## Candidate Source Matrix

| Candidate | Planner Decision | Current Official Posture | Classification Guidance | Source |
|-----------|------------------|--------------------------|-------------------------|--------|
| Florida SB 550 / HB 487 | Publish in required batch. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md] | SB 550 died in Banking and Insurance on 2025-06-16; companion HB 487 died in Government Operations Subcommittee on 2025-06-16. [CITED: https://www.flsenate.gov/Session/Bill/2025/550; CITED: https://www.flsenate.gov/Session/Bill/2025/487] | Failed high-relevance public-funds-in-Bitcoin proposal; `legislativeStatusGroup: failed`; likely `proposalSubtype: strategic-reserve`. [CITED: https://www.flsenate.gov/Session/Bill/2025/550] | Official Florida Senate/House pages. [CITED: https://www.flsenate.gov/Session/Bill/2025/550; CITED: https://www.flsenate.gov/Session/Bill/2025/487] |
| Kansas SB 352 | Publish in required batch, but correct stale Phase 14 date. [VERIFIED: generated/refresh/state-priority-queue.md; CITED: https://kslegislature.gov/b2025_26/bills/SB352/history/] | Kansas official history shows SB 352 died in committee on 2026-04-10. [CITED: https://kslegislature.gov/b2025_26/bills/SB352/history/] | Failed bitcoin/digital assets reserve fund proposal; use `mixed-digital-asset-reserve` if text covers both bitcoin and broader digital assets. [CITED: https://kslegislature.gov/b2025_26/bills/sb352/] | Official Kansas bill and history pages. [CITED: https://kslegislature.gov/b2025_26/bills/sb352/; CITED: https://kslegislature.gov/b2025_26/bills/SB352/history/] |
| North Dakota HB 1184 | Publish in required batch. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md] | Official overview marks HB 1184 failed after second reading, 32 yeas and 57 nays, on 2025-01-31. [CITED: https://ndlegis.gov/assembly/69-2025/regular/bill-overview/bo1184.html?bill_number=1184&bill_year=2025] | Failed digital-assets-and-precious-metals investment authority; use conservative reserve/digital-asset framing. [CITED: https://ndlegis.gov/assembly/69-2025/regular/documents/25-0419-01000.pdf] | Official North Dakota overview and bill text PDF. [CITED: https://ndlegis.gov/assembly/69-2025/regular/bill-overview/bo1184.html?bill_number=1184&bill_year=2025; CITED: https://ndlegis.gov/assembly/69-2025/regular/documents/25-0419-01000.pdf] |
| Ohio HB 18 | Publish in required batch. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md] | Official status shows referral to House Technology and Innovation Committee on 2025-01-28. [CITED: https://www.legislature.ohio.gov/legislation/136/hb18/status] | Active committee-stage Ohio Strategic Cryptocurrency Reserve Act; `legislativeStatusGroup: introduced`, not failed/enacted. [CITED: https://www.legislature.ohio.gov/legislation/136/hb18] | Official Ohio bill and status pages. [CITED: https://www.legislature.ohio.gov/legislation/136/hb18; CITED: https://www.legislature.ohio.gov/legislation/136/hb18/status] |
| Utah HB 230 | Publish in required batch with careful framing. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md] | Enrolled HB 230 took effect on 2025-05-07 and includes broader blockchain/digital-asset provisions. [CITED: https://le.utah.gov/Session/2025/bills/enrolled/HB0230.pdf] | Use `mixed-digital-asset-reserve` or another conservative subtype and explain that the final law is broader than a narrow Bitcoin reserve. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; CITED: https://le.utah.gov/Session/2025/bills/enrolled/HB0230.pdf] | Official Utah static page and enrolled PDF. [CITED: https://le.utah.gov/Session/2025/bills/static/HB0230.html; CITED: https://le.utah.gov/Session/2025/bills/enrolled/HB0230.pdf] |
| South Dakota HB 1155 | Optional only; separable task. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md] | Official API action log shows HB 1155 was deferred to the 41st legislative day on 2026-02-06 after House committee hearing scheduling. [CITED: https://sdlegislature.gov/api/Bills/ActionLog/26633] | Treat as inactive/failed-style terminal record unless implementation confirms South Dakota terminology warrants different status copy; bill text permits state investment in Bitcoin. [CITED: https://sdlegislature.gov/api/Bills/ActionLog/26633; CITED: https://mylrc.sdlegislature.gov/api/Documents/298084.pdf] | Official South Dakota bill API/action log and official introduced PDF. [CITED: https://sdlegislature.gov/api/Bills/26633; CITED: https://sdlegislature.gov/api/Bills/ActionLog/26633; CITED: https://mylrc.sdlegislature.gov/api/Documents/298084.pdf] |
| Wyoming HB0201 | Optional only; separable task. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md] | Official API shows HB0201 inactive with last action `H:Died in Committee Returned Bill Pursuant to HR 5-4` on 2025-03-03. [CITED: https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments] | Failed state/permanent-fund Bitcoin investment proposal; `legislativeStatusGroup: failed`; official text authorizes state-fund and permanent-fund Bitcoin investment. [CITED: https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments; CITED: https://www.wyoleg.gov/2025/Introduced/HB0201.pdf] | Official Wyoming API and official introduced PDF. [CITED: https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments; CITED: https://www.wyoleg.gov/2025/Introduced/HB0201.pdf] |

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frontmatter validation | Manual field checks in scripts or routes | `StateEntryFrontmatterSchema` and `bun run validate:content` | The schema already enforces required fields, enums, ISO dates, source URLs, confidence, and effect text. [VERIFIED: src/lib/content/schema.ts; VERIFIED: scripts/validate-content.ts] |
| Markdown parsing | Custom regex or partial frontmatter parsing | Existing Markdown collection loader with gray-matter | The validation and compile scripts already load canonical Markdown collections through repo helpers. [VERIFIED: scripts/validate-content.ts; VERIFIED: scripts/compile-content.ts; VERIFIED: src/lib/content/load-markdown.ts] |
| Public route data | Route-specific state imports or slug switches | `generated/content-graph.json` through `src/lib/site/content.ts` | The compiled graph already feeds published state route accessors. [VERIFIED: generated/content-graph.json; VERIFIED: src/lib/site/content.ts; VERIFIED: src/routes/(site)/states/[slug].tsx] |
| Candidate ordering | Manual spreadsheet or ad hoc priority list | `bun run refresh:queue` and Phase 14 priority artifacts | The queue already combines published refresh work and unpublished candidate intake. [VERIFIED: scripts/build-refresh-queue.ts; VERIFIED: generated/refresh/state-priority-queue.md] |
| Official legal status | Secondary-source interpretation | Official state pages/PDFs/APIs with dated `statusAsOf` and `lastReviewed` | The phase requires official source confirmation and exclusion when official confirmation fails. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md] |
| Security sanitization | New homemade HTML rendering or raw HTML injection | Existing Markdown rendering and schema-bounded URL/content fields | The route already renders known state body content and schemas validate URL/frontmatter boundaries. [VERIFIED: src/routes/(site)/states/[slug].tsx; VERIFIED: src/lib/content/schema.ts] |

**Key insight:** This phase is mostly a data-contract and source-quality problem; the planner should spend effort on official evidence, conservative classification, and generated artifact verification rather than new app architecture. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: scripts/compile-content.ts; VERIFIED: src/lib/content/schema.ts]

## Common Pitfalls

### Pitfall 1: Repeating Stale Phase 14 Candidate Details

**What goes wrong:** Kansas would be authored with the stale `2025-05-02` status date from the generated queue instead of the current official `2026-04-10` death-in-committee history. [VERIFIED: generated/refresh/state-priority-queue.md; CITED: https://kslegislature.gov/b2025_26/bills/SB352/history/]

**Why it happens:** The priority queue is a dated maintainer artifact, not a substitute for official-source checks before publication. [VERIFIED: generated/refresh/state-priority-queue.md; VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]

**How to avoid:** Recheck each official page/PDF/API and use the current official posture in the public entry. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]

**Warning signs:** `statusAsOf` copied from `state-priority-queue.md` without matching the official source trail. [VERIFIED: generated/refresh/state-priority-queue.md]

### Pitfall 2: Overclaiming Utah as a Narrow Bitcoin Reserve Enactment

**What goes wrong:** The entry could imply Utah enacted a narrow Bitcoin reserve when the enrolled text is broader blockchain/digital-asset legislation. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; CITED: https://le.utah.gov/Session/2025/bills/enrolled/HB0230.pdf]

**Why it happens:** Bill titles and candidate notes can be narrower than final enacted text. [VERIFIED: generated/refresh/state-priority-queue.md; CITED: https://le.utah.gov/Session/2025/bills/enrolled/HB0230.pdf]

**How to avoid:** Use conservative `proposalSubtype` and a `classificationNote` explaining the broader final statute. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: src/lib/content/schema.ts]

**Warning signs:** Missing `classificationNote` or no mention that final law covers digital assets/blockchain activity broadly. [VERIFIED: content/states/texas-sb-21.md; VERIFIED: content/states/arizona-sb-1025.md]

### Pitfall 3: Manifest and Markdown Drift

**What goes wrong:** A state Markdown file can exist without a matching manifest row set to a public-compatible status, or a manifest row can be changed without an authored file. [VERIFIED: scripts/validate-content.ts; VERIFIED: scripts/compile-content.ts]

**Why it happens:** `assertManifestMatchesPublishedStates` protects authored state files against missing manifest entries, but the phase also needs proof that intended new slugs are present in the compiled graph. [VERIFIED: scripts/validate-content.ts; VERIFIED: scripts/compile-content.ts; VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]

**How to avoid:** Add the targeted graph count/slug check after compilation. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]

**Warning signs:** `bun run validate:content` passes but the compiled graph count or expected slug list is wrong. [VERIFIED: scripts/validate-content.ts; VERIFIED: scripts/compile-content.ts]

### Pitfall 4: Treating JS-Rendered Official Pages as Unusable

**What goes wrong:** South Dakota or Wyoming could be deferred even when official APIs/PDFs are available and enough to confirm final status. [CITED: https://sdlegislature.gov/api/Bills/ActionLog/26633; CITED: https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments]

**Why it happens:** Public bill pages can render through JavaScript while exposing official API endpoints or official document PDFs. [CITED: https://sdlegislature.gov/#/Session/Bill/26633; CITED: https://www.wyoleg.gov/Legislation/2025/HB0201]

**How to avoid:** Use the official API/PDF only when it is clearly state-hosted and cite it in the source trail. [CITED: https://sdlegislature.gov/api/Bills/ActionLog/26633; CITED: https://mylrc.sdlegislature.gov/api/Documents/298084.pdf; CITED: https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments; CITED: https://www.wyoleg.gov/2025/Introduced/HB0201.pdf]

**Warning signs:** A candidate stays `needs-status-confirmation` after official action-log/API evidence has been found. [VERIFIED: generated/refresh/state-priority-queue.md; CITED: https://sdlegislature.gov/api/Bills/ActionLog/26633; CITED: https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments]

### Pitfall 5: Letting Phase 17 Surface Copy Leak Into Phase 15

**What goes wrong:** The planner could spend Phase 15 redesigning catalog/cluster/compare copy instead of publishing validated state records. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]

**Why it happens:** Some surfaces still contain ten-state framing while the data model itself can grow. [VERIFIED: src/routes/(site)/states/clusters.tsx; VERIFIED: src/routes/(site)/states/compare.tsx]

**How to avoid:** Fix only data-contract breakage in Phase 15 and leave visual/surface refresh to Phase 17 unless expanded data breaks rendering. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: .planning/ROADMAP.md]

**Warning signs:** A plan includes broad UI copy rewrites, catalog redesign, or cluster/compare visual changes without a failing data-contract check. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: .planning/ROADMAP.md]

## Code Examples

### Content Validation and Compilation Commands

These commands are the phase's core implementation verification path. [VERIFIED: package.json; VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]

```bash
bun run validate:content
bun run compile:content
bun run refresh:queue
bunx tsc --noEmit
bun run build
bun test
bun run precommit
```

### Compile Graph Contract

The compiled graph includes state route fields, registry `publishedSlugs`, generated date, and grouping buckets. [VERIFIED: scripts/compile-content.ts]

```typescript
// Source: scripts/compile-content.ts [VERIFIED: scripts/compile-content.ts]
return {
  states: compiledStates,
  registry: {
    manifest: registryManifest,
    publishedSlugs: compiledStates.map((state) => state.slug),
    generatedAt,
    groups: buildRegistryGroups(compiledStates),
  },
  taxonomy,
};
```

### Targeted Slug Check for Required Batch

Use this after `bun run compile:content`; adjust `expected` if optional South Dakota/Wyoming are deliberately included. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: scripts/compile-content.ts]

```bash
bun -e '
const graph = JSON.parse(await Bun.file("generated/content-graph.json").text());
const expected = new Set([
  "florida-sb-550",
  "kansas-sb-352",
  "north-dakota-hb-1184",
  "ohio-hb-18",
  "utah-hb-230",
]);
const actual = new Set(graph.states.map((state) => state.slug));
const missing = [...expected].filter((slug) => !actual.has(slug));
if (missing.length > 0) {
  throw new Error(`Missing compiled state slug(s): ${missing.join(", ")}`);
}
console.log(`Compiled ${actual.size} state entries with required Phase 15 slugs.`);
'
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Static ten-state registry only | Dated priority queue plus canonical authored entries and compiled graph | Phase 14 created the combined priority artifacts for Phase 15. [VERIFIED: .planning/ROADMAP.md; VERIFIED: generated/refresh/state-priority-queue.md] | Planner should use queue ordering but still perform official-source rechecks. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md] |
| Manual public route assumptions | Data-driven state detail route from `generated/content-graph.json` | Existing Phase 15 context locks `/states/[slug]` as canonical. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: src/routes/(site)/states/[slug].tsx] | No new routes or special cases should be planned. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md] |
| Candidate intake as public content | Candidate intake remains non-public and generated artifacts remain derived | Phase 14 established candidate/refresh artifact boundaries. [VERIFIED: .planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md; VERIFIED: content/data/state-registry-manifest.README.md] | Public claims must live in authored Markdown with official source trail. [VERIFIED: content/states/texas-sb-21.md; VERIFIED: content/states/arizona-sb-1025.md] |

**Deprecated/outdated:**
- The Kansas Phase 14 status date is outdated for public authoring because the current official Kansas history page shows a 2026-04-10 death-in-committee action. [VERIFIED: generated/refresh/state-priority-queue.md; CITED: https://kslegislature.gov/b2025_26/bills/SB352/history/]
- Treating Utah as a narrow Bitcoin reserve enactment is outdated for public authoring because the enrolled text is broader digital-asset/blockchain legislation. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; CITED: https://le.utah.gov/Session/2025/bills/enrolled/HB0230.pdf]

## Assumptions Log

All claims in this research were verified against repo files, local commands, npm registry metadata, or official state sources in this session; no `[ASSUMED]` claims are intentionally present. [VERIFIED: codebase audit; VERIFIED: npm view; CITED: official state source URLs listed in Sources]

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| None | No assumed claims recorded. [VERIFIED: manual review of this file] | All sections | N/A |

## Open Questions

1. **Should optional South Dakota and Wyoming be included in Phase 15?** [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]
   - What we know: South Dakota final official action is confirmed as deferred to the 41st legislative day on 2026-02-06, and Wyoming final official action is confirmed as inactive/died in committee on 2025-03-03. [CITED: https://sdlegislature.gov/api/Bills/ActionLog/26633; CITED: https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments]
   - What's unclear: The user locked those states as optional, not required, so including them depends on desired implementation scope rather than source availability. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]
   - Recommendation: Plan them as a separate optional task after the required five states pass validation. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]

2. **How much existing published refresh work must happen before expansion?** [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]
   - What we know: The current priority queue marks all 10 published records as due, and the phase only requires refreshing records whose stale posture would block trustworthy comparison/catalog/freshness claims. [VERIFIED: generated/refresh/state-priority-queue.md; VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]
   - What's unclear: No specific published record was identified in the phase context as blocking this publication wave. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md]
   - Recommendation: Include a Wave 0 gate that inspects active/review-due records for blockers, but do not make broad refresh of all 10 published entries a prerequisite unless a concrete blocking claim is found. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: generated/refresh/state-priority-queue.md]

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| Bun | Scripts, tests, build, content validation | Yes | 1.3.9 | Install repo package manager if missing. [VERIFIED: bun --version; VERIFIED: package.json] |
| Node.js | GSD tooling and npm registry checks | Yes | v24.13.0 | Use installed Bun for repo scripts; Node remains needed for GSD helper tools. [VERIFIED: node --version] |
| Git | Diff review and optional research commit | Yes | 2.53.0 | No practical fallback for commit workflow. [VERIFIED: git --version] |
| pdftotext | Official PDF text inspection | Yes | 26.03.0 | Use browser/PDF viewer manually if missing. [VERIFIED: pdftotext -v] |
| Network access to official state sources | Source verification | Yes | Official URLs fetched during research | Exclude candidate if official sources cannot be reached or confirmed. [CITED: official URLs listed in Candidate Source Matrix; VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md] |

**Missing dependencies with no fallback:** None found during this research pass. [VERIFIED: bun --version; VERIFIED: node --version; VERIFIED: git --version; VERIFIED: pdftotext -v]

**Missing dependencies with fallback:** None found during this research pass. [VERIFIED: bun --version; VERIFIED: node --version; VERIFIED: git --version; VERIFIED: pdftotext -v]

## Security Domain

Security enforcement is enabled by default because `.planning/config.json` does not explicitly set `security_enforcement` to `false`. [VERIFIED: .planning/config.json]

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Phase 15 adds public content and does not introduce authentication. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: src/routes/(site)/states/[slug].tsx] |
| V3 Session Management | No | Phase 15 adds public content and does not introduce sessions. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: src/routes/(site)/states/[slug].tsx] |
| V4 Access Control | No | State pages are public and route access is data-driven. [VERIFIED: src/routes/(site)/states/[slug].tsx; VERIFIED: src/lib/site/content.ts] |
| V5 Input Validation | Yes | Zod schemas validate frontmatter, manifest, taxonomy, dates, enum values, and source URLs. [VERIFIED: src/lib/content/schema.ts] |
| V6 Cryptography | No | Phase 15 discusses legislative Bitcoin proposals but does not implement cryptography. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: package.json] |

### Known Threat Patterns for This Stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Invalid or malicious source URLs in frontmatter | Tampering | Use `SourceLinkSchema` URL validation and review official-source domains before publication. [VERIFIED: src/lib/content/schema.ts; VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md] |
| Stale or misleading legal status claims | Repudiation / Information Disclosure | Require official source checks, `statusAsOf`, `lastReviewed`, and confidence notes. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: src/lib/content/schema.ts] |
| Unsafe HTML rendering from authored Markdown | Tampering | Do not introduce raw HTML rendering changes; keep the existing Markdown route path and schema-reviewed content workflow. [VERIFIED: src/routes/(site)/states/[slug].tsx; VERIFIED: scripts/validate-content.ts] |
| Route-specific exceptions hiding broken content | Tampering / Reliability | Require compile graph slug checks and use existing `/states/[slug]` accessors. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: scripts/compile-content.ts; VERIFIED: src/lib/site/content.ts] |

## Sources

### Primary (HIGH confidence)

- `.planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md` - locked decisions, source gate, public content shape, verification contract, optional/deferred scope. [VERIFIED: codebase]
- `.planning/REQUIREMENTS.md` - CATA-14, CATA-15, REFR-05 requirement text. [VERIFIED: codebase]
- `.planning/ROADMAP.md` - Phase 15 goal, dependency, and success criteria. [VERIFIED: codebase]
- `.planning/phases/14-candidate-priority-and-refresh-intake/14-CONTEXT.md` - direct dependency boundaries for queue/candidate intake. [VERIFIED: codebase]
- `generated/refresh/state-priority-queue.md` - current generated priority ordering and stale published refresh work. [VERIFIED: codebase]
- `content/data/state-registry-manifest.json` - 50-state manifest and current published/unresearched boundary. [VERIFIED: codebase]
- `content/states/texas-sb-21.md` and `content/states/arizona-sb-1025.md` - enacted and failed entry patterns. [VERIFIED: codebase]
- `src/lib/content/schema.ts` - frontmatter, manifest, taxonomy, and candidate intake schemas. [VERIFIED: codebase]
- `scripts/validate-content.ts`, `scripts/compile-content.ts`, `scripts/build-refresh-queue.ts` - validation, graph compilation, and refresh/priority generation. [VERIFIED: codebase]
- `src/lib/site/content.ts` and `src/routes/(site)/states/[slug].tsx` - public route data access and state-detail rendering. [VERIFIED: codebase]
- `package.json` - scripts, package manager, dependency ranges. [VERIFIED: codebase]
- Florida official SB 550 page and HB 487 companion page. [CITED: https://www.flsenate.gov/Session/Bill/2025/550; CITED: https://www.flsenate.gov/Session/Bill/2025/487]
- Kansas official SB 352 page and history page. [CITED: https://kslegislature.gov/b2025_26/bills/sb352/; CITED: https://kslegislature.gov/b2025_26/bills/SB352/history/]
- North Dakota official HB 1184 overview and bill text PDF. [CITED: https://ndlegis.gov/assembly/69-2025/regular/bill-overview/bo1184.html?bill_number=1184&bill_year=2025; CITED: https://ndlegis.gov/assembly/69-2025/regular/documents/25-0419-01000.pdf]
- Ohio official HB 18 summary and status pages. [CITED: https://www.legislature.ohio.gov/legislation/136/hb18; CITED: https://www.legislature.ohio.gov/legislation/136/hb18/status]
- Utah official HB 230 static page and enrolled PDF. [CITED: https://le.utah.gov/Session/2025/bills/static/HB0230.html; CITED: https://le.utah.gov/Session/2025/bills/enrolled/HB0230.pdf]
- South Dakota official HB 1155 bill API, action log API, and introduced PDF. [CITED: https://sdlegislature.gov/api/Bills/26633; CITED: https://sdlegislature.gov/api/Bills/ActionLog/26633; CITED: https://mylrc.sdlegislature.gov/api/Documents/298084.pdf]
- Wyoming official HB0201 API and introduced PDF. [CITED: https://api.wyoleg.gov/v1/odata/BillReferences?year=2025&billNumber=HB0201&expand=substituteBills,vetoes,amendments; CITED: https://www.wyoleg.gov/2025/Introduced/HB0201.pdf]

### Secondary (MEDIUM confidence)

- `npm view` registry checks for `@solidjs/start`, `solid-js`, `zod`, `gray-matter`, `markdown-it`, `@biomejs/biome`, `typescript`, and `vinxi`. [VERIFIED: npm registry]
- Local CLI probes for Bun, Node.js, Git, and pdftotext. [VERIFIED: local command output]

### Tertiary (LOW confidence)

- None. [VERIFIED: source audit]

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all tooling and libraries are already in `package.json`, and current versions were checked through npm registry metadata. [VERIFIED: package.json; VERIFIED: npm view]
- Architecture: HIGH - the content path is explicit in Phase 15 context and implemented by existing validation/compile/route code. [VERIFIED: .planning/phases/15-first-expansion-publication-wave/15-CONTEXT.md; VERIFIED: scripts/validate-content.ts; VERIFIED: scripts/compile-content.ts; VERIFIED: src/routes/(site)/states/[slug].tsx]
- Candidate source posture: HIGH for Florida, Kansas, North Dakota, Ohio, Utah, and Wyoming; HIGH for South Dakota official action log existence, MEDIUM for exact public wording of South Dakota terminal status because "deferred to the 41st legislative day" should be explained in state-specific legislative terms. [CITED: official URLs in Candidate Source Matrix]
- Pitfalls: HIGH - each pitfall is tied to either code contracts, phase constraints, generated queue data, or official source findings. [VERIFIED: codebase; CITED: official URLs in Candidate Source Matrix]

**Research date:** 2026-05-31 [VERIFIED: current_date]
**Valid until:** 2026-06-07 for legal status/source-posture claims; 2026-06-30 for repo architecture/tooling claims unless dependencies or repo contracts change sooner. [VERIFIED: legal/source freshness requirement in user prompt; VERIFIED: package.json]
