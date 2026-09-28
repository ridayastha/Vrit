"use client"

import { RiSearchLine } from "@remixicon/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="product-search"
        className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        Search products
      </label>

      <InputGroup className="w-full focus-within:border-zinc-950 focus-within:ring-0 dark:focus-within:border-zinc-300">
  <InputGroupAddon>
    <RiSearchLine className="size-4" />
  </InputGroupAddon>

  <InputGroupInput
    id="product-search"
    type="search"
    placeholder="Search products by name…"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    aria-label="Search products by name"
    className="focus-visible:ring-0 focus-visible:ring-offset-0"
  />
</InputGroup>
    </div>
  )
}