"use client"

interface PriceRangeFilterProps {
  min: number
  max: number
  value: [number, number]
  onChange: (range: [number, number]) => void
}

export function PriceRangeFilter({
  min,
  max,
  value,
  onChange,
}: PriceRangeFilterProps) {
  const [low, high] = value

  return (
    <div className="flex w-full min-w-0 flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Price Range $
      </label>

      <div className="flex w-full items-center gap-2">
        {/* Minimum Price */}
        <input
          type="number"
          min={min}
          max={high}
          placeholder="Min"
          value={low === min ? "" : low}
          onChange={(e) => {
            const newLow =
              e.target.value === "" ? min : Number(e.target.value)

            onChange([newLow, high])
          }}
          className="h-10 min-w-0 flex-1 rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-950 dark:border-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-300"
          aria-label="Minimum price"
        />

        <span
          className="shrink-0 text-sm text-zinc-400"
          aria-hidden="true"
        >
          –
        </span>

        {/* Maximum Price */}
        <input
          type="number"
          min={low}
          max={max}
          placeholder="Max"
          value={high === max ? "" : high}
          onChange={(e) => {
            const newHigh =
              e.target.value === "" ? max : Number(e.target.value)

            onChange([low, newHigh])
          }}
          className="h-10 min-w-0 flex-1 rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-950 dark:border-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-300"
          aria-label="Maximum price"
        />
      </div>
    </div>
  )
}