import { ResumeEditorPutProps } from "@/presentation/components/resume-editor-put";
import {  SoftwareEngineerResume } from "@/types/postData";
import { useState, ChangeEvent } from "react";

export default function forms({ resume }: ResumeEditorPutProps) {
    const [formData, setFormData] = useState<SoftwareEngineerResume>(resume);
    const [profileImagePreview, setProfileImagePreview] = useState<string | null>(resume.name || null);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof SoftwareEngineerResume
    ) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImagePreview(imageUrl);
            setFormData((prev) => ({
                ...prev,
                profileImage: imageUrl,
            }));
        }
    };

    const handleSubmit = () => {
        console.log("Updated resume data:", formData);
    };
    return {
        formData,
        profileImagePreview,
        handleInputChange,
        handleImageUpload,
        handleSubmit,
        setFormData,
        setProfileImagePreview,
    }
}