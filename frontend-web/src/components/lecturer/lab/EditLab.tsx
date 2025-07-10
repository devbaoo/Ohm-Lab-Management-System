"use client"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { getLabById, updateLab } from "@/src/services/courseServices"

interface Lab {
    labId: string
    labName: string
    labRequest: string
    labTarget: string
    labStatus: string
}

interface EditLabProps {
    labId: string
    isOpen: boolean
    onClose: () => void
    onLabUpdated: (updatedLab: Lab) => void
}

const EditLab: React.FC<EditLabProps> = ({ labId, isOpen, onClose, onLabUpdated }) => {
    const [lab, setLab] = useState<Lab>({
        labId,
        labName: "",
        labRequest: "",
        labTarget: "",
        labStatus: "Active",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchLab = async () => {
            if (!labId) return
            try {
                setIsLoading(true)
                const response = await getLabById(labId)
                setLab(response)
            } catch (err: any) {
                setError(err.message || "Failed to fetch lab details")
            } finally {
                setIsLoading(false)
            }
        }
        fetchLab()
    }, [labId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const updatedLab = await updateLab(labId, {
                labName: lab.labName,
                labRequest: lab.labRequest,
                labTarget: lab.labTarget,
                labStatus: lab.labStatus,
            })
            onLabUpdated(updatedLab)
            onClose()
        } catch (err: any) {
            setError(err.message || "Failed to update lab")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Lab</DialogTitle>
                </DialogHeader>
                {isLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="labName">Lab Name</Label>
                                <Input
                                    id="labName"
                                    value={lab.labName}
                                    onChange={(e) => setLab({ ...lab, labName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="labRequest">Lab Request</Label>
                                <Input
                                    id="labRequest"
                                    value={lab.labRequest}
                                    onChange={(e) => setLab({ ...lab, labRequest: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="labTarget">Lab Target</Label>
                                <Input
                                    id="labTarget"
                                    value={lab.labTarget}
                                    onChange={(e) => setLab({ ...lab, labTarget: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="labStatus">Lab Status</Label>
                                <Select
                                    value={lab.labStatus}
                                    onValueChange={(value) => setLab({ ...lab, labStatus: value })}
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
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default EditLab