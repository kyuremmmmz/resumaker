"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Eye, EyeOff } from 'lucide-react'

import { ResumeData } from "@/types/initial-data"
import { generatePDF } from "@/Core/lib/pdf-generator"
import { initialResumeData } from "@/Core/lib/initial-data"
import ResumeEditor from "../components/resume-editor"
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
import  { useRouter } from "next/navigation"



export default function ResumePage() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [previewVisible, setPreviewVisible] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState("stefano")
  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      await generatePDF(resumeData, profileImage, activeTemplate)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsDownloading(false)
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
  const router = useRouter();
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setPreviewVisible(!previewVisible)}>
              {previewVisible ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
              {previewVisible ? "Hide Preview" : "Show Preview"}
            </Button>
            <Button onClick={handleDownload} disabled={isDownloading}>
              <Download className="mr-2 h-4 w-4" />
              {isDownloading ? "Generating PDF..." : "Download PDF"}
            </Button>
            <Button onClick={() => router.push('/')}>
              Back
            </Button>
          </div>
        </div>

        <Tabs defaultValue="stefano" value={activeTemplate} onValueChange={setActiveTemplate}>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10">
            {templates.map((template) => (
              <TabsTrigger key={template.id} value={template.id}>
                {template.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <ResumeEditor
            resumeData={resumeData}
            setResumeData={setResumeData}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
          />

          {/* Preview Panel */}
          {previewVisible && (
            <div className="sticky top-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <ActiveTemplateComponent resumeData={resumeData} profileImage={profileImage} />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
