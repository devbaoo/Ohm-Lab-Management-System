"use client"
import DashboardLayout from "@/src/components/dashboard-layout"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Search, EllipsisVertical } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { searchEquipment, getEquipmentById } from "@/src/services/equipmentServices"
import CreateEquipment from "@/src/components/head/equipment/CreateEquipment"
import { QRCodeCanvas } from "qrcode.react"

interface Equipment {
    equipmentId: number;
    equipmentName: string;
    equipmentCode: string;
    equipmentNumberSerial: string;
    equipmentStatus: string;
    qrCode?: string;
}

export default function EquipmentPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [equipmentItems, setEquipmentItems] = useState<Equipment[]>([])
    const [pageNum, setPageNum] = useState(1)
    const [pageSize] = useState(10)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [selectedQrCode, setSelectedQrCode] = useState<string | null>(null)

    const fetchEquipment = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await searchEquipment({
                pageNum,
                pageSize,
                keyWord: searchQuery,
                status: "",
            })
            setEquipmentItems(response.pageData)
            console.log(">>>>> ",response.pageData)
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to fetch equipment"
            setError(errorMessage)
            console.error("Error fetching equipment:", err)
            setEquipmentItems([])
        } finally {
            setIsLoading(false)
        }
    }, [searchQuery, pageNum])

    useEffect(() => {
        fetchEquipment()
    }, [fetchEquipment])

    const generateQrCode = async (equipmentId: number) => {
        const equipment = await getEquipmentById(equipmentId.toString())
        console.log(">>>> eq: ",equipment)
        console.log("Equipment ID:", equipment.equipmentId)

    }

    const getStatusBadge = (status: string) => {
        switch (status?.toLowerCase()) {
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

    return (
        <DashboardLayout role="head">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Head Equipment Management</h1>
                    </div>
                    <div className="flex gap-2">
                        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-orange-500 hover:bg-orange-600">
                                    New Equipment
                                </Button>
                            </DialogTrigger>
                            <CreateEquipment
                                open={isCreateModalOpen}
                                onClose={() => setIsCreateModalOpen(false)}
                                onCreate={() => {
                                    setIsCreateModalOpen(false)
                                    fetchEquipment()
                                }}
                            />
                        </Dialog>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search equipment..."
                                    className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        setPageNum(1)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <Card>
                        <div className="grid grid-cols-[1fr_1fr_1fr_120px_120px_80px] gap-2 p-4 font-medium border-b">
                            <div>Name</div>
                            <div>Code</div>
                            <div>Serial Number</div>
                            <div>Status</div>
                            <div>QR Code</div>
                            <div>Actions</div>
                        </div>

                        {isLoading ? (
                            <div className="p-4 text-center text-muted-foreground">
                                Loading equipment...
                            </div>
                        ) : error ? (
                            <div className="p-4 text-center text-red-500">
                                {error}
                            </div>
                        ) : equipmentItems.length === 0 ? (
                            <div className="p-4 text-center text-muted-foreground">
                                No equipment found matching your filters.
                            </div>
                        ) : (
                            equipmentItems.map((item: Equipment, index: number) => (
                                <div
                                    key={item.equipmentId ?? `fallback-${index}`}
                                    className="grid grid-cols-[1fr_1fr_1fr_120px_120px_80px] gap-2 p-4 border-b last:border-0 items-center"
                                >
                                    <div>
                                        <div className="font-medium">{item.equipmentName}</div>
                                    </div>
                                    <div className="text-sm">{item.equipmentCode}</div>
                                    <div className="text-sm">{item.equipmentNumberSerial}</div>
                                    <div>{getStatusBadge(item.equipmentStatus)}</div>
                                    <div>
                                        {item.qrCode ? (
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="link" onClick={() => setSelectedQrCode(item.qrCode!)}>
                                                        View QR
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>QR Code for {item.equipmentName}</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="flex justify-center p-4">
                                                        <QRCodeCanvas value={selectedQrCode || ''} size={256} />
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        ) : (
                                            <span className="text-muted-foreground">No QR</span>
                                        )}
                                    </div>
                                    <div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <EllipsisVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => alert(`Edit ${item.equipmentName}`)}>
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => alert(`Delete ${item.equipmentName}`)}>
                                                    Delete
                                                </DropdownMenuItem>
                                                {!item.qrCode && (
                                                    <DropdownMenuItem onClick={() => generateQrCode(item.equipmentId)}>
                                                        Generate QR Codeee
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            ))
                        )}
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    )
}