import { z } from "zod"

/**
 * Schema đăng ký — email hợp lệ + mật khẩu tối thiểu 8 ký tự.
 * (EN: Signup schema — valid email + min 8 chars password.)
 */
export const signupSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password is at least 8 characters"),
})

/**
 * Kiểu suy ra từ schema — single source of truth.
 * (EN: Type inferred from schema — single source of truth.)
 */
export type SignupInput = z.infer<typeof signupSchema>
