# Phase 13: Refresh Workflow and Freshness QA - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the synthesized alternatives.

**Date:** 2026-04-11
**Phase:** 13-refresh-workflow-and-freshness-qa
**Mode:** Yolo
**Areas discussed:** refresh workflow shape, queue triggers, public freshness cues, UI boundaries

---

## Refresh workflow shape

| Option | Description | Selected |
|--------|-------------|----------|
| Generated repo-owned queue | Write refresh artifacts under `generated/refresh/` with Bun scripts and committed outputs | ✓ |
| Canonical in-place mutation | Let refresh workflow rewrite `content/states/*.md` directly | |
| Runtime admin surface | Add a dynamic dashboard or admin UI for refresh management | |

**User's choice:** Generated repo-owned queue
**Notes:** Refresh support stays auditable in git and does not blur the published-content boundary.

---

## Queue triggers

| Option | Description | Selected |
|--------|-------------|----------|
| Threshold-driven review + status age | Use explicit review-date and status-age rules, with more sensitivity for active records | ✓ |
| Review date only | Ignore legislative posture and look only at last-reviewed age | |
| Manual ad hoc judgment | Leave queue selection entirely to human inspection | |

**User's choice:** Threshold-driven review + status age
**Notes:** Active legislative records should rise faster than terminal records because their posture can move under the project.

---

## Public freshness cues

| Option | Description | Selected |
|--------|-------------|----------|
| Shared summary plus explicit dates | Show a route-level freshness summary and exact `status as of` / `last reviewed` dates across public surfaces | ✓ |
| Hide freshness on grouped routes | Keep freshness visible only on detail pages | |
| Live-tracker style widgets | Add real-time banners, alerts, or dashboard cues | |

**User's choice:** Shared summary plus explicit dates
**Notes:** Readers should be able to see dated-snapshot posture on catalog and comparison routes without mistaking the site for a live tracker.

---

## UI boundaries

| Option | Description | Selected |
|--------|-------------|----------|
| Calm editorial cueing | Use light panels, dates, and explanatory copy inside the current shell | ✓ |
| Alert-heavy maintenance UI | Use warning-heavy banners or operations-first visuals | |
| Broader shell redesign | Treat freshness work as a chance for a new registry layout | |

**User's choice:** Calm editorial cueing
**Notes:** Phase 13 strengthens trust cues without turning the public registry into an operations dashboard.

---

## the agent's Discretion

- Exact freshness thresholds for active versus terminal records
- Exact generated output filenames inside `generated/refresh/`
- Exact route copy and panel placement as long as the result stays clearly dated and editorial

## Deferred Ideas

- Automatically opening tasks or issues from queue output
- Any live legislative polling or pseudo-real-time status claims
- Additional state publication expansion beyond the current milestone
