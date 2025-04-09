"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentTransactions() {
  // This would be fetched from the API in a real application
  const transactions = [
    {
      id: "1",
      amount: 499.99,
      status: "expense",
      description: "Rent Payment",
      date: "2023-04-01",
    },
    {
      id: "2",
      amount: 39.99,
      status: "expense",
      description: "Netflix Subscription",
      date: "2023-04-05",
    },
    {
      id: "3",
      amount: 2500.0,
      status: "income",
      description: "Salary",
      date: "2023-04-15",
    },
    {
      id: "4",
      amount: 99.0,
      status: "expense",
      description: "Grocery Shopping",
      date: "2023-04-18",
    },
    {
      id: "5",
      amount: 49.99,
      status: "expense",
      description: "Gym Membership",
      date: "2023-04-20",
    },
  ]

  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className={transaction.status === "expense" ? "bg-red-100" : "bg-green-100"}>
              {transaction.status === "expense" ? "-" : "+"}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.description}</p>
            <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
          </div>
          <div className="ml-auto font-medium">
            <Badge variant={transaction.status === "expense" ? "destructive" : "default"} className="ml-auto">
              {transaction.status === "expense" ? "-" : "+"}${transaction.amount.toFixed(2)}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

