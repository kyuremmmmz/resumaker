import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Upload, Download, Copy } from "lucide-react"

export function QuickActionsSection() {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks you can perform right away</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full justify-start gap-2">
          <PlusCircle className="h-4 w-4" />
          Create New Resume
        </Button>
        <Button variant="outline" className="w-full justify-start gap-2">
          <Copy className="h-4 w-4" />
          Duplicate Resume
        </Button>
      </CardContent>
    </Card>
  )
}
