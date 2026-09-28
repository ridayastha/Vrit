import { ProductGridSkeleton } from "@/components/loading-states"

export default function LoadingProducts() {
  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 h-7 w-40 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
      <ProductGridSkeleton />
    </div>
  )
}
