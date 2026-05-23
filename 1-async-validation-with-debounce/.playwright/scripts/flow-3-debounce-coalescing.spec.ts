import { test, expect } from "@playwright/test"

/**
 * Luồng 3 — Gõ liên tục trong < 500ms chỉ bắn 1 request cuối cùng.
 * (EN: Flow 3 — Rapid typing within <500ms only fires one final request.)
 */
test("flow 3 — debounce coalesces rapid keystrokes into one request", async ({ page }) => {
    let requestCount = 0

    // Bước 1: bắt mọi request tới check-username (EN: Step 1: intercept check-username requests)
    page.on("request", (req) => {
        if (req.url().includes("/users/check-username")) {
            requestCount += 1
        }
    })

    // Bước 2: navigate (EN: Step 2: navigate)
    await page.goto("/")

    // Bước 3: gõ nhanh từng ký tự (EN: Step 3: type characters quickly)
    const input = page.getByTestId("username")
    await input.pressSequentially("zora42", { delay: 50 })

    // Bước 4: đợi debounce settle (EN: Step 4: wait for debounce to settle)
    await expect(page.getByTestId("availability")).toHaveAttribute("data-state", "available", {
        timeout: 3_000,
    })

    // Bước 5: assert chỉ có 1 request (EN: Step 5: assert exactly one request)
    expect(requestCount).toBe(1)
})
