"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ResumeData } from "@/types/initial-data"


interface ResumeEditorProps {
    resumeData: ResumeData
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>
    profileImage: string | null
    setProfileImage: React.Dispatch<React.SetStateAction<string | null>>
}

export default function ResumeEditor({ resumeData, setResumeData, profileImage, setProfileImage }: ResumeEditorProps) {
    const updateField = (sectionId: string, fieldId: string, value: string) => {
        const newSections = resumeData.sections.map((section) =>
            section.id === sectionId
                ? {
                    ...section,
                    fields: section.fields.map((field) => (field.id === fieldId ? { ...field, value } : field)),
                }
                : section,
        )
        setResumeData({ ...resumeData, sections: newSections })
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

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
                    <AccordionItem key={section.id} value={section.id}>
                        <AccordionTrigger className="text-xl font-bold px-4">{section.title}</AccordionTrigger>
                        <AccordionContent>
                            <Card>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        {section.fields.map((field) => (
                                            <div key={field.id} className="space-y-2">
                                                <Label htmlFor={field.id}>{field.label}</Label>
                                                {field.type === "textarea" ? (
                                                    <Textarea
                                                        id={field.id}
                                                        value={field.value}
                                                        onChange={(e) => updateField(section.id, field.id, e.target.value)}
                                                        rows={3}
                                                    />
                                                ) : (
                                                    <Input
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
        </div>
    )
}
