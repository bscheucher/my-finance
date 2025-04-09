"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export type Transaction = {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
}

// This would be fetched from the API in a real application
const data: Transaction[] = [
  {
    id: "1",
    description: "Rent Payment",
    amount: 1200.0,
    type: "expense",
    category: "Housing",
    date: "2023-04-01",
  },
  {
    id: "2",
    description: "Salary",
    amount: 5000.0,
    type: "income",
    category: "Salary",
    date: "2023-04-15",
  },
  {
    id: "3",
    description: "Grocery Shopping",
    amount: 150.75,
    type: "expense",
    category: "Food",
    date: "2023-04-05",
  },
  {
    id: "4",
    description: "Freelance Work",
    amount: 800.0,
    type: "income",
    category: "Freelance",
    date: "2023-04-10",
  },
  {
    id: "5",
    description: "Electricity Bill",
    amount: 85.5,
    type: "expense",
    category: "Utilities",
    date: "2023-04-12",
  },
  {
    id: "6",
    description: "Internet Bill",
    amount: 60.0,
    type: "expense",
    category: "Utilities",
    date: "2023-04-14",
  },
  {
    id: "7",
    description: "Restaurant Dinner",
    amount: 75.25,
    type: "expense",
    category: "Dining",
    date: "2023-04-18",
  },
  {
    id: "8",
    description: "Dividend Payment",
    amount: 120.0,
    type: "income",
    category: "Investments",
    date: "2023-04-20",
  },
  {
    id: "9",
    description: "Gas",
    amount: 45.0,
    type: "expense",
    category: "Transportation",
    date: "2023-04-22",
  },
  {
    id: "10",
    description: "Movie Tickets",
    amount: 30.0,
    type: "expense",
    category: "Entertainment",
    date: "2023-04-25",
  },
]

export function TransactionsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as "income" | "expense"
        return (
          <Badge variant={type === "income" ? "default" : "destructive"}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="justify-end w-full"
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
        const type = row.getValue("type") as "income" | "expense"
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)

        return (
          <div className="text-right font-medium">
            {type === "expense" ? "-" : "+"}
            {formatted}
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by description..."
          value={(table.getColumn("description")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("description")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getFilteredRowModel().rows.length} of {data.length} transactions.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}