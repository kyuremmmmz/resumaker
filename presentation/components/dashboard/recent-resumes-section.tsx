import { GetServerSideProps } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Download, Eye, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SoftwareEngineer } from "@/Data/repositories/repositoryImpl";
import { UseCasesRepo } from "@/domain/usecases/useCasesRepo";
import { RecentResumesSectionProps, SoftwareEngineerResume } from "@/types/postData";
import deleteResume from "@/Data/api/deleteResume";

const fetchIt = async (): Promise<SoftwareEngineerResume[]> => {
  try {
    const repo = new SoftwareEngineer();
    const useCase = new UseCasesRepo(repo);
    const data = await useCase.getAllResumes();
    return data ?? [];
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return [];
  }
};


export default function RecentResumesSection({ resumes }: RecentResumesSectionProps) {
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
              {resumes.map((resume) => (
                <TableRow key={resume.id.toString()}>
                  <TableCell className="font-medium">{resume.name}</TableCell>
                  <TableCell>{resume.Date1 || resume.Dates || "Unknown"}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        resume.Certification2 === "Active"
                          ? "default"
                          : resume.Certification2 === "Draft"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {resume.Certification2 || "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{resume.Certification2 || 0}</TableCell>
                  <TableCell className="text-right">{resume.Certification2 || 0}</TableCell>
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
                        <DropdownMenuItem onClick={async () => deleteResume(resume.id) } className="text-red-600">
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
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const resumes = await fetchIt();
  return {
    props: {
      resumes,
    },
  };
};