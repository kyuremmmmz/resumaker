import { ResumeData } from "@/types/initial-data";
import { SoftwareEngineerResume } from "@/types/postData";

export default async function getResumeById(id: string): Promise<SoftwareEngineerResume | null>{
    const response = await fetch(`http://localhost:8080/api/resumes/getResumeById/${id}`, {
        method: 'GET',
    });
    const data = await response.json();
    if (response.ok) {
        console.log(data);
        
        return data;
    }
    return null;
}