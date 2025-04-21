"use client"

import { useState } from "react"
import { DashboardLayout } from "@/presentation/layouts/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronLeft,
  Save,
  Download,
  Eye,
  Settings,
  Plus,
  Trash,
  MoveUp,
  MoveDown,
  Copy,
  MoreHorizontal,
  Search,
  ZoomIn,
  ZoomOut,
  Undo,
  Redo,
  Bell,
  User,
} from "lucide-react"
import jsPDF from "jspdf"

interface ResumeEditorPageProps {
  resumeId: string
}

interface ResumeSection {
  id: string
  title: string
  fields: { label: string; value: string; id: string }[]
}

export function ResumeEditorPage({ resumeId }: ResumeEditorPageProps) {
  // All possible states
  const [title, setTitle] = useState("Software Developer Resume")
  const [previewVisible, setPreviewVisible] = useState(true)
  const [previewZoomed, setPreviewZoomed] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [sections, setSections] = useState<ResumeSection[]>([
    {
      id: "contact",
      title: "Contact Information",
      fields: [
        { label: "Full Name", value: "Alex Johnson", id: "fullName" },
        { label: "Job Title", value: "Software Developer", id: "jobTitle" },
        { label: "Email", value: "alex.johnson@example.com", id: "email" },
        { label: "Phone", value: "+1 (555) 123-4567", id: "phone" },
        { label: "Location", value: "New York, NY", id: "location" },
        { label: "Website/LinkedIn", value: "linkedin.com/in/alexjohnson", id: "website" },
      ],
    },
    {
      id: "summary",
      title: "Professional Summary",
      fields: [
        {
          label: "Summary",
          value: "A highly motivated software developer with 5+ years of experience in developing and maintaining web applications.",
          id: "summary",
        },
      ],
    },
    {
      id: "work",
      title: "Work Experience",
      fields: [
        { label: "Job Title", value: "Software Developer", id: "jobTitle" },
        { label: "Company", value: "Acme Corp", id: "company" },
        { label: "Location", value: "New York, NY", id: "location" },
        { label: "Dates", value: "2018 - Present", id: "dates" },
        {
          label: "Description",
          value: "Developed and maintained web applications using React, Node.js, and MongoDB.",
          id: "description",
        },
      ],
    },
    {
      id: "education",
      title: "Education",
      fields: [
        { label: "Degree", value: "Bachelor of Science in Computer Science", id: "degree" },
        { label: "University", value: "New York University", id: "university" },
        { label: "Location", value: "New York, NY", id: "location" },
        { label: "Dates", value: "2014 - 2018", id: "dates" },
      ],
    },
    {
      id: "skills",
      title: "Skills",
      fields: [
        { label: "Skills", value: "React, Node.js, MongoDB, JavaScript, HTML, CSS", id: "skills" },
      ],
    },
  ])
  const [history, setHistory] = useState<ResumeSection[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  // Section templates for adding new sections
  const sectionTemplates: { [key: string]: ResumeSection } = {
    certifications: {
      id: "",
      title: "Certifications",
      fields: [
        { label: "Certification Name", value: "", id: `cert-${Date.now()}` },
        { label: "Issuing Organization", value: "", id: `org-${Date.now()}` },
        { label: "Date", value: "", id: `date-${Date.now()}` },
      ],
    },
    projects: {
      id: "",
      title: "Projects",
      fields: [
        { label: "Project Name", value: "", id: `proj-${Date.now()}` },
        { label: "Description", value: "", id: `desc-${Date.now()}` },
        { label: "Technologies", value: "", id: `tech-${Date.now()}` },
      ],
    },
    custom: {
      id: "",
      title: "",
      fields: [{ label: "Field", value: "", id: `field-${Date.now()}` }],
    },
  }

  // Functions for state management
  const updateField = (sectionId: string, fieldId: string, value: string) => {
    const newSections = sections.map((section) =>
      section.id === sectionId
        ? {
          ...section,
          fields: section.fields.map((field) =>
            field.id === fieldId ? { ...field, value } : field
          ),
        }
        : section
    )
    setSections(newSections)
    setHistory([...history.slice(0, historyIndex + 1), newSections])
    setHistoryIndex(historyIndex + 1)
    setActiveSection(sectionId)
  }

  const addSection = (template: string = "custom") => {
    const templateData = { ...sectionTemplates[template] }
    templateData.id = `section-${Date.now()}`
    templateData.title = newSectionTitle || templateData.title || "Custom Section"
    const newSections = [...sections, templateData]
    setSections(newSections)
    setHistory([...history.slice(0, historyIndex + 1), newSections])
    setHistoryIndex(historyIndex + 1)
    setNewSectionTitle("")
    setActiveSection(templateData.id)
  }

  const deleteSection = (sectionId: string) => {
    const newSections = sections.filter((section) => section.id !== sectionId)
    setSections(newSections)
    setHistory([...history.slice(0, historyIndex + 1), newSections])
    setHistoryIndex(historyIndex + 1)
    if (activeSection === sectionId) setActiveSection(null)
  }

  const moveSection = (sectionId: string, direction: "up" | "down") => {
    const index = sections.findIndex((section) => section.id === sectionId)
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === sections.length - 1)
    )
      return
    const newSections = [...sections]
    const newIndex = direction === "up" ? index - 1 : index + 1
      ;[newSections[index], newSections[newIndex]] = [
        newSections[newIndex],
        newSections[index],
      ]
    setSections(newSections)
    setHistory([...history.slice(0, historyIndex + 1), newSections])
    setHistoryIndex(historyIndex + 1)
  }

  const duplicateSection = (sectionId: string) => {
    const section = sections.find((section) => section.id === sectionId)
    if (!section) return
    const newSection = {
      ...section,
      id: `section-${Date.now()}`,
      fields: section.fields.map((field) => ({
        ...field,
        id: `${field.id}-${Date.now()}`,
      })),
    }
    const newSections = [...sections, newSection]
    setSections(newSections)
    setHistory([...history.slice(0, historyIndex + 1), newSections])
    setHistoryIndex(historyIndex + 1)
    setActiveSection(newSection.id)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setSections(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setSections(history[historyIndex + 1])
    }
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 1000) // Simulate save
  }

  const handleDownload = () => {
    setIsDownloading(true)
    const doc = new jsPDF()
    let yOffset = 10

    // Add title
    doc.setFontSize(16)
    doc.text(title, 10, yOffset)
    yOffset += 10

    // Add sections
    sections.forEach((section) => {
      doc.setFontSize(14)
      doc.text(section.title, 10, yOffset)
      yOffset += 8

      doc.setFontSize(10)
      section.fields.forEach((field) => {
        const text =
          section.id === "summary" || section.id === "skills"
            ? field.value
            : `${field.label}: ${field.value}`
        doc.text(text, 10, yOffset)
        yOffset += 6
      })
      yOffset += 5
    })

    // Save PDF
    doc.save("resume.pdf")
    setIsDownloading(false)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen">
        {/* Editor Header */}
        <div className="border-b bg-white dark:bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="/resumes">
                <ChevronLeft className="h-5 w-5" />
              </a>
            </Button>
            <div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-9 font-medium border-none text-lg focus-visible:ring-0 focus-visible:ring-offset-0 px-2 w-auto"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={undo}
              disabled={historyIndex <= 0}
            >
              <Undo className="h-4 w-4" />
              <span className="hidden md:inline">Undo</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
            >
              <Redo className="h-4 w-4" />
              <span className="hidden md:inline">Redo</span>
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="h-4 w-4" />
              <span className="hidden md:inline">{isSaving ? "Saving..." : "Save"}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={() => setPreviewVisible(!previewVisible)}
            >
              <Eye className="h-4 w-4" />
              <span className="hidden md:inline">{previewVisible ? "Hide Preview" : "Show Preview"}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">{isDownloading ? "Downloading..." : "Download"}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={() => setSettingsOpen(!settingsOpen)}
            >
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Settings</span>
            </Button>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Sections */}
          <div className="w-64 border-r bg-white dark:bg-gray-800 overflow-y-auto hidden md:block">
            <div className="p-4">
              <h2 className="font-medium mb-2">Resume Sections</h2>
              <div className="space-y-2">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="border rounded-md p-2 bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{section.title}</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => moveSection(section.id, "up")}>
                            <MoveUp className="mr-2 h-4 w-4" />
                            Move Up
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => moveSection(section.id, "down")}>
                            <MoveDown className="mr-2 h-4 w-4" />
                            Move Down
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => duplicateSection(section.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => deleteSection(section.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Input
                  placeholder="New section title"
                  value={newSectionTitle}
                  onChange={(e) => setNewSectionTitle(e.target.value)}
                  className="mb-2"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full gap-1">
                      <Plus className="h-4 w-4" />
                      Add Section
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => addSection("custom")}>
                      Custom Section
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addSection("certifications")}>
                      Certifications
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addSection("projects")}>
                      Projects
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Editor Panel */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
              {sections.map((section) => (
                <Card key={section.id} className="mb-6">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-medium">{section.title}</h2>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => moveSection(section.id, "up")}
                        >
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => moveSection(section.id, "down")}
                        >
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => duplicateSection(section.id)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => deleteSection(section.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div
                      className={
                        section.id === "contact"
                          ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                          : "space-y-2"
                      }
                    >
                      {section.fields.map((field) => (
                        <div key={field.id} className="space-y-2">
                          <Label htmlFor={field.id}>{field.label}</Label>
                          <Input
                            id={field.id}
                            value={field.value}
                            onChange={(e) => updateField(section.id, field.id, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Preview Panel */}
            {previewVisible && (
              <div className="w-96 border-l bg-white dark:bg-gray-700 overflow-y-auto hidden md:block">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-medium">Preview</h2>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPreviewZoomed(!previewZoomed)}
                    >
                      {previewZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className={`border rounded-md p-4 ${previewZoomed ? "text-sm" : "text-xs"}`}>
                    <h1 className="text-2xl font-bold mb-2">{title}</h1>
                    {sections.map((section) => (
                      <div key={section.id}>
                        <h2 className="text-xl font-bold mt-4 mb-2">{section.title}</h2>
                        {section.fields.map((field) => (
                          <p key={field.id}>
                            {section.id === "summary" || section.id === "skills"
                              ? field.value
                              : `${field.label}: ${field.value}`}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}