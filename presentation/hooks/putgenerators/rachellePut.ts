import { ResumeData } from "@/types/initial-data";
import { SoftwareEngineerResume } from "@/types/postData";
import jsPDF from "jspdf";

export default function generateRachellePDFPut(doc: jsPDF, resumeData: ResumeData, profileImage: string | null, resume: SoftwareEngineerResume) {
    // Page dimensions and margins
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 15;
    const bottomMargin = 15; // Bottom margin to avoid content running off
    const maxY = pageHeight - bottomMargin; // Maximum y-position before page break

    // Get contact info
    const contactSection = resumeData.sections.find((s) => s.id === "contact");
    const email = contactSection?.fields.find((f) => f.id === "email")?.value || "";
    const phone = contactSection?.fields.find((f) => f.id === "phone")?.value || "";
    const location = contactSection?.fields.find((f) => f.id === "location")?.value || "";
    const website = contactSection?.fields.find((f) => f.id === "website")?.value || "";

    // Use resume data for name and job title
    const fullName = resume.name;
    const jobTitle = resume.JobTitle;

    // Add pink gradient background (approximated with a light pink fill)
    doc.setFillColor(253, 242, 248); // Very light pink
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Two column layout
    const colWidth = (pageWidth - 3 * margin) / 2;
    const rightColMargin = margin * 2 + colWidth;

    // Helper function to check and add page break if needed
    const checkPageBreak = (currentY: number, spaceNeeded: number): number => {
        if (currentY + spaceNeeded > maxY) {
            doc.addPage();
            // Re-apply pink background on new page
            doc.setFillColor(253, 242, 248);
            doc.rect(0, 0, pageWidth, pageHeight, "F");
            return margin; // Reset yPos to top margin of new page
        }
        return currentY;
    };

    // Right column - Name, title, summary, experience, contact
    let rightColY = 30;

    // Name and title
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(75, 0, 130); // Indigo text
    rightColY = checkPageBreak(rightColY, 10);
    doc.text(fullName, rightColMargin, rightColY);
    rightColY += 10;

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    rightColY = checkPageBreak(rightColY, 8);
    doc.text(`${jobTitle}`, rightColMargin, rightColY);
    rightColY += 8;

    doc.setDrawColor(200, 200, 200); // Gray line
    doc.setLineWidth(0.5);
    rightColY = checkPageBreak(rightColY, 10);
    doc.line(rightColMargin, rightColY, pageWidth - margin, rightColY);
    rightColY += 10;

    // Summary
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text
    const summaryText = resume.aboutMe || "";
    const summaryLines = doc.splitTextToSize(summaryText, colWidth);
    summaryLines.forEach((line: string) => {
        rightColY = checkPageBreak(rightColY, 5);
        doc.text(line, rightColMargin, rightColY);
        rightColY += 5;
    });

    // Work Experience
    rightColY = checkPageBreak(rightColY, 28); // Section title + line + spacing
    rightColY += 10;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(213, 63, 140); // Pink text
    doc.text("WORK EXPERIENCE", rightColMargin, rightColY);
    rightColY += 8;

    doc.setDrawColor(200, 200, 200); // Gray line
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

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(100, 100, 100); // Gray text
            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || "";
            rightColY = checkPageBreak(rightColY, 6);
            doc.text(dates, rightColMargin, rightColY);
            rightColY += 6;

            doc.setFont("helvetica", "bold");
            doc.setTextColor(0, 0, 0); // Black text
            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || "";
            rightColY = checkPageBreak(rightColY, 6);
            doc.text(company, rightColMargin, rightColY);
            rightColY += 6;

            doc.setFont("helvetica", "normal");
            rightColY = checkPageBreak(rightColY, 6);
            doc.text(titleField.value, rightColMargin, rightColY);
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

    // Contact
    rightColY = checkPageBreak(rightColY, 28); // Section title + line + spacing
    rightColY += 10;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(213, 63, 140); // Pink text
    doc.text("CONTACT", rightColMargin, rightColY);
    rightColY += 8;

    doc.setDrawColor(200, 200, 200); // Gray line
    doc.setLineWidth(0.5);
    rightColY = checkPageBreak(rightColY, 10);
    doc.line(rightColMargin, rightColY, pageWidth - margin, rightColY);
    rightColY += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text;

    if (phone) {
        rightColY = checkPageBreak(rightColY, 6);
        doc.text(`Phone: ${phone}`, rightColMargin, rightColY);
        rightColY += 6;
    }

    if (email) {
        rightColY = checkPageBreak(rightColY, 6);
        rightColY = checkPageBreak(rightColY, 6);
        doc.text(`Email: ${email}`, rightColMargin, rightColY);
        rightColY += 6;
    }

    if (website) {
        rightColY = checkPageBreak(rightColY, 6);
        doc.text(`Website: ${website}`, rightColMargin, rightColY);
        rightColY += 6;
    }

    if (location) {
        rightColY = checkPageBreak(rightColY, 6);
        doc.text(`Address: ${location}`, rightColMargin, rightColY);
        rightColY += 6;
    }

    // Left column - Profile image, education, skills
    let leftColY = 60;

    if (profileImage) {
        doc.addImage(profileImage, "JPEG", 30, 10, 40, 40);
    } else {
        doc.setFillColor(255, 255, 255);
        doc.circle(50, 25, 20);
        doc.text(fullName.charAt(0), 50, 25, { align: "center" });
        doc.text(fullName.charAt(5), 52, 25, { align: "center" });
    }

    // Education Section
    leftColY = checkPageBreak(leftColY, 18); // Section title + line
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(213, 63, 140); // Pink text
    doc.text("EDUCATION", margin, leftColY);
    leftColY += 8;

    doc.setDrawColor(200, 200, 200); // Gray line
    doc.setLineWidth(0.5);
    leftColY = checkPageBreak(leftColY, 10);
    doc.line(margin, leftColY, margin + colWidth, leftColY);
    leftColY += 10;

    const educationSection = resumeData.sections.find((s) => s.id === "education");
    if (educationSection) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0); // Black text

        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || "";
        leftColY = checkPageBreak(leftColY, 6);
        doc.text(dates, margin, leftColY);
        leftColY += 6;

        const university = educationSection.fields.find((f) => f.id === "university")?.value || "";
        leftColY = checkPageBreak(leftColY, 6);
        doc.text(university, margin, leftColY);
        leftColY += 6;

        doc.setFont("helvetica", "normal");
        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || "";
        leftColY = checkPageBreak(leftColY, 6);
        doc.text(`• ${degree}`, margin, leftColY);
        leftColY += 15;

        const gpa = resume.gpa;
        if (gpa) {
            leftColY = checkPageBreak(leftColY, 6);
            doc.text(`GPA: ${gpa}`, margin, leftColY);
            leftColY += 6;
        }
    }

    // Skills Section
    leftColY = checkPageBreak(leftColY, 18); // Section title + line
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(213, 63, 140); // Pink text
    doc.text("SKILL", margin, leftColY);
    leftColY += 8;

    doc.setDrawColor(200, 200, 200); // Gray line
    doc.setLineWidth(0.5);
    leftColY = checkPageBreak(leftColY, 10);
    doc.line(margin, leftColY, margin + colWidth, leftColY);
    leftColY += 10;

    const skillsSection = resumeData.sections.find((s) => s.id === "skills");
    if (skillsSection) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0); // Black text

        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ");
            skillsArray.forEach((skill, index) => {
                leftColY = checkPageBreak(leftColY, 5);
                // Skill name and percentage
                doc.text(skill, margin, leftColY);
                const percentage = 90 - index * 5;
                doc.text(`${percentage}%`, margin + colWidth - 10, leftColY);
                leftColY += 5;

                leftColY = checkPageBreak(leftColY, 8);
                // Progress bar background
                doc.setDrawColor(200, 200, 200); // Gray
                doc.setFillColor(200, 200, 200); // Gray
                doc.roundedRect(margin, leftColY, colWidth - 10, 3, 1, 1, "F");

                // Progress bar fill
                doc.setFillColor(213, 63, 140); // Pink
                doc.roundedRect(margin, leftColY, (colWidth - 10) * (percentage / 100), 3, 1, 1, "F");

                leftColY += 8;
            });
        });
    }
}