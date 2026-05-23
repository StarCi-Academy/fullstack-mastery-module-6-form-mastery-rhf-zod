"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema, type SignupInput } from "@/lib/schemas"
import { signup } from "@/lib/api"

/**
 * SignupForm — useForm + zodResolver, hiển thị lỗi inline trên blur.
 * (EN: SignupForm — useForm + zodResolver, shows inline errors on blur.)
 */
export function SignupForm(): JSX.Element {
    const [createdId, setCreatedId] = useState<number | null>(null)

    const { register, handleSubmit, formState } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        mode: "onBlur",
    })

    /**
     * Submit handler — chỉ chạy khi schema parse OK.
     * (EN: Submit handler — runs only when schema parses successfully.)
     */
    const onValid = async (data: SignupInput): Promise<void> => {
        const res = await signup(data)
        setCreatedId(res.id)
    }

    return (
        <form onSubmit={handleSubmit(onValid)} data-testid="signup-form">
            <label>
                Email
                <input data-testid="email" {...register("email")} />
            </label>
            {formState.errors.email && (
                <p data-testid="email-error">{formState.errors.email.message}</p>
            )}

            <label>
                Password
                <input data-testid="password" type="password" {...register("password")} />
            </label>
            {formState.errors.password && (
                <p data-testid="password-error">{formState.errors.password.message}</p>
            )}

            <button data-testid="submit" disabled={formState.isSubmitting}>
                {formState.isSubmitting ? "Submitting..." : "Sign up"}
            </button>

            {createdId !== null && (
                <p data-testid="success">Created user #{createdId}</p>
            )}
        </form>
    )
}
