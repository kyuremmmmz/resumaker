import Image from "next/image"
import { Phone, MapPin, Mail, Globe } from "lucide-react"
import { ResumeData } from "@/types/initial-data"

interface TemplateProps {
  resumeData: ResumeData
  profileImage: string | null
}

export default function MargotTemplate({ resumeData, profileImage }: TemplateProps) {
  const contactSection = resumeData.sections.find((s) => s.id === "contact")
  const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
  const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="flex flex-col items-center">
              {profileImage ? (
                <Image
                  src={profileImage || "/placeholder.svg"}
                  alt="Profile"
                  width={200}
                  height={200}
                  className="object-cover rounded-full mb-4"
                />
              ) : (
                <div className="w-48 h-48 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-500">
                    {fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              )}
              <h3 className="text-xl font-bold text-indigo-900 text-center">Software Expert</h3>
            </div>

            <div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">CONTACT INFO</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center">
                    <Phone className="text-white" size={20} />
                  </div>
                  <span>{contactSection?.fields.find((f) => f.id === "phone")?.value}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <span>{contactSection?.fields.find((f) => f.id === "location")?.value}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center">
                    <Mail className="text-white" size={20} />
                  </div>
                  <span>{contactSection?.fields.find((f) => f.id === "email")?.value}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center">
                    <Globe className="text-white" size={20} />
                  </div>
                  <span>{contactSection?.fields.find((f) => f.id === "website")?.value}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-indigo-900 mb-4">SKILLS</h3>
              <ul className="list-disc pl-5 space-y-2">
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
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold text-indigo-900 mb-2">{fullName}</h1>
              <p className="mb-6">
                {resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">AREAS OF EXPERTISE</h2>
              <p className="mb-6">
                I've worked with various types of projects and have mastered multiple programming languages and coding
                as well as software testing and debugging.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">EDUCATION</h2>
              <div className="mb-4">
                <h3 className="text-lg font-bold">
                  {
                    resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "university")
                      ?.value
                  }
                </h3>
                <p>
                  {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "degree")?.value}
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
              <h2 className="text-2xl font-bold text-indigo-900 mb-4">WORK EXPERIENCE</h2>
              {resumeData.sections
                .find((s) => s.id === "experience")
                ?.fields.filter((f) => f.id.startsWith("jobTitle"))
                .map((titleField) => {
                  const index = titleField.id.replace("jobTitle", "")
                  const experienceSection = resumeData.sections.find((s) => s.id === "experience")

                  return (
                    <div key={titleField.id} className="mb-6">
                      <h3 className="text-lg font-bold">{titleField.value}</h3>
                      <p className="mb-2">
                        {experienceSection?.fields.find((f) => f.id === `company${index}`)?.value} |{" "}
                        {experienceSection?.fields.find((f) => f.id === `dates${index}`)?.value}
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
  )
}
