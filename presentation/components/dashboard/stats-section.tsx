import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, Eye, Award } from "lucide-react"

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
          <FileText className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-gray-500 mt-1">+2 from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Downloads</CardTitle>
          <Download className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">48</div>
          <p className="text-xs text-gray-500 mt-1">+12 from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Resume Views</CardTitle>
          <Eye className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">189</div>
          <p className="text-xs text-gray-500 mt-1">+24% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Premium Templates</CardTitle>
          <Award className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">5/20</div>
          <p className="text-xs text-gray-500 mt-1">Unlock more with Premium</p>
        </CardContent>
      </Card>
    </div>
  )
}
