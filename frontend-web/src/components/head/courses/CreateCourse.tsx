"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Label } from "@/src/components/ui/label"
import { createSubject } from "@/src/services/courseServices"

interface CreateCourseProps {
  onSubjectCreated: () => void 
}

export default function CreateCourse({ onSubjectCreated }: CreateCourseProps) {
  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    subjectDescription: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.subjectName || !formData.subjectCode || !formData.subjectDescription) {
      setError("All fields are required")
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      await createSubject({
        subjectName: formData.subjectName,
        subjectCode: formData.subjectCode,
        subjectDescription: formData.subjectDescription,
      })
      setFormData({ subjectName: "", subjectCode: "", subjectDescription: "" })
      setOpen(false)
      onSubjectCreated() 
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create subject")
      console.error("Error creating subject:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600">
          New Subject
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Subject</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="space-y-2">
            <Label htmlFor="subjectName">Subject Name</Label>
            <Input
              id="subjectName"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              placeholder="Enter subject name"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subjectCode">Subject Code</Label>
            <Input
              id="subjectCode"
              name="subjectCode"
              value={formData.subjectCode}
              onChange={handleChange}
              placeholder="Enter subject code"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subjectDescription">Description</Label>
            <Textarea
              id="subjectDescription"
              name="subjectDescription"
              value={formData.subjectDescription}
              onChange={handleChange}
              placeholder="Enter subject description"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Subject"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}