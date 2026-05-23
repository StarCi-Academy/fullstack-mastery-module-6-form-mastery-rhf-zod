import { Injectable } from "@nestjs/common"

/**
 * Payload tổng của wizard 3 bước (EN: Combined payload of the 3-step wizard).
 */
export interface WizardPayload {
    account: { email: string; password: string }
    profile: { fullName: string; age: number }
    preferences: { newsletter: boolean; theme: "light" | "dark" }
}

/**
 * UsersService — lưu in-memory payload đã hoàn thiện wizard.
 * (EN: UsersService — stores completed wizard payloads in memory.)
 */
@Injectable()
export class UsersService {
    private nextId = 1
    private readonly records: Array<{ id: number; payload: WizardPayload }> = []

    /**
     * Lưu payload và trả về id (EN: Save payload and return generated id).
     */
    save(payload: WizardPayload): number {
        const id = this.nextId++
        this.records.push({ id, payload })
        return id
    }
}
