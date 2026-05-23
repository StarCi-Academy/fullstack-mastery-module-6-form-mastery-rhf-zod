import type { InvoiceInput } from "./schemas"

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000"

/**
 * Kết quả tạo invoice (EN: Create invoice result).
 */
export interface InvoiceResult {
    id: number
    total: number
}

/**
 * POST invoice tới NestJS stub (EN: POST invoice to NestJS stub).
 */
export async function submitInvoice(data: InvoiceInput): Promise<InvoiceResult> {
    const res = await fetch(`${BASE}/invoices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
    }
    return (await res.json()) as InvoiceResult
}
