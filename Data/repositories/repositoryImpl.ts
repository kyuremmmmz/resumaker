import { ResumeRepo } from "@/domain/repository/resumeRepo";
import { SoftwareEngineerResume } from "@/types/postData";
import postDataService from "../api/post";
import getAllResumes from "../api/getAllResumes";
import getResumeById from "../api/getResumeById";

export class SoftwareEngineer implements ResumeRepo{
    async getById(id:string): Promise<SoftwareEngineerResume> {
        try {
            const resume = await getResumeById(id);
            if (!resume) {
                throw new Error(`Resume with ID ${id} not found`);
            }
            return resume;
        } catch (error) {
            console.log(error);
            throw Error(error instanceof Error ? error.message : String(error));
        }
    }
    async getData(): Promise<SoftwareEngineerResume[]> {
        try {
            return await getAllResumes();     
        } catch (error) {
            console.log(error);
            return []; 
        }
    }
    async postData(props: SoftwareEngineerResume): Promise<void> {
        try {
            return await postDataService(props)
        } catch (error) {
            console.log(error);
            throw Error(error instanceof Error ? error.message : String(error))
        }
    }
    
}