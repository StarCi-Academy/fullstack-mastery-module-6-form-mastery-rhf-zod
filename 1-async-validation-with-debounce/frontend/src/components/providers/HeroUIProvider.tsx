"use client"

import type { PropsWithChildren } from "react"
import { I18nProvider } from "@heroui/react"

/**
 * HeroUI provider — bọc client tree để dùng component @heroui/react.
 * (EN: HeroUI provider — wraps the client tree for @heroui/react components.)
 */
export const HeroUIProvider = ({ children }: PropsWithChildren) => {
  return <I18nProvider>{children}</I18nProvider>
}
