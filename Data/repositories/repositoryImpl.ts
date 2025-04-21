import { ResumeRepo } from "@/domain/repository/resumeRepo";
import { SoftwareEngineerResume } from "@/types/postData";
import postDataService from "../api/post";

export class SoftwareEngineer implements ResumeRepo{
    async postData(props: SoftwareEngineerResume): Promise<void> {
        try {
            return await postDataService(props)
        } catch (error) {
            console.log(error);
            throw Error(error instanceof Error ? error.message : String(error))
        }
    }
    
}