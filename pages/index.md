---
layout: pages/default.pug
title: Home
description: Welcome to a site built with Nera
keywords: nera, static site generator
---
# Welcome to Nera

This site was scaffolded from the blank starter: one layout, a home page and
two legal placeholders. No theme, no plugins, no JavaScript. Everything here is
yours to edit.

## What to edit

- `pages/` — your content, one Markdown file per page
- `config/app.yaml` — the site name, language and the texts in `translations:`
- `theme/views/` — the layout (`layouts/layout.pug`) and the page view
  (`pages/default.pug`)

## Before you publish

The [imprint](/imprint.html) and [privacy](/privacy.html) pages are
placeholders. Replace them with your own legal texts.

## Next steps

- `nera dev` — build and preview with live reload
- `nera build` — render `pages/` into `public/`
- `nera check` — check the built site for accessibility, privacy and legal hints
- Add a plugin: install any `@nera-static/plugin-*` package and configure it
  under `config/`; see the
  [plugin catalog](https://github.com/seebaermichi/nera/blob/main/PLUGINS.md)
- Add a theme later: install it and put one `theme:` line into `config/app.yaml`
