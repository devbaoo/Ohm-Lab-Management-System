"use client"

import { useState } from "react"

import { CalendarDays, Clock, Plus, Users, CheckCircle2, XCircle } from "lucide-react"
import DashboardLayout from "@/src/components/dashboard-layout"
import { Button } from "@/src/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Calendar } from "@/src/components/ui/calendar"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showNewSessionDialog, setShowNewSessionDialog] = useState(false)

  return (
    <DashboardLayout role="head">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Lab Schedule</h1>
            <p className="text-muted-foreground">Manage and approve lab session schedules</p>
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
          </TabsList>

          <TabsContent value="calendar" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-[300px_1fr]">
              <Card>
                <CardContent className="p-4">
                  <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-md p-3" />
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
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
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
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
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
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
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
        </Tabs>
      </div>

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
    </DashboardLayout>
  )
}
