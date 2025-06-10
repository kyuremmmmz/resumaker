"use client"

import type React from "react"
import type { ChangeEvent } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Upload } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { SoftwareEngineerResume } from "@/types/postData"
import putDataService from "@/Data/api/update"

export interface ResumeEditorPutProps {
  resume: SoftwareEngineerResume
  formData: SoftwareEngineerResume
  setFormData: React.Dispatch<React.SetStateAction<SoftwareEngineerResume>>
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof SoftwareEngineerResume,
  ) => void
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (id:string, resume:SoftwareEngineerResume) => Promise<void>,
  profileImagePreview: string | null,
  id:string,
}

export default function ResumeEditorPut({
  resume,
  formData,
  setFormData,
  handleInputChange,
  handleImageUpload,
  handleSubmit,
  id,
  profileImagePreview,
}: ResumeEditorPutProps) {

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-4">
              <Label htmlFor="profile-image">Profile Image</Label>
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileImagePreview || ""} />
                <AvatarFallback className="bg-gray-400">
                  {formData && formData.name 
                    ? formData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "AJ"}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <Input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  className="w-auto"
                  onChange={handleImageUpload}
                />
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resume Sections */}
      <Accordion type="multiple" defaultValue={["contact"]}>
        {/* Contact Information */}
        <AccordionItem value="contact">
          <AccordionTrigger className="text-xl font-bold px-4">Contact Information</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={formData?.name || ""} onChange={(e) => handleInputChange(e, "name")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="JobTitle">Job Title</Label>
                    <Input
                      id="JobTitle"
                      value={formData?.JobTitle || ""}
                      onChange={(e) => handleInputChange(e, "JobTitle")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={formData?.email || ""} onChange={(e) => handleInputChange(e, "email")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber">Phone</Label>
                    <Input
                      id="contactNumber"
                      value={formData?.contactNumber || ""}
                      onChange={(e) => handleInputChange(e, "contactNumber")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Location</Label>
                    <Input
                      id="address"
                      value={formData?.address ?? ""}
                      onChange={(e) => handleInputChange(e, "address")}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* About Me */}
        <AccordionItem value="about">
          <AccordionTrigger className="text-xl font-bold px-4">About Me</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="aboutMe">About Me</Label>
                    <Textarea
                      id="aboutMe"
                      value={formData?.aboutMe || ""}
                      onChange={(e) => handleInputChange(e, "aboutMe")}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={formData?.github || ""}
                      onChange={(e) => handleInputChange(e, "github")}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedIn">LinkedIn</Label>
                    <Input
                      id="linkedIn"
                      value={formData?.linkedIn || ""}
                      onChange={(e) => handleInputChange(e, "linkedIn")}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Work Experience */}
        <AccordionItem value="experience">
          <AccordionTrigger className="text-xl font-bold px-4">Work Experience</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Current Position</h3>
                  <div className="space-y-2">
                    <Label htmlFor="JobTitle">Job Title</Label>
                    <Input
                      id="JobTitle"
                      value={formData?.JobTitle || ""}
                      onChange={(e) => handleInputChange(e, "JobTitle")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Company">Company</Label>
                    <Input
                      id="Company"
                      value={formData?.Company || ""}
                      onChange={(e) => handleInputChange(e, "Company")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Location</Label>
                    <Input
                      id="address"
                      value={formData?.address || ""}
                      onChange={(e) => handleInputChange(e, "address")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Dates">Dates</Label>
                    <Input id="Dates" value={formData?.Dates || ""} onChange={(e) => handleInputChange(e, "Dates")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Description">Description</Label>
                    <Textarea
                      id="Description"
                      value={formData?.Description || ""}
                      onChange={(e) => handleInputChange(e, "Description")}
                      rows={4}
                    />
                  </div>

                  <h3 className="font-medium mt-6">Previous Position</h3>
                  <div className="space-y-2">
                    <Label htmlFor="PreviousJobTitle">Job Title</Label>
                    <Input
                      id="PreviousJobTitle"
                      value={formData?.PreviousJobTitle || ""}
                      onChange={(e) => handleInputChange(e, "PreviousJobTitle")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="PreviousCompany">Company</Label>
                    <Input
                      id="PreviousCompany"
                      value={formData?.PreviousCompany || ""}
                      onChange={(e) => handleInputChange(e, "PreviousCompany")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="PreviousLocation">Location</Label>
                    <Input
                      id="PreviousLocation"
                      value={formData?.PreviousLocation || ""}
                      onChange={(e) => handleInputChange(e, "PreviousLocation")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="PreviousDates">Dates</Label>
                    <Input
                      id="PreviousDates"
                      value={formData?.Date2 || ""}
                      onChange={(e) => handleInputChange(e, "Date2")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="PreviousDescription">Description</Label>
                    <Textarea
                      id="PreviousDescription"
                      value={formData?.PreviousDescription || ""}
                      onChange={(e) => handleInputChange(e, "PreviousDescription")}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Education */}
        <AccordionItem value="education">
          <AccordionTrigger className="text-xl font-bold px-4">Education</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree</Label>
                    <Input id="degree" value={formData?.degree || ""} onChange={(e) => handleInputChange(e, "degree")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="University">University</Label>
                    <Input
                      id="University"
                      value={formData?.University || ""}
                      onChange={(e) => handleInputChange(e, "University")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="UnivLoc">University Location</Label>
                    <Input
                      id="UnivLoc"
                      value={formData?.UnivLoc || ""}
                      onChange={(e) => handleInputChange(e, "UnivLoc")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="DateEnded">Dates Attended</Label>
                    <Input
                      id="DateEnded"
                      value={formData?.DateEnded || ""}
                      onChange={(e) => handleInputChange(e, "DateEnded")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gpa">GPA</Label>
                    <Input id="gpa" value={formData?.gpa || ""} onChange={(e) => handleInputChange(e, "gpa")} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Certifications */}
        <AccordionItem value="certifications">
          <AccordionTrigger className="text-xl font-bold px-4">Certifications</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="Certification1">Certification 1</Label>
                    <Input
                      id="Certification1"
                      value={formData?.Certification1 || ""}
                      onChange={(e) => handleInputChange(e, "Certification1")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Date1">Date 1</Label>
                    <Input id="Date1" value={formData?.Date1 || ""} onChange={(e) => handleInputChange(e, "Date1")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Certification2">Certification 2</Label>
                    <Input
                      id="Certification2"
                      value={formData?.Certification2 || ""}
                      onChange={(e) => handleInputChange(e, "Certification2")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Date2">Date 2</Label>
                    <Input id="Date2" value={formData?.Date2 || ""} onChange={(e) => handleInputChange(e, "Date2")} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Skills */}
        <AccordionItem value="skills">
          <AccordionTrigger className="text-xl font-bold px-4">Skills</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="techskills">Technical Skills</Label>
                    <Textarea
                      id="techskills"
                      value={formData?.techskills || ""}
                      onChange={(e) => handleInputChange(e, "techskills")}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="softskills">Soft Skills</Label>
                    <Textarea
                      id="softskills"
                      value={formData?.softskills || ""}
                      onChange={(e) => handleInputChange(e, "softskills")}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Submit Button */}
      <Button onClick={async () => putDataService(formData, parseInt(id))} className="w-full">Save Resume</Button>
    </div>
  )
}
