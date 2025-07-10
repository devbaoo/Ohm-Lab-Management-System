"use client"

import { useState, useMemo } from "react"
import { Wrench, Search, Package, Calendar, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Badge } from "@/src/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import DashboardLayout from "@/src/components/dashboard-layout"

// Sample equipment data
const equipmentData = [
  {
    id: 1,
    name: "Oscilloscope",
    type: "Measurement",
    status: "available",
    lab: "Lab A-301",
    quantity: 5,
    lastMaintenance: "2024-10-01",
    createdDate: "2023-05-10",
  },
  {
    id: 2,
    name: "Soldering Station",
    type: "Tool",
    status: "in-use",
    lab: "Lab B-205",
    quantity: 3,
    lastMaintenance: "2024-09-15",
    createdDate: "2023-06-12",
  },
  {
    id: 3,
    name: "Multimeter",
    type: "Measurement",
    status: "available",
    lab: "Lab C-102",
    quantity: 10,
    lastMaintenance: "2024-08-20",
    createdDate: "2023-07-01",
  },
  {
    id: 4,
    name: "Breadboard",
    type: "Component",
    status: "in-use",
    lab: "Lab A-302",
    quantity: 20,
    lastMaintenance: "2024-07-10",
    createdDate: "2023-08-05",
  },
  {
    id: 5,
    name: "Power Supply",
    type: "Power",
    status: "maintenance",
    lab: "Lab D-101",
    quantity: 4,
    lastMaintenance: "2024-11-01",
    createdDate: "2023-09-15",
  },
]

const equipmentTypes = [
  { value: "all", label: "All Types" },
  { value: "Measurement", label: "Measurement" },
  { value: "Tool", label: "Tool" },
  { value: "Component", label: "Component" },
  { value: "Power", label: "Power" },
]

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "available", label: "Available" },
  { value: "in-use", label: "In Use" },
  { value: "maintenance", label: "Maintenance" },
]

export default function LecturerEquipmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredEquipment = useMemo(() => {
    return equipmentData.filter((equipment) => {
      const matchesSearch =
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.lab.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = selectedType === "all" || equipment.type === selectedType
      const matchesStatus = selectedStatus === "all" || equipment.status === selectedStatus

      return matchesSearch && matchesType && matchesStatus
    })
  }, [searchTerm, selectedType, selectedStatus])

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "available":
        return "default"
      case "in-use":
        return "secondary"
      case "maintenance":
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
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Lab</TableHead>
              <TableHead>Last Maintenance</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipment.map((equipment) => (
              <TableRow key={equipment.id}>
                <TableCell className="font-medium">{equipment.name}</TableCell>
                <TableCell className="text-orange-500">{equipment.type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3 text-gray-500" />
                    {equipment.quantity}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(equipment.status)}>{equipment.status}</Badge>
                </TableCell>
                <TableCell>{equipment.lab}</TableCell>
                <TableCell>
                  {new Date(equipment.lastMaintenance).toLocaleDateString("vi-VN")}
                </TableCell>
                <TableCell>{new Date(equipment.createdDate).toLocaleDateString("vi-VN")}</TableCell>
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lab Equipment</h1>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Equipment
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Wrench className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Equipment</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {equipmentData.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Package className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Available Equipment</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {equipmentData.filter((e) => e.status === "available").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Units</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {equipmentData.reduce((sum, e) => sum + e.quantity, 0)}
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Under Maintenance</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {equipmentData.filter((e) => e.status === "maintenance").length}
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
                placeholder="Search by equipment name or lab..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {equipmentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
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
            Showing {filteredEquipment.length} of {equipmentData.length} equipment
          </p>
        </div>

        {/* Equipment Display */}
        {filteredEquipment.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Wrench className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No equipment found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search criteria or add new equipment.
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