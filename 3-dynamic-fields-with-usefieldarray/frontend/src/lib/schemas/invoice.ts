import { z } from "zod"

/**
 * Schema cho 1 line item — mô tả + số lượng + đơn giá dương.
 * (EN: Single line-item schema — description + positive quantity + positive unit price.)
 */
export const lineItemSchema = z.object({
    description: z.string().min(1, "Description required"),
    quantity: z.coerce.number().int().min(1, "Quantity must be at least 1"),
    unitPrice: z.coerce.number().nonnegative("Unit price must be ≥ 0"),
})

/**
 * Schema invoice — ít nhất 1 item + tổng tiền dương (refine).
 * (EN: Invoice schema — at least 1 item + positive total enforced via refine.)
 */
export const invoiceSchema = z
    .object({
        customer: z.string().min(1, "Customer required"),
        items: z.array(lineItemSchema).min(1, "At least one item"),
    })
    .refine(
        (data) => data.items.reduce((acc, it) => acc + it.quantity * it.unitPrice, 0) > 0,
        { message: "Total must be greater than 0", path: ["items"] },
    )

export type InvoiceInput = z.infer<typeof invoiceSchema>
