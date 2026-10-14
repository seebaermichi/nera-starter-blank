# Cloud brief — Minimal starter kit (01a1260d-8eff-720b-abfb-b3aae6979d3f)

Snagio issue `01a1260d-8eff-720b-abfb-b3aae6979d3f` (feature, group "S5 Starters").
You work it in a Claude Code cloud session on `seebaermichi/nera-starter-blank`. The
maintainer reviews your branch locally afterwards and closes the issue there, so
**your output is a branch plus one result file** (format at the end).

You have no access to Snagio, to the sibling repos on the maintainer's disk, or to
the workspace-level `CLAUDE.md`. Everything you need is in this brief and in the
repo. Do not run the `.claude/skills/*` loop commands or `.claude/scripts/snagio`;
they need a local token and are not part of this session.

## The task

Build `@nera-static/starter-blank`, the first and smallest **starter kit** for Nera:
a package that `npx @nera-static/nera new my-site --starter blank` copies over the
CLI's base scaffold to give a ready-to-edit site. It proves the starter mechanism
end to end, which the CLI already implements (`@nera-static/nera` 1.11.0) but has
only been tested against a fixture so far — no starter is on npm yet. The repo is
brand new: it holds only the Snagio setup commit (`.claude/`, `.gitignore`,
`.mcp.json`). You create the whole package. The maintainer publishes it afterwards.

Issue text, verbatim:

```text
Spec: `nera-cli/ROADMAP-ai.md` — L5.

Smallest valid starter to prove the mechanism. New repo; bootstrap publish + CI x.y.1 within two days.
```

## Rules (read these first)

1. Read `.claude/issue-conventions.md` — the review rules for this repo, they apply
   to you. (There is no `README.md` yet; you write it.)
2. Work on a branch named **`issue/01a1260d-starter-blank`**, created from `main`.
   Commit in small, meaningful steps (conventional commits, e.g.
   `feat(starter): …`, `chore(ci): …`, `test: …`). End every commit message with
   `Co-Authored-By: Claude <noreply@anthropic.com>`.
3. **Never push to `main`, never merge, never tag, never publish to npm.**
   A pushed `v*` tag publishes to npm through `publish.yml`, and the package's very
   first publish must be done by hand by the maintainer. Pushing your own branch is fine and
   expected. **Push early**: push the branch right after your first commit (the
   plan), so a push problem shows up at the start, not at the end. If there is no
   `origin` remote, add it: `git remote add origin
   https://github.com/seebaermichi/nera-starter-blank.git`. If the push fails with 403
   "… is not in this session's authorized repository set", you cannot fix that
   yourself: only the maintainer can add `seebaermichi/nera-starter-blank` to this session,
   in the claude.ai/code UI. Say so in one chat message right away (naming the
   repo and the branch), keep working and committing locally, and push again
   whenever the maintainer says the repo is attached. Never fall back to a
   patch file.
4. Versioning: this is the first release, so `package.json` says `"version": "1.0.0"`
   and `CHANGELOG.md` gets a `## [1.0.0] - 2026-10-14` entry (the maintainer fixes the
   date on release). Do not run `npm version`, do not tag. Also put the CHANGELOG
   entry into the result file under Decisions.
5. Code style: ESM, 4-space indent, no semicolons, single quotes (eslint). Pug in
   2-space indent like the scaffold. **No runtime `dependencies`** — the blank
   starter needs no plugin. devDependencies only for tests and lint (listed below).
6. **Come back finished: fix what you find, in this repo, on this branch.** The
   maintainer cannot file follow-up issues from your work, and every item you
   leave behind costs a second round. So anything wrong that you notice in this
   repo, whether your task caused it or it was already there, you fix: a warning
   from the repo's own checks, a stale lockfile or dependency floor, a template or
   copy that lags its package, an outdated sentence on a page you touched, a
   missing translation, a test gap. Put each such fix in its own commit
   (`fix(…)`, `chore(…)`), separate from the task's commits, and list it under
   "Fixed along the way". When a fix needs a decision, take the sensible default
   and write it under Decisions. The maintainer can overrule it in review.
   Carry-forwards are only for what you **cannot** do here: a change in another
   repo, a release/publish/tag/push to `main`, a GitHub setting, or something
   that needs a resource this session does not have. Each one says which of
   these it is.
