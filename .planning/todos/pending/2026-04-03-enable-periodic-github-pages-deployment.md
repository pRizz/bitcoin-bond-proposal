---
created: 2026-04-03T03:49
title: Enable periodic GitHub Pages deployment
area: tooling
files:
  - .github/workflows/bright-builds-auto-update.yml
  - app.config.ts
  - package.json
---

## Problem

The project now has a shipped public site, but there is no confirmed GitHub Pages deployment workflow in the visible GitHub Actions set. We should verify whether Pages deployment already exists elsewhere and, if not, add a repo-owned deployment path so the public site can be published on a periodic basis instead of relying only on manual local builds.

## Solution

Audit the current GitHub Actions and Pages settings first. If periodic deployment is not already configured, add a GitHub Pages workflow that builds the static site and publishes it on the right cadence and triggers. Keep the setup aligned with the repo's existing static build path and document any branch/source assumptions.
