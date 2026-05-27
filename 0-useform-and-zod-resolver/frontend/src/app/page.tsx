import { SignupForm } from "@/components"

/**
 * Trang chủ — render SignupForm tại "/" cho luồng Playwright.
 * (EN: Home page — renders SignupForm at "/" for Playwright flows.)
 */
export default function HomePage(): JSX.Element {
    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-background">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign up</h1>
                    <p className="mt-2 text-sm text-default-500">
                        Form mastery — useForm + zodResolver
                    </p>
                </div>
                <SignupForm />
            </div>
        </main>
    )
}