7. Write a short plan into the result file (section "Plan") **before** you edit
   code, and commit it as your first commit.
8. **Before you finish, review your own branch the way the maintainer will**, and
   fix what the review finds (rule 6). Read `git diff main...HEAD` whole: scope,
   translations (every language the repo has), line wrapping and style of the
   surrounding file, claims you made that you did not check by a command. Then run
   the Done-when commands again from a clean `npm ci`. Repeat until the review
   finds nothing. Only then write the result file.

## Facts you need (the current truth, 2026-10-14)

### Versions on npm now

`@nera-static/nera` 1.11.0 (the CLI; `engines.node` `^20.19.0 || >=22.12.0`),
`@nera-static/core` 4.16.0 (the engine, comes with the CLI),
`@nera-static/validate` 1.4.2 (comes with the CLI).

### The spec (from `nera-cli/ROADMAP-ai.md`, L5 — quoted)

- **Package:** `@nera-static/starter-<name>` on npm (own repos
  `nera-starter-<name>`, flat siblings like the plugins), with a `nera.starter`
  field in `package.json` naming its human label and description. […]
- **Contents:** `pages/`, `config/`, optional site-level `theme/` overrides,
  `assets/`, a `package.json` fragment (`dependencies`: the theme and plugins),
  and an optional `README` shown after scaffolding.
- **Behaviour:** `nera new` copies the starter over the base template, merges the
  dependencies, applies `--name`/`--lang` to `config/app.yaml`, installs. After
  that the starter is gone — the site owns the files (no update path, by
  design, as with Statamic).
- **Interactive:** without `--starter` on a TTY, `nera new` asks "What are you
  building?" from a list fetched from the npm registry (`keywords:
  nera-starter`), with the official ones first.

From `generator/ROADMAP-themes.md` S1: the `blank` starter uses **no theme** (no
`theme:` key in `config/app.yaml`); "the owner adds a theme later with one `theme:`
line".

### What the CLI 1.11.0 actually does with a starter (`nera-cli/src/starter.js`)

- `--starter blank` → `npm pack @nera-static/starter-blank --ignore-scripts` + `tar`.
  It also accepts a **local path** (absolute or `./…`), which your tests use.
- Refuses a package without a `nera.starter` field before the site folder exists.
- Copies **only** `pages/`, `config/`, `theme/`, `assets/`, `plugins/` and
  `.neraignore` from the starter over the scaffold (**starter wins**, file by file).
  Symlinks are not copied. Everything else in the package never reaches a site.
- `dependencies` are merged into the site's `package.json`; the site's own
  `@nera-static/nera` entry is kept.
- The starter's `README.md` is **printed** after scaffolding, not copied.
- `--name`/`--lang` edit `config/app.yaml` **line by line** (the `name:` and `lang:`
  lines; name written as a JSON string). A new `--lang` gets its own
  `translations:` entry, copied from the current language.
- Only a starter that sets `theme:` drops the scaffold's views; this one does not.
- Flags of `nera new <dir>`: `--starter`, `--theme`, `--name`, `--lang`, `--yes`
  (no prompts), `--no-install` (skip `npm install`), `--json`.
- The picker shows `label` and `description` from `nera.starter`; the CLI's bundled
  offline list currently describes blank as "The smallest Nera starter: one page,
  one layout." — that list lives in `nera-cli`; you do not change it (the
  maintainer updates it locally to your new description).

### The base scaffold the starter is copied over (`nera-cli/template/`, 1.11.0)

Files: `_gitignore`, `AGENTS.md`, `CLAUDE.md`, `config/app.yaml`, `package.json`,
`pages/index.md`, `theme/assets/.gitkeep`, `theme/views/layouts/layout.pug`,
`theme/views/pages/default.pug`.

`config/app.yaml`:

```yaml
lang: en
name: My Nera Site
robots: index,follow

