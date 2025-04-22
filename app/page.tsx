import getAllResumes from "@/Data/api/getAllResumes";
import { getServerSideProps } from "@/presentation/components/dashboard/recent-resumes-section";
import DashboardPage from "@/presentation/pages/dashboard-page";

 
export default async function Home() {
  const fetchData = await getAllResumes()
  return <DashboardPage resumes={fetchData} />
}
