"use client"

import { DashboardLayout } from "@/presentation/layouts/dashboard-layout"
import { DashboardHeader } from "@/presentation/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/presentation/components/theme-toggle"
import { Globe, Bell, Shield, Download, FileText } from "lucide-react"

export function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 pt-20 md:pt-6">
        <DashboardHeader title="Settings" description="Manage your application preferences" />

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your basic application settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="cst">Central Time (CT)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                      <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger id="dateFormat">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoSave">Auto-Save</Label>
                    <p className="text-sm text-gray-500">Automatically save changes while editing</p>
                  </div>
                  <Switch id="autoSave" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics">Usage Analytics</Label>
                    <p className="text-sm text-gray-500">Help us improve by sending anonymous usage data</p>
                  </div>
                  <Switch id="analytics" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the application looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input type="radio" id="lightTheme" name="theme" className="rounded" defaultChecked />
                      <Label htmlFor="lightTheme">Light</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="darkTheme" name="theme" className="rounded" />
                      <Label htmlFor="darkTheme">Dark</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="radio" id="systemTheme" name="theme" className="rounded" />
                      <Label htmlFor="systemTheme">System</Label>
                    </div>
                    <ThemeToggle />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="fontSize">
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="density">Layout Density</Label>
                  <Select defaultValue="comfortable">
                    <SelectTrigger id="density">
                      <SelectValue placeholder="Select layout density" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="animations">Animations</Label>
                    <p className="text-sm text-gray-500">Enable animations throughout the application</p>
                  </div>
                  <Switch id="animations" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control when and how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    Email Notifications
                  </h3>

                  <div className="ml-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailResume">Resume Views</Label>
                      <Switch id="emailResume" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailDownload">Resume Downloads</Label>
                      <Switch id="emailDownload" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailNewFeatures">New Features</Label>
                      <Switch id="emailNewFeatures" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailTips">Resume Tips & Advice</Label>
                      <Switch id="emailTips" />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailMarketing">Marketing & Promotions</Label>
                      <Switch id="emailMarketing" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Browser Notifications
                  </h3>

                  <div className="ml-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="browserResume">Resume Views</Label>
                      <Switch id="browserResume" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="browserDownload">Resume Downloads</Label>
                      <Switch id="browserDownload" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="browserNewFeatures">New Features</Label>
                      <Switch id="browserNewFeatures" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="notificationFrequency">Email Digest Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="notificationFrequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your privacy and data sharing preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Data Collection
                  </h3>

                  <div className="ml-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="usageData">Usage Data</Label>
                        <p className="text-sm text-gray-500">Collect anonymous usage data to improve the application</p>
                      </div>
                      <Switch id="usageData" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="errorReporting">Error Reporting</Label>
                        <p className="text-sm text-gray-500">Automatically send error reports to help fix issues</p>
                      </div>
                      <Switch id="errorReporting" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="personalization">Personalization</Label>
                        <p className="text-sm text-gray-500">Allow data collection for personalized recommendations</p>
                      </div>
                      <Switch id="personalization" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Resume Privacy</h3>

                  <div className="ml-6 space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="resumeVisibility">Default Resume Visibility</Label>
                      <Select defaultValue="private">
                        <SelectTrigger id="resumeVisibility">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="private">Private (Only you)</SelectItem>
                          <SelectItem value="link">Anyone with the link</SelectItem>
                          <SelectItem value="public">Public (Searchable)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="trackViews">Track Resume Views</Label>
                        <p className="text-sm text-gray-500">Record when someone views your resume</p>
                      </div>
                      <Switch id="trackViews" defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Download My Data
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Request a copy of all the data we have stored about you and your resumes.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Export Settings</CardTitle>
                <CardDescription>Configure how your resumes are exported</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Default Export Format
                  </h3>

                  <div className="ml-6 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 flex items-start space-x-3">
                        <input type="radio" id="formatPDF" name="format" className="mt-1" defaultChecked />
                        <div>
                          <Label htmlFor="formatPDF" className="font-medium">
                            PDF
                          </Label>
                          <p className="text-sm text-gray-500">Standard format accepted by most employers</p>
                        </div>
                      </div>

                      <div className="border rounded-md p-4 flex items-start space-x-3">
                        <input type="radio" id="formatDOCX" name="format" className="mt-1" />
                        <div>
                          <Label htmlFor="formatDOCX" className="font-medium">
                            Word (DOCX)
                          </Label>
                          <p className="text-sm text-gray-500">Editable format for Microsoft Word</p>
                        </div>
                      </div>

                      <div className="border rounded-md p-4 flex items-start space-x-3">
                        <input type="radio" id="formatTXT" name="format" className="mt-1" />
                        <div>
                          <Label htmlFor="formatTXT" className="font-medium">
                            Plain Text (TXT)
                          </Label>
                          <p className="text-sm text-gray-500">Simple text format for ATS compatibility</p>
                        </div>
                      </div>

                      <div className="border rounded-md p-4 flex items-start space-x-3">
                        <input type="radio" id="formatHTML" name="format" className="mt-1" />
                        <div>
                          <Label htmlFor="formatHTML" className="font-medium">
                            HTML
                          </Label>
                          <p className="text-sm text-gray-500">Web-friendly format for online sharing</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    PDF Settings
                  </h3>

                  <div className="ml-6 space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="pdfQuality">PDF Quality</Label>
                      <Select defaultValue="high">
                        <SelectTrigger id="pdfQuality">
                          <SelectValue placeholder="Select quality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft (Smaller file size)</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="high">High (Best quality)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pdfPageSize">Page Size</Label>
                      <Select defaultValue="letter">
                        <SelectTrigger id="pdfPageSize">
                          <SelectValue placeholder="Select page size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="letter">Letter (8.5" x 11")</SelectItem>
                          <SelectItem value="a4">A4 (210 x 297 mm)</SelectItem>
                          <SelectItem value="legal">Legal (8.5" x 14")</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="pdfCompression">Compress PDF</Label>
                        <p className="text-sm text-gray-500">Reduce file size (may affect quality)</p>
                      </div>
                      <Switch id="pdfCompression" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="includeMetadata">Include Metadata</Label>
                    <p className="text-sm text-gray-500">Add resume information to file metadata</p>
                  </div>
                  <Switch id="includeMetadata" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="optimizeATS">Optimize for ATS</Label>
                    <p className="text-sm text-gray-500">Make exports more readable by Applicant Tracking Systems</p>
                  </div>
                  <Switch id="optimizeATS" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
