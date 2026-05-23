import { test, expect } from "@playwright/test"

/**
 * Luồng 3 — Submit form rỗng phải hiển thị cả 2 lỗi field.
 * (EN: Flow 3 — Submitting an empty form must show both field errors.)
 */
test("flow 3 — empty submit shows all errors", async ({ page }) => {
    // Bước 1: navigate (EN: Step 1: navigate)
    await page.goto("/")

    // Bước 2: bấm submit ngay khi form rỗng (EN: Step 2: click submit on empty form)
    await page.getByTestId("submit").click()

    // Bước 3: cả 2 lỗi đều hiển thị (EN: Step 3: both errors visible)
    await expect(page.getByTestId("email-error")).toBeVisible()
    await expect(page.getByTestId("password-error")).toBeVisible()
})
