import { Body, Controller, HttpCode, Logger, Post } from "@nestjs/common"
import { UsersService, type WizardPayload } from "./users.service"

/**
 * UsersController — POST /users nhận payload wizard, trả id mới tạo.
 * (EN: UsersController — POST /users accepts wizard payload, returns new id.)
 */
@Controller("users")
export class UsersController {
    private readonly logger = new Logger(UsersController.name)

    constructor(private readonly usersService: UsersService) {}

    /**
     * Submit wizard hoàn chỉnh (EN: Submit the complete wizard payload).
     */
    @Post()
    @HttpCode(201)
    submit(@Body() body: WizardPayload): { id: number } {
        this.logger.log(`POST /users email=${body.account.email}`)
        const id = this.usersService.save(body)
        return { id }
    }
}
