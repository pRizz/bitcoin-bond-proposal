# State Registry Manifest

This manifest is the skeleton layer for the research registry.

It exists to track all 50 states without pretending they all have publishable
research records yet.

Each state entry should contain only:

- `state`
- `slug`
- `registryStatus`
- `proposalFocus`
- `shortNote`
- `editorialPriority`
- `reviewCadenceDays` for `published` states

Status meanings:

- `unresearched`: no publishable work yet
- `queued`: targeted for near-term research but not publishable
- `published`: has a canonical state-entry file in `content/states/`

Refresh cadence:

- `reviewCadenceDays` is required for `published` states.
- `reviewCadenceDays` remains optional for `queued` and `unresearched` states because they are not yet in the public freshness contract.
- Public freshness still comes from canonical snapshot dates in the state-entry file:
  - `statusAsOf`
  - `lastReviewed`

Important boundary:

- the manifest is not a public-facing record file;
- publishable entries live in `content/states/`;
- queued or incomplete work should not masquerade as published state pages.
- a canonical state-entry file may exist while a state is still `queued`, but compile and route generation must only treat manifest-`published` states as public records.
