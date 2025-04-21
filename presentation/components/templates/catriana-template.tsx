import { ResumeData } from "@/types/initial-data"


interface TemplateProps {
  resumeData: ResumeData
  profileImage: string | null
}

export default function CatrianaTemplate({ resumeData, profileImage }: TemplateProps) {
  const contactSection = resumeData.sections.find((s) => s.id === "contact")
  const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
  const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-2">{fullName}</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">{jobTitle}</h2>

          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-blue-600 mb-4">INTRODUCTION</h3>
              <p className="text-gray-700 max-w-2xl">
                {resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-4">CONTACT INFO</h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {contactSection?.fields.find((f) => f.id === "email")?.value}
                </p>
                <p>
                  <span className="font-medium">Website:</span>{" "}
                  {contactSection?.fields.find((f) => f.id === "website")?.value}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {contactSection?.fields.find((f) => f.id === "phone")?.value}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Work Experience */}
        <section className="mb-12">
          <h3 className="text-xl font-bold text-blue-600 mb-6">WORK EXPERIENCE</h3>
          <div className="space-y-8">
            {resumeData.sections
              .find((s) => s.id === "experience")
              ?.fields.filter((f) => f.id.startsWith("jobTitle"))
              .map((titleField) => {
                const index = titleField.id.replace("jobTitle", "")
                const experienceSection = resumeData.sections.find((s) => s.id === "experience")

                return (
                  <div key={titleField.id}>
                    <div className="mb-2">
                      <h4 className="text-lg font-bold">{titleField.value}</h4>
                      <p className="text-gray-600">
                        {experienceSection?.fields.find((f) => f.id === `company${index}`)?.value} |{" "}
                        {experienceSection?.fields.find((f) => f.id === `dates${index}`)?.value}
                      </p>
                    </div>
                    <p>{experienceSection?.fields.find((f) => f.id === `description${index}`)?.value}</p>
                  </div>
                )
              })}
          </div>
        </section>

        {/* Two Column Layout for Education and Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Education */}
          <section>
            <h3 className="text-xl font-bold text-blue-600 mb-6">EDUCATION</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold">
                  {
                    resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "university")
                      ?.value
                  }
                </h4>
                <p>
                  {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "degree")?.value}{" "}
                  |{" "}
                  {
                    resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "eduDates")
                      ?.value
                  }
                </p>
                <p>
                  GPA:{" "}
                  {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "gpa")?.value}
                </p>
              </div>
            </div>
          </section>

          {/* Skills and Additional Info */}
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold text-blue-600 mb-6">SKILLS</h3>
              <ul className="grid grid-cols-1 gap-2">
                {resumeData.sections
                  .find((s) => s.id === "skills")
                  ?.fields.flatMap((field) => field.value.split(", "))
                  .map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-blue-600 mb-6">CERTIFICATIONS</h3>
              <div>
                {resumeData.sections
                  .find((s) => s.id === "certifications")
                  ?.fields.filter((f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"))
                  .map((cert) => {
                    const index = cert.id.replace("cert", "")
                    const date = resumeData.sections
                      .find((s) => s.id === "certifications")
                      ?.fields.find((f) => f.id === `certDate${index}`)?.value
                    return (
                      <p key={cert.id}>
                        {cert.value} ({date})
                      </p>
                    )
                  })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
