"use client"

import { useState, useMemo } from "react"
import { BookOpen, Search, Calendar, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Badge } from "@/src/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import DashboardLayout from "@/src/components/dashboard-layout"

// Sample lab data
const labData = [
    {
        id: 1,
        name: "Digital Circuit Design",
        course: "Electronics 101",
        status: "open",
        dueDate: "2025-07-15",
        createdDate: "2025-06-01",
        submissions: 25,
    },
    {
        id: 2,
        name: "Microcontroller Programming",
        course: "Embedded Systems",
        status: "closed",
        dueDate: "2025-06-30",
        createdDate: "2025-05-20",
        submissions: 30,
    },
    {
        id: 3,
        name: "Signal Processing Lab",
        course: "DSP Fundamentals",
        status: "open",
        dueDate: "2025-07-20",
        createdDate: "2025-06-10",
        submissions: 15,
    },
    {
        id: 4,
        name: "Analog Circuit Analysis",
        course: "Electronics 101",
        status: "draft",
        dueDate: "2025-08-01",
        createdDate: "2025-06-15",
        submissions: 0,
    },
    {
        id: 5,
        name: "FPGA Implementation",
        course: "Advanced Digital Systems",
        status: "open",
        dueDate: "2025-07-10",
        createdDate: "2025-05-25",
        submissions: 20,
    },
]

const courseOptions = [
    { value: "all", label: "All Courses" },
    { value: "Electronics 101", label: "Electronics 101" },
    { value: "Embedded Systems", label: "Embedded Systems" },
    { value: "DSP Fundamentals", label: "DSP Fundamentals" },
    { value: "Advanced Digital Systems", label: "Advanced Digital Systems" },
]

const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
    { value: "draft", label: "Draft" },
]

export default function LecturerLabPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCourse, setSelectedCourse] = useState("all")
    const [selectedStatus, setSelectedStatus] = useState("all")

    const filteredLabs = useMemo(() => {
        return labData.filter((lab) => {
            const matchesSearch =
                lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lab.course.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesCourse = selectedCourse === "all" || lab.course === selectedCourse
            const matchesStatus = selectedStatus === "all" || lab.status === selectedStatus

            return matchesSearch && matchesCourse && matchesStatus
        })
    }, [searchTerm, selectedCourse, selectedStatus])

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "open":
                return "default"
            case "closed":
                return "secondary"
            case "draft":
                return "outline"
            default:
                return "outline"
        }
    }

    const renderTableView = () => (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Submissions</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredLabs.map((lab) => (
                            <TableRow key={lab.id}>
                                <TableCell className="font-medium">{lab.name}</TableCell>
                                <TableCell className="text-orange-500">{lab.course}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="h-3 w-3 text-gray-500" />
                                        {lab.submissions}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(lab.status)}>{lab.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(lab.dueDate).toLocaleDateString("vi-VN")}
                                </TableCell>
                                <TableCell>{new Date(lab.createdDate).toLocaleDateString("vi-VN")}</TableCell>
                                <TableCell>
                                    <div className="flex gap-1">
                                        <Button size="sm" variant="ghost">
                                            <Eye className="h-3 w-3" />
                                        </Button>
                                        <Button size="sm" variant="ghost">
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )

    return (
        <DashboardLayout role="lecturer">
            <div className="min-h-screen p-4">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lab Management</h1>
                        </div>
                        <Button className="bg-orange-500 hover:bg-orange-600">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Lab
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                                    <BookOpen className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Labs</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {labData.length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                    <BookOpen className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Open Labs</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {labData.filter((l) => l.status === "open").length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <Calendar className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Submissions</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {labData.reduce((sum, l) => sum + l.submissions, 0)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex gap-2 flex-1">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search by lab name or course..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                            <SelectTrigger className="w-64">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {courseOptions.map((course) => (
                                    <SelectItem key={course.value} value={course.value}>
                                        {course.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Results */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {filteredLabs.length} of {labData.length} labs
                    </p>
                </div>

                {/* Lab Display */}
                {filteredLabs.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                No labs found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Try adjusting your search criteria or add new labs.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    renderTableView()
                )}
            </div>
        </DashboardLayout>
    )
}