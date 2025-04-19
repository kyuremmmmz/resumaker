import type React from "react"
import { Sidebar } from "@/presentation/components/dashboard/sidebar"
import { MobileNavbar } from "@/presentation/components/dashboard/mobile-navbar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <MobileNavbar />
      <div className="flex-1 overflow-auto">
        <main>{children}</main>
      </div>
    </div>
  )
}
