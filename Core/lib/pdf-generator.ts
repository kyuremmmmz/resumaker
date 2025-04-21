
import { ResumeData } from "@/types/initial-data"
import jsPDF from "jspdf"

export async function generatePDF(resumeData: ResumeData, profileImage: string | null, templateName: string) {
    // Create PDF document
    const doc = new jsPDF()

    // Page dimensions and margins
    const pageHeight = 297 // A4 height in mm
    const pageWidth = 210 // A4 width in mm
    const margin = 10

    // Get contact info
    const contactSection = resumeData.sections.find((s) => s.id === "contact")
    const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
    const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"

    // Generate PDF based on template
    switch (templateName) {
        case "stefano":
            generateStefanoPDF(doc, resumeData, profileImage)
            break
        case "samira":
            generateSamiraPDF(doc, resumeData, profileImage)
            break
        case "kathryn":
            generateKathrynPDF(doc, resumeData, profileImage)
            break
        case "olivia":
            generateOliviaPDF(doc, resumeData, profileImage)
            break
        case "lorna":
            generateLornaPDF(doc, resumeData, profileImage)
            break
        case "margot":
            generateMargotPDF(doc, resumeData, profileImage)
            break
        case "rachelle":
            generateRachellePDF(doc, resumeData, profileImage)
            break
        case "daniel":
            generateDanielPDF(doc, resumeData, profileImage)
            break
        case "catriana":
            generateCatrianaPDF(doc, resumeData, profileImage)
            break
        case "juliana":
            generateJulianaPDF(doc, resumeData, profileImage)
            break
        default:
            generateStefanoPDF(doc, resumeData, profileImage)
    }

    // Save PDF
    doc.save(`resume-${templateName}-template.pdf`)
}

function generateStefanoPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
    // Page dimensions and margins
    const pageWidth = 210 // A4 width in mm
    const margin = 10
    const columnWidth = (pageWidth - 3 * margin) / 2 // Two columns with margin in between

    // Dark header
    doc.setFillColor(31, 41, 55) // dark gray
    doc.rect(0, 0, 210, 40, "F") // Full width header

    // Get contact info
    const contactSection = resumeData.sections.find((s) => s.id === "contact")
    const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
    const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"

    // Add profile image placeholder (gray circle)
    doc.setFillColor(150, 150, 150) // gray
    doc.circle(20, 20, 10, "F") // Circle at x=20, y=20, radius=10

    // Add name and job title
    doc.setTextColor(255, 255, 255) // white text
    doc.setFontSize(16)
    doc.text(fullName, 40, 15)
    doc.setFontSize(12)
    doc.text(jobTitle, 40, 25)

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
                    const textLines = doc.splitTextToSize(field.value, columnWidth)
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

                const gpa = section.fields.find((f) => f.id === "gpa")?.value
                if (gpa) {
                    maxRightYOffset += 5
                    doc.text(`GPA: ${gpa}`, xPos, maxRightYOffset)
                }
            } else if (section.id === "skills" || section.id === "languages") {
                section.fields.forEach((field) => {
                    maxRightYOffset += 5
                    doc.setFont("helvetica", "bold")
                    doc.text(`${field.label}:`, xPos, maxRightYOffset)

                    const skillsArray = field.value.split(", ")
                    let skillText = ""

                    skillsArray.forEach((skill, index) => {
                        if (index % 3 === 0 && index > 0) {
                            maxRightYOffset += 5
                            doc.setFont("helvetica", "normal")
                            doc.text(skillText, xPos, maxRightYOffset)
                            skillText = skill
                        } else {
                            if (skillText) skillText += ", "
                            skillText += skill
                        }
                    })

                    if (skillText) {
                        maxRightYOffset += 5
                        doc.setFont("helvetica", "normal")
                        doc.text(skillText, xPos, maxRightYOffset)
                    }
                })
            } else if (section.id === "certifications") {
                // Group certifications
                const certNames = section.fields.filter((f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"))

                certNames.forEach((cert) => {
                    const index = cert.id.replace("cert", "")
                    const date = section.fields.find((f) => f.id === `certDate${index}`)?.value || ""

                    maxRightYOffset += 5
                    doc.text(`• ${cert.value} (${date})`, xPos, maxRightYOffset)
                })
            }

            maxRightYOffset += 10 // Space between sections
        })
}

function generateSamiraPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
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

function generateKathrynPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
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

function generateOliviaPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
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
        doc.text(degree, margin, leftColY)
        leftColY += 5

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

// Implement the remaining PDF generator functions for other templates
function generateLornaPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
    // Implementation for Lorna template
    // Similar structure to the other generators
}

function generateMargotPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
    // Implementation for Margot template
}

function generateRachellePDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
    // Implementation for Rachelle template
}

function generateDanielPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
    // Implementation for Daniel template
}

function generateCatrianaPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
    // Implementation for Catriana template
}

function generateJulianaPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
    // Implementation for Juliana template
}
