import { ResumeData } from "@/types/initial-data"
import jsPDF from "jspdf"

export default function generateCatrianaPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
    // Page dimensions and margins
    const pageWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const margin = 15

    // Get contact info
    const contactSection = resumeData.sections.find((s) => s.id === "contact")
    const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
    const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"
    const email = contactSection?.fields.find((f) => f.id === "email")?.value || ""
    const phone = contactSection?.fields.find((f) => f.id === "phone")?.value || ""
    const website = contactSection?.fields.find((f) => f.id === "website")?.value || ""

    // Header
    let yPos = 20
    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(fullName, margin, yPos)

    yPos += 10
    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text(jobTitle, margin, yPos)

    yPos += 15

    // Two column layout for header
    const colWidth = (pageWidth - 3 * margin) / 2

    // Introduction
    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("INTRODUCTION", margin, yPos)

    yPos += 8

    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    const summary =
        resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value || ""
    const summaryLines = doc.splitTextToSize(summary, colWidth)
    summaryLines.forEach((line: string) => {
        doc.text(line, margin, yPos)
        yPos += 5
    })

    // Contact info (right column)
    const rightColMargin = margin * 2 + colWidth
    let rightColY = yPos - summaryLines.length * 5 - 8 // Align with introduction heading

    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("CONTACT INFO", rightColMargin, rightColY)

    rightColY += 8

    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    if (email) {
        doc.setFont("helvetica", "bold")
        doc.text("Email:", rightColMargin, rightColY)
        doc.setFont("helvetica", "normal")
        doc.text(email, rightColMargin + 20, rightColY)
        rightColY += 6
    }

    if (website) {
        doc.setFont("helvetica", "bold")
        doc.text("Website:", rightColMargin, rightColY)
        doc.setFont("helvetica", "normal")
        doc.text(website, rightColMargin + 20, rightColY)
        rightColY += 6
    }

    if (phone) {
        doc.setFont("helvetica", "bold")
        doc.text("Phone:", rightColMargin, rightColY)
        doc.setFont("helvetica", "normal")
        doc.text(phone, rightColMargin + 20, rightColY)
        rightColY += 6
    }

    // Continue with main content
    yPos += 10

    // Work Experience
    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("WORK EXPERIENCE", margin, yPos)

    yPos += 8

    doc.setDrawColor(0, 102, 204) // Blue line
    doc.setLineWidth(0.5)
    doc.line(margin, yPos, pageWidth - margin, yPos)

    yPos += 10

    const experienceSection = resumeData.sections.find((s) => s.id === "experience")
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"))

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "")

            doc.setTextColor(0, 0, 0) // Black text
            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.text(titleField.value, margin, yPos)
            yPos += 6

            doc.setFontSize(10)
            doc.setFont("helvetica", "normal")
            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || ""
            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || ""
            doc.text(`${company} | ${dates}`, margin, yPos)
            yPos += 6

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || ""
            const descLines = doc.splitTextToSize(description, pageWidth - 2 * margin)
            descLines.forEach((line: string) => {
                doc.text(line, margin, yPos)
                yPos += 5
            })

            yPos += 8
        })
    }

    // Two column layout for education and skills
    const eduStartY = yPos

    // Education (left column)
    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("EDUCATION", margin, eduStartY)

    let leftColY = eduStartY + 8

    const educationSection = resumeData.sections.find((s) => s.id === "education")
    if (educationSection) {
        doc.setTextColor(0, 0, 0) // Black text
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        const university = educationSection.fields.find((f) => f.id === "university")?.value || ""
        doc.text(university, margin, leftColY)
        leftColY += 6

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || ""
        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || ""
        doc.text(`${degree} | ${dates}`, margin, leftColY)
        leftColY += 6

        const gpa = educationSection.fields.find((f) => f.id === "gpa")?.value || ""
        if (gpa) {
            doc.text(`GPA: ${gpa}`, margin, leftColY)
            leftColY += 6
        }
    }

    // Skills (right column)
    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("SKILLS", rightColMargin, eduStartY)

    let skillsY = eduStartY + 8

    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    const skillsSection = resumeData.sections.find((s) => s.id === "skills")
    if (skillsSection) {
        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ")
            skillsArray.forEach((skill) => {
                doc.text(skill, rightColMargin, skillsY)
                skillsY += 5
            })
        })
    }

    // Certifications
    const certY = Math.max(leftColY, skillsY) + 10

    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("CERTIFICATIONS", rightColMargin, certY)

    let certItemY = certY + 8

    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    const certificationsSection = resumeData.sections.find((s) => s.id === "certifications")
    if (certificationsSection) {
        // Group certifications
        const certNames = certificationsSection.fields.filter(
            (f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"),
        )

        certNames.forEach((cert) => {
            const index = cert.id.replace("cert", "")
            const date = certificationsSection.fields.find((f) => f.id === `certDate${index}`)?.value || ""

            doc.text(`${cert.value} (${date})`, rightColMargin, certItemY)
            certItemY += 6
        })
    }
}