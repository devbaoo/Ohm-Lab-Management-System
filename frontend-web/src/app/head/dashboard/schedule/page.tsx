"use client"

import { useState, useEffect, useCallback } from "react"
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
import { createSemester, getSemesters, updateSemester, deleteSemester, SemesterCreateUpdate } from "@/src/services/semesterServices"
import { createWeek, getWeeksBySemester, updateWeek, deleteWeek, WeekCreateUpdate } from "@/src/services/weekServices"

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

  // Replace mock data with API state
  const [semesters, setSemesters] = useState<Semester[]>([])
  const [semesterLoading, setSemesterLoading] = useState(false)
  const [semesterError, setSemesterError] = useState<string | null>(null)
  // Form state for create/edit
  const [semesterForm, setSemesterForm] = useState<SemesterCreateUpdate>({
    semesterName: "",
    semesterStartDate: "",
    semesterEndDate: "",
    semesterDescription: "",
    semesterStatus: "upcoming"
  })

  // State cho week
  const [weeks, setWeeks] = useState<Week[]>([])
  const [weekLoading, setWeekLoading] = useState(false)
  const [weekError, setWeekError] = useState<string | null>(null)
  const [weekForm, setWeekForm] = useState<WeekCreateUpdate>({
    semesterId: 0,
    weeksName: "",
    weeksStartDate: "",
    weeksEndDate: "",
    weeksDescription: "",
    weeksStatus: "Active"
  })
  const [weekDateError, setWeekDateError] = useState("")

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

  // Khi mở dialog tạo week, luôn set weekForm.semesterId = selectedSemesterId
  useEffect(() => {
    if (showNewWeekDialog && selectedSemesterId) {
      setWeekForm((prev) => ({ ...prev, semesterId: selectedSemesterId }));
    }
  }, [showNewWeekDialog, selectedSemesterId]);

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

  // Validate date logic before create/update
  function validateSemesterDates(start: string, end: string): string {
    if (!start || !end) return "Start date and end date are required.";
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "Invalid date format.";
    if (startDate >= endDate) return "Start date must be before end date.";
    return "";
  }

  // Create semester handler
  const handleCreateSemester = async () => {
    setSemesterLoading(true)
    setSemesterError(null)
    setDateError("");
    const err = validateSemesterDates(semesterForm.semesterStartDate, semesterForm.semesterEndDate);
    if (err) {
      setDateError(err);
      setSemesterLoading(false);
      return;
    }
    try {
      await createSemester(semesterForm)
      setShowNewSemesterDialog(false)
      setSemesterForm({
        semesterName: "",
        semesterStartDate: "",
        semesterEndDate: "",
        semesterDescription: "",
        semesterStatus: "upcoming"
      })
      fetchSemesters()
    } catch (err: any) {
      setSemesterError(err.response?.data?.message || err.message || "Failed to create semester")
    } finally {
      setSemesterLoading(false)
    }
  }

  // Edit semester dialog open handler
  const handleEditSemester = (semester: Semester) => {
    setSelectedSemester(semester)
    setSemesterForm({
      semesterName: semester.name,
      semesterStartDate: semester.startDate,
      semesterEndDate: semester.endDate,
      semesterDescription: semester.description || "",
      semesterStatus: semester.status
    })
    setShowEditSemesterDialog(true)
  }

  // Update semester handler
  const handleUpdateSemester = async () => {
    if (!selectedSemester) return
    setSemesterLoading(true)
    setSemesterError(null)
    setDateError("");
    const err = validateSemesterDates(semesterForm.semesterStartDate, semesterForm.semesterEndDate);
    if (err) {
      setDateError(err);
      setSemesterLoading(false);
      return;
    }
    try {
      await updateSemester(selectedSemester.id.toString(), semesterForm)
      setShowEditSemesterDialog(false)
      setSelectedSemester(null)
      fetchSemesters()
    } catch (err: any) {
      setSemesterError(err.response?.data?.message || err.message || "Failed to update semester")
    } finally {
      setSemesterLoading(false)
    }
  }

  // Delete semester handler
  const confirmDeleteSemester = async () => {
    if (selectedSemester) {
      setSemesterLoading(true)
      setSemesterError(null)
      try {
        await deleteSemester(selectedSemester.id.toString())
        setShowDeleteSemesterDialog(false)
        setSelectedSemester(null)
        fetchSemesters()
      } catch (err: any) {
        setSemesterError(err.response?.data?.message || err.message || "Failed to delete semester")
      } finally {
        setSemesterLoading(false)
      }
    }
  }

  // Validation ngày cho week
  function validateWeekDates(start: string, end: string): string {
    if (!start || !end) return "Start date and end date are required."
    const startDate = new Date(start)
    const endDate = new Date(end)
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "Invalid date format."
    if (startDate >= endDate) return "Start date must be before end date."
    return ""
  }

  // Tạo week
  const handleCreateWeek = async () => {
    setWeekLoading(true)
    setWeekError(null)
    setWeekDateError("")
    const err = validateWeekDates(weekForm.weeksStartDate, weekForm.weeksEndDate)
    if (err) {
      setWeekDateError(err)
      setWeekLoading(false)
      return
    }
    try {
      await createWeek(weekForm)
      setShowNewWeekDialog(false)
      setWeekForm({
        semesterId: 0,
        weeksName: "",
        weeksStartDate: "",
        weeksEndDate: "",
        weeksDescription: "",
        weeksStatus: "Active"
      })
      fetchAllWeeks() // Fetch all weeks after creating a new one
    } catch (err: any) {
      setWeekError(err.response?.data?.message || err.message || "Failed to create week")
    } finally {
      setWeekLoading(false)
    }
  }

  // Sửa week
  const handleEditWeek = (week: Week) => {
    setSelectedWeek(week)
    setWeekForm({
      semesterId: week.semesterId,
      weeksName: typeof week.weekNumber === 'string' ? week.weekNumber : `${week.weekNumber}`,
      weeksStartDate: toInputDateValue(week.startDate),
      weeksEndDate: toInputDateValue(week.endDate),
      weeksDescription: week.description || "",
      weeksStatus: "Active"
    })
    setShowEditWeekDialog(true)
  }
  const handleUpdateWeek = async () => {
    if (!selectedWeek) return
    setWeekLoading(true)
    setWeekError(null)
    setWeekDateError("")
    const err = validateWeekDates(weekForm.weeksStartDate, weekForm.weeksEndDate)
    if (err) {
      setWeekDateError(err)
      setWeekLoading(false)
      return
    }
    try {
      await updateWeek(selectedWeek.id.toString(), {
        semesterId: weekForm.semesterId,
        weeksName: weekForm.weeksName,
        weeksStartDate: weekForm.weeksStartDate,
        weeksEndDate: weekForm.weeksEndDate,
        weeksDescription: weekForm.weeksDescription,
        weeksStatus: weekForm.weeksStatus,
      })
      setShowEditWeekDialog(false)
      setSelectedWeek(null)
      fetchAllWeeks() // Fetch all weeks after updating a week
    } catch (err: any) {
      setWeekError(err.response?.data?.message || err.message || "Failed to update week")
    } finally {
      setWeekLoading(false)
    }
  }
  // Xoá week
  const handleDeleteWeek = (week: Week) => {
    setSelectedWeek(week)
    setShowDeleteWeekDialog(true)
  }
  const confirmDeleteWeek = async () => {
    if (!selectedWeek) return
    setWeekLoading(true)
    setWeekError(null)
    try {
      await deleteWeek(selectedWeek.id.toString())
      setShowDeleteWeekDialog(false)
      setSelectedWeek(null)
      fetchAllWeeks() // Fetch all weeks after deleting a week
    } catch (err: any) {
      setWeekError(err.response?.data?.message || err.message || "Failed to delete week")
    } finally {
      setWeekLoading(false)
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
                  <Button onClick={() => setShowNewSemesterDialog(true)} className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="mr-2 h-4 w-4" />
                    New Semester
                  </Button>
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
                          <Button size="sm" variant="outline" onClick={() => handleEditSemester(semester)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => { setSelectedSemester(semester); setShowDeleteSemesterDialog(true); }}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
                  <Button onClick={() => setShowNewWeekDialog(true)} className="bg-orange-500 hover:bg-orange-600">
                    <Plus className="mr-2 h-4 w-4" />
                    New Week
                  </Button>
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
                          <Button size="sm" variant="outline" onClick={() => handleEditWeek(week)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteWeek(week)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
              <Input
                id="semester-name"
                value={semesterForm.semesterName || ""}
                onChange={(e) => setSemesterForm({ ...semesterForm, semesterName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={toInputDateValue(semesterForm.semesterStartDate)}
                  onChange={(e) => setSemesterForm({ ...semesterForm, semesterStartDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={toInputDateValue(semesterForm.semesterEndDate)}
                  onChange={(e) => setSemesterForm({ ...semesterForm, semesterEndDate: e.target.value })}
                />
              </div>
            </div>
            {dateError && <div className="text-red-500 text-sm mt-1">{dateError}</div>}
            <div className="grid gap-2">
              <Label htmlFor="semester-status">Status</Label>
              <Select
                value={semesterForm.semesterStatus || ""}
                onValueChange={(value) => setSemesterForm({ ...semesterForm, semesterStatus: value })}
              >
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
              <Textarea
                id="semester-description"
                value={semesterForm.semesterDescription || ""}
                onChange={(e) => setSemesterForm({ ...semesterForm, semesterDescription: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewSemesterDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleCreateSemester} disabled={semesterLoading}>
              {semesterLoading ? "Creating..." : "Create Semester"}
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
              <Input
                id="edit-semester-name"
                value={semesterForm.semesterName || ""}
                onChange={(e) => setSemesterForm({ ...semesterForm, semesterName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-start-date">Start Date</Label>
                <Input
                  id="edit-start-date"
                  type="date"
                  value={toInputDateValue(semesterForm.semesterStartDate)}
                  onChange={(e) => setSemesterForm({ ...semesterForm, semesterStartDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-end-date">End Date</Label>
                <Input
                  id="edit-end-date"
                  type="date"
                  value={toInputDateValue(semesterForm.semesterEndDate)}
                  onChange={(e) => setSemesterForm({ ...semesterForm, semesterEndDate: e.target.value })}
                />
              </div>
            </div>
            {dateError && <div className="text-red-500 text-sm mt-1">{dateError}</div>}
            <div className="grid gap-2">
              <Label htmlFor="edit-semester-status">Status</Label>
              <Select
                value={semesterForm.semesterStatus || ""}
                onValueChange={(value) => setSemesterForm({ ...semesterForm, semesterStatus: value })}
              >
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
              <Textarea
                id="edit-semester-description"
                value={semesterForm.semesterDescription || ""}
                onChange={(e) => setSemesterForm({ ...semesterForm, semesterDescription: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditSemesterDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleUpdateSemester} disabled={semesterLoading}>
              {semesterLoading ? "Updating..." : "Update Semester"}
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
            {/* Semester select removed for create week, always use selectedSemesterId */}
            <div className="grid gap-2">
              <Label htmlFor="week-number">Week Number</Label>
              <Input
                id="week-number"
                type="number"
                min="1"
                placeholder="e.g., 1"
                value={weekForm.weeksName}
                onChange={(e) => setWeekForm({ ...weekForm, weeksName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="week-start-date">Start Date</Label>
                <Input
                  id="week-start-date"
                  type="date"
                  value={weekForm.weeksStartDate}
                  onChange={(e) => setWeekForm({ ...weekForm, weeksStartDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="week-end-date">End Date</Label>
                <Input
                  id="week-end-date"
                  type="date"
                  value={weekForm.weeksEndDate}
                  onChange={(e) => setWeekForm({ ...weekForm, weeksEndDate: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="week-status">Status</Label>
              <Select
                value={weekForm.weeksStatus}
                onValueChange={(value) => setWeekForm({ ...weekForm, weeksStatus: value })}
              >
                <SelectTrigger id="week-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="week-description">Description</Label>
              <Textarea
                id="week-description"
                placeholder="Optional description for the week"
                value={weekForm.weeksDescription}
                onChange={(e) => setWeekForm({ ...weekForm, weeksDescription: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewWeekDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleCreateWeek} disabled={weekLoading}>
              {weekLoading ? "Creating..." : "Create Week"}
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
            {/* Semester select removed for edit week */}
            <div className="grid gap-2">
              <Label htmlFor="edit-week-number">Week Number</Label>
              <Input id="edit-week-number" type="number" min="1" value={weekForm.weeksName} onChange={(e) => setWeekForm({ ...weekForm, weeksName: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-week-start-date">Start Date</Label>
                <Input id="edit-week-start-date" type="date" value={weekForm.weeksStartDate} onChange={(e) => setWeekForm({ ...weekForm, weeksStartDate: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-week-end-date">End Date</Label>
                <Input id="edit-week-end-date" type="date" value={weekForm.weeksEndDate} onChange={(e) => setWeekForm({ ...weekForm, weeksEndDate: e.target.value })} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-week-status">Status</Label>
              <Select
                value={weekForm.weeksStatus}
                onValueChange={(value) => setWeekForm({ ...weekForm, weeksStatus: value })}
              >
                <SelectTrigger id="edit-week-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-week-description">Description</Label>
              <Textarea id="edit-week-description" value={weekForm.weeksDescription} onChange={(e) => setWeekForm({ ...weekForm, weeksDescription: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditWeekDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleUpdateWeek} disabled={weekLoading}>
              {weekLoading ? "Updating..." : "Update Week"}
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
            <AlertDialogAction onClick={confirmDeleteSemester} className="bg-red-500 hover:bg-red-600" disabled={semesterLoading}>
              {semesterLoading ? "Deleting..." : "Delete"}
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
