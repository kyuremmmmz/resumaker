
import { DashboardLayout } from "@/presentation/layouts/dashboard-layout"
import { DashboardHeader } from "@/presentation/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TabsContent,  } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, Download, Eye, MoreHorizontal, Trash, Search, PlusCircle, Filter, SortDesc } from "lucide-react"
const resumes = [
    {
        id: 1,
        name: "Software Developer Resume",
        lastEdited: "2 hours ago",
        status: "Active",
        views: 24,
        downloads: 5,
        template: "Professional",
        image: "/placeholder.svg?height=160&width=120",
    },
    {
        id: 2,
        name: "Marketing Manager Resume",
        lastEdited: "Yesterday",
        status: "Active",
        views: 18,
        downloads: 3,
        template: "Creative",
        image: "/placeholder.svg?height=160&width=120",
    },
    {
        id: 3,
        name: "UX Designer Resume",
        lastEdited: "3 days ago",
        status: "Draft",
        views: 0,
        downloads: 0,
        template: "Minimalist",
        image: "/placeholder.svg?height=160&width=120",
    },
    {
        id: 4,
        name: "Content Strategist Resume",
        lastEdited: "1 week ago",
        status: "Active",
        views: 42,
        downloads: 8,
        template: "Modern",
        image: "/placeholder.svg?height=160&width=120",
    },
    {
        id: 5,
        name: "Mechanical Engineer Resume",
        lastEdited: "2 weeks ago",
        status: "Inactive",
        views: 12,
        downloads: 2,
        template: "Technical",
        image: "/placeholder.svg?height=160&width=120",
    },
    {
        id: 6,
        name: "Fashion Designer Resume",
        lastEdited: "3 weeks ago",
        status: "Active",
        views: 36,
        downloads: 7,
        template: "Creative",
        image: "/placeholder.svg?height=160&width=120",
    },
    {
        id: 7,
        name: "Nurse Resume",
        lastEdited: "1 month ago",
        status: "Active",
        views: 28,
        downloads: 4,
        template: "Professional",
        image: "/placeholder.svg?height=160&width=120",
    },
    {
        id: 8,
        name: "Graphics Designer Resume",
        lastEdited: "1 month ago",
        status: "Draft",
        views: 0,
        downloads: 0,
        template: "Creative",
        image: "/placeholder.svg?height=160&width=120",
    },
]

function TabsContentgrid() {
  return (
      <div><TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {resumes.map((resume) => (
                  <Card key={resume.id} className="resume-card overflow-hidden">
                      <CardContent className="p-0">
                          <div className="relative">
                              <img
                                  src={resume.image || "/placeholder.svg"}
                                  alt={resume.name}
                                  className="w-full h-40 object-cover"
                              />
                              <div className="absolute top-2 right-2">
                                  <Badge
                                      variant={
                                          resume.status === "Active" ? "default" : resume.status === "Draft" ? "outline" : "secondary"
                                      }
                                  >
                                      {resume.status}
                                  </Badge>
                              </div>
                          </div>
                          <div className="p-4">
                              <h3 className="font-semibold truncate">{resume.name}</h3>
                              <div className="flex justify-between text-sm text-gray-500 mt-1">
                                  <span>{resume.template}</span>
                                  <span>{resume.lastEdited}</span>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500 mt-2">
                                  <span>{resume.views} views</span>
                                  <span>{resume.downloads} downloads</span>
                              </div>
                              <div className="mt-4 flex gap-2">
                                  <Button size="sm" variant="outline" className="w-full">
                                      <Eye className="h-3.5 w-3.5 mr-1" />
                                      Preview
                                  </Button>
                                  <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                          <Button variant="outline" size="icon" className="h-8 w-8">
                                              <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem>
                                              <Edit className="mr-2 h-4 w-4" />
                                              Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                              <Download className="mr-2 h-4 w-4" />
                                              Download
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem className="text-red-600">
                                              <Trash className="mr-2 h-4 w-4" />
                                              Delete
                                          </DropdownMenuItem>
                                      </DropdownMenuContent>
                                  </DropdownMenu>
                              </div>
                          </div>
                      </CardContent>
                  </Card>
              ))}
          </div>
      </TabsContent>
      </div>
  )
}

export default TabsContentgrid