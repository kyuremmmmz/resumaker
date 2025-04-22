// lib/transformResumeData.ts
import { ResumeData } from "@/types/initial-data";

export const initialResume: ResumeData = {
    sections: []
};

export function transformApiDataToResumeData(apiData: any) {
    Object.assign(initialResume, {
        sections: [
            {
                id: "contact",
                title: "Contact Information",
                fields: [
                    { id: "fullName", label: "Full Name", value: apiData?.name ?? "" },
                    { id: "jobTitle", label: "Job Title", value: apiData?.JobTitle ?? "" },
                    { id: "email", label: "Email", value: apiData?.email ?? "", },
                    { id: "phone", label: "Phone", value: apiData?.contactNumber ?? "", },
                    { id: "location", label: "Location", value: apiData?.Location ?? "" },
                    { id: "website", label: "Website/LinkedIn", value: apiData?.linkedIn ?? "", },
                ],
            },
            {
                id: "summary",
                title: "Professional Summary",
                fields: [
                    {
                        id: "summary",
                        label: "Summary",
                        value: apiData?.aboutMe ?? "",
                        type: "textarea",
                    },
                ],
            },
            {
                id: "experience",
                title: "Work Experience",
                fields: [
                    { id: "jobTitle1", label: "Job Title", value: apiData?.JobTitle ?? "" },
                    { id: "company1", label: "Company", value: apiData?.Company ?? "" },
                    { id: "location1", label: "Location", value: apiData?.Location ?? "" },
                    { id: "dates1", label: "Dates", value: apiData?.Dates ?? "" },
                    {
                        id: "description1",
                        label: "Description",
                        value: apiData?.Description ?? "",
                        type: "textarea",
                    },
                    { id: "jobTitle2", label: "Previous Job Title", value: apiData?.PreviousJobTitle ?? "" },
                    { id: "company2", label: "Previous Company", value: apiData?.PreviousCompany ?? "" },
                    { id: "location2", label: "Previous Location", value: apiData?.PreviousLocation ?? "" },
                    { id: "dates2", label: "Previous Dates", value: apiData?.PreviousDescription ? "2018 - 2020" : "" }, // Fallback if no dates
                    {
                        id: "description2",
                        label: "Previous Description",
                        value: apiData?.PreviousDescription ?? "",
                        type: "textarea",
                    },
                ],
            },
            {
                id: "education",
                title: "Education",
                fields: [
                    { id: "degree", label: "Degree", value: apiData?.degree ?? "" },
                    { id: "university", label: "University", value: apiData?.University ?? "" },
                    { id: "eduLocation", label: "Location", value: apiData?.UnivLoc ?? "" },
                    { id: "eduDates", label: "Dates", value: apiData?.DateEnded ?? "" },
                    { id: "gpa", label: "GPA", value: apiData?.gpa ?? "" },
                ],
            },
            {
                id: "skills",
                title: "Skills",
                fields: [
                    { id: "technicalSkills", label: "Technical Skills", value: apiData?.techskills ?? "" },
                    { id: "softSkills", label: "Soft Skills", value: apiData?.softskills ?? "" },
                ],
            },
            {
                id: "certifications",
                title: "Certifications",
                fields: [
                    { id: "cert1", label: "Certification 1", value: apiData?.Certification1 ?? "" },
                    { id: "certDate1", label: "Date 1", value: apiData?.Date1 ?? "" },
                    { id: "cert2", label: "Certification 2", value: apiData?.Certification2 ?? "" },
                    { id: "certDate2", label: "Date 2", value: apiData?.Date2 ?? "" },
                ],
            },
            {
                id: "languages",
                title: "Languages",
                fields: [{ id: "languages", label: "Languages", value: apiData?.languages ?? "English (Native)" }],
            },
        ],
    });
    return initialResume;
}