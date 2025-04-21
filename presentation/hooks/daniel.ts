import { ResumeData } from "@/types/initial-data"
import { jsPDF } from "jspdf"

export default function generateDanielPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
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

    // Header
    let yPos = 20
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text(fullName, margin, yPos)

    yPos += 10
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text(jobTitle, margin, yPos)

    yPos += 8
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`${location} | ${email} | ${website}`, margin, yPos)

    yPos += 15

    doc.setFillColor(240, 240, 240)
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 10, 2, 2, "F")

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("INTRODUCTION", margin + 5, yPos + 7)

    yPos += 15

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    const summary =
        resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value || ""
    const summaryLines = doc.splitTextToSize(summary, pageWidth - 2 * margin)
    summaryLines.forEach((line: string) => {
        doc.text(line, margin, yPos)
        yPos += 5
    })

    yPos += 10

    // Technical Skills
    doc.setFillColor(240, 240, 240) // Light gray
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 10, 2, 2, "F")

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("TECHNICAL SKILLS", margin + 5, yPos + 7)

    yPos += 15

    const skillsSection = resumeData.sections.find((s) => s.id === "skills")
    if (skillsSection) {
        // Create a 3-column layout for skills
        const skillColWidth = (pageWidth - 2 * margin) / 3
        let skillsArray: string[] = []

        skillsSection.fields.forEach((field) => {
            skillsArray = skillsArray.concat(field.value.split(", "))
        })

        // Distribute skills across 3 columns
        const col1 = skillsArray.slice(0, Math.ceil(skillsArray.length / 3))
        const col2 = skillsArray.slice(Math.ceil(skillsArray.length / 3), Math.ceil((2 * skillsArray.length) / 3))
        const col3 = skillsArray.slice(Math.ceil((2 * skillsArray.length) / 3))

        const maxSkills = Math.max(col1.length, col2.length, col3.length)
        const startY = yPos

        for (let i = 0; i < maxSkills; i++) {
            if (i < col1.length) {
                doc.text(col1[i], margin, startY + i * 5)
            }
            if (i < col2.length) {
                doc.text(col2[i], margin + skillColWidth, startY + i * 5)
            }
            if (i < col3.length) {
                doc.text(col3[i], margin + 2 * skillColWidth, startY + i * 5)
            }
        }

        yPos += maxSkills * 5 + 10
    }

    // Work Experience
    doc.setFillColor(240, 240, 240) // Light gray
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 10, 2, 2, "F")

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("WORK EXPERIENCE", margin + 5, yPos + 7)

    yPos += 15

    const experienceSection = resumeData.sections.find((s) => s.id === "experience")
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"))

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "")

            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.text(titleField.value, margin, yPos)

            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || ""
            doc.setFontSize(10)
            doc.setFont("helvetica", "normal")
            const dateWidth = doc.getTextWidth(dates)
            doc.text(dates, pageWidth - margin - dateWidth, yPos)

            yPos += 6

            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || ""
            doc.text(company, margin, yPos)
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

    // Education
    doc.setFillColor(240, 240, 240) // Light gray
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 10, 2, 2, "F")

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("EDUCATION", margin + 5, yPos + 7)

    yPos += 15

    const educationSection = resumeData.sections.find((s) => s.id === "education")
    if (educationSection) {
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || ""
        doc.text(degree, margin, yPos)

        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || ""
        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        const dateWidth = doc.getTextWidth(dates)
        doc.text(dates, pageWidth - margin - dateWidth, yPos)

        yPos += 6

        const university = educationSection.fields.find((f) => f.id === "university")?.value || ""
        doc.text(university, margin, yPos)
        yPos += 10
    }

    // Additional Information
    doc.setFillColor(240, 240, 240) // Light gray
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 10, 2, 2, "F")

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("ADDITIONAL INFORMATION", margin + 5, yPos + 7)

    yPos += 15

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    // Languages
    const languages =
        resumeData.sections.find((s) => s.id === "languages")?.fields.find((f) => f.id === "languages")?.value || ""
    if (languages) {
        doc.setFont("helvetica", "bold")
        doc.text("Languages:", margin, yPos)
        doc.setFont("helvetica", "normal")
        doc.text(languages, margin + 25, yPos)
        yPos += 6
    }

    // Certifications
    const certificationsSection = resumeData.sections.find((s) => s.id === "certifications")
    if (certificationsSection && certificationsSection.fields.length > 0) {
        doc.setFont("helvetica", "bold")
        doc.text("Certifications:", margin, yPos)
        doc.setFont("helvetica", "normal")

        // Group certifications
        const certNames = certificationsSection.fields.filter(
            (f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"),
        )

        const certTexts = certNames.map((cert) => {
            const index = cert.id.replace("cert", "")
            const date = certificationsSection.fields.find((f) => f.id === `certDate${index}`)?.value || ""
            return `${cert.value} (${date})`
        })

        doc.text(certTexts.join(", "), margin + 30, yPos)
    }
}