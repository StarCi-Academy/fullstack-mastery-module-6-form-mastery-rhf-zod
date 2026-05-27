import { Wizard } from "@/components"

/**
 * Trang chủ — render Wizard 3 bước.
 * (EN: Home page — renders the 3-step Wizard.)
 */
export default function HomePage(): JSX.Element {
    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-background">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Sign up wizard
                    </h1>
                    <p className="mt-2 text-sm text-default-500">
                        Multi-step form with per-step validation
                    </p>
                </div>
                <Wizard />
            </div>
        </main>
    )
}
