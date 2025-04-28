import { SoftwareEngineerResume } from "@/types/postData";

export default async function getResumeById(id: string): Promise<SoftwareEngineerResume | null>{
    let baseUrl = 'http://localhost:8080/api/resumes/getResumeById';
    const response = await fetch(`${baseUrl}/${encodeURIComponent(parseInt(id))}`, {
        method: 'GET',
    });
    const data = await response.json();
    if (response.ok) {
        console.log(data);
        
        return data;
    }
    return null;
}