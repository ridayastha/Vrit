"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useCartStore } from "@/lib/store/cart-store"
import { CartItem } from "@/components/cart/cart-item"
import { CartSummary } from "@/components/cart/cart-summary"
import { LoadingSpinner } from "@/components/loading-states"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  // Avoid hydration mismatch: zustand's persist middleware rehydrates from
  // localStorage only after mount, so we wait for that before rendering.
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(true), [])

  if (!hasMounted) {
    return (
      <div className="p-4 sm:p-6">
        <LoadingSpinner label="Loading your cart…" />
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">My Cart</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 border border-dashed border-zinc-300 py-20 text-center dark:border-zinc-700">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <Button asChild className="!text-white">
            <Link href="/products">Browse products</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 border border-zinc-200 bg-white px-5 dark:border-zinc-800 dark:bg-zinc-950">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
          <div className="lg:w-80 lg:shrink-0">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  )
}