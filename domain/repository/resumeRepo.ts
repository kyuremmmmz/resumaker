import { ResumeData } from "@/types/initial-data";
import { SoftwareEngineerResume } from "@/types/postData";

export interface ResumeRepo{
    postData(props: SoftwareEngineerResume): Promise<void>
    putData(props: SoftwareEngineerResume, id:number): Promise<void>
    getData(): Promise<SoftwareEngineerResume[]>
    getById(id:number): Promise<SoftwareEngineerResume>
}