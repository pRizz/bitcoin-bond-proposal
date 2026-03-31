# Phase 1: Foundation and Trust Contracts - Research

**Researched:** 2026-03-31
**Status:** Ready for planning

## Objective

Research how to implement Phase 1 well enough that planning can lock a clear plan split, file ownership, and verification path.

## What Phase 1 Must Establish

Phase 1 is the trust and publishing contract for the whole project. It must produce:

- canonical content structure for documents and state entries;
- reserve-vs-bond taxonomy and publishability rules;
- methodology and caution-language guardrails;
- Markdown-to-PDF generation for the Phase 1 packet;
- pre-commit enforcement for validation and required packet artifacts.

## Recommended Repository Shape

Use a content-first layout centered on canonical Markdown and generated read models:

```text
content/
├── docs/
│   ├── illinois-one-pager.md
│   ├── illinois-draft-bill.md
│   └── methodology.md
├── states/
├── explainers/
└── data/

scripts/
├── compile-content.ts
├── validate-content.ts
├── build-pdf.ts
└── precommit.ts

generated/
pdf/
src/lib/content/
```

Guidance:

- Keep Markdown + frontmatter as the canonical authored source.
- Use JSON only for controlled vocabularies, manifests, or generated indexes.
- Keep one proposal per canonical state-entry file.
- Keep `generated/` as a derived layer, not the authoring source of truth.

## Schema and Validation Boundaries

Trust rules should live at the content boundary, not be scattered through later app code.

Recommended split:

- `scripts/validate-content.ts`
  - validates frontmatter and required metadata;
  - enforces publishability gates;
  - fails incomplete canonical entries before they leak into public output.
- `scripts/compile-content.ts`
  - normalizes valid Markdown + JSON into generated read models and indexes;
  - keeps site/runtime consumers off raw Markdown parsing.
- `scripts/build-pdf.ts`
  - renders only the required packet docs in Phase 1.
- `scripts/precommit.ts`
  - orchestrates the exact narrow checks that should block commits.

Validation focus:

- `proposalKind` must remain `reserve`, `bond`, or `both`.
- `proposalSubtype` must stay within the controlled initial set.
- Publishable entries must have bill metadata, dated freshness fields, primary sources, summary text, and “what this would actually do”.
- Incomplete items should remain in non-canonical lead/queue form, not public content.

## Recommended PDF Approach

Use HTML-to-PDF with Playwright for Phase 1.

Why this fits now:

- stays inside the Bun/TypeScript toolchain already chosen for the repo;
- lets the packet and future site share print-oriented templates and typography logic;
- avoids introducing a separate document stack too early.

Trade-offs:

- print CSS and page-break control need care;
- the draft bill may need more tuning than the one-pager or methodology memo;
- browser-based PDF generation adds a local/CI dependency.

Fallback:

- keep canonical Markdown and the `build-pdf.ts` interface stable;
- if fidelity becomes the blocker, replace the renderer internals later without changing the source contract.

Relevant tool checks:

- `playwright@1.58.2`
- `@biomejs/biome@2.4.10`
- `markdown-it@14.1.1`
- `git` supports `core.hooksPath`

## Recommended Pre-Commit Strategy

Keep the hook narrow and deterministic.

Block commits on:

- schema or content validation failures;
- missing required metadata or citation fields;
- failed PDF generation for:
  - Illinois one-pager
  - Illinois draft bill
  - methodology memo

Do not block commits on:

- a full site build;
- nonessential visual polish;
- later-phase explainer or page generation.

Recommended hook sequence:

1. validate content
2. compile generated content graph
3. generate required PDFs
4. fail if required outputs are missing or stale

## Recommended Plan Split

The cleanest Phase 1 breakdown is four plans in three waves:

### Wave 1

- **01-01 Bootstrap workspace and canonical content skeleton**
  - package/tooling bootstrap
  - content/data directory setup
  - baseline repo structure for Phase 1 work

### Wave 2

- **01-02 Implement schemas, taxonomy, validation, and compile scripts**
  - depends on `01-01`
- **01-03 Author methodology and canonical packet source documents**
  - depends on `01-01`

These can run in parallel if they avoid overlapping ownership.

### Wave 3

- **01-04 Implement PDF generation and pre-commit orchestration**
  - depends on `01-02` and `01-03`

## Key Risks and Gotchas

- Overbuilding the schema before the first real packet exists.
- Letting incomplete research entries slip into canonical public content.
- Allowing reserve/bond semantics to drift between files and scripts.
- Letting PDF fidelity consume the entire phase.
- Pulling site-build concerns into Phase 1 and diluting the trust-contract focus.

## Sources

- `.planning/research/SUMMARY.md`
- `.planning/phases/01-foundation-and-trust-contracts/01-CONTEXT.md`
- `npm view playwright version`
- `npm view @biomejs/biome version`
- `npm view markdown-it version`
- `git help config` (`core.hooksPath`)

---
*Phase: 01-foundation-and-trust-contracts*
*Research completed: 2026-03-31*
