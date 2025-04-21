import { SoftwareEngineerResume } from "@/types/postData";

export interface ResumeRepo{
    postData(props: SoftwareEngineerResume):Promise<void>
}