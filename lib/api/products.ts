import { apiFetch } from "./client"
import type { Category, GetProductsParams, Product } from "./types"

/**
 * Fetch all products, optionally sorted server-side via `?sort=asc|desc`.
 * Pagination is handled client-side (Fake Store API has no offset param),
 * so we fetch the full sorted list and slice it in the UI layer.
 */
export async function getProducts(params: GetProductsParams = {}): Promise<Product[]> {
  return apiFetch<Product[]>("/products", {
    params: { sort: params.sort, limit: params.limit },
    next: { revalidate: 60, tags: ["products"] },
  })
}

export async function getProduct(id: number | string): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`, {
    next: { revalidate: 60, tags: ["products", `product-${id}`] },
  })
}

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>("/products/categories", {
    next: { revalidate: 300, tags: ["categories"] },
  })
}