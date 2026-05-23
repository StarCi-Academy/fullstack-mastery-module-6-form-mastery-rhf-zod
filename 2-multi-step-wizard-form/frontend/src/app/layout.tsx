import type { ReactNode } from "react"
import "./globals.css"
import { HeroUIProvider } from "@/components/providers"

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

export const metadata = { title: "M6 L2 — Multi-step wizard" }
