"use client"
import { Button, Description, FieldError, Input, Label, TextField } from "@heroui/react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema, type SignupInput } from "@/lib/schemas"
import { signup } from "@/lib/api"

/**
 * SignupForm — useForm + zodResolver, hiển thị lỗi inline trên blur qua HeroUI FieldError.
 * (EN: SignupForm — useForm + zodResolver, surfaces inline errors on blur via HeroUI FieldError.)
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
                {formState.errors.email ? (
                    <FieldError data-testid="email-error">
                        {formState.errors.email.message}
                    </FieldError>
                ) : (
                    <Description>We'll use this email to sign you in.</Description>
                )}
            </TextField>

            <TextField isInvalid={!!formState.errors.password}>
                <Label>Password</Label>
                <Input data-testid="password" type="password" {...register("password")} />
                {formState.errors.password ? (
                    <FieldError data-testid="password-error">
                        {formState.errors.password.message}
                    </FieldError>
                ) : (
                    <Description>At least 8 characters.</Description>
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
