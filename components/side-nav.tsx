"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, CreditCard, DollarSign, Home, PiggyBank, Settings, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: CreditCard,
  },
  {
    title: "Income",
    href: "/income",
    icon: DollarSign,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: PiggyBank,
  },
  {
    title: "Budgets",
    href: "/budgets",
    icon: Target,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2 p-4">
        <nav className="grid gap-1 px-2 text-sm font-medium">
          {navItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Button
                key={index}
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="justify-start"
              >
                <Link href={item.href}>
                  <Icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

