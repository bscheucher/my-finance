"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { AddTransactionDialog } from "./add-transaction-dialog"

export function TransactionsHeader() {
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">View and manage your transactions.</p>
      </div>
      <Button onClick={() => setShowAddDialog(true)}>
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Transaction
      </Button>
      <AddTransactionDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}

