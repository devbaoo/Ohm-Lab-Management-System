import DashboardLayout from "@/src/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Calendar, Users, Database, AlertTriangle, BarChart3 } from "lucide-react"

export default function HeadDashboardPage() {
  return (
    <DashboardLayout role="head">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the Head of Department dashboard for the Electronics Lab Management System.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lab Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">48</div>
              <p className="text-xs text-muted-foreground">+8 from last semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Equipment Items</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+15 new items added</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Incidents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">-2 from last week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Lab Usage Overview</CardTitle>
              <CardDescription>Lab usage statistics for the current semester</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                <BarChart3 className="h-16 w-16 text-muted" />
                <span className="ml-2 text-muted">Usage chart will be displayed here</span>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Next 5 scheduled lab sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { course: "Electronics 101", date: "May 16, 2025", time: "08:00 - 10:00", lecturer: "Dr. Smith" },
                  { course: "Digital Systems", date: "May 16, 2025", time: "13:00 - 15:00", lecturer: "Dr. Johnson" },
                  { course: "Microcontrollers", date: "May 17, 2025", time: "10:00 - 12:00", lecturer: "Dr. Williams" },
                  { course: "Circuit Design", date: "May 18, 2025", time: "08:00 - 10:00", lecturer: "Dr. Brown" },
                  { course: "Embedded Systems", date: "May 19, 2025", time: "15:00 - 17:00", lecturer: "Dr. Davis" },
                ].map((session, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{session.course}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.date} • {session.time}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">{session.lecturer}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Incidents</CardTitle>
              <CardDescription>Latest reported issues in the lab</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Oscilloscope #3 not calibrating properly",
                    date: "May 14, 2025",
                    status: "Under Investigation",
                  },
                  { title: "Power supply unit failure in Station 5", date: "May 13, 2025", status: "Pending Repair" },
                  { title: "Missing components from Component Box #12", date: "May 10, 2025", status: "Resolved" },
                ].map((incident, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{incident.title}</p>
                    <div className="flex justify-between">
                      <p className="text-xs text-muted-foreground">{incident.date}</p>
                      <p
                        className={`text-xs ${incident.status === "Resolved"
                            ? "text-green-500"
                            : incident.status === "Pending Repair"
                              ? "text-amber-500"
                              : "text-blue-500"
                          }`}
                      >
                        {incident.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Equipment Status</CardTitle>
              <CardDescription>Overview of lab equipment status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Operational</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">230</span>
                    <span className="ml-1 text-xs text-muted-foreground">(94%)</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "94%" }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Under Maintenance</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">10</span>
                    <span className="ml-1 text-xs text-muted-foreground">(4%)</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-amber-500" style={{ width: "4%" }}></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Out of Order</span>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">5</span>
                    <span className="ml-1 text-xs text-muted-foreground">(2%)</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-red-500" style={{ width: "2%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lecturer Performance</CardTitle>
              <CardDescription>Based on student feedback and lab results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Dr. Smith", rating: 4.8, students: 45 },
                  { name: "Dr. Johnson", rating: 4.6, students: 38 },
                  { name: "Dr. Williams", rating: 4.9, students: 42 },
                  { name: "Dr. Brown", rating: 4.5, students: 36 },
                  { name: "Dr. Davis", rating: 4.7, students: 40 },
                ].map((lecturer, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{lecturer.name}</p>
                      <p className="text-xs text-muted-foreground">{lecturer.students} students</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{lecturer.rating}</span>
                      <span className="ml-1 text-xs text-yellow-500">★</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
