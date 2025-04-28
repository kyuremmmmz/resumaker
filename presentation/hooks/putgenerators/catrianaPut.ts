import { ResumeData } from "@/types/initial-data";
import { SoftwareEngineerResume } from "@/types/postData";
import jsPDF from "jspdf";

export default function generateCatrianaPDFPut(doc: jsPDF, resumeData: ResumeData, profileImage: string | null, resume: SoftwareEngineerResume) {
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
    const website = contactSection?.fields.find((f) => f.id === "website")?.value || "";

    // Helper function to check and add page break if needed
    const checkPageBreak = (currentY: number, spaceNeeded: number): number => {
        if (currentY + spaceNeeded > maxY) {
            doc.addPage();
            return margin; // Reset yPos to top margin of new page
        }
        return currentY;
    };

    // Header
    let yPos = 20;
    doc.setTextColor(0, 102, 204); // Blue text
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    yPos = checkPageBreak(yPos, 10);
    doc.text(fullName, margin, yPos);

    yPos += 10;
    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    yPos = checkPageBreak(yPos, 8);
    doc.text(`${jobTitle}`, margin, yPos);

    yPos += 15;

    // Two column layout for header
    const colWidth = (pageWidth - 3 * margin) / 2;
    const rightColMargin = margin * 2 + colWidth;

    // Introduction (left column)
    doc.setTextColor(0, 102, 204); // Blue text
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    yPos = checkPageBreak(yPos, 8);
    doc.text("INTRODUCTION", margin, yPos);

    yPos += 8;

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const summary = resume.aboutMe || "";
    const summaryLines = doc.splitTextToSize(summary, colWidth);
    summaryLines.forEach((line: string) => {
        yPos = checkPageBreak(yPos, 5);
        doc.text(line, margin, yPos);
        yPos += 5;
    });

    // Contact info (right column)
    let rightColY = yPos - summaryLines.length * 5 - 8; // Align with introduction heading
    doc.setTextColor(0, 102, 204); // Blue text
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    rightColY = checkPageBreak(rightColY, 8);
    doc.text("CONTACT INFO", rightColMargin, rightColY);

    rightColY += 8;

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    if (email) {
        doc.setFont("helvetica", "bold");
        rightColY = checkPageBreak(rightColY, 6);
        doc.text("Email:", rightColMargin, rightColY);
        doc.setFont("helvetica", "normal");
        doc.text(email, rightColMargin + 20, rightColY);
        rightColY += 6;
    }

    if (website) {
        doc.setFont("helvetica", "bold");
        rightColY = checkPageBreak(rightColY, 6);
        doc.text("Website:", rightColMargin, rightColY);
        doc.setFont("helvetica", "normal");
        doc.text(website, rightColMargin + 20, rightColY);
        rightColY += 6;
    }

    if (phone) {
        doc.setFont("helvetica", "bold");
        rightColY = checkPageBreak(rightColY, 6);
        doc.text("Phone:", rightColMargin, rightColY);
        doc.setFont("helvetica", "normal");
        doc.text(phone, rightColMargin + 20, rightColY);
        rightColY += 6;
    }

    // Continue with main content
    yPos = Math.max(yPos, rightColY) + 10;
    yPos = checkPageBreak(yPos, 10);

    // Work Experience
    doc.setTextColor(0, 102, 204); // Blue text
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    yPos = checkPageBreak(yPos, 8);
    doc.text("WORK EXPERIENCE", margin, yPos);

    yPos += 8;

    doc.setDrawColor(0, 102, 204); // Blue line
    doc.setLineWidth(0.5);
    yPos = checkPageBreak(yPos, 2);
    doc.line(margin, yPos, pageWidth - margin, yPos);

    yPos += 10;

    const experienceSection = resumeData.sections.find((s) => s.id === "experience");
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"));

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "");

            doc.setTextColor(0, 0, 0); // Black text
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            yPos = checkPageBreak(yPos, 6);
            doc.text(titleField.value, margin, yPos);
            yPos += 6;

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || "";
            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || "";
            yPos = checkPageBreak(yPos, 6);
            doc.text(`${company} | ${dates}`, margin, yPos);
            yPos += 6;

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || "";
            const descLines = doc.splitTextToSize(description, pageWidth - 2 * margin);
            descLines.forEach((line: string) => {
                yPos = checkPageBreak(yPos, 5);
                doc.text(line, margin, yPos);
                yPos += 5;
            });

            yPos += 8;
        });
    }

    // Two column layout for education and skills
    const eduStartY = yPos;

    // Education (left column)
    doc.setTextColor(0, 102, 204); // Blue text
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    let leftColY = checkPageBreak(eduStartY, 8);
    doc.text("EDUCATION", margin, leftColY);

    leftColY += 8;

    const educationSection = resumeData.sections.find((s) => s.id === "education");
    if (educationSection) {
        doc.setTextColor(0, 0, 0); // Black text
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        const university = educationSection.fields.find((f) => f.id === "university")?.value || "";
        leftColY = checkPageBreak(leftColY, 6);
        doc.text(university, margin, leftColY);
        leftColY += 6;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || "";
        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || "";
        leftColY = checkPageBreak(leftColY, 6);
        doc.text(`${degree} | ${dates}`, margin, leftColY);
        leftColY += 6;

        const gpa = resume.gpa;
        if (gpa) {
            leftColY = checkPageBreak(leftColY, 6);
            doc.text(`GPA: ${gpa}`, margin, leftColY);
            leftColY += 6;
        }
    }

    // Skills (right column)
    doc.setTextColor(0, 102, 204); // Blue text
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    let skillsY = checkPageBreak(eduStartY, 8);
    doc.text("SKILLS", rightColMargin, skillsY);

    skillsY += 8;

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    const skillsSection = resumeData.sections.find((s) => s.id === "skills");
    if (skillsSection) {
        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ");
            skillsArray.forEach((skill) => {
                skillsY = checkPageBreak(skillsY, 5);
                doc.text(skill, rightColMargin, skillsY);
                skillsY += 5;
            });
        });
    }

    // Certifications
    const certY = Math.max(leftColY, skillsY) + 10;
    doc.setTextColor(0, 102, 204); // Blue text
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    let certItemY = checkPageBreak(certY, 8);
    doc.text("CERTIFICATIONS", rightColMargin, certItemY);

    certItemY += 8;

    doc.setTextColor(0, 0, 0); // Black text
    doc.setFontSize(10);
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
            certItemY = checkPageBreak(certItemY, 6);
            doc.text(`• ${cert.value} (${date})`, rightColMargin, certItemY);
            certItemY += 6;
        });
    }
}