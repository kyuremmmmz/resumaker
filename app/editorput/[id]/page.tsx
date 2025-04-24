
import { initialResumeData } from "@/Core/lib/initial-data";
import { SoftwareEngineer } from "@/Data/repositories/repositoryImpl";
import { UseCasesRepo } from "@/domain/usecases/useCasesRepo";
import ResumeEditorPut from "@/presentation/components/resume-editor-put";
import StefanoTemplate from "@/presentation/components/templates/stefano-template";
import ResumePagePut from "@/presentation/pages/resume-editor-put-page";
import { ResumeData } from "@/types/initial-data";
import { SetStateAction } from "react";


export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const repo = new SoftwareEngineer();
    const useCase = new UseCasesRepo(repo);
    const resumes = await useCase.getResumeById(id);

    
    
    return <ResumePagePut resume={resumes} />
}