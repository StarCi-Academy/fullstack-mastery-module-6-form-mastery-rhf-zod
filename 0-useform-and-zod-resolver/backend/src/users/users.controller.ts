import { Body, Controller, HttpCode, Logger, Post } from "@nestjs/common"
import { UsersService, type User } from "./users.service"

/**
 * Payload nhận từ Next.js — chỉ shape tối thiểu để stub.
 * (EN: Payload from Next.js — minimal shape for stub validation.)
 */
interface SignupBody {
    email: string
    password: string
}

/**
 * UsersController — POST /users tạo user mới và echo lại id+email.
 * (EN: UsersController — POST /users creates a user and echoes id+email back.)
 */
@Controller("users")
export class UsersController {
    private readonly logger = new Logger(UsersController.name)

    constructor(private readonly usersService: UsersService) {}

    /**
     * Tạo user mới; trả 201 với id + email.
     * (EN: Create a new user; returns 201 with id + email.)
     */
    @Post()
    @HttpCode(201)
    create(@Body() body: SignupBody): User {
        this.logger.log(`POST /users email=${body.email}`)
        return this.usersService.create(body.email)
    }
}
