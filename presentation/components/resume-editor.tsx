"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ResumeData } from "@/types/initial-data";
import { toast } from "@/components/ui/use-toast";
import postDataService from "@/Data/api/post";
import { SoftwareEngineerResume } from "@/types/postData";

interface ResumeEditorProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    profileImage: string | null;
    setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const mapResumeDataToSoftwareEngineerResume = (resumeData: ResumeData): SoftwareEngineerResume => {
    const getFieldValue = (sectionId: string, fieldId: string): string => {
        const section = resumeData.sections.find((s) => s.id === sectionId);
        const field = section?.fields.find((f) => f.id === fieldId);
        return field?.value || '';
    };

    const skills = getFieldValue('skills', 'skills').split(',').map((s) => s.trim()).filter(Boolean);
    const techskills = skills.filter((s) => ['JavaScript', 'TypeScript', 'React', 'Java', 'Python'].includes(s));
    const softskills = skills.filter((s) => !techskills.includes(s));
    return {
        name: getFieldValue('contact', 'fullName'),
        email: getFieldValue('contact', 'email'),
        techskills: JSON.stringify(techskills.length ? techskills : getFieldValue('skills', 'technicalSkills')) || getFieldValue('skills', 'technicalSkills'),
        softskills: JSON.stringify(softskills.length ? softskills : getFieldValue('skills', 'softSkills')) || getFieldValue('skills', 'softSkills'),
        JobTitle: getFieldValue('experience', 'jobTitle1'),
        PreviousJobTitle: getFieldValue('experience', 'jobTitle2'),
        PreviousCompany: getFieldValue('experience', 'company2'),
        PreviousLocation: getFieldValue('experience', 'location2'),
        PreviousDescription: getFieldValue('experience', 'description2'),
        Location: getFieldValue('contact', 'location'),
        Company: getFieldValue('experience', 'company1'),
        Dates: getFieldValue('experience', 'dates1'),
        Description: getFieldValue('experience', 'description1'),
        contactNumber: getFieldValue('contact', 'phone'),
        aboutMe: getFieldValue('summary', 'summary'),
        github: getFieldValue('contact', 'website'),
        linkedIn: getFieldValue('contact', 'website'),
        portfolio: getFieldValue('links', 'portfolio'),
        Certification1: getFieldValue('certifications', 'cert1'),
        Certification2: getFieldValue('certifications', 'cert2'),
        Date1: getFieldValue('certifications', 'certDate1'),
        Date2: getFieldValue('certifications', 'certDate2'),
        degree: getFieldValue('education', 'degree'),
        University: getFieldValue('education', 'university'),
        UnivLoc: getFieldValue('education', 'eduLocation'),
        DateEnded: getFieldValue('education', 'eduDates'),
        gpa: getFieldValue('education', 'gpa'),
        address: getFieldValue('contact', 'address'),
    };
};


export default function ResumeEditor({ resumeData, setResumeData, profileImage, setProfileImage }: ResumeEditorProps) {
    const updateField = (sectionId: string, fieldId: string, value: string) => {
        const newSections = resumeData.sections.map((section) =>
            section.id === sectionId
                ? {
                    ...section,
                    fields: section.fields.map((field) => (field.id === fieldId ? { ...field, value } : field)),
                }
                : section
        );
        setResumeData({ ...resumeData, sections: newSections });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        try {
            // Map ResumeData to SoftwareEngineerResume
            const resumePayload = mapResumeDataToSoftwareEngineerResume(resumeData);

            // Validate required fields
            if (!resumePayload.name || !resumePayload.email) {
                toast({
                    title: "Error",
                    description: "Name and email are required",
                    variant: "destructive",
                });
                return;
            }

            // Log payload for debugging
            console.log('Resume Payload:', JSON.stringify(resumePayload, null, 2));

            // Post the resume data
            await postDataService(resumePayload);

            // Optionally post profileImage separately if backend supports it
            if (profileImage) {
                try {
                    const imageResponse = await fetch('http://localhost:8080/api/resumes/upload-image', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify({ profileImage }),
                    });

                    if (!imageResponse.ok) {
                        const errorData = await imageResponse.json();
                        console.error('Failed to upload image:', errorData);
                        toast({
                            title: "Warning",
                            description: "Resume saved, but failed to upload profile image",
                            variant: "default",
                        });
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                    toast({
                        title: "Warning",
                        description: "Resume saved, but failed to upload profile image",
                        variant: "default",
                    });
                }
            }

            toast({
                title: "Success",
                description: "Resume saved successfully",
            });
        } catch (error) {
            console.error('Error posting resume:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to save resume. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="flex flex-col items-center gap-4">
                            <Label htmlFor="profile-image">Profile Image</Label>
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={profileImage || ""} />
                                <AvatarFallback className="bg-gray-400">
                                    {resumeData.sections
                                        .find((s) => s.id === "contact")
                                        ?.fields.find((f) => f.id === "fullName")
                                        ?.value.split(" ")
                                        .map((n) => n[0])
                                        .join("") || "AJ"}
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

            <Accordion type="multiple" defaultValue={["contact"]}>
                {resumeData.sections.map((section) => (
                    <AccordionItem id={section.id} key={section.id} value={section.id}>
                        <AccordionTrigger className="text-xl font-bold px-4">{section.id}</AccordionTrigger>
                        <AccordionContent>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {section.fields.map((field) => (
                                            <div key={field.id} className="space-y-2">
                                                <Label htmlFor={field.id}>{field.label}</Label>
                                                {field.type === "textarea" ? (
                                                    <Textarea
                                                        name={field.id}
                                                        id={field.id}
                                                        value={field.value}
                                                        onChange={(e) => updateField(section.id, field.id, e.target.value)}
                                                        rows={3}
                                                    />
                                                ) : (
                                                    <Input
                                                        name={field.id}
                                                        id={field.id}
                                                        value={field.value}
                                                        onChange={(e) => updateField(section.id, field.id, e.target.value)}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <div className="flex justify-end">
                <Button onClick={handleSubmit} className="mt-4">
                    Save Resume
                </Button>
            </div>
        </div>
    );
}