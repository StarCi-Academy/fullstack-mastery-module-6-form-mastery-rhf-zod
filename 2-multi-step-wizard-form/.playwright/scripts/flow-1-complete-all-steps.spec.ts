import { test, expect } from "@playwright/test"

/**
 * Luồng 1 — Hoàn thành cả 3 bước và submit thành công.
 * (EN: Flow 1 — Complete all 3 steps and submit successfully.)
 */
test("flow 1 — complete all 3 steps and submit", async ({ page }) => {
    // Bước 1: navigate (EN: Step 1: navigate)
    await page.goto("/")

    // Bước 2: điền Account và sang step 2 (EN: Step 2: fill Account and go next)
    await page.getByTestId("email").fill("ada@example.com")
    await page.getByTestId("password").fill("secret123")
    await page.getByTestId("next").click()
    await expect(page.getByTestId("step-profile")).toBeVisible()

    // Bước 3: điền Profile (EN: Step 3: fill Profile)
    await page.getByTestId("full-name").fill("Ada Lovelace")
    await page.getByTestId("age").fill("36")
    await page.getByTestId("next").click()
    await expect(page.getByTestId("step-preferences")).toBeVisible()

    // Bước 4: submit và assert (EN: Step 4: submit and assert)
    await page.getByTestId("submit").click()
    await expect(page.getByTestId("success")).toContainText(/created/i)
})
