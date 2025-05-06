import { SoftwareEngineer } from "@/Data/repositories/repositoryImpl";
import { ResumeData } from "@/types/initial-data";
import { SoftwareEngineerResume } from "@/types/postData";

export class UseCasesRepo{
    constructor(private readonly resumeRepo: SoftwareEngineer) { }
    async resume(props: SoftwareEngineerResume) {
        try {
            return await this.resumeRepo.postData(props)
        } catch (error) {
            console.log(error);
        }
    }
    async getAllResumes() {
        try {
            return await this.resumeRepo.getData();
        } catch (error) {
            console.log(error);
        }
    }

    async getResumeById(id: number): Promise<SoftwareEngineerResume> { 
        try {
            const resume = await this.resumeRepo.getById(id);
            return resume;
        } catch (error) {
            console.log(error);
            throw new Error("");
            
        }
    }

    async putData(props: SoftwareEngineerResume, id:number) {
        try {
            const resume = await this.resumeRepo.putData(props, id)
            return resume;
        } catch (error) {
            console.log(error);
        }
    }
}
