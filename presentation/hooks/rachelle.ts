import { ResumeData } from "@/types/initial-data"
import jsPDF from "jspdf"

export default function generateRachellePDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
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
    const website = contactSection?.fields.find((f) => f.id === "website")?.value || ""

    // Add pink gradient background (approximated with a light pink fill)
    doc.setFillColor(253, 242, 248) // Very light pink
    doc.rect(0, 0, pageWidth, pageHeight, "F")

    // Two column layout
    const colWidth = (pageWidth - 3 * margin) / 2
    // Right column - Name, title, summary, experience, contact
    const rightColMargin = margin * 2 + colWidth
    let rightColY = 30

    // Name and title
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(75, 0, 130) // Indigo text
    doc.text(fullName, rightColMargin, rightColY)
    rightColY += 10

    doc.setFontSize(16)
    doc.setFont("helvetica", "normal")
    doc.text(jobTitle, rightColMargin, rightColY)
    rightColY += 8

    doc.setDrawColor(200, 200, 200) // Gray line
    doc.setLineWidth(0.5)
    doc.line(rightColMargin, rightColY, pageWidth - margin, rightColY)
    rightColY += 10

    // Summary
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0) // Black text

    const summary =
        resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value || ""
    const summaryLines = doc.splitTextToSize(summary, colWidth)
    summaryLines.forEach((line: string) => {
        doc.text(line, rightColMargin, rightColY)
        rightColY += 5
    })

    // Work Experience
    rightColY += 10
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(213, 63, 140) // Pink text
    doc.text("WORK EXPERIENCE", rightColMargin, rightColY)
    rightColY += 8

    doc.setDrawColor(200, 200, 200) // Gray line
    doc.setLineWidth(0.5)
    doc.line(rightColMargin, rightColY, pageWidth - margin, rightColY)
    rightColY += 10

    const experienceSection = resumeData.sections.find((s) => s.id === "experience")
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"))

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "")

            doc.setFontSize(10)
            doc.setFont("helvetica", "normal")
            doc.setTextColor(100, 100, 100) // Gray text
            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || ""
            doc.text(dates, rightColMargin, rightColY)
            rightColY += 6

            doc.setFont("helvetica", "bold")
            doc.setTextColor(0, 0, 0) // Black text
            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || ""
            doc.text(company, rightColMargin, rightColY)
            rightColY += 6

            doc.setFont("helvetica", "normal")
            doc.text(titleField.value, rightColMargin, rightColY)
            rightColY += 6

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || ""
            const descLines = doc.splitTextToSize(description, colWidth)
            descLines.forEach((line: string) => {
                doc.text(line, rightColMargin, rightColY)
                rightColY += 5
            })

            rightColY += 8
        })
    }

    // Contact
    rightColY += 10
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(213, 63, 140) // Pink text
    doc.text("CONTACT", rightColMargin, rightColY)
    rightColY += 8

    doc.setDrawColor(200, 200, 200) // Gray line
    doc.setLineWidth(0.5)
    doc.line(rightColMargin, rightColY, pageWidth - margin, rightColY)
    rightColY += 10

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0) // Black text

    if (phone) {
        doc.text(`Phone: ${phone}`, rightColMargin, rightColY)
        rightColY += 6
    }

    if (email) {
        doc.text(`Email: ${email}`, rightColMargin, rightColY)
        rightColY += 6
    }

    if (website) {
        doc.text(`Website: ${website}`, rightColMargin, rightColY)
        rightColY += 6
    }

    if (location) {
        doc.text(`Address: ${location}`, rightColMargin, rightColY)
        rightColY += 6
    }

    // Left column - Profile image, education, skills
    let leftColY = 60 // Start after profile image space

    // Education Section
    leftColY = checkForPageBreak(doc, leftColY, margin)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(213, 63, 140) // Pink text
    doc.text("EDUCATION", margin, leftColY)
    leftColY += 8

    leftColY = checkForPageBreak(doc, leftColY, margin)
    doc.setDrawColor(200, 200, 200) // Gray line
    doc.setLineWidth(0.5)
    doc.line(margin, leftColY, margin + colWidth, leftColY)
    leftColY += 10

    const educationSection = resumeData.sections.find((s) => s.id === "education")
    if (educationSection) {
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(0, 0, 0) // Black text

        leftColY = checkForPageBreak(doc, leftColY, margin)
        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || ""
        doc.text(dates, margin, leftColY)
        leftColY += 6

        leftColY = checkForPageBreak(doc, leftColY, margin)
        const university = educationSection.fields.find((f) => f.id === "university")?.value || ""
        doc.text(university, margin, leftColY)
        leftColY += 6

        doc.setFont("helvetica", "normal")
        leftColY = checkForPageBreak(doc, leftColY, margin)
        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || ""
        doc.text(`• ${degree}`, margin, leftColY)
        leftColY += 15
    }

    // Skills Section
    leftColY = checkForPageBreak(doc, leftColY, margin)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(213, 63, 140) // Pink text
    doc.text("SKILL", margin, leftColY)
    leftColY += 8

    leftColY = checkForPageBreak(doc, leftColY, margin)
    doc.setDrawColor(200, 200, 200) // Gray line
    doc.setLineWidth(0.5)
    doc.line(margin, leftColY, margin + colWidth, leftColY)
    leftColY += 10

    const skillsSection = resumeData.sections.find((s) => s.id === "skills")
    if (skillsSection) {
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        doc.setTextColor(0, 0, 0) // Black text

        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ")
            skillsArray.forEach((skill, index) => {
                leftColY = checkForPageBreak(doc, leftColY, margin)
                // Skill name and percentage
                doc.text(skill, margin, leftColY)
                const percentage = 90 - index * 5
                doc.text(`${percentage}%`, 10 + colWidth - 10, leftColY)
                leftColY += 5

                leftColY = checkForPageBreak(doc, leftColY, margin)
                // Progress bar background
                doc.setDrawColor(200, 200, 200) // Gray
                doc.setFillColor(200, 200, 200) // Gray
                doc.roundedRect(margin, leftColY, colWidth - 10, 3, 1, 1, "F")

                // Progress bar fill
                doc.setFillColor(213, 63, 140) // Pink
                doc.roundedRect(margin, leftColY, (colWidth - 10) * (percentage / 100), 3, 1, 1, "F")

                leftColY += 8
            })
        })
    }

}
function checkForPageBreak(doc: jsPDF, currentY: number, margin: number): number {
    const pageHeight = 297;
    const bottomMargin = 15;

    if (currentY + bottomMargin > pageHeight) {
        doc.addPage();
        return margin;
    }

    return currentY;
}