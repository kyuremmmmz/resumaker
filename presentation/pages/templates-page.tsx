"use client"

import { DashboardLayout } from "@/presentation/layouts/dashboard-layout"
import { DashboardHeader } from "@/presentation/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, SortDesc, Crown } from "lucide-react"

const templates = [
  {
    id: 1,
    name: "Professional",
    description: "Clean and modern design for corporate roles",
    image: "/placeholder.svg?height=200&width=150",
    category: "Business",
    isPremium: false,
  },
  {
    id: 2,
    name: "Creative",
    description: "Stylish design for creative industries",
    image: "/placeholder.svg?height=200&width=150",
    category: "Creative",
    isPremium: true,
  },
  {
    id: 3,
    name: "Minimalist",
    description: "Simple and elegant for any profession",
    image: "/placeholder.svg?height=200&width=150",
    category: "Business",
    isPremium: false,
  },
  {
    id: 4,
    name: "Executive",
    description: "Sophisticated design for senior positions",
    image: "/placeholder.svg?height=200&width=150",
    category: "Business",
    isPremium: true,
  },
  {
    id: 5,
    name: "Technical",
    description: "Focused on skills and technical expertise",
    image: "/placeholder.svg?height=200&width=150",
    category: "Technical",
    isPremium: false,
  },
  {
    id: 6,
    name: "Modern",
    description: "Contemporary design with unique layout",
    image: "/placeholder.svg?height=200&width=150",
    category: "Business",
    isPremium: true,
  },
  {
    id: 7,
    name: "Artistic",
    description: "Bold and artistic for creative professionals",
    image: "/placeholder.svg?height=200&width=150",
    category: "Creative",
    isPremium: true,
  },
  {
    id: 8,
    name: "Academic",
    description: "Formal layout for academic and research positions",
    image: "/placeholder.svg?height=200&width=150",
    category: "Education",
    isPremium: false,
  },
  {
    id: 9,
    name: "Medical",
    description: "Specialized for healthcare professionals",
    image: "/placeholder.svg?height=200&width=150",
    category: "Healthcare",
    isPremium: true,
  },
  {
    id: 10,
    name: "Engineering",
    description: "Technical focus for engineering roles",
    image: "/placeholder.svg?height=200&width=150",
    category: "Technical",
    isPremium: false,
  },
  {
    id: 11,
    name: "Student",
    description: "Perfect for recent graduates and students",
    image: "/placeholder.svg?height=200&width=150",
    category: "Education",
    isPremium: false,
  },
  {
    id: 12,
    name: "Startup",
    description: "Modern and dynamic for startup environments",
    image: "/placeholder.svg?height=200&width=150",
    category: "Business",
    isPremium: true,
  },
]

export function TemplatesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 pt-20 md:pt-6">
        <DashboardHeader
          title="Resume Templates"
          description="Browse and select from our collection of professional templates"
        />

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input type="search" placeholder="Search templates..." className="pl-8 bg-white dark:bg-gray-800" />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <SortDesc className="h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="creative">Creative</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {templates.map((template) => (
                <Card key={template.id} className="template-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={template.image || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-60 object-cover"
                      />
                      {template.isPremium && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="gap-1">
                            <Crown className="h-3 w-3" />
                            Premium
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" className="w-full">
                          Use Template
                        </Button>
                        <Button size="sm" variant="outline">
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {["business", "creative", "technical", "education", "healthcare"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {templates
                  .filter((t) => t.category.toLowerCase() === category)
                  .map((template) => (
                    <Card key={template.id} className="template-card overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative">
                          <img
                            src={template.image || "/placeholder.svg"}
                            alt={template.name}
                            className="w-full h-60 object-cover"
                          />
                          {template.isPremium && (
                            <div className="absolute top-2 right-2">
                              <Badge variant="secondary" className="gap-1">
                                <Crown className="h-3 w-3" />
                                Premium
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                          <div className="mt-4 flex gap-2">
                            <Button size="sm" className="w-full">
                              Use Template
                            </Button>
                            <Button size="sm" variant="outline">
                              Preview
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
