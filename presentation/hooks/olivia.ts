import { ResumeData } from "@/types/initial-data"
import jsPDF from "jspdf"

export default function generateOliviaPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
    // Page dimensions and margins
    const pageWidth = 210 // A4 width in mm
    const margin = 15
    const colWidth = 70 // Width for left column

    // Background color for left column
    doc.setFillColor(245, 245, 245) // Light gray
    doc.rect(0, 0, colWidth, 297, "F") // Full height

    // Get contact info
    const contactSection = resumeData.sections.find((s) => s.id === "contact")
    const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
    const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"

    // Header
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(fullName, colWidth + margin, 25)

    doc.setFontSize(16)
    doc.setFont("helvetica", "normal")
    doc.text(jobTitle, colWidth + margin, 35)

    // Profile section
    let rightColY = 50
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Profile", colWidth + margin, rightColY)
    rightColY += 8

    // Summary as profile
    const summarySection = resumeData.sections.find((s) => s.id === "summary")
    if (summarySection) {
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")

        const summary = summarySection.fields.find((f) => f.id === "summary")?.value || ""
        const summaryLines = doc.splitTextToSize(summary, pageWidth - colWidth - 2 * margin)

        summaryLines.forEach((line: string) => {
            doc.text(line, colWidth + margin, rightColY)
            rightColY += 5
        })
    }

    // Work Experience
    rightColY += 10
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Work Experience", colWidth + margin, rightColY)
    rightColY += 8

    const experienceSection = resumeData.sections.find((s) => s.id === "experience")
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"))

        jobTitles.forEach((titleField, idx) => {
            const index = titleField.id.replace("jobTitle", "")

            // Draw timeline dot
            doc.setFillColor(150, 150, 150)
            doc.circle(colWidth + margin - 5, rightColY - 2, 2, "F")

            // Draw timeline line if not last item
            if (idx < jobTitles.length - 1) {
                doc.setDrawColor(150, 150, 150)
                doc.setLineWidth(0.5)
                doc.line(colWidth + margin - 5, rightColY, colWidth + margin - 5, rightColY + 30)
            }

            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.text(titleField.value, colWidth + margin, rightColY)
            rightColY += 6

            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || ""
            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || ""

            doc.setFontSize(10)
            doc.setFont("helvetica", "normal")
            doc.text(`${company}, ${dates}`, colWidth + margin, rightColY)
            rightColY += 6

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || ""
            const descLines = doc.splitTextToSize(description, pageWidth - colWidth - 2 * margin)

            descLines.forEach((line: string) => {
                doc.text(`• ${line}`, colWidth + margin, rightColY)
                rightColY += 5
            })

            rightColY += 8
        })
    }

    // Left column - Contact, Education, Skills
    let leftColY = 50

    // Contact information
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Contact", margin, leftColY)
    leftColY += 8

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")

    const email = contactSection?.fields.find((f) => f.id === "email")?.value
    const phone = contactSection?.fields.find((f) => f.id === "phone")?.value
    const location = contactSection?.fields.find((f) => f.id === "location")?.value
    const website = contactSection?.fields.find((f) => f.id === "website")?.value

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

    if (website) {
        doc.text(`Website: ${website}`, margin, leftColY)
        leftColY += 5
    }

    // Education
    leftColY += 10
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Education", margin, leftColY)
    leftColY += 8

    const educationSection = resumeData.sections.find((s) => s.id === "education")
    if (educationSection) {
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")

        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || ""
        doc.splitTextToSize(degree, colWidth - 20).forEach((line: string) => {
            doc.text(line, margin, leftColY)
            leftColY += 5
        })


        doc.setFont("helvetica", "normal")
        const university = educationSection.fields.find((f) => f.id === "university")?.value || ""
        doc.text(university, margin, leftColY)
        leftColY += 5

        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || ""
        doc.text(dates, margin, leftColY)
        leftColY += 5

        const gpa = educationSection.fields.find((f) => f.id === "gpa")?.value
        if (gpa) {
            doc.text(`GPA: ${gpa}`, margin, leftColY)
            leftColY += 5
        }
    }

    // Skills
    leftColY += 10
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("Skills", margin, leftColY)
    leftColY += 8

    const skillsSection = resumeData.sections.find((s) => s.id === "skills")
    if (skillsSection) {
        doc.setFontSize(9)
        doc.setFont("helvetica", "normal")

        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ")
            skillsArray.forEach((skill) => {
                doc.text(skill, margin, leftColY)
                leftColY += 5
            })
        })
    }
}