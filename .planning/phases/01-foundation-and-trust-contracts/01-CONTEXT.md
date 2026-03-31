# Phase 1: Foundation and Trust Contracts - Context

**Gathered:** 2026-03-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Create the canonical content system, reserve-vs-bond taxonomy, methodology guardrails, and PDF/pre-commit workflow that all later Illinois documents, state entries, and public site surfaces depend on. This phase defines the trust and publishing contract; it does not add later-phase website features or broaden research scope.

</domain>

<decisions>
## Implementation Decisions

### Canonical content structure
- Canonical authored source should be Markdown with frontmatter for documents and state entries.
- Structured JSON should be used only where lists, controlled vocabularies, or generated indexes make more sense than authored prose.
- Top-level authored content should be grouped by artifact type rather than audience:
  - `content/docs/` for the Illinois packet and methodology
  - `content/states/` for state proposal entries
  - `content/explainers/` for articles
  - `content/data/` for controlled vocabularies or manifests
- Research-registry source files should be one proposal or bill per file, not one state per file.
- Every publishable state-entry source file should require metadata for:
  - `title`
  - `slug`
  - `state`
  - `proposalKind`
  - `proposalSubtype`
  - `billId`
  - `chamber`
  - `status`
  - `statusAsOf`
  - `lastReviewed`
  - `sponsors`
  - `primarySources`
  - `confidence`
  - `summary`

### Reserve vs bond taxonomy
- Top-level `proposalKind` should stay limited to `reserve`, `bond`, or `both`.
- `proposalSubtype` should begin with a deliberately small controlled set:
  - `strategic-reserve`
  - `reserve-financing-bond`
  - `bitcoin-linked-bond`
  - `bitcoin-collateralized-bond`
  - `mixed-digital-asset-reserve`
  - `other-explained`
- If a bill is ambiguous or broad, the canonical entry should include a short editorial note explaining why it was classified that way.
- Digital-asset proposals should only be included in canonical v1 entries when Bitcoin relevance is explicit enough to defend in plain English; otherwise they remain leads or deferred items.

### Methodology and publishability rules
- Official legislative sources are mandatory for every publishable state entry; secondary sources are supportive only.
- A state entry cannot be published unless it includes:
  - official bill or law identifier
  - current status
  - `statusAsOf`
  - `lastReviewed`
  - primary source links
  - plain-English summary
  - “what this would actually do”
  - reserve/bond classification
  - confidence or completeness note
- Partial or clearly incomplete entries should stay out of the canonical public set in v1.
- Public freshness should always be shown as both `Status as of [date]` and `Last reviewed [date]`.
- The methodology page should explicitly say the site is a curated snapshot, not a live legislative feed.

### PDF and pre-commit expectations
- Phase 1 should require PDFs only for the legislator-facing packet:
  - Illinois one-pager
  - Illinois draft bill
  - methodology memo
- Phase 1 PDF quality should prioritize stable pagination, printability, and a professional document feel over fancy styling.
- The pre-commit hook should block on:
  - schema or content validation failures
  - missing required frontmatter or citation metadata
  - required PDF build failures for the packet documents
- Phase 1 should not block commits on a full site build.
- Generated core packet PDFs should be committed to the repo, while the project should avoid committing every possible derived artifact beyond that required set.

### Claude's Discretion
- Exact file and folder names inside the agreed top-level structure.
- Exact schema implementation details beyond the locked metadata and taxonomy fields.
- Exact PDF renderer choice, as long as the result preserves stable pagination, printability, and a professional handoff-ready feel.
- Exact generated-artifact shapes for indexes and read models, as long as canonical authored sources remain the source of truth.

</decisions>

<specifics>
## Specific Ideas

No specific product references or external examples were requested for this phase beyond staying generally aligned with the `free-the-world` research-registry pattern.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---
*Phase: 01-foundation-and-trust-contracts*
*Context gathered: 2026-03-31*
