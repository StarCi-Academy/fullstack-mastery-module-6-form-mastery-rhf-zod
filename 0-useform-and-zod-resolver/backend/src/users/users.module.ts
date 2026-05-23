import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"

/**
 * UsersModule — đăng ký controller + service in-memory cho L0.
 * (EN: UsersModule — registers controller + in-memory service for L0.)
 */
@Module({
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
