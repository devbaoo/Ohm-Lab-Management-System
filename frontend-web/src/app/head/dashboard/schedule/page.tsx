"use client"

import { useState } from "react"
import { CalendarDays, Clock, Plus, Users, CheckCircle2, XCircle, Edit, Trash2, Calendar } from "lucide-react"
import DashboardLayout from "@/src/components/dashboard-layout"
import { Button } from "@/src/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Calendar as CalendarComponent } from "@/src/components/ui/calendar"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Badge } from "@/src/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog"

interface Semester {
  id: number
  name: string
  startDate: string
  endDate: string
  status: "active" | "upcoming" | "completed"
  description?: string
}

interface Week {
  id: number
  semesterId: number
  weekNumber: number
  startDate: string
  endDate: string
  description?: string
}

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showNewSessionDialog, setShowNewSessionDialog] = useState(false)
  const [showNewSemesterDialog, setShowNewSemesterDialog] = useState(false)
  const [showNewWeekDialog, setShowNewWeekDialog] = useState(false)
  const [showEditSemesterDialog, setShowEditSemesterDialog] = useState(false)
  const [showEditWeekDialog, setShowEditWeekDialog] = useState(false)
  const [showDeleteSemesterDialog, setShowDeleteSemesterDialog] = useState(false)
  const [showDeleteWeekDialog, setShowDeleteWeekDialog] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState<Semester | null>(null)
  const [selectedWeek, setSelectedWeek] = useState<Week | null>(null)

  // Mock data for semesters
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: 1,
      name: "Spring 2025",
      startDate: "2025-01-15",
      endDate: "2025-05-30",
      status: "active",
      description: "Spring semester 2025",
    },
    {
      id: 2,
      name: "Summer 2025",
      startDate: "2025-06-01",
      endDate: "2025-08-15",
      status: "upcoming",
      description: "Summer semester 2025",
    },
    {
      id: 3,
      name: "Fall 2024",
      startDate: "2024-09-01",
      endDate: "2024-12-20",
      status: "completed",
      description: "Fall semester 2024",
    },
  ])

  // Mock data for weeks
  const [weeks, setWeeks] = useState<Week[]>([
    {
      id: 1,
      semesterId: 1,
      weekNumber: 1,
      startDate: "2025-01-15",
      endDate: "2025-01-21",
      description: "Week 1 - Course Introduction",
    },
    {
      id: 2,
      semesterId: 1,
      weekNumber: 2,
      startDate: "2025-01-22",
      endDate: "2025-01-28",
      description: "Week 2 - Basic Electronics",
    },
    {
      id: 3,
      semesterId: 1,
      weekNumber: 3,
      startDate: "2025-01-29",
      endDate: "2025-02-04",
      description: "Week 3 - Circuit Analysis",
    },
    {
      id: 4,
      semesterId: 2,
      weekNumber: 1,
      startDate: "2025-06-01",
      endDate: "2025-06-07",
      description: "Week 1 - Summer Intensive",
    },
    {
      id: 5,
      semesterId: 2,
      weekNumber: 2,
      startDate: "2025-06-08",
      endDate: "2025-06-14",
      description: "Week 2 - Advanced Topics",
    },
  ])

  const getSemesterName = (semesterId: number) => {
    return semesters.find((s) => s.id === semesterId)?.name || "Unknown Semester"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
      case "upcoming":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-gray-500 hover:bg-gray-600">Completed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleEditSemester = (semester: Semester) => {
    setSelectedSemester(semester)
    setShowEditSemesterDialog(true)
  }

  const handleDeleteSemester = (semester: Semester) => {
    setSelectedSemester(semester)
    setShowDeleteSemesterDialog(true)
  }

  const handleEditWeek = (week: Week) => {
    setSelectedWeek(week)
    setShowEditWeekDialog(true)
  }

  const handleDeleteWeek = (week: Week) => {
    setSelectedWeek(week)
    setShowDeleteWeekDialog(true)
  }

  const confirmDeleteSemester = () => {
    if (selectedSemester) {
      setSemesters(semesters.filter((s) => s.id !== selectedSemester.id))
      setWeeks(weeks.filter((w) => w.semesterId !== selectedSemester.id))
      setShowDeleteSemesterDialog(false)
      setSelectedSemester(null)
    }
  }

  const confirmDeleteWeek = () => {
    if (selectedWeek) {
      setWeeks(weeks.filter((w) => w.id !== selectedWeek.id))
      setShowDeleteWeekDialog(false)
      setSelectedWeek(null)
    }
  }

  return (
    <DashboardLayout role="head">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lab Schedule Management</h1>
            <p className="text-muted-foreground">Manage semesters, weeks, and lab session schedules</p>
          </div>
          <Button onClick={() => setShowNewSessionDialog(true)} className="bg-orange-500 hover:bg-orange-600">
            <Plus className="mr-2 h-4 w-4" />
            New Session
          </Button>
        </div>

        <Tabs defaultValue="calendar" className="space-y-4">
          <TabsList>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="all-sessions">All Sessions</TabsTrigger>
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="semesters">Semesters</TabsTrigger>
            <TabsTrigger value="weeks">Weeks</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[300px_1fr]">
              <Card>
                <CardContent className="p-4">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="border rounded-md p-3"
                  />
                  <div className="mt-4 space-y-2">
                    <Label>Filter by Course</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        <SelectItem value="elec101">Electronics 101</SelectItem>
                        <SelectItem value="digsys">Digital Systems</SelectItem>
                        <SelectItem value="micro">Microcontrollers</SelectItem>
                        <SelectItem value="circuit">Circuit Design</SelectItem>
                        <SelectItem value="embed">Embedded Systems</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Label>Filter by Lecturer</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select lecturer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Lecturers</SelectItem>
                        <SelectItem value="smith">Dr. Smith</SelectItem>
                        <SelectItem value="johnson">Dr. Johnson</SelectItem>
                        <SelectItem value="williams">Dr. Williams</SelectItem>
                        <SelectItem value="brown">Dr. Brown</SelectItem>
                        <SelectItem value="davis">Dr. Davis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {date?.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                  <CardDescription>Scheduled lab sessions for the selected date</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        course: "Electronics 101",
                        time: "07:00 - 9:15",
                        lecturer: "Dr. Smith",
                        room: "Lab 1",
                        students: 25,
                        status: "approved",
                      },
                      {
                        id: 2,
                        course: "Digital Systems",
                        time: "9:30 - 11:45",
                        lecturer: "Dr. Johnson",
                        room: "Lab 2",
                        students: 22,
                        status: "approved",
                      },
                      {
                        id: 3,
                        course: "Microcontrollers",
                        time: "12:30 - 14:45",
                        lecturer: "Dr. Williams",
                        room: "Lab 1",
                        students: 18,
                        status: "pending",
                      },
                    ].map((session) => (
                      <div key={session.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <p className="font-medium">{session.course}</p>
                            {session.status === "pending" && (
                              <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                                Pending Approval
                              </span>
                            )}
                            {session.status === "approved" && (
                              <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                Approved
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            {session.time}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="mr-1 h-4 w-4" />
                            {session.students} students
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{session.room}</p>
                          <p className="text-sm text-muted-foreground">{session.lecturer}</p>
                          {session.status === "pending" && (
                            <div className="mt-2 flex justify-end gap-2">
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                                <XCircle className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="all-sessions">
            <Card>
              <CardHeader>
                <CardTitle>All Scheduled Sessions</CardTitle>
                <CardDescription>View and manage all upcoming lab sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      course: "Electronics 101",
                      date: "May 16, 2025",
                      time: "07:00 - 09:15",
                      lecturer: "Dr. Smith",
                      room: "Lab 1",
                      students: 25,
                      status: "approved",
                    },
                    {
                      id: 2,
                      course: "Digital Systems",
                      date: "May 16, 2025",
                      time: "9:30 - 11:45",
                      lecturer: "Dr. Johnson",
                      room: "Lab 2",
                      students: 22,
                      status: "approved",
                    },
                    {
                      id: 3,
                      course: "Microcontrollers",
                      date: "May 16, 2025",
                      time: "12:30 - 14:45",
                      lecturer: "Dr. Williams",
                      room: "Lab 1",
                      students: 18,
                      status: "pending",
                    },
                    {
                      id: 4,
                      course: "Circuit Design",
                      date: "May 17, 2025",
                      time: "15:00 - 17:15",
                      lecturer: "Dr. Brown",
                      room: "Lab 1",
                      students: 20,
                      status: "approved",
                    },
                    {
                      id: 5,
                      course: "Embedded Systems",
                      date: "May 17, 2025",
                      time: "12:30 - 14:45",
                      lecturer: "Dr. Davis",
                      room: "Lab 2",
                      students: 15,
                      status: "pending",
                    },
                  ].map((session) => (
                    <div key={session.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <p className="font-medium">{session.course}</p>
                          {session.status === "pending" && (
                            <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                              Pending Approval
                            </span>
                          )}
                          {session.status === "approved" && (
                            <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                              Approved
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays className="mr-1 h-4 w-4" />
                          {session.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          {session.time}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{session.room}</p>
                        <p className="text-sm text-muted-foreground">{session.lecturer}</p>
                        <p className="text-sm text-muted-foreground">{session.students} students</p>
                        {session.status === "pending" && (
                          <div className="mt-2 flex justify-end gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                              <XCircle className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>Lab sessions waiting for your approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 3,
                      course: "Microcontrollers",
                      date: "May 16, 2025",
                      time: "12:30 - 14:45",
                      lecturer: "Dr. Williams",
                      room: "Lab 1",
                      students: 18,
                      requestedOn: "May 10, 2025",
                    },
                    {
                      id: 5,
                      course: "Embedded Systems",
                      date: "May 17, 2025",
                      time: "09:00 - 11:45",
                      lecturer: "Dr. Davis",
                      room: "Lab 2",
                      students: 15,
                      requestedOn: "May 11, 2025",
                    },
                    {
                      id: 7,
                      course: "Electronics 101",
                      date: "May 20, 2025",
                      time: "07:00 - 09:15",
                      lecturer: "Dr. Smith",
                      room: "Lab 1",
                      students: 25,
                      requestedOn: "May 12, 2025",
                    },
                  ].map((session) => (
                    <div key={session.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{session.course}</p>
                          <div className="mt-1 flex items-center text-sm text-muted-foreground">
                            <CalendarDays className="mr-1 h-4 w-4" />
                            {session.date}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            {session.time}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{session.room}</p>
                          <p className="text-sm text-muted-foreground">{session.lecturer}</p>
                          <p className="text-sm text-muted-foreground">{session.students} students</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Requested on: {session.requestedOn}</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 bg-transparent"
                          >
                            Reject
                          </Button>
                          <Button size="sm" className="bg-green-500 hover:bg-green-600">
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Semesters Tab */}
          <TabsContent value="semesters">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Semester Management</CardTitle>
                    <CardDescription>Create and manage academic semesters</CardDescription>
                  </div>
                  <Button onClick={() => setShowNewSemesterDialog(true)} className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="mr-2 h-4 w-4" />
                    New Semester
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {semesters.map((semester) => (
                    <div key={semester.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{semester.name}</p>
                          {getStatusBadge(semester.status)}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <CalendarDays className="mr-1 h-4 w-4" />
                          {new Date(semester.startDate).toLocaleDateString()} -{" "}
                          {new Date(semester.endDate).toLocaleDateString()}
                        </div>
                        {semester.description && (
                          <p className="text-sm text-muted-foreground">{semester.description}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditSemester(semester)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteSemester(semester)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Weeks Tab */}
          <TabsContent value="weeks">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Week Management</CardTitle>
                    <CardDescription>Create and manage academic weeks within semesters</CardDescription>
                  </div>
                  <Button onClick={() => setShowNewWeekDialog(true)} className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="mr-2 h-4 w-4" />
                    New Week
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeks.map((week) => (
                    <div key={week.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Week {week.weekNumber}</p>
                          <Badge variant="outline">{getSemesterName(week.semesterId)}</Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(week.startDate).toLocaleDateString()} -{" "}
                          {new Date(week.endDate).toLocaleDateString()}
                        </div>
                        {week.description && <p className="text-sm text-muted-foreground">{week.description}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditWeek(week)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteWeek(week)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Session Dialog */}
      <Dialog open={showNewSessionDialog} onOpenChange={setShowNewSessionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule New Lab Session</DialogTitle>
            <DialogDescription>
              Create a new lab session for a course. The session will be pending until approved.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="course">Course</Label>
              <Select>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elec101">Electronics 101</SelectItem>
                  <SelectItem value="digsys">Digital Systems</SelectItem>
                  <SelectItem value="micro">Microcontrollers</SelectItem>
                  <SelectItem value="circuit">Circuit Design</SelectItem>
                  <SelectItem value="embed">Embedded Systems</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lecturer">Lecturer</Label>
              <Select>
                <SelectTrigger id="lecturer">
                  <SelectValue placeholder="Select lecturer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smith">Dr. Smith</SelectItem>
                  <SelectItem value="johnson">Dr. Johnson</SelectItem>
                  <SelectItem value="williams">Dr. Williams</SelectItem>
                  <SelectItem value="brown">Dr. Brown</SelectItem>
                  <SelectItem value="davis">Dr. Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Select>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slot1">07:00 - 09:15</SelectItem>
                    <SelectItem value="slot2">09:30 - 11:45</SelectItem>
                    <SelectItem value="slot3">12:30 - 14:45</SelectItem>
                    <SelectItem value="slot4">15:00 - 17:15</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="lab">Lab Room</Label>
                <Select>
                  <SelectTrigger id="lab">
                    <SelectValue placeholder="Select lab" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lab1">Lab 1</SelectItem>
                    <SelectItem value="lab2">Lab 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="students">Number of Students</Label>
                <Input id="students" type="number" min="1" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Input id="notes" placeholder="Any special requirements or notes" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewSessionDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowNewSessionDialog(false)}>
              Schedule Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Semester Dialog */}
      <Dialog open={showNewSemesterDialog} onOpenChange={setShowNewSemesterDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Semester</DialogTitle>
            <DialogDescription>Add a new academic semester to the system.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="semester-name">Semester Name</Label>
              <Input id="semester-name" placeholder="e.g., Spring 2025" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input id="start-date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input id="end-date" type="date" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="semester-status">Status</Label>
              <Select>
                <SelectTrigger id="semester-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="semester-description">Description</Label>
              <Textarea id="semester-description" placeholder="Optional description for the semester" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewSemesterDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowNewSemesterDialog(false)}>
              Create Semester
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Semester Dialog */}
      <Dialog open={showEditSemesterDialog} onOpenChange={setShowEditSemesterDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Semester</DialogTitle>
            <DialogDescription>Update semester information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-semester-name">Semester Name</Label>
              <Input id="edit-semester-name" defaultValue={selectedSemester?.name} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-start-date">Start Date</Label>
                <Input id="edit-start-date" type="date" defaultValue={selectedSemester?.startDate} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-end-date">End Date</Label>
                <Input id="edit-end-date" type="date" defaultValue={selectedSemester?.endDate} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-semester-status">Status</Label>
              <Select defaultValue={selectedSemester?.status}>
                <SelectTrigger id="edit-semester-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-semester-description">Description</Label>
              <Textarea id="edit-semester-description" defaultValue={selectedSemester?.description} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditSemesterDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowEditSemesterDialog(false)}>
              Update Semester
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Week Dialog */}
      <Dialog open={showNewWeekDialog} onOpenChange={setShowNewWeekDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Week</DialogTitle>
            <DialogDescription>Add a new academic week to a semester.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="week-semester">Semester</Label>
              <Select>
                <SelectTrigger id="week-semester">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((semester) => (
                    <SelectItem key={semester.id} value={semester.id.toString()}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="week-number">Week Number</Label>
              <Input id="week-number" type="number" min="1" placeholder="e.g., 1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="week-start-date">Start Date</Label>
                <Input id="week-start-date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="week-end-date">End Date</Label>
                <Input id="week-end-date" type="date" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="week-description">Description</Label>
              <Textarea id="week-description" placeholder="Optional description for the week" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewWeekDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowNewWeekDialog(false)}>
              Create Week
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Week Dialog */}
      <Dialog open={showEditWeekDialog} onOpenChange={setShowEditWeekDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Week</DialogTitle>
            <DialogDescription>Update week information.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-week-semester">Semester</Label>
              <Select defaultValue={selectedWeek?.semesterId.toString()}>
                <SelectTrigger id="edit-week-semester">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((semester) => (
                    <SelectItem key={semester.id} value={semester.id.toString()}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-week-number">Week Number</Label>
              <Input id="edit-week-number" type="number" min="1" defaultValue={selectedWeek?.weekNumber} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-week-start-date">Start Date</Label>
                <Input id="edit-week-start-date" type="date" defaultValue={selectedWeek?.startDate} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-week-end-date">End Date</Label>
                <Input id="edit-week-end-date" type="date" defaultValue={selectedWeek?.endDate} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-week-description">Description</Label>
              <Textarea id="edit-week-description" defaultValue={selectedWeek?.description} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditWeekDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowEditWeekDialog(false)}>
              Update Week
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Semester Confirmation Dialog */}
      <AlertDialog open={showDeleteSemesterDialog} onOpenChange={setShowDeleteSemesterDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Semester</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedSemester?.name}"? This action cannot be undone and will also
              delete all associated weeks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteSemester} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Week Confirmation Dialog */}
      <AlertDialog open={showDeleteWeekDialog} onOpenChange={setShowDeleteWeekDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Week</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "Week {selectedWeek?.weekNumber}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteWeek} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardLayout>
  )
}
