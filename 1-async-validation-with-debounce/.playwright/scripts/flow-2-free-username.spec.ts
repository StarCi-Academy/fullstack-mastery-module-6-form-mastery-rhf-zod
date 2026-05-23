import { test, expect } from "@playwright/test"

/**
 * Luồng 2 — Username chưa ai dùng hiển thị "available".
 * (EN: Flow 2 — A free username surfaces "available".)
 */
test("flow 2 — free username shows available state", async ({ page }) => {
    // Bước 1: navigate (EN: Step 1: navigate)
    await page.goto("/")

    // Bước 2: gõ username chưa dùng (EN: Step 2: type a fresh username)
    await page.getByTestId("username").fill("zora42")

    // Bước 3: assert (EN: Step 3: assert)
    await expect(page.getByTestId("availability")).toHaveAttribute("data-state", "available", {
        timeout: 3_000,
    })
})
