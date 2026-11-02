# BugHunter audit: Vanilla JS cookie-consent geo decision

- **Scope / base:** `qrati-connect-vanillajs-example`, `origin/main` at `da6a076` (full SHA recorded in PR metadata); isolated run branch from the fresh preflight base.
- **Workflow:** geo-policy lookup, session caching, opt-in/opt-out mode selection, and consent-controlled GTM startup.
- **Finding:** **Medium** — malformed or unsuccessful geo-policy responses can select opt-out and be cached. `src/cookieConsent.js` trusted the parsed `required` value without checking HTTP success or requiring a boolean. A truthy string such as `"false"` selects opt-in, while a falsy malformed value can select opt-out; missing values likewise select opt-out. Catch-based fallback therefore did not cover parseable malformed responses.
- **Impact:** malformed geo service responses can defeat conservative consent mode selection and persist the bad decision for the session. This is a code-path risk; no claim about a particular jurisdiction's legal requirements.
- **Root cause and fix:** extracted a small validator in `src/geoDecision.js`; reject non-OK responses and responses without boolean `required`. The existing catch now conservatively returns `true`; only validated booleans are cached.
- **Issue:** https://github.com/qrati-labs/qrati-connect-vanillajs-example/issues/3
- **Tests authored:** `tests/geoDecision.test.js` covers true/false decisions, unsuccessful HTTP status, missing `required`, and string `required`. Exact intended command: `node --test tests/geoDecision.test.js` (**NOT RUN BY BUGHUNTER**, as required). No build, lint, install, or other tests run.
- **Patch hygiene:** `git diff --check` passed before documentation updates.
- **Limitations:** no independent review or CI evidence available during the audit. The preflight candidate had no open PR and no overlapping change.

## Timing (measured ledger)

| Phase | Start (UTC) | End (UTC) | Elapsed |
|---|---|---|---|
| Preflight | 2026-10-22T17:24:39Z | 2026-10-22T17:25:10Z | 00:00:31 |
| Audit | 2026-10-22T17:25:20Z | 2026-10-22T17:26:20Z | 00:01:00 |
| Total run | 2026-10-22T17:24:39Z | 2026-10-22T17:26:21Z | 00:01:42 |
| Unclassified interval | — | — | 00:00:10 |

## Pull request

Fix is scoped to response validation and regression coverage. The issue is linked with `Fixes #3`. No merge, deployment, or production action performed.
