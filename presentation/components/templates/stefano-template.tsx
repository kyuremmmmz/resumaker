import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ResumeData } from "@/types/initial-data"

interface TemplateProps {
  resumeData: ResumeData
  profileImage: string | null
}

export default function StefanoTemplate({ resumeData, profileImage }: TemplateProps) {
  const contactSection = resumeData.sections.find((s) => s.id === "contact")
  const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
  const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"

  return (
    <div className="min-h-screen">
      <div className="bg-gray-800 text-white p-6">
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
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <p className="text-lg">{jobTitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Column */}
        <div className="space-y-6">
          {resumeData.sections
            .filter((section) => ["summary", "experience"].includes(section.id))
            .map((section) => (
              <div key={section.id}>
                <h2 className="text-xl font-bold mb-2">{section.title}</h2>
                {section.id === "summary" ? (
                  <p>{section.fields.find((f) => f.id === "summary")?.value}</p>
                ) : section.id === "experience" ? (
                  <div className="space-y-4">
                    {section.fields
                      .filter((f) => f.id.startsWith("jobTitle"))
                      .map((titleField) => {
                        const index = titleField.id.replace("jobTitle", "")
                        return (
                          <div key={titleField.id}>
                            <h3 className="font-bold">{titleField.value}</h3>
                            <p>
                              {section.fields.find((f) => f.id === `company${index}`)?.value},{" "}
                              {section.fields.find((f) => f.id === `dates${index}`)?.value}
                            </p>
                            <ul className="list-disc pl-5 mt-2">
                              <li>{section.fields.find((f) => f.id === `description${index}`)?.value}</li>
                            </ul>
                          </div>
                        )
                      })}
                  </div>
                ) : null}
              </div>
            ))}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {resumeData.sections
            .filter((section) => ["contact", "education", "skills", "certifications", "languages"].includes(section.id))
            .map((section) => (
              <div key={section.id}>
                <h2 className="text-xl font-bold mb-2">{section.title}</h2>
                {section.id === "contact" ? (
                  <div className="space-y-1">
                    {section.fields.map((field) => (
                      <p key={field.id}>
                        <span className="font-bold">{field.label}:</span> {field.value}
                      </p>
                    ))}
                  </div>
                ) : section.id === "education" ? (
                  <div>
                    <h3 className="font-bold">{section.fields.find((f) => f.id === "degree")?.value}</h3>
                    <p>
                      {section.fields.find((f) => f.id === "university")?.value},{" "}
                      {section.fields.find((f) => f.id === "eduDates")?.value}
                    </p>
                    {section.fields.find((f) => f.id === "gpa")?.value && (
                      <p>GPA: {section.fields.find((f) => f.id === "gpa")?.value}</p>
                    )}
                  </div>
                ) : section.id === "skills" || section.id === "languages" ? (
                  <div>
                    {section.fields.map((field) => (
                      <div key={field.id}>
                        <p className="font-bold">{field.label}:</p>
                        <ul className="list-disc pl-5">
                          {field.value.split(", ").map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : section.id === "certifications" ? (
                  <ul className="list-disc pl-5">
                    {section.fields
                      .filter((f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"))
                      .map((cert) => {
                        const index = cert.id.replace("cert", "")
                        const date = section.fields.find((f) => f.id === `certDate${index}`)?.value
                        return (
                          <li key={cert.id}>
                            {cert.value} {date && `(${date})`}
                          </li>
                        )
                      })}
                  </ul>
                ) : null}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
