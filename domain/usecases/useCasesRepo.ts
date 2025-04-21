import { SoftwareEngineer } from "@/Data/repositories/repositoryImpl";
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
}