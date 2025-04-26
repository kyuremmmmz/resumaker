import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useEditorPutProps from "@/presentation/hooks/useEditorPutProps";
import { SoftwareEngineerResume } from "@/types/postData";

export default function ContactInfoSection({ resume }: { resume: SoftwareEngineerResume }) {
    const {
            handleImageUpload,
            formData,
            profileImagePreview,
            handleInputChange,
            handleSubmit,
            setFormData,
            setProfileImagePreview,
        } = useEditorPutProps({ resume:resume })
    return(
    <AccordionItem value="contact">
        <AccordionTrigger className="text-xl font-bold px-4">
            Contact Information
        </AccordionTrigger>
        <AccordionContent>
            <Card>
                <CardContent className="p-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                onChange={(e) => handleInputChange(e, "name")}
                                id="name"
                                name="name"
                                value={formData.name || ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                onChange={(e) => handleInputChange(e, "email")}
                                id="email"
                                name="email"
                                value={formData.email || ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactNumber">Contact Number</Label>
                            <Input
                                onChange={(e) => handleInputChange(e, "contactNumber")}
                                id="contactNumber"
                                name="contactNumber"
                                value={formData.contactNumber || ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                onChange={(e) => handleInputChange(e, "address")}
                                id="address"
                                name="address"
                                value={formData.address || ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="github">GitHub</Label>
                            <Input
                                onChange={(e) => handleInputChange(e, "github")}
                                id="github"
                                name="github"
                                value={formData.github || ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkedIn">LinkedIn</Label>
                            <Input
                                onChange={(e) => handleInputChange(e, "linkedIn")}
                                id="linkedIn"
                                name="linkedIn"
                                value={formData.linkedIn || ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="portfolio">Portfolio</Label>
                            <Input
                                onChange={(e) => handleInputChange(e, "portfolio")}
                                id="portfolio"
                                name="portfolio"
                                value={formData.portfolio || ""}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AccordionContent>
        </AccordionItem>
    )
}