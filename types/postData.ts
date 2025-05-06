import { ResumeData } from "./initial-data";

export interface SoftwareEngineerResume {
    id: number;
    name: string | null;
    JobTitle: string | null;
    PreviousJobTitle: string | null;
    PreviousCompany: string | null;
    PreviousLocation: string | null;
    PreviousDescription: string | null;
    Location: string | null;
    Company: string | null;
    Dates: string | null;
    Description: string | null;
    contactNumber: string | null;
    email: string;
    aboutMe: string | null;
    github: string | null;
    linkedIn: string | null;
    portfolio: string | null;
    Certification1: string | null;
    Certification2: string | null;
    Date1: string | null;
    Date2: string | null;
    degree: string | null;
    University: string | null;
    UnivLoc: string | null;
    DateEnded: string | null;
    gpa: string | null;
    address: string | null;
    techskills: string | null;
    softskills: string | null;
}


export interface SoftwareEngineerResumeByFields {
    section: [
        {
            textarea: {
                values: {
                    aboutMe: string | null,
                    Description: string | null,
                    PreviousDescription: string | null
                }
            }
            input: {
                values: {
                    id: Number,
                    name: string,
                    JobTitle: string | null,
                    PreviousJobTitle: string | null,
                    PreviousCompany: string | null,
                    PreviousLocation: string | null,
                    Location: string | null,
                    Company: string | null,
                    Dates: string | null,
                    contactNumber: string | null,
                    email: string,
                    github: string | null,
                    linkedIn: string | null,
                    portfolio: string | null,
                    Certification1: string | null,
                    Certification2: string | null,
                    Date1: string | null,
                    Date2: string | null,
                    degree: string | null,
                    University: string | null,
                    UnivLoc: string | null,
                    DateEnded: string | null,
                    gpa: string | null,
                    address: string | null,
                    techskills: string | null,
                    softskills: string | null,
                }
            }
        }
    ]
}



export interface ResumeEditorProps {
    resumes?: SoftwareEngineerResume[] | [];
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
    profileImage: string | null;
    setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ResumeEditorPropsPut {
    resumes?: SoftwareEngineerResume[] | [];
}



export interface RecentResumesSectionProps {
    resumes: SoftwareEngineerResume[];
}