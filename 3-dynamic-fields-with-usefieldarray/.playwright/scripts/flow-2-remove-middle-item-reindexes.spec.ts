import { test, expect } from "@playwright/test"

/**
 * Luồng 2 — Xoá row giữa, các index còn lại re-flow đúng thứ tự.
 * (EN: Flow 2 — Removing the middle row reindexes remaining rows in order.)
 */
test("flow 2 — remove middle item reindexes array", async ({ page }) => {
    // Bước 1: navigate + tạo 3 rows (EN: Step 1: navigate + add 3 rows)
    await page.goto("/")
    await page.getByTestId("customer").fill("Acme")
    await page.getByTestId("desc-0").fill("A")
    await page.getByTestId("qty-0").fill("1")
    await page.getByTestId("price-0").fill("10")

    await page.getByTestId("add-row").click()
    await page.getByTestId("desc-1").fill("B")
    await page.getByTestId("qty-1").fill("1")
    await page.getByTestId("price-1").fill("20")

    await page.getByTestId("add-row").click()
    await page.getByTestId("desc-2").fill("C")
    await page.getByTestId("qty-2").fill("1")
    await page.getByTestId("price-2").fill("30")

    // Bước 2: xoá row giữa (B) (EN: Step 2: remove middle row B)
    await page.getByTestId("remove-1").click()

    // Bước 3: assert row 1 hiện là C (EN: Step 3: assert row 1 is now C)
    await expect(page.getByTestId("desc-1")).toHaveValue("C")
    await expect(page.getByTestId("desc-0")).toHaveValue("A")
})
