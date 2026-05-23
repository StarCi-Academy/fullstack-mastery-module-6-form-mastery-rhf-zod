# Test flows for 0-useform-and-zod-resolver

## Flow 1 — Inline errors on blur
**Purpose:** Verify that blurring out of an invalid email field shows the Zod error inline.
**Playwright file:** `.playwright/scripts/flow-1-inline-errors-on-blur.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-1-inline-errors-on-blur.spec.ts`
**Pass criteria:** Test passes; `email-error` testid is visible with text matching `/invalid email/i`.

## Flow 2 — Submit valid input
**Purpose:** Verify that a valid email+password POSTs to NestJS and the response id renders.
**Playwright file:** `.playwright/scripts/flow-2-submit-valid-input.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-2-submit-valid-input.spec.ts`
**Pass criteria:** Test passes; `success` testid visible with `/created user/i`.

## Flow 3 — Empty submit shows all errors
**Purpose:** Verify that submitting an empty form surfaces both email and password errors at once.
**Playwright file:** `.playwright/scripts/flow-3-empty-submit-all-errors.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-3-empty-submit-all-errors.spec.ts`
**Pass criteria:** Both `email-error` and `password-error` testids visible.
