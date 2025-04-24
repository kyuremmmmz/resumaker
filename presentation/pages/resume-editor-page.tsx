"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DoorOpenIcon, Download, Eye, EyeOff, Mail } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useEditorProps from "../hooks/useEditorprops"
import ResumeEditor from "../components/resume-editor"
import { useRouter } from "next/navigation"
import { SoftwareEngineerResume } from "@/types/postData"
import useEditorPutProps from "../hooks/useEditorPutProps"


export default function ResumePage({resume}: {resume:SoftwareEngineerResume}) {
  const {
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
    ActiveTemplateComponent
  } = useEditorProps({resume  });
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
            <Button onClick={()=>router.push('/')}>
              <DoorOpenIcon className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={() => setEmailDialogOpen(true)} variant="secondary">
              <Mail className="mr-2 h-4 w-4" />
              Send by Email
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

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Resume by Email</DialogTitle>
            <DialogDescription>Enter the email address where you'd like to send your resume.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="example@email.com"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendEmail} disabled={isSendingEmail}>
              {isSendingEmail ? "Sending..." : "Send"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
