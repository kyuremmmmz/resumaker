import { ResumeData } from "@/types/initial-data";
import { SoftwareEngineerResume } from "@/types/postData";
import jsPDF from "jspdf";

export default function generateOliviaPDFPut(doc: jsPDF, resumeData: ResumeData, profileImage: string | null, resume: SoftwareEngineerResume) {
    // Page dimensions and margins
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 15;
    const colWidth = 70; // Width for left column
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
    const website = contactSection?.fields.find((f) => f.id === "linked_in")?.value || "";

    // Helper function to check and add page break if needed
    const checkPageBreak = (currentY: number, spaceNeeded: number): number => {
        if (currentY + spaceNeeded > maxY) {
            doc.addPage();
            // Re-apply light gray background for left column on new page
            doc.setFillColor(245, 245, 245); // Light gray
            doc.rect(0, 0, colWidth, pageHeight, "F");
            return margin; // Reset yPos to top margin of new page
        }
        return currentY;
    };
    // Background color for left column
    doc.setFillColor(245, 245, 245); // Light gray
    doc.rect(0, 0, colWidth, pageHeight, "F"); // Full height

    // Header
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(`${fullName}`, colWidth + margin, 25);

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text(`${jobTitle}`, colWidth + margin, 35);

    // Right column - Profile (Summary), Work Experience
    let rightColY = 50;

    // Profile section
    rightColY = checkPageBreak(rightColY, 8); // Section title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Profile", colWidth + margin, rightColY);
    rightColY += 8;
    if (profileImage) {
        doc.addImage(profileImage, 'JPEG', 20, 15, 30, 30)
    }
    // Summary as profile
    const summarySection = resumeData.sections.find((s) => s.id === "summary");
    if (summarySection) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        const summary = resume.aboutMe || "";
        const summaryLines = doc.splitTextToSize(summary, pageWidth - colWidth - 2 * margin);

        summaryLines.forEach((line: string) => {
            rightColY = checkPageBreak(rightColY, 5);
            doc.text(line, colWidth + margin, rightColY);
            rightColY += 5;
        });
    }

    // Work Experience
    rightColY = checkPageBreak(rightColY, 18); // Section title + spacing
    rightColY += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Work Experience", colWidth + margin, rightColY);
    rightColY += 8;

    const experienceSection = resumeData.sections.find((s) => s.id === "experience");
    if (experienceSection) {
        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"));

        jobTitles.forEach((titleField, idx) => {
            const index = titleField.id.replace("jobTitle", "");

            rightColY = checkPageBreak(rightColY, 19); // Dot + title + company/dates
            // Draw timeline dot
            doc.setFillColor(150, 150, 150);
            doc.circle(colWidth + margin - 5, rightColY - 2, 2, "F");

            // Draw timeline line if not last item
            if (idx < jobTitles.length - 1) {
                doc.setDrawColor(150, 150, 150);
                doc.setLineWidth(0.5);
                doc.line(colWidth + margin - 5, rightColY, colWidth + margin - 5, rightColY + 30);
            }

            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(titleField.value, colWidth + margin, rightColY);
            rightColY += 6;

            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || "";
            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || "";

            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            rightColY = checkPageBreak(rightColY, 6);
            doc.text(`${company}, ${dates}`, colWidth + margin, rightColY);
            rightColY += 6;

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || "";
            const descLines = doc.splitTextToSize(description, pageWidth - colWidth - 2 * margin);

            descLines.forEach((line: string) => {
                rightColY = checkPageBreak(rightColY, 5);
                doc.text(`• ${line}`, colWidth + margin, rightColY);
                rightColY += 5;
            });

            rightColY += 8;
        });
    }

    // Left column - Contact, Education, Skills, Certifications
    let leftColY = 50;

    // Contact information
    leftColY = checkPageBreak(leftColY, 8); // Section title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Contact", margin, leftColY);
    leftColY += 8;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

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

    if (website) {
        leftColY = checkPageBreak(leftColY, 5);
        doc.text(`Website: ${website}`, margin, leftColY);
        leftColY += 5;
    }

    // Education
    leftColY = checkPageBreak(leftColY, 18); // Section title + spacing
    leftColY += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Education", margin, leftColY);
    leftColY += 8;

    const educationSection = resumeData.sections.find((s) => s.id === "education");
    if (educationSection) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");

        const degree = educationSection.fields.find((f) => f.id === "degree")?.value || "";
        const degreeLines = doc.splitTextToSize(degree, colWidth - 20);
        degreeLines.forEach((line: string) => {
            leftColY = checkPageBreak(leftColY, 5);
            doc.text(line, margin, leftColY);
            leftColY += 5;
        });

        doc.setFont("helvetica", "normal");
        const university = educationSection.fields.find((f) => f.id === "university")?.value || "";
        leftColY = checkPageBreak(leftColY, 5);
        doc.text(university, margin, leftColY);
        leftColY += 5;

        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || "";
        leftColY = checkPageBreak(leftColY, 5);
        doc.text(dates, margin, leftColY);
        leftColY += 5;

        const gpa = resume.gpa;
        if (gpa) {
            leftColY = checkPageBreak(leftColY, 5);
            doc.text(`GPA: ${gpa}`, margin, leftColY);
            leftColY += 5;
        }
    }

    // Skills
    leftColY = checkPageBreak(leftColY, 18); // Section title + spacing
    leftColY += 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Skills", margin, leftColY);
    leftColY += 8;

    const skillsSection = resumeData.sections.find((s) => s.id === "skills");
    if (skillsSection) {
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");

        skillsSection.fields.forEach((field) => {
            const skillsArray = field.value.split(", ");
            skillsArray.forEach((skill) => {
                leftColY = checkPageBreak(leftColY, 5);
                doc.text(skill, margin, leftColY);
                leftColY += 5;
            });
        });
    }

    // Certifications
    const certificationsSection = resumeData.sections.find((s) => s.id === "certifications");
    if (certificationsSection && certificationsSection.fields.length > 0) {
        leftColY = checkPageBreak(leftColY, 18); // Section title + spacing
        leftColY += 10;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Certifications", margin, leftColY);
        leftColY += 8;

        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");

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