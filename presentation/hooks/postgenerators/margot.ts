import { ResumeData } from "@/types/initial-data"
import jsPDF from "jspdf"

export default function generateMargotPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
    // Page dimensions and margins
    const pageWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const margin = 15
    const colWidth = 70 

    // Get contact info
    const contactSection = resumeData.sections.find((s) => s.id === "contact")
    const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
    const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"
    const email = contactSection?.fields.find((f) => f.id === "email")?.value || ""
    const phone = contactSection?.fields.find((f) => f.id === "phone")?.value || ""
    const location = contactSection?.fields.find((f) => f.id === "location")?.value || ""
    const website = contactSection?.fields.find((f) => f.id === "website")?.value || ""


    let leftColY = 80
    if (profileImage) {
        doc.addImage(profileImage, 'JPEG', 15, 15, 50, 50);
    }

    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(75, 0, 130) 
    doc.text("CONTACT INFO", margin, leftColY)
    leftColY += 10

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0) // Black text

    if (phone) {
        doc.text(`Phone: ${phone}`, margin, leftColY)
        leftColY += 6
    }

    if (email) {
        doc.text(`Email: ${email}`, margin, leftColY)
        leftColY += 6
    }

    if (location) {
        doc.text(`Address: ${location}`, margin, leftColY)
        leftColY += 6
    }

    if (website) {
        doc.text(`Website: ${website}`, margin, leftColY)
        leftColY += 6
    }

    // Skills
    leftColY += 15
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(75, 0, 130) // Indigo text
    doc.text("SKILLS", margin, leftColY)
    leftColY += 10

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0) // Black text

    const skillsSection = resumeData.sections.find((s) => s.id === "skills")
    if (skillsSection) {
        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ")
            skillsArray.forEach((skill) => {
                doc.text(`• ${skill}`, margin, leftColY)
                leftColY += 6
            })
        })
    }

    // Right column - Name, summary, education, experience
    const rightColMargin = colWidth + margin
    let rightColY = 30

    // Name and title
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(75, 0, 130) // Indigo text
    doc.text(fullName, rightColMargin, rightColY)
    rightColY += 15

    // Summary
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0) // Black text

    const summary =
        resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value || ""
    const summaryLines = doc.splitTextToSize(summary, pageWidth - rightColMargin - margin)
    summaryLines.forEach((line: string) => {
        doc.text(line, rightColMargin, rightColY)
        rightColY += 5
    })

    // Areas of expertise
    rightColY += 10
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(75, 0, 130) // Indigo text
    doc.text("AREAS OF EXPERTISE", rightColMargin, rightColY)
    rightColY += 8

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0) // Black text
    const expertiseText =
        "I've worked with various types of projects and have mastered multiple programming languages and coding as well as software testing and debugging."
    const expertiseLines = doc.splitTextToSize(expertiseText, pageWidth - rightColMargin - margin)
    expertiseLines.forEach((line: string) => {
        doc.text(line, rightColMargin, rightColY)
        rightColY += 5
    })

    rightColY += 10
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(75, 0, 130) 
    doc.text("EDUCATION", rightColMargin, rightColY)
    rightColY += 8

    const educationSection = resumeData.sections.find((s) => s.id === "education")
    if (educationSection) {
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(0, 0, 0) // Black text

        const university = educationSection.fields.find((f) => f.id === "university")?.value || ""
        doc.text(university, rightColMargin, rightColY)
        rightColY += 6

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || ""
        doc.text(degree, rightColMargin, rightColY)
        rightColY += 6

        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || ""
        doc.text(dates, rightColMargin, rightColY)
        rightColY += 15
    }

    // Work Experience
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(75, 0, 130) // Indigo text
    doc.text("WORK EXPERIENCE", rightColMargin, rightColY)
    rightColY += 8

    const experienceSection = resumeData.sections.find((s) => s.id === "experience")
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"))

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "")

            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.setTextColor(0, 0, 0) // Black text
            doc.text(titleField.value, rightColMargin, rightColY)
            rightColY += 6

            doc.setFontSize(10)
            doc.setFont("helvetica", "normal")
            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || ""
            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || ""
            doc.text(`${company} | ${dates}`, rightColMargin, rightColY)
            rightColY += 6

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || ""
            const descLines = doc.splitTextToSize(description, pageWidth - rightColMargin - margin)
            descLines.forEach((line: string) => {
                doc.text(line, rightColMargin, rightColY)
                rightColY += 5
            })

            rightColY += 8
        })
    }
}