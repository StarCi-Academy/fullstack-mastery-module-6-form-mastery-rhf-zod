import { Injectable } from "@nestjs/common"

/**
 * Line item của invoice (EN: Invoice line item).
 */
export interface LineItem {
    description: string
    quantity: number
    unitPrice: number
}

/**
 * Payload invoice (EN: Invoice payload).
 */
export interface InvoicePayload {
    customer: string
    items: LineItem[]
}

/**
 * InvoicesService — lưu in-memory + tính tổng.
 * (EN: InvoicesService — keeps in-memory store + computes total.)
 */
@Injectable()
export class InvoicesService {
    private nextId = 1
    private readonly records: Array<{ id: number; total: number; payload: InvoicePayload }> = []

    /**
     * Lưu invoice và trả về id + tổng tiền (EN: Save invoice, return id + total).
     */
    save(payload: InvoicePayload): { id: number; total: number } {
        const total = payload.items.reduce(
            (acc, item) => acc + item.quantity * item.unitPrice,
            0,
        )
        const id = this.nextId++
        this.records.push({ id, total, payload })
        return { id, total }
    }
}
