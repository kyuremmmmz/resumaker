
import generateCatrianaPDF from "@/presentation/hooks/postgenerators/catriana";
import generateDanielPDF from "@/presentation/hooks/postgenerators/daniel";
import generateJulianaPDF from "@/presentation/hooks/postgenerators/generateJulianaPDF";
import generateKathrynPDF from "@/presentation/hooks/postgenerators/kathyryn";
import generateLornaPDF from "@/presentation/hooks/postgenerators/lorna";
import generateMargotPDF from "@/presentation/hooks/postgenerators/margot";
import generateOliviaPDF from "@/presentation/hooks/postgenerators/olivia";
import generateRachellePDF from "@/presentation/hooks/postgenerators/rachelle";
import generateSamiraPDF from "@/presentation/hooks/postgenerators/samiraGenerator";
import generateStefanoPDF from "@/presentation/hooks/postgenerators/stefanoGenerator";
import { ResumeData } from "@/types/initial-data";
import jsPDF from "jspdf";


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

    doc.save(`resume-${templateName}-template.pdf`)
}

export async function sendResumeByEmail(resumeData: ResumeData, profileImage: string | null, templateName: string, email: string) {
    try {
        const doc = new jsPDF();

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

