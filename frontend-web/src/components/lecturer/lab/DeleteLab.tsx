"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/src/components/ui/dialog"
import { deleteLab } from "@/src/services/courseServices"

interface DeleteLabProps {
    labId?: string // Make labId optional to match Lab interface
    labName: string // For display purposes
    isOpen: boolean
    onClose: () => void
    onLabDeleted: (labId: string) => void
}

const DeleteLab: React.FC<DeleteLabProps> = ({ labId, labName, isOpen, onClose, onLabDeleted }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleDelete = async () => {
        if (!labId) {
            setError("Cannot delete lab: Lab ID is missing")
            return
        }
        try {
            setIsDeleting(true)
            setError(null)
            console.log("Attempting to delete lab with ID:", labId)
            await deleteLab(labId)
            onLabDeleted(labId)
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to delete lab"
            console.error("Delete error:", {
                status: err.response?.status,
                data: err.response?.data,
                message: err.message,
            })
            setError(errorMessage)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Lab</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the lab "{labName}"? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                {error && (
                    <div className="text-red-500 text-sm mt-2">
                        {error}
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isDeleting}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting || !labId}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteLab