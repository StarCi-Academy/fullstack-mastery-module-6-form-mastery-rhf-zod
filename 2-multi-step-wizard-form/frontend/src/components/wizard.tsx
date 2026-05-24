"use client"
import {
    Button,
    Checkbox,
    Description,
    FieldError,
    Input,
    Label,
    ListBox,
    Select,
    TextField,
} from "@heroui/react"

import { useState } from "react"
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form"
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
        <fieldset data-testid="step-account" className="flex flex-col gap-3">
            <legend>Account</legend>
            <TextField isInvalid={!!errors.account?.email}>
                <Label>Email</Label>
                <Input data-testid="email" placeholder="Email" {...register("account.email")} />
                {errors.account?.email ? (
                    <FieldError data-testid="email-error">
                        {errors.account.email.message}
                    </FieldError>
                ) : (
                    <Description>We'll use this to sign you in.</Description>
                )}
            </TextField>
            <TextField isInvalid={!!errors.account?.password}>
                <Label>Password</Label>
                <Input
                    data-testid="password"
                    type="password"
                    placeholder="Password"
                    {...register("account.password")}
                />
                {errors.account?.password ? (
                    <FieldError data-testid="password-error">
                        {errors.account.password.message}
                    </FieldError>
                ) : (
                    <Description>At least 8 characters.</Description>
                )}
            </TextField>
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
        <fieldset data-testid="step-profile" className="flex flex-col gap-3">
            <legend>Profile</legend>
            <TextField isInvalid={!!errors.profile?.fullName}>
                <Label>Full name</Label>
                <Input
                    data-testid="full-name"
                    placeholder="Full name"
                    {...register("profile.fullName")}
                />
                {errors.profile?.fullName ? (
                    <FieldError data-testid="full-name-error">
                        {errors.profile.fullName.message}
                    </FieldError>
                ) : (
                    <Description>Your display name.</Description>
                )}
            </TextField>
            <TextField isInvalid={!!errors.profile?.age}>
                <Label>Age</Label>
                <Input
                    data-testid="age"
                    type="number"
                    placeholder="Age"
                    {...register("profile.age")}
                />
                {errors.profile?.age ? (
                    <FieldError data-testid="age-error">{errors.profile.age.message}</FieldError>
                ) : (
                    <Description>Must be 13 or older.</Description>
                )}
            </TextField>
        </fieldset>
    )
}

/**
 * Step 3 — Preferences (Checkbox + Select compound qua RHF Controller).
 * (EN: Step 3 — Preferences [Checkbox + Select compound via RHF Controller].)
 */
function StepPreferences(): JSX.Element {
    const { control } = useFormContext<WizardInput>()
    return (
        <fieldset data-testid="step-preferences" className="flex flex-col gap-3">
            <legend>Preferences</legend>
            <Controller
                control={control}
                name="preferences.newsletter"
                render={({ field }) => (
                    <Checkbox
                        data-testid="newsletter"
                        isSelected={field.value}
                        onChange={field.onChange}
                    >
                        <Checkbox.Control>
                            <Checkbox.Indicator />
                        </Checkbox.Control>
                        <Checkbox.Content>
                            <Label>Subscribe to newsletter</Label>
                        </Checkbox.Content>
                    </Checkbox>
                )}
            />
            <Controller
                control={control}
                name="preferences.theme"
                render={({ field }) => (
                    <Select
                        data-testid="theme"
                        selectedKey={field.value}
                        onSelectionChange={(key) => field.onChange(key as "light" | "dark")}
                    >
                        <Label>Theme</Label>
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="light" textValue="Light">
                                    Light
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="dark" textValue="Dark">
                                    Dark
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                )}
            />
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
        const prefs = preferencesSchema.safeParse(data.preferences)
        if (!prefs.success) return
        const res = await submitWizard(data)
        setCreatedId(res.id)
    }

    return (
        <FormProvider {...methods}>
            <form
                data-testid="wizard"
                onSubmit={methods.handleSubmit(onValid)}
                className="flex flex-col gap-4 max-w-md"
            >
                <p data-testid="step-indicator">Step {step + 1} of 3</p>
                {/* Render mọi step nhưng ẩn step không active — giữ DOM input để khi Back,
                    giá trị typed vẫn còn (RHF state + native input value đều persist).
                    (EN: Render every step but hide inactive ones so typed values survive Back —
                    both RHF state and native input value persist across step changes.) */}
                <div style={{ display: step === 0 ? "block" : "none" }}>
                    <StepAccount />
                </div>
                <div style={{ display: step === 1 ? "block" : "none" }}>
                    <StepProfile />
                </div>
                <div style={{ display: step === 2 ? "block" : "none" }}>
                    <StepPreferences />
                </div>

                <div className="flex gap-2">
                    {step > 0 && (
                        <Button type="button" data-testid="back" onPress={goBack}>
                            Back
                        </Button>
                    )}
                    {step < 2 && (
                        <Button type="button" data-testid="next" onPress={goNext}>
                            Next
                        </Button>
                    )}
                    {step === 2 && (
                        <Button type="submit" data-testid="submit">
                            Submit
                        </Button>
                    )}
                </div>

                {createdId !== null && <p data-testid="success">Created #{createdId}</p>}
            </form>
        </FormProvider>
    )
}
