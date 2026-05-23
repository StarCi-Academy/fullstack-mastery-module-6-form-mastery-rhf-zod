# Test flows for 3-dynamic-fields-with-usefieldarray

## Flow 1 — Add three items and submit
**Purpose:** Verify that adding 3 line items and submitting POSTs the array to NestJS, which returns the correct total.
**Playwright file:** `.playwright/scripts/flow-1-add-three-items-and-submit.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-1-add-three-items-and-submit.spec.ts`
**Pass criteria:** `success` testid visible with `total=42`.

## Flow 2 — Remove middle item reindexes array
**Purpose:** Verify that removing the middle row via `useFieldArray.remove(index)` slides the trailing row up.
**Playwright file:** `.playwright/scripts/flow-2-remove-middle-item-reindexes.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-2-remove-middle-item-reindexes.spec.ts`
**Pass criteria:** `desc-1` holds the value of the previously-third row (`C`).

## Flow 3 — Zero total blocks submit via refine
**Purpose:** Verify that the schema's `.refine(total > 0)` blocks submission when all unit prices are 0.
**Playwright file:** `.playwright/scripts/flow-3-zero-total-blocks-submit.spec.ts`
**Run:** `npm run test:e2e -- .playwright/scripts/flow-3-zero-total-blocks-submit.spec.ts`
**Pass criteria:** `items-error` testid contains `/greater than 0/i`.
