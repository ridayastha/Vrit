"use client"

import { usePathname } from "next/navigation"

const STATIC_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/products": "Products",
  "/cart": "My Cart",
}

function getTitle(pathname: string): string {
  if (STATIC_TITLES[pathname]) return STATIC_TITLES[pathname]

  // /products/123 -> "Product Details"
  if (/^\/products\/[^/]+$/.test(pathname)) return "Product Details"

  // Fallback: last URL segment, capitalized (e.g. /settings -> "Settings")
  const segments = pathname.split("/").filter(Boolean)
  const last = segments[segments.length - 1]
  if (!last) return "Dashboard"
  return last.charAt(0).toUpperCase() + last.slice(1)
}

export default function HeaderPathname() {
  const pathname = usePathname()
  const title = getTitle(pathname)

  return <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</h1>
}