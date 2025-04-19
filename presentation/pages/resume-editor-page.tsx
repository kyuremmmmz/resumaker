"use client"

import { useState } from "react"
import { DashboardLayout } from "@/presentation/layouts/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronLeft,
  Save,
  Download,
  Eye,
  Settings,
  Plus,
  Trash,
  MoveUp,
  MoveDown,
  Copy,
  MoreHorizontal,
  Search,
  ZoomIn,
  ZoomOut,
  Undo,
  Redo,
  Bell,
  User,
} from "lucide-react"

interface ResumeEditorPageProps {
  resumeId: string
}

interface DashboardHeaderProps {
  title?: string
  description?: string
}

const MobileNavbar = () => {
  return <div>Mobile Navbar</div>
}

export function ResumeEditorPage({ resumeId }: ResumeEditorPageProps) {
  const [previewZoomed, setPreviewZoomed] = useState(false)

  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen">
        {/* Editor Header */}
        <div className="border-b bg-white dark:bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="/resumes">
                <ChevronLeft className="h-5 w-5" />
              </a>
            </Button>
            <div>
              <Input
                defaultValue="Software Developer Resume"
                className="h-9 font-medium border-none text-lg focus-visible:ring-0 focus-visible:ring-offset-0 px-2 w-auto"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1">
              <Undo className="h-4 w-4" />
              <span className="hidden md:inline">Undo</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <Redo className="h-4 w-4" />
              <span className="hidden md:inline">Redo</span>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button variant="ghost" size="sm" className="gap-1">
              <Save className="h-4 w-4" />
              <span className="hidden md:inline">Save</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <Eye className="h-4 w-4" />
              <span className="hidden md:inline">Preview</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Download</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Settings</span>
            </Button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Sections */}
          <div className="w-64 border-r bg-white dark:bg-gray-800 overflow-y-auto hidden md:block">
            <div className="p-4">
              <h2 className="font-medium mb-2">Resume Sections</h2>
              <div className="space-y-2">
                <div className="border rounded-md p-2 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Contact Information</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <MoveUp className="mr-2 h-4 w-4" />
                          Move Up
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MoveDown className="mr-2 h-4 w-4" />
                          Move Down
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
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

                <div className="border rounded-md p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Professional Summary</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <MoveUp className="mr-2 h-4 w-4" />
                          Move Up
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MoveDown className="mr-2 h-4 w-4" />
                          Move Down
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
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

                <div className="border rounded-md p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Work Experience</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <MoveUp className="mr-2 h-4 w-4" />
                          Move Up
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MoveDown className="mr-2 h-4 w-4" />
                          Move Down
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
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

                <div className="border rounded-md p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Education</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <MoveUp className="mr-2 h-4 w-4" />
                          Move Up
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MoveDown className="mr-2 h-4 w-4" />
                          Move Down
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
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

                <div className="border rounded-md p-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Skills</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <MoveUp className="mr-2 h-4 w-4" />
                          Move Up
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MoveDown className="mr-2 h-4 w-4" />
                          Move Down
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
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
              </div>

              <Button variant="outline" className="w-full mt-4 gap-1">
                <Plus className="h-4 w-4" />
                Add Section
              </Button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Editor Panel */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-medium">Contact Information</h2>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue="Alex Johnson" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" defaultValue="Software Developer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="alex.johnson@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="New York, NY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website/LinkedIn</Label>
                      <Input id="website" defaultValue="linkedin.com/in/alexjohnson" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-medium">Professional Summary</h2>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue="Alex Johnson" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" defaultValue="Software Developer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="alex.johnson@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="New York, NY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website/LinkedIn</Label>
                      <Input id="website" defaultValue="linkedin.com/in/alexjohnson" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-medium">Professional Summary</h2>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary">Summary</Label>
                    <Input
                      id="summary"
                      defaultValue="A highly motivated software developer with 5+ years of experience in developing and maintaining web applications. Proven ability to work independently and as part of a team to deliver high-quality software solutions."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-medium">Work Experience</h2>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input id="jobTitle" defaultValue="Software Developer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="Acme Corp" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="New York, NY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dates">Dates</Label>
                    <Input id="dates" defaultValue="2018 - Present" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      defaultValue="Developed and maintained web applications using React, Node.js, and MongoDB."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-medium">Education</h2>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input id="degree" defaultValue="Bachelor of Science in Computer Science" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Input id="university" defaultValue="New York University" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="New York, NY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dates">Dates</Label>
                    <Input id="dates" defaultValue="2014 - 2018" />
                  </div>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-medium">Skills</h2>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Input id="skills" defaultValue="React, Node.js, MongoDB, JavaScript, HTML, CSS" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview Panel */}
            <div className="w-96 border-l bg-white dark:bg-gray-700 overflow-y-auto hidden md:block">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium">Preview</h2>
                  <Button variant="outline" size="icon" onClick={() => setPreviewZoomed(!previewZoomed)}>
                    {previewZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                  </Button>
                </div>

                <div className={`border rounded-md p-4 ${previewZoomed ? "text-sm" : "text-xs"}`}>
                  <h1 className="text-2xl font-bold mb-2">Alex Johnson</h1>
                  <p className="text-gray-500">Software Developer</p>

                  <h2 className="text-xl font-bold mt-4 mb-2">Contact Information</h2>
                  <p>Email: alex.johnson@example.com</p>
                  <p>Phone: +1 (555) 123-4567</p>
                  <p>Location: New York, NY</p>
                  <p>Website: linkedin.com/in/alexjohnson</p>

                  <h2 className="text-xl font-bold mt-4 mb-2">Professional Summary</h2>
                  <p>
                    A highly motivated software developer with 5+ years of experience in developing and maintaining web
                    applications. Proven ability to work independently and as part of a team to deliver high-quality
                    software solutions.
                  </p>

                  <h2 className="text-xl font-bold mt-4 mb-2">Work Experience</h2>
                  <h3 className="text-lg font-bold">Software Developer</h3>
                  <p className="text-gray-500">Acme Corp, New York, NY</p>
                  <p className="text-gray-500">2018 - Present</p>
                  <p>Developed and maintained web applications using React, Node.js, and MongoDB.</p>

                  <h2 className="text-xl font-bold mt-4 mb-2">Education</h2>
                  <h3 className="text-lg font-bold">Bachelor of Science in Computer Science</h3>
                  <p className="text-gray-500">New York University, New York, NY</p>
                  <p className="text-gray-500">2014 - 2018</p>

                  <h2 className="text-xl font-bold mt-4 mb-2">Skills</h2>
                  <p>React, Node.js, MongoDB, JavaScript, HTML, CSS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export function DashboardHeader({
  title = "Dashboard",
  description = "Here's what's happening with your resumes today.",
}: DashboardHeaderProps) {
  return (
    <>
      <MobileNavbar />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input type="search" placeholder="Search..." className="w-64 pl-8 bg-white dark:bg-gray-800" />
            </div>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold">Welcome back, Alex!</h2>
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </>
  )
}
