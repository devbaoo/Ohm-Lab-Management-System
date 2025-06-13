"use client"

import { useState } from "react"
import Link from "next/link"
import { CircuitBoard, Search, Plus, AlertTriangle, CheckCircle, Clock, Eye, Edit, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog"
import DashboardLayout from "@/src/components/dashboard-layout"

// Define status options for the Select dropdown
const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "resolved", label: "Resolved" },
]

// Sample reports data
const reportsData = [
    {
        id: 1,
        title: "Oscilloscope Display Malfunction",
        description:
            "The display on oscilloscope #3 in Lab A-301 is flickering and sometimes goes completely blank during use.",
        equipmentType: "oscilloscope",
        serialNumber: "TEKTRO-OSC-2023-003",
        reportDate: "2025-05-15T09:30:00",
        status: "pending",
        updatedDate: "2025-05-15T09:30:00",
        comments: [],
    },
    {
        id: 2,
        title: "Multimeter Not Reading Correctly",
        description:
            "The Fluke multimeter is showing inconsistent readings when measuring resistance. Tested against known resistors and found significant deviation.",
        equipmentType: "multimeter",
        serialNumber: "FLUKE-MM-2022-015",
        reportDate: "2025-05-10T14:20:00",
        status: "resolved",
        updatedDate: "2025-05-12T11:15:00",
        comments: [
            {
                author: "Technical Staff",
                date: "2025-05-12T11:15:00",
                text: "Scheduled for inspection on May 14th. Will update after assessment.",
            },
        ],
    },
    {
        id: 3,
        title: "Power Supply Overheating",
        description:
            "The bench power supply in Lab B-205 is getting extremely hot after about 30 minutes of use, even at low current settings.",
        equipmentType: "power_supply",
        serialNumber: "KEYSIGHT-PS-2024-007",
        reportDate: "2025-05-08T10:45:00",
        status: "resolved",
        updatedDate: "2025-05-11T16:30:00",
        comments: [
            {
                author: "Technical Staff",
                date: "2025-05-09T09:20:00",
                text: "Inspected the unit. Found dust buildup blocking ventilation. Will clean and test.",
            },
            {
                author: "Technical Staff",
                date: "2025-05-11T16:30:00",
                text: "Cleaned internal components and tested for 2 hours. Temperature remains normal. Issue resolved.",
            },
        ],
    },
    {
        id: 4,
        title: "Function Generator Output Unstable",
        description:
            "The function generator in Lab C-102 has unstable output amplitude that varies randomly during experiments.",
        equipmentType: "function_generator",
        serialNumber: "RIGOL-FG-2023-012",
        reportDate: "2025-05-05T13:15:00",
        status: "resolved",
        updatedDate: "2025-05-07T10:00:00",
        comments: [
            {
                author: "Technical Staff",
                date: "2025-05-07T10:00:00",
                text: "Initial testing confirms the issue. Contacted manufacturer for troubleshooting steps.",
            },
        ],
    },
    {
        id: 5,
        title: "Soldering Station Not Heating",
        description:
            "The soldering station in Lab A-301 doesn't heat up. Power light comes on but temperature doesn't rise.",
        equipmentType: "soldering_station",
        serialNumber: "HAKKO-SS-2022-009",
        reportDate: "2025-05-01T15:30:00",
        status: "resolved",
        updatedDate: "2025-05-03T14:45:00",
        comments: [
            {
                author: "Technical Staff",
                date: "2025-05-02T09:10:00",
                text: "Inspected unit. Found loose connection in heating element.",
            },
            {
                author: "Technical Staff",
                date: "2025-05-03T14:45:00",
                text: "Repaired connection and tested. Working properly now.",
            },
        ],
    },
    {
        id: 6,
        title: "Computer Blue Screen Error",
        description: "Computer #5 in Lab D-101 frequently shows blue screen errors during programming labs.",
        equipmentType: "computer",
        serialNumber: "DELL-PC-2023-025",
        reportDate: "2025-04-28T11:20:00",
        status: "pending",
        updatedDate: "2025-04-28T11:20:00",
        comments: [],
    },
]

