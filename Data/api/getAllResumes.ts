import { SoftwareEngineerResume } from "@/types/postData";

export default async function getAllResumes(): Promise<SoftwareEngineerResume[]> {
    const response = await fetch('http://localhost:8080/api/resumes/getAllResumes');
    const data = await response.json();
    if (response.ok) {
        console.log(data);
    }
    return data;
}