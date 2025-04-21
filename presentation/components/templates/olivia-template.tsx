import Image from "next/image"
import { Phone, Mail, Globe, MapPin } from "lucide-react"
import { ResumeData } from "@/types/initial-data"


interface TemplateProps {
  resumeData: ResumeData
  profileImage: string | null
}

export default function OliviaTemplate({ resumeData, profileImage }: TemplateProps) {
  const contactSection = resumeData.sections.find((s) => s.id === "contact")
  const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
  const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"

  return (
    <div className="min-h-screen bg-[#f0e9e5]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr]">
          {/* Left Column */}
          <div className="border border-gray-300 p-6 bg-white">
            <div className="flex justify-center mb-8">
              {profileImage ? (
                <Image
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                  width={200}
                  height={200}
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-500">
                    {fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2">
                <div className="bg-gray-200 p-1 rounded">
                  <Phone size={16} className="text-gray-700" />
                </div>
                <span>{contactSection?.fields.find((f) => f.id === "phone")?.value}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gray-200 p-1 rounded">
                  <Mail size={16} className="text-gray-700" />
                </div>
                <span>{contactSection?.fields.find((f) => f.id === "email")?.value}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gray-200 p-1 rounded">
                  <Globe size={16} className="text-gray-700" />
                </div>
                <span>{contactSection?.fields.find((f) => f.id === "website")?.value}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-gray-200 p-1 rounded">
                  <MapPin size={16} className="text-gray-700" />
                </div>
                <span>{contactSection?.fields.find((f) => f.id === "location")?.value}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4 bg-[#f0e9e5] p-2">Education</h2>
              <div className="mb-4">
                <h3 className="text-lg font-bold">
                  {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "degree")?.value}
                </h3>
                <p>
                  {
                    resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "university")
                      ?.value
                  }
                </p>
                <p>
                  {
                    resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "eduDates")
                      ?.value
                  }
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 bg-[#f0e9e5] p-2">Skills</h2>
              <ul className="space-y-3">
                {resumeData.sections
                  .find((s) => s.id === "skills")
                  ?.fields.flatMap((field) => field.value.split(", "))
                  .map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-gray-800 mb-1">{fullName}</h1>
              <h2 className="text-2xl text-gray-600 mb-8">{jobTitle}</h2>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold">Profile</h3>
                </div>
                <p className="text-gray-700">
                  {resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold">Work Experience</h3>
                </div>

                <div className="border-l-2 border-gray-300 pl-6 ml-3 space-y-8">
                  {resumeData.sections
                    .find((s) => s.id === "experience")
                    ?.fields.filter((f) => f.id.startsWith("jobTitle"))
                    .map((titleField, idx) => {
                      const index = titleField.id.replace("jobTitle", "")
                      const experienceSection = resumeData.sections.find((s) => s.id === "experience")

                      return (
                        <div key={titleField.id} className="relative">
                          <div className="absolute -left-[31px] top-1 w-5 h-5 rounded-full bg-gray-300"></div>
                          <div className="flex justify-between mb-1">
                            <h4 className="text-lg font-bold">{titleField.value}</h4>
                            <span className="text-gray-600">
                              {experienceSection?.fields.find((f) => f.id === `dates${index}`)?.value}
                            </span>
                          </div>
                          <p className="font-medium mb-2">
                            {experienceSection?.fields.find((f) => f.id === `company${index}`)?.value}
                          </p>
                          <p>{experienceSection?.fields.find((f) => f.id === `description${index}`)?.value}</p>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
