"use client"
import {
    Button,
    Card,
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
 * StepProgress — pill indicator hiển thị 3 bước với active highlight.
 * (EN: StepProgress — pill indicator showing 3 steps with active highlight.)
 */
function StepProgress({ step }: { step: 0 | 1 | 2 }): JSX.Element {
    const labels = ["Account", "Profile", "Preferences"] as const
    return (
        <ol className="flex items-center gap-2 mb-4" aria-label="Wizard progress">
            {labels.map((label, idx) => {
                const isActive = idx === step
                const isDone = idx < step
                const tone = isActive
                    ? "bg-primary text-primary-foreground"
                    : isDone
                      ? "bg-success-100 text-success-700"
                      : "bg-default-100 text-default-500"
                return (
                    <li
                        key={label}
                        className={`flex-1 rounded-medium px-3 py-2 text-center text-xs font-medium ${tone}`}
                    >
                        {idx + 1}. {label}
                    </li>
                )
            })}
        </ol>
    )
}

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
            <legend className="text-sm font-semibold text-foreground mb-1">Account</legend>
            <TextField isInvalid={!!errors.account?.email}>
                <Label className="text-sm font-medium text-foreground">Email</Label>
                <Input data-testid="email" placeholder="you@example.com" {...register("account.email")} />
                {errors.account?.email ? (
                    <FieldError data-testid="email-error" className="text-sm text-danger">
                        {errors.account.email.message}
                    </FieldError>
                ) : (
                    <Description className="text-xs text-default-500">
                        We'll use this to sign you in.
                    </Description>
                )}
            </TextField>
            <TextField isInvalid={!!errors.account?.password}>
                <Label className="text-sm font-medium text-foreground">Password</Label>
                <Input
                    data-testid="password"
                    type="password"
                    placeholder="At least 8 characters"
                    {...register("account.password")}
                />
                {errors.account?.password ? (
                    <FieldError data-testid="password-error" className="text-sm text-danger">
                        {errors.account.password.message}
                    </FieldError>
                ) : (
                    <Description className="text-xs text-default-500">
                        At least 8 characters.
                    </Description>
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
            <legend className="text-sm font-semibold text-foreground mb-1">Profile</legend>
            <TextField isInvalid={!!errors.profile?.fullName}>
                <Label className="text-sm font-medium text-foreground">Full name</Label>
                <Input
                    data-testid="full-name"
                    placeholder="Ada Lovelace"
                    {...register("profile.fullName")}
                />
                {errors.profile?.fullName ? (
                    <FieldError data-testid="full-name-error" className="text-sm text-danger">
                        {errors.profile.fullName.message}
                    </FieldError>
                ) : (
                    <Description className="text-xs text-default-500">Your display name.</Description>
                )}
            </TextField>
            <TextField isInvalid={!!errors.profile?.age}>
                <Label className="text-sm font-medium text-foreground">Age</Label>
                <Input
                    data-testid="age"
                    type="number"
                    placeholder="13+"
                    {...register("profile.age")}
                />
                {errors.profile?.age ? (
                    <FieldError data-testid="age-error" className="text-sm text-danger">
                        {errors.profile.age.message}
                    </FieldError>
                ) : (
                    <Description className="text-xs text-default-500">Must be 13 or older.</Description>
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
            <legend className="text-sm font-semibold text-foreground mb-1">Preferences</legend>
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
                            <Label className="text-sm font-medium text-foreground">
                                Subscribe to newsletter
                            </Label>
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
                        <Label className="text-sm font-medium text-foreground">Theme</Label>
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
        <Card className="w-full max-w-md p-6 shadow-medium rounded-large border border-default-200 bg-content1">
            <div className="flex flex-col gap-1 mb-5">
                <h2 className="text-xl font-semibold text-foreground">Sign up wizard</h2>
                <p data-testid="step-indicator" className="text-sm text-default-500">
                    Step {step + 1} of 3
                </p>
            </div>
            <StepProgress step={step} />
            <FormProvider {...methods}>
                <form
                    data-testid="wizard"
                    onSubmit={methods.handleSubmit(onValid)}
                    className="flex flex-col gap-4"
                >
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

                    <div className="flex gap-2 justify-end pt-2">
                        {step > 0 && (
                            <Button
                                type="button"
                                data-testid="back"
                                variant="bordered"
                                onPress={goBack}
                            >
                                Back
                            </Button>
                        )}
                        {step < 2 && (
                            <Button
                                type="button"
                                data-testid="next"
                                color="primary"
                                onPress={goNext}
                            >
                                Next
                            </Button>
                        )}
                        {step === 2 && (
                            <Button type="submit" data-testid="submit" color="primary">
                                Submit
                            </Button>
                        )}
                    </div>

                    {createdId !== null && (
                        <div
                            data-testid="success"
                            className="mt-2 rounded-medium border border-success-200 bg-success-50 px-4 py-3 text-sm text-success-700"
                        >
                            Created #{createdId}
                        </div>
                    )}
                </form>
            </FormProvider>
        </Card>
    )
}
