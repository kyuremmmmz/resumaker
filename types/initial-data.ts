export interface ResumeField {
    id: string
    label: string
    value: string
    type?: "text" | "textarea"
}

export interface ResumeSection {
    id: string
    title: string
    fields: ResumeField[]
}

export interface ResumeData {
    sections: ResumeSection[]
}
