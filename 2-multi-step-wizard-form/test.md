# Test flows for 2-multi-step-wizard-form

## Flow 1 — Complete all 3 steps and submit
**Purpose:** Verify that filling Account → Profile → Preferences and clicking Submit POSTs the combined payload and renders the created id.
**Playwright file:** `.playwright/scripts/flow-1-complete-all-steps.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-1-complete-all-steps.spec.ts`
**Pass criteria:** `success` testid visible with `/created/i`.

## Flow 2 — Back preserves account state
**Purpose:** Verify that navigating Back from step 2 retains email + password values from step 1 (FormProvider keeps state).
**Playwright file:** `.playwright/scripts/flow-2-back-preserves-state.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-2-back-preserves-state.spec.ts`
**Pass criteria:** Email + password inputs still hold their values after Back.

## Flow 3 — Invalid step blocks Next
**Purpose:** Verify that leaving password empty in step 1 prevents advancing and surfaces the password error.
**Playwright file:** `.playwright/scripts/flow-3-invalid-step-blocks-advance.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-3-invalid-step-blocks-advance.spec.ts`
**Pass criteria:** `step-account` still visible; `password-error` visible.
