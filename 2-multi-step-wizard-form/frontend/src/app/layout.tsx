import type { ReactNode } from "react"

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}

export const metadata = { title: "M6 L2 — Multi-step wizard" }
