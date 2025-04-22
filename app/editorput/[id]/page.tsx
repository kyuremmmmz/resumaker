import { SoftwareEngineer } from "@/Data/repositories/repositoryImpl";
import { UseCasesRepo } from "@/domain/usecases/useCasesRepo";
import ResumeEditorPut from "@/presentation/components/resume-editor-put";
import ResumePagePut from "@/presentation/pages/resume-editor-page-put";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const repo = new SoftwareEngineer();
    const useCase = new UseCasesRepo(repo);
    const resumes = await useCase.getResumeById(id);
    return <ResumePagePut textarea={{
        values: {
            aboutMe: resumes?.aboutMe ?? "",
            Description: resumes?.Description ?? "",
            PreviousDescription: resumes?.PreviousDescription ?? ""
        }
    }} input={{
        values: {
            id: Number(id),
            name: resumes?.name ?? "",
            JobTitle: resumes?.JobTitle ?? "",
            PreviousJobTitle: resumes?.PreviousJobTitle ?? "",
            PreviousCompany: resumes?.PreviousCompany ?? "",
            PreviousLocation: resumes?.PreviousLocation ?? "",
            Location: resumes?.Location ?? "",
            Company: resumes?.Company ?? "",
            Dates: resumes?.Dates ?? "",
            contactNumber: resumes?.contactNumber ?? "",
            email: resumes?.email ?? "",
            github: resumes?.github ?? "",
            linkedIn: resumes?.linkedIn ?? "",
            portfolio: resumes?.portfolio ?? "",
            Certification1: resumes?.Certification1 ?? "",
            Certification2: resumes?.Certification2 ?? "",
            Date1: resumes?.Date1 ?? "",
            Date2: resumes?.Date2 ?? "",
            degree: resumes?.degree ?? "",
            University: resumes?.University ?? "",
            UnivLoc: resumes?.UnivLoc ?? "",
            DateEnded: resumes?.DateEnded ?? "",
            gpa: resumes?.gpa ?? "",
            address: resumes?.address ?? "",
            techskills: resumes?.techskills ?? "",
            softskills: resumes?.softskills ?? ""
        }
    }} />
}