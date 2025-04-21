import { ResumeData } from "@/types/initial-data"


interface TemplateProps {
  resumeData: ResumeData
  profileImage: string | null
}

export default function SamiraTemplate({ resumeData, profileImage }: TemplateProps) {
  const contactSection = resumeData.sections.find((s) => s.id === "contact")
  const fullName = contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name"
  const jobTitle = contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title"

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-0">{fullName}</h1>
            <h2 className="text-xl md:text-2xl text-gray-700">{jobTitle}</h2>
          </div>
        </header>

        {/* Contact Information */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold uppercase mb-4">CONTACT</h3>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
              <div className="font-medium">Phone:</div>
              <div>{contactSection?.fields.find((f) => f.id === "phone")?.value}</div>
              <div className="font-medium">Email:</div>
              <div>{contactSection?.fields.find((f) => f.id === "email")?.value}</div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 mt-8 md:mt-0">
              <div className="font-medium">Address:</div>
              <div>{contactSection?.fields.find((f) => f.id === "location")?.value}</div>
              <div className="font-medium">Website:</div>
              <div>{contactSection?.fields.find((f) => f.id === "website")?.value}</div>
            </div>
          </div>
        </section>

        <div className="border-t border-gray-200 my-6"></div>

        {/* Work Experience */}
        <section className="mb-12">
          <h3 className="text-lg font-bold uppercase mb-6">WORK EXPERIENCE</h3>
          <div className="space-y-8">
            {resumeData.sections
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
              })}
          </div>
        </section>

        <div className="border-t border-gray-200 my-6"></div>

        {/* Education */}
        <section className="mb-12">
          <h3 className="text-lg font-bold uppercase mb-6">EDUCATION</h3>
          <div>
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
          </div>
        </section>

        <div className="border-t border-gray-200 my-6"></div>

        {/* Skills */}
        <section>
          <h3 className="text-lg font-bold uppercase mb-6">SKILLS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeData.sections
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
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}
