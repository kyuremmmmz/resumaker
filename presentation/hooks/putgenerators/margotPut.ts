import { ResumeData } from "@/types/initial-data";
import { SoftwareEngineerResume } from "@/types/postData";
import jsPDF from "jspdf";

export default function generateMargotPDFPut(doc: jsPDF, resumeData: ResumeData, profileImage: string | null, resume: SoftwareEngineerResume) {
    // Page dimensions and margins
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 15;
    const colWidth = 70; // Width for left column
    const bottomMargin = 15; // Bottom margin to avoid content running off
    const maxY = pageHeight - bottomMargin; // Maximum y-position before page break

    // Get contact info
    const contactSection = resumeData.sections.find((s) => s.id === "contact");
    const email = contactSection?.fields.find((f) => f.id === "email")?.value || "";
    const phone = contactSection?.fields.find((f) => f.id === "phone")?.value || "";
    const location = contactSection?.fields.find((f) => f.id === "address")?.value || "";
    const website = contactSection?.fields.find((f) => f.id === "website")?.value || "";

    // Use resume data for name and job title
    const fullName = resume.name;
    const jobTitle = resume.JobTitle;

    // Helper function to check and add page break if needed
    const checkPageBreak = (currentY: number, spaceNeeded: number): number => {
        if (currentY + spaceNeeded > maxY) {
            doc.addPage();
            return margin; // Reset yPos to top margin of new page
        }
        return currentY;
    };

    // Left column - Profile image, Contact, Skills, Certifications
    let leftColY = 80;
    if (profileImage) {
        doc.addImage(profileImage, "JPEG", 15, 15, 50, 50);
    }

    leftColY = checkPageBreak(leftColY, 10); // Section title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(75, 0, 130); // Indigo text
    doc.text("CONTACT INFO", margin, leftColY);
    leftColY += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text

    if (phone) {
        leftColY = checkPageBreak(leftColY, 6);
        doc.text(`Phone: ${phone}`, margin, leftColY);
        leftColY += 6;
    }

    if (email) {
        leftColY = checkPageBreak(leftColY, 6);
        doc.text(`Email: ${email}`, margin, leftColY);
        leftColY += 6;
    }

    if (location) {
        leftColY = checkPageBreak(leftColY, 6);
        doc.text(`Address: ${location}`, margin, leftColY);
        leftColY += 6;
    }

    if (website) {
        leftColY = checkPageBreak(leftColY, 6);
        doc.text(`Website: ${website}`, margin, leftColY);
        leftColY += 6;
    }

    // Skills
    leftColY = checkPageBreak(leftColY, 25); // Section title + spacing
    leftColY += 15;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(75, 0, 130); // Indigo text
    doc.text("SKILLS", margin, leftColY);
    leftColY += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text

    const skillsSection = resumeData.sections.find((s) => s.id === "skills");
    if (skillsSection) {
        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ");
            skillsArray.forEach((skill) => {
                leftColY = checkPageBreak(leftColY, 6);
                doc.text(`• ${skill}`, margin, leftColY);
                leftColY += 6;
            });
        });
    }

    // Certifications
    const certificationsSection = resumeData.sections.find((s) => s.id === "certifications");
    if (certificationsSection && certificationsSection.fields.length > 0) {
        leftColY = checkPageBreak(leftColY, 25); // Section title + spacing
        leftColY += 15;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(75, 0, 130); // Indigo text
        doc.text("CERTIFICATIONS", margin, leftColY);
        leftColY += 10;

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

            leftColY = checkPageBreak(leftColY, 6);
            doc.text(`• ${cert.value} (${date})`, margin, leftColY);
            leftColY += 6;
        });
    }

    // Right column - Name, summary, areas of expertise, education, experience
    const rightColMargin = colWidth + margin;
    let rightColY = 30;

    // Name and title
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(75, 0, 130); // Indigo text
    rightColY = checkPageBreak(rightColY, 15);
    doc.text(fullName, rightColMargin, rightColY);
    rightColY += 15;

    // Summary
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text

    const summaryText = resume.aboutMe || "";
    const summaryLines = doc.splitTextToSize(summaryText, pageWidth - rightColMargin - margin);
    summaryLines.forEach((line: string) => {
        rightColY = checkPageBreak(rightColY, 5);
        doc.text(line, rightColMargin, rightColY);
        rightColY += 5;
    });

    // Areas of expertise
    rightColY = checkPageBreak(rightColY, 18); // Section title + spacing
    rightColY += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(75, 0, 130); // Indigo text
    doc.text("AREAS OF EXPERTISE", rightColMargin, rightColY);
    rightColY += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0); // Black text
    const expertiseText =
        "I've worked with various types of projects and have mastered multiple programming languages and coding as well as software testing and debugging.";
    const expertiseLines = doc.splitTextToSize(expertiseText, pageWidth - rightColMargin - margin);
    expertiseLines.forEach((line: string) => {
        rightColY = checkPageBreak(rightColY, 5);
        doc.text(line, rightColMargin, rightColY);
        rightColY += 5;
    });

    // Education
    rightColY = checkPageBreak(rightColY, 23); // Section title + spacing
    rightColY += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(75, 0, 130); // Indigo text
    doc.text("EDUCATION", rightColMargin, rightColY);
    rightColY += 8;

    const educationSection = resumeData.sections.find((s) => s.id === "education");
    if (educationSection) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0); // Black text

        const university = educationSection.fields.find((f) => f.id === "university")?.value || "";
        rightColY = checkPageBreak(rightColY, 6);
        doc.text(university, rightColMargin, rightColY);
        rightColY += 6;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || "";
        rightColY = checkPageBreak(rightColY, 6);
        doc.text(degree, rightColMargin, rightColY);
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

        rightColY += 9; // Adjusted to maintain original spacing (15 - 6 for GPA)
    }

    // Work Experience
    rightColY = checkPageBreak(rightColY, 16); // Section title + spacing
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(75, 0, 130); // Indigo text
    doc.text("WORK EXPERIENCE", rightColMargin, rightColY);
    rightColY += 8;

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
            doc.setFont("helvetica", "normal");
            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || "";
            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || "";
            rightColY = checkPageBreak(rightColY, 6);
            doc.text(`${company} | ${dates}`, rightColMargin, rightColY);
            rightColY += 6;

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || "";
            const descLines = doc.splitTextToSize(description, pageWidth - rightColMargin - margin);
            descLines.forEach((line: string) => {
                rightColY = checkPageBreak(rightColY, 5);
                doc.text(line, rightColMargin, rightColY);
                rightColY += 5;
            });

            rightColY += 8;
        });
    }
}