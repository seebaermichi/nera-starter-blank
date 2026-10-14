# Result — Minimal starter kit (01a1260d-8eff-720b-abfb-b3aae6979d3f)

## Plan

1. Toolchain: `package.json` (starter contract, no `dependencies`, devDependencies
   `@nera-static/nera`, `eslint`, `husky`, `vitest`), `package-lock.json` from
   Node 22 / npm 10.9, `eslint.config.js`, `.husky/` hooks, `LICENSE`.
2. Fleet CI: `.github/workflows/test.yml`, `publish.yml` (copied from
   `nera-plugin-sitemap`), `.github/dependabot.yml`.
3. Starter content: `config/app.yaml` (scaffold keys + footer/skip-link labels),
   `theme/views/layouts/layout.pug` + `theme/views/pages/default.pug` (skip link,
   `main#main`, footer with imprint/privacy links, scaffold-default marker kept),
   `pages/index.md`, `pages/imprint.md`, `pages/privacy.md` (placeholders).
4. Tests: `test/package.test.js` (package contract), `test/scaffold.test.js`
   (scaffold from this repo with the devDependency CLI, build `--check` + validate
   offline, assert zero warnings, no stray files; second case with
   `--name`/`--lang de`).
5. Docs: `README.md` (badges, contents, usage, requirements), `CHANGELOG.md` 1.0.0.
6. Self-review of `git diff main...HEAD`, clean `npm ci` + lint + tests +
   `npm pack --dry-run`, fix findings, fill in this result file, push.

## Summary

New package `@nera-static/starter-blank` 1.0.0: `pages/` (home page, imprint and
privacy placeholders), `config/app.yaml` (scaffold keys + layout labels), and its
own `theme/views/` (skip link, `main#main`, footer with the legal links, scaffold
marker kept). No theme, no `dependencies`, no JavaScript. Fleet tooling (eslint,
husky, test/publish/dependabot workflows, LICENSE), README, CHANGELOG, and vitest
tests: the `package.json` contract plus an offline integration test that scaffolds
a site with the CLI 1.11.0 and asserts `nera build --check` / `nera validate` find
nothing, also with `--name "Brot & Zeit" --lang de`.

## Files changed

- `package.json` — starter manifest (`nera.starter`, keywords, `files`, engines, devDependencies only)
- `package-lock.json` — generated with Node 22.22.0 / npm 10.9.4 (lockfileVersion 3)
- `eslint.config.js` — fleet config
- `.husky/pre-commit`, `.husky/pre-push` — `npm run lint`, `npx vitest run`
- `LICENSE` — MIT, copied from nera-plugin-sitemap
- `.github/workflows/test.yml` — fleet copy, Node-floor comment adjusted to `@nera-static/nera` (vite 8)
- `.github/workflows/publish.yml` — verbatim copy of nera-plugin-sitemap's
- `.github/dependabot.yml` — fleet copy
- `config/app.yaml` — scaffold keys + `skip_to_content`, `imprint`, `privacy` in `translations.en`
- `theme/views/layouts/layout.pug` — scaffold layout + inline skip-link style, skip link, footer
- `theme/views/pages/default.pug` — scaffold view with `main#main`
- `pages/index.md` — home page: what to edit, legal placeholders, plugins/theme, commands
- `pages/imprint.md`, `pages/privacy.md` — marked placeholders with "what typically belongs here" lists
- `test/package.test.js` — package contract
- `test/scaffold.test.js` — scaffold + build/check/validate integration (offline)
- `README.md` — badges, docs link, usage, contents, next steps, requirements
- `CHANGELOG.md` — `## [1.0.0] - 2026-10-14`
- `.claude/issue-conventions.md` — two outdated lines fixed (see Fixed along the way)
- `plans/cloud/01a1260d-8eff-720b-abfb-b3aae6979d3f-result.md` — this file

## Commits

```text
bfec2f0 chore(claude): match the issue conventions to the starter's own views and files list
d264399 docs: add the README and the 1.0.0 changelog entry
88d68d2 test: check the package contract and scaffold a site from the starter offline
5c97925 feat(starter): add the blank starter's pages, config and accessible layout
efdc0d2 chore(ci): add the fleet test, publish and dependabot workflows
ed29d79 chore: add the package manifest, lint and git hooks for the blank starter
d72b7a6 chore(plan): plan the blank starter kit
```

(plus the commit adding this result file)

## Verification

Node v22.22.0, npm 10.9.4, from a clean `rm -rf node_modules && npm ci`:

