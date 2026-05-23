import { SignupForm } from "@/components"

/**
 * Trang chủ — render SignupForm tại "/" cho luồng Playwright.
 * (EN: Home page — renders SignupForm at "/" for Playwright flows.)
 */
export default function HomePage(): JSX.Element {
    return (
        <main>
            <h1>Sign up</h1>
            <SignupForm />
        </main>
    )
}
