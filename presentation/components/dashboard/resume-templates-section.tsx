import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

const templates = [
  {
    id: 1,
    name: "Professional",
    description: "Clean and modern design for corporate roles",
    image: "/placeholder.svg?height=120&width=200",
    isPremium: false,
  },
  {
    id: 2,
    name: "Creative",
    description: "Stylish design for creative industries",
    image: "/placeholder.svg?height=120&width=200",
    isPremium: true,
  },
  {
    id: 3,
    name: "Minimalist",
    description: "Simple and elegant for any profession",
    image: "/placeholder.svg?height=120&width=200",
    isPremium: false,
  },
  {
    id: 4,
    name: "Executive",
    description: "Sophisticated design for senior positions",
    image: "/placeholder.svg?height=120&width=200",
    isPremium: true,
  },
  {
    id: 5,
    name: "Technical",
    description: "Focused on skills and technical expertise",
    image: "/placeholder.svg?height=120&width=200",
    isPremium: false,
  },
  {
    id: 6,
    name: "Modern",
    description: "Contemporary design with unique layout",
    image: "/placeholder.svg?height=120&width=200",
    isPremium: true,
  },
]

export function ResumeTemplatesSection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Resume Templates</CardTitle>
          <CardDescription>Choose from our collection of professional templates</CardDescription>
        </div>
        <Button variant="outline" className="gap-1">
          View All Templates <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="resume-card group relative overflow-hidden rounded-lg border bg-white dark:bg-gray-800"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{template.name}</h3>
                  {template.isPremium && <Badge variant="secondary">Premium</Badge>}
                </div>
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
