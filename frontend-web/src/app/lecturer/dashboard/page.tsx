import DashboardLayout from "@/src/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Calendar, Users, ClipboardList, AlertTriangle } from "lucide-react"

export default function LecturerDashboardPage() {
  return (
    <DashboardLayout role="lecturer">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the Lecturer dashboard for the Electronics Lab Management System.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Classes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">+1 from last semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Next session in 2 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">5 need grading</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Reported Incidents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Requires your attention</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>My Schedule</CardTitle>
              <CardDescription>Your upcoming lab sessions for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    course: "Electronics 101",
                    date: "May 16, 2025",
                    time: "08:00 - 10:00",
                    room: "Lab 1",
                    students: 25,
                  },
                  {
                    course: "Digital Systems",
                    date: "May 18, 2025",
                    time: "13:00 - 15:00",
                    room: "Lab 2",
                    students: 22,
                  },
                  {
                    course: "Microcontrollers",
                    date: "May 20, 2025",
                    time: "10:00 - 12:00",
                    room: "Lab 1",
                    students: 18,
                  },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="space-y-1">
                      <p className="font-medium">{session.course}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.date} • {session.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{session.room}</p>
                      <p className="text-sm text-muted-foreground">{session.students} students</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Equipment Needed</CardTitle>
              <CardDescription>For your upcoming lab sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <p className="font-medium">Electronics 101 (May 16)</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Oscilloscopes</span>
                      <span className="font-medium">8x</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Digital Multimeters</span>
                      <span className="font-medium">12x</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Breadboards</span>
                      <span className="font-medium">25x</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Component Kits</span>
                      <span className="font-medium">25x</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="font-medium">Digital Systems (May 18)</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li className="flex items-center justify-between">
                      <span>Logic Analyzers</span>
                      <span className="font-medium">6x</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Digital ICs</span>
                      <span className="font-medium">22 sets</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Breadboards</span>
                      <span className="font-medium">22x</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Assignments to Grade</CardTitle>
              <CardDescription>Student submissions awaiting your review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Lab 1: Basic Circuit Analysis",
                    course: "Electronics 101",
                    submissions: 22,
                    due: "May 10, 2025",
                  },
                  {
                    title: "Lab 2: Diode Characteristics",
                    course: "Electronics 101",
                    submissions: 20,
                    due: "May 12, 2025",
                  },
                  { title: "Lab 1: Logic Gates", course: "Digital Systems", submissions: 18, due: "May 14, 2025" },
                ].map((assignment, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <p className="font-medium">{assignment.title}</p>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      <p className="text-sm">{assignment.submissions} submissions</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Due: {assignment.due}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
              <CardDescription>Issues reported in your lab sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950">
                  <p className="font-medium text-amber-800 dark:text-amber-200">
                    Oscilloscope #3 not calibrating properly
                  </p>
                  <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">Reported by: You • May 14, 2025</p>
                  <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">Status: Under Investigation</p>
                </div>

                <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950">
                  <p className="font-medium text-green-800 dark:text-green-200">
                    Missing components from Component Box #8
                  </p>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-300">Reported by: You • May 8, 2025</p>
                  <p className="mt-2 text-sm text-green-700 dark:text-green-300">
                    Status: Resolved • Components replaced
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
