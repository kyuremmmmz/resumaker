import { ResumeRepo } from "@/domain/repository/resumeRepo";
import { SoftwareEngineerResume } from "@/types/postData";
import postDataService from "../api/post";
import getAllResumes from "../api/getAllResumes";
import getResumeById from "../api/getResumeById";
import putDataService from "../api/update";

export class SoftwareEngineer implements ResumeRepo{
    async putData(props: SoftwareEngineerResume, id:number): Promise<void> {
        try {
            return await putDataService(props, id);
        } catch (error) {
            console.log(error);
        }
    }
    async getById(id:number): Promise<SoftwareEngineerResume> {
        try {
            const resume = await getResumeById(`${id}`);
            return resume as SoftwareEngineerResume;
        } catch (error) {
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