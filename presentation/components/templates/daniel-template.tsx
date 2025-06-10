import { ResumeData } from "@/types/initial-data"
import { SoftwareEngineerResume } from "@/types/postData"

interface TemplateProps {
  single?: SoftwareEngineerResume
  resumeData: ResumeData
  profileImage: string | null
}

export default function DanielTemplate({ resumeData, profileImage, single }: TemplateProps) {
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
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">{fullName}</h1>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">{jobTitle}</h2>
          <p className="text-gray-600">
            {single
              ? single.address
              : contactSection?.fields.find((f) => f.id === "address")?.value}{" "}
            |{" "}
            {single
              ? single.email
              : contactSection?.fields.find((f) => f.id === "email")?.value}{" "}
            |{" "}
            {single
              ? single.email // Placeholder for website
              : contactSection?.fields.find((f) => f.id === "website")?.value}
          </p>
        </header>

        {/* Introduction */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-bold text-gray-700 mb-2">INTRODUCTION</h3>
          </div>
          <p className="mt-4 text-gray-700">
            {single
              ? single.aboutMe
              : resumeData.sections.find((s) => s.id === "summary")?.fields.find((f) => f.id === "summary")?.value}
          </p>
        </section>

        {/* Technical Skills */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-bold text-gray-700 mb-2">TECHNICAL SKILLS</h3>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {single ? (
              <>
                <div>
                  <h4 className="font-bold mb-2">Technical Skills</h4>
                  <ul className="space-y-2">
                    {single.techskills?.split(", ").map((skill, i) => (
                      <li key={`tech-${i}`}>{skill.replaceAll('"', "")}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Soft Skills</h4>
                  <ul className="space-y-2">
                    {single.softskills?.split(", ").map((skill, i) => (
                      <li key={`soft-${i}`}>{skill.replaceAll('"', "")}</li>
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
                    <ul className="space-y-2">
                      {field.value.split(", ").map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                ))
            )}
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-bold text-gray-700 mb-2">WORK EXPERIENCE</h3>
          </div>
          <div className="mt-4 space-y-6">
            {single ? (
              <div>
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h4 className="text-lg font-bold">{single.PreviousJobTitle}</h4>
                  <p className="font-medium">{single.Date2}</p>
                </div>
                <p className="mb-2">{single.PreviousCompany}</p>
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
                })
            )}
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <div className="bg-gray-200 rounded-lg p-4">
            <h3 className="text-xl font-bold text-gray-700 mb-2">EDUCATION</h3>
          </div>
          <div className="mt-4 space-y-6">
            {single ? (
              <div>
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h4 className="text-lg font-bold">{single.degree}</h4>
                  <p className="font-medium">{single.DateEnded}</p>
                </div>
                <p>{single.University}</p>
                {single.gpa && <p>GPA: {single.gpa}</p>}
              </div>
            ) : (
              <div>
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h4 className="text-lg font-bold">
                    {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "degree")?.value}
                  </h4>
                  <p className="font-medium">
                    {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "eduDates")?.value}
                  </p>
                </div>
                <p>
                  {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "university")?.value}
                </p>
                {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "gpa")?.value && (
                  <p>
                    GPA: {resumeData.sections.find((s) => s.id === "education")?.fields.find((f) => f.id === "gpa")?.value}
                  </p>
                )}
              </div>
            )}
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
              {single
                ? "Not specified" // Placeholder, as SoftwareEngineerResume lacks languages
                : resumeData.sections.find((s) => s.id === "languages")?.fields.find((f) => f.id === "languages")?.value}
            </li>
            <li>
              <span className="font-bold">Certifications:</span>{" "}
              {single ? (
                single.Certification1 ? `${single.Certification1} (${single.Date1})` : "None"
              ) : (
                resumeData.sections
                  .find((s) => s.id === "certifications")
                  ?.fields.filter((f) => f.id.startsWith("cert") && !f.id.startsWith("certDate"))
                  .map((cert) => {
                    const index = cert.id.replace("cert", "")
                    const date = resumeData.sections
                      .find((s) => s.id === "certifications")
                      ?.fields.find((f) => f.id === `certDate${index}`)?.value
                    return `${cert.value} (${date})`
                  })
                  .join(", ")
              )}
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}