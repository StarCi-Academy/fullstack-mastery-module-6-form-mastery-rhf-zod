const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000"

/**
 * Kết quả check-username (EN: check-username result).
 */
export interface AvailabilityResult {
    available: boolean
}

/**
 * Gọi GET /users/check-username?q=<username>; bắn lỗi nếu HTTP không OK.
 * (EN: Calls GET /users/check-username?q=<username>; throws on non-OK HTTP.)
 */
export async function checkUsername(username: string): Promise<AvailabilityResult> {
    const url = `${BASE}/users/check-username?q=${encodeURIComponent(username)}`
    const res = await fetch(url, { cache: "no-store" })
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
    }
    return (await res.json()) as AvailabilityResult
}
