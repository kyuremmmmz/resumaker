"use client"

import { DashboardLayout } from "@/presentation/layouts/dashboard-layout"
import { DashboardHeader } from "@/presentation/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CreditCard } from "lucide-react"

export function AccountPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 pt-20 md:pt-6">
        <DashboardHeader title="Account" description="Manage your account settings and preferences" />

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg" alt="Profile" />
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                  </div>

                  <div className="flex-1 grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Alex" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Johnson" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="alex.johnson@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="New York, USA" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    defaultValue="Software developer with 5+ years of experience in web development and cloud technologies."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Professional Links</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="LinkedIn URL" defaultValue="https://linkedin.com/in/alexjohnson" />
                    <Input placeholder="Portfolio URL" defaultValue="https://alexjohnson.dev" />
                    <Input placeholder="GitHub URL" defaultValue="https://github.com/alexjohnson" />
                    <Input placeholder="Twitter URL" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive updates about your account via email</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="emailNotifications" className="rounded" defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Resume View Alerts</h4>
                      <p className="text-sm text-gray-500">Get notified when someone views your resume</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="viewAlerts" className="rounded" defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Emails</h4>
                      <p className="text-sm text-gray-500">Receive promotional content and offers</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="marketingEmails" className="rounded" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>Your current subscription details</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    Free Plan
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Free Plan Includes:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Create up to 3 resumes</li>
                    <li>Access to 5 basic templates</li>
                    <li>Download as PDF</li>
                    <li>Basic analytics</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-2">Usage</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Resumes (2/3)</span>
                        <span>66%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "66%" }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Templates (3/5)</span>
                        <span>60%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Upgrade to Premium</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Premium Plans</CardTitle>
                <CardDescription>Choose the plan that works for you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg">Basic</h3>
                    <p className="text-2xl font-bold mt-2">
                      $4.99<span className="text-sm font-normal">/month</span>
                    </p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Create up to 10 resumes
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Access to 15 templates
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Download as PDF & Word
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Basic analytics
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">
                      Choose Plan
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 border-primary">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg">Pro</h3>
                      <Badge>Popular</Badge>
                    </div>
                    <p className="text-2xl font-bold mt-2">
                      $9.99<span className="text-sm font-normal">/month</span>
                    </p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Unlimited resumes
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Access to all templates
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Multiple download formats
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Advanced analytics
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        AI content suggestions
                      </li>
                    </ul>
                    <Button className="w-full mt-4">Choose Plan</Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-bold text-lg">Enterprise</h3>
                    <p className="text-2xl font-bold mt-2">
                      $19.99<span className="text-sm font-normal">/month</span>
                    </p>
                    <ul className="mt-4 space-y-2 text-sm">
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Everything in Pro
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Custom branding
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Priority support
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        API access
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-4 w-4 mr-2 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Team collaboration
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full mt-4">
                      Choose Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500">Protect your account with 2FA</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Recovery Codes</h4>
                    <p className="text-sm text-gray-500">Generate backup codes for account recovery</p>
                  </div>
                  <Button variant="outline" disabled>
                    Generate Codes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sessions</CardTitle>
                <CardDescription>Manage your active sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">MacBook Pro - Chrome</h4>
                        <p className="text-sm text-gray-500">New York, USA · Current Session</p>
                      </div>
                    </div>
                    <Badge>Active Now</Badge>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">iPhone 13 - Safari</h4>
                        <p className="text-sm text-gray-500">New York, USA · Last active 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      Sign Out
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  Sign Out of All Devices
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Deletion</CardTitle>
                <CardDescription>Permanently delete your account and all data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Once you delete your account, there is no going back. All of your data will be permanently removed.
                  This action cannot be undone.
                </p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="destructive">Delete Account</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Visa ending in 4242</h4>
                      <p className="text-sm text-gray-500">Expires 04/2025</p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>

                <Button variant="outline" className="w-full">
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Invoice</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                        <th className="text-left py-3 px-4 font-medium">Amount</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-right py-3 px-4 font-medium">Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">#INV-001</td>
                        <td className="py-3 px-4">Apr 1, 2023</td>
                        <td className="py-3 px-4">$9.99</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            Paid
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                              />
                            </svg>
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">#INV-002</td>
                        <td className="py-3 px-4">Mar 1, 2023</td>
                        <td className="py-3 px-4">$9.99</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            Paid
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                              />
                            </svg>
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">#INV-003</td>
                        <td className="py-3 px-4">Feb 1, 2023</td>
                        <td className="py-3 px-4">$9.99</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                            Paid
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                              />
                            </svg>
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Manage your billing details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billingName">Name</Label>
                    <Input id="billingName" defaultValue="Alex Johnson" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingEmail">Email</Label>
                    <Input id="billingEmail" type="email" defaultValue="alex.johnson@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingAddress">Address</Label>
                    <Input id="billingAddress" defaultValue="123 Main St" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingCity">City</Label>
                    <Input id="billingCity" defaultValue="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingState">State</Label>
                    <Input id="billingState" defaultValue="NY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingZip">ZIP Code</Label>
                    <Input id="billingZip" defaultValue="10001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billingCountry">Country</Label>
                    <Input id="billingCountry" defaultValue="United States" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
