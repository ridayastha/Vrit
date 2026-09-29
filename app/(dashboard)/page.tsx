import type { Metadata } from "next"
import Link from "next/link"
import { RiShoppingBag3Line, RiPriceTag3Line, RiStarFill, RiArrowRightLine } from "@remixicon/react"
import { getProducts, getCategories } from "@/lib/api/products"
import { ApiError } from "@/lib/api/types"
import { formatPrice } from "@/lib/format"
import { StatCard } from "@/components/stat-card"
import { ErrorMessage } from "@/components/error-message"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Welcome to Vrit Ecommerce Dashboard",
}

export default async function Dashboard() {
  try {
    const [products, categories] = await Promise.all([getProducts(), getCategories()])

    const avgPrice =
      products.length > 0 ? products.reduce((sum, p) => sum + p.price, 0) / products.length : 0

    return (
      <div className="p-4 sm:p-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mb-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Welcome to Vrit Ecommerce Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              A quick overview of your catalog. Browse the full product list to filter, sort, and
              manage your cart.
            </p>
          </div>
          <Button asChild className="!text-white">
            <Link href="/products">
              Browse products
              <RiArrowRightLine className="ml-1.5 size-4" />
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Total Products"
            value={String(products.length)}
            icon={<RiShoppingBag3Line className="size-5" />}
          />
          <StatCard
            label="Categories"
            value={String(categories.length)}
            icon={<RiPriceTag3Line className="size-5" />}
          />
          <StatCard
            label="Average Price"
            value={formatPrice(avgPrice)}
            icon={<RiStarFill className="size-5" />}
          />
        </div>
      </div>
    )
  } catch (err) {
    const message =
      err instanceof ApiError
        ? `Failed to load dashboard data (status ${err.status}). Please try again shortly.`
        : "Something unexpected happened while loading the dashboard."
    return (
      <div className="p-4 sm:p-6">
        <ErrorMessage title="Couldn't load dashboard" message={message} />
      </div>
    )
  }
}