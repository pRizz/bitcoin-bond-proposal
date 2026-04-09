---
phase: 11-expanded-state-coverage
generated_by: gsd-discuss-phase
lifecycle_mode: yolo
phase_lifecycle_id: phase-20260409T105243Z
generated_at: 2026-04-09T10:52:43.446Z
---

# Phase 11: Expanded State Coverage - Context

**Gathered:** 2026-04-09
**Status:** Ready for planning

<domain>
## Phase Boundary

Publish the next trustworthy batch of canonical state entries on top of the refresh-aware registry workflow from Phase 10. This phase decides which new states to publish, authors the canonical narrative records, and promotes them into the public published batch. It does not redesign public registry routes beyond what the compiled graph already enables.

</domain>

<decisions>
## Implementation Decisions

### Batch selection
- **D-01:** The next publishable batch is:
  - Florida
  - Maryland
  - North Carolina
  - Ohio
  - Wyoming
- **D-02:** The batch is intentionally reserve-heavy overall, but North Carolina stays because it is the clearest bridge to the project’s bond-financing thesis through explicit reserve-backed bond language.
- **D-03:** The phase should prioritize clean official legislative sourcing and honest status language over maximizing the batch size beyond these five states.

### Publication workflow
- **D-04:** Manifest entries for the chosen states should move to `queued` first so authoring can proceed without prematurely exposing them as public published records.
- **D-05:** Canonical state-entry files may exist while the manifest remains `queued`, relying on the Phase 10 compile boundary to keep them out of public published routes until the final promotion step.
- **D-06:** The final plan in the phase should promote all five selected states to `published` together and add `reviewCadenceDays`.

### Editorial and record style
- **D-07:** Each new entry should keep the established registry structure:
  - at-a-glance summary
  - legislative status
  - what this would actually do
  - bond / reserve analysis
  - key statutory mechanics
  - why this matters
  - source trail
  - confidence / completeness note
- **D-08:** Status language must stay literal to the official legislative record, even when the bill stalled or only reached committee.
- **D-09:** The registry should continue to say explicitly whether each proposal supports direct reserve accumulation, bond-financed reserve accumulation, or neither in a meaningful way.

### the agent's Discretion
- Exact split of the five-state batch across Plans 11-02 and 11-03.
- Exact short-note wording and editorial-priority choices, as long as they stay consistent with the batch thesis.
- Exact prose in the “Why This Matters” section, as long as it remains brief, source-first, and non-hype.

</decisions>

<specifics>
## Specific Ideas

- Florida matters because it moved farther than many state bitcoin reserve bills and applied the concept to multiple public-fund buckets.
- Maryland matters because it uses seized-gambling proceeds as a funding source rather than a broad general-fund reserve framing.
- North Carolina matters because it combines reserve language, lending/mining ideas, and explicit reserve-backed bond use.
- Ohio matters because it combines a reserve fund with state-entity crypto payment acceptance, making it broader than a pure treasury reserve bill.
- Wyoming matters because it explicitly reaches general and permanent state funds, even though it died early.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Milestone scope
- `.planning/PROJECT.md` — v1.2 milestone goals and constraints
- `.planning/REQUIREMENTS.md` — `CATA-07`, `CATA-08`
- `.planning/ROADMAP.md` — Phase 11 goal, plans, and success criteria

### Registry contract
- `.planning/phases/10-refresh-workflow-foundation/10-CONTEXT.md` — refresh-aware workflow and published-versus-queued boundary
- `.planning/phases/10-refresh-workflow-foundation/10-01-SUMMARY.md` — manifest cadence and compile boundary changes
- `.planning/phases/10-refresh-workflow-foundation/10-02-SUMMARY.md` — audit workflow expectations
- `content/data/state-registry-manifest.json` — current state manifest
- `content/data/state-registry-manifest.README.md` — manifest boundary rules
- `content/states/illinois-hb-1844.md` — descriptive registry style reference
- `content/states/new-hampshire-bfa-bitcoin-backed-bond.md` — bond-side honesty/style reference

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scripts/validate-content.ts`: enforces freshness chronology and manifest/published alignment.
- `scripts/compile-content.ts`: only publishes manifest-`published` state files into the generated graph.
- `generated/content-graph.json`: already carries the current five-state published batch and refresh metadata.

### Established Patterns
- One published registry record per state slug.
- File names can include bill IDs, but public route slugs stay at the state level.
- Public entries cite official legislative sources first and use snapshot-based dates with visible confidence levels.

### Integration Points
- Manifest status updates control when new state files become public routes.
- New entries flow automatically to the site through compile output once promoted to `published`.
- `bun run audit:refresh` should remain useful after the expanded batch lands.

</code_context>

<deferred>
## Deferred Ideas

- Public catalog/status redesign for queued and unresearched states — Phase 12
- Selective `mystic-ui` polish on public surfaces — Phase 13
- Comparison or cluster pages beyond the catalog — future milestone work

</deferred>

---
*Phase: 11-expanded-state-coverage*
*Context gathered: 2026-04-09*
