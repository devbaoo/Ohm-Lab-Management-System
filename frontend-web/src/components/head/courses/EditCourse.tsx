"use client"

import { useState } from "react"
import { Edit } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select"
import { Label } from "@/src/components/ui/label"
import { updateSubject } from "@/src/services/courseServices"

interface EditCourseProps {
    subjectId: number
    subjectName: string
    subjectDescription: string
    subjectStatus: string
    onSubjectUpdated: () => void
}

export default function EditCourse({
    subjectId,
    subjectName,
    subjectDescription,
    subjectStatus,
    onSubjectUpdated,
}: EditCourseProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        subjectName,
        subjectDescription,
        subjectStatus,
    })

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async () => {
        try {
            setIsUpdating(true)
            setError(null)
            await updateSubject(subjectId.toString(), formData)
            setIsOpen(false)
            onSubjectUpdated()
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to update subject"
            setError(errorMessage)
        } finally {
            setIsUpdating(false)
        }
    }

    return (
        <>
            <Button size="icon" variant="ghost" onClick={() => setIsOpen(true)}>
                <Edit className="h-4 w-4" />
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Subject</DialogTitle>
                        <DialogDescription>
                            Update the details for the subject "{subjectName}".
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="subjectName">Subject Name</Label>
                            <Input
                                id="subjectName"
                                value={formData.subjectName}
                                onChange={(e) => handleChange("subjectName", e.target.value)}
                                placeholder="Enter subject name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="subjectDescription">Description</Label>
                            <Input
                                id="subjectDescription"
                                value={formData.subjectDescription}
                                onChange={(e) => handleChange("subjectDescription", e.target.value)}
                                placeholder="Enter subject description"
                            />
                        </div>
                        <div>
                            <Label htmlFor="subjectStatus">Status</Label>
                            <Select
                                value={formData.subjectStatus}
                                onValueChange={(value) => handleChange("subjectStatus", value)}
                            >
                                <SelectTrigger id="subjectStatus">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={isUpdating}
                        >
                            {isUpdating ? "Updating..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}