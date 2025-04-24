import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ResumeData } from "@/types/initial-data"
import { SoftwareEngineerResume } from "@/types/postData"

interface TemplateProps {
  single?: SoftwareEngineerResume
  resumeData: ResumeData
  profileImage: string | null
}

export default function KathrynTemplate({ resumeData, profileImage, single }: TemplateProps) {
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="mb-8">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
          <div className="w-32 h-32 md:w-48 md:h-48 relative mb-4 md:mb-0 md:mr-8">
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
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-2">{fullName}, RN</h1>
            <ul className="list-disc md:list-none pl-6 md:pl-0 space-y-1">
              <li>
                {single
                  ? single.contactNumber
                  : contactSection?.fields.find((f) => f.id === "phone")?.value}
              </li>
              <li>
                {single
                  ? single.email
                  : contactSection?.fields.find((f) => f.id === "email")?.value}
              </li>
              <li>
                {single
                  ? single.Location
                  : contactSection?.fields.find((f) => f.id === "location")?.value}
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div className="border-t border-blue-700"></div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <section>
            <h3 className="text-2xl font-bold text-blue-700 mb-4">INTRODUCTION</h3>
            <p className="mb-8">
              {single
                ? single.aboutMe
                : resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value}
            </p>

            <h3 className="text-2xl font-bold text-blue-700 mb-4">EDUCATION</h3>
            <div className="mb-8">
              {single ? (
                <>
                  <h4 className="font-bold">{single.degree}</h4>
                  <p>
                    {single.University}, {single.DateEnded}
                  </p>
                  {single.gpa && <p>GPA: {single.gpa}</p>}
                </>
              ) : (
                <>
                  <h4 className="font-bold">
                    {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "degree")?.value}
                  </h4>
                  <p>
                    {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "university")?.value},{" "}
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

            <h3 className="text-2xl font-bold text-blue-700 mb-4">CERTIFICATIONS</h3>
            <div className="mb-8">
              {single ? (
                single.Certification1 && (
                  <div className="mb-2">
                    <h4 className="font-bold">{single.Certification1}</h4>
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
                      <div key={cert.id} className="mb-2">
                        <h4 className="font-bold">{cert.value}</h4>
                        <p>{date}</p>
                      </div>
                    )
                  })
              )}
            </div>

            <h3 className="text-2xl font-bold text-blue-700 mb-4">SKILLS</h3>
            <ul className="list-disc pl-5 space-y-1 mb-8">
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

          {/* Right Column */}
          <section>
            <h3 className="text-2xl font-bold text-blue-700 mb-4">WORK EXPERIENCE</h3>
            <div className="space-y-6">
              {single ? (
                <div className="mb-6">
                  <h4 className="font-bold">{single.PreviousJobTitle}</h4>
                  <p>{single.PreviousCompany}</p>
                  <p className="mb-2">{single.Date2}</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{single.PreviousDescription}</li>
                  </ul>
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
                        <h4 className="font-bold">{titleField.value}</h4>
                        <p>{experienceSection?.fields.find((f) => f.id === `company${index}`)?.value}</p>
                        <p className="mb-2">{experienceSection?.fields.find((f) => f.id === `dates${index}`)?.value}</p>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>{experienceSection?.fields.find((f) => f.id === `description${index}`)?.value}</li>
                        </ul>
                      </div>
                    )
                  })
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}