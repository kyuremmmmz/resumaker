
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
import { RecentResumesSectionProps, ResumeEditorProps, SoftwareEngineerResume, SoftwareEngineerResumeByFields } from "@/types/postData"
import { redirect } from "next/navigation"

export default function TabsContentgrid({ resumes }: RecentResumesSectionProps) {
  return (
      <div><TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {resumes.map((resume) => (
                  <Card key={resume.id.toString()} className="resume-card overflow-hidden">
                      <CardContent className="p-0">
                          <div className="relative">
                              <img
                                  src={resume.name || "/placeholder.svg"}
                                  alt={resume.name}
                                  className="w-full h-40 object-cover"
                              />
                              <div className="absolute top-2 right-2">
                                  <Badge
                                      variant={
                                          resume.Certification2 === "Active" ? "default" : resume.Certification2 === "Draft" ? "outline" : "secondary"
                                      }
                                  >
                                      {resume.Certification2}
                                  </Badge>
                              </div>
                          </div>
                          <div className="p-4">
                              <h3 className="font-semibold truncate">{resume.name}</h3>
                              <div className="flex justify-between text-sm text-gray-500 mt-1">
                                  <span>{resume.JobTitle}</span>
                                  <span>{resume.Dates}</span>
                              </div>
                              <div className="mt-4 flex gap-2">
                                  <Button onClick={()=> redirect(`/editorput/${resume.id}`)} size="sm" variant="outline" className="w-full">
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

