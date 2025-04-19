"use client"

import { DashboardLayout } from "@/presentation/layouts/dashboard-layout"
import { DashboardHeader } from "@/presentation/components/dashboard/dashboard-header"
import { ResumeTemplatesSection } from "@/presentation/components/dashboard/resume-templates-section"
import { RecentResumesSection } from "@/presentation/components/dashboard/recent-resumes-section"
import { StatsSection } from "@/presentation/components/dashboard/stats-section"
import { QuickActionsSection } from "@/presentation/components/dashboard/quick-actions-section"

export function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 pt-20 md:pt-6">
        <DashboardHeader title="Dashboard" showWelcome={true} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <StatsSection />
          </div>
          <div>
            <QuickActionsSection />
          </div>
        </div>
        <RecentResumesSection />
        <ResumeTemplatesSection />
      </div>
    </DashboardLayout>
  )
}
