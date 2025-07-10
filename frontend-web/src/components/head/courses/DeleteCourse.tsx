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
import { deleteSubject } from "@/src/services/courseServices"

interface DeleteCourseProps {
    subjectId: number
    subjectName: string
    onSubjectDeleted: () => void
}

export default function DeleteCourse({ subjectId, subjectName, onSubjectDeleted }: DeleteCourseProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            setError(null)
            await deleteSubject(subjectId.toString()) 
            setIsOpen(false)
            onSubjectDeleted()
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to delete subject"
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
                        <DialogTitle>Delete Subject</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the subject "{subjectName}"? This action cannot be undone.
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