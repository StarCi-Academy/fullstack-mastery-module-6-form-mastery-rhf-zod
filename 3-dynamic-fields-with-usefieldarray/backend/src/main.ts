import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Bootstrap NestJS stub trên cổng 3000.
 * (EN: Bootstrap NestJS stub on port 3000.)
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const port = Number(process.env.PORT ?? 3000)
    const feOrigin = process.env.FRONTEND_ORIGIN ?? "http://localhost:3001"
    app.enableCors({ origin: feOrigin })
    await app.listen(port)
}

bootstrap()
