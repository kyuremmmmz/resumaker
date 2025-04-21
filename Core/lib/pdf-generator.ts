
import { ResumeData } from "@/types/initial-data";
import jsPDF from "jspdf"


function checkForPageBreak(doc: jsPDF, yPos: number, margin: number = 10): number {
    const pageHeight = 297;
    const safeArea = pageHeight - margin * 2;

    if (yPos > safeArea) {
        doc.addPage();
        return margin + 10;
    }

    return yPos;
}

export async function generatePDF(resumeData: ResumeData, profileImage: string | null, templateName: string) {
    const doc = new jsPDF()

    const pageHeight = 297
    const pageWidth = 210
    const margin = 10

    const contactSection = resumeData.sections.find((s) => s.id === "contact")
    const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
    const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"

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

// Add the email sending function
export async function sendResumeByEmail(resumeData: ResumeData, profileImage: string | null, templateName: string, email: string) {
    try {
        // First generate the PDF
        const doc = new jsPDF();

        // Generate PDF based on template
        switch (templateName) {
            case "stefano":
                generateStefanoPDF(doc, resumeData, profileImage);
                break;
            case "samira":
                generateSamiraPDF(doc, resumeData, profileImage);
                break;
            case "kathryn":
                generateKathrynPDF(doc, resumeData, profileImage);
                break;
            case "olivia":
                generateOliviaPDF(doc, resumeData, profileImage);
                break;
            case "lorna":
                generateLornaPDF(doc, resumeData, profileImage);
                break;
            case "margot":
                generateMargotPDF(doc, resumeData, profileImage);
                break;
            case "rachelle":
                generateRachellePDF(doc, resumeData, profileImage);
                break;
            case "daniel":
                generateDanielPDF(doc, resumeData, profileImage);
                break;
            case "catriana":
                generateCatrianaPDF(doc, resumeData, profileImage);
                break;
            case "juliana":
                generateJulianaPDF(doc, resumeData, profileImage);
                break;
            default:
                generateStefanoPDF(doc, resumeData, profileImage);
        }


        const pdfBase64 = doc.output('datauristring').split(',')[1];
        const response = await fetch('http://localhost:8080/api/mail/sendMailWithDynamicPdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                pdfBase64,
                fileName: `resume-${templateName}-template.pdf`,
                fullName: resumeData.sections.find(s => s.id === "contact")?.fields.find(f => f.id === "fullName")?.value || "Resume"
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        return { success: true, message: 'Resume sent successfully!' };
    } catch (error) {
        console.error('Error sending resume by email:', error);
        return { success: false, message: 'Failed to send resume. Please try again.' };
    }
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

function generateMargotPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
    // Page dimensions and margins
    const pageWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const margin = 15
    const colWidth = 70 // Width for left column

    // Get contact info
    const contactSection = resumeData.sections.find((s) => s.id === "contact")
    const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
    const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"
    const email = contactSection?.fields.find((f) => f.id === "email")?.value || ""
    const phone = contactSection?.fields.find((f) => f.id === "phone")?.value || ""
    const location = contactSection?.fields.find((f) => f.id === "location")?.value || ""
    const website = contactSection?.fields.find((f) => f.id === "website")?.value || ""


    doc.setFillColor(75, 0, 130, 0.1) // Light indigo
    doc.rect(0, 0, colWidth, pageHeight, "F")

    // Left column - Contact info and skills
    let leftColY = 60 // Start after profile image space

    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(75, 0, 130) // Indigo text
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

function generateRachellePDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
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

    // Left column - Profile image, education, skills
    let leftColY = 60 // Start after profile image space

    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(213, 63, 140) // Pink text
    doc.text("EDUCATION", margin, leftColY)
    leftColY += 8

    doc.setDrawColor(200, 200, 200) // Gray line
    doc.setLineWidth(0.5)
    doc.line(margin, leftColY, margin + colWidth, leftColY)
    leftColY += 10

    const educationSection = resumeData.sections.find((s) => s.id === "education")
    if (educationSection) {
        doc.setFontSize(10)
        doc.setFont("helvetica", "bold")
        doc.setTextColor(0, 0, 0) // Black text

        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || ""
        doc.text(dates, margin, leftColY)
        leftColY += 6

        const university = educationSection.fields.find((f) => f.id === "university")?.value || ""
        doc.text(university, margin, leftColY)
        leftColY += 6

        doc.setFont("helvetica", "normal")
        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || ""
        doc.text(`• ${degree}`, margin, leftColY)
        leftColY += 15
    }

    // Skills with progress bars
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(213, 63, 140) // Pink text
    doc.text("SKILL", margin, leftColY)
    leftColY += 8

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
                // Skill name and percentage
                doc.text(skill, margin, leftColY)
                const percentage = 90 - index * 5
                doc.text(`${percentage}%`, margin + colWidth - 10, leftColY)
                leftColY += 5

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
}

function generateDanielPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
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

function generateCatrianaPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
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
    const website = contactSection?.fields.find((f) => f.id === "website")?.value || ""

    // Header
    let yPos = 20
    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(24)
    doc.setFont("helvetica", "bold")
    doc.text(fullName, margin, yPos)

    yPos += 10
    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text(jobTitle, margin, yPos)

    yPos += 15

    // Two column layout for header
    const colWidth = (pageWidth - 3 * margin) / 2

    // Introduction
    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("INTRODUCTION", margin, yPos)

    yPos += 8

    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    const summary =
        resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value || ""
    const summaryLines = doc.splitTextToSize(summary, colWidth)
    summaryLines.forEach((line: string) => {
        doc.text(line, margin, yPos)
        yPos += 5
    })

    // Contact info (right column)
    const rightColMargin = margin * 2 + colWidth
    let rightColY = yPos - summaryLines.length * 5 - 8 // Align with introduction heading

    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("CONTACT INFO", rightColMargin, rightColY)

    rightColY += 8

    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    if (email) {
        doc.setFont("helvetica", "bold")
        doc.text("Email:", rightColMargin, rightColY)
        doc.setFont("helvetica", "normal")
        doc.text(email, rightColMargin + 20, rightColY)
        rightColY += 6
    }

    if (website) {
        doc.setFont("helvetica", "bold")
        doc.text("Website:", rightColMargin, rightColY)
        doc.setFont("helvetica", "normal")
        doc.text(website, rightColMargin + 20, rightColY)
        rightColY += 6
    }

    if (phone) {
        doc.setFont("helvetica", "bold")
        doc.text("Phone:", rightColMargin, rightColY)
        doc.setFont("helvetica", "normal")
        doc.text(phone, rightColMargin + 20, rightColY)
        rightColY += 6
    }

    // Continue with main content
    yPos += 10

    // Work Experience
    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("WORK EXPERIENCE", margin, yPos)

    yPos += 8

    doc.setDrawColor(0, 102, 204) // Blue line
    doc.setLineWidth(0.5)
    doc.line(margin, yPos, pageWidth - margin, yPos)

    yPos += 10

    const experienceSection = resumeData.sections.find((s) => s.id === "experience")
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"))

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "")

            doc.setTextColor(0, 0, 0) // Black text
            doc.setFontSize(12)
            doc.setFont("helvetica", "bold")
            doc.text(titleField.value, margin, yPos)
            yPos += 6

            doc.setFontSize(10)
            doc.setFont("helvetica", "normal")
            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || ""
            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || ""
            doc.text(`${company} | ${dates}`, margin, yPos)
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

    // Two column layout for education and skills
    const eduStartY = yPos

    // Education (left column)
    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("EDUCATION", margin, eduStartY)

    let leftColY = eduStartY + 8

    const educationSection = resumeData.sections.find((s) => s.id === "education")
    if (educationSection) {
        doc.setTextColor(0, 0, 0) // Black text
        doc.setFontSize(12)
        doc.setFont("helvetica", "bold")
        const university = educationSection.fields.find((f) => f.id === "university")?.value || ""
        doc.text(university, margin, leftColY)
        leftColY += 6

        doc.setFontSize(10)
        doc.setFont("helvetica", "normal")
        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || ""
        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || ""
        doc.text(`${degree} | ${dates}`, margin, leftColY)
        leftColY += 6

        const gpa = educationSection.fields.find((f) => f.id === "gpa")?.value || ""
        if (gpa) {
            doc.text(`GPA: ${gpa}`, margin, leftColY)
            leftColY += 6
        }
    }

    // Skills (right column)
    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("SKILLS", rightColMargin, eduStartY)

    let skillsY = eduStartY + 8

    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    const skillsSection = resumeData.sections.find((s) => s.id === "skills")
    if (skillsSection) {
        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ")
            skillsArray.forEach((skill) => {
                doc.text(skill, rightColMargin, skillsY)
                skillsY += 5
            })
        })
    }

    // Certifications
    const certY = Math.max(leftColY, skillsY) + 10

    doc.setTextColor(0, 102, 204) // Blue text
    doc.setFontSize(14)
    doc.setFont("helvetica", "bold")
    doc.text("CERTIFICATIONS", rightColMargin, certY)

    let certItemY = certY + 8

    doc.setTextColor(0, 0, 0) // Black text
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    const certificationsSection = resumeData.sections.find((s) => s.id === "certifications")
    if (certificationsSection) {
        // Group certifications
        const certNames = certificationsSection.fields.filter(
            (f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"),
        )

        certNames.forEach((cert) => {
            const index = cert.id.replace("cert", "")
            const date = certificationsSection.fields.find((f) => f.id === `certDate${index}`)?.value || ""

            doc.text(`${cert.value} (${date})`, rightColMargin, certItemY)
            certItemY += 6
        })
    }
}

function generateJulianaPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null) {
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
