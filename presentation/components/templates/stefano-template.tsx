import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ResumeData } from "@/types/initial-data"
import { SoftwareEngineerResume } from "@/types/postData"

interface TemplateProps {
  single?: SoftwareEngineerResume
  resumeData: ResumeData
  profileImage: string | null
}




export default function StefanoTemplate({ resumeData, profileImage, single }: TemplateProps) {
  const contactSection = single
    ? {
      fields: [
        { id: "fullName", value: single.name, label: "Full Name" },
        { id: "jobTitle", value: single.JobTitle, label: "Job Title" },
        { id: "email", value: single.email, label: "Email" },
        { id: "phone", value: single.contactNumber, label: "Phone" },
        { id: "location", value: single.Location, label: "Location" }
      ], id: "contact", title: "Contact"
    }
    : resumeData.sections.find((s) => s.id === "contact");

  const fullName = single
    ? single.name
    : contactSection?.fields.find((f) => f.id === "fullName")?.value || "Full Name";

  const jobTitle = single
    ? single.JobTitle
    : contactSection?.fields.find((f) => f.id === "jobTitle")?.value || "Job Title";

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
          {single ? (
            <>
              <div>
                <h2 className="text-xl font-bold mb-2">Summary</h2>
                <p>{single.aboutMe}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Experience</h2>
                <div className="space-y-4">
                    <div>
                      <h3 className="font-bold">{single.PreviousJobTitle}</h3>
                      <p>{single.PreviousCompany}, {single.Date2}</p>
                      <ul className="list-disc pl-5 mt-2">
                        <li>{single.PreviousDescription}</li>
                      </ul>
                    </div>
                </div>
              </div>
            </>
          ) : (
            resumeData.sections
              .filter((section) => ["summary", "experience"].includes(section.id))
              .map((section) => (
                <div key={section.id}>
                  <h2 className="text-xl font-bold linesmb-2">{section.title}</h2>
                  {section.id === "summary" ? (
                    <p>{section.fields.find((f) => f.id === "summary")?.value}</p>
                  ) : section.id === "experience" ? (
                    <div className="space-y-4">
                      {section.fields
                        .filter((f) => f.id.startsWith("jobTitle"))
                        .map((titleField) => {
                          const index = titleField.id.replace("jobTitle", "");
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
                          );
                        })}
                    </div>
                  ) : null}
                </div>
              ))
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {single ? (
            <>
              <div>
                <h2 className="text-xl font-bold mb-2">Contact</h2>
                <div className="space-y-1">
                  <p>
                    <span className="font-bold">{'Name'}:</span> {single.name}<br></br>
                    <span className="font-bold">{'Contact Number'}:</span> {single.contactNumber}<br></br>
                    <span className="font-bold">{'LinkedIn'}:</span> {single.email}<br></br>
                    <span className="font-bold">{'Address'}:</span> {single.Location}<br></br>
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Education</h2>
                <div>
                  <h3 className="font-bold">{single.degree}</h3>
                  <p>{single.University}, {single.DateEnded}</p>
                  {single.gpa && <p>GPA: {single.gpa}</p>}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Soft Skills</h2>
                <ul className="list-disc pl-5">
                  <li>{single.softskills?.replaceAll('"', " ")}</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Technical Skills</h2>
                <ul className="list-disc pl-5">
                  <li>{single.techskills?.replaceAll('"', " ")}</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Certifications</h2>
                <ul className="list-disc pl-5">
                  <li>
                    {single.Certification1} {single.Date1 && `(${single.DateEnded})`}
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">Languages</h2>
                <ul className="list-disc pl-5">
                  <li>{single.techskills}</li>
                </ul>
              </div>
            </>
          ) : (
            resumeData.sections
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
                          const index = cert.id.replace("cert", "");
                          const date = section.fields.find((f) => f.id === `certDate${index}`)?.value;
                          return (
                            <li key={cert.id}>
                              {cert.value} {date && `(${date})`}
                            </li>
                          );
                        })}
                    </ul>
                  ) : null}
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  )
}