translations:
  en:
    app_description: A static site built with Nera
    app_keywords: nera, static site generator
```

`theme/views/layouts/layout.pug`:

```pug
//- nera:scaffold-default — `nera new` starter file. While this line is here, `nera validate` warns if it hides a theme's file of the same name; delete the line once the file is your own.
<!DOCTYPE html>
html(lang=app.lang)
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    title #{ meta.title } | #{ app.name }
    meta(name="description", content=`${ meta.description || t('app_description') }`)
    meta(name="keywords", content=`${ meta.keywords || t('app_keywords') }`)
    meta(name="generator" content="nera")
    meta(name="robots" content=`${ meta.robots || app.robots }`)

  body
    block content
```

`theme/views/pages/default.pug`:

```pug
//- nera:scaffold-default — `nera new` starter file. While this line is here, `nera validate` warns if it hides a theme's file of the same name; delete the line once the file is your own.
extends ../layouts/layout

block content
  main !{ content }
```

`pages/index.md`: frontmatter `layout: pages/default.pug`, `title: Home`,
`description`, `keywords`, then a short "Welcome to Nera" page with next steps.

**Measured 2026-10-14 by the maintainer:** a plain `nera new probe --yes` +
`nera build --check` gives `0 error(s), 3 warning(s)`: `a11y-skip-link` (the
layout's first focusable element is not a skip link to `<main>`'s `id`),
`legal-imprint-link` and `legal-privacy-link` (no link whose text names the imprint
— Impressum/Imprint/Legal notice — or the privacy policy —
Datenschutz/Privacy/Data protection — on the page). `nera validate` reports
"✓ No problems found."

### The maintainer's decision for this starter (2026-10-14)

The blank starter must come out **clean** — zero findings from `nera build --check`
— so it ships **its own layout and legal stubs** rather than the scaffold's views:

- its own `theme/views/layouts/layout.pug` and `theme/views/pages/default.pug`
  (overriding the scaffold's): a skip link as the first focusable element, `<main>`
  with the matching `id`, a footer linking the imprint and privacy pages;
- `pages/imprint.md` and `pages/privacy.md` as clearly marked placeholders the owner
  must replace (English, no legal text pretending to be complete);
- still no theme, no plugin, no JavaScript, no third-party requests.

The CLI's offline description "one page, one layout" becomes inaccurate; write the
new `nera.starter.description` to match what ships, and note it under
Carry-forwards (other repo: `nera-cli/src/starters.js`).

### Fleet rules that apply (from the workspace `CLAUDE.md`)

- npm scope `@nera-static`; releases publish from CI via npm trusted publishing
  (OIDC) on a pushed `v*` tag; a brand-new package's 1.0.0 is published once by hand,
  then a CI release x.y.1 must follow within ~2 days.
- `CHANGELOG.md` in Keep a Changelog format, `### Added` / `### Changed` /
  `### Fixed` / `### Removed`, bullets as in the fleet: `-   text` (dash + three
  spaces).
- Every repo commits its `package-lock.json` (generate it with npm ≥ 10.9, i.e.
  Node 22). `npm test` is watch mode; CI runs `npx vitest run`.
- Every published package's README has two badges directly under the `# title`,
  one per line:
  `[![Test](https://github.com/seebaermichi/nera-starter-blank/actions/workflows/test.yml/badge.svg)](https://github.com/seebaermichi/nera-starter-blank/actions/workflows/test.yml)`
  and
  `[![npm version](https://img.shields.io/npm/v/@nera-static/starter-blank)](https://www.npmjs.com/package/@nera-static/starter-blank)`,
  then a link to the docs: `📖 **Documentation:** [nera.js.org](https://nera.js.org)`.
