# BugHunter audit: Vanilla JS cookie-consent geo decision

- **Audit time:** 2026-10-16 02:01 UTC
- **Repository/base:** `qrati-connect-vanillajs-example` at `f3b471b65c80ff3596d11630a3e8fcc159b2e49a`
- **Workflow:** determine whether consent is legally required, configure the cookie-consent UI, and gate GTM initialization on analytics consent.
- **Outcome:** report-only; medium-severity correctness/privacy risk documented, no production change because this checkout has no automated test setup and the declared package manager is unavailable.

## Flow and bounded scope

The application entry (`src/main.js`) invokes `initCookieConsent()` before rendering and separately mounts the demo embed. `src/cookieConsent.js` reads session-cached geo policy or fetches `/api/cookie-consent-geo` (Qrati host) / `https://qrati.com/api/cookie-consent-geo` (other hosts), configures `vanilla-cookieconsent` for opt-in/opt-out, then synchronizes Google consent and conditionally appends GTM. Reviewed the consent helper, its application entry/caller, HTML startup, package scripts/dependencies, and CodeGraph caller/callee trace. Excluded the external geo endpoint implementation and the hosted embed's internals: neither is present in this repository, and the audit stayed within this single consent decision workflow.

## Findings

### Medium — malformed successful geo payload can enable opt-out

`src/cookieConsent.js:33-36` parses JSON and trusts `required` without checking HTTP success or validating the payload type. If a successful response contains `{}` or `{ "required": "false" }`, the latter truthy string reaches the `required ? 'opt-in' : 'opt-out'` branch (`:47-49`). The response is then cached (`:35`), and `syncGtm()` (`:6-22, :59`) can load GTM when analytics is accepted. This bypasses the catch-based fail-closed path (`:37-39`) for malformed-but-parseable payloads. Invalid/missing policy should not silently mean consent is unnecessary; validate an actual boolean and retain the conservative fallback. No source-backed claim is made here about jurisdictional requirements; this is a control-flow risk in the current implementation.

## Test quality and verification

- No test files or test script are present in `package.json` (scripts are dev/build/preview/deploy only).
- Unit/integration/E2E evidence: none available; no new tests were added because safely introducing a test framework and refactoring the module into a testable boundary was beyond a report-only audit without a runnable dependency installation.
- Dependency check: `node_modules` absent; `pnpm` command unavailable (`pnpm: command not found`), so installation, build, lint, typecheck, and test execution could not run. Coverage: not measured. Performance: not measured.
- `gh auth status` succeeded. At audit head, no open PR existed; `gh pr checks ... 2` failed because PR #2 does not exist in this repository, so no checks were available to inspect.
- CodeGraph was initialized for this selected repo and then used to trace symbols/callers. It indexed 7 files (29 nodes, 46 edges); the generated `.codegraph/` files are untracked and not ignored in the original checkout, so they were not included in this PR.
- Research lookup: Google Consent Mode guidance URL recorded for follow-up; configured web search returned no results and extraction was unsupported by the configured backend, so no external guidance claim is attributed in this report: https://developers.google.com/tag-platform/security/guides/consent

## Recommendation

Add a small, testable geo-response validator and regression coverage for missing, string-valued, and valid boolean `required` values; malformed responses should follow the existing conservative fallback and must not be cached as a permissive decision. Then verify startup ordering and that GTM remains absent until analytics consent. A production change was intentionally not made without a runnable test path.

## Pull request

Report-only PR for this audit. No merge or deployment performed.
