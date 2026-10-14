# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-10-14

### Added

-   First release: the `blank` starter for `nera new --starter blank`. Requires `@nera-static/nera` 1.11.0 or later. No theme, no plugins, no JavaScript, no third-party requests; a scaffolded site passes `nera build --check` and `nera validate` with no findings.
-   `pages/index.md`: a home page naming what to edit (`pages/`, `config/app.yaml`, `theme/views/`), how to add a plugin or a theme, and the `nera dev`, `nera build` and `nera check` commands.
-   `pages/imprint.md` and `pages/privacy.md`: clearly marked placeholders with a list of what an imprint and a privacy policy typically contain, to be replaced by the site owner's own legal texts.
-   `theme/views/layouts/layout.pug` and `theme/views/pages/default.pug`, overriding the scaffold's: a skip link as the first focusable element (visually hidden until focused), `<main id="main">` and a footer linking `/imprint.html` and `/privacy.html`. Both keep the `nera:scaffold-default` marker, so adding a theme later warns about the files they hide, as on a plain scaffold.
-   `config/app.yaml`: `lang`, `name`, `robots` and `translations.en` with `app_description`, `app_keywords` and the layout's labels `skip_to_content`, `imprint` and `privacy`, so `--lang` copies them into a new entry to translate.
