# Phase 3: Research Registry Core - Context

**Gathered:** 2026-04-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Create the national registry backbone for state reserve and bond proposals, including the 50-state skeleton and the first publishable batch of researched entries. This phase determines how the registry is organized, qualified, written, and prioritized. It does not add new public-site features or widen scope beyond the defined reserve-and-bond registry.

</domain>

<decisions>
## Implementation Decisions

### Coverage and exemplar selection
- The first fully researched state entries should be:
  - Illinois
  - Texas
  - Arizona
  - Oklahoma
  - New Hampshire
- The raw legislative evidence may still be reserve-heavy, but the registry should editorially emphasize bond-financed reserve accumulation as the more important strategic storyline where the evidence supports that framing.
- The first batch should not force an artificial reserve-versus-bond parity if the evidence does not justify it.
- Prioritization for early registry work should be:
  - legal significance first
  - proposal-type diversity second
  - explicit relevance to bond-financed reserve accumulation third, elevated above generic political visibility
- Illinois should be treated as two linked but distinct artifacts:
  - the Illinois packet is the normative Illinois model
  - the Illinois registry record is the descriptive legislative record of what Illinois has actually introduced or considered

### Registry record structure
- Each publishable state entry should use this top-level structure:
  - at-a-glance summary
  - legislative status block
  - what this would actually do
  - bond/reserve analysis
  - key statutory mechanics
  - source trail
  - confidence or completeness note
- Each entry should lead with short narrative blocks for readability.
- Each entry should also include a compact facts table for metadata such as:
  - bill number
  - chamber
  - sponsors
  - status
  - last action
  - dates
- The bond/reserve analysis section should explicitly state whether the proposal supports:
  - direct reserve accumulation
  - bond-financed reserve accumulation
  - or neither in a meaningful way
- The first batch of entries should include a short editorial judgment line such as:
  - why this matters
  - or why this is limited
- That editorial line should remain brief and clearly separated from the factual summary.

### Status and freshness language
- Legislative status language should remain factual and crisp, never inflated.
- Preferred direct status wording includes:
  - Introduced
  - Referred to committee
  - Passed chamber
  - Enacted
- The registry should avoid verbs that imply legal effect when a bill is still pending.
- Freshness metadata should be highly visible near the top of every entry:
  - `Status as of`
  - `Last reviewed`
  - `Confidence`
- Confidence or completeness should use this controlled scale:
  - `High` — official text and status are clear, summary is well-supported
  - `Medium` — core facts are clear, but some interpretive or implementation details remain open
  - `Low` — enough to track, but still thin and should be treated cautiously
- The registry should explicitly say when a proposal is weak, symbolic, or not meaningfully bond-relevant.

### Canonical skeleton strategy
- The 50-state skeleton should begin as a minimal manifest-level record per state.
- Each initial state skeleton record should contain only:
  - state
  - slug
  - current registry status (`unresearched`, `queued`, `published`)
  - proposal focus (`bond`, `reserve`, `both`, or `unknown`)
  - short note
- Acceptable placeholders are only structural placeholders such as:
  - `unresearched`
  - `queued`
- The skeleton must not contain:
  - fake summaries
  - fake statuses
  - guessed bill details
- Canonical published entries in `content/states/` should exist only for states that meet the publishability bar.
- Thinner or incomplete work should live in queue or manifest data rather than in public-facing record files.
- The skeleton should include a small internal editorial-priority field with these values:
  - `bond-priority`
  - `reserve-priority`
  - `neutral`
- That priority field is for internal direction and should not pollute the public-facing factual record.

### Claude's Discretion
- Exact canonical file split between manifests, queue files, and published state-entry files.
- Exact state-entry section names as long as the approved top-level structure remains intact.
- Exact wording of brief editorial judgment lines for the first batch of entries.
- Exact way the internal priority field is encoded in canonical skeleton data.
- Exact ordering of the exemplar batch as long as Illinois, Texas, Arizona, Oklahoma, and New Hampshire remain the core first set.

</decisions>

<specifics>
## Specific Ideas

- The registry should make a stronger strategic point that bond-financed reserve accumulation is preferred over taxpayer-funded reserve accumulation where the evidence and policy framing support that distinction.
- The first batch should still remain honest when a state proposal is reserve-heavy, weak, symbolic, or only indirectly relevant to the bond thesis.
- The Illinois registry entry should be descriptive and official-record-oriented, even though the Illinois packet is normative and model-driven.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---
*Phase: 03-research-registry-core*
*Context gathered: 2026-04-01*
