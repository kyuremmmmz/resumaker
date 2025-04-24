import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useEditorPutProps from '@/presentation/hooks/useEditorPutProps'
import { SoftwareEngineerResume } from '@/types/postData'
import { Upload } from 'lucide-react'
import React from 'react'


function ProfileImageSection({ resume }: { resume: SoftwareEngineerResume }) {
    const {
        handleInputChange,
        handleImageUpload,
        handleSubmit,
        setFormData,
        formData,
        setProfileImagePreview,
        profileImagePreview
    } = useEditorPutProps({ resume:resume })
  return (
      <div>
          {/* Profile Image Section */}
          <Card>
              <CardContent className="p-6">
                  <div className="space-y-4">
                      <div className="flex flex-col items-center gap-4">
                          <Label htmlFor="profile-image">Profile Image</Label>
                          <Avatar className="h-24 w-24">
                              <AvatarImage src={profileImagePreview || ""} />
                              <AvatarFallback className="bg-gray-400">
                                  {formData.name ? formData.name.slice(0, 2).toUpperCase() : "CDJ"}
                              </AvatarFallback>
                          </Avatar>
                          <div className="flex items-center gap-2">
                              <Input
                                  onChange={handleImageUpload}
                                  id="profile-image"
                                  type="file"
                                  accept="image/*"
                                  className="w-auto"
                              />
                              <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center gap-2"
                              >
                                  <Upload className="h-4 w-4" />
                                  Upload
                              </Button>
                          </div>
                      </div>
                  </div>
              </CardContent>
          </Card></div>
  )
}

export default ProfileImageSection