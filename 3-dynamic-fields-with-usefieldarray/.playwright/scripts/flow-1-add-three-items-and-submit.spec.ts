import { test, expect } from "@playwright/test"

/**
 * Luồng 1 — Thêm 3 line items + submit nhận lại tổng tiền đúng.
 * (EN: Flow 1 — Add 3 line items + submit and receive the correct total.)
 */
test("flow 1 — add three items and submit", async ({ page }) => {
    // Bước 1: navigate (EN: Step 1: navigate)
    await page.goto("/")
    await page.getByTestId("customer").fill("Acme Co.")

    // Bước 2: điền row 0 (EN: Step 2: fill row 0)
    await page.getByTestId("desc-0").fill("Widget A")
    await page.getByTestId("qty-0").fill("2")
    await page.getByTestId("price-0").fill("10")

    // Bước 3: add row 1 + 2 (EN: Step 3: add rows 1 + 2)
    await page.getByTestId("add-row").click()
    await page.getByTestId("desc-1").fill("Widget B")
    await page.getByTestId("qty-1").fill("3")
    await page.getByTestId("price-1").fill("5")

    await page.getByTestId("add-row").click()
    await page.getByTestId("desc-2").fill("Widget C")
    await page.getByTestId("qty-2").fill("1")
    await page.getByTestId("price-2").fill("7")

    // Bước 4: submit + assert total = 2*10 + 3*5 + 1*7 = 42 (EN: Step 4: submit + assert)
    await page.getByTestId("submit").click()
    await expect(page.getByTestId("success")).toContainText("total=42")
})
