import type { Metadata } from "next"
import { getCategories, getProducts } from "@/lib/api/products"
import { ApiError } from "@/lib/api/types"
import type { SortOrder } from "@/lib/api/types"
import { ProductsClient } from "./products-client"
import { ErrorMessage } from "@/components/error-message"

export const metadata: Metadata = {
  title: "Products",
  description: "Browse, filter, and sort the product catalog.",
}

interface ProductsPageProps {
  searchParams: Promise<{ sort?: string }>
}

export default async function Products({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const sort: SortOrder = params.sort === "desc" ? "desc" : "asc"

  try {
    // SSR: fetched on the server for every request/navigation.
    const [products, categories] = await Promise.all([
      getProducts({ sort }),
      getCategories(),
    ])

    return (
      <div className="p-4 sm:p-6">
        <h1 className="mb-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Browse Products</h1>
        <p className="mb-6 text-sm text-muted-foreground">{products.length} products available</p>
        <ProductsClient initialProducts={products} categories={categories} initialSort={sort} />
      </div>
    )
  } catch (err) {
    const message =
      err instanceof ApiError
        ? `Failed to load products (status ${err.status}). Please try again shortly.`
        : "Something unexpected happened while loading products."
    return (
      <div className="p-4 sm:p-6">
        <ErrorMessage title="Couldn't load products" message={message} />
      </div>
    )
  }
}
