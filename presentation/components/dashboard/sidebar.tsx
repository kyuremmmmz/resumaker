"use client"

import { cn } from "@/Core/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/presentation/components/theme-toggle"
import { BarChart3, FileText, HelpCircle, Home, LogOut, PlusCircle, Settings, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import images from "@/public/resumake.png"
const sidebarLinks = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "My Resumes", href: "/resumes", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help & Support", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter();
  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Image src={images} alt={""}/>
        </div>
      </div>

      <div className="px-4 mb-6">
        <Button onClick={()=>router.push('/editor')} className="w-full justify-start gap-2">
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
              >
                <Icon className="mr-3 h-5 w-5" />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Theme</span>
          <ThemeToggle />
        </div>
        
      </div>
    </div>
  )
}
