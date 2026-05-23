import { z } from "zod"

/**
 * Bước 1: Account — email + password (EN: Step 1: Account — email + password).
 */
export const accountSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password is at least 8 characters"),
})

/**
 * Bước 2: Profile — họ tên + tuổi (EN: Step 2: Profile — full name + age).
 */
export const profileSchema = z.object({
    fullName: z.string().min(2, "Full name is too short"),
    age: z.coerce.number().int().min(13, "Must be at least 13").max(120, "Invalid age"),
})

/**
 * Bước 3: Preferences — newsletter + theme (EN: Step 3: Preferences — newsletter + theme).
 */
export const preferencesSchema = z.object({
    newsletter: z.boolean(),
    theme: z.enum(["light", "dark"]),
})

/**
 * Schema tổng để submit cuối cùng (EN: Combined schema for final submit).
 */
export const wizardSchema = z.object({
    account: accountSchema,
    profile: profileSchema,
    preferences: preferencesSchema,
})

export type WizardInput = z.infer<typeof wizardSchema>
