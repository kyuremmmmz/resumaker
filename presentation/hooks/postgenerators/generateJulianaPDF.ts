import { ResumeData } from "@/types/initial-data"
import jsPDF from "jspdf"

export default function generateJulianaPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
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

    // Add pink gradient background (approximated with a light pink fill)
    doc.setFillColor(253, 242, 248) // Very light pink
    doc.rect(0, 0, pageWidth, pageHeight, "F")

    // Header
    let yPos = 40 // Start after profile image space

    // "Hello! My name" bubble
    doc.setFillColor(255, 255, 255) // White
    doc.roundedRect(margin, yPos, 40, 8, 4, 4, "F")

    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    doc.text("Hello! My name", margin + 5, yPos + 5)

    yPos += 12

    // Name and heart
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text(fullName, margin, yPos)

    // Heart symbol (approximation)
    doc.setTextColor(213, 63, 140) // Pink text
    doc.text("♥", margin + doc.getTextWidth(fullName) + 5, yPos)

    yPos += 8

    // Job title
    doc.setTextColor(100, 100, 100) // Gray text
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(jobTitle, margin, yPos)

    yPos += 12

    // Contact info in bubbles
    doc.setFillColor(0, 0, 0) // Black background
    doc.roundedRect(margin, yPos, 50, 8, 4, 4, "F")

    doc.setTextColor(255, 255, 255) // White text
    doc.setFontSize(8)
    doc.text(phone, margin + 5, yPos + 5)

    doc.setFillColor(253, 242, 248) // Pink background
    doc.roundedRect(margin + 55, yPos, 50, 8, 4, 4, "F")

    doc.setTextColor(0, 0, 0) // Black text
    doc.text(email, margin + 60, yPos + 5)

    yPos += 20

    // About Me section
    doc.setFillColor(255, 255, 255) // White
    doc.roundedRect(margin, yPos, 40, 8, 4, 4, "F")

    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("About Me", margin + 5, yPos + 5)

    yPos += 12

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    const summary =
        resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value || ""
    const summaryLines = doc.splitTextToSize(summary, pageWidth - 2 * margin)
    summaryLines.forEach((line: string) => {
        doc.text(line, margin, yPos)
        yPos += 5
    })

    yPos += 10

    // Two column layout
    const colWidth = (pageWidth - 3 * margin) / 2

    // Experience (left column)
    doc.setFillColor(255, 255, 255) // White
    doc.roundedRect(margin, yPos, 40, 8, 4, 4, "F")

    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("Experience", margin + 5, yPos + 5)

    let leftColY = yPos + 12

    const experienceSection = resumeData.sections.find((s) => s.id === "experience")
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"))

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "")

            doc.setFontSize(10)
            doc.setFont("helvetica", "bold")
            doc.text(titleField.value, margin, leftColY)

            // Heart symbol
            doc.setTextColor(213, 63, 140) // Pink text
            doc.text("♥", margin + colWidth - 5, leftColY)
            doc.setTextColor(0, 0, 0) // Back to black text

            leftColY += 6

            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || ""
            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || ""

            doc.setFontSize(9)
            doc.setFont("helvetica", "normal")
            doc.text(company, margin, leftColY)
            doc.text(dates, margin + colWidth - doc.getTextWidth(dates) - 5, leftColY)
            leftColY += 6

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || ""
            const descLines = doc.splitTextToSize(description, colWidth - 5)
            descLines.forEach((line: string) => {
                doc.text(line, margin, leftColY)
                leftColY += 5
            })

            leftColY += 8
        })
    }

    // Education and Skills (right column)
    const rightColMargin = margin * 2 + colWidth

    // Education
    doc.setFillColor(255, 255, 255) // White
    doc.roundedRect(rightColMargin, yPos, 40, 8, 4, 4, "F")

    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("Education", rightColMargin + 5, yPos + 5)

    let rightColY = yPos + 12

    const educationSection = resumeData.sections.find((s) => s.id === "education")
    if (educationSection) {
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")
        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || ""
        doc.text(degree, rightColMargin, rightColY)
        rightColY += 6

        doc.setFontSize(9)
        doc.setFont("helvetica", "normal")
        const university = educationSection.fields.find((f) => f.id === "university")?.value || ""
        doc.text(university, rightColMargin, rightColY)
        rightColY += 6

        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || ""
        doc.text(dates, rightColMargin, rightColY)
        rightColY += 6

        const gpa = educationSection.fields.find((f) => f.id === "gpa")?.value || ""
        if (gpa) {
            doc.text(`GPA: ${gpa}`, rightColMargin, rightColY)
            rightColY += 6
        }
    }

    rightColY += 10

    // Personal Skills
    doc.setFillColor(255, 255, 255) // White
    doc.roundedRect(rightColMargin, rightColY, 50, 8, 4, 4, "F")

    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("Personal Skill", rightColMargin + 5, rightColY + 5)

    rightColY += 12

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")

    const skillsSection = resumeData.sections.find((s) => s.id === "skills")
    if (skillsSection) {
        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ")
            skillsArray.forEach((skill, index) => {
                doc.text(skill, rightColMargin, rightColY)
                rightColY += 5

                doc.setDrawColor(200, 200, 200)
                doc.setFillColor(200, 200, 200) // Gray
                doc.roundedRect(rightColMargin, rightColY, colWidth - 10, 2, 1, 1, "F")

                // Progress bar fill
                const percentage = 95 - index * 5
                doc.setFillColor(213, 63, 140) // Pink
                doc.roundedRect(rightColMargin, rightColY, (colWidth - 10) * (percentage / 100), 2, 1, 1, "F")

                rightColY += 6
            })
        })
    }
}