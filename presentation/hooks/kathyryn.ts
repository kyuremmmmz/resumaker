import { ResumeData } from "@/types/initial-data"
import jsPDF from "jspdf"

export default function generateKathrynPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
    // Page dimensions and margins
    const pageWidth = 210 // A4 width in mm
    const margin = 15

    // Get contact info
    const contactSection = resumeData.sections.find((s) => s.id === "contact")
    const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
    const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"

    // Header with blue accent
    doc.setFillColor(65, 105, 225) // Royal blue
    doc.rect(0, 0, pageWidth, 40, "F")

    doc.setTextColor(255, 255, 255) // White text
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(fullName + ", RN", margin, 20)

    // Contact information as bullet points
    let yPos = 50
    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(11)

    const email = contactSection?.fields.find((f) => f.id === "email")?.value
    const phone = contactSection?.fields.find((f) => f.id === "phone")?.value
    const location = contactSection?.fields.find((f) => f.id === "location")?.value

    if (phone) {
        doc.text(`• ${phone}`, margin, yPos)
        yPos += 6
    }

    if (email) {
        doc.text(`• ${email}`, margin, yPos)
        yPos += 6
    }

    if (location) {
        doc.text(`• ${location}`, margin, yPos)
        yPos += 6
    }

    // Divider
    yPos += 5
    doc.setDrawColor(65, 105, 225) // Blue line
    doc.setLineWidth(0.5)
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 10

    // Two-column layout
    const colWidth = (pageWidth - 3 * margin) / 2
    let leftColY = yPos
    let rightColY = yPos

    // Left column - Introduction, Education, Certifications, Skills
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(65, 105, 225) // Blue text for headers
    doc.text("INTRODUCTION", margin, leftColY)
    leftColY += 10

    // Summary as introduction
    const summarySection = resumeData.sections.find((s) => s.id === "summary")
    if (summarySection) {
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(0, 0, 0) // Black text

        const summary = summarySection.fields.find((f) => f.id === "summary")?.value || ""
        const summaryLines = doc.splitTextToSize(summary, colWidth)

        summaryLines.forEach((line: string) => {
            doc.text(line, margin, leftColY)
            leftColY += 5
        })
    }

    leftColY += 10

    // Education
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(65, 105, 225) // Blue text for headers
    doc.text("EDUCATION", margin, leftColY)
    leftColY += 10

    const educationSection = resumeData.sections.find((s) => s.id === "education")
    if (educationSection) {
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(0, 0, 0) // Black text

        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || ""
        doc.text(degree, margin, leftColY)
        leftColY += 6

        doc.setFont("helvetica", "normal")
        const university = educationSection.fields.find((f) => f.id === "university")?.value || ""
        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || ""

        doc.text(`${university}, ${dates}`, margin, leftColY)
        leftColY += 10
    }

    // Certifications
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(65, 105, 225) // Blue text for headers
    doc.text("CERTIFICATIONS", margin, leftColY)
    leftColY += 10

    const certificationsSection = resumeData.sections.find((s) => s.id === "certifications")
    if (certificationsSection) {
        doc.setFontSize(11)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(0, 0, 0) // Black text

        // Group certifications
        const certNames = certificationsSection.fields.filter(
            (f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"),
        )

        certNames.forEach((cert) => {
            const index = cert.id.replace("cert", "")
            const date = certificationsSection.fields.find((f) => f.id === `certDate${index}`)?.value || ""

            doc.text(cert.value, margin, leftColY)
            leftColY += 6

            doc.setFont("helvetica", "normal")
            doc.text(date, margin, leftColY)
            leftColY += 10
        })
    }

    // Skills
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(65, 105, 225) // Blue text for headers
    doc.text("SKILLS", margin, leftColY)
    leftColY += 10

    const skillsSection = resumeData.sections.find((s) => s.id === "skills")
    if (skillsSection) {
        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(0, 0, 0) // Black text

        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ")
            skillsArray.forEach((skill) => {
                doc.text(`• ${skill}`, margin, leftColY)
                leftColY += 6
            })
        })
    }

    // Right column - Work Experience
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(65, 105, 225) // Blue text for headers
    doc.text("WORK EXPERIENCE", margin * 2 + colWidth, rightColY)
    rightColY += 10

    const experienceSection = resumeData.sections.find((s) => s.id === "experience")
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"))

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "")

            doc.setFontSize(11)
            doc.setFont("helvetica", "bold")
            doc.setTextColor(0, 0, 0) // Black text
            doc.text(titleField.value, margin * 2 + colWidth, rightColY)
            rightColY += 6

            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || ""
            doc.text(company, margin * 2 + colWidth, rightColY)
            rightColY += 6

            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || ""
            doc.setFont("helvetica", "normal")
            doc.text(dates, margin * 2 + colWidth, rightColY)
            rightColY += 6

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || ""
            const descLines = doc.splitTextToSize(description, colWidth)

            descLines.forEach((line: string) => {
                doc.text(`• ${line}`, margin * 2 + colWidth, rightColY)
                rightColY += 5
            })

            rightColY += 8
        })
    }
}