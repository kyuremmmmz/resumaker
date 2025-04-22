"use client"

import { DashboardLayout } from "@/presentation/layouts/dashboard-layout"
import { DashboardHeader } from "@/presentation/components/dashboard/dashboard-header"
import { ResumeTemplatesSection } from "@/presentation/components/dashboard/resume-templates-section"

import { StatsSection } from "@/presentation/components/dashboard/stats-section"
import { QuickActionsSection } from "@/presentation/components/dashboard/quick-actions-section"
import RecentResumesSection from "../components/dashboard/recent-resumes-section"
import { RecentResumesSectionProps } from "@/types/postData"

export default function DashboardPage(resume: RecentResumesSectionProps) {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 pt-20 md:pt-6">
        <DashboardHeader title="Dashboard" showWelcome={true} />
          <div className=" w-full">
            <QuickActionsSection />
          </div>
        <RecentResumesSection resumes={resume.resumes} />
        <ResumeTemplatesSection />
      </div>
    </DashboardLayout>
  )
}
