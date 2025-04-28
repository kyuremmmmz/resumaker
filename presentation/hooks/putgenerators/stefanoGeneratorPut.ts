import { ResumeData } from "@/types/initial-data"
import { SoftwareEngineerResume } from "@/types/postData"
import jsPDF from "jspdf"

export default function generateStefanoPDFPut(doc: jsPDF, resumeData: ResumeData, profileImage: string | null, resume:SoftwareEngineerResume) {
    // Page dimensions and margins
    const pageWidth = 210 // A4 width in mm
    const margin = 10
    const columnWidth = (pageWidth - 3 * margin) / 2 

    // Dark header
    doc.setFillColor(31, 41, 55) // dark gray
    doc.rect(0, 0, 210, 40, "F") // Full width header

    // Get contact info
    const contactSection = resumeData.sections.find((s) => s.id === "contact")
    const fullName = resume.name;
    const jobTitle = resume.JobTitle;

    // Add profile image placeholder (gray circle)
    doc.setFillColor(150, 150, 150) // gray
    doc.circle(20, 20, 10, "F")
    if (profileImage) {
        doc.addImage(profileImage, 'JPEG', 10, 10, 20, 20); 
    }

    // Add name and job title
    doc.setTextColor(255, 255, 255) // white text
    doc.setFontSize(16)
    doc.text(fullName, 40, 15)
    doc.setFontSize(12)
    doc.text(String(jobTitle), 40, 25)

    const yOffset = 50 // Start content below header

    // Define left and right column sections
    const leftColumnSections = ["summary", "experience"]
    const rightColumnSections = ["contact", "education", "skills", "certifications", "languages"]

    // Track maximum y-position for each column
    let maxLeftYOffset = yOffset
    let maxRightYOffset = yOffset

    // Process left column sections
    resumeData.sections
        .filter((section) => leftColumnSections.includes(section.id))
        .forEach((section) => {
            // Section title
            doc.setTextColor(0, 0, 0) // black text
            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.text(section.title, margin, maxLeftYOffset)
            maxLeftYOffset += 6

            // Section content
            doc.setFont("helvetica", "normal")
            doc.setFontSize(10)

            if (section.id === "summary") {
                section.fields.forEach((field) => {
                    const textLines = doc.splitTextToSize(String(resume.aboutMe), columnWidth)
                    textLines.forEach((line: string) => {
                        maxLeftYOffset += 5
                        doc.text(line, margin, maxLeftYOffset)
                    })
                })
            } else if (section.id === "experience") {
                // Group fields by job
                const jobTitles = section.fields.filter((f) => f.id.startsWith("jobTitle"))

                jobTitles.forEach((titleField) => {
                    const index = titleField.id.replace("jobTitle", "")

                    maxLeftYOffset += 8
                    doc.setFont("helvetica", "bold")
                    doc.text(titleField.value, margin, maxLeftYOffset)

                    const company = section.fields.find((f) => f.id === `company${index}`)?.value || ""
                    const dates = section.fields.find((f) => f.id === `dates${index}`)?.value || ""

                    maxLeftYOffset += 5
                    doc.setFont("helvetica", "normal")
                    doc.text(`${company}, ${dates}`, margin, maxLeftYOffset)

                    const description = section.fields.find((f) => f.id === `description${index}`)?.value || ""
                    const descLines = doc.splitTextToSize(description, columnWidth)

                    descLines.forEach((line: string) => {
                        maxLeftYOffset += 5
                        doc.text(line, margin, maxLeftYOffset)
                    })
                })
            }

            maxLeftYOffset += 10 // Space between sections
        })

    // Process right column sections
    resumeData.sections
        .filter((section) => rightColumnSections.includes(section.id))
        .forEach((section) => {
            const xPos = margin * 2 + columnWidth

            // Section title
            doc.setTextColor(0, 0, 0) // black text
            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.text(section.title, xPos, maxRightYOffset)
            maxRightYOffset += 6

            // Section content
            doc.setFont("helvetica", "normal")
            doc.setFontSize(10)

            if (section.id === "contact") {
                section.fields.forEach((field) => {
                    maxRightYOffset += 5
                    doc.setFont("helvetica", "bold")
                    doc.text(`${field.label}:`, xPos, maxRightYOffset)
                    doc.setFont("helvetica", "normal")
                    doc.text(field.value, xPos + 25, maxRightYOffset)
                })
            } else if (section.id === "education") {
                maxRightYOffset += 5
                doc.setFont("helvetica", "bold")
                doc.text(section.fields.find((f) => f.id === "degree")?.value || "", xPos, maxRightYOffset)

                const university = section.fields.find((f) => f.id === "university")?.value || ""
                const dates = section.fields.find((f) => f.id === "eduDates")?.value || ""

                maxRightYOffset += 5
                doc.setFont("helvetica", "normal")
                doc.text(`${university}, ${dates}`, xPos, maxRightYOffset)

                const gpa = resume.gpa;
                if (gpa) {
                    maxRightYOffset += 5
                    doc.text(`GPA: ${gpa}`, xPos, maxRightYOffset)
                }
            }  else if (section.id === "certifications") {
                // Group certifications
                const certNames = section.fields.filter((f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"))

                certNames.forEach((cert) => {
                    const index = cert.id.replace("cert", "")
                    const date = section.fields.find((f) => f.id === `certDate${index}`)?.value || ""

                    maxRightYOffset += 5
                    doc.text(`• ${cert.value} (${date})`, xPos, maxRightYOffset)
                })
            }

            maxRightYOffset += 10
        })
}