import { ApiError, Product, Category } from "./types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://fakestoreapi.com"
const DEFAULT_TIMEOUT_MS = 10_000

// Fallback data used when FakeStoreAPI is down (Status 523 / Origin Unreachable)
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    description: "Your everyday pack for essentials. Padded back panel and shoulder straps.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fit style, contrast raglan long sleeve, three-button henley placket.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 }
  }
];

const MOCK_CATEGORIES: Category[] = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
];

type NextFetchRequestConfig = {
  revalidate?: number | false
  tags?: string[]
}

export interface ApiClientOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined>
  body?: unknown
  timeoutMs?: number
  next?: NextFetchRequestConfig
  cache?: RequestCache
}

function buildUrl(path: string, params?: ApiClientOptions["params"]): string {
  const url = new URL(path.startsWith("http") ? path : `${BASE_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value))
      }
    })
  }
  return url.toString()
}

/**
 * Fallback helper when FakeStoreAPI is unreachable (e.g. status 523/5xx or network errors)
 */
function handleFallback<T>(path: string): T {
  console.warn(`[API Fallback] API unreachable for path: "${path}". Serving mock data.`);
  if (path.includes("/categories")) {
    return MOCK_CATEGORIES as unknown as T
  }
  if (path.startsWith("/products/")) {
    const id = Number(path.split("/")[2])
    const found = MOCK_PRODUCTS.find((p) => p.id === id) ?? MOCK_PRODUCTS[0]
    return found as unknown as T
  }
  return MOCK_PRODUCTS as unknown as T
}

export async function apiFetch<T>(path: string, options: ApiClientOptions = {}): Promise<T> {
  const { params, body, timeoutMs = DEFAULT_TIMEOUT_MS, headers, next, cache, ...rest } = options

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  const url = buildUrl(path, params)

  try {
    const response = await fetch(url, {
      ...rest,
      cache,
      next,
      headers: { "Content-Type": "application/json", ...headers },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })

    if (!response.ok) {
      // If server returns 5xx (e.g., 523 Origin Unreachable), trigger fallback
      if (response.status >= 500) {
        return handleFallback<T>(path)
      }

      let info: unknown
      try {
        info = await response.json()
      } catch {
        info = await response.text().catch(() => undefined)
      }
      throw new ApiError(`Request to ${path} failed with status ${response.status}`, response.status, info)
    }

    const text = await response.text()
    if (!text) return undefined as T
    return JSON.parse(text) as T
  } catch (err) {
    if (err instanceof ApiError) throw err
    // Catch timeouts or network errors and fall back gracefully
    return handleFallback<T>(path)
  } finally {
    clearTimeout(timeout)
  }
}