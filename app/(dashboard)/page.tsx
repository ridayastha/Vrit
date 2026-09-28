import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Welcome to Vrit Ecommerce Dashboard",
}


export default async function Dashboard() {
    return (
      <div className="p-4 sm:p-6">
        <h1 className="mb-1 text-2xl font-bold text-zinc-900 dark:text-zinc-50">Welcome to Vrit Ecommerce Dashboard Assessment</h1>
      </div>
    )
  }
