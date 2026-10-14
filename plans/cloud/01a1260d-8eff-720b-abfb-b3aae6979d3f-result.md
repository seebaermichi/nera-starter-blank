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
