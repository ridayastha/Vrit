"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SidebarTrigger } from "./ui/sidebar"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { RiSearchLine, RiNotification3Line, RiShoppingCartLine } from "@remixicon/react"
import { Button } from "./ui/button"
import { useCartStore } from "@/lib/store/cart-store"

export default function Header() {
  const totalItems = useCartStore((state) => state.totalItems())
  // Avoid hydration mismatch: cart count comes from localStorage, which
  // isn't available on the server render.
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => setHasMounted(true), [])

  return (
    <header className="sticky top-0 left-0 border-b bg-background z-50">
      <div className="flex justify-between items-center px-4 py-2 gap-6">
        {/* wrapper */}
        <div className="flex items-center gap-1">
          <SidebarTrigger />
          <h1 className=""></h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
        
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <RiNotification3Line className="size-5" />
          </Button>

          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <RiShoppingCartLine className="size-5" />
            </Button>
            {hasMounted && totalItems > 0 && (
              <span className="absolute rounded-xs -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-destructive text-white text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}