"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Button } from "@/src/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import { getLabsBySubjectId } from "@/src/services/courseServices"
import CreateLab from "./CreateLab"
import DeleteLab from "./DeleteLab"
import EditLab from "./EditLab"

interface Lab {
    subjectId?: number
    labId?: string
    labName: string
    labRequest: string
    labTarget: string
    labStatus?: string
}

interface CourseLabProps {
    subjectId: number
}

const CourseLab: React.FC<CourseLabProps> = ({ subjectId }) => {
    const [labs, setLabs] = useState<Lab[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedLab, setSelectedLab] = useState<Lab | null>(null)

    const fetchLabs = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await getLabsBySubjectId(subjectId.toString())
            if (response) {
                setLabs(response.pageData)
            } else {
                throw new Error("Invalid API response: Expected an array in data.pageData field")
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to fetch labs"
            setError(errorMessage)
            console.error("Error fetching labs:", err)
            setLabs([])
        } finally {
            setIsLoading(false)
        }
    }, [subjectId])

    useEffect(() => {
        fetchLabs()
    }, [fetchLabs])

    const handleNewLab = () => {
        setIsModalOpen(true)
    }

    const handleLabCreated = async (newLab: Lab) => {
        await fetchLabs()
        setIsModalOpen(false)
    }

    const handleEditClick = (lab: Lab) => {
        setSelectedLab(lab)
        setIsEditModalOpen(true)
    }

    const handleLabUpdated = async (updatedLab: Lab) => {
        await fetchLabs()
        setIsEditModalOpen(false)
        setSelectedLab(null)
    }

    const handleDeleteClick = (lab: Lab) => {
        setSelectedLab(lab)
        setIsDeleteModalOpen(true)
    }

    const handleLabDeleted = async (labId: string) => {
        await fetchLabs()
        setIsDeleteModalOpen(false)
        setSelectedLab(null)
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Course Labs</CardTitle>
                    <Button onClick={handleNewLab} className="bg-primary text-primary-foreground hover:bg-primary/90">
                        New Lab
                    </Button>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="p-4 text-center text-muted-foreground">
                            Loading labs...
                        </div>
                    ) : error ? (
                        <div className="p-4 text-center text-red-500">
                            {error}
                        </div>
                    ) : labs.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                            No labs found for this course.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Request</TableHead>
                                        <TableHead>Target</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {labs.map((lab, index) => (
                                        <TableRow key={lab.labId || index}>
                                            <TableCell>{lab.labName}</TableCell>
                                            <TableCell>{lab.labRequest}</TableCell>
                                            <TableCell>{lab.labTarget}</TableCell>
                                            <TableCell>{lab.labStatus}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleEditClick(lab)}
                                                    >
                                                        <Edit className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-red-600 hover:text-red-700"
                                                        onClick={() => handleDeleteClick(lab)}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
            <CreateLab
                subjectId={subjectId}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onLabCreated={handleLabCreated}
            />
            {selectedLab && (
                <EditLab
                    labId={selectedLab.labId!}
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false)
                        setSelectedLab(null)
                    }}
                    onLabUpdated={handleLabUpdated}
                />
            )}
            {selectedLab && (
                <DeleteLab
                    labId={selectedLab.labId}
                    labName={selectedLab.labName}
                    isOpen={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false)
                        setSelectedLab(null)
                    }}
                    onLabDeleted={handleLabDeleted}
                />
            )}
        </div>
    )
}

export default CourseLab