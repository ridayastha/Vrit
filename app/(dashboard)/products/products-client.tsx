"use client"

import { useMemo, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import type { Product, SortOrder } from "@/lib/api/types"
import { ProductGrid } from "@/components/product-grid"
import { Pagination } from "@/components/pagination"
import { SearchBar } from "@/components/filters/search-bar"
import { PriceRangeFilter } from "@/components/filters/price-range-filter"
import { SortSelect } from "@/components/filters/sort-select"
import { ProductGridSkeleton } from "@/components/loading-states"
import { CategoryFilter } from "@/components/filters/category-filter"

// const PAGE_SIZE = 10
const PAGE_SIZE = 4

interface ProductsClientProps {
  initialProducts: Product[]
  categories: string[]
  initialSort: SortOrder
}

export function ProductsClient({ initialProducts, categories, initialSort }: ProductsClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Client-side filter state
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string | null>(null)

  const priceBounds = useMemo<[number, number]>(() => {
    if (initialProducts.length === 0) return [0, 1000]
    const prices = initialProducts.map((p) => p.price)
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))]
  }, [initialProducts])

  const [priceRange, setPriceRange] = useState<[number, number]>(priceBounds)
  const [page, setPage] = useState(1)

  function handleSortChange(sort: SortOrder) {
    startTransition(() => {
      router.push(`/products?sort=${sort}`)
    })
    setPage(1)
  }

  const filtered = useMemo(() => {
    return initialProducts.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category ? product.category === category : true
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [initialProducts, search, category, priceRange])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function resetToFirstPage() {
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Filter Bar */}
      <div className="grid grid-cols-1 gap-4 border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 sm:grid-cols-2 lg:grid-cols-4 items-end">
        {/* Search */}
        <SearchBar
          value={search}
          onChange={(v) => {
            setSearch(v)
            resetToFirstPage()
          }}
        />

        {/* Category Dropdown */}
        <CategoryFilter
  categories={categories}
  selected={category}
  onChange={(c) => {
    setCategory(c)
    resetToFirstPage()
  }}
/>

        {/* Sort Select */}
        <SortSelect value={initialSort} onChange={handleSortChange} />

        {/* Price Range Filter */}
        <PriceRangeFilter
          min={priceBounds[0]}
          max={priceBounds[1]}
          value={priceRange}
          onChange={(r) => {
            setPriceRange(r)
            resetToFirstPage()
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="w-full">
        {isPending ? (
          <ProductGridSkeleton />
        ) : (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              Showing {pageItems.length} of {filtered.length} filtered products
            </p>
            <ProductGrid products={pageItems} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  )
}