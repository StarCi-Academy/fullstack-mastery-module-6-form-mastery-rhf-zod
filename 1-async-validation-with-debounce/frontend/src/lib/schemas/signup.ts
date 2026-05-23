import { z } from "zod"

/**
 * Schema cho L1 — username chỉ chứa chữ thường + số, 3–20 ký tự.
 * (EN: L1 schema — username allows lowercase letters + digits, 3–20 chars.)
 */
export const signupSchema = z.object({
    username: z
        .string()
        .min(3, "Username is at least 3 characters")
        .max(20, "Username is at most 20 characters")
        .regex(/^[a-z0-9]+$/, "Username must be lowercase letters or digits"),
})

export type SignupInput = z.infer<typeof signupSchema>
