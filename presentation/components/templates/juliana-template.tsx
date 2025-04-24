import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart } from "lucide-react"
import { ResumeData } from "@/types/initial-data"
import { SoftwareEngineerResume } from "@/types/postData"

interface TemplateProps {
  single?: SoftwareEngineerResume
  resumeData: ResumeData
  profileImage: string | null
}

export default function JulianaTemplate({ resumeData, profileImage, single }: TemplateProps) {
  const contactSection = single
    ? {
      fields: [
        { id: "fullName", value: single.name, label: "Full Name" },
        { id: "jobTitle", value: single.JobTitle, label: "Job Title" },
        { id: "email", value: single.email, label: "Email" },
        { id: "phone", value: single.contactNumber, label: "Phone" },
        { id: "location", value: single.Location, label: "Location" },
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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-lg">
        {/* Header */}
        <header className="relative mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white relative z-10">
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
              <div className="absolute inset-0 w-40 h-40 rounded-full border-2 border-pink-300 animate-[spin_20s_linear_infinite]"></div>
            </div>

            <div className="text-center md:text-left md:ml-4">
              <div className="inline-block bg-white rounded-full px-4 py-2 mb-2">
                <p className="font-medium">Hello! My name</p>
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-4xl md:text-5xl font-bold">{fullName}</h1>
                <Heart className="text-pink-500" />
              </div>
              <h2 className="text-xl text-gray-700 mb-4">{jobTitle}</h2>

              <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
                <div className="bg-black text-white rounded-full px-4 py-1 flex items-center justify-center">
                  <span>
                    {single
                      ? single.contactNumber
                      : contactSection?.fields.find((f) => f.id === "phone")?.value}
                  </span>
                </div>
                <div className="bg-pink-200 text-gray-800 rounded-full px-4 py-1 flex items-center justify-center">
                  <span>
                    {single
                      ? single.email
                      : contactSection?.fields.find((f) => f.id === "email")?.value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* About Me */}
        <section className="mb-8">
          <div className="bg-white rounded-full px-6 py-3 inline-block mb-4">
            <h3 className="text-xl font-bold">About Me</h3>
          </div>
          <p className="text-gray-700">
            {single
              ? single.aboutMe
              : resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experience */}
          <section>
            <div className="bg-white rounded-full px-6 py-3 inline-block mb-4">
              <h3 className="text-xl font-bold">Experience</h3>
            </div>

            <div className="space-y-8">
              {single ? (
                <div className="relative">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-bold uppercase">{single.PreviousJobTitle}</h4>
                    <Heart className="text-pink-500" />
                  </div>
                  <div className="flex justify-between mb-2">
                    <p>{single.PreviousCompany}</p>
                    <p>{single.Date2}</p>
                  </div>
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
                      <div key={titleField.id} className="relative">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="text-lg font-bold uppercase">{titleField.value}</h4>
                          <Heart className="text-pink-500" />
                        </div>
                        <div className="flex justify-between mb-2">
                          <p>{experienceSection?.fields.find((f) => f.id === `company${index}`)?.value}</p>
                          <p>{experienceSection?.fields.find((f) => f.id === `dates${index}`)?.value}</p>
                        </div>
                        <p>{experienceSection?.fields.find((f) => f.id === `description${index}`)?.value}</p>
                      </div>
                    )
                  })
              )}
            </div>
          </section>

          {/* Education, Skills, and Certifications */}
          <div className="space-y-8">
            <section>
              <div className="bg-white rounded-full px-6 py-3 inline-block mb-4">
                <h3 className="text-xl font-bold">Education</h3>
              </div>
              <div className="mb-4">
                {single ? (
                  <>
                    <h4 className="text-lg font-bold uppercase">{single.degree}</h4>
                    <p>{single.University}</p>
                    <p>{single.DateEnded}</p>
                    {single.gpa && <p>GPA: {single.gpa}</p>}
                  </>
                ) : (
                  <>
                    <h4 className="text-lg font-bold uppercase">
                      {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "degree")?.value}
                    </h4>
                    <p>
                      {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "university")?.value}
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
            </section>

            <section>
              <div className="bg-white rounded-full px-6 py-3 inline-block mb-4">
                <h3 className="text-xl font-bold">Personal Skill</h3>
              </div>
              <div className="space-y-3">
                {single ? (
                  <>
                    {single.techskills?.split(", ").map((skill, i) => (
                      <div key={`tech-${i}`}>
                        <div className="flex justify-between mb-1">
                          <span>{skill.replaceAll('"', "")}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: `${95 - i * 5}%` }}></div>
                        </div>
                      </div>
                    ))}
                    {single.softskills?.split(", ").map((skill, i) => (
                      <div key={`soft-${i}`}>
                        <div className="flex justify-between mb-1">
                          <span>{skill.replaceAll('"', "")}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: `${95 - i * 5}%` }}></div>
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
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: `${95 - i * 5}%` }}></div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </section>

            <section>
              <div className="bg-white rounded-full px-6 py-3 inline-block mb-4">
                <h3 className="text-xl font-bold">Certifications</h3>
              </div>
              <div className="space-y-3">
                {single ? (
                  single.Certification1 && (
                    <div>
                      <p className="font-bold">{single.Certification1}</p>
                      <p>{single.Date1}</p>
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
                          <p>{date}</p>
                        </div>
                      )
                    })
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}