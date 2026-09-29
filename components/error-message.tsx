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
    <div className="flex flex-col items-center justify-center gap-3 border border-zinc-200 bg-white px-6 py-12 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <RiErrorWarningLine className="size-10 text-destructive" />
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="destructive" size="sm" onClick={onRetry} className="mt-2 !text-white">
          Try again
        </Button>
      )}
    </div>
  )
}