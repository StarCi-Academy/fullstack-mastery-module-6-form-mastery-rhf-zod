"use client"
import {
    Button,
    Card,
    Description,
    FieldError,
    Input,
    Label,
    TextField,
} from "@heroui/react"

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
        <Card className="w-full max-w-md p-6 shadow-medium rounded-large border border-default-200 bg-content1">
            <div className="flex flex-col gap-1 mb-5">
                <h2 className="text-xl font-semibold text-foreground">Create your account</h2>
                <p className="text-sm text-default-500">
                    Validate locally with Zod, submit to NestJS.
                </p>
            </div>
            <form
                onSubmit={handleSubmit(onValid)}
                data-testid="signup-form"
                className="flex flex-col gap-4"
            >
                <TextField isInvalid={!!formState.errors.email}>
                    <Label className="text-sm font-medium text-foreground">Email</Label>
                    <Input
                        data-testid="email"
                        type="email"
                        placeholder="you@example.com"
                        {...register("email")}
                    />
                    {formState.errors.email ? (
                        <FieldError data-testid="email-error" className="text-sm text-danger">
                            {formState.errors.email.message}
                        </FieldError>
                    ) : (
                        <Description className="text-xs text-default-500">
                            We'll use this email to sign you in.
                        </Description>
                    )}
                </TextField>

                <TextField isInvalid={!!formState.errors.password}>
                    <Label className="text-sm font-medium text-foreground">Password</Label>
                    <Input
                        data-testid="password"
                        type="password"
                        placeholder="At least 8 characters"
                        {...register("password")}
                    />
                    {formState.errors.password ? (
                        <FieldError data-testid="password-error" className="text-sm text-danger">
                            {formState.errors.password.message}
                        </FieldError>
                    ) : (
                        <Description className="text-xs text-default-500">
                            At least 8 characters.
                        </Description>
                    )}
                </TextField>

                <Button
                    type="submit"
                    data-testid="submit"
                    color="primary"
                    isDisabled={formState.isSubmitting}
                    className="mt-2"
                >
                    {formState.isSubmitting ? "Submitting..." : "Sign up"}
                </Button>

                {createdId !== null && (
                    <div
                        data-testid="success"
                        className="mt-2 rounded-medium border border-success-200 bg-success-50 px-4 py-3 text-sm text-success-700"
                    >
                        Created user #{createdId}
                    </div>
                )}
            </form>
        </Card>
    )
}
