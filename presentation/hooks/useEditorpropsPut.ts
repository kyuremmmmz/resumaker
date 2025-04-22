import { initialResumeData } from "@/Core/lib/initial-data"
import { generatePDF, sendResumeByEmail } from "@/Core/lib/pdf-generator"
import { ResumeData, ResumeDataPut } from "@/types/initial-data"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import CatrianaTemplate from "../components/templates/catriana-template"
import DanielTemplate from "../components/templates/daniel-template"
import JulianaTemplate from "../components/templates/juliana-template"
import KathrynTemplate from "../components/templates/kathryn-template"
import LornaTemplate from "../components/templates/lorna-template"
import MargotTemplate from "../components/templates/margot-template"
import OliviaTemplate from "../components/templates/olivia-template"
import RachelleTemplate from "../components/templates/rachelle-template"
import SamiraTemplate from "../components/templates/samira-template"
import StefanoTemplate from "../components/templates/stefano-template"
import postDataService from "@/Data/api/post"
import { SoftwareEngineerResume, SoftwareEngineerResumeByFields } from "@/types/postData"
import { initialResume } from "@/Core/lib/initial-data-put"
import { generatePDFPut, sendResumeByEmailPut } from "@/Core/lib/pdf-generator-put"

export default function useEditorPropsPut(resume: ResumeDataPut) {
    const [resumeData, setResumeData] = useState<ResumeDataPut>(resume)
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const [previewVisible, setPreviewVisible] = useState(true)
    const [isDownloading, setIsDownloading] = useState(false)
    const [isSendingEmail, setIsSendingEmail] = useState(false)
    const [activeTemplate, setActiveTemplate] = useState("stefano")
    const [emailDialogOpen, setEmailDialogOpen] = useState(false)
    const [emailAddress, setEmailAddress] = useState("")

    const handleDownload = async () => {
        setIsDownloading(true)
        try {
            await generatePDFPut(resumeData, profileImage, activeTemplate)
        } catch (error) {
            console.error("Error generating PDF:", error)
        } finally {
            setIsDownloading(false)
        }
    }


    const handleSendEmail = async () => {
        if (!emailAddress || !emailAddress.includes("@")) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address",
                variant: "destructive",
            })
            return
        }

        setIsSendingEmail(true)
        try {
            const result = await sendResumeByEmailPut(resumeData, profileImage, activeTemplate, emailAddress)

            if (result.success) {
                toast({
                    title: "Email Sent",
                    description: result.message,
                })
                setEmailDialogOpen(false)
            } else {
                toast({
                    title: "Error",
                    description: result.message,
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error("Error sending email:", error)
            toast({
                title: "Error",
                description: "Failed to send email. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSendingEmail(false)
        }
    }


    const templates = [
        { id: "stefano", name: "Stefano", component: StefanoTemplate },
        { id: "samira", name: "Samira", component: SamiraTemplate },
        { id: "kathryn", name: "Kathryn", component: KathrynTemplate },
        { id: "olivia", name: "Olivia", component: OliviaTemplate },
        { id: "lorna", name: "Lorna", component: LornaTemplate },
        { id: "margot", name: "Margot", component: MargotTemplate },
        { id: "rachelle", name: "Rachelle", component: RachelleTemplate },
        { id: "daniel", name: "Daniel", component: DanielTemplate },
        { id: "catriana", name: "Catriana", component: CatrianaTemplate },
        { id: "juliana", name: "Juliana", component: JulianaTemplate },
    ]

    const ActiveTemplateComponent = templates.find((t) => t.id === activeTemplate)?.component || StefanoTemplate
    return {
        resumeData,
        setResumeData,
        profileImage,
        setProfileImage,
        previewVisible,
        setPreviewVisible,
        isDownloading,
        isSendingEmail,
        activeTemplate,
        setActiveTemplate,
        emailDialogOpen,
        setEmailDialogOpen,
        emailAddress,
        setEmailAddress,
        handleDownload,
        handleSendEmail,
        templates,
        ActiveTemplateComponent,
    }
}