import { defineConfig, devices } from "@playwright/test"

/**
 * Cấu hình Playwright — testDir trỏ ./scripts, baseURL Next.js port 3001.
 * (EN: Playwright config — testDir points to ./scripts, baseURL Next.js port 3001.)
 */
export default defineConfig({
    testDir: "./scripts",
    timeout: 30_000,
    use: {
        baseURL: "http://localhost:3001",
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    workers: 1,
    fullyParallel: false,
    webServer: [
        {
            command: "npm install --prefer-offline && npx nest start",
            cwd: "../backend",
            port: 3000,
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
        },
        {
            command: "npm install --prefer-offline && npm run dev",
            cwd: "../frontend",
            port: 3001,
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
        },
    ],
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "head",
            use: { ...devices["Desktop Chrome"], channel: "chrome" },
        },
    ],
})
