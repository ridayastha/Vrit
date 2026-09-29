import type { ReactNode } from "react"

interface StatCardProps {
  label: string
  value: string
  icon: ReactNode
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="flex items-center gap-4 border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
      <span className="flex size-10 shrink-0 items-center justify-center bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
        {icon}
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{value}</p>
      </div>
    </div>
  )
}