import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Bootstrap NestJS stub — port + CORS origin đọc từ env (PORT + CORS_ORIGIN).
 * (EN: Bootstrap NestJS stub — port + CORS origin read from env (PORT + CORS_ORIGIN).)
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const port = Number(process.env.PORT ?? 3000)
    const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:3001"
    app.enableCors({ origin: corsOrigin })
    await app.listen(port)
}

bootstrap()
