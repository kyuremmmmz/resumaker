import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toast } from "@/components/ui/toast"
import { ToastProvider } from "@radix-ui/react-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ResuMaker - Professional Resume Builder",
  description: "Create professional resumes with our easy-to-use builder",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ToastProvider>
          <Toast/>
        </ToastProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  ) 
}
