"use client"

import { useState, useEffect, useCallback } from "react"
import DashboardLayout from "@/src/components/dashboard-layout"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/src/components/ui/card"
import { getSubjects } from "@/src/services/courseServices"
import CourseLab from "@/src/components/lecturer/lab/CourseLab"

interface Subject {
    subjectId: number
    subjectName: string
    subjectCode: string
}

export default function LecturerCoursesPage() {
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null)

    const fetchSubjects = useCallback(async () => {
        try {
            setIsLoading(true)
            const response = await getSubjects()
            if ((response)) {
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

    const handleCourseClick = (subjectId: number) => {
        setSelectedSubjectId(subjectId)
    }

    return (
        <DashboardLayout role="lecturer">
            <div className="space-y-6">
                <CardHeader>
                    <CardTitle>My Courses</CardTitle>
                    <CardDescription>View all assigned subjects</CardDescription>
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
                    ) : subjects.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                            No subjects found.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {subjects.map((subject) => (
                                <Card
                                    key={subject.subjectId}
                                    className="p-4 cursor-pointer hover:bg-gray-50"
                                    onClick={() => handleCourseClick(subject.subjectId)}
                                >
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium">{subject.subjectName}</h3>
                                        <p className="text-sm text-muted-foreground">{subject.subjectCode}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                    {selectedSubjectId && (
                        <div className="mt-6">
                            <CourseLab subjectId={selectedSubjectId} />
                        </div>
                    )}
                </CardContent>
            </div>
        </DashboardLayout>
    )
}