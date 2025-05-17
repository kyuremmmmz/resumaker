import { ResumeData } from "@/types/initial-data";
import { SoftwareEngineerResume } from "@/types/postData";
import jsPDF from "jspdf";

export default function generateSamiraPDFPut(doc: jsPDF, resumeData: ResumeData, profileImage: string | null, resume: SoftwareEngineerResume) {
    const pageWidth = 210; 
    const pageHeight = 297;
    const margin = 15;
    const bottomMargin = 15;
    const maxY = pageHeight - bottomMargin; 

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

    // Header
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(`${fullName}`, margin, 20);

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text(`${jobTitle}`, margin, 30);

    // Contact information
    let yPos = 45;
    doc.setFontSize(11);

    const contactSection = resumeData.sections.find((s) => s.id === "contact");
    const email = contactSection?.fields.find((f) => f.id === "email")?.value;
    const phone = contactSection?.fields.find((f) => f.id === "phone")?.value;
    const location = contactSection?.fields.find((f) => f.id === "location")?.value;
    const website = contactSection?.fields.find((f) => f.id === "website")?.value;

    if (phone) {
        yPos = checkPageBreak(yPos, 6);
        doc.text(`Phone: ${phone}`, margin, yPos);
        yPos += 6;
    }

    if (email) {
        yPos = checkPageBreak(yPos, 6);
        doc.text(`Email: ${email}`, margin, yPos);
        yPos += 6;
    }

    if (location) {
        yPos = checkPageBreak(yPos, 6);
        doc.text(`Address: ${location}`, margin, yPos);
        yPos += 6;
    }

    if (website) {
        yPos = checkPageBreak(yPos, 6);
        doc.text(`Website: ${website}`, margin, yPos);
        yPos += 6;
    }

    // Divider
    yPos = checkPageBreak(yPos, 15); // Divider + space
    yPos += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;

    // Work Experience
    const experienceSection = resumeData.sections.find((s) => s.id === "experience");
    if (experienceSection) {
        yPos = checkPageBreak(yPos, 26); // Section title + initial spacing
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("WORK EXPERIENCE", margin, yPos);
        yPos += 10;

        // Group fields by job
        const jobTitles = experienceSection.fields.filter((f) => f.id.startsWith("jobTitle"));

        jobTitles.forEach((titleField) => {
            const index = titleField.id.replace("jobTitle", "");

            yPos = checkPageBreak(yPos, 24); // Job title + company + dates
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(titleField.value, margin, yPos);
            yPos += 6;

            const company = experienceSection.fields.find((f) => f.id === `company${index}`)?.value || "";
            doc.setFont("helvetica", "normal");
            doc.text(company, margin, yPos);
            yPos += 6;

            const dates = experienceSection.fields.find((f) => f.id === `dates${index}`)?.value || "";
            doc.text(dates, margin, yPos);
            yPos += 6;

            const description = experienceSection.fields.find((f) => f.id === `description${index}`)?.value || "";
            const descLines = doc.splitTextToSize(description, pageWidth - 2 * margin);

            doc.setFontSize(10);
            descLines.forEach((line: string) => {
                yPos = checkPageBreak(yPos, 5);
                doc.text(`• ${line}`, margin + 5, yPos);
                yPos += 5;
            });

            yPos += 5;
        });
    }

    // Education
    yPos = checkPageBreak(yPos, 21); // Section title + initial spacing
    yPos += 5;
    const educationSection = resumeData.sections.find((s) => s.id === "education");
    if (educationSection) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("EDUCATION", margin, yPos);
        yPos += 10;

        yPos = checkPageBreak(yPos, 24); // Degree + university + dates
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(educationSection.fields.find((f) => f.id === "degree")?.value || "", margin, yPos);
        yPos += 6;

        const university = educationSection.fields.find((f) => f.id === "university")?.value || "";
        doc.setFont("helvetica", "normal");
        doc.text(university, margin, yPos);
        yPos += 6;

        const dates = educationSection.fields.find((f) => f.id === "eduDates")?.value || "";
        doc.text(dates, margin, yPos);
        yPos += 6;

        const gpa = resume.gpa;
        if (gpa) {
            yPos = checkPageBreak(yPos, 6);
            doc.text(`GPA: ${gpa}`, margin, yPos);
            yPos += 6;
        }
    }

    // Skills - Updated to two columns
    yPos = checkPageBreak(yPos, 21); // Section title + initial spacing
    yPos += 5;
    const skillsSection = resumeData.sections.find((s) => s.id === "skills");
    if (skillsSection) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("SKILLS", margin, yPos);
        yPos += 10;

        // Define column widths and positions
        const columnWidth = (pageWidth - 3 * margin) / 2;
        const leftColumnX = margin;
        const rightColumnX = margin + columnWidth + margin;

        // Technical Skills (Left Column)
        let techYPos = yPos;
        const techSkillsField = skillsSection.fields.find((f) => f.label.toLowerCase().includes("technical"));
        if (techSkillsField) {
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text("Technical Skills:", leftColumnX, techYPos);
            techYPos += 5;

            doc.setFont("helvetica", "normal");
            const techSkillsArray = techSkillsField.value.split(", ");
            techSkillsArray.forEach((skill) => {
                techYPos = checkPageBreak(techYPos, 5);
                doc.text(`• ${skill}`, leftColumnX + 5, techYPos);
                techYPos += 5;
            });
        }

        // Soft Skills (Right Column)
        let softYPos = yPos;
        const softSkillsField = skillsSection.fields.find((f) => f.label.toLowerCase().includes("soft"));
        if (softSkillsField) {
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.text("Soft Skills:", rightColumnX, softYPos);
            softYPos += 5;

            doc.setFont("helvetica", "normal");
            const softSkillsArray = softSkillsField.value.split(", ");
            softSkillsArray.forEach((skill) => {
                softYPos = checkPageBreak(softYPos, 5);
                doc.text(`• ${skill}`, rightColumnX + 5, softYPos);
                softYPos += 5;
            });
        }

        // Update yPos to the maximum of the two columns
        yPos = Math.max(techYPos, softYPos) + 5;
    }

    // Certifications
    const certificationsSection = resumeData.sections.find((s) => s.id === "certifications");
    if (certificationsSection && certificationsSection.fields.length > 0) {
        yPos = checkPageBreak(yPos, 21); // Section title + initial spacing
        yPos += 5;
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("CERTIFICATIONS", margin, yPos);
        yPos += 10;

        doc.setFontSize(10);

        // Group certifications
        const certNames = certificationsSection.fields.filter(
            (f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"),
        );

        certNames.forEach((cert) => {
            const index = cert.id.replace("cert", "");
            const date = certificationsSection.fields.find((f) => f.id === `certDate${index}`)?.value || "";

            yPos = checkPageBreak(yPos, 5);
            doc.text(`• ${cert.value} (${date})`, margin, yPos);
            yPos += 5;
        });
    }

    // Summary (if present)
    const summarySection = resumeData.sections.find((s) => s.id === "summary");
    if (summarySection) {
        yPos = checkPageBreak(yPos, 21); // Section title + initial spacing
        yPos += 5;
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("SUMMARY", margin, yPos);
        yPos += 10;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const summaryText = resume.aboutMe || "";
        const textLines = doc.splitTextToSize(summaryText, pageWidth - 2 * margin);
        textLines.forEach((line: string) => {
            yPos = checkPageBreak(yPos, 5);
            doc.text(line, margin, yPos);
            yPos += 5;
        });
    }
}