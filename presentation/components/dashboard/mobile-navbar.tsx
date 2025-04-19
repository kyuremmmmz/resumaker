"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { FileText, Home, Settings, PlusCircle, User, LogOut, HelpCircle, BarChart3, Menu } from "lucide-react"
import { ThemeToggle } from "@/presentation/components/theme-toggle"

const sidebarLinks = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "My Resumes", href: "/resumes", icon: FileText },
  { name: "Templates", href: "/templates", icon: FileText },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Account", href: "/account", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
]

export function MobileNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">ResuMaker</h1>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col h-full">
                <div className="p-6">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-8 w-8 text-primary" />
                    <h1 className="text-2xl font-bold">ResuMaker</h1>
                  </div>
                </div>

                <div className="px-4 mb-6">
                  <Button className="w-full justify-start gap-2" onClick={() => setOpen(false)}>
                    <PlusCircle className="h-4 w-4" />
                    Create New Resume
                  </Button>
                </div>

                <div className="flex-1 px-4">
                  <nav className="space-y-1">
                    {sidebarLinks.map((link) => {
                      const Icon = link.icon
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={cn(
                            "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                            pathname === link.href
                              ? "bg-gray-100 dark:bg-gray-700 text-primary"
                              : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700",
                          )}
                          onClick={() => setOpen(false)}
                        >
                          <Icon className="mr-3 h-5 w-5" />
                          {link.name}
                        </Link>
                      )
                    })}
                  </nav>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700 w-full">
                    <LogOut className="mr-3 h-5 w-5" />
                    Log out
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
