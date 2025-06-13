"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { CircuitBoard, Search, Users, Calendar, BookOpen, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Badge } from "@/src/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import DashboardLayout from "@/src/components/dashboard-layout"

// Sample classes data
const classesData = [
    {
        id: 1,
        subjectName: "Digital Electronics",
        subjectCode: "ELE301",
        classCode: "ELE301.01",
        semester: "Fall 2024",
        students: 25,
        maxStudents: 30,
        status: "active",
        createdDate: "2024-08-15",
        room: "Lab A-301",
        schedule: "Mon, Wed 08:00-10:00",
    },
    {
        id: 2,
        subjectName: "Advanced Circuit Design",
        subjectCode: "ELE405",
        classCode: "ELE405.02",
        semester: "Fall 2024",
        students: 20,
        maxStudents: 25,
        status: "active",
        createdDate: "2024-08-20",
        room: "Lab B-205",
        schedule: "Tue, Thu 14:00-16:00",
    },
    {
        id: 3,
        subjectName: "Software Engineering",
        subjectCode: "SE1806",
        classCode: "SE1806.03",
        semester: "Fall 2024",
        students: 30,
        maxStudents: 35,
        status: "active",
        createdDate: "2024-08-10",
        room: "Lab C-102",
        schedule: "Wed, Fri 10:00-12:00",
    },
    {
        id: 4,
        subjectName: "Digital Electronics",
        subjectCode: "ELE301",
        classCode: "ELE301.02",
        semester: "Fall 2024",
        students: 28,
        maxStudents: 30,
        status: "active",
        createdDate: "2024-08-18",
        room: "Lab A-302",
        schedule: "Tue, Thu 08:00-10:00",
    },
    {
        id: 5,
        subjectName: "Microprocessor Systems",
        subjectCode: "ELE402",
        classCode: "ELE402.01",
        semester: "Fall 2024",
        students: 22,
        maxStudents: 25,
        status: "pending",
        createdDate: "2024-09-01",
        room: "Lab D-101",
        schedule: "Mon, Wed 14:00-16:00",
    },
    {
        id: 6,
        subjectName: "Advanced Circuit Design",
        subjectCode: "ELE405",
        classCode: "ELE405.01",
        semester: "Summer 2024",
        students: 18,
        maxStudents: 20,
        status: "completed",
        createdDate: "2024-05-15",
        room: "Lab B-203",
        schedule: "Mon-Fri 09:00-11:00",
    },
    {
        id: 7,
        subjectName: "Embedded Systems",
        subjectCode: "ELE501",
        classCode: "ELE501.01",
        semester: "Fall 2024",
        students: 15,
        maxStudents: 20,
        status: "active",
        createdDate: "2024-08-25",
        room: "Lab E-201",
        schedule: "Wed, Fri 14:00-16:00",
    },
    {
        id: 8,
        subjectName: "Software Engineering",
        subjectCode: "SE1806",
        classCode: "SE1806.01",
        semester: "Summer 2024",
        students: 25,
        maxStudents: 30,
        status: "completed",
        createdDate: "2024-05-10",
        room: "Lab C-101",
        schedule: "Mon-Thu 10:00-12:00",
    },
]

const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "ELE301", label: "ELE301 - Digital Electronics" },
    { value: "ELE405", label: "ELE405 - Advanced Circuit Design" },
    { value: "SE1806", label: "SE1806 - Software Engineering" },
    { value: "ELE402", label: "ELE402 - Microprocessor Systems" },
    { value: "ELE501", label: "ELE501 - Embedded Systems" },
]

const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
]

export default function LecturerClassesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedSubject, setSelectedSubject] = useState("all")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

    const filteredClasses = useMemo(() => {
        return classesData.filter((classItem) => {
            const matchesSearch =
                classItem.classCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                classItem.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesSubject = selectedSubject === "all" || classItem.subjectCode === selectedSubject
            const matchesStatus = selectedStatus === "all" || classItem.status === selectedStatus

            return matchesSearch && matchesSubject && matchesStatus
        })
    }, [searchTerm, selectedSubject, selectedStatus])

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-500"
            case "pending":
                return "bg-yellow-500"
            case "completed":
                return "bg-gray-500"
            default:
                return "bg-gray-500"
        }
    }

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "active":
                return "default"
            case "pending":
                return "secondary"
            case "completed":
                return "outline"
            default:
                return "outline"
        }
    }

    const renderGridView = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((classItem) => (
                <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                            <div>
                                <CardTitle className="text-lg">{classItem.subjectName}</CardTitle>
                                <CardDescription className="text-orange-500 font-medium">{classItem.classCode}</CardDescription>
                            </div>
                            <Badge variant={getStatusVariant(classItem.status)}>{classItem.status}</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span>
                                    {classItem.students}/{classItem.maxStudents}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <span>{classItem.semester}</span>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div>
                                <strong>Room:</strong> {classItem.room}
                            </div>
                            <div>
                                <strong>Schedule:</strong> {classItem.schedule}
                            </div>
                            <div>
                                <strong>Created:</strong> {new Date(classItem.createdDate).toLocaleDateString("vi-VN")}
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" className="flex-1">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                                <Edit className="h-3 w-3 mr-1" />
                                Edit
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )

    const renderTableView = () => (
        <Card>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Class Code</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Students</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Room</TableHead>
                            <TableHead>Schedule</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredClasses.map((classItem) => (
                            <TableRow key={classItem.id}>
                                <TableCell className="font-medium text-orange-500">{classItem.classCode}</TableCell>
                                <TableCell>
                                    <div>
                                        <div className="font-medium">{classItem.subjectName}</div>
                                        <div className="text-sm text-gray-500">{classItem.subjectCode}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Users className="h-3 w-3 text-gray-500" />
                                        {classItem.students}/{classItem.maxStudents}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusVariant(classItem.status)}>{classItem.status}</Badge>
                                </TableCell>
                                <TableCell>{classItem.room}</TableCell>
                                <TableCell className="text-sm">{classItem.schedule}</TableCell>
                                <TableCell>{new Date(classItem.createdDate).toLocaleDateString("vi-VN")}</TableCell>
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
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Classes</h1>
                        </div>
                        <Button className="bg-orange-500 hover:bg-orange-600">
                            <Plus className="h-4 w-4 mr-2" />
                            New Class
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                                    <BookOpen className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Classes</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{classesData.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                    <Users className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Classes</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {classesData.filter((c) => c.status === "active").length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <Users className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {classesData.reduce((sum, c) => sum + c.students, 0)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                                    <Calendar className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">This Semester</p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {classesData.filter((c) => c.semester === "Fall 2024").length}
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
                                placeholder="Search by class code or subject..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                            <SelectTrigger className="w-64">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {subjects.map((subject) => (
                                    <SelectItem key={subject.value} value={subject.value}>
                                        {subject.label}
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

                    <div className="flex gap-2">
                        <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
                            Grid
                        </Button>
                        <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
                            Table
                        </Button>
                    </div>
                </div>

                {/* Results */}
                <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Showing {filteredClasses.length} of {classesData.length} classes
                    </p>
                </div>

                {/* Classes Display */}
                {filteredClasses.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No classes found</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Try adjusting your search criteria or create a new class.
                            </p>
                        </CardContent>
                    </Card>
                ) : viewMode === "grid" ? (
                    renderGridView()
                ) : (
                    renderTableView()
                )}
            </div>
        </DashboardLayout>

    )
}
