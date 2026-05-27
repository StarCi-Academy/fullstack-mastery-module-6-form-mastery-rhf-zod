import { UsernameForm } from "@/components"

/**
 * Trang chủ render UsernameForm cho luồng Playwright.
 * (EN: Home page renders UsernameForm for Playwright flows.)
 */
export default function HomePage(): JSX.Element {
    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-background">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Pick a username
                    </h1>
                    <p className="mt-2 text-sm text-default-500">
                        Async validation with debounce
                    </p>
                </div>
                <UsernameForm />
            </div>
        </main>
    )
}
