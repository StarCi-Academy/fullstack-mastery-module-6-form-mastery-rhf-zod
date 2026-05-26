import { NestFactory } from "@nestjs/core"
import { ConfigService } from "@nestjs/config"
import { AppModule } from "./app.module"

/**
 * Bootstrap NestJS stub — port + CORS origin đọc từ ConfigService (env defaults).
 * (EN: Bootstrap NestJS stub — port + CORS origin read from ConfigService with env defaults.)
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const config = app.get(ConfigService)
    const port = Number(config.get<string>("PORT") ?? "3000")
    const corsOrigin = config.get<string>("CORS_ORIGIN") ?? "http://localhost:3001"
    app.enableCors({ origin: corsOrigin })
    await app.listen(port)
}

bootstrap()
