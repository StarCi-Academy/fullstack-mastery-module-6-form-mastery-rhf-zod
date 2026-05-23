import { test, expect } from "@playwright/test"

/**
 * Luồng 2 — Submit input hợp lệ, nhận lại id từ NestJS.
 * (EN: Flow 2 — Submit valid input, receive id back from NestJS.)
 */
test("flow 2 — valid input submits and renders success message", async ({ page }) => {
    // Bước 1: navigate (EN: Step 1: navigate)
    await page.goto("/")

    // Bước 2: điền giá trị hợp lệ (EN: Step 2: fill valid values)
    await page.getByTestId("email").fill("ada@example.com")
    await page.getByTestId("password").fill("secret123")

    // Bước 3: submit + assert success (EN: Step 3: submit + assert success)
    await page.getByTestId("submit").click()
    await expect(page.getByTestId("success")).toContainText(/created user/i)
})
