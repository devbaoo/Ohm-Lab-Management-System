"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { updateUser, getUserById } from "@/src/services/userServices"

interface EditUserProps {
    userId: string | null
    isOpen: boolean
    onClose: () => void
    onUpdate: () => void
}

interface UserData {
    userFullName: string
    userRollNumber: string
    userEmail: string
    userNumberCode: string
    status: string
}

export default function EditUser({ userId, isOpen, onClose, onUpdate }: EditUserProps) {
    const [userData, setUserData] = useState<UserData>({
        userFullName: "",
        userRollNumber: "",
        userEmail: "",
        userNumberCode: "",
        status: "Isactive"
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formErrors, setFormErrors] = useState<Partial<UserData>>({})

    // Validate form fields
    const validateForm = (): boolean => {
        const errors: Partial<UserData> = {}
        if (!userData.userFullName.trim()) errors.userFullName = "Full name is required"
        if (!userData.userRollNumber.trim()) errors.userRollNumber = "Roll number is required"
        if (!userData.userEmail.trim()) {
            errors.userEmail = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(userData.userEmail)) {
            errors.userEmail = "Invalid email format"
        }
        if (!userData.userNumberCode.trim()) errors.userNumberCode = "Number code is required"
        if (!userData.status) errors.status = "Status is required"

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    useEffect(() => {
        if (userId && isOpen) {
            setLoading(true)
            setError(null)
            getUserById(userId)
                .then((response) => {
                    const data = response
                    setUserData({
                        userFullName: data.userFullName,
                        userRollNumber: data.userRollNumber,
                        userEmail: data.userEmail,
                        userNumberCode: data.userNumberCode,
                        status: data.status
                    })
                    setError(null)
                })
                .catch((err) => setError(`Failed to fetch user data: ${err.message}`))
                .finally(() => setLoading(false))
        }
    }, [userId, isOpen])

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUserData((prev) => ({ ...prev, [name]: value }))
        setFormErrors((prev) => ({ ...prev, [name]: undefined })) 
    }

    // Handle status select change
    const handleStatusChange = (value: string) => {
        setUserData((prev) => ({ ...prev, status: value }))
        setFormErrors((prev) => ({ ...prev, status: undefined }))
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!userId || !validateForm()) return

        setLoading(true)
        setError(null)

        try {
            await updateUser(userId, userData)
            onUpdate() // Trigger refresh of user list
            onClose() // Close modal
        } catch (err) {
            setError(`Failed to update user`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                {loading && <p>Loading user data...</p>}
                {error && <p className="text-red-600">{error}</p>}
                {!loading && !error && (
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="userFullName" className="text-right">
                                    Full Name
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="userFullName"
                                        name="userFullName"
                                        value={userData.userFullName}
                                        onChange={handleInputChange}
                                        className={formErrors.userFullName ? "border-red-500" : ""}
                                    />
                                    {formErrors.userFullName && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.userFullName}</p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="userRollNumber" className="text-right">
                                    Role
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="userRollNumber"
                                        name="userRollNumber"
                                        value={userData.userRollNumber}
                                        onChange={handleInputChange}
                                        className={formErrors.userRollNumber ? "border-red-500" : ""}
                                    />
                                    {formErrors.userRollNumber && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.userRollNumber}</p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="userEmail" className="text-right">
                                    Email
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="userEmail"
                                        name="userEmail"
                                        type="email"
                                        value={userData.userEmail}
                                        onChange={handleInputChange}
                                        className={formErrors.userEmail ? "border-red-500" : ""}
                                    />
                                    {formErrors.userEmail && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.userEmail}</p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="userNumberCode" className="text-right">
                                    Number Code
                                </Label>
                                <div className="col-span-3">
                                    <Input
                                        id="userNumberCode"
                                        name="userNumberCode"
                                        value={userData.userNumberCode}
                                        onChange={handleInputChange}
                                        className={formErrors.userNumberCode ? "border-red-500" : ""}
                                    />
                                    {formErrors.userNumberCode && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.userNumberCode}</p>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">
                                    Status
                                </Label>
                                <div className="col-span-3">
                                    <Select value={userData.status} onValueChange={handleStatusChange}>
                                        <SelectTrigger className={formErrors.status ? "border-red-500" : ""}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Isactive">Active</SelectItem>
                                            <SelectItem value="delete">Inactive</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {formErrors.status && (
                                        <p className="text-red-500 text-sm mt-1">{formErrors.status}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Saving..." : "Save changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
