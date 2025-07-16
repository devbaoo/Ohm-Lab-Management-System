"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { createSemester, SemesterCreateUpdate } from "@/src/services/semesterServices"

interface CreateSemesterProps {
    onSemesterCreated: () => void
}

export default function CreateSemester({ onSemesterCreated }: CreateSemesterProps) {
    const [formData, setFormData] = useState<SemesterCreateUpdate>({
        semesterName: "",
        semesterStartDate: "",
        semesterEndDate: "",
        semesterDescription: "",
        semesterStatus: "upcoming"
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleStatusChange = (value: string) => {
        setFormData({ ...formData, semesterStatus: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.semesterName || !formData.semesterStartDate || !formData.semesterEndDate) {
            setError("Name, start date, and end date are required")
            return
        }

        setIsLoading(true)
        setError(null)
        try {
            await createSemester(formData)
            setFormData({
                semesterName: "",
                semesterStartDate: "",
                semesterEndDate: "",
                semesterDescription: "",
                semesterStatus: "upcoming"
            })
            setOpen(false)
            onSemesterCreated()
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create semester")
            console.error("Error creating semester:", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                    New Semester
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Semester</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="semesterName">Semester Name</Label>
                        <Input
                            id="semesterName"
                            name="semesterName"
                            value={formData.semesterName}
                            onChange={handleChange}
                            placeholder="Enter semester name"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="semesterStartDate">Start Date</Label>
                            <Input
                                id="semesterStartDate"
                                name="semesterStartDate"
                                type="date"
                                value={formData.semesterStartDate}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="semesterEndDate">End Date</Label>
                            <Input
                                id="semesterEndDate"
                                name="semesterEndDate"
                                type="date"
                                value={formData.semesterEndDate}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="semesterStatus">Status</Label>
                        <Select
                            value={formData.semesterStatus}
                            onValueChange={handleStatusChange}
                            disabled={isLoading}
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
                    <div className="space-y-2">
                        <Label htmlFor="semesterDescription">Description</Label>
                        <Textarea
                            id="semesterDescription"
                            name="semesterDescription"
                            value={formData.semesterDescription}
                            onChange={handleChange}
                            placeholder="Enter semester description"
                            disabled={isLoading}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Semester"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
} 