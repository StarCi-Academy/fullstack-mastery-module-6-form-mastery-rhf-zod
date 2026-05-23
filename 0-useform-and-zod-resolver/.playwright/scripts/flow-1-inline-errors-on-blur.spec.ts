import { test, expect } from "@playwright/test"

/**
 * Luồng 1 — Lỗi inline hiện ngay khi blur khỏi field email không hợp lệ.
 * (EN: Flow 1 — Inline error appears when blurring an invalid email field.)
 */
test("flow 1 — invalid email shows inline error on blur", async ({ page }) => {
    // Bước 1: navigate (EN: Step 1: navigate)
    await page.goto("/")

    // Bước 2: gõ email sai và blur (EN: Step 2: type invalid email then blur)
    await page.getByTestId("email").fill("not-an-email")
    await page.getByTestId("email").blur()

    // Bước 3: assert lỗi xuất hiện (EN: Step 3: assert error visible)
    await expect(page.getByTestId("email-error")).toContainText(/invalid email/i)
})
