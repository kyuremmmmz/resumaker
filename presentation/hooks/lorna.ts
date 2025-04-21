import { ResumeData } from "@/types/initial-data"
import jsPDF from "jspdf"

// Implement the remaining PDF generator functions for other templates
export default function generateLornaPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
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
    const location = contactSection?.fields.find((f) => f.id === "location")?.value || ""

    // Blue diagonal header
    doc.setFillColor(65, 105, 225) // Royal blue
    doc.rect(0, 0, pageWidth, 60, "F")

    // Add name and job title
    let yPos = 70
    doc.setTextColor(65, 105, 225) // Blue text
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(fullName, margin, yPos)

    yPos += 10
    doc.setFontSize(16)
    doc.text(jobTitle, margin, yPos)

    yPos += 20

    // Two column layout
    const colWidth = (pageWidth - 3 * margin) / 2
    let leftColY = yPos
    let rightColY = yPos

    // Left column - Contact, Introduction, Skills
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Contact", margin, leftColY)
    leftColY += 8

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0) // Black text

    if (phone) {
        doc.text(`Phone: ${phone}`, margin, leftColY)
        leftColY += 5
    }

    if (email) {
        doc.text(`Email: ${email}`, margin, leftColY)
        leftColY += 5
    }

    if (location) {
        doc.text(`Address: ${location}`, margin, leftColY)
        leftColY += 5
    }

    // Introduction
    leftColY += 15
    leftColY = checkForPageBreak(doc, leftColY, margin);

    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(65, 105, 225) // Blue text
    doc.text("Introduction", margin, leftColY)
    leftColY += 8

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0) // Black text

    const summary =
        resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value || ""
    const summaryLines = doc.splitTextToSize(summary, colWidth)
    summaryLines.forEach((line: string) => {
        leftColY = checkForPageBreak(doc, leftColY, margin);
        doc.text(line, margin, leftColY)
        leftColY += 5
    })

    // Skills
    leftColY += 15
    leftColY = checkForPageBreak(doc, leftColY, margin);

    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(65, 105, 225) // Blue text
    doc.text("Skills", margin, leftColY)
    leftColY += 8

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0) // Black text

    const skillsSection = resumeData.sections.find((s) => s.id === "skills")
    if (skillsSection) {
        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ")
            skillsArray.forEach((skill) => {
                leftColY = checkForPageBreak(doc, leftColY, margin);
                doc.text(`• ${skill}`, margin, leftColY)
                leftColY += 5
            })
        })
    }

    // Right column - Education, Work Experience
    const rightColMargin = margin * 2 + colWidth

    // Education
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(65, 105, 225) // Blue text
    doc.text("Education", rightColMargin, rightColY)
    rightColY += 8

    doc.setDrawColor(65, 105, 225) // Blue line
    doc.setLineWidth(0.5)
    doc.line(rightColMargin, rightColY, pageWidth - margin, rightColY)
    rightColY += 10

    const educationSection = resumeData.sections.find((s) => s.id === "education")
    if (educationSection) {
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(0, 0, 0) // Black text

        rightColY = checkForPageBreak(doc, rightColY, margin);
        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || ""
        doc.text(degree, rightColMargin, rightColY)
        rightColY += 6

        rightColY = checkForPageBreak(doc, rightColY, margin);
        doc.setFontSize(10)
        doc.setFont("helvetica", "italic")
        const university = educationSection.fields.find((f) => f.id === "university")?.value || ""
        doc.text(university, rightColMargin, rightColY)
        rightColY += 6

        rightColY = checkForPageBreak(doc, rightColY, margin);
        doc.setFont("helvetica", "normal")
        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || ""
        doc.text(dates, rightColMargin, rightColY)
        rightColY += 15
    }

    // Work Experience
    rightColY = checkForPageBreak(doc, rightColY, margin);
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(65, 105, 225) // Blue text
    doc.text("Work Experience", rightColMargin, rightColY)
    rightColY += 8

    doc.setDrawColor(65, 105, 225) // Blue line
    doc.setLineWidth(0.5)
    doc.line(rightColMargin, rightColY, pageWidth - margin, rightColY)
    rightColY += 10

    const experienceSection = resumeData.sections.find((s) => s.id === "experience")
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"))

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "")

            rightColY = checkForPageBreak(doc, rightColY, margin);
            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.setTextColor(0, 0, 0) // Black text
            doc.text(titleField.value, rightColMargin, rightColY)
            rightColY += 6

            rightColY = checkForPageBreak(doc, rightColY, margin);
            doc.setFontSize(10)
            doc.setFont("helvetica", "italic")
            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || ""
            doc.text(company, rightColMargin, rightColY)
            rightColY += 6

            rightColY = checkForPageBreak(doc, rightColY, margin);
            doc.setFont("helvetica", "normal")
            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || ""
            doc.text(dates, rightColMargin, rightColY)
            rightColY += 6

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || ""
            const descLines = doc.splitTextToSize(description, colWidth)
            descLines.forEach((line: string) => {
                rightColY = checkForPageBreak(doc, rightColY, margin);
                doc.text(line, rightColMargin, rightColY)
                rightColY += 5
            })

            rightColY += 8
        })
    }
}

function checkForPageBreak(doc: jsPDF, leftColY: number, margin: number): number {
    throw new Error("Function not implemented.")
}
