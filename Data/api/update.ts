import { SoftwareEngineerResume } from "@/types/postData";


export default async function putDataService(props: SoftwareEngineerResume, id:string): Promise<void> {
    try {
        const response = await fetch(`http://localhost:8080/api/resumes/putResume/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                name: props.name,
                JobTitle: props.JobTitle,
                PreviousJobTitle: props.PreviousJobTitle,
                PreviousCompany: props.PreviousCompany,
                PreviousLocation: props.PreviousLocation,
                PreviousDescription: props.PreviousDescription,
                Location: props.Location,
                Company: props.Company,
                Dates: props.Dates,
                Description: props.Description,
                contactNumber: props.contactNumber,
                email: props.email,
                aboutMe: props.aboutMe,
                github: props.github,
                linkedIn: props.linkedIn,
                portfolio: props.portfolio,
                Certification1: props.Certification1,
                Certification2: props.Certification2,
                Date1: props.Date1,
                Date2: props.Date2,
                degree: props.degree,
                University: props.University,
                UnivLoc: props.UnivLoc,
                DateEnded: props.DateEnded,
                gpa: props.gpa,
                address: props.address,
                softskills: props.softskills,
                techskills: props.techskills
            }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log('Resume posted successfully:', data);
        } else {
            throw new Error(data.message || 'Failed to post resume');
        }
    } catch (error) {
        console.error('Error in postDataService:', error);
        throw error;
    }
}