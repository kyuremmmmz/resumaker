import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, MapPin, User, Briefcase, GraduationCap, Book } from "lucide-react"
import { ResumeData } from "@/types/initial-data"
import { SoftwareEngineerResume } from "@/types/postData"

interface TemplateProps {
  single?: SoftwareEngineerResume
  resumeData: ResumeData
  profileImage: string | null
}

export default function LornaTemplate({ resumeData, profileImage, single }: TemplateProps) {
  const contactSection = single
    ? {
      fields: [
        { id: "fullName", value: single.name, label: "Full Name" },
        { id: "jobTitle", value: single.JobTitle, label: "Job Title" },
        { id: "email", value: single.email, label: "Email" },
        { id: "phone", value: single.contactNumber, label: "Phone" },
        { id: "address", value: single.address, label: "Location" },
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
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="relative">
          <div className="h-64 bg-blue-500 clip-diagonal"></div>
          <div className="container mx-auto px-6 relative -mt-32">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 rounded-full bg-white p-2 mb-4">
                  <Avatar className="w-full h-full rounded-full">
                    <AvatarImage src={profileImage || ""} className="object-cover" />
                    <AvatarFallback className="bg-gray-300 flex items-center justify-center">
                      <span className="text-4xl font-bold text-gray-500">
                        {fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("") || "AJ"}
                      </span>
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h1 className="text-4xl font-bold text-blue-500 text-center">{fullName}</h1>
                <h2 className="text-xl text-gray-600 mb-8 text-center">{jobTitle}</h2>
              </div>
              <div className="pt-16"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="text-blue-500" />
                  <h3 className="text-xl font-bold text-gray-700">Contact</h3>
                </div>
                <div className="space-y-3 pl-8">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-blue-500" />
                    <span>
                      {single
                        ? single.contactNumber
                        : contactSection?.fields.find((f) => f.id === "phone")?.value}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-blue-500" />
                    <span>
                      {single
                        ? single.email
                        : contactSection?.fields.find((f) => f.id === "email")?.value}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-blue-500" />
                    <span>
                      {single
                        ? single.address
                        : contactSection?.fields.find((f) => f.id === "address")?.value}
                    </span>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4">
                  <User className="text-blue-500" />
                  <h3 className="text-xl font-bold text-gray-700">Introduction</h3>
                </div>
                <p className="text-gray-600">
                  {single
                    ? single.aboutMe
                    : resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value}
                </p>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4">
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
                    className="text-blue-500"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                  <h3 className="text-xl font-bold text-gray-700">Skills</h3>
                </div>
                <ul className="list-disc pl-10 space-y-2">
                  {single ? (
                    <>
                      {single.techskills?.split(", ").map((skill, i) => (
                        <li key={`tech-${i}`}>{skill.replaceAll('"', "")}</li>
                      ))}
                      {single.softskills?.split(", ").map((skill, i) => (
                        <li key={`soft-${i}`}>{skill.replaceAll('"', "")}</li>
                      ))}
                    </>
                  ) : (
                    resumeData.sections
                      .find((s) => s.id === "skills")
                      ?.fields.flatMap((field) => field.value.split(", "))
                      .map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))
                  )}
                </ul>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-2 mb-6 border-b pb-2">
                  <GraduationCap className="text-blue-500" />
                  <h3 className="text-xl font-bold text-gray-700">Education</h3>
                </div>
                <div className="space-y-8">
                  {single ? (
                    <div className="relative border-l-2 border-blue-200 pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500"></div>
                      <h4 className="text-lg font-bold">{single.degree}</h4>
                      <p className="text-gray-600 italic">{single.University}</p>
                      <div className="flex justify-between">
                        <p className="text-gray-500">{single.DateEnded}</p>
                      </div>
                      {single.gpa && <p className="text-gray-600">GPA: {single.gpa}</p>}
                    </div>
                  ) : (
                    <div className="relative border-l-2 border-blue-200 pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500"></div>
                      <h4 className="text-lg font-bold">
                        {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "degree")?.value}
                      </h4>
                      <p className="text-gray-600 italic">
                        {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "university")?.value}
                      </p>
                      <div className="flex justify-between">
                        <p className="text-gray-500">
                          {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "eduDates")?.value}
                        </p>
                      </div>
                      {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "gpa")?.value && (
                        <p className="text-gray-600">
                          GPA: {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "gpa")?.value}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-6 border-b pb-2">
                  <Briefcase className="text-blue-500" />
                  <h3 className="text-xl font-bold text-gray-700">Work Experience</h3>
                </div>
                <div className="space-y-8">
                  {single ? (
                    <div className="relative border-l-2 border-blue-200 pl-6">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500"></div>
                      <h4 className="text-lg font-bold">{single.PreviousJobTitle}</h4>
                      <p className="text-gray-600 italic">{single.PreviousCompany}</p>
                      <div className="flex justify-between">
                        <p className="text-gray-500">{single.Date2}</p>
                      </div>
                      <p className="mt-2 text-gray-600">{single.PreviousDescription}</p>
                    </div>
                  ) : (
                    resumeData.sections
                      .find((s) => s.id === "experience")
                      ?.fields.filter((f) => f.id.startsWith("jobTitle"))
                      .map((titleField) => {
                        const index = titleField.id.replace("jobTitle", "")
                        const experienceSection = resumeData.sections.find((s) => s.id === "experience")

                        return (
                          <div key={titleField.id} className="relative border-l-2 border-blue-200 pl-6">
                            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500"></div>
                            <h4 className="text-lg font-bold">{titleField.value}</h4>
                            <p className="text-gray-600 italic">
                              {experienceSection?.fields.find((f) => f.id === `company${index}`)?.value}
                            </p>
                            <div className="flex justify-between">
                              <p className="text-gray-500">
                                {experienceSection?.fields.find((f) => f.id === `dates${index}`)?.value}
                              </p>
                            </div>
                            <p className="mt-2 text-gray-600">
                              {experienceSection?.fields.find((f) => f.id === `description${index}`)?.value}
                            </p>
                          </div>
                        )
                      })
                  )}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-6 border-b pb-2">
                  <Book className="text-blue-500" />
                  <h3 className="text-xl font-bold text-gray-700">Certifications</h3>
                </div>
                <div className="space-y-4">
                  {single ? (
                    single.Certification1 && (
                      <div>
                        <p className="font-bold">{single.Certification1}</p>
                        <p className="text-gray-600">{single.Date1}</p>
                      </div>
                    )
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
                          <div key={cert.id}>
                            <p className="font-bold">{cert.value}</p>
                            <p className="text-gray-600">{date}</p>
                          </div>
                        )
                      })
                  )}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}