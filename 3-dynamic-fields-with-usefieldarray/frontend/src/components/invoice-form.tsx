"use client"
import { Button, Input, Label, TextField } from "@heroui/react"

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
        <form data-testid="invoice-form" onSubmit={handleSubmit(onValid)}>
            <Input data-testid="customer" placeholder="Customer" {...register("customer")} />
            {errors.customer && <p data-testid="customer-error">{errors.customer.message}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Qty</th>
                        <th>Unit price</th>
                        <th />
                    </tr>
                </thead>
                <tbody data-testid="items-body">
                    {fields.map((field, index) => (
                        <tr key={field.id} data-testid={`row-${index}`}>
                            <td>
                                <Input
                                    data-testid={`desc-${index}`}
                                    {...register(`items.${index}.description`)}
                                />
                            </td>
                            <td>
                                <Input
                                    data-testid={`qty-${index}`}
                                    type="number"
                                    {...register(`items.${index}.quantity`)}
                                />
                            </td>
                            <td>
                                <Input
                                    data-testid={`price-${index}`}
                                    type="number"
                                    {...register(`items.${index}.unitPrice`)}
                                />
                            </td>
                            <td>
                                <Button
                                    type="button"
                                    data-testid={`remove-${index}`}
                                    onClick={() => remove(index)}
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
                onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })}
            >
                Add row
            </Button>

            {errors.items && typeof errors.items.message === "string" && (
                <p data-testid="items-error">{errors.items.message}</p>
            )}

            <Button data-testid="submit" isDisabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            {result !== null && (
                <p data-testid="success">Created invoice #{result.id} total={result.total}</p>
            )}
        </form>
    )
}
