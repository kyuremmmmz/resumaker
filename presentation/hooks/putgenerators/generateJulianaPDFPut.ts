import { ResumeData } from "@/types/initial-data";
import { SoftwareEngineerResume } from "@/types/postData";
import jsPDF from "jspdf";

export default function generateJulianaPDF(doc: jsPDF, resumeData: ResumeData, profileImage: string | null, resume: SoftwareEngineerResume) {
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

    // Helper function to check and add page break if needed
    const checkPageBreak = (currentY: number, spaceNeeded: number): number => {
        if (currentY + spaceNeeded > maxY) {
            doc.addPage();
            // Re-apply pink background on new page
            doc.setFillColor(253, 242, 248); // Very light pink
            doc.rect(0, 0, pageWidth, pageHeight, "F");
            return margin; // Reset yPos to top margin of new page
        }
        return currentY;
    };

    // Add pink gradient background (approximated with a light pink fill)
    doc.setFillColor(253, 242, 248); // Very light pink
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Header
    let yPos = 40; // Start after profile image space

    // "Hello! My name" bubble
    yPos = checkPageBreak(yPos, 8);
    doc.setFillColor(255, 255, 255); // White
    doc.roundedRect(margin, yPos, 40, 8, 4, 4, "F");

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Hello! My name", margin + 5, yPos + 5);

    yPos += 12;

    // Name and heart
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    yPos = checkPageBreak(yPos, 8);
    doc.text(fullName, margin, yPos);

    // Heart symbol
    doc.setTextColor(213, 63, 140); // Pink text
    doc.text("♥", margin + doc.getTextWidth(fullName) + 5, yPos);

    yPos += 8;

    // Job title
    doc.setTextColor(100, 100, 100); // Gray text
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    yPos = checkPageBreak(yPos, 6);
    doc.text(`${jobTitle}`, margin, yPos);

    yPos += 12;

    // Contact info in bubbles
    yPos = checkPageBreak(yPos, 8);
    doc.setFillColor(0, 0, 0); // Black background
    doc.roundedRect(margin, yPos, 50, 8, 4, 4, "F");

    doc.setTextColor(255, 255, 255); // White text
    doc.setFontSize(8);
    doc.text(phone, margin + 5, yPos + 5);

    doc.setFillColor(253, 242, 248); // Pink background
    doc.roundedRect(margin + 55, yPos, 50, 8, 4, 4, "F");

    doc.setTextColor(0, 0, 0); // Black text
    doc.text(email, margin + 60, yPos + 5);

    yPos += 20;

    // About Me section
    yPos = checkPageBreak(yPos, 8);
    doc.setFillColor(255, 255, 255); // White
    doc.roundedRect(margin, yPos, 40, 8, 4, 4, "F");

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("About Me", margin + 5, yPos + 5);

    yPos += 12;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const summary = resume.aboutMe || "";
    const summaryLines = doc.splitTextToSize(summary, pageWidth - 2 * margin);
    summaryLines.forEach((line: string) => {
        yPos = checkPageBreak(yPos, 5);
        doc.text(line, margin, yPos);
        yPos += 5;
    });

    yPos += 10;

    // Two column layout
    const colWidth = (pageWidth - 3 * margin) / 2;
    const rightColMargin = margin * 2 + colWidth;

    // Experience (left column)
    yPos = checkPageBreak(yPos, 8);
    doc.setFillColor(255, 255, 255); // White
    doc.roundedRect(margin, yPos, 40, 8, 4, 4, "F");

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Experience", margin + 5, yPos + 5);

    let leftColY = yPos + 12;

    const experienceSection = resumeData.sections.find((s) => s.id === "experience");
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"));

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "");

            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            leftColY = checkPageBreak(leftColY, 6);
            doc.text(titleField.value, margin, leftColY);

            // Heart symbol
            doc.setTextColor(213, 63, 140); // Pink text
            doc.text("♥", margin + colWidth - 5, leftColY);
            doc.setTextColor(0, 0, 0); // Back to black text

            leftColY += 6;

            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || "";
            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || "";

            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            leftColY = checkPageBreak(leftColY, 6);
            doc.text(company, margin, leftColY);
            doc.text(dates, margin + colWidth - doc.getTextWidth(dates) - 5, leftColY);
            leftColY += 6;

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || "";
            const descLines = doc.splitTextToSize(description, colWidth - 5);
            descLines.forEach((line: string) => {
                leftColY = checkPageBreak(leftColY, 5);
                doc.text(line, margin, leftColY);
                leftColY += 5;
            });

            leftColY += 8;
        });
    }

    // Education and Skills (right column)
    let rightColY = yPos;

    // Education
    rightColY = checkPageBreak(rightColY, 8);
    doc.setFillColor(255, 255, 255); // White
    doc.roundedRect(rightColMargin, rightColY, 40, 8, 4, 4, "F");

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Education", rightColMargin + 5, rightColY + 5);

    rightColY += 12;

    const educationSection = resumeData.sections.find((s) => s.id === "education");
    if (educationSection) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || "";
        rightColY = checkPageBreak(rightColY, 6);
        doc.text(degree, rightColMargin, rightColY);
        rightColY += 6;

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        const university = educationSection.fields.find((f) => f.id === "university")?.value || "";
        rightColY = checkPageBreak(rightColY, 6);
        doc.text(university, rightColMargin, rightColY);
        rightColY += 6;

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
    }

    rightColY += 10;

    // Personal Skills
    rightColY = checkPageBreak(rightColY, 8);
    doc.setFillColor(255, 255, 255); // White
    doc.roundedRect(rightColMargin, rightColY, 50, 8, 4, 4, "F");

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Personal Skill", rightColMargin + 5, rightColY + 5);

    rightColY += 12;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    const skillsSection = resumeData.sections.find((s) => s.id === "skills");
    if (skillsSection) {
        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ");
            skillsArray.forEach((skill, index) => {
                rightColY = checkPageBreak(rightColY, 5);
                doc.text(skill, rightColMargin, rightColY);
                rightColY += 5;

                rightColY = checkPageBreak(rightColY, 6);
                doc.setDrawColor(200, 200, 200);
                doc.setFillColor(200, 200, 200); // Gray
                doc.roundedRect(rightColMargin, rightColY, colWidth - 10, 2, 1, 1, "F");

                // Progress bar fill
                const percentage = 95 - index * 5;
                doc.setFillColor(213, 63, 140); // Pink
                doc.roundedRect(rightColMargin, rightColY, (colWidth - 10) * (percentage / 100), 2, 1, 1, "F");

                rightColY += 6;
            });
        });
    }

    // Certifications
    rightColY = checkPageBreak(rightColY, 8);
    doc.setFillColor(255, 255, 255); // White
    doc.roundedRect(rightColMargin, rightColY, 50, 8, 4, 4, "F");

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Certifications", rightColMargin + 5, rightColY + 5);

    rightColY += 12;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    const certificationsSection = resumeData.sections.find((s) => s.id === "certifications");
    if (certificationsSection) {
        // Group certifications
        const certNames = certificationsSection.fields.filter(
            (f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"),
        );

        certNames.forEach((cert) => {
            const index = cert.id.replace("cert", "");
            const date = certificationsSection.fields.find((f) => f.id === `certDate${index}`)?.value || "";
            rightColY = checkPageBreak(rightColY, 6);
            doc.text(`• ${cert.value} (${date})`, rightColMargin, rightColY);
            rightColY += 6;
        });
    }
}