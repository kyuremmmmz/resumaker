"use client"

import { DashboardLayout } from "@/presentation/layouts/dashboard-layout"
import { DashboardHeader } from "@/presentation/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, Calendar } from "lucide-react"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 pt-20 md:pt-6">
        <DashboardHeader title="Analytics" description="Track and analyze your resume performance" />

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="views">Views</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Select defaultValue="30days">
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <CardDescription>All time resume views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,543</div>
              <p className="text-xs text-green-500 mt-1">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <CardDescription>All time resume downloads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">487</div>
              <p className="text-xs text-green-500 mt-1">+8.3% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <CardDescription>Views to downloads ratio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">19.2%</div>
              <p className="text-xs text-red-500 mt-1">-2.1% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Views & Downloads</CardTitle>
              <CardDescription>Last 30 days performance</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { name: "Jan 1", views: 40, downloads: 10 },
                    { name: "Jan 5", views: 30, downloads: 8 },
                    { name: "Jan 10", views: 50, downloads: 12 },
                    { name: "Jan 15", views: 80, downloads: 18 },
                    { name: "Jan 20", views: 65, downloads: 15 },
                    { name: "Jan 25", views: 90, downloads: 20 },
                    { name: "Jan 30", views: 100, downloads: 25 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="downloads" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Template Usage</CardTitle>
              <CardDescription>Most popular resume templates</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Professional", value: 35 },
                      { name: "Creative", value: 25 },
                      { name: "Minimalist", value: 20 },
                      { name: "Technical", value: 15 },
                      { name: "Executive", value: 5 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {[
                      { name: "Professional", value: 35 },
                      { name: "Creative", value: 25 },
                      { name: "Minimalist", value: 20 },
                      { name: "Technical", value: 15 },
                      { name: "Executive", value: 5 },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Resumes */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Resumes</CardTitle>
            <CardDescription>Your most viewed and downloaded resumes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Resume Name</th>
                    <th className="text-left py-3 px-4 font-medium">Template</th>
                    <th className="text-right py-3 px-4 font-medium">Views</th>
                    <th className="text-right py-3 px-4 font-medium">Downloads</th>
                    <th className="text-right py-3 px-4 font-medium">Conversion</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Software Developer Resume</td>
                    <td className="py-3 px-4">Professional</td>
                    <td className="py-3 px-4 text-right">245</td>
                    <td className="py-3 px-4 text-right">52</td>
                    <td className="py-3 px-4 text-right">21.2%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Marketing Manager Resume</td>
                    <td className="py-3 px-4">Creative</td>
                    <td className="py-3 px-4 text-right">198</td>
                    <td className="py-3 px-4 text-right">43</td>
                    <td className="py-3 px-4 text-right">21.7%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">UX Designer Resume</td>
                    <td className="py-3 px-4">Minimalist</td>
                    <td className="py-3 px-4 text-right">176</td>
                    <td className="py-3 px-4 text-right">38</td>
                    <td className="py-3 px-4 text-right">21.6%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Content Strategist Resume</td>
                    <td className="py-3 px-4">Modern</td>
                    <td className="py-3 px-4 text-right">154</td>
                    <td className="py-3 px-4 text-right">29</td>
                    <td className="py-3 px-4 text-right">18.8%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">Mechanical Engineer Resume</td>
                    <td className="py-3 px-4">Technical</td>
                    <td className="py-3 px-4 text-right">132</td>
                    <td className="py-3 px-4 text-right">24</td>
                    <td className="py-3 px-4 text-right">18.2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
