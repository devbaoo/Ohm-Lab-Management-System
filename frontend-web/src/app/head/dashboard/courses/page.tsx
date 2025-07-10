"use client"

import { useState, useEffect, useCallback } from "react"
import { Edit, Trash2 } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import DashboardLayout from "@/src/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card"
import { getSubjects } from "@/src/services/courseServices"
import CreateCourse from "@/src/components/head/courses/CreateCourse"
import { Button } from "@/src/components/ui/button"
import DeleteCourse from "@/src/components/head/courses/DeleteCourse"
import EditCourse from "@/src/components/head/courses/EditCourse"

interface Subject {
    subjectId: number
    subjectName: string
    subjectCode: string
    subjectDescription: string
    subjectStatus: string
}

export default function CoursesPage() {
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchSubjects = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await getSubjects()
            console.log("Full API response:", response.pageData)
            if (response) {
                setSubjects(response.pageData)
            }

        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || "Failed to fetch subjects"
            setError(errorMessage)
            console.error("Error fetching subjects:", err)
            setSubjects([])
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSubjects()
    }, [fetchSubjects])

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case "active":
                return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
            case "draft":
                return <Badge className="bg-gray-500 hover:bg-gray-600">Draft</Badge>
            case "completed":
                return <Badge className="bg-blue-500 hover:bg-blue-600">Completed</Badge>
            default:
                return <Badge>{status}</Badge>
        }
    }

    return (
        <DashboardLayout role="head">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <CreateCourse onSubjectCreated={fetchSubjects} />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Subjects Management</CardTitle>
                        <CardDescription>View and manage all available subjects</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="p-4 text-center text-muted-foreground">
                                Loading subjects...
                            </div>
                        ) : error ? (
                            <div className="p-4 text-center text-red-500">
                                {error}
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <div className="grid grid-cols-[1fr_150px_1fr_150px_100px] gap-2 p-4 font-medium border-b">
                                    <div>Subject Name</div>
                                    <div>Subject Code</div>
                                    <div>Description</div>
                                    <div>Status</div>
                                    <div>Actions</div>
                                </div>
                                {subjects.length === 0 ? (
                                    <div className="p-4 text-center text-muted-foreground">
                                        No subjects found.
                                    </div>
                                ) : (
                                    subjects.map((subject) => (
                                        <div
                                            key={subject.subjectId}
                                            className="grid grid-cols-[1fr_150px_1fr_150px_100px] gap-2 p-4 border-b last:border-0 items-center"
                                        >
                                            <div>{subject.subjectName}</div>
                                            <div>{subject.subjectCode}</div>
                                            <div>{subject.subjectDescription}</div>
                                            <div>{getStatusBadge(subject.subjectStatus)}</div>
                                            <div className="flex gap-2">
                                                <EditCourse
                                                    subjectId={subject.subjectId}
                                                    subjectName={subject.subjectName}
                                                    subjectDescription={subject.subjectDescription}
                                                    subjectStatus={subject.subjectStatus}
                                                    onSubjectUpdated={fetchSubjects}
                                                />
                                                <DeleteCourse
                                                    subjectId={subject.subjectId}
                                                    subjectName={subject.subjectName}
                                                    onSubjectDeleted={fetchSubjects}
                                                />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    )
}