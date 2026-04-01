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

Status meanings:

- `unresearched`: no publishable work yet
- `queued`: targeted for near-term research but not publishable
- `published`: has a canonical state-entry file in `content/states/`

Important boundary:

- the manifest is not a public-facing record file;
- publishable entries live in `content/states/`;
- queued or incomplete work should not masquerade as published state pages.
