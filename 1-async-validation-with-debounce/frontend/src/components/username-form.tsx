"use client"
import { Input, Label, TextField } from "@heroui/react"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema, type SignupInput } from "@/lib/schemas"
import { checkUsername } from "@/lib/api"

/**
 * Trạng thái xác định async (EN: Async availability state).
 */
type Availability = "idle" | "checking" | "available" | "taken"

const DEBOUNCE_MS = 500

/**
 * UsernameForm — gõ username → debounce 500ms → gọi /users/check-username.
 * (EN: UsernameForm — type username → debounce 500ms → call /users/check-username.)
 */
export function UsernameForm(): JSX.Element {
    const { register, watch, formState } = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        mode: "onChange",
        defaultValues: { username: "" },
    })

    const username = watch("username")
    const [availability, setAvailability] = useState<Availability>("idle")

    /**
     * Effect: debounce input và gọi backend khi username hợp lệ về cú pháp.
     * (EN: Effect: debounce input and call backend when username is syntactically valid.)
     */
    useEffect(() => {
        // Bỏ qua khi schema chưa pass (EN: skip if schema is invalid)
        if (formState.errors.username || username.length < 3) {
            setAvailability("idle")
            return
        }

        setAvailability("checking")
        const handle = setTimeout(async () => {
            try {
                const res = await checkUsername(username)
                setAvailability(res.available ? "available" : "taken")
            } catch {
                setAvailability("idle")
            }
        }, DEBOUNCE_MS)

        return () => {
            clearTimeout(handle)
        }
    }, [username, formState.errors.username])

    return (
        <form data-testid="username-form" onSubmit={(e) => e.preventDefault()}>
            <label>
                Username
                <Input data-testid="username" autoComplete="off" {...register("username")} />
            </label>
            {formState.errors.username && (
                <p data-testid="username-error">{formState.errors.username.message}</p>
            )}
            <p data-testid="availability" data-state={availability}>
                {availability === "checking" && "Checking..."}
                {availability === "available" && "Available"}
                {availability === "taken" && "Taken"}
                {availability === "idle" && " "}
            </p>
        </form>
    )
}