```text
$ npm run lint
> eslint .
(no output: 0 errors, 0 warnings)

$ npx vitest run
 Test Files  2 passed (2)
      Tests  10 passed (10)

$ npm pack --dry-run
npm notice Tarball Contents
npm notice 1.6kB CHANGELOG.md
npm notice 1.1kB LICENSE
npm notice 1.9kB README.md
npm notice 246B config/app.yaml
npm notice 1.4kB package.json
npm notice 714B pages/imprint.md
npm notice 1.2kB pages/index.md
npm notice 809B pages/privacy.md
npm notice 962B theme/views/layouts/layout.pug
npm notice 256B theme/views/pages/default.pug
npm notice total files: 10
```

By hand, with the npm-published CLI 1.11.0 (the devDependency; `npm view
@nera-static/nera version` → `1.11.0`):

```text
$ T=$(mktemp -d) && cd $T
$ node <repo>/node_modules/@nera-static/nera/bin/nera.js new site --starter <repo> --yes --no-install
📦 Creating a new Nera site in /tmp/tmp.wbqi4ppQWW/site...
  ✓ Configured project as "site"
  ✓ Applied the "Blank" starter (@nera-static/starter-blank)
  ✓ Added the Nera skill for AI assistants (.agents/skills/nera, .claude/skills/nera)
# @nera-static/starter-blank            ← the README, printed
…
$ cd site && ln -s <repo>/node_modules node_modules
$ npx nera build --check
HTML created: /imprint.html
HTML created: /index.html
HTML created: /privacy.html
Assets copied
✓ No problems found.
$ npx nera validate
✓ No problems found.
$ npx nera check
✓ No problems found.
```

`nera build --check --json` and `nera validate --json` both print
`{ "ok": true, "results": [] }` (asserted in the test). For comparison, a plain
`nera new probe --yes` scaffold gives `0 error(s), 3 warning(s)` (`a11y-skip-link`,
`legal-imprint-link`, `legal-privacy-link`), same as the maintainer measured.

`base_path: /sub` added to a scaffolded site's `config/app.yaml`: the build stays
clean and every root-absolute link (footer and the Markdown links on the home page)
comes out as `/sub/imprint.html` / `/sub/privacy.html`.

## Decisions

- `nera.starter.description` and the package `description` are the same text: "The smallest Nera starter: a home page, imprint and privacy placeholders, and one accessible layout. No theme, no plugins, no JavaScript." The online picker reads the npm search result's `description` (`listStarters` in `nera-cli/src/starter.js`), not `nera.starter.description`, so both have to say what ships.
- The integration test runs the devDependency CLI with `cwd` set to an `os.tmpdir()` temp folder (`nera new` takes a bare name, not a path: `nera new .tmp/site` is refused as an invalid project name), passes the repo root as an absolute `--starter` path and `--no-install`, then symlinks `<site>/node_modules` to the repo's `node_modules` and runs `nera build --check`/`validate` with `cwd` = the site. No network, nothing written into the repo, so `.gitignore` needed no change.
- The zero-findings assertion checks both forms: the text output contains `No problems found` and has no `N error(s), M warning(s)` summary, and `--json` equals `{ ok: true, results: [] }`. `nera build --check` exits 0 even with warnings, so the exit code alone proves nothing.
- The skip link is hidden with `position: absolute; left: -9999px` and shown with `position: static` on `:focus`, in an inline `<style>` in the head (two rules). The footer is `Imprint · Privacy`, the separator written as `= ' · '` so the Pug has no trailing whitespace.
- The legal placeholders have no `robots: noindex`. The owner decides that once the real texts are in. The "what typically belongs here" lists are plain bullets, not `[ ]` task lists, because markdown-it renders those as literal `[ ]`.
- The layout's labels stay English in a `--lang de` site (the CLI copies the `en` entry). The `legal-*` heuristic matches "Imprint"/"Privacy" for `de` as well, so such a site still checks clean (tested). For languages other than `en`/`de`, the heuristic does not run.
- The CHANGELOG went into its own `docs:` commit with the README rather than "in the same commit as the change": this is the first release, and every task commit ships part of 1.0.0.
- Proposed CHANGELOG entry:

