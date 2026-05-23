import type { ReactNode } from "react"
import "./globals.css"
import { HeroUIProvider } from "@/components/providers"

/**
 * Root layout đơn giản (EN: simple root layout).
 */
export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body>
                <HeroUIProvider>
                    {children}
                </HeroUIProvider>
            </body>
        </html>
    )
}

export const metadata = {
    title: "M6 L1 — Async validation with debounce",
}
