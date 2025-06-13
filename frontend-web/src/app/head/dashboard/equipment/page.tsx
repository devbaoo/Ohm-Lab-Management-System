"use client"

import DashboardLayout from "@/src/components/dashboard-layout"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Search, Plus, AlertTriangle, Clock, ArrowUpDown, Filter, EllipsisVertical } from "lucide-react"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

export default function EquipmentPage() {
    const [showBorrowDialog, setShowBorrowDialog] = useState(false)
    const [showReportDialog, setShowReportDialog] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [categoryFilter, setCategoryFilter] = useState("all")

    const equipmentTypes = [
        {
            equipmentId: 1,
            name: "Measurement",
            description: "Devices for measuring electrical signals",
            quantity: 3,
            createDate: "2023-01-15",
            status: "Available",
        },
        {
            equipmentId: 2,
            name: "Signal Generation",
            description: "Devices for generating signals",
            quantity: 1,
            createDate: "2023-02-10",
            status: "Maintenance",
        },
        {
            equipmentId: 3,
            name: "Power",
            description: "Power supply units",
            quantity: 1,
            createDate: "2023-03-05",
            status: "Available",
        },
        {
            equipmentId: 4,
            name: "Digital",
            description: "Digital analysis tools",
            quantity: 1,
            createDate: "2023-01-20",
            status: "Available",
        },
        {
            equipmentId: 5,
            name: "Tools",
            description: "Hand tools for lab use",
            quantity: 1,
            createDate: "2023-04-01",
            status: "In Use",
        },
    ]

    const equipmentItems = [
        {
            id: 1,
            name: "Oscilloscope",
            numberSerial: "OSC-2023-001",
            description: "High-precision oscilloscope",
            status: "available",
            location: "Lab 1, Cabinet A",
            category: "Measurement",
        },
        {
            id: 2,
            name: "Digital Multimeter",
            numberSerial: "DMM-2023-012",
            description: "Multimeter for electrical measurements",
            status: "in-use",
            location: "Lab 2, Cabinet B",
            borrowedBy: "Dr. Johnson",
            borrowedUntil: "2025-05-20",
            category: "Measurement",
        },
        {
            id: 3,
            name: "Function Generator",
            numberSerial: "FG-2023-005",
            description: "Signal generator with variable frequency",
            status: "maintenance",
            location: "Maintenance Room",
            issue: "Unstable output voltage",
            category: "Signal Generation",
        },
        {
            id: 4,
            name: "Power Supply",
            numberSerial: "PS-2023-008",
            description: "Adjustable power supply unit",
            status: "available",
            location: "Lab 1, Cabinet C",
            category: "Power",
        },
        {
            id: 5,
            name: "Logic Analyzer",
            numberSerial: "LA-2023-003",
            description: "Digital signal analysis tool",
            status: "available",
            location: "Lab 2, Cabinet A",
            category: "Digital",
        },
        {
            id: 6,
            name: "Soldering Station",
            numberSerial: "SS-2023-010",
            description: "Soldering tool for circuit assembly",
            status: "in-use",
            location: "Lab 1, Workbench 3",
            borrowedBy: "Dr. Smith",
            borrowedUntil: "2025-05-18",
            category: "Tools",
        },
        {
            id: 7,
            name: "Oscilloscope",
            numberSerial: "OSC-2023-002",
            description: "Backup oscilloscope unit",
            status: "out-of-order",
            location: "Maintenance Room",
            issue: "Display not working",
            reportedBy: "Dr. Williams",
            reportedOn: "2025-05-10",
            category: "Measurement",
        },
    ]

    const filteredEquipment = equipmentItems.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.numberSerial.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = statusFilter === "all" || item.status === statusFilter
        const matchesCategory = categoryFilter === "all" || equipmentTypes.some(type => type.name.toLowerCase() === categoryFilter.toLowerCase() && equipmentItems.some(eq => eq.name === item.name && equipmentTypes.find(t => t.equipmentId === eq.id)?.name === type.name))

        return matchesSearch && matchesStatus && matchesCategory
    })

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "available":
                return <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
            case "in-use":
                return <Badge className="bg-blue-500 hover:bg-blue-600">In Use</Badge>
            case "maintenance":
                return <Badge className="bg-amber-500 hover:bg-amber-600">Maintenance</Badge>
            case "out-of-order":
                return <Badge className="bg-red-500 hover:bg-red-600">Out of Order</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    const getEquipmentCategory = (name: string): string => {
        const item = equipmentItems.find(item => item.name === name);
        return item ? item.category : "Unknown";
    };

    return (
        <DashboardLayout role="head">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Head Equipment Management</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setShowReportDialog(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Category
                        </Button>
                        <Button onClick={() => setShowBorrowDialog(true)} className="bg-orange-500 hover:bg-orange-600">
                            <Plus className="mr-2 h-4 w-4" />
                            New Equipment
                        </Button>
                    </div>
                </div>
                <Tabs defaultValue="category" className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <TabsList>
                            <TabsTrigger value="category">Category</TabsTrigger>
                            <TabsTrigger value="equipment">Equipment</TabsTrigger>
                        </TabsList>

                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search equipment..."
                                    className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[130px]">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        <span>Status</span>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="available">Available</SelectItem>
                                    <SelectItem value="in-use">In Use</SelectItem>
                                    <SelectItem value="maintenance">Maintenance</SelectItem>
                                    <SelectItem value="out-of-order">Out of Order</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-[130px]">
                                    <div className="flex items-center gap-2">
                                        <Filter className="h-4 w-4" />
                                        <span>Category</span>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {equipmentTypes.map((type) => (
                                        <SelectItem key={type.equipmentId} value={type.name}>
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <TabsContent value="category">
                        <Card>
                            <CardHeader>
                                <CardTitle>Equipment Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-[1fr_100px_150px_120px_80px] gap-2 p-4 font-medium border-b">
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            Name
                                        </div>
                                        <div>Quantity</div>
                                        <div>Create Date</div>
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            Status
                                        </div>
                                        <div>Actions</div>
                                    </div>

                                    {equipmentTypes.length === 0 ? (
                                        <div className="p-4 text-center text-muted-foreground">
                                            No equipment types found.
                                        </div>
                                    ) : (
                                        equipmentTypes.map((type) => (
                                            <div
                                                key={type.equipmentId}
                                                className="grid grid-cols-[1fr_100px_150px_120px_80px] gap-2 p-4 border-b last:border-0 items-center"
                                            >
                                                <div className="font-medium">{type.name}</div>
                                                <div>{type.quantity}</div>
                                                <div>{new Date(type.createDate).toLocaleDateString()}</div>
                                                <div>{getStatusBadge(type.status)}</div>
                                                <div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <EllipsisVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuItem onClick={() => alert(`Edit ${type.name}`)}>
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => alert(`Delete ${type.name}`)}>
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="equipment">
                        <Card>
                            <CardHeader>
                                <CardTitle>All Equipment</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-[1fr_1fr_120px_120px_80px] gap-2 p-4 font-medium border-b">
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            Name
                                        </div>
                                        <div>Serial Number</div>
                                        <div>Category</div>
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            Status
                                        </div>
                                        <div>Actions</div>
                                    </div>

                                    {filteredEquipment.length === 0 ? (
                                        <div className="p-4 text-center text-muted-foreground">
                                            No equipment found matching your filters.
                                        </div>
                                    ) : (
                                        filteredEquipment.map((item) => (
                                            <div
                                                key={item.id}
                                                className="grid grid-cols-[1fr_1fr_120px_120px_80px] gap-2 p-4 border-b last:border-0 items-center"
                                            >
                                                <div>
                                                    <div className="font-medium">{item.name}</div>
                                                </div>
                                                <div className="text-sm">{item.numberSerial}</div>
                                                <div className="text-sm">{item.category}</div>
                                                <div>{getStatusBadge(item.status)}</div>
                                                <div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon">
                                                                <EllipsisVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuItem onClick={() => alert(`Edit ${item.name}`)}>
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => alert(`Delete ${item.name}`)}>
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}
