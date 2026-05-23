import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { InvoicesModule } from "./invoices"

/**
 * Module gốc — InvoicesModule nhận payload invoice với line items.
 * (EN: Root module — InvoicesModule accepts the invoice payload with line items.)
 */
@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), InvoicesModule],
})
export class AppModule {}
