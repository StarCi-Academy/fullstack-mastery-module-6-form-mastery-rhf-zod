"use client"
import {
    Card,
    Description,
    FieldError,
    Input,
    Label,
    TextField,
} from "@heroui/react"

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
 * Map availability -> semantic color token (EN: Map availability -> semantic color token).
 */
function availabilityTone(state: Availability): string {
    switch (state) {
        case "checking":
            return "text-default-500"
        case "available":
            return "text-success"
        case "taken":
            return "text-danger"
        default:
            return "text-default-400"
    }
}

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

    const statusText: Record<Availability, string> = {
        idle: " ",
        checking: "Checking availability...",
        available: "Username is available",
        taken: "Username is already taken",
    }

    return (
        <Card className="w-full max-w-md p-6 shadow-medium rounded-large border border-default-200 bg-content1">
            <div className="flex flex-col gap-1 mb-5">
                <h2 className="text-xl font-semibold text-foreground">Pick a username</h2>
                <p className="text-sm text-default-500">
                    Debounced async check against the server.
                </p>
            </div>
            <form
                data-testid="username-form"
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-3"
            >
                <TextField isInvalid={!!formState.errors.username}>
                    <Label className="text-sm font-medium text-foreground">Username</Label>
                    <Input
                        data-testid="username"
                        autoComplete="off"
                        placeholder="lowercase letters or digits"
                        {...register("username")}
                    />
                    {formState.errors.username ? (
                        <FieldError data-testid="username-error" className="text-sm text-danger">
                            {formState.errors.username.message}
                        </FieldError>
                    ) : (
                        <Description className="text-xs text-default-500">
                            Lowercase letters or digits, 3–20 chars.
                        </Description>
                    )}
                </TextField>
                <p
                    data-testid="availability"
                    data-state={availability}
                    className={`text-sm font-medium ${availabilityTone(availability)}`}
                >
                    {statusText[availability]}
                </p>
            </form>
        </Card>
    )
}
