import { Controller, Get, Logger, Query } from "@nestjs/common"
import { UsersService } from "./users.service"

/**
 * Response shape cho check-username (EN: Response shape for check-username).
 */
interface AvailabilityResponse {
    available: boolean
}

/**
 * UsersController — GET /users/check-username?q=<text> trả về availability.
 * (EN: UsersController — GET /users/check-username?q=<text> returns availability.)
 */
@Controller("users")
export class UsersController {
    private readonly logger = new Logger(UsersController.name)

    constructor(private readonly usersService: UsersService) {}

    /**
     * Kiểm tra username; rỗng coi như available để FE bỏ qua.
     * (EN: Check username; empty input is treated as available so FE can ignore.)
     */
    @Get("check-username")
    async check(@Query("q") q?: string): Promise<AvailabilityResponse> {
        const username = (q ?? "").trim()
        this.logger.log(`GET /users/check-username q=${username}`)
        if (username.length === 0) {
            return { available: true }
        }
        const available = await this.usersService.isAvailable(username)
        return { available }
    }
}
