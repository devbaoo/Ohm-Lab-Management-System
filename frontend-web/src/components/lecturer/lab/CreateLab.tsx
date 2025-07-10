"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/src/components/ui/dialog"
import { createLab } from "@/src/services/courseServices"

interface Lab {
    subjectId: number
    labName: string
    labRequest: string
    labTarget: string
    labStatus: string
}

interface CreateLabProps {
    subjectId: number
    isOpen: boolean
    onClose: () => void
    onLabCreated: (newLab: Lab) => void
}

const CreateLab: React.FC<CreateLabProps> = ({ subjectId, isOpen, onClose, onLabCreated }) => {
    const [formData, setFormData] = useState({
        labName: "",
        labRequest: "",
        labTarget: "",
        labStatus: "Active"
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleStatusChange = (value: string) => {
        setFormData(prev => ({ ...prev, labStatus: value }))
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        try {
            const response = await createLab({
                labName: formData.labName,
                labRequest: formData.labRequest,
                labTarget: formData.labTarget,
                labStatus: formData.labStatus,
                subjectId: subjectId
            })
            console.log("Test create lab:", response)
            const newLab: Lab = {
                subjectId:subjectId,
                labName: formData.labName,
                labRequest: formData.labRequest,
                labTarget: formData.labTarget,
                labStatus: formData.labStatus
            }
            onLabCreated(newLab)
            setFormData({ labName: "", labRequest: "", labTarget: "", labStatus: "Active" })
            onClose()
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to create lab"
            setError(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Lab</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="labName">Lab Name</Label>
                        <Input
                            id="labName"
                            name="labName"
                            value={formData.labName}
                            onChange={handleInputChange}
                            placeholder="Enter lab name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="labRequest">Lab Request</Label>
                        <Input
                            id="labRequest"
                            name="labRequest"
                            value={formData.labRequest}
                            onChange={handleInputChange}
                            placeholder="Enter lab request"
                        />
                    </div>
                    <div>
                        <Label htmlFor="labTarget">Lab Target</Label>
                        <Input
                            id="labTarget"
                            name="labTarget"
                            value={formData.labTarget}
                            onChange={handleInputChange}
                            placeholder="Enter lab target"
                        />
                    </div>
                    <div>
                        <Label htmlFor="labStatus">Status</Label>
                        <Select
                            value={formData.labStatus}
                            onValueChange={handleStatusChange}
                        >
                            <SelectTrigger id="labStatus">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">
                            {error}
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Lab"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateLab