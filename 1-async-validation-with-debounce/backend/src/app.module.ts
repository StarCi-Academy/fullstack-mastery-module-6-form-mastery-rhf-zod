import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { UsersModule } from "./users"

/**
 * Module gốc cho L1 — UsersModule cung cấp endpoint check-username.
 * (EN: Root module for L1 — UsersModule provides the check-username endpoint.)
 */
@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), UsersModule],
})
export class AppModule {}