- `.husky/` hooks: `pre-commit` runs `npm run lint`, `pre-push` runs `npx vitest run`,
  with `"prepare": "husky"` in `scripts` (as `nera-plugin-sitemap`).

### Fleet files to copy (from `seebaermichi/nera-plugin-sitemap`, public)

`.github/workflows/test.yml`:

```yaml
name: Test

on:
    push:
        branches: [main, master]
    pull_request:
        branches: [main, master]

jobs:
    test:
        runs-on: ubuntu-latest

        strategy:
            fail-fast: false
            matrix:
                # Node 18 is deliberately absent: @nera-static/core needs
                # `^20.19.0 || >=22.0.0` (markdown-it 15 -> entities@8).
                node-version: [20, 22]

        steps:
            - uses: actions/checkout@v7

            - name: Use Node.js ${{ matrix.node-version }}
              uses: actions/setup-node@v7
              with:
                  node-version: ${{ matrix.node-version }}
                  cache: 'npm'

            - name: Install dependencies
              run: npm ci

            - name: Run linter
              run: npm run lint

            - name: Run tests
              run: npx vitest run
```

(Adjust the comment: this repo's floor comes from `@nera-static/nera`,
`^20.19.0 || >=22.12.0` — vite 8. GitHub's `node-version: 20`/`22` resolve to the
latest minors, which satisfy it.)

`.github/workflows/publish.yml` — copy verbatim from
https://raw.githubusercontent.com/seebaermichi/nera-plugin-sitemap/main/.github/workflows/publish.yml
(on a `v*` tag: checkout@v7, setup-node@v7 with `node-version: '24'` and **no**
`registry-url`, `npm install -g npm@latest`, `npm ci`, `npx vitest run`,
`npm run lint`, a step that fails unless `${GITHUB_REF_NAME#v}` equals
`package.json`'s version, `npm publish`; `permissions: id-token: write, contents:
read`). Keep its header comments.

`.github/dependabot.yml`:

```yaml
version: 2
updates:
    - package-ecosystem: npm
      directory: /
      schedule:
          interval: weekly
      groups:
          npm-dependencies:
              patterns:
                  - '*'
      open-pull-requests-limit: 5
    - package-ecosystem: github-actions
      directory: /
      schedule:
          interval: weekly
      groups:
          github-actions:
              patterns:
                  - '*'
      open-pull-requests-limit: 5
```

`eslint.config.js`:

```js
export default [
    {
        ignores: ['node_modules', 'public', 'dist'],
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {
            indent: ['error', 4],
            semi: ['error', 'never'],
            quotes: ['error', 'single'],
            'no-unused-vars': ['warn'],
        },
    },
]
```

`LICENSE`: MIT, `Copyright (c) 2026 Michael Becker`.

### Verify claims

You may check `npm view @nera-static/nera version`, the CLI's source on
https://raw.githubusercontent.com/seebaermichi/nera-cli/main/src/starter.js and
`…/main/template/…`, and the sitemap files above. If the network blocks it, rely on
the facts above and note "not verified online" in the result file.

## What to build

1. **`package.json`**:
   `"name": "@nera-static/starter-blank"`, `"version": "1.0.0"`, a `description`
   (shown by the picker via npm search — make it say what ships), `"type": "module"`,
   `"license": "MIT"`, `"author": "Michael Becker"`,
   `"keywords": ["nera", "nera-starter", "static-site-generator", "starter"]`,
   `"nera": { "starter": { "label": "Blank", "description": "…" } }`,
   `"files"`: exactly what a site receives (`pages`, `config`, `theme`) plus
   `CHANGELOG.md` (README/LICENSE/package.json ship anyway),
   `repository` (`git+https://github.com/seebaermichi/nera-starter-blank.git`),
   `bugs`, `homepage` (`https://github.com/seebaermichi/nera-starter-blank#readme`),
   `"publishConfig": { "access": "public" }`,
   `"engines": { "node": "^20.19.0 || >=22.12.0" }`,
   `scripts`: `lint` (`eslint .`), `test` (`vitest`), `prepare` (`husky`),
   **no** `dependencies`, **no** lifecycle scripts besides `prepare`,
   `devDependencies`: `@nera-static/nera` `^1.11.0`, `eslint` `^10.12.0`,
   `husky` `^9.1.7`, `vitest` `^5.0.3`. Commit `package-lock.json` (Node 22, npm ≥ 10.9).
2. **`config/app.yaml`**: the scaffold's keys (`lang: en`, `name:` on its own line,
   `robots`), `translations.en` with `app_description`, `app_keywords` and the footer
   labels (e.g. `imprint: Imprint`, `privacy: Privacy`, `skip_to_content: Skip to
   content`) so `--lang de` gets an entry to translate. Keep `name:`/`lang:` as plain
   single lines the CLI can edit.