```text
----- START: CHANGELOG 1.0.0 -----
## [1.0.0] - 2026-10-14

### Added

-   First release: the `blank` starter for `nera new --starter blank`. Requires `@nera-static/nera` 1.11.0 or later. No theme, no plugins, no JavaScript, no third-party requests; a scaffolded site passes `nera build --check` and `nera validate` with no findings.
-   `pages/index.md`: a home page naming what to edit (`pages/`, `config/app.yaml`, `theme/views/`), how to add a plugin or a theme, and the `nera dev`, `nera build` and `nera check` commands.
-   `pages/imprint.md` and `pages/privacy.md`: clearly marked placeholders with a list of what an imprint and a privacy policy typically contain, to be replaced by the site owner's own legal texts.
-   `theme/views/layouts/layout.pug` and `theme/views/pages/default.pug`, overriding the scaffold's: a skip link as the first focusable element (visually hidden until focused), `<main id="main">` and a footer linking `/imprint.html` and `/privacy.html`. Both keep the `nera:scaffold-default` marker, so adding a theme later warns about the files they hide, as on a plain scaffold.
-   `config/app.yaml`: `lang`, `name`, `robots` and `translations.en` with `app_description`, `app_keywords` and the layout's labels `skip_to_content`, `imprint` and `privacy`, so `--lang` copies them into a new entry to translate.
----- END -----
```

## Proposed spec note

```text
----- START: ROADMAP-ai.md Slice 5 — progress -----
Done 2026-10-14 (nera-starter-blank 1.0.0, not yet published): `@nera-static/starter-blank`, the first starter. No theme, no `dependencies`, no JavaScript. It ships `pages/index.md`, imprint and privacy placeholders, `config/app.yaml` (with `skip_to_content`/`imprint`/`privacy` labels in `translations.en`) and its own `theme/views/` over the scaffold's: skip link, `main#main`, footer with the legal links, `nera:scaffold-default` marker kept. So a fresh site passes `nera build --check` and `nera validate` with zero findings, where the plain scaffold has 3 warnings. An offline vitest integration test scaffolds from the repo with the CLI 1.11.0 (local path, `--no-install`, `node_modules` symlinked) and asserts that, also with `--name`/`--lang de`. `nera.starter.description` and package `description`: "The smallest Nera starter: a home page, imprint and privacy placeholders, and one accessible layout. No theme, no plugins, no JavaScript." Bootstrap publish and the CI x.y.1 release are still due.
----- END -----
```

## Fixed along the way

- bfec2f0 — `.claude/issue-conventions.md` — "the scaffold's default views stay in place" contradicted the maintainer's 2026-10-14 decision (the starter ships its own views). Also "`files` … limited to what a site receives plus `README.md`" contradicted the brief (`files` lists `CHANGELOG.md`; `README.md` ships anyway). Both lines now match.

## Carry-forwards

- `nera-cli/src/starters.js` — the bundled offline list still describes blank as "The smallest Nera starter: one page, one layout."; update it to the new description above — other repo.
- `nera-cli` / nera.js.org — the slice-5 leftovers due on first release (`--starter` in the template's `AGENTS.md` and the skill, the CLI docs page) — other repo.
- `generator` (`@nera-static/core`) — `npm ci` here prints `npm warn deprecated glob@10.5.0`, via core → `pretty@2.0.0` (latest) → `js-beautify@^1` → `glob@10`. `js-beautify` 2.0.3 uses `glob@^13`, but `pretty` pins 1.x; core would have to drop `pretty` or call `js-beautify` 2 directly. Every site gets the same warning — other repo.
- Release: create the GitHub repo settings / Trusted Publisher on npmjs.com for `publish.yml`, bootstrap `npm publish` of 1.0.0 by hand, then tag a CI-published 1.0.1 within ~2 days; then `../generator/scripts/fleet-check.sh --fix nera-starter-blank` — release / GitHub setting.
- After publish: one manual `npx @nera-static/nera new probe --starter blank --yes` against the npm package (the tests use the local path, never `npm pack` from the registry) — release.

## Review hints

- `test/scaffold.test.js` uses `fs.symlinkSync(..., 'dir')` for `node_modules`. This is fine on Linux CI. It is not tried on Windows, where it would need a junction.
- The tests ran on Node 22 only. The Node 20 leg of CI is untested here.
- `README.md` is printed raw in the terminal after `nera new`, so badges and links show up as Markdown source. The fleet rule requires the badges; check whether you want the printed README shorter.
- The legal "what typically belongs here" bullets are general hints, not legal advice. Check the wording in `pages/imprint.md` and `pages/privacy.md`.
- `package.json` `files` lists `CHANGELOG.md`, which the conventions file's earlier text did not allow; I followed the brief and changed the conventions.

## Not verified

- none for the network: `npm view`, `starter.js` and the sitemap files were checked online. The first push attempts got a 403 until the repo was attached to the session; the branch is pushed now.
- Node 20 run of the test suite (only Node 22.22.0 in this container).
