"use client"

import { initialResumeData } from "@/Core/lib/initial-data"
import { sendResumeByEmail } from "@/Core/lib/pdf-generator"
import { generatePDFPut } from "@/Core/lib/pdf-generator-put"

import type { SoftwareEngineerResume } from "@/types/postData"
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

// Define types for resume data structure
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
  single?: SoftwareEngineerResume
}>

export default function useEditorPutProps({ resume }: { resume: SoftwareEngineerResume }) {
  // Initialize form data with the resume prop
  const [formData, setFormData] = useState<SoftwareEngineerResume>(resume)

  // Initialize resumeData with the data from the resume prop
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const data = JSON.parse(JSON.stringify(initialResumeData)) // Deep clone

    // Map SoftwareEngineerResume fields to ResumeData structure
    const contactSection = data.sections.find((s: { id: string }) => s.id === "contact")
    if (contactSection) {
      const fullNameField = contactSection.fields.find((f: { id: string }) => f.id === "name")
      if (fullNameField) fullNameField.value = resume.name || ""

      const jobTitleField = contactSection.fields.find((f: { id: string }) => f.id === "JobTitle")
      if (jobTitleField) jobTitleField.value = resume.JobTitle || ""

      const emailField = contactSection.fields.find((f: { id: string }) => f.id === "email")
      if (emailField) emailField.value = resume.email || ""

      const phoneField = contactSection.fields.find((f: { id: string }) => f.id === "contactNumber")
      if (phoneField) phoneField.value = resume.contactNumber || ""

      const locationField = contactSection.fields.find((f: { id: string }) => f.id === "address")
      if (locationField) locationField.value = resume.address || ""

      const websiteField = contactSection.fields.find((f: { id: string }) => f.id === "website")
      if (websiteField) {
        let websiteValue = ""
        if (resume.github) websiteValue += resume.github
        if (resume.linkedIn) {
          if (websiteValue) websiteValue += ", "
          websiteValue += resume.linkedIn
        }
        if (resume.portfolio) {
          if (websiteValue) websiteValue += ", "
          websiteValue += resume.portfolio
        }
        websiteField.value = websiteValue || "linkedin.com/in/alexjohnson"
      }
    }

    const summarySection = data.sections.find((s: { id: string }) => s.id === "summary")
    if (summarySection) {
      const summaryField = summarySection.fields.find((f: { id: string }) => f.id === "summary")
      if (summaryField) {
        if (resume.aboutMe) {
          summaryField.value = resume.aboutMe
        } else {
          summaryField.value = resume.Description || ""
        }
      }
    }

    // Experience section
    const experienceSection = data.sections.find((s: { id: string }) => s.id === "experience")
    if (experienceSection) {
      // Current position
      const jobTitle1Field = experienceSection.fields.find((f: { id: string }) => f.id === "jobTitle1")
      if (jobTitle1Field) jobTitle1Field.value = resume.JobTitle || ""

      const company1Field = experienceSection.fields.find((f: { id: string }) => f.id === "company1")
      if (company1Field) company1Field.value = resume.Company || ""

      const location1Field = experienceSection.fields.find((f: { id: string }) => f.id === "location1")
      if (location1Field) location1Field.value = resume.Location || ""

      const dates1Field = experienceSection.fields.find((f: { id: string }) => f.id === "dates1")
      if (dates1Field) dates1Field.value = resume.Dates || ""

      const description1Field = experienceSection.fields.find((f: { id: string }) => f.id === "description1")
      if (description1Field) description1Field.value = resume.Description || ""

      // Previous position
      const jobTitle2Field = experienceSection.fields.find((f: { id: string }) => f.id === "jobTitle2")
      if (jobTitle2Field) jobTitle2Field.value = resume.PreviousJobTitle || ""

      const company2Field = experienceSection.fields.find((f: { id: string }) => f.id === "company2")
      if (company2Field) company2Field.value = resume.PreviousCompany || ""

      const location2Field = experienceSection.fields.find((f: { id: string }) => f.id === "location2")
      if (location2Field) location2Field.value = resume.PreviousLocation || ""

      const dates2Field = experienceSection.fields.find((f: { id: string }) => f.id === "dates2")
      if (dates2Field) dates2Field.value = resume.Date2 || ""

      const description2Field = experienceSection.fields.find((f: { id: string }) => f.id === "description2")
      if (description2Field) description2Field.value = resume.PreviousDescription || ""
    }

    // Education section
    const educationSection = data.sections.find((s: { id: string }) => s.id === "education")
    if (educationSection) {
      const degreeField = educationSection.fields.find((f: { id: string }) => f.id === "degree")
      if (degreeField) degreeField.value = resume.degree || ""

      const universityField = educationSection.fields.find((f: { id: string }) => f.id === "university")
      if (universityField) universityField.value = resume.University || ""

      const eduLocationField = educationSection.fields.find((f: { id: string }) => f.id === "eduLocation")
      if (eduLocationField) eduLocationField.value = resume.UnivLoc || ""

      const eduDatesField = educationSection.fields.find((f: { id: string }) => f.id === "eduDates")
      if (eduDatesField) eduDatesField.value = resume.DateEnded || ""

      const gpaField = educationSection.fields.find((f: { id: string }) => f.id === "gpa")
      if (gpaField) gpaField.value = resume.gpa || ""
    }

    // Skills section
    const skillsSection = data.sections.find((s: { id: string }) => s.id === "skills")
    if (skillsSection) {
      const technicalSkillsField = skillsSection.fields.find((f: { id: string }) => f.id === "technicalSkills")
      if (technicalSkillsField) technicalSkillsField.value = resume.techskills || ""

      const softSkillsField = skillsSection.fields.find((f: { id: string }) => f.id === "softSkills")
      if (softSkillsField) softSkillsField.value = resume.softskills || ""
    }

    // Certifications section
    const certificationsSection = data.sections.find((s: { id: string }) => s.id === "certifications")
    if (certificationsSection) {
      const cert1Field = certificationsSection.fields.find((f: { id: string }) => f.id === "cert1")
      if (cert1Field) cert1Field.value = resume.Certification1 || ""

      const certDate1Field = certificationsSection.fields.find((f: { id: string }) => f.id === "certDate1")
      if (certDate1Field) certDate1Field.value = resume.Date1 || ""

      const cert2Field = certificationsSection.fields.find((f: { id: string }) => f.id === "cert2")
      if (cert2Field) cert2Field.value = resume.Certification2 || ""

      const certDate2Field = certificationsSection.fields.find((f: { id: string }) => f.id === "certDate2")
      if (certDate2Field) certDate2Field.value = resume.Date2 || ""
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
        const contactSection = newResumeData.sections.find((s: { id: string }) => s.id === "contact")
        if (contactSection) {
          const fullNameField = contactSection.fields.find((f: { id: string }) => f.id === "fullName")
          if (fullNameField) fullNameField.value = value
        }
        break
      }
      case "JobTitle": {
        const contactSection = newResumeData.sections.find((s: { id: string }) => s.id === "contact")
        if (contactSection) {
          const jobTitleField = contactSection.fields.find((f: { id: string }) => f.id === "jobTitle")
          if (jobTitleField) jobTitleField.value = value
        }

        const experienceSection = newResumeData.sections.find((s: { id: string }) => s.id === "experience")
        if (experienceSection) {
          const jobTitle1Field = experienceSection.fields.find((f: { id: string }) => f.id === "jobTitle1")
          if (jobTitle1Field) jobTitle1Field.value = value
        }
        break
      }
      case "email": {
        const contactSection = newResumeData.sections.find((s: { id: string }) => s.id === "contact")
        if (contactSection) {
          const emailField = contactSection.fields.find((f: { id: string }) => f.id === "email")
          if (emailField) emailField.value = value
        }
        break
      }
      case "contactNumber": {
        const contactSection = newResumeData.sections.find((s: { id: string }) => s.id === "contact")
        if (contactSection) {
          const phoneField = contactSection.fields.find((f: { id: string }) => f.id === "phone")
          if (phoneField) phoneField.value = value
        }
        break
      }
      case "address": {
        const contactSection = newResumeData.sections.find((s: { id: string }) => s.id === "contact")
        if (contactSection) {
          const locationField = contactSection.fields.find((f: { id: string }) => f.id === "location")
          if (locationField) locationField.value = value
        }
        break
      }
      case "Description": {
        const summarySection = newResumeData.sections.find((s: { id: string }) => s.id === "summary")
        if (summarySection) {
          const summaryField = summarySection.fields.find((f: { id: string }) => f.id === "summary")
          if (summaryField) summaryField.value = value
        }

        const experienceSection = newResumeData.sections.find((s: { id: string }) => s.id === "experience")
        if (experienceSection) {
          const description1Field = experienceSection.fields.find((f: { id: string }) => f.id === "description1")
          if (description1Field) description1Field.value = value
        }
        break
      }
      case "Company": {
        const experienceSection = newResumeData.sections.find((s: { id: string }) => s.id === "experience")
        if (experienceSection) {
          const company1Field = experienceSection.fields.find((f: { id: string }) => f.id === "company1")
          if (company1Field) company1Field.value = value
        }
        break
      }
      case "Location": {
        const experienceSection = newResumeData.sections.find((s: { id: string }) => s.id === "experience")
        if (experienceSection) {
          const location1Field = experienceSection.fields.find((f: { id: string }) => f.id === "location1")
          if (location1Field) location1Field.value = value
        }
        break
      }
      case "Dates": {
        const experienceSection = newResumeData.sections.find((s: { id: string }) => s.id === "experience")
        if (experienceSection) {
          const dates1Field = experienceSection.fields.find((f: { id: string }) => f.id === "dates1")
          if (dates1Field) dates1Field.value = value
        }
        break
      }
      case "PreviousJobTitle": {
        const experienceSection = newResumeData.sections.find((s: { id: string }) => s.id === "experience")
        if (experienceSection) {
          const jobTitle2Field = experienceSection.fields.find((f: { id: string }) => f.id === "jobTitle2")
          if (jobTitle2Field) jobTitle2Field.value = value
        }
        break
      }
      case "PreviousCompany": {
        const experienceSection = newResumeData.sections.find((s: { id: string }) => s.id === "experience")
        if (experienceSection) {
          const company2Field = experienceSection.fields.find((f: { id: string }) => f.id === "company2")
          if (company2Field) company2Field.value = value
        }
        break
      }
      case "PreviousLocation": {
        const experienceSection = newResumeData.sections.find((s: { id: string }) => s.id === "experience")
        if (experienceSection) {
          const location2Field = experienceSection.fields.find((f: { id: string }) => f.id === "location2")
          if (location2Field) location2Field.value = value
        }
        break
      }
      case "Date2": {
        const experienceSection = newResumeData.sections.find((s: { id: string }) => s.id === "experience")
        if (experienceSection) {
          const dates2Field = experienceSection.fields.find((f: { id: string }) => f.id === "dates2")
          if (dates2Field) dates2Field.value = value
        }
        break
      }
      case "PreviousDescription": {
        const experienceSection = newResumeData.sections.find((s: { id: string }) => s.id === "experience")
        if (experienceSection) {
          const description2Field = experienceSection.fields.find((f: { id: string }) => f.id === "description2")
          if (description2Field) description2Field.value = value
        }
        break
      }
      case "degree": {
        const educationSection = newResumeData.sections.find((s: { id: string }) => s.id === "education")
        if (educationSection) {
          const degreeField = educationSection.fields.find((f: { id: string }) => f.id === "degree")
          if (degreeField) degreeField.value = value
        }
        break
      }
      case "University": {
        const educationSection = newResumeData.sections.find((s: { id: string }) => s.id === "education")
        if (educationSection) {
          const universityField = educationSection.fields.find((f: { id: string }) => f.id === "university")
          if (universityField) universityField.value = value
        }
        break
      }
      case "UnivLoc": {
        const educationSection = newResumeData.sections.find((s: { id: string }) => s.id === "education")
        if (educationSection) {
          const eduLocationField = educationSection.fields.find((f: { id: string }) => f.id === "eduLocation")
          if (eduLocationField) eduLocationField.value = value
        }
        break
      }
      case "DateEnded": {
        const educationSection = newResumeData.sections.find((s: { id: string }) => s.id === "education")
        if (educationSection) {
          const eduDatesField = educationSection.fields.find((f: { id: string }) => f.id === "eduDates")
          if (eduDatesField) eduDatesField.value = value
        }
        break
      }
      case "gpa": {
        const educationSection = newResumeData.sections.find((s: { id: string }) => s.id === "education")
        if (educationSection) {
          const gpaField = educationSection.fields.find((f: { id: string }) => f.id === "gpa")
          if (gpaField) gpaField.value = value
        }
        break
      }
      case "techskills": {
        const skillsSection = newResumeData.sections.find((s: { id: string }) => s.id === "skills")
        if (skillsSection) {
          const technicalSkillsField = skillsSection.fields.find((f: { id: string }) => f.id === "technicalSkills")
          if (technicalSkillsField) technicalSkillsField.value = value
        }
        break
      }
      case "softskills": {
        const skillsSection = newResumeData.sections.find((s: { id: string }) => s.id === "skills")
        if (skillsSection) {
          const softSkillsField = skillsSection.fields.find((f: { id: string }) => f.id === "softSkills")
          if (softSkillsField) softSkillsField.value = value
        }
        break
      }
      case "Certification1": {
        const certificationsSection = newResumeData.sections.find((s: { id: string }) => s.id === "certifications")
        if (certificationsSection) {
          const cert1Field = certificationsSection.fields.find((f: { id: string }) => f.id === "cert1")
          if (cert1Field) cert1Field.value = value
        }
        break
      }
      case "Certification2": {
        const certificationsSection = newResumeData.sections.find((s: { id: string }) => s.id === "certifications")
        if (certificationsSection) {
          const cert2Field = certificationsSection.fields.find((f: { id: string }) => f.id === "cert2")
          if (cert2Field) cert2Field.value = value
        }
        break
      }
      case "Date1": {
        const certificationsSection = newResumeData.sections.find((s: { id: string }) => s.id === "certifications")
        if (certificationsSection) {
          const certDate1Field = certificationsSection.fields.find((f: { id: string }) => f.id === "certDate1")
          if (certDate1Field) certDate1Field.value = value
        }
        break
      }
      case "Date2": {
        const certificationsSection = newResumeData.sections.find((s: { id: string }) => s.id === "certifications")
        if (certificationsSection) {
          const certDate2Field = certificationsSection.fields.find((f: { id: string }) => f.id === "certDate2")
          if (certDate2Field) certDate2Field.value = value
        }
        break
      }
      case "aboutMe": {
        const summarySection = newResumeData.sections.find((s: { id: string }) => s.id === "summary")
        if (summarySection) {
          const summaryField = summarySection.fields.find((f: { id: string }) => f.id === "summary")
          if (summaryField) summaryField.value = value
        }
        break
      }
      case "github": {
        const contactSection = newResumeData.sections.find((s: { id: string }) => s.id === "contact")
        if (contactSection) {
          const websiteField = contactSection.fields.find((f: { id: string }) => f.id === "website")
          if (websiteField) websiteField.value = value
        }
        break
      }
      case "linkedIn": {
        const contactSection = newResumeData.sections.find((s: { id: string }) => s.id === "contact")
        if (contactSection) {
          const websiteField = contactSection.fields.find((f: { id: string }) => f.id === "website")
          if (websiteField) {
            // Append LinkedIn to website if not already there
            if (!websiteField.value.includes("linkedin")) {
              websiteField.value = `${websiteField.value}, ${value}`
            } else {
              websiteField.value = value
            }
          }
        }
        break
      }
      case "portfolio": {
        const contactSection = newResumeData.sections.find((s: { id: string }) => s.id === "contact")
        if (contactSection) {
          const websiteField = contactSection.fields.find((f: { id: string }) => f.id === "website")
          if (websiteField) {
            // Append portfolio to website if not already there
            if (!websiteField.value.includes("portfolio")) {
              websiteField.value = `${websiteField.value}, ${value}`
            } else {
              websiteField.value = value
            }
          }
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
    toast({
      title: "Resume Updated",
      description: "Your resume has been successfully updated.",
    })
  }

  // Handle PDF download
  const handleDownloadPut = async () => {
    setIsDownloading(true)
    try {
      await generatePDFPut(resumeData, profileImage, activeTemplate, formData)
      toast({
        title: "PDF Generated",
        description: "Your resume PDF has been downloaded.",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      })
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
    // This ensures that any external changes to formData are reflected in resumeData
    const newResumeData = { ...resumeData }

    // Contact section
    const contactSection = newResumeData.sections.find((s: { id: string }) => s.id === "contact")
    if (contactSection) {
      const fullNameField = contactSection.fields.find((f: { id: string }) => f.id === "fullName")
      if (fullNameField) fullNameField.value = formData.name || ""

      const jobTitleField = contactSection.fields.find((f: { id: string }) => f.id === "jobTitle")
      if (jobTitleField) jobTitleField.value = formData.JobTitle || ""

      const emailField = contactSection.fields.find((f: { id: string }) => f.id === "email")
      if (emailField) emailField.value = formData.email || ""

      const phoneField = contactSection.fields.find((f: { id: string }) => f.id === "phone")
      if (phoneField) phoneField.value = formData.contactNumber || ""

      const locationField = contactSection.fields.find((f: { id: string }) => f.id === "location")
      if (locationField) locationField.value = formData.address || ""

      const websiteField = contactSection.fields.find((f: { id: string }) => f.id === "website")
      if (websiteField) {
        let websiteValue = ""
        if (formData.github) websiteValue += formData.github
        if (formData.linkedIn) {
          if (websiteValue) websiteValue += ", "
          websiteValue += formData.linkedIn
        }
        if (formData.portfolio) {
          if (websiteValue) websiteValue += ", "
          websiteValue += formData.portfolio
        }
        websiteField.value = websiteValue
      }
    }

    // Summary section
    const summarySection = newResumeData.sections.find((s: { id: string }) => s.id === "summary")
    if (summarySection) {
      const summaryField = summarySection.fields.find((f: { id: string }) => f.id === "summary")
      if (summaryField) {
        if (formData.aboutMe) {
          summaryField.value = formData.aboutMe
        } else {
          summaryField.value = formData.Description || ""
        }
      }
    }

    // Experience section
    const experienceSection = newResumeData.sections.find((s: { id: string }) => s.id === "experience")
    if (experienceSection) {
      // Current position
      const jobTitle1Field = experienceSection.fields.find((f: { id: string }) => f.id === "jobTitle1")
      if (jobTitle1Field) jobTitle1Field.value = formData.JobTitle || ""

      const company1Field = experienceSection.fields.find((f: { id: string }) => f.id === "company1")
      if (company1Field) company1Field.value = formData.Company || ""

      const location1Field = experienceSection.fields.find((f: { id: string }) => f.id === "location1")
      if (location1Field) location1Field.value = formData.Location || ""

      const dates1Field = experienceSection.fields.find((f: { id: string }) => f.id === "dates1")
      if (dates1Field) dates1Field.value = formData.Dates || ""

      const description1Field = experienceSection.fields.find((f: { id: string }) => f.id === "description1")
      if (description1Field) description1Field.value = formData.Description || ""

      // Previous position
      const jobTitle2Field = experienceSection.fields.find((f: { id: string }) => f.id === "jobTitle2")
      if (jobTitle2Field) jobTitle2Field.value = formData.PreviousJobTitle || ""

      const company2Field = experienceSection.fields.find((f: { id: string }) => f.id === "company2")
      if (company2Field) company2Field.value = formData.PreviousCompany || ""

      const location2Field = experienceSection.fields.find((f: { id: string }) => f.id === "location2")
      if (location2Field) location2Field.value = formData.PreviousLocation || ""

      const dates2Field = experienceSection.fields.find((f: { id: string }) => f.id === "dates2")
      if (dates2Field) dates2Field.value = formData.Date2 || ""

      const description2Field = experienceSection.fields.find((f: { id: string }) => f.id === "description2")
      if (description2Field) description2Field.value = formData.PreviousDescription || ""
    }

    // Education section
    const educationSection = newResumeData.sections.find((s: { id: string }) => s.id === "education")
    if (educationSection) {
      const degreeField = educationSection.fields.find((f: { id: string }) => f.id === "degree")
      if (degreeField) degreeField.value = formData.degree || ""

      const universityField = educationSection.fields.find((f: { id: string }) => f.id === "university")
      if (universityField) universityField.value = formData.University || ""

      const eduLocationField = educationSection.fields.find((f: { id: string }) => f.id === "eduLocation")
      if (eduLocationField) eduLocationField.value = formData.UnivLoc || ""

      const eduDatesField = educationSection.fields.find((f: { id: string }) => f.id === "eduDates")
      if (eduDatesField) eduDatesField.value = formData.DateEnded || ""

      const gpaField = educationSection.fields.find((f: { id: string }) => f.id === "gpa")
      if (gpaField) gpaField.value = formData.gpa || ""
    }

    // Skills section
    const skillsSection = newResumeData.sections.find((s: { id: string }) => s.id === "skills")
    if (skillsSection) {
      const technicalSkillsField = skillsSection.fields.find((f: { id: string }) => f.id === "technicalSkills")
      if (technicalSkillsField) technicalSkillsField.value = formData.techskills || ""

      const softSkillsField = skillsSection.fields.find((f: { id: string }) => f.id === "softSkills")
      if (softSkillsField) softSkillsField.value = formData.softskills || ""
    }

    // Certifications section
    const certificationsSection = newResumeData.sections.find((s: { id: string }) => s.id === "certifications")
    if (certificationsSection) {
      const cert1Field = certificationsSection.fields.find((f: { id: string }) => f.id === "cert1")
      if (cert1Field) cert1Field.value = formData.Certification1 || ""

      const certDate1Field = certificationsSection.fields.find((f: { id: string }) => f.id === "certDate1")
      if (certDate1Field) certDate1Field.value = formData.Date1 || ""

      const cert2Field = certificationsSection.fields.find((f: { id: string }) => f.id === "cert2")
      if (cert2Field) cert2Field.value = formData.Certification2 || ""

      const certDate2Field = certificationsSection.fields.find((f: { id: string }) => f.id === "certDate2")
      if (certDate2Field) certDate2Field.value = formData.Date2 || ""
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
