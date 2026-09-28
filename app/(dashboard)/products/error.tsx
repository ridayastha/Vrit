"use client"

import { useEffect } from "react"
import { ErrorMessage } from "@/components/error-message"

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="p-4 sm:p-6">
      <ErrorMessage
        title="Couldn't load products"
        message="An unexpected error occurred while loading the products page."
        onRetry={reset}
      />
    </div>
  )
}
