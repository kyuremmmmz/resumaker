import { SoftwareEngineerResume } from "@/types/postData";
import getAllResumes from "./getAllResumes";
import { redirect } from "next/navigation";

export default async function deleteResume(id:number):Promise<void> {
    try {
        const response = await fetch(`http://localhost:8080/api/resumes/deleteResume/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete resume');
        }
        redirect('/')
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}