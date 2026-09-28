// ---------- Fake Store API domain types ----------

export interface ProductRating {
  rate: number
  count: number
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: ProductRating
}

export type Category = string

export type SortOrder = "asc" | "desc"

export interface GetProductsParams {
  sort?: SortOrder
  limit?: number
}

export interface CartItem {
  product: Product
  quantity: number
}

/**
 * Normalized error thrown by the API client for any failed request
 * (network failure, non-2xx response, JSON parse failure, timeout).
 */
export class ApiError extends Error {
  status: number
  info?: unknown

  constructor(message: string, status: number, info?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.info = info
  }
}
