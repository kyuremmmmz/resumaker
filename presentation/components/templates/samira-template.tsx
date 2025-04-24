import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ResumeData } from "@/types/initial-data"
import { SoftwareEngineerResume } from "@/types/postData"

interface TemplateProps {
  single?: SoftwareEngineerResume
  resumeData: ResumeData
  profileImage: string | null
}

export default function SamiraTemplate({ resumeData, profileImage, single }: TemplateProps) {
  const contactSection = single
    ? {
      fields: [
        { id: "fullName", value: single.name, label: "Full Name" },
        { id: "jobTitle", value: single.JobTitle, label: "Job Title" },
        { id: "email", value: single.email, label: "Email" },
        { id: "phone", value: single.contactNumber, label: "Phone" },
        { id: "location", value: single.Location, label: "Address" },
        { id: "website", value: single.email, label: "Website" },
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
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileImage || ""} />
                <AvatarFallback className="bg-gray-400">
                  {fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("") || "AJ"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">{fullName}</h1>
                <h2 className="text-xl md:text-2xl text-gray-700">{jobTitle}</h2>
              </div>
            </div>
          </div>
        </header>

        {/* Contact Information */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">CONTACT</h3>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
              <div className="font-medium">Phone:</div>
              <div>
                {single
                  ? single.contactNumber
                  : contactSection?.fields.find((f) => f.id === "phone")?.value}
              </div>
              <div className="font-medium">Email:</div>
              <div>
                {single
                  ? single.email
                  : contactSection?.fields.find((f) => f.id === "email")?.value}
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 mt-8 md:mt-0">
              <div className="font-medium">Address:</div>
              <div>
                {single
                  ? single.Location
                  : contactSection?.fields.find((f) => f.id === "location")?.value}
              </div>
              <div className="font-medium">Website:</div>
              <div>
                {single
                  ? single.email // Placeholder, adjust if website is available
                  : contactSection?.fields.find((f) => f.id === "website")?.value}
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-gray-200 my-6"></div>

        {/* Work Experience */}
        <section className="mb-12">
          <h3 className="text-lg font-bold uppercase mb-6">WORK EXPERIENCE</h3>
          <div className="space-y-8">
            {single ? (
              <div>
                <h4 className="font-bold text-lg">{single.PreviousJobTitle}</h4>
                <p className="text-gray-700 mb-2">{single.PreviousCompany}</p>
                <p className="text-gray-600 mb-4">{single.Date2}</p>
                <p className="mb-2">{single.PreviousDescription}</p>
              </div>
            ) : (
              resumeData.sections
                .find((s) => s.id === "experience")
                ?.fields.filter((f) => f.id.startsWith("jobTitle"))
                .map((titleField) => {
                  const index = titleField.id.replace("jobTitle", "")
                  const experienceSection = resumeData.sections.find((s) => s.id === "experience")

                  return (
                    <div key={titleField.id}>
                      <h4 className="font-bold text-lg">{titleField.value}</h4>
                      <p className="text-gray-700 mb-2">
                        {experienceSection?.fields.find((f) => f.id === `company${index}`)?.value}
                      </p>
                      <p className="text-gray-600 mb-4">
                        {experienceSection?.fields.find((f) => f.id === `dates${index}`)?.value}
                      </p>
                      <p className="mb-2">
                        {experienceSection?.fields.find((f) => f.id === `description${index}`)?.value}
                      </p>
                    </div>
                  )
                })
            )}
          </div>
        </section>

        <div className="border-t border-gray-200 my-6"></div>

        {/* Education */}
        <section className="mb-12">
          <h3 className="text-lg font-bold uppercase mb-6">EDUCATION</h3>
          <div>
            {single ? (
              <>
                <h4 className="font-bold text-lg">{single.degree}</h4>
                <p className="text-gray-700 mb-2">{single.University}</p>
                <p className="text-gray-600 mb-4">{single.DateEnded}</p>
                {single.gpa && <p>GPA: {single.gpa}</p>}
              </>
            ) : (
              <>
                <h4 className="font-bold text-lg">
                  {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "degree")?.value}
                </h4>
                <p className="text-gray-700 mb-2">
                  {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "university")?.value}
                </p>
                <p className="text-gray-600 mb-4">
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

        <div className="border-t border-gray-200 my-6"></div>

        {/* Skills */}
        <section>
          <h3 className="text-lg font-bold uppercase mb-6">SKILLS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {single ? (
              <>
                <div>
                  <h4 className="font-bold mb-2">Technical Skills</h4>
                  <ul className="list-disc pl-5">
                    {single.techskills?.split(", ").map((skill, i) => (
                      <li key={i}>{skill.replaceAll('"', "")}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Soft Skills</h4>
                  <ul className="list-disc pl-5">
                    {single.softskills?.split(", ").map((skill, i) => (
                      <li key={i}>{skill.replaceAll('"', "")}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              resumeData.sections
                .find((s) => s.id === "skills")
                ?.fields.map((field) => (
                  <div key={field.id}>
                    <h4 className="font-bold mb-2">{field.label}</h4>
                    <ul className="list-disc pl-5">
                      {field.value.split(", ").map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                ))
            )}
          </div>
        </section>

        {/* Certifications */}
        {single?.Certification1 || resumeData.sections.find((s) => s.id === "certifications") ? (
          <>
            <div className="border-t border-gray-200 my-6"></div>
            <section>
              <h3 className="text-lg font-bold uppercase mb-6">CERTIFICATIONS</h3>
              <ul className="list-disc pl-5">
                {single ? (
                  <li>
                    {single.Certification1} {single.Date1 && `(${single.Date1})`}
                  </li>
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
                        <li key={cert.id}>
                          {cert.value} {date && `(${date})`}
                        </li>
                      )
                    })
                )}
              </ul>
            </section>
          </>
        ) : null}
      </div>
    </div>
  )
}