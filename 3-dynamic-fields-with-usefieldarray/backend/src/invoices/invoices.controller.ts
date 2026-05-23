import { Body, Controller, HttpCode, Logger, Post } from "@nestjs/common"
import { InvoicesService, type InvoicePayload } from "./invoices.service"

/**
 * InvoicesController — POST /invoices nhận payload, trả id+total.
 * (EN: InvoicesController — POST /invoices accepts payload, returns id+total.)
 */
@Controller("invoices")
export class InvoicesController {
    private readonly logger = new Logger(InvoicesController.name)

    constructor(private readonly invoicesService: InvoicesService) {}

    @Post()
    @HttpCode(201)
    submit(@Body() body: InvoicePayload): { id: number; total: number } {
        this.logger.log(`POST /invoices items=${body.items.length}`)
        return this.invoicesService.save(body)
    }
}
