"use client"

import DashboardLayout from "@/src/components/dashboard-layout"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Search, Plus, AlertTriangle, EllipsisVertical, Filter } from "lucide-react"
import { useState } from "react"

export default function EquipmentPage() {
    const [showBorrowDialog, setShowBorrowDialog] = useState(false)
    const [showReportDialog, setShowReportDialog] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")

    const kitTemplates = [
        {
            id: 1,
            name: "Basic Electronics Kit",
            quantity: 10,
            description: "Contains resistors, capacitors, and basic ICs for introductory circuits",
            status: "available",
        },
        {
            id: 2,
            name: "Advanced Measurement Kit",
            quantity: 5,
            description: "Includes oscilloscope, multimeter, and function generator",
            status: "available",
        },
        {
            id: 3,
            name: "Soldering Workstation Kit",
            quantity: 3,
            description: "Hakko soldering station with assorted tips and solder",
            status: "unavailable",
        },
        {
            id: 4,
            name: "Digital Logic Kit",
            quantity: 8,
            description: "Logic analyzer and microcontroller boards for digital experiments",
            status: "available",
        },
    ]

    const kits = [
        {
            id: 1,
            name: "Electronics Lab Kit 01",
            kitTemplate: "Basic Electronics Kit",
            createdDate: "2025-04-15",
            status: "available",
        },
        {
            id: 2,
            name: "Measurement Lab Kit 01",
            kitTemplate: "Advanced Measurement Kit",
            createdDate: "2025-03-20",
            status: "available",
        },
        {
            id: 3,
            name: "Soldering Kit 01",
            kitTemplate: "Soldering Workstation Kit",
            createdDate: "2025-02-10",
            status: "unavailable",
        },
        {
            id: 4,
            name: "Digital Lab Kit 01",
            kitTemplate: "Digital Logic Kit",
            createdDate: "2025-05-01",
            status: "available",
        },
    ]

    const accessories = [
        {
            id: 1,
            name: "Resistor Pack 1K",
            description: "1K ohm resistors, 1/4W, 5% tolerance",
            valueCode: "R1K-14W",
            case: "Storage Box A1",
            initialQuantity: 100,
            currentQuantity: 85,
            status: "available",
        },
        {
            id: 2,
            name: "Capacitor 10uF",
            description: "10uF ceramic capacitors",
            valueCode: "C10UF-50V",
            case: "Storage Box B2",
            initialQuantity: 50,
            currentQuantity: 30,
            status: "available",
        },
        {
            id: 3,
            name: "BNC Cable",
            description: "BNC to BNC cable, 1m length",
            valueCode: "BNC-1M",
            case: "Cable Rack C3",
            initialQuantity: 20,
            currentQuantity: 5,
            status: "unavailable",
        },
        {
            id: 4,
            name: "Solder Wire",
            description: "Lead-free solder wire, 0.8mm",
            valueCode: "SW-0.8MM",
            case: "Storage Box D4",
            initialQuantity: 10,
            currentQuantity: 2,
            status: "unavailable",
        },
    ]

    const filteredKitTemplates = kitTemplates.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || item.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const filteredKits = kits.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.kitTemplate.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || item.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const filteredAccessories = accessories.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || item.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "available":
                return <Badge className="bg-green-500 hover:bg-green-600">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
            case "unavailable":
                return <Badge className="bg-red-500 hover:bg-red-600">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <DashboardLayout role="head">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Head Accessory Management</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setShowReportDialog(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Kit
                        </Button>
                        <Button onClick={() => setShowBorrowDialog(true)} className="bg-orange-500 hover:bg-orange-600">
                            <Plus className="mr-2 h-4 w-4" />
                            New Accessory
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="kit-template" className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <TabsList>
                            <TabsTrigger value="kit-template">Kit Template</TabsTrigger>
                            <TabsTrigger value="kit">Kit</TabsTrigger>
                            <TabsTrigger value="accessory">Accessory</TabsTrigger>
                        </TabsList>

                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search..."
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
                                    <SelectItem value="unavailable">Unavailable</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <TabsContent value="kit-template">
                        <Card>
                            <CardHeader>
                                <CardTitle>Kit Templates</CardTitle>
                                <CardDescription>View and manage all lab kit templates</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-[1fr_100px_1fr_120px_100px] gap-2 p-4 font-medium border-b">
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            Name
                                        </div>
                                        <div className="text-center">Quantity</div>
                                        <div className="text-center">Description</div>
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            Status
                                        </div>
                                        <div>Actions</div>
                                    </div>

                                    {filteredKitTemplates.length === 0 ? (
                                        <div className="p-4 text-center text-muted-foreground">
                                            No kit templates found matching your filters.
                                        </div>
                                    ) : (
                                        filteredKitTemplates.map((item) => (
                                            <div
                                                key={item.id}
                                                className="grid grid-cols-[1fr_100px_1fr_120px_100px] gap-2 p-4 border-b last:border-0 items-center"
                                            >
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-sm text-center">{item.quantity}</div>
                                                <div className="text-sm">{item.description}</div>
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

                    <TabsContent value="kit">
                        <Card>
                            <CardHeader>
                                <CardTitle>Kits</CardTitle>
                                <CardDescription>Manage all lab kits</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-[1fr_1fr_150px_120px_100px] gap-2 p-4 font-medium border-b">
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            Name
                                        </div>
                                        <div>Kit Template</div>
                                        <div>Created Date</div>
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            Status
                                        </div>
                                        <div>Actions</div>
                                    </div>

                                    {filteredKits.length === 0 ? (
                                        <div className="p-4 text-center text-muted-foreground">
                                            No kits found matching your filters.
                                        </div>
                                    ) : (
                                        filteredKits.map((item) => (
                                            <div
                                                key={item.id}
                                                className="grid grid-cols-[1fr_1fr_150px_120px_100px] gap-2 p-4 border-b last:border-0 items-center"
                                            >
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-sm">{item.kitTemplate}</div>
                                                <div className="text-sm">{new Date(item.createdDate).toLocaleDateString()}</div>
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

                    <TabsContent value="accessory">
                        <Card>
                            <CardHeader>
                                <CardTitle>Accessories</CardTitle>
                                <CardDescription>View and manage all lab accessories</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-[1fr_1fr_150px_150px_100px_100px_120px_100px] gap-2 p-4 font-medium border-b">
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            Name
                                        </div>
                                        <div>Description</div>
                                        <div>Value/Code</div>
                                        <div>Case</div>
                                        <div>Initial Quantity</div>
                                        <div>Current Quantity</div>
                                        <div className="flex items-center gap-1 cursor-pointer">
                                            Status
                                        </div>
                                        <div>Actions</div>
                                    </div>

                                    {filteredAccessories.length === 0 ? (
                                        <div className="p-4 text-center text-muted-foreground">
                                            No accessories found matching your filters.
                                        </div>
                                    ) : (
                                        filteredAccessories.map((item) => (
                                            <div
                                                key={item.id}
                                                className="grid grid-cols-[1fr_1fr_150px_150px_100px_100px_120px_100px] gap-2 p-4 border-b last:border-0 items-center"
                                            >
                                                <div className="font-medium">{item.name}</div>
                                                <div className="text-sm">{item.description}</div>
                                                <div className="text-sm">{item.valueCode}</div>
                                                <div className="text-sm">{item.case}</div>
                                                <div className="text-sm">{item.initialQuantity}</div>
                                                <div className="text-sm">{item.currentQuantity}</div>
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

            <Dialog open={showBorrowDialog} onOpenChange={setShowBorrowDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Borrow Equipment</DialogTitle>
                        <DialogDescription>Select equipment to borrow for your lab sessions.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="equipment">Equipment</Label>
                            <Select>
                                <SelectTrigger id="equipment">
                                    <SelectValue placeholder="Select equipment" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="osc1">Oscilloscope - Tektronix TBS1052B</SelectItem>
                                    <SelectItem value="ps1">Power Supply - Keysight E36103A</SelectItem>
                                    <SelectItem value="la1">Logic Analyzer - Saleae Logic Pro 16</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="borrow-date">Borrow Date</Label>
                                <Input id="borrow-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="return-date">Return Date</Label>
                                <Input id="return-date" type="date" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="purpose">Purpose</Label>
                            <Select>
                                <SelectTrigger id="purpose">
                                    <SelectValue placeholder="Select purpose" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="class">Class Session</SelectItem>
                                    <SelectItem value="prep">Session Preparation</SelectItem>
                                    <SelectItem value="research">Research</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="notes">Additional Notes</Label>
                            <Input id="notes" placeholder="Any special requirements or notes" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowBorrowDialog(false)}>
                            Cancel
                        </Button>
                        <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowBorrowDialog(false)}>
                            Submit Request
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Report Equipment Issue</DialogTitle>
                        <DialogDescription>Report a problem with lab equipment.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="report-equipment">Equipment</Label>
                            <Select>
                                <SelectTrigger id="report-equipment">
                                    <SelectValue placeholder="Select equipment" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="osc1">Oscilloscope - Tektronix TBS1052B</SelectItem>
                                    <SelectItem value="dmm1">Digital Multimeter - Fluke 115</SelectItem>
                                    <SelectItem value="fg1">Function Generator - Rigol DG1022Z</SelectItem>
                                    <SelectItem value="ps1">Power Supply - Keysight E36103A</SelectItem>
                                    <SelectItem value="la1">Logic Analyzer - Saleae Logic Pro 16</SelectItem>
                                    <SelectItem value="ss1">Soldering Station - Hakko FX-888D</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="issue-type">Issue Type</Label>
                            <Select>
                                <SelectTrigger id="issue-type">
                                    <SelectValue placeholder="Select issue type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="not-working">Not Working</SelectItem>
                                    <SelectItem value="damaged">Physically Damaged</SelectItem>
                                    <SelectItem value="calibration">Calibration Issue</SelectItem>
                                    <SelectItem value="missing">Missing Components</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" placeholder="Describe the issue in detail" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="severity">Severity</Label>
                            <Select>
                                <SelectTrigger id="severity">
                                    <SelectValue placeholder="Select severity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low - Can still be used</SelectItem>
                                    <SelectItem value="medium">Medium - Limited functionality</SelectItem>
                                    <SelectItem value="high">High - Cannot be used</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowReportDialog(false)}>
                            Cancel
                        </Button>
                        <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowReportDialog(false)}>
                            Submit Report
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    )
}