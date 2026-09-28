"use client"

import { RiErrorWarningLine } from "@remixicon/react"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-6 py-12 text-center">
      <RiErrorWarningLine className="size-10 text-destructive" />
      <h3 className="text-base font-semibold text-destructive">{title}</h3>
      <p className="max-w-sm text-sm text-destructive/80">{message}</p>
      {onRetry && (
        <Button variant="destructive" size="sm" onClick={onRetry} className="mt-2">
          Try again
        </Button>
      )}
    </div>
  )
}
