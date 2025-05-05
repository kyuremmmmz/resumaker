"use client"

import { initialResumeData } from "@/Core/lib/initial-data"
import { sendResumeByEmail } from "@/Core/lib/pdf-generator"
import { generatePDFPut } from "@/Core/lib/pdf-generator-put"
import { useState, useEffect, type ChangeEvent } from "react"
import CatrianaTemplate from "../components/templates/catriana-template"
import DanielTemplate from "../components/templates/daniel-template"
import JulianaTemplate from "../components/templates/juliana-template"
import KathrynTemplate from "../components/templates/kathryn-template"
import LornaTemplate from "../components/templates/lorna-template"
import MargotTemplate from "../components/templates/margot-template"
import OliviaTemplate from "../components/templates/olivia-template"
import RachelleTemplate from "../components/templates/rachelle-template"
import SamiraTemplate from "../components/templates/samira-template"
import StefanoTemplate from "../components/templates/stefano-template"
import { toast } from "@/components/ui/use-toast"
import type { FC } from "react"
import { ResumeData } from "@/types/initial-data"
import { SoftwareEngineerResume } from "@/types/postData"

interface ResumeField {
  id: string
  label: string
  value: string
  type?: "text" | "textarea"
}

interface ResumeSection {
  id: string
  title: string
  fields: ResumeField[]
}

// Define the template component type
type TemplateComponent = FC<{
  resumeData: ResumeData
  profileImage: string | null
}>

