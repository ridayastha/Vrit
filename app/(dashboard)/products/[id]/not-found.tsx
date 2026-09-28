import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center gap-3 p-4 py-24 text-center sm:p-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Product not found</h1>
      <p className="text-muted-foreground">
        We couldn&apos;t find a product with that ID. It may have been removed.
      </p>
      <Button asChild className="mt-2">
        <Link href="/products">Back to all products</Link>
      </Button>
    </div>
  )
}