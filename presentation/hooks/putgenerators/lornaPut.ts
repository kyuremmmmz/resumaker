import { ResumeData } from "@/types/initial-data";
import { SoftwareEngineerResume } from "@/types/postData";
import jsPDF from "jspdf";

export default function generateLornaPDFPut(doc: jsPDF, resumeData: ResumeData, profileImage: string | null, resume: SoftwareEngineerResume) {
    // Page dimensions and margins
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 15;
    const bottomMargin = 15; // Bottom margin to avoid content running off
    const maxY = pageHeight - bottomMargin; // Maximum y-position before page break

    // Use resume data for name and job title
    const fullName = resume.name;
    const jobTitle = resume.JobTitle;

    // Get contact info
    const contactSection = resumeData.sections.find((s) => s.id === "contact");
    const email = contactSection?.fields.find((f) => f.id === "email")?.value || "";
    const phone = contactSection?.fields.find((f) => f.id === "phone")?.value || "";
    const location = contactSection?.fields.find((f) => f.id === "location")?.value || "";

    // Helper function to check and add page break if needed
    const checkPageBreak = (currentY: number, spaceNeeded: number): number => {
        if (currentY + spaceNeeded > maxY) {
            doc.addPage();
            // Re-apply blue header on new page
            doc.setFillColor(65, 105, 225); // Royal blue
            doc.rect(0, 0, pageWidth, 60, "F");
            return margin; // Reset yPos to top margin of new page
        }
        return currentY;
    };

    // Blue diagonal header
    doc.setFillColor(65, 105, 225); // Royal blue
    doc.rect(0, 0, pageWidth, 60, "F");

    // Add name and job title
    let yPos = 70;
    yPos += 10;
    doc.setTextColor(65, 105, 225); // Blue text
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    yPos = checkPageBreak(yPos, 10);
    doc.text(fullName, margin, yPos);

    yPos += 10;
    doc.setFontSize(16);
    yPos = checkPageBreak(yPos, 10);
    doc.text(`${jobTitle}`, margin, yPos);

    yPos += 20;
    doc.setFillColor(150, 150, 150); // Gray circle
    doc.circle(30, 50, 20, "F");

    // Two column layout
    const colWidth = (pageWidth - 3 * margin) / 2;
    let leftColY = yPos;
    let rightColY = yPos;
    // Right column - Education, Work Experience
    const rightColMargin = margin * 2 + colWidth;

    // Education
    rightColY = checkPageBreak(rightColY, 18); // Section title + line
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(65, 105, 225); // Blue text
    doc.text("Education", rightColMargin, rightColY);
    rightColY += 8;

    doc.setDrawColor(65, 105, 225); // Blue line
    doc.setLineWidth(0.5);
    rightColY = checkPageBreak(rightColY, 10);
    doc.line(rightColMargin, rightColY, pageWidth - margin, rightColY);
    rightColY += 10;

    const educationSection = resumeData.sections.find((s) => s.id === "education");
    if (educationSection) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0); // Black text

        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || "";
        rightColY = checkPageBreak(rightColY, 6);
        doc.text(degree, rightColMargin, rightColY);
        rightColY += 6;

        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        const university = educationSection.fields.find((f) => f.id === "university")?.value || "";
        rightColY = checkPageBreak(rightColY, 6);
        doc.text(university, rightColMargin, rightColY);
        rightColY += 6;

        doc.setFont("helvetica", "normal");
        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || "";
        rightColY = checkPageBreak(rightColY, 6);
        doc.text(dates, rightColMargin, rightColY);
        rightColY += 6;

        const gpa = resume.gpa;
        if (gpa) {
            rightColY = checkPageBreak(rightColY, 6);
            doc.text(`GPA: ${gpa}`, rightColMargin, rightColY);
            rightColY += 6;
        }

        rightColY += 9; // Adjusted to maintain original spacing (15 - 6 for GPA)
    }

    // Work Experience
    rightColY = checkPageBreak(rightColY, 18); // Section title + line
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(65, 105, 225); // Blue text
    doc.text("Work Experience", rightColMargin, rightColY);
    rightColY += 8;

    doc.setDrawColor(65, 105, 225); // Blue line
    doc.setLineWidth(0.5);
    rightColY = checkPageBreak(rightColY, 10);
    doc.line(rightColMargin, rightColY, pageWidth - margin, rightColY);
    rightColY += 10;

    const experienceSection = resumeData.sections.find((s) => s.id === "experience");
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"));

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "");

            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 0, 0); // Black text
            rightColY = checkPageBreak(rightColY, 6);
            doc.text(titleField.value, rightColMargin, rightColY);
            rightColY += 6;

            doc.setFontSize(10);
            doc.setFont("helvetica", "italic");
            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || "";
            rightColY = checkPageBreak(rightColY, 6);
            doc.text(company, rightColMargin, rightColY);
            rightColY += 6;

            doc.setFont("helvetica", "normal");
            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || "";
            rightColY = checkPageBreak(rightColY, 6);
            doc.text(dates, rightColMargin, rightColY);
            rightColY += 6;

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || "";
            const descLines = doc.splitTextToSize(description, colWidth);
            descLines.forEach((line: string) => {
                rightColY = checkPageBreak(rightColY, 5);
                doc.text(line, rightColMargin, rightColY);
                rightColY += 5;
            });

            rightColY += 8;
        });
    }

    // Left column - Contact, Introduction (Summary), Skills, Certifications
    leftColY = checkPageBreak(leftColY, 8); // Section title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(65, 105, 225); // Blue text
    doc.text("Contact", margin, leftColY);
    leftColY += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text

    if (phone) {
        leftColY = checkPageBreak(leftColY, 5);
        doc.text(`Phone: ${phone}`, margin, leftColY);
        leftColY += 5;
    }

    if (email) {
        leftColY = checkPageBreak(leftColY, 5);
        doc.text(`Email: ${email}`, margin, leftColY);
        leftColY += 5;
    }

    if (location) {
        leftColY = checkPageBreak(leftColY, 5);
        doc.text(`Address: ${location}`, margin, leftColY);
        leftColY += 5;
    }

    // Introduction (Summary)
    leftColY = checkPageBreak(leftColY, 23); // Section title + spacing
    leftColY += 15;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(65, 105, 225); // Blue text
    doc.text("Introduction", margin, leftColY);
    leftColY += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text

    const summaryText = resume.aboutMe || "";
    const summaryLines = doc.splitTextToSize(summaryText, colWidth);
    summaryLines.forEach((line: string) => {
        leftColY = checkPageBreak(leftColY, 5);
        doc.text(line, margin, leftColY);
        leftColY += 5;
    });

    // Skills
    leftColY = checkPageBreak(leftColY, 23); // Section title + spacing
    leftColY += 15;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(65, 105, 225); // Blue text
    doc.text("Skills", margin, leftColY);
    leftColY += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text

    const skillsSection = resumeData.sections.find((s) => s.id === "skills");
    if (skillsSection) {
        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ");
            skillsArray.forEach((skill) => {
                leftColY = checkPageBreak(leftColY, 5);
                doc.text(`• ${skill}`, margin, leftColY);
                leftColY += 5;
            });
        });
    }

    // Certifications
    const certificationsSection = resumeData.sections.find((s) => s.id === "certifications");
    if (certificationsSection && certificationsSection.fields.length > 0) {
        leftColY = checkPageBreak(leftColY, 23); // Section title + spacing
        leftColY += 15;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(65, 105, 225); // Blue text
        doc.text("Certifications", margin, leftColY);
        leftColY += 8;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0); // Black text

        // Group certifications
        const certNames = certificationsSection.fields.filter(
            (f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"),
        );

        certNames.forEach((cert) => {
            const index = cert.id.replace("cert", "");
            const date = certificationsSection.fields.find((f) => f.id === `certDate${index}`)?.value || "";

            leftColY = checkPageBreak(leftColY, 5);
            doc.text(`• ${cert.value} (${date})`, margin, leftColY);
            leftColY += 5;
        });
    }
}