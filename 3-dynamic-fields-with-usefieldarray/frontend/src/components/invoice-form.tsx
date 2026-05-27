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
        <Card className="w-full max-w-2xl p-6 shadow-medium rounded-large border border-default-200 bg-content1">
            <div className="flex flex-col gap-1 mb-5">
                <h2 className="text-xl font-semibold text-foreground">Create invoice</h2>
                <p className="text-sm text-default-500">
                    Dynamic line items with useFieldArray.
                </p>
            </div>
            <form
                data-testid="invoice-form"
                onSubmit={handleSubmit(onValid)}
                className="flex flex-col gap-4"
            >
                <TextField isInvalid={!!errors.customer}>
                    <Label className="text-sm font-medium text-foreground">Customer</Label>
                    <Input
                        data-testid="customer"
                        placeholder="Bill-to name"
                        {...register("customer")}
                    />
                    {errors.customer ? (
                        <FieldError data-testid="customer-error" className="text-sm text-danger">
                            {errors.customer.message}
                        </FieldError>
                    ) : (
                        <Description className="text-xs text-default-500">
                            Bill-to name on the invoice.
                        </Description>
                    )}
                </TextField>

                <div className="overflow-hidden rounded-medium border border-default-200">
                    <table className="w-full text-sm">
                        <thead className="bg-default-50">
                            <tr>
                                <th className="text-left px-3 py-2 font-medium text-default-700">
                                    Description
                                </th>
                                <th className="text-left px-3 py-2 font-medium text-default-700 w-24">
                                    Qty
                                </th>
                                <th className="text-left px-3 py-2 font-medium text-default-700 w-32">
                                    Unit price
                                </th>
                                <th className="w-24" />
                            </tr>
                        </thead>
                        <tbody data-testid="items-body" className="divide-y divide-default-200">
                            {fields.map((field, index) => (
                                <tr
                                    key={field.id}
                                    data-testid={`row-${index}`}
                                    className="align-top"
                                >
                                    <td className="px-3 py-2">
                                        <TextField isInvalid={!!errors.items?.[index]?.description}>
                                            <Label className="sr-only">Description</Label>
                                            <Input
                                                data-testid={`desc-${index}`}
                                                placeholder="Item description"
                                                {...register(`items.${index}.description`)}
                                            />
                                        </TextField>
                                    </td>
                                    <td className="px-3 py-2">
                                        <TextField isInvalid={!!errors.items?.[index]?.quantity}>
                                            <Label className="sr-only">Quantity</Label>
                                            <Input
                                                data-testid={`qty-${index}`}
                                                type="number"
                                                {...register(`items.${index}.quantity`)}
                                            />
                                        </TextField>
                                    </td>
                                    <td className="px-3 py-2">
                                        <TextField isInvalid={!!errors.items?.[index]?.unitPrice}>
                                            <Label className="sr-only">Unit price</Label>
                                            <Input
                                                data-testid={`price-${index}`}
                                                type="number"
                                                {...register(`items.${index}.unitPrice`)}
                                            />
                                        </TextField>
                                    </td>
                                    <td className="px-3 py-2">
                                        <Button
                                            type="button"
                                            data-testid={`remove-${index}`}
                                            variant="bordered"
                                            color="danger"
                                            size="sm"
                                            onPress={() => remove(index)}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center">
                    <Button
                        type="button"
                        data-testid="add-row"
                        variant="bordered"
                        onPress={() => append({ description: "", quantity: 1, unitPrice: 0 })}
                    >
                        + Add row
                    </Button>

                    <Button
                        type="submit"
                        data-testid="submit"
                        color="primary"
                        isDisabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </div>

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

                {result !== null && (
                    <div
                        data-testid="success"
                        className="rounded-medium border border-success-200 bg-success-50 px-4 py-3 text-sm text-success-700"
                    >
                        Created invoice #{result.id} total={result.total}
                    </div>
                )}
            </form>
        </Card>
    )
}
