# Phase 16: Throughput Expansion and Deferral Ledger - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-02T12:13:31.844Z
**Phase:** 16-throughput-expansion-and-deferral-ledger
**Mode:** Yolo
**Areas discussed:** Candidate Scope, Official-Source Gate, Deferral Ledger, Generated Artifacts And Verification

---

## Candidate Scope

| Option | Description | Selected |
|--------|-------------|----------|
| Work only remaining candidates | Start from South Dakota and Wyoming because Phase 15 verified they are the remaining first-publication candidates. | yes |
| Re-open broad national search | Search for additional high-interest states before resolving the remaining queue. | |
| Publish both regardless | Force both candidates into public entries to maximize count. | |

**User's choice:** Yolo selected the remaining-candidate scope.
**Notes:** The phase succeeds by publishing credible candidates or recording concrete deferrals, not by forcing a fixed count.

---

## Official-Source Gate

| Option | Description | Selected |
|--------|-------------|----------|
| Confirm current official status first | Use official legislature/status materials before authoring or deferring either candidate. | yes |
| Reuse prior PDF-only intake | Treat introduced PDFs as enough without final status confirmation. | |
| Use secondary coverage as fallback | Let news or bill-tracking pages substitute for official status evidence. | |

**User's choice:** Yolo selected current official-source confirmation first.
**Notes:** Prior Phase 14/15 decisions require official source footing and current dated review context.

---

## Deferral Ledger

| Option | Description | Selected |
|--------|-------------|----------|
| Use candidate intake as ledger | Keep deferral reasons in `content/data/state-candidate-intake.json`, outside public state-entry content. | yes |
| Create public placeholder pages | Expose unpublished states publicly with caveats. | |
| Planning-only notes | Record deferrals only in planning docs and leave candidate data unchanged. | |

**User's choice:** Yolo selected candidate intake as the canonical deferral ledger.
**Notes:** A maintainer-readable planning note is allowed if useful, but machine-readable candidate data must carry the durable deferral reason.

---

## Generated Artifacts And Verification

| Option | Description | Selected |
|--------|-------------|----------|
| Regenerate and verify all affected artifacts | Run repo-owned compile/refresh scripts and full relevant verification after publication or deferral changes. | yes |
| Only edit source files | Skip generated artifacts until Phase 17. | |
| Minimal validation only | Run content validation without tests/build/precommit. | |

**User's choice:** Yolo selected full affected-artifact regeneration and verification.
**Notes:** Verification must include official-source spot checks for South Dakota and Wyoming plus the repo-native checks.

---

## the agent's Discretion

- Exact prose, filenames, manifest notes, and whether to add a small maintainer-readable deferral note are left to the agent as long as the canonical source/deferral boundary remains clear.

## Deferred Ideas

- Catalog, cluster, comparison, and browser-surface QA remain Phase 17.
- Full 50-state deep publication remains a future milestone unless source availability and throughput support it later.
