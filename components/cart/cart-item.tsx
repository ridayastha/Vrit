"use client"

import Image from "next/image"
import Link from "next/link"
import { RiSubtractLine, RiAddLine, RiCloseLine, RiDeleteBin5Line } from "@remixicon/react"
import type { CartItem as CartItemType } from "@/lib/api/types"
import { formatPrice } from "@/lib/format"
import { useCartStore } from "@/lib/store/cart-store"

export function CartItem({ item }: { item: CartItemType }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <div className="flex items-center gap-4 border-b border-zinc-100 py-4 last:border-none dark:border-zinc-800">
      <Link href={`/products/${item.product.id}`} className="relative size-20 shrink-0 rounded-lg bg-zinc-50 p-2 dark:bg-zinc-900">
        <Image src={item.product.image} alt={item.product.title} fill sizes="80px" className="object-contain p-2" />
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={`/products/${item.product.id}`} className="line-clamp-2 text-sm font-medium text-zinc-900 hover:underline dark:text-zinc-50">
          {item.product.title}
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{formatPrice(item.product.price)}</p>
      </div>

      <div className="flex items-center border border-zinc-300 dark:border-zinc-700">
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          className="p-2 text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
          aria-label="Decrease quantity"
        >
          <RiSubtractLine className="size-4" />
        </button>
        <span className="min-w-[2rem] text-center text-sm font-medium">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          className="p-2 text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
          aria-label="Increase quantity"
        >
          <RiAddLine className="size-4" />
        </button>
      </div>

      <p className="w-20 shrink-0 text-right text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {formatPrice(item.product.price * item.quantity)}
      </p>

      <button
        onClick={() => removeItem(item.product.id)}
        aria-label={`Remove ${item.product.title} from cart`}
        className="shrink-0 text-red-400 transition hover:text-destructive"
      >
        <RiDeleteBin5Line className="size-5" />
      </button>
    </div>
  )
}