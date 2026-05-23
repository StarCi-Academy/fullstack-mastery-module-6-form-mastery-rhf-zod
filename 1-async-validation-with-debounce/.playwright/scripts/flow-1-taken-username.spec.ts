import { test, expect } from "@playwright/test"

/**
 * Luồng 1 — Username đã bị chiếm hiển thị trạng thái "taken".
 * (EN: Flow 1 — A taken username surfaces the "taken" state.)
 */
test("flow 1 — taken username shows taken state", async ({ page }) => {
    // Bước 1: navigate (EN: Step 1: navigate)
    await page.goto("/")

    // Bước 2: gõ username đã có trong seed (EN: Step 2: type seeded username)
    await page.getByTestId("username").fill("admin")

    // Bước 3: chờ debounce + assert (EN: Step 3: wait for debounce + assert)
    await expect(page.getByTestId("availability")).toHaveAttribute("data-state", "taken", {
        timeout: 3_000,
    })
})
