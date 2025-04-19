import { ResumeEditorPage } from "@/presentation/pages/resume-editor-page"

export default function EditorPage({ params }: { params: { id: string } }) {
  return <ResumeEditorPage resumeId={params.id} />
}
