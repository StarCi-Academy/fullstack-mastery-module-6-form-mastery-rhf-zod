import { test, expect } from "@playwright/test"

/**
 * Luồng 2 — Back từ step 2 về step 1, state Account vẫn được giữ.
 * (EN: Flow 2 — Pressing Back from step 2 keeps Account state.)
 */
test("flow 2 — back preserves account state", async ({ page }) => {
    // Bước 1: navigate + step 1 → step 2 (EN: Step 1: navigate + advance)
    await page.goto("/")
    await page.getByTestId("email").fill("ada@example.com")
    await page.getByTestId("password").fill("secret123")
    await page.getByTestId("next").click()
    await expect(page.getByTestId("step-profile")).toBeVisible()

    // Bước 2: back về step 1 (EN: Step 2: back to step 1)
    await page.getByTestId("back").click()

    // Bước 3: assert email vẫn còn giá trị (EN: Step 3: assert email retains value)
    await expect(page.getByTestId("email")).toHaveValue("ada@example.com")
    await expect(page.getByTestId("password")).toHaveValue("secret123")
})
