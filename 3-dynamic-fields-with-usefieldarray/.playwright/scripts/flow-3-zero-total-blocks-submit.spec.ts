import { test, expect } from "@playwright/test"

/**
 * Luồng 3 — Tổng tiền = 0 phải bị refine chặn submit.
 * (EN: Flow 3 — A zero total must be blocked by the refine.)
 */
test("flow 3 — zero total blocks submit via refine", async ({ page }) => {
    // Bước 1: navigate (EN: Step 1: navigate)
    await page.goto("/")
    await page.getByTestId("customer").fill("Acme")
    await page.getByTestId("desc-0").fill("Free widget")
    await page.getByTestId("qty-0").fill("1")
    await page.getByTestId("price-0").fill("0")

    // Bước 2: submit (EN: Step 2: submit)
    await page.getByTestId("submit").click()

    // Bước 3: assert refine error visible (EN: Step 3: assert refine error visible)
    await expect(page.getByTestId("items-error")).toContainText(/greater than 0/i)
})
