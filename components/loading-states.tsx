import { cn } from "@/lib/utils"

export function LoadingSpinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
      <div
        className="size-10 animate-spin rounded-full border-4 border-zinc-200 border-t-primary dark:border-zinc-800"
        role="status"
        aria-label={label}
      />
      <p className="text-sm">{label}</p>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "animate-pulse border border-zinc-200 bg-white p-4",
            "dark:border-zinc-800 dark:bg-zinc-950"
          )}
        >
          <div className="mb-4 h-40 w-full rounded-lg bg-zinc-100 dark:bg-zinc-800" />
          <div className="mb-2 h-4 w-3/4 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="mb-2 h-4 w-1/2 rounded bg-zinc-100 dark:bg-zinc-800" />
          <div className="h-4 w-1/4 rounded bg-zinc-100 dark:bg-zinc-800" />
        </div>
      ))}
    </div>
  )
}
