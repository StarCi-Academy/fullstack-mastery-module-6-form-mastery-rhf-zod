import { InvoiceForm } from "@/components"

/**
 * Trang chủ — render InvoiceForm.
 * (EN: Home page — renders InvoiceForm.)
 */
export default function HomePage(): JSX.Element {
    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-background">
            <div className="w-full max-w-2xl">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Invoice</h1>
                    <p className="mt-2 text-sm text-default-500">
                        Dynamic line items with useFieldArray
                    </p>
                </div>
                <InvoiceForm />
            </div>
        </main>
    )
}
