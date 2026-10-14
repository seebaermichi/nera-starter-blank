# Issue conventions

Review rules for work on `@nera-static/starter-blank`, run through Snagio from
`nera-starter-blank/`. The Snagio project **"Nera AI"** tracks
`../nera-cli/ROADMAP-ai.md` (starters are its **L5**, slice 5); its issues carry the
target repo as a title prefix. **Work an issue only from the repo it names** — the
step skills commit in the current repo.

The workspace `../CLAUDE.md` holds the fleet-wide rules (semver, CHANGELOG,
releases, publishing a brand-new package); this file only adds what a reviewer
checks per diff. The first starter repo set up this way; copy this file for the next
one (`nera-starter-blog`, `nera-starter-business`) and swap the names.

## Non-negotiables

- **`../nera-cli/ROADMAP-ai.md` (L5 and "Slice 5 — progress") is the spec.** This
  repo carries no ROADMAP of its own unless an issue decides otherwise; decisions go
  back into the L5 section. Extend it, never fork it.
- **The starter contract is what `nera new --starter` reads** (`nera-cli/src/starter.js`,
  `@nera-static/nera` ≥ 1.11.0): `package.json` with a `nera.starter`
  `{ label, description }` field and `keywords: ["nera-starter"]`; only `pages/`,
  `config/`, `theme/`, `assets/`, `plugins/` and `.neraignore` are copied into the
  site (starter wins); `dependencies` are merged into the site's (the site's own
  `@nera-static/nera` entry is kept); the README is printed after scaffolding, not
  copied. Anything else in the package never reaches a site — do not rely on it.
- **The blank starter uses no theme** (no `theme:` in `config/app.yaml`), so the
  scaffold's default views stay in place.
- **Semver + `CHANGELOG.md` in the same commit as the change** (Keep a Changelog,
  four-space bullets, `**BREAKING**:` prefix). Bump with
  `npm version <bump> --no-git-tag-version`. A starter has no update path (the site
  owns the files after `nera new`), so "breaking" means: a site scaffolded from the
  new version differs in a way a user following the old README would trip over.
- **Never publish or push.** No `npm publish`, no `git push`, no tags pushed, no repo
  created on GitHub, no posts anywhere public. The maintainer does the one-time
  bootstrap publish of 1.0.0 by hand, then a CI-published x.y.1 within ~2 days so the
  Trusted Publisher does not expire; the session hands over the exact commands.
- Paste-ready text for the maintainer goes in a fenced code block between
  `----- START: … -----` and `----- END -----` lines, never in a blockquote.

## Framework correctness

- A scaffolded site builds, validates and checks clean: `nera build`,
  `nera validate` and `nera check` report no problems on the starter's sample pages.
- Every sample page has a `layout`; `config/app.yaml` keeps the keys `--name`/`--lang`
  edit line by line (`name`, `lang`) and a `translations:` entry for its language.
- No `postinstall` or other lifecycle scripts (the CLI packs with
  `--ignore-scripts`, and a starter must not need them).
- `files` in `package.json` is limited to what a site receives plus `README.md`.

## UI / template rules

- Sample content and docs in English. Keep it minimal: the blank starter proves the
  mechanism; anything a user would delete first does not belong in it.

## UI walkthrough

The starter has no interactive UI of its own; a browser test is normally skipped.
When one is wanted:

- Browser tooling: Playwright MCP (`mcp__playwright__browser_navigate`,
  `mcp__playwright__browser_snapshot`, `mcp__playwright__browser_console_messages`).
- Boot (a throwaway site from the *local* starter, never from npm):
  `R=$PWD; T=$(mktemp -d) && cd "$T" && npx @nera-static/nera new site --starter "$R" --yes && cd site && npx nera build && npx nera serve --port 3124`
  (Node 22 if npm crashes: `PATH=~/.nvm/versions/node/v22.22.0/bin:$PATH`). Delete
  `$T` afterwards.
- Base URL / login: http://localhost:3124/, no login.
- Surfaces:
    | surface | url | role | how to open |
    |---|---|---|---|
    | sample pages | `/` | visitor | open the URL |

## Tests & hygiene

- `npx vitest run && npm run lint` must pass (`npm test` is watch mode — never use
  it here). Run from the package root.
- An integration test scaffolds a site from this folder with the published CLI
  (`nera new <tmp> --starter <this repo> --yes`), then builds, validates and checks it
  in a temp directory. Unit tests check the `package.json` contract.
- Generate the lockfile with npm ≥ 10.9 (Node 22); commit it before any workflow that
  runs `npm ci`.
- The repo matches the fleet: `.github/workflows/test.yml` and `publish.yml` copied
  from a recent package (`../nera-plugin-sitemap`), `.github/dependabot.yml`,
  `LICENSE`, `README.md` with the two badges linking https://nera.js.org.

## Reconciliation steps (run when resolving an issue)

- Version bump + `CHANGELOG.md` entry in the change's commit, if it ships in the
  tarball; none for tests, CI or `.claude/`.
- Update the L5 status and "Slice 5 — progress" in `../nera-cli/ROADMAP-ai.md`. On
  the first release, the slice-5 leftovers there become due: `--starter` in the
  template's `AGENTS.md` and the skill, the CLI docs page on nera.js.org. Those are
  commits in other repos — hand them over or file them as issues.
- Hand over the release commands (GitHub repo creation, `git push`, bootstrap
  `npm publish`, `git tag -a v<x.y.z> …`) — do not run them. After the GitHub remote
  exists: `../generator/scripts/fleet-check.sh --fix nera-starter-blank`.
- Remove the issue's plan files last, once nothing else needs them:
  `git rm` its tracked files under `plans/` (`plans/issues/<id>-*`,
  `plans/issues/browser-tests/<id>-*`, `plans/cloud/<id>-*`), delete the
  untracked ones, and commit
  `chore(plan): remove the plan files of the resolved <short title> issue`.
  Git history keeps them; `plans/` holds only open issues.