3. **`theme/views/layouts/layout.pug`** and **`theme/views/pages/default.pug`**:
   start from the scaffold's two files above. Add the skip link as the body's first
   element (`a(href="#main") #{ t('skip_to_content') }`, visually hidden until
   focused — inline `<style>` in the head is fine, no external CSS file needed, but
   keep it a few lines), `main#main`, and a `footer` with links to `/imprint.html`
   and `/privacy.html` labelled via `t('imprint')`/`t('privacy')`. Root-absolute
   hrefs are correct: core rewrites them for `base_path`. **Keep the
   `//- nera:scaffold-default …` first line in both views** (decision: the files
   are defaults until the owner edits them, so adding `theme:` later behaves as on a
   plain scaffold — `nera validate` warns which theme files they hide).
4. **`pages/index.md`**: home page for the blank starter — what it is, what to edit
   (`pages/`, `config/app.yaml`, `theme/views/`), that imprint and privacy are
   placeholders to replace, how to add a plugin (link
   https://github.com/seebaermichi/nera/blob/main/PLUGINS.md) or a theme later (one
   `theme:` line), and `nera dev` / `nera build` / `nera check`. Frontmatter as in the
   scaffold (`layout: pages/default.pug`, `title`, `description`, `keywords`).
5. **`pages/imprint.md`** and **`pages/privacy.md`**: `layout: pages/default.pug`,
   titles "Imprint" and "Privacy", a short visible notice that this is a placeholder
   the site owner must replace with their own legal text, plus a TODO-style list of
   what typically belongs there. No claims that this text is sufficient.
6. **`README.md`** (printed by `nera new` after scaffolding, and the npm page): the
   two badges + docs link, what the starter contains (file list), usage
   (`npx @nera-static/nera new my-site --starter blank`, with `--name`/`--lang`),
   what to do next (replace the legal placeholders, `nera dev`), that the site owns
   the files afterwards (no update path), requirements (`@nera-static/nera` ≥ 1.11.0,
   Node `^20.19.0 || >=22.12.0`), license. Keep it short — it is printed in a
   terminal.
7. **`CHANGELOG.md`**: Keep a Changelog header as in the fleet, `## [1.0.0] -
   2026-10-14`, `### Added` with one bullet per thing that ships.
8. **`LICENSE`**, **`eslint.config.js`**, **`.github/workflows/test.yml`**,
   **`.github/workflows/publish.yml`**, **`.github/dependabot.yml`**,
   **`.husky/pre-commit`** (`npm run lint`), **`.husky/pre-push`**
   (`npx vitest run`) — as in "Fleet files to copy".
