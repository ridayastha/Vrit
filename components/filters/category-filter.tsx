"use client"

import { capitalize } from "@/lib/format"

interface CategoryFilterProps {
  categories: string[]
  selected: string | null
  onChange: (category: string | null) => void
}

export function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full min-w-0">
      <label
        htmlFor="category-select"
        className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
      >
        Category
      </label>
      <select
        id="category-select"
        value={selected ?? ""}
        onChange={(e) => {
          const value = e.target.value
          onChange(value === "" ? null : value)
        }}
        className="h-10 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950 dark:border-zinc-800 dark:text-zinc-100 dark:focus:ring-zinc-300"
      >
        <option value="" className="bg-white dark:bg-zinc-950">
          All Categories
        </option>
        {categories.map((category) => (
          <option
            key={category}
            value={category}
            className="bg-white dark:bg-zinc-950"
          >
            {capitalize(category)}
          </option>
        ))}
      </select>
    </div>
  )
}