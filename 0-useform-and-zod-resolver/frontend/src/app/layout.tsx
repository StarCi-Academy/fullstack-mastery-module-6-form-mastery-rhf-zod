import type { ReactNode } from "react"
import "./globals.css"
import { HeroUIProvider } from "@/components/providers"

/**
 * Root layout — không có provider phụ trợ, mỗi page render độc lập.
 * (EN: Root layout — no extra providers, each page renders standalone.)
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
    title: "M6 L0 — useForm and zodResolver",
}
