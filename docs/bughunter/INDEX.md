# BugHunter audit index

| UTC | Workflow | Repository / audited SHA | Outcome / severity | Tests / coverage | Research | PR / blocker |
|---|---|---|---|---|---|---|
| 2026-10-16T02:01Z | Vanilla JS cookie-consent geo decision and GTM gating | `qrati-connect-vanillajs-example` / `f3b471b65c80ff3596d11630a3e8fcc159b2e49a` | Report-only; medium malformed geo payload can bypass fail-closed fallback | No existing test setup; test/build unavailable (`pnpm` missing); coverage not measured | Google Consent Mode guidance URL recorded; retrieval backend unavailable | PR pending creation; no code fix pending runnable regression setup |

See [2026-10-16T02-01Z-vanilla-consent-geo-validation](reports/2026-10-16T02-01Z-vanilla-consent-geo-validation.md).
