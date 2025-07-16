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
import { updateWeek, WeekCreateUpdate } from "@/src/services/weekServices"

interface EditWeekProps {
    weekId: number
    semesterId: number
    weekNumber: string
    startDate: string
    endDate: string
    description: string
    status: string
    onWeekUpdated: () => void
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

export default function EditWeek({
    weekId,
    semesterId,
    weekNumber,
    startDate,
    endDate,
    description,
    status,
    onWeekUpdated,
}: EditWeekProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState<WeekCreateUpdate>({
        semesterId,
        weeksName: weekNumber,
        weeksStartDate: toInputDateValue(startDate),
        weeksEndDate: toInputDateValue(endDate),
        weeksDescription: description,
        weeksStatus: status,
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleStatusChange = (value: string) => {
        setFormData({ ...formData, weeksStatus: value })
    }

    const handleSubmit = async () => {
        try {
            setIsUpdating(true)
            setError(null)
            await updateWeek(weekId.toString(), formData)
            setIsOpen(false)
            onWeekUpdated()
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to update week"
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
                        <DialogTitle>Edit Week</DialogTitle>
                        <DialogDescription>
                            Update the details for Week {weekNumber}.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="weeksName">Week Number</Label>
                            <Input
                                id="weeksName"
                                name="weeksName"
                                type="number"
                                min="1"
                                value={formData.weeksName}
                                onChange={handleChange}
                                placeholder="e.g., 1"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="weeksStartDate">Start Date</Label>
                                <Input
                                    id="weeksStartDate"
                                    name="weeksStartDate"
                                    type="date"
                                    value={formData.weeksStartDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="weeksEndDate">End Date</Label>
                                <Input
                                    id="weeksEndDate"
                                    name="weeksEndDate"
                                    type="date"
                                    value={formData.weeksEndDate}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="weeksStatus">Status</Label>
                            <Select
                                value={formData.weeksStatus}
                                onValueChange={handleStatusChange}
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
                        <div>
                            <Label htmlFor="weeksDescription">Description</Label>
                            <Textarea
                                id="weeksDescription"
                                name="weeksDescription"
                                value={formData.weeksDescription}
                                onChange={handleChange}
                                placeholder="Optional description for the week"
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