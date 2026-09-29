import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { RiArrowLeftLine, RiStarFill, RiStarLine } from "@remixicon/react"
import { getProduct, getProducts } from "@/lib/api/products"
import { ApiError } from "@/lib/api/types"
import { formatPrice, capitalize } from "@/lib/format"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { ErrorMessage } from "@/components/error-message"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const product = await getProduct(id)
    return {
      title: product.title,
      description: product.description.slice(0, 160),
    }
  } catch {
    return { title: "Product" }
  }
}

// Add generateStaticParams for static export support
export async function generateStaticParams() {
  try {
    const products = await getProducts()
    return products.map((product) => ({
      id: String(product.id),
    }))
  } catch {
    // If fetching fails during build, pre-render fallback IDs 1 through 5
    return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }]
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params

  let product
  try {
    product = await getProduct(id)
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound()
    }
    return (
      <div className="p-4 sm:p-6">
        <ErrorMessage
          title="Couldn't load this product"
          message="Something went wrong while fetching this product. Please try again."
        />
      </div>
    )
  }

  if (!product) notFound()

  const rounded = Math.round(product.rating.rate)

  return (
    <div className="p-4 sm:p-6">
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-50"
      >
        <RiArrowLeftLine className="size-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative flex h-96 items-center justify-center rounded border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 90vw, 45vw"
            className="object-contain p-8"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="w-fit rounded bg-zinc-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {capitalize(product.category)}
          </span>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{product.title}</h1>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) =>
              i < rounded ? (
                <RiStarFill key={i} className="size-4 text-amber-400" />
              ) : (
                <RiStarLine key={i} className="size-4 text-zinc-300 dark:text-zinc-700" />
              )
            )}
            <span className="ml-1 text-xs text-muted-foreground">({product.rating.count})</span>
          </div>
          <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{formatPrice(product.price)}</p>
          <p className="leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}