9. **Tests (`test/`, vitest)**:
   - `test/package.test.js`: the `package.json` contract — `nera.starter.label` and
     `description` are non-empty strings, `keywords` includes `nera-starter`, no
     `dependencies` beyond what is intended (none), no lifecycle scripts besides
     `prepare`, `files` covers exactly the folders that exist among `pages`,
     `config`, `theme`, `assets`, `plugins`.
   - `test/scaffold.test.js` (integration, the one that matters): in a temp
     directory, run the devDependency CLI —
     `node node_modules/@nera-static/nera/bin/nera.js new <tmp>/site --starter <repo root> --yes --no-install`
     (check the CLI's actual bin path from its `package.json`) — then build and check
     the site **without network**: make the site resolve `@nera-static/nera` from
     this repo's `node_modules` (e.g. symlink `<tmp>/site/node_modules` to the repo's,
     or run the repo's CLI with `cwd` set to the site — find what works and say which
     in Decisions) and run `nera build --check` and `nera validate`. Assert: exit
     code 0, `public/index.html`, `public/imprint.html`, `public/privacy.html` exist,
     the output reports zero warnings (assert on the summary line, e.g. no
     `warning(s)` count above 0 / "No problems found" — read the real output first),
     `nera validate` passes, the site's `package.json` still has its
     `@nera-static/nera` dependency, the starter's README/CHANGELOG/test files were
     **not** copied into the site. A second case with `--name "Brot & Zeit" --lang de`
     asserts `config/app.yaml` then has the name, `lang: de` and a `de` translations
     entry, and still builds clean.
   - Tests must not depend on network access (CI has it, but keep them hermetic).
     Use generous timeouts for the integration tests.
10. **`.gitignore`**: it already exists (from `nera-plugin-images`); add what the
    tests leave behind if anything (e.g. a scratch dir), nothing else.

## Done when

Run on Node ≥ 20.19 (prefer 22; `node -v`), after `npm ci`:

```bash
npm run lint && npx vitest run
npm pack --dry-run   # inspect the tarball list
```

- all pass with **zero warnings** (eslint included), unless the fix is outside this
  repo, which is then a Carry-forward;
- a site scaffolded from this repo with the published-on-npm CLI 1.11.0 builds with
  `nera build --check` reporting **0 errors and 0 warnings**, and `nera validate`
  reports no problems — proven by the integration test, and once by hand with the
  output pasted into the result file;
- `npm pack --dry-run` lists only `package.json`, `README.md`, `LICENSE`,
  `CHANGELOG.md`, and files under `pages/`, `config/`, `theme/` — paste the list into
  the result file;
- `package.json` has `nera.starter.label` = `Blank`, no `dependencies`,
  `"version": "1.0.0"`; `package-lock.json` is committed;
- the README carries both badges directly under the title;
- the branch is pushed and the result file is committed on it.

## The result file (your handoff back)

Write **`plans/cloud/01a1260d-8eff-720b-abfb-b3aae6979d3f-result.md`** on your branch, with exactly
these sections:

```text
# Result — Minimal starter kit (01a1260d-8eff-720b-abfb-b3aae6979d3f)

## Plan
(the plan you wrote before editing; leave it, even if you deviated)

## Summary
(3–6 lines: what changed and where)

## Files changed
(one line per file: path — what)

## Commits
(git log --oneline main..HEAD)

## Verification
(the commands you ran and their relevant output)

## Decisions
(each choice you made that the brief did not settle, one bullet each, phrased so
the maintainer can paste it into the spec; include the proposed CHANGELOG entry
and the final nera.starter.description)

## Proposed spec note
(a short paragraph for nera-cli/ROADMAP-ai.md, section "Slice 5 — progress", in
the style "Done 2026-10-14 (nera-starter-blank …): …")

## Fixed along the way
(each fix beyond the task, per rule 6: commit — file — what; or "none")

## Carry-forwards
(only what could not be fixed here, per rule 6: file or repo — what — which
reason (other repo / release / GitHub setting / missing resource); or "none")

## Review hints
(where a reviewer should look hardest: claims you could not verify, spots you are
unsure of, anything that might be wrong)

## Not verified
(network checks that were blocked, or "none")
```

Finish your session with a one-paragraph summary in chat that names the branch
and the result file.
