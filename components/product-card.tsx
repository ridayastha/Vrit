import Image from "next/image"
import Link from "next/link"
import { RiStarFill, RiStarLine } from "@remixicon/react"
import type { Product } from "@/lib/api/types"
import { formatPrice, capitalize } from "@/lib/format"
import { Card, CardContent } from "@/components/ui/card"
import { AddToCartButton } from "@/components/cart/add-to-cart-button"

export function ProductCard({ product }: { product: Product }) {
  const rounded = Math.round(product.rating.rate)

  return (
    <Card className="group flex h-full flex-col overflow-hidden py-0 gap-0">
      <Link href={`/products/${product.id}`} className="block">
        {/* Image */}
        <div className="relative flex h-44 items-center justify-center bg-zinc-50 dark:bg-zinc-900">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
            className="object-contain p-6 transition group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <CardContent className="flex min-h-[190px] flex-col gap-2 p-4">
          {/* Category */}
          <span className="w-fit rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {capitalize(product.category)}
          </span>

          {/* Title */}
          <h3 className="line-clamp-2 min-h-[40px] text-sm font-medium leading-5 text-zinc-900 dark:text-zinc-50">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) =>
              i < rounded ? (
                <RiStarFill
                  key={i}
                  className="size-3.5 text-amber-400"
                />
              ) : (
                <RiStarLine
                  key={i}
                  className="size-3.5 text-zinc-300 dark:text-zinc-700"
                />
              )
            )}

            <span className="ml-1 text-xs text-zinc-500">
              ({product.rating.count})
            </span>
          </div>

          {/* Price */}
          <p className="mt-auto pt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            {formatPrice(product.price)}
          </p>
        </CardContent>
      </Link>

      {/* Cart */}
      <div className="mt-auto border-t border-zinc-100 p-3 dark:border-zinc-800">
        <AddToCartButton product={product} compact />
      </div>
    </Card>
  )
}