import { Injectable } from "@nestjs/common"

/**
 * UsersService — danh sách username đã chiếm dụng (seeded) + helper kiểm tra.
 * (EN: UsersService — taken username list (seeded) + availability helper.)
 */
@Injectable()
export class UsersService {
    private readonly taken: ReadonlySet<string> = new Set([
        "admin",
        "root",
        "ada",
        "alice",
        "bob",
    ])

    /**
     * Trả về true nếu username CHƯA bị chiếm; mô phỏng latency 200ms.
     * (EN: Returns true if username is NOT taken; simulates 200ms latency.)
     */
    async isAvailable(username: string): Promise<boolean> {
        await new Promise<void>((resolve) => setTimeout(resolve, 200))
        return !this.taken.has(username.toLowerCase())
    }
}
