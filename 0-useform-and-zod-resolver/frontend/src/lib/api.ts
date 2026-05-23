import type { SignupInput } from "./schemas"

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3000"

/**
 * Kiểu response khi đăng ký thành công (EN: Response type after successful signup).
 */
export interface SignupResponse {
    id: number
    email: string
}

/**
 * Gửi payload signup tới NestJS stub; throw nếu HTTP không OK.
 * (EN: POST signup payload to NestJS stub; throws if HTTP is not OK.)
 */
export async function signup(data: SignupInput): Promise<SignupResponse> {
    const res = await fetch(`${BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
    }
    return (await res.json()) as SignupResponse
}
