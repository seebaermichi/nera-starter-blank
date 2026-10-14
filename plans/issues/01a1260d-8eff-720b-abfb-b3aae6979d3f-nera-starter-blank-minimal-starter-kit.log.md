# Work log — 01a1260d-8eff-720b-abfb-b3aae6979d3f-nera-starter-blank-minimal-starter-kit

- **Issue:** `01a1260d-8eff-720b-abfb-b3aae6979d3f`

## Issue snapshot (2026-10-14)

- **Id:** `01a1260d-8eff-720b-abfb-b3aae6979d3f`
- **Type:** feature
- **Group:** S5 Starters
- **Status:** in_progress
- **Title:** [nera-starter-blank] Minimal starter kit

Spec: `nera-cli/ROADMAP-ai.md` — L5.

Smallest valid starter to prove the mechanism. New repo; bootstrap publish + CI x.y.1 within two days.

## Cloud launch (2026-10-14)

- **Worked in a Claude Code cloud session**, outside the local plan → implement → review → approve loop (to use the cloud credit). The gate was not armed.
- **Brief:** `plans/cloud/01a1260d-8eff-720b-abfb-b3aae6979d3f-brief.md` · **Branch:** `issue/01a1260d-starter-blank` · **Session:** launched by the user (URL pending)
- **Decision (user, 2026-10-14):** the blank starter ships its own layout (skip link, `main#main`, footer) + imprint/privacy placeholder pages so `nera build --check` reports zero findings; deviates from S1 "scaffold's own views" and the CLI's offline description — reconcile both locally.
- **On return:** `/work-issue-cloud 01a1260d-8eff-720b-abfb-b3aae6979d3f` — verify locally, triage, merge, reconcile, resolve.

## Cloud result (2026-10-14)

- **Branch:** `issue/01a1260d-starter-blank` · 9 commits · result file `plans/cloud/01a1260d-8eff-720b-abfb-b3aae6979d3f-result.md`
- **Summary:** New package `@nera-static/starter-blank` 1.0.0: home page, imprint/privacy placeholders, `config/app.yaml` with layout labels, its own `theme/views/` (skip link, `main#main`, legal footer, scaffold marker kept). Fleet tooling, README with badges, CHANGELOG, a contract test, and an offline scaffold test asserting `nera build --check`/`nera validate` report zero findings (also with `--name`/`--lang de`).
- **Verified locally:** `npm ci && npm run lint && npx vitest run` on Node 22.22.0 and 20.20.0 (npm 10.8.2): lint clean, 10/10 tests passed. `npm pack --dry-run` lists 10 files (package.json, README, LICENSE, CHANGELOG, pages/, config/, theme/). A by-hand scaffold with CLI 1.11.0 → `nera build --check` "No problems found".
- **Review findings:** none in this repo. Local `main` has unpushed `c1968aa` (conventions + plan-issue skill), which the cloud didn't see; it must be rebased under the branch.

## Browser test (2026-10-14)

Result: pass

| # | case | result |
|---|---|---|
| 1 | skip link is the first focusable element | pass |
| 2 | skip link off-screen until focused (left -9999px) | pass |
| 3 | on focus (window focused, script focus) it is visible at 8,8, `position: static` | pass |
| 4 | skip link target `#main` is the only `<main>` | pass |
| 5 | footer Imprint/Privacy → `/imprint.html`, `/privacy.html`, both 200 | pass |
| 6 | no script, no external stylesheet | pass |

### Decisions
- `nera.starter.description` = package `description` (the online picker reads the npm description).
- Offline integration test: local `--starter` path, `--no-install`, symlinked `node_modules`; asserts both text and `--json` output, since `build --check` exits 0 on warnings.
- Skip link hidden with `left:-9999px`, shown via `position: static` on `:focus` (inline `<style>`).
- Legal placeholders without `robots: noindex`; plain bullets, not task lists.
- Layout labels stay English in a `--lang de` site (the CLI copies `en`); the legal-* check still passes for de.
- CHANGELOG in its own `docs:` commit (first release).

### Carry forward
- `nera-cli/src/starters.js:10`: the bundled offline description is still "one page, one layout". Update it to the starter's new description (other repo).
- `nera-cli` / nera.js.org: slice-5 leftovers due on first release (`--starter` in the template's AGENTS.md and the skill, the CLI docs page) (other repo).
- `generator`: `glob@10.5.0` deprecation warning via `pretty` → `js-beautify@1` on every install (other repo).
- Release: bootstrap `npm publish` 1.0.0 by hand, Trusted Publisher, CI 1.0.1 within ~2 days, `fleet-check.sh --fix nera-starter-blank`, private vuln reporting (release/settings).
- After publish: one `npx @nera-static/nera new probe --starter blank --yes` against npm (release).
- `ROADMAP-ai.md` slice 5 spec note (reconciliation).

## Triage (2026-10-14)

| # | item | from | disposition | why |
|---|---|---|---|---|
| 1 | `nera-cli/src/starters.js:10` offline description "one page, one layout" | cloud | fix (reconcile, nera-cli) | one line; the launch decision says to reconcile it locally; goes out with the next nera-cli patch |
| 2 | slice-5 docs leftovers: `--starter` in the template's AGENTS.md, the skill, the CLI docs page | cloud | already filed | on the board: `01a136b1` [nera-cli] AGENTS.md + skill, `01a136b1` [nera-website] CLI docs page |
| 3 | core: `glob@10` deprecation warning via `pretty` → `js-beautify@1` | cloud | file | another repo; core has to drop `pretty` or call js-beautify 2 directly |
| 4 | release: bootstrap 1.0.0, Trusted Publisher, CI 1.0.1 within ~2 days, fleet-check, vuln reporting | cloud | fix (Step 9, the user's go) | release and settings, hand-over |
| 5 | probe `nera new --starter blank` against npm after publishing | cloud | fix (Step 9) | part of the release |
| 6 | ROADMAP-ai.md slice 5 spec note | cloud | fix (Step 9) | reconciliation |

Already done / elsewhere: Node 20 leg verified locally (the cloud ran only Node 22); browser test passed.
Planning signal: none. The cloud fixed everything in this repo, so rule 6 was kept.
