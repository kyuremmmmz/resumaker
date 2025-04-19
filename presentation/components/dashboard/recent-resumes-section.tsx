import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Download, Eye, MoreHorizontal, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const recentResumes = [
  {
    id: 1,
    name: "Software Developer Resume",
    lastEdited: "2 hours ago",
    status: "Active",
    views: 24,
    downloads: 5,
  },
  {
    id: 2,
    name: "Marketing Manager Resume",
    lastEdited: "Yesterday",
    status: "Active",
    views: 18,
    downloads: 3,
  },
  {
    id: 3,
    name: "UX Designer Resume",
    lastEdited: "3 days ago",
    status: "Draft",
    views: 0,
    downloads: 0,
  },
  {
    id: 4,
    name: "Content Strategist Resume",
    lastEdited: "1 week ago",
    status: "Active",
    views: 42,
    downloads: 8,
  },
  {
    id: 5,
    name: "Mechanical Engineer Resume",
    lastEdited: "2 weeks ago",
    status: "Inactive",
    views: 12,
    downloads: 2,
  },
]

export function RecentResumesSection() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Resumes</CardTitle>
          <CardDescription>Your recently created and edited resumes</CardDescription>
        </div>
        <Button variant="outline">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Last Edited</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Downloads</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentResumes.map((resume) => (
                <TableRow key={resume.id}>
                  <TableCell className="font-medium">{resume.name}</TableCell>
                  <TableCell>{resume.lastEdited}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        resume.status === "Active" ? "default" : resume.status === "Draft" ? "outline" : "secondary"
                      }
                    >
                      {resume.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{resume.views}</TableCell>
                  <TableCell className="text-right">{resume.downloads}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
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
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
