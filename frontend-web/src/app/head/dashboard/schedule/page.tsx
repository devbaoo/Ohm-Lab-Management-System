"use client"

import { useState, useEffect, useCallback } from "react"
import { CalendarDays, Clock, Plus, Users, CheckCircle2, XCircle, Calendar } from "lucide-react"
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
import { getSemesters } from "@/src/services/semesterServices"
import { getWeeksBySemester } from "@/src/services/weekServices"
import CreateSemester from "@/src/components/head/semesters/CreateSemester"
import EditSemester from "@/src/components/head/semesters/EditSemester"
import DeleteSemester from "@/src/components/head/semesters/DeleteSemester"
import CreateWeek from "@/src/components/head/weeks/CreateWeek"
import EditWeek from "@/src/components/head/weeks/EditWeek"
import DeleteWeek from "@/src/components/head/weeks/DeleteWeek"

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
  status?: string
}

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Replace mock data with API state
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [semesterLoading, setSemesterLoading] = useState(false)
  const [semesterError, setSemesterError] = useState<string | null>(null)

  // State cho week
  const [weeks, setWeeks] = useState<Week[]>([])
  const [weekLoading, setWeekLoading] = useState(false)
  const [weekError, setWeekError] = useState<string | null>(null)

  // State for selected semester in Weeks tab
  const [selectedSemesterId, setSelectedSemesterId] = useState<number | null>(null);

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

  // Fetch semesters from API
  const fetchSemesters = useCallback(async () => {
    setSemesterLoading(true)
    setSemesterError(null)
    try {
      const response = await getSemesters()
      const mappedSemesters = (response.data || []).map((s: any) => ({
        id: s.semesterId,
        name: s.semesterName,
        startDate: s.semesterStartDate,
        endDate: s.semesterEndDate,
        description: s.semesterDescription,
        status: s.semesterStatus,
      }))
      setSemesters(mappedSemesters)
      console.log('Semesters:', mappedSemesters)
    } catch (err: any) {
      setSemesterError(err.response?.data?.message || err.message || "Failed to fetch semesters")
      setSemesters([])
    } finally {
      setSemesterLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSemesters()
  }, [fetchSemesters])

  // Fetch tất cả weeks của tất cả semester
  const fetchAllWeeks = useCallback(async () => {
    setWeekLoading(true)
    setWeekError(null)
    try {
      let allWeeks: Week[] = [];
      for (const semester of semesters) {
        const response = await getWeeksBySemester(semester.id.toString());
        let arr: any[] = [];
        if (Array.isArray(response)) {
          arr = response;
        } else if (response && Array.isArray(response.data)) {
          arr = response.data;
        }
        allWeeks = allWeeks.concat(
          arr.map((w: any) => ({
            id: w.weeksId,
            semesterId: w.semesterId,
            weekNumber: w.weeksName,
            startDate: w.weeksStartDate,
            endDate: w.weeksEndDate,
            description: w.weeksDescription,
            status: w.weeksStatus,
          }))
        );
      }
      allWeeks.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      setWeeks(allWeeks);
    } catch (err: any) {
      setWeekError(err.response?.data?.message || err.message || "Failed to fetch weeks");
      setWeeks([]);
    } finally {
      setWeekLoading(false);
    }
  }, [semesters]);

  // Fetch weeks for selected semester only
  const fetchWeeksForSemester = useCallback(async (semesterId: number) => {
    setWeekLoading(true)
    setWeekError(null)
    try {
      const response = await getWeeksBySemester(semesterId.toString());
      let arr: any[] = [];
      if (Array.isArray(response)) {
        arr = response;
      } else if (response && Array.isArray(response.data)) {
        arr = response.data;
      }
      const mappedWeeks = arr.map((w: any) => ({
        id: w.weeksId,
        semesterId: w.semesterId,
        weekNumber: w.weeksName,
        startDate: w.weeksStartDate,
        endDate: w.weeksEndDate,
        description: w.weeksDescription,
        status: w.weeksStatus,
      }));
      setWeeks(mappedWeeks);
    } catch (err: any) {
      setWeekError(err.response?.data?.message || err.message || "Failed to fetch weeks");
      setWeeks([]);
    } finally {
      setWeekLoading(false);
    }
  }, []);

  // Khi load xong semesters, set mặc định selectedSemesterId và fetch weeks
  useEffect(() => {
    if (semesters.length > 0) {
      if (!selectedSemesterId) {
        setSelectedSemesterId(semesters[0].id);
      } else {
        // Nếu selectedSemesterId không còn trong danh sách, reset
        if (!semesters.some(s => s.id === selectedSemesterId)) {
          setSelectedSemesterId(semesters[0].id);
        }
      }
    }
  }, [semesters]);

  // Khi selectedSemesterId thay đổi, fetch lại weeks
  useEffect(() => {
    if (selectedSemesterId) {
      fetchWeeksForSemester(selectedSemesterId);
    }
  }, [selectedSemesterId, fetchWeeksForSemester]);



  // Add state to store formatted date for client-only rendering
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");

  useEffect(() => {
    if (date) {
      setFormattedDate(
        date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
  }, [date]);

  // Callback functions for components
  const handleSemesterCreated = () => {
    fetchSemesters()
  }

  const handleSemesterUpdated = () => {
    fetchSemesters()
  }

  const handleSemesterDeleted = () => {
    fetchSemesters()
  }

  const handleWeekCreated = () => {
    if (selectedSemesterId) {
      fetchWeeksForSemester(selectedSemesterId)
    }
  }

  const handleWeekUpdated = () => {
    if (selectedSemesterId) {
      fetchWeeksForSemester(selectedSemesterId)
    }
  }

  const handleWeekDeleted = () => {
    if (selectedSemesterId) {
      fetchWeeksForSemester(selectedSemesterId)
    }
  }

  // Helper to format date string for display
  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "Invalid Date";
    return d.toLocaleDateString();
  }

  // Helper to convert ISO date string to yyyy-MM-dd for input value
  function toInputDateValue(dateStr: string | undefined) {
    if (!dateStr) return "";
    // Accept both '2025-01-01T00:00:00' and '2025-01-01'
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    // Pad month and day
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  return (
    <DashboardLayout role="head">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lab Schedule Management</h1>
            <p className="text-muted-foreground">Manage semesters, weeks, and lab session schedules</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
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
                    {/* Fix hydration mismatch: only render formattedDate on client */}
                    {formattedDate || ""}
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
                  <CreateSemester onSemesterCreated={handleSemesterCreated} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {semesterLoading ? (
                    <p>Loading semesters...</p>
                  ) : semesterError ? (
                    <p className="text-red-500">{semesterError}</p>
                  ) : semesters.length === 0 ? (
                    <p>No semesters found. Create a new one!</p>
                  ) : (
                    semesters.map((semester) => (
                      <div key={semester.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{semester.name}</p>
                            {getStatusBadge(semester.status)}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarDays className="mr-1 h-4 w-4" />
                            {/* Fix hydration mismatch for semester dates */}
                            <ClientOnlyDateRange start={semester.startDate} end={semester.endDate} />
                          </div>
                          {semester.description && (
                            <p className="text-sm text-muted-foreground">{semester.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <EditSemester
                            semesterId={semester.id}
                            semesterName={semester.name}
                            semesterStartDate={semester.startDate}
                            semesterEndDate={semester.endDate}
                            semesterDescription={semester.description || ""}
                            semesterStatus={semester.status}
                            onSemesterUpdated={handleSemesterUpdated}
                          />
                          <DeleteSemester
                            semesterId={semester.id}
                            semesterName={semester.name}
                            onSemesterDeleted={handleSemesterDeleted}
                          />
                        </div>
                      </div>
                    ))
                  )}
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
                  <CreateWeek onWeekCreated={handleWeekCreated} selectedSemesterId={selectedSemesterId || 0} />
                </div>
                {/* Select semester to filter weeks */}
                <div className="mt-4">
                  <Label htmlFor="weeks-semester-select">Semester</Label>
                  <Select
                    value={selectedSemesterId ? selectedSemesterId.toString() : ""}
                    onValueChange={(value) => setSelectedSemesterId(Number(value))}
                  >
                    <SelectTrigger id="weeks-semester-select">
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
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weekLoading ? (
                    <p>Loading weeks...</p>
                  ) : weekError ? (
                    <p className="text-red-500">{weekError}</p>
                  ) : weeks.length === 0 ? (
                    <p>No weeks found. Create a new one!</p>
                  ) : (
                    weeks.map((week) => (
                      <div key={week.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Week {week.weekNumber}</p>
                            <Badge variant="outline">{getSemesterName(week.semesterId)}</Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-4 w-4" />
                            {formatDate(week.startDate)} - {formatDate(week.endDate)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {week.description ? `Week ${week.weekNumber} - ${week.description}` : `Week ${week.weekNumber}`}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <EditWeek
                            weekId={week.id}
                            semesterId={week.semesterId}
                            weekNumber={typeof week.weekNumber === 'string' ? week.weekNumber : `${week.weekNumber}`}
                            startDate={week.startDate}
                            endDate={week.endDate}
                            description={week.description || ""}
                            status={week.status || "Active"}
                            onWeekUpdated={handleWeekUpdated}
                          />
                          <DeleteWeek
                            weekId={week.id}
                            weekNumber={typeof week.weekNumber === 'string' ? week.weekNumber : `${week.weekNumber}`}
                            onWeekDeleted={handleWeekDeleted}
                          />
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

// Helper component to render date range only on client
function ClientOnlyDateRange({ start, end }: { start: string; end: string }) {
  const [range, setRange] = useState("");
  useEffect(() => {
    if (start && end) {
      setRange(
        `${new Date(start).toLocaleDateString()} - ${new Date(end).toLocaleDateString()}`
      );
    }
  }, [start, end]);
  return <>{range}</>;
}
