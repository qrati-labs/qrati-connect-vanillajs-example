# BugHunter audit index

| UTC | Workflow | Repository / audited SHA | Outcome / severity | Tests / coverage | Research | PR / blocker |
|---|---|---|---|---|---|---|
| 2026-10-16T02:01Z | Vanilla JS cookie-consent geo decision and GTM gating | `qrati-connect-vanillajs-example` / `f3b471b65c80ff3596d11630a3e8fcc159b2e49a` | Report-only; medium malformed geo payload can bypass fail-closed fallback | No existing test setup; test/build unavailable (`pnpm` missing); coverage not measured | Google Consent Mode guidance URL recorded; retrieval backend unavailable | PR pending creation; no code fix pending runnable regression setup |
| 2026-10-22T17:26Z | Vanilla JS geo-policy response validation and caching | `qrati-connect-vanillajs-example` / `68c6b5c817308d03381befe91d62beb0cbf564cd` (branch head; audited base `da6a076`) | Medium confirmed; validate HTTP status and boolean before caching; fix + regression tests authored | `node --test tests/geoDecision.test.js` (**NOT RUN BY BUGHUNTER**) | Focused source trace; no external legal/jurisdiction claim | Issue [#3](https://github.com/qrati-labs/qrati-connect-vanillajs-example/issues/3); [PR #4](https://github.com/qrati-labs/qrati-connect-vanillajs-example/pull/4) open; checks pending |

See [2026-10-16T02-01Z-vanilla-consent-geo-validation](reports/2026-10-16T02-01Z-vanilla-consent-geo-validation.md) and [2026-10-22T17-26Z-vanilla-geo-policy-validation](reports/2026-10-22T17-26Z-vanilla-geo-policy-validation.md).
