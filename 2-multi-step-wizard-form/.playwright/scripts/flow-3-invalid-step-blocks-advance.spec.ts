import { test, expect } from "@playwright/test"

/**
 * Luồng 3 — Step 1 invalid không cho phép sang step 2.
 * (EN: Flow 3 — An invalid step 1 blocks advancing to step 2.)
 */
test("flow 3 — invalid step blocks Next", async ({ page }) => {
    // Bước 1: navigate (EN: Step 1: navigate)
    await page.goto("/")

    // Bước 2: bỏ trống password và bấm Next (EN: Step 2: leave password empty and click Next)
    await page.getByTestId("email").fill("ada@example.com")
    await page.getByTestId("next").click()

    // Bước 3: assert vẫn ở step 1 + lỗi password hiển thị (EN: Step 3: assert still step 1 + password error visible)
    await expect(page.getByTestId("step-account")).toBeVisible()
    await expect(page.getByTestId("password-error")).toBeVisible()
})
