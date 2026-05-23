import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { UsersModule } from "./users"

/**
 * Module gốc — UsersModule nhận payload wizard hoàn chỉnh.
 * (EN: Root module — UsersModule accepts the complete wizard payload.)
 */
@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule],
})
export class AppModule {}
