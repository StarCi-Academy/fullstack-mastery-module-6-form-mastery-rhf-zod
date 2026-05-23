import type { ReactNode } from "react"

/**
 * Root layout đơn giản (EN: simple root layout).
 */
export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}

export const metadata = {
    title: "M6 L1 — Async validation with debounce",
}
