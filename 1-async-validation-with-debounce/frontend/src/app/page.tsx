import { UsernameForm } from "@/components"

/**
 * Trang chủ render UsernameForm cho luồng Playwright.
 * (EN: Home page renders UsernameForm for Playwright flows.)
 */
export default function HomePage(): JSX.Element {
    return (
        <main>
            <h1>Pick a username</h1>
            <UsernameForm />
        </main>
    )
}
