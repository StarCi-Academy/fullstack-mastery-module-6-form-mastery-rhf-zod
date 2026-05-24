"use client"
import { Button, Description, FieldError, Input, Label, TextField } from "@heroui/react"

import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { invoiceSchema, type InvoiceInput } from "@/lib/schemas"
import { submitInvoice } from "@/lib/api"

/**
 * InvoiceForm — sử dụng useFieldArray để add/remove line items động.
 * (EN: InvoiceForm — uses useFieldArray to add/remove dynamic line items.)
 */
export function InvoiceForm(): JSX.Element {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<InvoiceInput>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            customer: "",
            items: [{ description: "", quantity: 1, unitPrice: 0 }],
        },
    })

    const { fields, append, remove } = useFieldArray({ control, name: "items" })
    const [result, setResult] = useState<{ id: number; total: number } | null>(null)

    /**
     * Submit handler — chỉ gọi khi schema + refine total > 0 pass.
     * (EN: Submit handler — only runs when schema + total-positive refine passes.)
     */
    const onValid = async (data: InvoiceInput): Promise<void> => {
        const res = await submitInvoice(data)
        setResult(res)
    }

    return (
        <form
            data-testid="invoice-form"
            onSubmit={handleSubmit(onValid)}
            className="flex flex-col gap-4 max-w-2xl"
        >
            <TextField isInvalid={!!errors.customer}>
                <Label>Customer</Label>
                <Input data-testid="customer" placeholder="Customer" {...register("customer")} />
                {errors.customer ? (
                    <FieldError data-testid="customer-error">{errors.customer.message}</FieldError>
                ) : (
                    <Description>Bill-to name on the invoice.</Description>
                )}
            </TextField>

            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left">Description</th>
                        <th className="text-left">Qty</th>
                        <th className="text-left">Unit price</th>
                        <th />
                    </tr>
                </thead>
                <tbody data-testid="items-body">
                    {fields.map((field, index) => (
                        <tr key={field.id} data-testid={`row-${index}`}>
                            <td>
                                <TextField isInvalid={!!errors.items?.[index]?.description}>
                                    <Label className="sr-only">Description</Label>
                                    <Input
                                        data-testid={`desc-${index}`}
                                        {...register(`items.${index}.description`)}
                                    />
                                </TextField>
                            </td>
                            <td>
                                <TextField isInvalid={!!errors.items?.[index]?.quantity}>
                                    <Label className="sr-only">Quantity</Label>
                                    <Input
                                        data-testid={`qty-${index}`}
                                        type="number"
                                        {...register(`items.${index}.quantity`)}
                                    />
                                </TextField>
                            </td>
                            <td>
                                <TextField isInvalid={!!errors.items?.[index]?.unitPrice}>
                                    <Label className="sr-only">Unit price</Label>
                                    <Input
                                        data-testid={`price-${index}`}
                                        type="number"
                                        {...register(`items.${index}.unitPrice`)}
                                    />
                                </TextField>
                            </td>
                            <td>
                                <Button
                                    type="button"
                                    data-testid={`remove-${index}`}
                                    onPress={() => remove(index)}
                                >
                                    Remove
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Button
                type="button"
                data-testid="add-row"
                onPress={() => append({ description: "", quantity: 1, unitPrice: 0 })}
            >
                Add row
            </Button>

            {(() => {
                // Zod refine với `path: ["items"]` → RHF v7 lưu message ở items.root.message
                // hoặc items.message tuỳ resolver version; check cả hai.
                // (EN: Zod refine path:["items"] → RHF v7 stores it at items.root.message
                // or items.message depending on resolver version; check both.)
                const msg =
                    (errors.items as { message?: string; root?: { message?: string } } | undefined)
                        ?.root?.message ??
                    (errors.items as { message?: string } | undefined)?.message
                return msg ? (
                    <p data-testid="items-error" className="text-sm text-danger">
                        {msg}
                    </p>
                ) : null
            })()}

            <Button type="submit" data-testid="submit" isDisabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            {result !== null && (
                <p data-testid="success">Created invoice #{result.id} total={result.total}</p>
            )}
        </form>
    )
}
