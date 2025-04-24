import getAllResumes from "@/Data/api/getAllResumes";
import MyResumesPage from "@/presentation/pages/my-resumes-page";


export default async function ResumesPage() {
  const fetchData = await getAllResumes()
  return <MyResumesPage resumes={fetchData} />
}
