"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { createWeek, WeekCreateUpdate } from "@/src/services/weekServices"
import { getSemesters } from "@/src/services/semesterServices"

interface CreateWeekProps {
    onWeekCreated: () => void
    selectedSemesterId: number
}

interface Semester {
    id: number
    name: string
}

export default function CreateWeek({ onWeekCreated, selectedSemesterId }: CreateWeekProps) {
    const [formData, setFormData] = useState<WeekCreateUpdate>({
        semesterId: selectedSemesterId,
        weeksName: "",
        weeksStartDate: "",
        weeksEndDate: "",
        weeksDescription: "",
        weeksStatus: "Active"
    })
    const [semesters, setSemesters] = useState<Semester[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [open, setOpen] = useState(false)

    // Fetch semesters when dialog opens
    const fetchSemesters = async () => {
        try {
            const response = await getSemesters()
            const mappedSemesters = (response.data || []).map((s: any) => ({
                id: s.semesterId,
                name: s.semesterName,
            }))
            setSemesters(mappedSemesters)
        } catch (err) {
            console.error("Failed to fetch semesters:", err)
        }
    }

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
        if (newOpen) {
            fetchSemesters()
            // Reset form data with current selected semester
            setFormData({
                semesterId: selectedSemesterId,
                weeksName: "",
                weeksStartDate: "",
                weeksEndDate: "",
                weeksDescription: "",
                weeksStatus: "Active"
            })
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleStatusChange = (value: string) => {
        setFormData({ ...formData, weeksStatus: value })
    }

    const handleSemesterChange = (value: string) => {
        setFormData({ ...formData, semesterId: Number(value) })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.weeksName || !formData.weeksStartDate || !formData.weeksEndDate) {
            setError("Week number, start date, and end date are required")
            return
        }

        setIsLoading(true)
        setError(null)
        try {
            await createWeek(formData)
            setFormData({
                semesterId: selectedSemesterId,
                weeksName: "",
                weeksStartDate: "",
                weeksEndDate: "",
                weeksDescription: "",
                weeksStatus: "Active"
            })
            setOpen(false)
            onWeekCreated()
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to create week")
            console.error("Error creating week:", err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                    New Week
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Week</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="semesterId">Semester</Label>
                        <Select
                            value={formData.semesterId.toString()}
                            onValueChange={handleSemesterChange}
                            disabled={isLoading}
                        >
                            <SelectTrigger id="semesterId">
                                <SelectValue placeholder="Select semester" />
                            </SelectTrigger>
                            <SelectContent>
                                {semesters.map((semester) => (
                                    <SelectItem key={semester.id} value={semester.id.toString()}>
                                        {semester.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weeksName">Week Number</Label>
                        <Input
                            id="weeksName"
                            name="weeksName"
                            type="number"
                            min="1"
                            value={formData.weeksName}
                            onChange={handleChange}
                            placeholder="e.g., 1"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="weeksStartDate">Start Date</Label>
                            <Input
                                id="weeksStartDate"
                                name="weeksStartDate"
                                type="date"
                                value={formData.weeksStartDate}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="weeksEndDate">End Date</Label>
                            <Input
                                id="weeksEndDate"
                                name="weeksEndDate"
                                type="date"
                                value={formData.weeksEndDate}
                                onChange={handleChange}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weeksStatus">Status</Label>
                        <Select
                            value={formData.weeksStatus}
                            onValueChange={handleStatusChange}
                            disabled={isLoading}
                        >
                            <SelectTrigger id="weeksStatus">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="weeksDescription">Description</Label>
                        <Textarea
                            id="weeksDescription"
                            name="weeksDescription"
                            value={formData.weeksDescription}
                            onChange={handleChange}
                            placeholder="Optional description for the week"
                            disabled={isLoading}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create Week"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
} 