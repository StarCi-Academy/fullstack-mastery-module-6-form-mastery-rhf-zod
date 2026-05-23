import type { WizardInput } from "./schemas"

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000"

/**
 * POST wizard hoàn chỉnh; trả về id mới tạo.
 * (EN: POST the complete wizard; returns the generated id.)
 */
export async function submitWizard(data: WizardInput): Promise<{ id: number }> {
    const res = await fetch(`${BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
    }
    return (await res.json()) as { id: number }
}
