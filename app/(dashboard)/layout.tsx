import type React from "react"
import { SideNav } from "@/components/side-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <h1 className="text-xl font-semibold">Finance Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

