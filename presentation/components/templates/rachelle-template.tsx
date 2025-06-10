import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, Globe, MapPin } from "lucide-react"
import { ResumeData } from "@/types/initial-data"
import { SoftwareEngineerResume } from "@/types/postData"

interface TemplateProps {
  single?: SoftwareEngineerResume
  resumeData: ResumeData
  profileImage: string | null
}

export default function RachelleTemplate({ resumeData, profileImage, single }: TemplateProps) {
  const contactSection = single
    ? {
      fields: [
        { id: "fullName", value: single.name, label: "Full Name" },
        { id: "jobTitle", value: single.JobTitle, label: "Job Title" },
        { id: "email", value: single.email, label: "Email" },
        { id: "phone", value: single.contactNumber, label: "Phone" },
        { id: "address", value: single.address, label: "Location" },
        { id: "website", value: single.email, label: "Website" }, // Placeholder, adjust if website is available
      ],
      id: "contact",
      title: "Contact",
    }
    : resumeData.sections.find((s) => s.id === "contact")

  const fullName = single
    ? single.name
    : contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"

  const jobTitle = single
    ? single.JobTitle
    : contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-5xl mx-auto p-6">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="#D53F8C" fillOpacity="0.2" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="#D53F8C" fillOpacity="0.2" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div className="absolute inset-0 border-2 border-pink-400 rounded-full transform rotate-45"></div>
                  <Avatar className="w-48 h-48 rounded-full border-4 border-white">
                    <AvatarImage src={profileImage || ""} className="object-cover" />
                    <AvatarFallback className="bg-gray-300 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-500">
                        {`${fullName}`
                          .split(" ")
                          .map((n) => n[0])
                          .join("") || "AJ"}
                      </span>
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-serif font-bold border-b border-gray-300 pb-2 mb-4">EDUCATION</h3>
                <div>
                  {single ? (
                    <>
                      <p className="font-bold">{single.University}</p>
                      <p>{single.degree}</p>
                      <p>{single.DateEnded}</p>
                      {single.gpa && <p>GPA: {single.gpa}</p>}
                    </>
                  ) : (
                    <>
                      <p className="font-bold">
                        {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "university")?.value}
                      </p>
                      <p>
                        {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "degree")?.value}
                      </p>
                      <p>
                        {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "eduDates")?.value}
                      </p>
                      {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "gpa")?.value && (
                        <p>
                          GPA: {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "gpa")?.value}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold border-b border-gray-300 pb-2 mb-4">SKILL</h3>
                <div className="space-y-4">
                  {single ? (
                    <>
                      {single.techskills?.split(", ").map((skill, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1">
                            <span>{skill.replaceAll('"', "")}</span>
                            <span>90%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: `${90 - i * 5}%` }}></div>
                          </div>
                        </div>
                      ))}
                      {single.softskills?.split(", ").map((skill, i) => (
                        <div key={i + (single.techskills?.split(", ").length || 0)}>
                          <div className="flex justify-between mb-1">
                            <span>{skill.replaceAll('"', "")}</span>
                            <span>90%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: `${90 - i * 5}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    resumeData.sections
                      .find((s) => s.id === "skills")
                      ?.fields.flatMap((field) => field.value.split(", "))
                      .map((skill, i) => (
                        <div key={i}>
                          <div className="flex justify-between mb-1">
                            <span>{skill}</span>
                            <span>90%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: `${90 - i * 5}%` }}></div>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-8">
                <h1 className="text-5xl font-serif font-bold text-indigo-900 mb-2">{fullName}</h1>
                <h2 className="text-2xl text-gray-700 mb-6 border-b border-gray-300 pb-2">{jobTitle}</h2>
                <p className="mb-6">
                  {single
                    ? single.aboutMe
                    : resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-serif font-bold border-b border-gray-300 pb-2 mb-4">WORK EXPERIENCE</h3>
                {single ? (
                  <div className="mb-6">
                    <p className="text-gray-700">{single.Date2}</p>
                    <p className="font-bold">{single.PreviousCompany}</p>
                    <p className="font-medium">{single.PreviousJobTitle}</p>
                    <p>{single.PreviousDescription}</p>
                  </div>
                ) : (
                  resumeData.sections
                    .find((s) => s.id === "experience")
                    ?.fields.filter((f) => f.id.startsWith("jobTitle"))
                    .map((titleField) => {
                      const index = titleField.id.replace("jobTitle", "")
                      const experienceSection = resumeData.sections.find((s) => s.id === "experience")

                      return (
                        <div key={titleField.id} className="mb-6">
                          <p className="text-gray-700">
                            {experienceSection?.fields.find((f) => f.id === `dates${index}`)?.value}
                          </p>
                          <p className="font-bold">
                            {experienceSection?.fields.find((f) => f.id === `company${index}`)?.value}
                          </p>
                          <p className="font-medium">{titleField.value}</p>
                          <p>{experienceSection?.fields.find((f) => f.id === `description${index}`)?.value}</p>
                        </div>
                      )
                    })
                )}
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold border-b border-gray-300 pb-2 mb-4">CONTACT</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="text-pink-500" />
                    <span>
                      {single
                        ? single.contactNumber
                        : contactSection?.fields.find((f) => f.id === "phone")?.value}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-pink-500" />
                    <span>
                      {single
                        ? single.email
                        : contactSection?.fields.find((f) => f.id === "email")?.value}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="text-pink-500" />
                    <span>
                      {single
                        ? single.email // Placeholder, adjust if website is available
                        : contactSection?.fields.find((f) => f.id === "website")?.value}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="text-pink-500" />
                    <span>
                      {single
                        ? single.address
                        : contactSection?.fields.find((f) => f.id === "address")?.value}
                    </span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              {(single?.Certification1 || resumeData.sections.find((s) => s.id === "certifications")) && (
                <div className="mt-8">
                  <h3 className="text-2xl font-serif font-bold border-b border-gray-300 pb-2 mb-4">CERTIFICATIONS</h3>
                  <div className="space-y-3">
                    {single ? (
                      <p>
                        {single.Certification1} {single.Date1 && `(${single.Date1})`}
                      </p>
                    ) : (
                      resumeData.sections
                        .find((s) => s.id === "certifications")
                        ?.fields.filter((f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"))
                        .map((cert) => {
                          const index = cert.id.replace("cert", "")
                          const date = resumeData.sections
                            .find((s) => s.id === "certifications")
                            ?.fields.find((f) => f.id === `certDate${index}`)?.value
                          return (
                            <p key={cert.id}>
                              {cert.value} {date && `(${date})`}
                            </p>
                          )
                        })
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}