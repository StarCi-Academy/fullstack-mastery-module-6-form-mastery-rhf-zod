"use client"
import { Button, Input, Label, TextField } from "@heroui/react"

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
        <form
            onSubmit={handleSubmit(onValid)}
            data-testid="signup-form"
            className="flex flex-col gap-4 max-w-md"
        >
            <TextField isInvalid={!!formState.errors.email}>
                <Label>Email</Label>
                <Input data-testid="email" type="email" {...register("email")} />
                {formState.errors.email && (
                    <p data-testid="email-error" className="text-sm text-danger">
                        {formState.errors.email.message}
                    </p>
                )}
            </TextField>

            <TextField isInvalid={!!formState.errors.password}>
                <Label>Password</Label>
                <Input data-testid="password" type="password" {...register("password")} />
                {formState.errors.password && (
                    <p data-testid="password-error" className="text-sm text-danger">
                        {formState.errors.password.message}
                    </p>
                )}
            </TextField>

            <Button type="submit" data-testid="submit" isDisabled={formState.isSubmitting}>
                {formState.isSubmitting ? "Submitting..." : "Sign up"}
            </Button>

            {createdId !== null && (
                <p data-testid="success">Created user #{createdId}</p>
            )}
        </form>
    )
}
