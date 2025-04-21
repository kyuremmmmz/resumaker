import { ResumeData } from "@/types/initial-data"


interface TemplateProps {
  resumeData: ResumeData
  profileImage: string | null
}

export default function DanielTemplate({ resumeData, profileImage }: TemplateProps) {
  const contactSection = resumeData.sections.find((s) => s.id === "contact")
  const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
  const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">{fullName}</h1>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">{jobTitle}</h2>
          <p className="text-gray-600">
            {contactSection?.fields.find((f) => f.id === "location")?.value} |{" "}
            {contactSection?.fields.find((f) => f.id === "email")?.value} |{" "}
            {contactSection?.fields.find((f) => f.id === "website")?.value}
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-bold text-gray-700 mb-2">INTRODUCTION</h3>
          </div>
          <p className="mt-4 text-gray-700">
            {resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value}
          </p>
        </section>

        {/* Technical Skills */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-bold text-gray-700 mb-2">TECHNICAL SKILLS</h3>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {resumeData.sections
              .find((s) => s.id === "skills")
              ?.fields.map((field) => (
                <div key={field.id}>
                  <h4 className="font-bold mb-2">{field.label}</h4>
                  <ul className="space-y-2">
                    {field.value.split(", ").map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-bold text-gray-700 mb-2">WORK EXPERIENCE</h3>
          </div>
          <div className="mt-4 space-y-6">
            {resumeData.sections
              .find((s) => s.id === "experience")
              ?.fields.filter((f) => f.id.startsWith("jobTitle"))
              .map((titleField) => {
                const index = titleField.id.replace("jobTitle", "")
                const experienceSection = resumeData.sections.find((s) => s.id === "experience")

                return (
                  <div key={titleField.id}>
                    <div className="flex flex-col md:flex-row md:justify-between mb-2">
                      <h4 className="text-lg font-bold">{titleField.value}</h4>
                      <p className="font-medium">
                        {experienceSection?.fields.find((f) => f.id === `dates${index}`)?.value}
                      </p>
                    </div>
                    <p className="mb-2">{experienceSection?.fields.find((f) => f.id === `company${index}`)?.value}</p>
                    <p>{experienceSection?.fields.find((f) => f.id === `description${index}`)?.value}</p>
                  </div>
                )
              })}
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-bold text-gray-700 mb-2">EDUCATION</h3>
          </div>
          <div className="mt-4 space-y-6">
            <div>
              <div className="flex flex-col md:flex-row md:justify-between mb-2">
                <h4 className="text-lg font-bold">
                  {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "degree")?.value}
                </h4>
                <p className="font-medium">
                  {
                    resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "eduDates")
                      ?.value
                  }
                </p>
              </div>
              <p>
                {
                  resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "university")
                    ?.value
                }
              </p>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section>
          <div className="bg-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-bold text-gray-700 mb-2">ADDITIONAL INFORMATION</h3>
          </div>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>
              <span className="font-bold">Languages:</span>{" "}
              {resumeData.sections.find((s) => s.id === "languages")?.fields.find((f) => f.id === "languages")?.value}
            </li>
            <li>
              <span className="font-bold">Certifications:</span>{" "}
              {resumeData.sections
                .find((s) => s.id === "certifications")
                ?.fields.filter((f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"))
                .map((cert) => {
                  const index = cert.id.replace("cert", "")
                  const date = resumeData.sections
                    .find((s) => s.id === "certifications")
                    ?.fields.find((f) => f.id === `certDate${index}`)?.value
                  return `${cert.value} (${date})`
                })
                .join(", ")}
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
