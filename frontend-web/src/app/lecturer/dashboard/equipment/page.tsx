"use client"

import { useState, useMemo, useEffect } from "react"
import { Wrench, Search, Package, Calendar, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Badge } from "@/src/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import DashboardLayout from "@/src/components/dashboard-layout"
import { searchEquipment, EquipmentItem, EquipmentSearchResponse } from "@/src/services/equipmentServices"
import { useClientOnly } from "@/src/hooks/useClientOnly"
import CreateEquipment from "@/src/components/lecturer/equipment/CreateEquipment"
import EquipmentDetail from "@/src/components/lecturer/equipment/EquipmentDetail"
import EditEquipment from "@/src/components/lecturer/equipment/EditEquipment"
import DeleteEquipment from "@/src/components/lecturer/equipment/DeleteEquipment"


// Default API parameters as requested
const DEFAULT_SEARCH_PARAMS = {
  keyWord: "",
  pageNum: 1,
  pageSize: 10,
  status: ""
}

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "Available", label: "Available" },
  { value: "In-Use", label: "In Use" },
  { value: "Maintenance", label: "Maintenance" },
  { value: "Delete", label: "Deleted" },
]

export default function LecturerEquipmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [equipmentData, setEquipmentData] = useState<EquipmentItem[]>([])
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    size: 10,
    totalPage: 1,
    totalItem: 0
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null)
  const hasMounted = useClientOnly()

  const fetchEquipment = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Use default parameters with current values
      const searchParams = {
        keyWord: searchTerm || DEFAULT_SEARCH_PARAMS.keyWord,
        pageNum: pageInfo.page || DEFAULT_SEARCH_PARAMS.pageNum,
        pageSize: pageInfo.size || DEFAULT_SEARCH_PARAMS.pageSize,
        status: selectedStatus === "all" ? DEFAULT_SEARCH_PARAMS.status : selectedStatus
      }

      console.log('API Request Parameters:', searchParams)
      const response = await searchEquipment(searchParams)

      if (response && response.data) {
        setEquipmentData(response.data.pageData)
        setPageInfo(response.data.pageInfo)
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch equipment")
      console.error("Error fetching equipment:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (hasMounted) {
      fetchEquipment()
    }
  }, [pageInfo.page, pageInfo.size, hasMounted])

  const handleSearch = () => {
    if (hasMounted) {
      setPageInfo(prev => ({ ...prev, page: DEFAULT_SEARCH_PARAMS.pageNum })) // Reset to page 1 when searching
      fetchEquipment()
    }
  }

  const handleCreateSuccess = () => {
    fetchEquipment() // Refresh the list after successful creation
  }

  const handleViewDetail = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false)
    setSelectedEquipmentId(null)
  }

  const handleEditEquipment = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId)
    setIsEditModalOpen(true)
  }

  const handleCloseEdit = () => {
    setIsEditModalOpen(false)
    setSelectedEquipmentId(null)
  }

  const handleEditSuccess = () => {
    fetchEquipment() // Refresh the list after successful update
  }

  const handleDeleteEquipment = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId)
    setIsDeleteModalOpen(true)
  }

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false)
    setSelectedEquipmentId(null)
  }

  const handleDeleteSuccess = () => {
    fetchEquipment() // Refresh the list after successful deletion
  }

  const filteredEquipment = equipmentData

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Available":
        return "default"
      case "In-Use":
        return "secondary"
      case "Maintenance":
        return "outline"
      case "Delete":
        return "destructive"
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
              <TableHead>Code</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>QR Code</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-red-500">
                  Error: {error}
                </TableCell>
              </TableRow>
            ) : filteredEquipment.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No equipment found
                </TableCell>
              </TableRow>
            ) : (
              filteredEquipment.map((equipment) => (
                <TableRow key={equipment.equipmentId}>
                  <TableCell className="font-medium">
                    <button
                      onClick={() => handleViewDetail(equipment.equipmentId)}
                      className="text-left hover:text-orange-600 hover:underline transition-colors"
                    >
                      {equipment.equipmentName}
                    </button>
                  </TableCell>
                  <TableCell className="text-orange-500">{equipment.equipmentCode}</TableCell>
                  <TableCell>{equipment.equipmentNumberSerial}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(equipment.equipmentStatus)}>{equipment.equipmentStatus}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={equipment.equipmentDescription}>
                    {equipment.equipmentDescription}
                  </TableCell>
                  <TableCell>
                    {equipment.equipmentQr && equipment.equipmentQr !== "null" ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewDetail(equipment.equipmentId)}
                        title="View Details"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditEquipment(equipment.equipmentId)}
                        title="Edit"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteEquipment(equipment.equipmentId)}
                        title="Delete"
                      >
                        <Trash2 className="h-3 w-3" />
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
  )

  if (!hasMounted) {
    return (
      <DashboardLayout role="lecturer">
        <div className="min-h-screen p-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading...</div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="lecturer">
      <div className="min-h-screen p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lab Equipment</h1>
            </div>
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => setIsCreateModalOpen(true)}
            >
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
                    {pageInfo.totalItem}
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
                    {equipmentData.filter((e) => e.equipmentStatus === "Available").length}
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Current Page Items</p>
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
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Under Maintenance</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {equipmentData.filter((e) => e.equipmentStatus === "Maintenance").length}
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
                placeholder="Search by equipment name, code, or serial number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

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

            <Button onClick={handleSearch} disabled={isLoading}>
              Search
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredEquipment.length} of {pageInfo.totalItem} equipment (Page {pageInfo.page} of {pageInfo.totalPage})
          </p>
        </div>

        {/* Equipment Display */}
        {filteredEquipment.length === 0 && !isLoading ? (
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
          <>
            {renderTableView()}

            {/* Pagination */}
            {pageInfo.totalPage > 1 && (
              <div className="flex justify-center mt-6">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPageInfo(prev => ({ ...prev, page: Math.max(DEFAULT_SEARCH_PARAMS.pageNum, prev.page - 1) }))}
                    disabled={pageInfo.page <= DEFAULT_SEARCH_PARAMS.pageNum || isLoading}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, pageInfo.totalPage) }, (_, i) => {
                      const pageNum = i + DEFAULT_SEARCH_PARAMS.pageNum; // Start from 1
                      return (
                        <Button
                          key={pageNum}
                          variant={pageInfo.page === pageNum ? "default" : "outline"}
                          onClick={() => setPageInfo(prev => ({ ...prev, page: pageNum }))}
                          disabled={isLoading}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setPageInfo(prev => ({ ...prev, page: Math.min(prev.totalPage, prev.page + 1) }))}
                    disabled={pageInfo.page >= pageInfo.totalPage || isLoading}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Create Equipment Modal */}
        <CreateEquipment
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleCreateSuccess}
        />

        {/* Equipment Detail Modal */}
        <EquipmentDetail
          equipmentId={selectedEquipmentId}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetail}
          onEdit={handleEditEquipment}
          onDelete={handleDeleteEquipment}
        />

        {/* Edit Equipment Modal */}
        <EditEquipment
          equipmentId={selectedEquipmentId}
          isOpen={isEditModalOpen}
          onClose={handleCloseEdit}
          onSuccess={handleEditSuccess}
        />

        {/* Delete Equipment Modal */}
        <DeleteEquipment
          equipmentId={selectedEquipmentId}
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDelete}
          onSuccess={handleDeleteSuccess}
        />
      </div>
    </DashboardLayout>
  )
}