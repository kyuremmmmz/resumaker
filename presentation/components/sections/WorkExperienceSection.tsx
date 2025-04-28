import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useEditorPutProps from "@/presentation/hooks/useEditorPutProps";
import { SoftwareEngineerResume } from "@/types/postData";


export default function WorkExperienceSection({ resume }: { resume: SoftwareEngineerResume }) {
    const {formData, handleInputChange,
            } = useEditorPutProps({ resume:resume })
  return (
      <AccordionItem value="experience">
          <AccordionTrigger className="text-xl font-bold px-4">
              Work Experience
          </AccordionTrigger>
          <AccordionContent>
              <Card>
                  <CardContent className="p-6">
                      <div className="space-y-4">
                          <div className="space-y-2">
                              <Label htmlFor="jobTitle">Current Job Title</Label>
                              <Input
                                  onChange={(e) => handleInputChange(e, "JobTitle")}
                                  id="jobTitle"
                                  name="jobTitle"
                                  value={formData.JobTitle || ""}
                              />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="company">Current Company</Label>
                              <Input
                                  onChange={(e) => handleInputChange(e, "Company")}
                                  id="company"
                                  name="company"
                                  value={formData.Company || ""}
                              />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="location">Current Location</Label>
                              <Input
                                  onChange={(e) => handleInputChange(e, "Location")}
                                  id="location"
                                  name="location"
                                  value={formData.Location || ""}
                              />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="dates">Current Dates</Label>
                              <Input
                                  onChange={(e) => handleInputChange(e, "Dates")}
                                  id="dates"
                                  name="dates"
                                  value={formData.Dates || ""}
                              />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="description">Current Job Description</Label>
                              <Textarea
                                  onChange={(e) => handleInputChange(e, "Description")}
                                  id="description"
                                  name="description"
                                  value={formData.Description || ""}
                                  rows={4}
                              />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="previousJobTitle">Previous Job Title</Label>
                              <Input
                                  onChange={(e) => handleInputChange(e, "PreviousJobTitle")}
                                  id="previousJobTitle"
                                  name="previousJobTitle"
                                  value={formData.PreviousJobTitle || ""}
                              />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="previousCompany">Previous Company</Label>
                              <Input
                                  onChange={(e) => handleInputChange(e, "PreviousCompany")}
                                  id="previousCompany"
                                  name="previousCompany"
                                  value={formData.PreviousCompany || ""}
                              />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="previousLocation">Previous Location</Label>
                              <Input
                                  onChange={(e) => handleInputChange(e, "PreviousLocation")}
                                  id="previousLocation"
                                  name="previousLocation"
                                  value={formData.PreviousLocation || ""}
                              />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="previousDescription">Previous Job Description</Label>
                              <Textarea
                                  onChange={(e) => handleInputChange(e, "PreviousDescription")}
                                  id="previousDescription"
                                  name="previousDescription"
                                  value={formData.PreviousDescription || ""}
                                  rows={4}
                              />
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </AccordionContent>
      </AccordionItem>
  );
}