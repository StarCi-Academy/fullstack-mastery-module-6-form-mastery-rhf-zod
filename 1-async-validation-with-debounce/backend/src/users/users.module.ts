import { Module } from "@nestjs/common"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"

/**
 * UsersModule — đăng ký service và controller check-username.
 * (EN: UsersModule — registers service and check-username controller.)
 */
@Module({
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
