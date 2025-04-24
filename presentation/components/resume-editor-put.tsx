"use client";

import React, { useState, ChangeEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SoftwareEngineerResume } from "@/types/postData";
import ProfileImageSection from "./sections/ProfileImageSection";

interface ResumeEditorPutProps {
    resume: SoftwareEngineerResume;
}

export default function ResumeEditorPut({ resume }: ResumeEditorPutProps) {
    const [formData, setFormData] = useState<SoftwareEngineerResume>(resume);
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(resume.name || null);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof SoftwareEngineerResume
    ) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImagePreview(imageUrl);
            setFormData((prev) => ({
                ...prev,
                profileImage: imageUrl,
            }));
        }
    };

    const handleSubmit = () => {
        console.log("Updated resume data:", formData);
    };

    return (
        <div className="space-y-6">
            <ProfileImageSection resume={resume}/>

            {/* Resume Sections */}
            <Accordion type="multiple" defaultValue={["contact"]}>
                {/* Contact Information */}
                <AccordionItem value="contact">
                    <AccordionTrigger className="text-xl font-bold px-4">
                        Contact Information
                    </AccordionTrigger>
                    <AccordionContent>
                        <Card>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "name")}
                                            id="name"
                                            name="name"
                                            value={formData.name || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "email")}
                                            id="email"
                                            name="email"
                                            value={formData.email || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contactNumber">Contact Number</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "contactNumber")}
                                            id="contactNumber"
                                            name="contactNumber"
                                            value={formData.contactNumber || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "address")}
                                            id="address"
                                            name="address"
                                            value={formData.address || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="github">GitHub</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "github")}
                                            id="github"
                                            name="github"
                                            value={formData.github || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="linkedIn">LinkedIn</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "linkedIn")}
                                            id="linkedIn"
                                            name="linkedIn"
                                            value={formData.linkedIn || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="portfolio">Portfolio</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "portfolio")}
                                            id="portfolio"
                                            name="portfolio"
                                            value={formData.portfolio || ""}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>

                {/* About Me */}
                <AccordionItem value="about">
                    <AccordionTrigger className="text-xl font-bold px-4">
                        About Me
                    </AccordionTrigger>
                    <AccordionContent>
                        <Card>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="aboutMe">About Me</Label>
                                        <Textarea
                                            onChange={(e) => handleInputChange(e, "aboutMe")}
                                            id="aboutMe"
                                            name="aboutMe"
                                            value={formData.aboutMe || ""}
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>

                {/* Work Experience */}
                <AccordionItem value="experience">
                    <AccordionTrigger className="text-xl font-bold px-4">
                        Work Experience
                    </AccordionTrigger>
                    <AccordionContent>
                        <Card>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="jobTitle">Current Job Title</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "JobTitle")}
                                            id="jobTitle"
                                            name="jobTitle"
                                            value={formData.JobTitle || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Current Company</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "Company")}
                                            id="company"
                                            name="company"
                                            value={formData.Company || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Current Location</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "Location")}
                                            id="location"
                                            name="location"
                                            value={formData.Location || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dates">Current Dates</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "Dates")}
                                            id="dates"
                                            name="dates"
                                            value={formData.Dates || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Current Job Description</Label>
                                        <Textarea
                                            onChange={(e) => handleInputChange(e, "Description")}
                                            id="description"
                                            name="description"
                                            value={formData.Description || ""}
                                            rows={4}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="previousJobTitle">Previous Job Title</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "PreviousJobTitle")}
                                            id="previousJobTitle"
                                            name="previousJobTitle"
                                            value={formData.PreviousJobTitle || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="previousCompany">Previous Company</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "PreviousCompany")}
                                            id="previousCompany"
                                            name="previousCompany"
                                            value={formData.PreviousCompany || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="previousLocation">Previous Location</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "PreviousLocation")}
                                            id="previousLocation"
                                            name="previousLocation"
                                            value={formData.PreviousLocation || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="previousDescription">Previous Job Description</Label>
                                        <Textarea
                                            onChange={(e) => handleInputChange(e, "PreviousDescription")}
                                            id="previousDescription"
                                            name="previousDescription"
                                            value={formData.PreviousDescription || ""}
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
                    <AccordionTrigger className="text-xl font-bold px-4">
                        Education
                    </AccordionTrigger>
                    <AccordionContent>
                        <Card>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="degree">Degree</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "degree")}
                                            id="degree"
                                            name="degree"
                                            value={formData.degree || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="university">University</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "University")}
                                            id="university"
                                            name="university"
                                            value={formData.University || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="univLoc">University Location</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "UnivLoc")}
                                            id="univLoc"
                                            name="univLoc"
                                            value={formData.UnivLoc || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dateEnded">Dates Attended</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "DateEnded")}
                                            id="dateEnded"
                                            name="dateEnded"
                                            value={formData.DateEnded || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="gpa">GPA</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "gpa")}
                                            id="gpa"
                                            name="gpa"
                                            value={formData.gpa || ""}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>

                {/* Certifications */}
                <AccordionItem value="certifications">
                    <AccordionTrigger className="text-xl font-bold px-4">
                        Certifications
                    </AccordionTrigger>
                    <AccordionContent>
                        <Card>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="certification1">Certification 1</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "Certification1")}
                                            id="certification1"
                                            name="certification1"
                                            value={formData.Certification1 || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="date1">Date 1</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "Date1")}
                                            id="date1"
                                            name="date1"
                                            value={formData.Date1 || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="certification2">Certification 2</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "Certification2")}
                                            id="certification2"
                                            name="certification2"
                                            value={formData.Certification2 || ""}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="date2">Date 2</Label>
                                        <Input
                                            onChange={(e) => handleInputChange(e, "Date2")}
                                            id="date2"
                                            name="date2"
                                            value={formData.Date2 || ""}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>

                {/* Skills */}
                <AccordionItem value="skills">
                    <AccordionTrigger className="text-xl font-bold px-4">
                        Skills
                    </AccordionTrigger>
                    <AccordionContent>
                        <Card>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="techskills">Technical Skills</Label>
                                        <Textarea
                                            onChange={(e) => handleInputChange(e, "techskills")}
                                            id="techskills"
                                            name="techskills"
                                            value={formData.techskills || ""}
                                            rows={4}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="softskills">Soft Skills</Label>
                                        <Textarea
                                            onChange={(e) => handleInputChange(e, "softskills")}
                                            id="softskills"
                                            name="softskills"
                                            value={formData.softskills || ""}
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
            <Button onClick={handleSubmit} className="w-full">
                Save Resume
            </Button>
        </div>
    );
}