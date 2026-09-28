"use client"

import type { SortOrder } from "@/lib/api/types"

interface SortSelectProps {
  value: SortOrder
  onChange: (value: SortOrder) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full min-w-0">
      <label
        htmlFor="sort-select"
        className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        Sort By Price
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOrder)}
        className="h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:border-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-300"
      >
        <option value="asc" className="bg-white dark:bg-zinc-950">
          Price: Low to High
        </option>
        <option value="desc" className="bg-white dark:bg-zinc-950">
          Price: High to Low
        </option>
      </select>
    </div>
  )
}