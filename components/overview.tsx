"use client"

import { ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

export function Overview() {
  // This would be fetched from the API in a real application
  const data = [
    {
      name: "Jan",
      income: 2400,
      expenses: 1400,
    },
    {
      name: "Feb",
      income: 1398,
      expenses: 980,
    },
    {
      name: "Mar",
      income: 9800,
      expenses: 2290,
    },
    {
      name: "Apr",
      income: 3908,
      expenses: 2000,
    },
    {
      name: "May",
      income: 4800,
      expenses: 2181,
    },
    {
      name: "Jun",
      income: 3800,
      expenses: 2500,
    },
    {
      name: "Jul",
      income: 4300,
      expenses: 2100,
    },
  ]

  return (
    <ChartContainer
      config={{
        income: {
          label: "Income",
          color: "hsl(var(--chart-1))",
        },
        expenses: {
          label: "Expenses",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

