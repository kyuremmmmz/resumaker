import { ResumeData } from "@/types/initial-data";


export const initialResumeData: ResumeData = {
    sections: [
        {
            id: "contact",
            title: "Contact Information",
            fields: [
                { id: "fullName", label: "Full Name", value: "Alex Johnson" },
                { id: "jobTitle", label: "Job Title", value: "Software Developer" },
                { id: "email", label: "Email", value: "alex.johnson@example.com" },
                { id: "phone", label: "Phone", value: "+1 (555) 123-4567" },
                { id: "address", label: "Address", value: "New York, NY" },
                { id: "website", label: "Website/LinkedIn", value: "linkedin.com/in/alexjohnson" },
            ],
        },
        {
            id: "summary",
            title: "Professional Summary",
            fields: [
                {
                    id: "summary",
                    label: "Summary",
                    value:
                        "A highly motivated software developer with 5+ years of experience in developing and maintaining web applications. Skilled in JavaScript, React, and Node.js with a strong focus on creating efficient and scalable solutions.",
                    type: "textarea",
                },
            ],
        },
        {
            id: "experience",
            title: "Work Experience",
            fields: [
                { id: "jobTitle1", label: "Job Title", value: "Senior Software Developer" },
                { id: "company1", label: "Company", value: "Tech Innovations Inc." },
                { id: "location1", label: "Location", value: "New York, NY" },
                { id: "dates1", label: "Dates", value: "2020 - Present" },
                {
                    id: "description1",
                    label: "Description",
                    value:
                        "Led a team of 5 developers in building a new customer-facing application. Implemented CI/CD pipelines that reduced deployment time by 40%. Optimized database queries resulting in a 30% performance improvement.",
                    type: "textarea",
                },
                { id: "jobTitle2", label: "Previous Job Title", value: "Software Developer" },
                { id: "company2", label: "Previous Company", value: "Acme Corp" },
                { id: "location2", label: "Previous Location", value: "Boston, MA" },
                { id: "dates2", label: "Previous Dates", value: "2018 - 2020" },
                {
                    id: "description2",
                    label: "Previous Description",
                    value:
                        "Developed and maintained web applications using React, Node.js, and MongoDB. Collaborated with UX designers to implement responsive designs. Participated in code reviews and mentored junior developers.",
                    type: "textarea",
                },
            ],
        },
        {
            id: "education",
            title: "Education",
            fields: [
                { id: "degree", label: "Degree", value: "Bachelor of Science in Computer Science" },
                { id: "university", label: "University", value: "New York University" },
                { id: "eduLocation", label: "Location", value: "New York, NY" },
                { id: "eduDates", label: "Dates", value: "2014 - 2018" },
                { id: "gpa", label: "GPA", value: "3.8/4.0" },
            ],
        },
        {
            id: "skills",
            title: "Skills",
            fields: [
                {
                    id: "technicalSkills",
                    label: "Technical Skills",
                    value: "JavaScript, TypeScript, React, Node.js, Express, MongoDB, SQL, Git, AWS, Docker",
                },
                {
                    id: "softSkills",
                    label: "Soft Skills",
                    value: "Team Leadership, Project Management, Problem Solving, Communication, Agile Methodologies",
                },
            ],
        },
        {
            id: "certifications",
            title: "Certifications",
            fields: [
                { id: "cert1", label: "Certification 1", value: "AWS Certified Solutions Architect" },
                { id: "certDate1", label: "Date 1", value: "2022" },
                { id: "cert2", label: "Certification 2", value: "Certified Scrum Master" },
                { id: "certDate2", label: "Date 2", value: "2021" },
            ],
        },
        {
            id: "languages",
            title: "Languages",
            fields: [{ id: "languages", label: "Languages", value: "English (Native), Spanish (Intermediate)" }],
        },
    ],
}
