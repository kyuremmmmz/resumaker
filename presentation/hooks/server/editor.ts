import { ResumeData } from "@/types/initial-data";
import { SoftwareEngineerResume } from "@/types/postData";

export default function mapResumeDataToSoftwareEngineerResume(resumeData: ResumeData): SoftwareEngineerResume {
    const getFieldValue = (sectionId: string, fieldId: string): string => {
        const section = resumeData.sections.find((s) => s.id === sectionId);
        const field = section?.fields.find((f) => f.id === fieldId);
        return field?.value || '';
    };

    const skills = getFieldValue('skills', 'skills').split(',').map((s) => s.trim()).filter(Boolean);
    const techskills = skills.filter((s) => ['JavaScript', 'TypeScript', 'React', 'Java', 'Python'].includes(s));
    const softskills = skills.filter((s) => !techskills.includes(s));
    return {
        id: 1,
        name: getFieldValue('contact', 'fullName'),
        email: getFieldValue('contact', 'email'),
        techskills: JSON.stringify(techskills.length ? techskills : getFieldValue('skills', 'technicalSkills')) || getFieldValue('skills', 'technicalSkills'),
        softskills: JSON.stringify(softskills.length ? softskills : getFieldValue('skills', 'softSkills')) || getFieldValue('skills', 'softSkills'),
        JobTitle: getFieldValue('experience', 'jobTitle1'),
        PreviousJobTitle: getFieldValue('experience', 'jobTitle2'),
        PreviousCompany: getFieldValue('experience', 'company2'),
        PreviousLocation: getFieldValue('experience', 'location2'),
        PreviousDescription: getFieldValue('experience', 'description2'),
        Location: getFieldValue('contact', 'location'),
        Company: getFieldValue('experience', 'company1'),
        Dates: getFieldValue('experience', 'dates1'),
        Description: getFieldValue('experience', 'description1'),
        contactNumber: getFieldValue('contact', 'phone'),
        aboutMe: getFieldValue('summary', 'summary'),
        github: getFieldValue('contact', 'website'),
        linkedIn: getFieldValue('contact', 'website'),
        portfolio: getFieldValue('links', 'portfolio'),
        Certification1: getFieldValue('certifications', 'cert1'),
        Certification2: getFieldValue('certifications', 'cert2'),
        Date1: getFieldValue('certifications', 'certDate1'),
        Date2: getFieldValue('certifications', 'certDate2'),
        degree: getFieldValue('education', 'degree'),
        University: getFieldValue('education', 'university'),
        UnivLoc: getFieldValue('education', 'eduLocation'),
        DateEnded: getFieldValue('education', 'eduDates'),
        gpa: getFieldValue('education', 'gpa'),
        address: getFieldValue('contact', 'address'),
    };
};

