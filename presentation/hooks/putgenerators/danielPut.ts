import { ResumeData } from "@/types/initial-data";
import { SoftwareEngineerResume } from "@/types/postData";
import jsPDF from "jspdf";

export default function generateDanielPDFPut(doc: jsPDF, resumeData: ResumeData, profileImage: string | null, resume: SoftwareEngineerResume) {
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
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    yPos = checkPageBreak(yPos, 10);
    doc.text(`${fullName}`, margin, yPos);

    yPos += 10;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    yPos = checkPageBreak(yPos, 8);
    doc.text(`${jobTitle}`, margin, yPos);

    yPos += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    yPos = checkPageBreak(yPos, 5);
    doc.text(`${resume.address} | ${email} | ${website}`, margin, yPos);

    yPos += 15;

    // Introduction
    yPos = checkPageBreak(yPos, 10); // Rounded rectangle
    doc.setFillColor(240, 240, 240); // Light gray
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 10, 2, 2, "F");

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("INTRODUCTION", margin + 5, yPos + 7);

    yPos += 15;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const summary = resume.aboutMe || "";
    const summaryLines = doc.splitTextToSize(summary, pageWidth - 2 * margin);
    summaryLines.forEach((line: string) => {
        yPos = checkPageBreak(yPos, 5);
        doc.text(line, margin, yPos);
        yPos += 5;
    });

    yPos += 10;

    // Technical Skills
    yPos = checkPageBreak(yPos, 10); // Rounded rectangle
    doc.setFillColor(240, 240, 240); // Light gray
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 10, 2, 2, "F");

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("TECHNICAL SKILLS", margin + 5, yPos + 7);

    yPos += 15;

    const skillsSection = resumeData.sections.find((s) => s.id === "skills");
    if (skillsSection) {
        // Create a 3-column layout for skills
        const skillColWidth = (pageWidth - 2 * margin) / 3;
        let skillsArray: string[] = [];

        skillsSection.fields.forEach((field) => {
            skillsArray = skillsArray.concat(field.value.split(", "));
        });

        // Distribute skills across 3 columns
        const col1 = skillsArray.slice(0, Math.ceil(skillsArray.length / 3));
        const col2 = skillsArray.slice(Math.ceil(skillsArray.length / 3), Math.ceil((2 * skillsArray.length) / 3));
        const col3 = skillsArray.slice(Math.ceil((2 * skillsArray.length) / 3));

        const maxSkills = Math.max(col1.length, col2.length, col3.length);
        const startY = yPos;

        for (let i = 0; i < maxSkills; i++) {
            yPos = checkPageBreak(startY + i * 5, 5);
            if (i < col1.length) {
                doc.text(col1[i], margin, startY + i * 5);
            }
            if (i < col2.length) {
                doc.text(col2[i], margin + skillColWidth, startY + i * 5);
            }
            if (i < col3.length) {
                doc.text(col3[i], margin + 2 * skillColWidth, startY + i * 5);
            }
        }

        yPos = startY + maxSkills * 5 + 10;
    }

    // Work Experience
    yPos = checkPageBreak(yPos, 10); // Rounded rectangle
    doc.setFillColor(240, 240, 240); // Light gray
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 10, 2, 2, "F");

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("WORK EXPERIENCE", margin + 5, yPos + 7);

    yPos += 15;

    const experienceSection = resumeData.sections.find((s) => s.id === "experience");
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"));

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "");

            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            yPos = checkPageBreak(yPos, 6);
            doc.text(titleField.value, margin, yPos);

            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || "";
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            const dateWidth = doc.getTextWidth(dates);
            doc.text(dates, pageWidth - margin - dateWidth, yPos);

            yPos += 6;

            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || "";
            yPos = checkPageBreak(yPos, 6);
            doc.text(company, margin, yPos);
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

    // Education
    yPos = checkPageBreak(yPos, 10); // Rounded rectangle
    doc.setFillColor(240, 240, 240); // Light gray
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 10, 2, 2, "F");

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("EDUCATION", margin + 5, yPos + 7);

    yPos += 15;

    const educationSection = resumeData.sections.find((s) => s.id === "education");
    if (educationSection) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || "";
        yPos = checkPageBreak(yPos, 6);
        doc.text(degree, margin, yPos);

        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || "";
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const dateWidth = doc.getTextWidth(dates);
        doc.text(dates, pageWidth - margin - dateWidth, yPos);

        yPos += 6;

        const university = educationSection.fields.find((f) => f.id === "university")?.value || "";
        yPos = checkPageBreak(yPos, 6);
        doc.text(university, margin, yPos);
        yPos += 6;

        const gpa = resume.gpa;
        if (gpa) {
            yPos = checkPageBreak(yPos, 6);
            doc.text(`GPA: ${gpa}`, margin, yPos);
            yPos += 6;
        }

        yPos += 4; // Adjusted to maintain original spacing (10 - 6 for GPA)
    }

    // Additional Information
    yPos = checkPageBreak(yPos, 10); // Rounded rectangle
    doc.setFillColor(240, 240, 240); // Light gray
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 10, 2, 2, "F");

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("ADDITIONAL INFORMATION", margin + 5, yPos + 7);

    yPos += 15;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    // Languages
    const languages = resumeData.sections.find((s) => s.id === "languages")?.fields.find((f) => f.id === "languages")?.value || "";
    if (languages) {
        doc.setFont("helvetica", "bold");
        yPos = checkPageBreak(yPos, 6);
        doc.text("Languages:", margin, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(languages, margin + 25, yPos);
        yPos += 6;
    }

    // Certifications
    const certificationsSection = resumeData.sections.find((s) => s.id === "certifications");
    if (certificationsSection && certificationsSection.fields.length > 0) {
        doc.setFont("helvetica", "bold");
        yPos = checkPageBreak(yPos, 6);
        doc.text("Certifications:", margin, yPos);
        doc.setFont("helvetica", "normal");

        // Group certifications
        const certNames = certificationsSection.fields.filter(
            (f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"),
        );

        certNames.forEach((cert) => {
            const index = cert.id.replace("cert", "");
            const date = certificationsSection.fields.find((f) => f.id === `certDate${index}`)?.value || "";
            yPos = checkPageBreak(yPos, 5);
            doc.text(`• ${cert.value} (${date})`, margin + 30, yPos);
            yPos += 5;
        });
    }
}