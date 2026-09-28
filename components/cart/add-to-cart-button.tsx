"use client"

import { useState } from "react"
import { RiSubtractLine, RiAddLine } from "@remixicon/react"

import type { Product } from "@/lib/api/types"
import { useCartStore } from "@/lib/store/cart-store"
import { Button } from "@/components/ui/button"

interface AddToCartButtonProps {
  product: Product
  compact?: boolean
}

export function AddToCartButton({
  product,
  compact = false,
}: AddToCartButtonProps) {
  // Get the addItem function from our cart store.
  const addItem = useCartStore((state) => state.addItem)

  // Quantity selected by the user.
  const [quantity, setQuantity] = useState(1)

  // Used to temporarily change the button text after adding an item.
  const [justAdded, setJustAdded] = useState(false)

  /**
   * Add the product to the cart.
   */
  function handleAdd(event: React.MouseEvent<HTMLButtonElement>) {
    // Prevent the click from triggering the parent Link.
    event.preventDefault()
    event.stopPropagation()

    // Add the selected product and quantity to the cart.
    addItem(product, quantity)

    // Show "Added to cart" temporarily.
    setJustAdded(true)

    // Change the button back after 1.5 seconds.
    setTimeout(() => {
      setJustAdded(false)
    }, 1500)
  }

  if (compact) {
    return (
      <Button
        type="button"
        size="sm"
        onClick={handleAdd}
        className="w-full rounded-none !text-white"
      >
        {justAdded ? "Added ✓" : "Add to cart"}
      </Button>
    )
  }
  return (
    <div className="flex items-center gap-3">
      {/* Quantity selector */}
      <div className="flex items-center border border-zinc-300 dark:border-zinc-700">
        {/* Decrease quantity */}
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()

            setQuantity((currentQuantity) =>
              Math.max(1, currentQuantity - 1)
            )
          }}
          className="p-2.5 text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
          aria-label="Decrease quantity"
        >
          <RiSubtractLine className="size-4" />
        </button>

        {/* Current quantity */}
        <span className="min-w-[2.5rem] text-center text-sm font-medium">
          {quantity}
        </span>

        {/* Increase quantity */}
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()

            setQuantity((currentQuantity) => currentQuantity + 1)
          }}
          className="p-2.5 text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
          aria-label="Increase quantity"
        >
          <RiAddLine className="size-4" />
        </button>
      </div>

      {/* Add to cart */}
      <Button
        type="button"
        onClick={handleAdd}
        className="h-10 flex-1 rounded-none !text-white"
      >
        {justAdded ? "Added to cart ✓" : "Add to cart"}
      </Button>
    </div>
  )
}
