"use client"

import { formatPrice } from "@/lib/format"
import { useCartStore } from "@/lib/store/cart-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CartSummary() {
  const totalItems = useCartStore((state) => state.totalItems())
  const totalPrice = useCartStore((state) => state.totalPrice())
  const clearCart = useCartStore((state) => state.clearCart)

  const shipping = totalPrice > 0 && totalPrice < 50 ? 5.99 : 0
  const grandTotal = totalPrice + shipping

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-base">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Items ({totalItems})</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between border-t border-zinc-200 pt-3 text-base font-semibold dark:border-zinc-800">
          <span>Total</span>
          <span>{formatPrice(grandTotal)}</span>
        </div>

        <Button disabled={totalItems === 0} className="h-11 text-white">
          Checkout
        </Button>

        {totalItems > 0 && (
          <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive">
            Clear cart
          </button>
        )}
      </CardContent>
    </Card>
  )
}