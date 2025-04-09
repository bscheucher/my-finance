import type { Metadata } from "next"
import { TransactionsTable } from "@/components/transactions-table"
import { TransactionsHeader } from "@/components/transactions-header"

export const metadata: Metadata = {
  title: "Transactions",
  description: "View and manage your transactions.",
}

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-4">
      <TransactionsHeader />
      <TransactionsTable />
    </div>
  )
}