export default function useEditorPutProps({ resume }: { resume: SoftwareEngineerResume }) {
  const [formData, setFormData] = useState<SoftwareEngineerResume>(resume)

  // Initialize resumeData with the data from the resume prop
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const data = JSON.parse(JSON.stringify(initialResumeData)) // Deep clone

    const contactSection = data.sections.find((s:{id:string}) => s.id === "contact")
    if (contactSection) {
      const fullNameField = contactSection.fields.find((f:{id:string}) => f.id === "fullName")
      if (fullNameField) fullNameField.value = resume.name || ""

      const jobTitleField = contactSection.fields.find((f:{id:string}) => f.id === "jobTitle")
      if (jobTitleField) jobTitleField.value = resume.JobTitle || ""

      const emailField = contactSection.fields.find((f:{id:string}) => f.id === "email")
      if (emailField) emailField.value = resume.email || ""

      const phoneField = contactSection.fields.find((f:{id:string}) => f.id === "phone")
      if (phoneField) phoneField.value = resume.contactNumber || ""

      const locationField = contactSection.fields.find((f:{id:string}) => f.id === "location")
      if (locationField) locationField.value = resume.address || ""
    }

    const summarySection = data.sections.find((s:{id:string}) => s.id === "summary")
    if (summarySection) {
      const summaryField = summarySection.fields.find((f:{id:string}) => f.id === "summary")
      if (summaryField) summaryField.value = resume.Description || ""
    }

    return data
  })

  // Use the profile image from the resume or null
  const [profileImage, setProfileImage] = useState<string | null>(resume.name || null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(resume.name || null)
  const [previewVisible, setPreviewVisible] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState("stefano")
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [emailAddress, setEmailAddress] = useState("")

  // Define templates with proper typing
  const templates: Array<{
    id: string
    name: string
    component: TemplateComponent
  }> = [
    { id: "stefano", name: "Stefano", component: StefanoTemplate },
    { id: "samira", name: "Samira", component: SamiraTemplate },
    { id: "kathryn", name: "Kathryn", component: KathrynTemplate },
    { id: "olivia", name: "Olivia", component: OliviaTemplate },
    { id: "lorna", name: "Lorna", component: LornaTemplate },
    { id: "margot", name: "Margot", component: MargotTemplate },
    { id: "rachelle", name: "Rachelle", component: RachelleTemplate },
    { id: "daniel", name: "Daniel", component: DanielTemplate },
    { id: "catriana", name: "Catriana", component: CatrianaTemplate },
    { id: "juliana", name: "Juliana", component: JulianaTemplate },
  ]

  // Get the active template component
  const ActiveTemplateComponent = templates.find((t) => t.id === activeTemplate)?.component || StefanoTemplate

  // Handle input changes and update both formData and resumeData
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof SoftwareEngineerResume,
  ) => {
    const { value } = e.target

    // Update formData
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Update resumeData based on the field
    const newResumeData = { ...resumeData }

    // Map fields from SoftwareEngineerResume to ResumeData structure
    switch (field) {
      case "name": {
        const contactSection = newResumeData.sections.find((s) => s.id === "contact")
        if (contactSection) {
          const fullNameField = contactSection.fields.find((f) => f.id === "fullName")
          if (fullNameField) fullNameField.value = value
        }
        break
      }
      case "JobTitle": {
        const contactSection = newResumeData.sections.find((s) => s.id === "contact")
        if (contactSection) {
          const jobTitleField = contactSection.fields.find((f) => f.id === "jobTitle")
          if (jobTitleField) jobTitleField.value = value
        }
        break
      }
      case "email": {
        const contactSection = newResumeData.sections.find((s) => s.id === "contact")
        if (contactSection) {
          const emailField = contactSection.fields.find((f) => f.id === "email")
          if (emailField) emailField.value = value
        }
        break
      }
      case "contactNumber": {
        const contactSection = newResumeData.sections.find((s) => s.id === "contact")
        if (contactSection) {
          const phoneField = contactSection.fields.find((f) => f.id === "phone")
          if (phoneField) phoneField.value = value
        }
        break
      }
      case "address": {
        const contactSection = newResumeData.sections.find((s) => s.id === "contact")
        if (contactSection) {
          const locationField = contactSection.fields.find((f) => f.id === "location")
          if (locationField) locationField.value = value
        }
        break
      }
      case "Description": {
        const summarySection = newResumeData.sections.find((s) => s.id === "summary")
        if (summarySection) {
          const summaryField = summarySection.fields.find((f) => f.id === "summary")
          if (summaryField) summaryField.value = value
        }
        break
      }
    }

    setResumeData(newResumeData)
  }

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setProfileImage(imageUrl)
        setProfileImagePreview(imageUrl)
        setFormData((prev) => ({
          ...prev,
          profileImage: imageUrl,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    console.log("Updated resume data:", formData)
    // Here you would typically send the data to your backend
  }

  // Handle PDF download
  const handleDownloadPut = async () => {
    setIsDownloading(true)
    try {
      await generatePDFPut(resumeData, profileImage, activeTemplate, resume)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  // Handle email sending
  const handleSendEmail = async () => {
    if (!emailAddress || !emailAddress.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setIsSendingEmail(true)
    try {
      const result = await sendResumeByEmail(resumeData, profileImage, activeTemplate, emailAddress)

      if (result.success) {
        toast({
          title: "Email Sent",
          description: result.message,
        })
        setEmailDialogOpen(false)
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSendingEmail(false)
    }
  }

  // Update resumeData when formData changes
  useEffect(() => {
    const newResumeData = { ...resumeData }

    const contactSection = newResumeData.sections.find((s) => s.id === "contact")
    if (contactSection) {
      const fullNameField = contactSection.fields.find((f) => f.id === "fullName")
      if (fullNameField) fullNameField.value = formData.name || ""

      const jobTitleField = contactSection.fields.find((f) => f.id === "jobTitle")
      if (jobTitleField) jobTitleField.value = formData.JobTitle || ""

      const emailField = contactSection.fields.find((f) => f.id === "email")
      if (emailField) emailField.value = formData.email || ""

      const phoneField = contactSection.fields.find((f) => f.id === "phone")
      if (phoneField) phoneField.value = formData.contactNumber || ""

      const locationField = contactSection.fields.find((f) => f.id === "location")
      if (locationField) locationField.value = formData.address || ""
    }

    const summarySection = newResumeData.sections.find((s) => s.id === "summary")
    if (summarySection) {
      const summaryField = summarySection.fields.find((f) => f.id === "summary")
      if (summaryField) summaryField.value = formData.Description || ""
    }

    setResumeData(newResumeData)
  }, [formData])

  return {
    handleInputChange,
    handleImageUpload,
    handleSubmit,
    setFormData,
    formData,
    setProfileImagePreview,
    profileImagePreview,
    resumeData,
    setResumeData,
    profileImage,
    setProfileImage,
    previewVisible,
    setPreviewVisible,
    isDownloading,
    isSendingEmail,
    activeTemplate,
    setActiveTemplate,
    emailDialogOpen,
    setEmailDialogOpen,
    emailAddress,
    setEmailAddress,
    handleDownloadPut,
    handleSendEmail,
    templates,
    ActiveTemplateComponent,
  }
}
