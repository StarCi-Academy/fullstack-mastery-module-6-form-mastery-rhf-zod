# Test flows for 1-async-validation-with-debounce

## Flow 1 — Taken username shows taken state
**Purpose:** Verify that a username already present in the backend's taken-set surfaces a "taken" availability state.
**Playwright file:** `.playwright/scripts/flow-1-taken-username.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-1-taken-username.spec.ts`
**Pass criteria:** `availability` testid has `data-state="taken"` within 3s.

## Flow 2 — Free username shows available state
**Purpose:** Verify that a never-used username yields `data-state="available"` after debounce + fetch.
**Playwright file:** `.playwright/scripts/flow-2-free-username.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-2-free-username.spec.ts`
**Pass criteria:** `availability` testid has `data-state="available"` within 3s.

## Flow 3 — Debounce coalesces keystrokes into one request
**Purpose:** Verify that typing 6 characters fast triggers exactly one `GET /users/check-username` call (not 6).
**Playwright file:** `.playwright/scripts/flow-3-debounce-coalescing.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-3-debounce-coalescing.spec.ts`
**Pass criteria:** Exactly 1 network request to `/users/check-username` observed; availability state settles to `available`.
