"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/src/components/ui/dialog"
import { deleteSemester } from "@/src/services/semesterServices"

interface DeleteSemesterProps {
    semesterId: number
    semesterName: string
    onSemesterDeleted: () => void
}

export default function DeleteSemester({ semesterId, semesterName, onSemesterDeleted }: DeleteSemesterProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            setError(null)
            await deleteSemester(semesterId.toString())
            setIsOpen(false)
            onSemesterDeleted()
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to delete semester"
            setError(errorMessage)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            <Button size="icon" variant="ghost" onClick={() => setIsOpen(true)}>
                <Trash2 className="h-4 w-4" />
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Semester</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the semester "{semesterName}"? This action cannot be undone and will also delete all associated weeks.
                        </DialogDescription>
                    </DialogHeader>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
} 