import { defineConfig, devices } from "@playwright/test"

/**
 * Cấu hình Playwright — port + baseURL configurable via env (FE_PORT / BE_PORT).
 * (EN: Playwright config — port + baseURL configurable via env (FE_PORT / BE_PORT).)
 */
const FE_PORT = Number(process.env.FE_PORT ?? "3001")
const BE_PORT = Number(process.env.BE_PORT ?? "3000")
const BASE_URL = process.env.PW_BASE_URL ?? `http://localhost:${FE_PORT}`

export default defineConfig({
    testDir: "./scripts",
    timeout: 30_000,
    use: {
        baseURL: BASE_URL,
        trace: "on-first-retry",
        screenshot: "only-on-failure",
    },
    webServer: [
        {
            command: `npm install --prefer-offline && cross-env PORT=${BE_PORT} CORS_ORIGIN=${BASE_URL} npx nest start`,
            cwd: "../backend",
            port: BE_PORT,
            reuseExistingServer: !process.env.CI,
            timeout: 120_000,
        },
        {
            command: `npm install --prefer-offline && cross-env NEXT_PUBLIC_API_BASE=http://localhost:${BE_PORT} npx next dev -p ${FE_PORT}`,
            cwd: "../frontend",
            port: FE_PORT,
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
