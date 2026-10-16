# @nera-static/starter-blank

[![Test](https://github.com/seebaermichi/nera-starter-blank/actions/workflows/test.yml/badge.svg)](https://github.com/seebaermichi/nera-starter-blank/actions/workflows/test.yml)
[![npm version](https://img.shields.io/npm/v/@nera-static/starter-blank)](https://www.npmjs.com/package/@nera-static/starter-blank)

📖 **Documentation:** [nera.js.org](https://nera.js.org)

The smallest starter kit for the [Nera](https://github.com/seebaermichi/nera)
static site generator: a home page, imprint and privacy placeholders, and one
accessible layout. No theme, no plugins, no JavaScript. A fresh site passes
`nera build --check` and `nera validate` without a single finding.

## Usage

```bash
npx @nera-static/nera new my-site --starter blank
npx @nera-static/nera new my-site --starter blank --name "My Site" --lang de
```

`--name` and `--lang` set `name` and `lang` in `config/app.yaml`; a new language
gets its own `translations:` entry to translate.

## What you get

- `pages/index.md` — the home page, with what to edit next
- `pages/imprint.md`, `pages/privacy.md` — **placeholders, not legal texts**
- `config/app.yaml` — site name, language, robots and the layout's texts
  (`skip_to_content`, `imprint`, `privacy`)
- `theme/views/layouts/layout.pug` — skip link, `<main id="main">`, footer
  linking the imprint and privacy pages
- `theme/views/pages/default.pug` — the page view

## Requirements

- `@nera-static/nera` 1.11.0 or later
- Node.js `>=22.12.0` (its bundled npm 10.9 or later)

## License

MIT

## First steps

After `nera new` the files are yours: a starter has no update path.

1. Replace `pages/imprint.md` and `pages/privacy.md` with your own legal texts.
2. Add plugins from the plugin catalog at https://nera.js.org/plugins/,
   or a theme later with one `theme:` line in `config/app.yaml`.
