import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

/**
 * Bootstrap NestJS stub trên cổng 3000, bật CORS cho Next.js (3001).
 * (EN: Bootstrap NestJS stub on port 3000 with CORS enabled for Next.js [3001].)
 */
async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    app.enableCors({ origin: "http://localhost:3001" })
    await app.listen(3000)
}

bootstrap()
