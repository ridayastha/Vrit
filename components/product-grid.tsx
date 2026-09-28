import type { Product } from "@/lib/api/types"
import { ProductCard } from "@/components/product-card"

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 py-16 text-center text-muted-foreground dark:border-zinc-700">
        No products match your filters.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
