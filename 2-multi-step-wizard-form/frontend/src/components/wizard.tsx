"use client"

import { useState } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    wizardSchema,
    accountSchema,
    profileSchema,
    preferencesSchema,
    type WizardInput,
} from "@/lib/schemas"
import { submitWizard } from "@/lib/api"

/**
 * Step 1 — Account fields (EN: Step 1 — Account fields).
 */
function StepAccount(): JSX.Element {
    const {
        register,
        formState: { errors },
    } = useFormContext<WizardInput>()
    return (
        <fieldset data-testid="step-account">
            <legend>Account</legend>
            <input data-testid="email" placeholder="Email" {...register("account.email")} />
            {errors.account?.email && (
                <p data-testid="email-error">{errors.account.email.message}</p>
            )}
            <input
                data-testid="password"
                type="password"
                placeholder="Password"
                {...register("account.password")}
            />
            {errors.account?.password && (
                <p data-testid="password-error">{errors.account.password.message}</p>
            )}
        </fieldset>
    )
}

/**
 * Step 2 — Profile fields (EN: Step 2 — Profile fields).
 */
function StepProfile(): JSX.Element {
    const {
        register,
        formState: { errors },
    } = useFormContext<WizardInput>()
    return (
        <fieldset data-testid="step-profile">
            <legend>Profile</legend>
            <input data-testid="full-name" placeholder="Full name" {...register("profile.fullName")} />
            {errors.profile?.fullName && (
                <p data-testid="full-name-error">{errors.profile.fullName.message}</p>
            )}
            <input
                data-testid="age"
                type="number"
                placeholder="Age"
                {...register("profile.age")}
            />
            {errors.profile?.age && <p data-testid="age-error">{errors.profile.age.message}</p>}
        </fieldset>
    )
}

/**
 * Step 3 — Preferences fields (EN: Step 3 — Preferences fields).
 */
function StepPreferences(): JSX.Element {
    const { register } = useFormContext<WizardInput>()
    return (
        <fieldset data-testid="step-preferences">
            <legend>Preferences</legend>
            <label>
                <input data-testid="newsletter" type="checkbox" {...register("preferences.newsletter")} />{" "}
                Subscribe to newsletter
            </label>
            <label>
                Theme
                <select data-testid="theme" {...register("preferences.theme")}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </label>
        </fieldset>
    )
}

/**
 * Wizard — quản lý step index, validate từng phần khi Next, submit cuối cùng.
 * (EN: Wizard — manages step index, validates per-step on Next, submits at the end.)
 */
export function Wizard(): JSX.Element {
    const methods = useForm<WizardInput>({
        resolver: zodResolver(wizardSchema),
        mode: "onSubmit",
        defaultValues: {
            account: { email: "", password: "" },
            profile: { fullName: "", age: 0 },
            preferences: { newsletter: false, theme: "light" },
        },
    })

    const [step, setStep] = useState<0 | 1 | 2>(0)
    const [createdId, setCreatedId] = useState<number | null>(null)

    /**
     * Validate sub-schema cho bước hiện tại trước khi sang bước kế.
     * (EN: Validate the current step's sub-schema before advancing.)
     */
    const goNext = async (): Promise<void> => {
        const values = methods.getValues()
        if (step === 0) {
            const result = accountSchema.safeParse(values.account)
            if (!result.success) {
                await methods.trigger(["account.email", "account.password"])
                return
            }
            setStep(1)
        } else if (step === 1) {
            const result = profileSchema.safeParse(values.profile)
            if (!result.success) {
                await methods.trigger(["profile.fullName", "profile.age"])
                return
            }
            setStep(2)
        }
    }

    const goBack = (): void => {
        if (step === 1) setStep(0)
        else if (step === 2) setStep(1)
    }

    /**
     * Submit cuối — gọi backend với toàn bộ payload.
     * (EN: Final submit — calls backend with the complete payload.)
     */
    const onValid = async (data: WizardInput): Promise<void> => {
        // Bảo đảm preferences pass schema (EN: ensure preferences passes schema)
        const prefs = preferencesSchema.safeParse(data.preferences)
        if (!prefs.success) return
        const res = await submitWizard(data)
        setCreatedId(res.id)
    }

    return (
        <FormProvider {...methods}>
            <form data-testid="wizard" onSubmit={methods.handleSubmit(onValid)}>
                <p data-testid="step-indicator">Step {step + 1} of 3</p>
                {step === 0 && <StepAccount />}
                {step === 1 && <StepProfile />}
                {step === 2 && <StepPreferences />}

                <div>
                    {step > 0 && (
                        <button type="button" data-testid="back" onClick={goBack}>
                            Back
                        </button>
                    )}
                    {step < 2 && (
                        <button type="button" data-testid="next" onClick={goNext}>
                            Next
                        </button>
                    )}
                    {step === 2 && (
                        <button type="submit" data-testid="submit">
                            Submit
                        </button>
                    )}
                </div>

                {createdId !== null && <p data-testid="success">Created #{createdId}</p>}
            </form>
        </FormProvider>
    )
}
