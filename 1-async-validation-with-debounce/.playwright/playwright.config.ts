import { defineConfig, devices } from "@playwright/test"

/**
 * Cấu hình Playwright — testDir trỏ ./scripts.
 * (EN: Playwright config — testDir points to ./scripts.)
 */
export default defineConfig({
    testDir: "./scripts",
    timeout: 30_000,
    use: {
        baseURL: "http://localhost:3001",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
})
