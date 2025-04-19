"use client"

import { DashboardLayout } from "@/presentation/layouts/dashboard-layout"
import { DashboardHeader } from "@/presentation/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, FileText, MessageCircle, Mail, ExternalLink, BookOpen } from "lucide-react"

export function HelpPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 pt-20 md:pt-6">
        <DashboardHeader title="Help & Support" description="Find answers to common questions and get support" />

        <div className="relative w-full max-w-2xl mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input type="search" placeholder="Search for help articles..." className="pl-10 bg-white dark:bg-gray-800" />
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to the most common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I create a new resume?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        Creating a new resume is easy! Follow these steps:
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Click the "Create New Resume" button in the sidebar or dashboard</li>
                        <li>Select a template that fits your needs</li>
                        <li>Fill in your information in the resume editor</li>
                        <li>Save your resume when you're done</li>
                      </ol>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Your resume will be automatically saved as you work on it, and you can always come back to edit
                        it later.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I download my resume?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        You can download your resume in several formats:
                      </p>
                      <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Open the resume you want to download</li>
                        <li>Click the "Download" button in the top-right corner</li>
                        <li>Select your preferred format (PDF, DOCX, etc.)</li>
                        <li>Click "Download" to save the file to your device</li>
                      </ol>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        PDF is the most commonly used format for job applications as it preserves your formatting across
                        all devices.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What's the difference between free and premium templates?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        Free templates provide a solid foundation for your resume, while premium templates offer:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Advanced design elements and layouts</li>
                        <li>More customization options</li>
                        <li>Industry-specific sections and formatting</li>
                        <li>Better ATS optimization</li>
                        <li>Matching cover letter templates</li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        Premium templates are available with our Pro and Enterprise subscription plans.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">To cancel your subscription:</p>
                      <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300">
                        <li>Go to your Account page</li>
                        <li>Select the "Subscription" tab</li>
                        <li>Click "Cancel Subscription"</li>
                        <li>Follow the prompts to confirm cancellation</li>
                      </ol>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">
                        You'll continue to have access to premium features until the end of your current billing period.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Is my data secure?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-gray-600 dark:text-gray-300">
                        Yes, we take data security very seriously. All your resume data is encrypted both in transit and
                        at rest. We use industry-standard security practices to protect your information, and we never
                        share your personal data with third parties without your explicit consent. You can review our
                        full privacy policy in the Privacy Settings section of your account.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started Guides</CardTitle>
                <CardDescription>Learn how to use ResuMaker effectively</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Creating Your First Resume</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Learn the basics of creating a professional resume
                          </p>
                          <Button variant="link" className="px-0 h-auto mt-1">
                            Read guide
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Choosing the Right Template</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Tips for selecting the best template for your industry
                          </p>
                          <Button variant="link" className="px-0 h-auto mt-1">
                            Read guide
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Optimizing for ATS</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Make your resume stand out to applicant tracking systems
                          </p>
                          <Button variant="link" className="px-0 h-auto mt-1">
                            Read guide
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Writing Effective Bullet Points</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Craft compelling achievements for your work experience
                          </p>
                          <Button variant="link" className="px-0 h-auto mt-1">
                            Read guide
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-3">Video Tutorials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium">Complete Resume Walkthrough</h4>
                        <p className="text-sm text-gray-500 mt-1">10:24 min</p>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-medium">Advanced Customization Tips</h4>
                        <p className="text-sm text-gray-500 mt-1">8:15 min</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Knowledge Base
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-0 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Get help from our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Card className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <MessageCircle className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Live Chat</h3>
                          <p className="text-sm text-gray-500 mt-1">Chat with our support team</p>
                          <p className="text-xs text-gray-500 mt-2">Available Mon-Fri, 9am-5pm EST</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Start Chat
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Email Support</h3>
                          <p className="text-sm text-gray-500 mt-1">Send us an email</p>
                          <p className="text-xs text-gray-500 mt-2">Response within 24 hours</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            support@resumaker.com
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Send a Support Request</h3>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What do you need help with?" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={5}
                      className="w-full p-3 border rounded-md"
                      placeholder="Please describe your issue in detail..."
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="Where should we send our response?" />
                  </div>

                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Include system information to help troubleshoot</span>
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Submit Request</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
