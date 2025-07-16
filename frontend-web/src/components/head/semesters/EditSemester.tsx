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
import { Textarea } from "@/src/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select"
import { Label } from "@/src/components/ui/label"
import { updateSemester, SemesterCreateUpdate } from "@/src/services/semesterServices"

interface EditSemesterProps {
    semesterId: number
    semesterName: string
    semesterStartDate: string
    semesterEndDate: string
    semesterDescription: string
    semesterStatus: string
    onSemesterUpdated: () => void
}

// Helper function to convert ISO date string to yyyy-MM-dd format for HTML date inputs
function toInputDateValue(dateStr: string | undefined) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

export default function EditSemester({
    semesterId,
    semesterName,
    semesterStartDate,
    semesterEndDate,
    semesterDescription,
    semesterStatus,
    onSemesterUpdated,
}: EditSemesterProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState<SemesterCreateUpdate>({
        semesterName,
        semesterStartDate: toInputDateValue(semesterStartDate),
        semesterEndDate: toInputDateValue(semesterEndDate),
        semesterDescription,
        semesterStatus,
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleStatusChange = (value: string) => {
        setFormData({ ...formData, semesterStatus: value })
    }

    const handleSubmit = async () => {
        try {
            setIsUpdating(true)
            setError(null)
            await updateSemester(semesterId.toString(), formData)
            setIsOpen(false)
            onSemesterUpdated()
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to update semester"
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
                        <DialogTitle>Edit Semester</DialogTitle>
                        <DialogDescription>
                            Update the details for the semester "{semesterName}".
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="semesterName">Semester Name</Label>
                            <Input
                                id="semesterName"
                                name="semesterName"
                                value={formData.semesterName}
                                onChange={handleChange}
                                placeholder="Enter semester name"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="semesterStartDate">Start Date</Label>
                                <Input
                                    id="semesterStartDate"
                                    name="semesterStartDate"
                                    type="date"
                                    value={formData.semesterStartDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="semesterEndDate">End Date</Label>
                                <Input
                                    id="semesterEndDate"
                                    name="semesterEndDate"
                                    type="date"
                                    value={formData.semesterEndDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="semesterStatus">Status</Label>
                            <Select
                                value={formData.semesterStatus}
                                onValueChange={handleStatusChange}
                            >
                                <SelectTrigger id="semesterStatus">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="semesterDescription">Description</Label>
                            <Textarea
                                id="semesterDescription"
                                name="semesterDescription"
                                value={formData.semesterDescription}
                                onChange={handleChange}
                                placeholder="Enter semester description"
                            />
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