import { ResumeData } from "@/types/initial-data"
import jsPDF from "jspdf"

export default function generateSamiraPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
    // Page dimensions and margins
    const pageWidth = 210 // A4 width in mm
    const margin = 15

    // Get contact info
    const contactSection = resumeData.sections.find((s) => s.id === "contact")
    const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
    const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"

    // Header
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(fullName, margin, 20)

    doc.setFontSize(16)
    doc.setFont("helvetica", "normal")
    doc.text(jobTitle, margin, 30)

    // Contact information
    let yPos = 45
    doc.setFontSize(11)

    const email = contactSection?.fields.find((f) => f.id === "email")?.value
    const phone = contactSection?.fields.find((f) => f.id === "phone")?.value
    const location = contactSection?.fields.find((f) => f.id === "location")?.value
    const website = contactSection?.fields.find((f) => f.id === "website")?.value

    if (phone) {
        doc.text(`Phone: ${phone}`, margin, yPos)
        yPos += 6
    }

    if (email) {
        doc.text(`Email: ${email}`, margin, yPos)
        yPos += 6
    }

    if (location) {
        doc.text(`Address: ${location}`, margin, yPos)
        yPos += 6
    }

    if (website) {
        doc.text(`Website: ${website}`, margin, yPos)
        yPos += 6
    }

    // Divider
    yPos += 5
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 10

    // Work Experience
    const experienceSection = resumeData.sections.find((s) => s.id === "experience")
    if (experienceSection) {
        doc.setFontSize(16)
        doc.setFont("helvetica", "bold")
        doc.text("WORK EXPERIENCE", margin, yPos)
        yPos += 10

        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"))

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "")

            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.text(titleField.value, margin, yPos)
            yPos += 6

            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || ""
            doc.setFont("helvetica", "normal")
            doc.text(company, margin, yPos)
            yPos += 6

            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || ""
            doc.text(dates, margin, yPos)
            yPos += 6

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || ""
            const descLines = doc.splitTextToSize(description, pageWidth - 2 * margin)

            doc.setFontSize(10)
            descLines.forEach((line: string) => {
                doc.text(`• ${line}`, margin + 5, yPos)
                yPos += 5
            })

            yPos += 5
        })
    }

    // Education
    yPos += 5
    const educationSection = resumeData.sections.find((s) => s.id === "education")
    if (educationSection) {
        doc.setFontSize(16)
        doc.setFont("helvetica", "bold")
        doc.text("EDUCATION", margin, yPos)
        yPos += 10

        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.text(educationSection.fields.find((f) => f.id === "degree")?.value || "", margin, yPos)
        yPos += 6

        const university = educationSection.fields.find((f) => f.id === "university")?.value || ""
        doc.setFont("helvetica", "normal")
        doc.text(university, margin, yPos)
        yPos += 6

        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || ""
        doc.text(dates, margin, yPos)
        yPos += 6

        const gpa = educationSection.fields.find((f) => f.id === "gpa")?.value
        if (gpa) {
            doc.text(`GPA: ${gpa}`, margin, yPos)
            yPos += 6
        }
    }

    // Skills
    yPos += 5
    const skillsSection = resumeData.sections.find((s) => s.id === "skills")
    if (skillsSection) {
        doc.setFontSize(16)
        doc.setFont("helvetica", "bold")
        doc.text("SKILLS", margin, yPos)
        yPos += 10

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        skillsSection.fields.forEach((field) => {
            doc.setFont("helvetica", "bold")
            doc.text(`${field.label}:`, margin, yPos)
            yPos += 5

            doc.setFont("helvetica", "normal")
            const skillsArray = field.value.split(", ")
            skillsArray.forEach((skill) => {
                doc.text(`• ${skill}`, margin + 5, yPos)
                yPos += 5
            })

            yPos += 3
        })
    }

    // Certifications
    const certificationsSection = resumeData.sections.find((s) => s.id === "certifications")
    if (certificationsSection && certificationsSection.fields.length > 0) {
        yPos += 5
        doc.setFontSize(16)
        doc.setFont("helvetica", "bold")
        doc.text("CERTIFICATIONS", margin, yPos)
        yPos += 10

        doc.setFontSize(10)

        // Group certifications
        const certNames = certificationsSection.fields.filter(
            (f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"),
        )

        certNames.forEach((cert) => {
            const index = cert.id.replace("cert", "")
            const date = certificationsSection.fields.find((f) => f.id === `certDate${index}`)?.value || ""

            doc.text(`• ${cert.value} (${date})`, margin, yPos)
            yPos += 5
        })
    }
}