export default function LecturerReportsPage() {
    const [activeTab, setActiveTab] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
    const [selectedReport, setSelectedReport] = useState<any>(null)

    // Form state
    const [newReport, setNewReport] = useState({
        title: "",
        description: "",
        equipmentType: "",
        serialNumber: "",
    })

    const handleInputChange = (field: string, value: string) => {
        setNewReport((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleCreateReport = () => {
        // In a real app, this would send data to an API
        console.log("Creating report:", newReport)
        setIsCreateDialogOpen(false)
        // Reset form
        setNewReport({
            title: "",
            description: "",
            equipmentType: "",
            serialNumber: "",
        })
    }

    const handleViewReport = (report: any) => {
        setSelectedReport(report)
        setIsViewDialogOpen(true)
    }

    const filteredReports = reportsData.filter((report) => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = activeTab === "all" || report.status === activeTab

        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Pending
                    </Badge>
                )
            case "in_progress":
                return (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        In Progress
                    </Badge>
                )
            case "resolved":
                return (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Resolved
                    </Badge>
                )
            default:
                return <Badge variant="secondary">Unknown</Badge>
        }
    }

    const getEquipmentTypeLabel = (type: string) => {
        return type; // Simplified to return the raw equipment type since equipmentTypes array is removed
    }

    return (
        <DashboardLayout role="lecturer">
            <div className="min-h-screen p-4">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Equipment Reports</h1>
                        </div>
                        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-orange-500 hover:bg-orange-600">
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Report
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[550px]">
                                <DialogHeader>
                                    <DialogTitle>Create Equipment Report</DialogTitle>
                                    <DialogDescription>
                                        Report damaged or malfunctioning equipment in the lab. Provide as much detail as possible.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">Report Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="Brief description of the issue"
                                            value={newReport.title}
                                            onChange={(e) => handleInputChange("title", e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="equipmentType">Equipment Type</Label>
                                            <Input
                                                id="equipmentType"
                                                placeholder="Enter equipment type"
                                                value={newReport.equipmentType}
                                                onChange={(e) => handleInputChange("equipmentType", e.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="serialNumber">Serial Number</Label>
                                            <Input
                                                id="serialNumber"
                                                placeholder="Equipment serial/ID number"
                                                value={newReport.serialNumber}
                                                onChange={(e) => handleInputChange("serialNumber", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe the issue in detail. Include when it started, how it manifests, and any troubleshooting steps you've taken."
                                            rows={5}
                                            value={newReport.description}
                                            onChange={(e) => handleInputChange("description", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button
                                        className="bg-orange-500 hover:bg-orange-600"
                                        onClick={handleCreateReport}
                                        disabled={
                                            !newReport.title || !newReport.description || !newReport.equipmentType || !newReport.serialNumber
                                        }
                                    >
                                        Submit Report
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Tabs and Reports List */}
                <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                    <TabsList>
                        <TabsTrigger value="all">All Reports</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-4">
                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Equipment</TableHead>
                                            <TableHead>Serial Number</TableHead>
                                            <TableHead>Report Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredReports.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-8">
                                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                                        <AlertTriangle className="h-8 w-8 mb-2" />
                                                        <p>No reports found</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredReports.map((report) => (
                                                <TableRow key={report.id}>
                                                    <TableCell className="font-medium">{report.title}</TableCell>
                                                    <TableCell>{getEquipmentTypeLabel(report.equipmentType)}</TableCell>
                                                    <TableCell className="font-mono text-sm">{report.serialNumber}</TableCell>
                                                    <TableCell>{new Date(report.reportDate).toLocaleDateString("vi-VN")}</TableCell>
                                                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-1">
                                                            <Button size="sm" variant="ghost" onClick={() => handleViewReport(report)}>
                                                                <Eye className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="pending" className="mt-4">
                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Equipment</TableHead>
                                            <TableHead>Serial Number</TableHead>
                                            <TableHead>Report Date</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredReports.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center py-8">
                                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                                        <AlertTriangle className="h-8 w-8 mb-2" />
                                                        <p>No pending reports found</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredReports.map((report) => (
                                                <TableRow key={report.id}>
                                                    <TableCell className="font-medium">{report.title}</TableCell>
                                                    <TableCell>{getEquipmentTypeLabel(report.equipmentType)}</TableCell>
                                                    <TableCell className="font-mono text-sm">{report.serialNumber}</TableCell>
                                                    <TableCell>{new Date(report.reportDate).toLocaleDateString("vi-VN")}</TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-1">
                                                            <Button size="sm" variant="ghost" onClick={() => handleViewReport(report)}>
                                                                <Eye className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="resolved" className="mt-4">
                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Equipment</TableHead>
                                            <TableHead>Serial Number</TableHead>
                                            <TableHead>Report Date</TableHead>
                                            <TableHead>Resolved Date</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredReports.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center py-8">
                                                    <div className="flex flex-col items-center justify-center text-gray-500">
                                                        <AlertTriangle className="h-8 w-8 mb-2" />
                                                        <p>No resolved reports found</p>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredReports.map((report) => (
                                                <TableRow key={report.id}>
                                                    <TableCell className="font-medium">{report.title}</TableCell>
                                                    <TableCell>{getEquipmentTypeLabel(report.equipmentType)}</TableCell>
                                                    <TableCell className="font-mono text-sm">{report.serialNumber}</TableCell>
                                                    <TableCell>{new Date(report.reportDate).toLocaleDateString("vi-VN")}</TableCell>
                                                    <TableCell>{new Date(report.updatedDate).toLocaleDateString("vi-VN")}</TableCell>
                                                    <TableCell>
                                                        <Button size="sm" variant="ghost" onClick={() => handleViewReport(report)}>
                                                            <Eye className="h-3 w-3" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* View Report Dialog */}
                {selectedReport && (
                    <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>{selectedReport.title}</DialogTitle>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    {getStatusBadge(selectedReport.status)}
                                    <span>Reported on {new Date(selectedReport.reportDate).toLocaleDateString("vi-VN")}</span>
                                </div>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Equipment Type</h4>
                                        <p className="text-gray-900 dark:text-white">{getEquipmentTypeLabel(selectedReport.equipmentType)}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Serial Number</h4>
                                        <p className="text-gray-900 dark:text-white font-mono">{selectedReport.serialNumber}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h4>
                                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-gray-900 dark:text-white">
                                        {selectedReport.description}
                                    </div>
                                </div>

                                {selectedReport.comments.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Updates</h4>
                                        <div className="space-y-3">
                                            {selectedReport.comments.map((comment: any, index: number) => (
                                                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="font-medium text-gray-900 dark:text-white">{comment.author}</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {new Date(comment.date).toLocaleString("vi-VN")}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                                    Close
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </DashboardLayout>

    )
}