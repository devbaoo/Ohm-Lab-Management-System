"use client"

import { useState } from "react"
import { Plus, Upload, X } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { toast } from "@/src/components/ui/use-toast"
import * as XLSX from "xlsx"

interface CreateNewClassProps {
    onCreateClass: (newClass: any) => void
}

export default function CreateNewClass({ onCreateClass }: CreateNewClassProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        subjectName: "",
        subjectCode: "",
        classCode: "",
        semester: "",
        maxStudents: "",
        room: "",
        schedule: "",
    })
    const [file, setFile] = useState<File | null>(null)
    const [status, setStatus] = useState("active")

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate form data
        if (!Object.values(formData).every((value) => value.trim()) || !status) {
            toast({
                title: "Error",
                description: "Please fill in all required fields",
                variant: "destructive",
            })
            return
        }

        let studentList: any[] = []
        if (file) {
            try {
                const data = await file.arrayBuffer()
                const workbook = XLSX.read(data)
                const worksheet = workbook.Sheets[workbook.SheetNames[0]]
                studentList = XLSX.utils.sheet_to_json(worksheet)
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to process Excel file",
                    variant: "destructive",
                })
                return
            }
        }

        const newClass = {
            id: Date.now(), // Temporary ID, replace with actual ID from backend
            ...formData,
            students: studentList.length,
            maxStudents: parseInt(formData.maxStudents),
            status,
            createdDate: new Date().toISOString().split('T')[0],
            studentList, // Include student list if needed
        }

        onCreateClass(newClass)
        setIsOpen(false)
        toast({
            title: "Success",
            description: "New class created successfully",
        })

        // Reset form
        setFormData({
            subjectName: "",
            subjectCode: "",
            classCode: "",
            semester: "",
            maxStudents: "",
            room: "",
            schedule: "",
        })
        setFile(null)
        setStatus("active")
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="h-4 w-4 mr-2" />
                    New Class
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Create New Class</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="subjectName">Subject Name</Label>
                            <Input
                                id="subjectName"
                                name="subjectName"
                                value={formData.subjectName}
                                onChange={handleInputChange}
                                placeholder="Digital Electronics"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subjectCode">Subject Code</Label>
                            <Input
                                id="subjectCode"
                                name="subjectCode"
                                value={formData.subjectCode}
                                onChange={handleInputChange}
                                placeholder="ELE301"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="classCode">Class Code</Label>
                            <Input
                                id="classCode"
                                name="classCode"
                                value={formData.classCode}
                                onChange={handleInputChange}
                                placeholder="ELE301.01"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="semester">Semester</Label>
                            <Input
                                id="semester"
                                name="semester"
                                value={formData.semester}
                                onChange={handleInputChange}
                                placeholder="Fall 2024"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="maxStudents">Max Students</Label>
                            <Input
                                id="maxStudents"
                                name="maxStudents"
                                type="number"
                                value={formData.maxStudents}
                                onChange={handleInputChange}
                                placeholder="30"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="room">Room</Label>
                            <Input
                                id="room"
                                name="room"
                                value={formData.room}
                                onChange={handleInputChange}
                                placeholder="Lab A-301"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="schedule">Schedule</Label>
                            <Input
                                id="schedule"
                                name="schedule"
                                value={formData.schedule}
                                onChange={handleInputChange}
                                placeholder="Mon, Wed 08:00-10:00"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="studentList">Student List (Excel)</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="studentList"
                                type="file"
                                accept=".xlsx,.xls"
                                onChange={handleFileChange}
                                className="flex-1"
                            />
                            {file && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setFile(null)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                        <p className="text-sm text-gray-500">
                            Upload an Excel file containing student information (optional)
                        </p>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                            Create Class
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}