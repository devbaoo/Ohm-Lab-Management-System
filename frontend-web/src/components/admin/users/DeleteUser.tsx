"use client"

import { Button } from "../../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import { Trash2 } from "lucide-react"
import { deleteUser } from "@/src/services/userServices"
import { useState } from "react"

interface DeleteUserProps {
    userId: string | null
    userName: string
    isOpen: boolean
    onClose: () => void
    onDelete: () => void
}

export default function DeleteUser({ userId, userName, isOpen, onClose, onDelete }: DeleteUserProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleDelete = async () => {
        if (!userId) return

        setLoading(true)
        setError(null)
        try {
            await deleteUser(userId)
            onDelete()
            onClose()
        } catch (err) {
            setError("Failed to delete user. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete {userName}? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                {error && (
                    <div className="text-red-600 text-sm">{error}</div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex items-center gap-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}