"use client"

import { useState } from "react"

import { Plus, FileText, Clock, CheckCircle, Search, Filter, ArrowUpDown, Eye, Edit, Download } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import DashboardLayout from "@/src/components/dashboard-layout"
import { Button } from "@/src/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"

export default function AssignmentsPage() {
  const [showNewAssignmentDialog, setShowNewAssignmentDialog] = useState(false)
  const [showGradeDialog, setShowGradeDialog] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [courseFilter, setCourseFilter] = useState("all")

  const assignments = [
    {
      id: 1,
      title: "Lab 1: Basic Circuit Analysis",
      course: "Electronics 101",
      dueDate: "2025-05-20",
      status: "active",
      submissions: 22,
      totalStudents: 25,
      description: "Analyze and measure basic DC circuits with resistors in series and parallel configurations.",
    },
    {
      id: 2,
      title: "Lab 2: Diode Characteristics",
      course: "Electronics 101",
      dueDate: "2025-05-27",
      status: "active",
      submissions: 0,
      totalStudents: 25,
      description: "Measure and plot the I-V characteristics of different diodes.",
    },
    {
      id: 3,
      title: "Lab 1: Logic Gates",
      course: "Digital Systems",
      dueDate: "2025-05-22",
      status: "active",
      submissions: 18,
      totalStudents: 22,
      description: "Implement and verify the truth tables of basic logic gates using discrete components.",
    },
    {
      id: 4,
      title: "Lab 3: Operational Amplifiers",
      course: "Electronics 101",
      dueDate: "2025-06-03",
      status: "draft",
      submissions: 0,
      totalStudents: 25,
      description: "Design and analyze basic op-amp circuits including inverting and non-inverting amplifiers.",
    },
    {
      id: 5,
      title: "Lab 2: Flip-Flops and Counters",
      course: "Digital Systems",
      dueDate: "2025-05-29",
      status: "draft",
      submissions: 0,
      totalStudents: 22,
      description: "Implement and analyze various flip-flop circuits and counters.",
    },
    {
      id: 6,
      title: "Lab 1: Introduction to Arduino",
      course: "Microcontrollers",
      dueDate: "2025-05-25",
      status: "active",
      submissions: 15,
      totalStudents: 18,
      description: "Set up the Arduino development environment and implement basic I/O operations.",
    },
    {
      id: 7,
      title: "Lab 0: Lab Safety and Equipment",
      course: "Electronics 101",
      dueDate: "2025-05-10",
      status: "completed",
      submissions: 25,
      totalStudents: 25,
      description: "Introduction to lab safety procedures and basic measurement equipment.",
    },
  ]

  const submissions = [
    {
      id: 1,
      assignmentId: 1,
      studentName: "Alice Johnson",
      studentId: "SE12345",
      submittedDate: "2025-05-15",
      status: "graded",
      grade: 92,
      feedback: "Excellent work on the circuit analysis. Your measurements were very accurate.",
    },
    {
      id: 2,
      assignmentId: 1,
      studentName: "Bob Smith",
      studentId: "SE12346",
      submittedDate: "2025-05-16",
      status: "graded",
      grade: 85,
      feedback: "Good work, but your analysis of the parallel circuit could be more detailed.",
    },
    {
      id: 3,
      assignmentId: 1,
      studentName: "Charlie Brown",
      studentId: "SE12347",
      submittedDate: "2025-05-17",
      status: "submitted",
      grade: null,
      feedback: null,
    },
    {
      id: 4,
      assignmentId: 3,
      studentName: "Diana Prince",
      studentId: "SE12348",
      submittedDate: "2025-05-18",
      status: "graded",
      grade: 95,
      feedback: "Outstanding work on the truth tables and implementation.",
    },
    {
      id: 5,
      assignmentId: 3,
      studentName: "Edward Stark",
      studentId: "SE12349",
      submittedDate: "2025-05-18",
      status: "submitted",
      grade: null,
      feedback: null,
    },
    {
      id: 6,
      assignmentId: 6,
      studentName: "Fiona Green",
      studentId: "SE12350",
      submittedDate: "2025-05-19",
      status: "submitted",
      grade: null,
      feedback: null,
    },
    {
      id: 7,
      assignmentId: 7,
      studentName: "George Wilson",
      studentId: "SE12351",
      submittedDate: "2025-05-08",
      status: "graded",
      grade: 100,
      feedback: "Perfect understanding of lab safety procedures.",
    },
  ]

  const filteredAssignments = assignments.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesCourse = courseFilter === "all" || item.course === courseFilter

    return matchesSearch && matchesStatus && matchesCourse
  })

  const getStatusBadge = (status:string) => {
    switch (status) {
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

  const getSubmissionStatusBadge = (status:string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-amber-500 hover:bg-amber-600">Needs Grading</Badge>
      case "graded":
        return <Badge className="bg-green-500 hover:bg-green-600">Graded</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <DashboardLayout role="lecturer">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
            <p className="text-muted-foreground">Create, manage, and grade lab assignments</p>
          </div>
          <Button onClick={() => setShowNewAssignmentDialog(true)} className="bg-orange-500 hover:bg-orange-600">
            <Plus className="mr-2 h-4 w-4" />
            New Assignment
          </Button>
        </div>

        <Tabs defaultValue="assignments" className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <TabsList>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-8 w-full sm:w-[200px] md:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-[150px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Course</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="Electronics 101">Electronics 101</SelectItem>
                  <SelectItem value="Digital Systems">Digital Systems</SelectItem>
                  <SelectItem value="Microcontrollers">Microcontrollers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>Lab Assignments</CardTitle>
                <CardDescription>Manage your lab assignments for all courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-[1fr_150px_150px_100px_120px] gap-2 p-4 font-medium border-b">
                    <div className="flex items-center gap-1 cursor-pointer">
                      Assignment <ArrowUpDown className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                      Course <ArrowUpDown className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                      Due Date <ArrowUpDown className="h-4 w-4" />
                    </div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>

                  {filteredAssignments.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No assignments found matching your filters.
                    </div>
                  ) : (
                    filteredAssignments.map((item) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[1fr_150px_150px_100px_120px] gap-2 p-4 border-b last:border-0 items-center"
                      >
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-md">{item.description}</div>
                        </div>
                        <div className="text-sm">{item.course}</div>
                        <div className="text-sm flex items-center">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          {new Date(item.dueDate).toLocaleDateString()}
                        </div>
                        <div>{getStatusBadge(item.status)}</div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>Student Submissions</CardTitle>
                <CardDescription>Review and grade student lab submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-[1fr_1fr_150px_120px_120px] gap-2 p-4 font-medium border-b">
                    <div>Student</div>
                    <div>Assignment</div>
                    <div className="flex items-center gap-1 cursor-pointer">
                      Submitted <ArrowUpDown className="h-4 w-4" />
                    </div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>

                  {submissions.filter((sub) => {
                    // Filter submissions based on assignment filters
                    const assignment = assignments.find((a) => a.id === sub.assignmentId)
                    if (!assignment) return false

                    const matchesSearch =
                      sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      assignment.title.toLowerCase().includes(searchQuery.toLowerCase())

                    const matchesCourse = courseFilter === "all" || assignment.course === courseFilter

                    // For submissions tab, we'll interpret status filter differently
                    const matchesStatus =
                      statusFilter === "all" ||
                      (statusFilter === "active" && sub.status === "submitted") ||
                      (statusFilter === "completed" && sub.status === "graded")

                    return matchesSearch && matchesCourse && matchesStatus
                  }).length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No submissions found matching your filters.
                    </div>
                  ) : (
                    submissions
                      .filter((sub) => {
                        const assignment = assignments.find((a) => a.id === sub.assignmentId)
                        if (!assignment) return false

                        const matchesSearch =
                          sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          assignment.title.toLowerCase().includes(searchQuery.toLowerCase())

                        const matchesCourse = courseFilter === "all" || assignment.course === courseFilter

                        const matchesStatus =
                          statusFilter === "all" ||
                          (statusFilter === "active" && sub.status === "submitted") ||
                          (statusFilter === "completed" && sub.status === "graded")

                        return matchesSearch && matchesCourse && matchesStatus
                      })
                      .map((submission) => {
                        const assignment = assignments.find((a) => a.id === submission.assignmentId)
                        return (
                          <div
                            key={submission.id}
                            className="grid grid-cols-[1fr_1fr_150px_120px_120px] gap-2 p-4 border-b last:border-0 items-center"
                          >
                            <div>
                              <div className="font-medium">{submission.studentName}</div>
                              <div className="text-sm text-muted-foreground">{submission.studentId}</div>
                            </div>
                            <div className="text-sm">{assignment?.title}</div>
                            <div className="text-sm">{new Date(submission.submittedDate).toLocaleDateString()}</div>
                            <div>{getSubmissionStatusBadge(submission.status)}</div>
                            <div className="flex gap-2">
                              <Button size="icon" variant="ghost">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setShowGradeDialog(true)}
                                disabled={submission.status === "graded"}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )
                      })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showNewAssignmentDialog} onOpenChange={setShowNewAssignmentDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
            <DialogDescription>Create a new lab assignment for your students.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Assignment Title</Label>
              <Input id="title" placeholder="e.g., Lab 3: Operational Amplifiers" />
            </div>
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
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe the lab assignment..." rows={3} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea id="instructions" placeholder="Detailed instructions for students..." rows={5} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="equipment">Required Equipment</Label>
              <Input id="equipment" placeholder="List required equipment and components" />
            </div>
            <div className="grid gap-2">
              <Label>Attachments</Label>
              <div className="flex items-center justify-center border-2 border-dashed rounded-md p-6">
                <div className="text-center">
                  <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                  <div className="mt-2">
                    <Button variant="secondary" size="sm">
                      Upload Files
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">PDF, DOCX, or ZIP up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewAssignmentDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowNewAssignmentDialog(false)}>
              Create Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showGradeDialog} onOpenChange={setShowGradeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
            <DialogDescription>Provide a grade and feedback for the student submission.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="rounded-md bg-muted p-4">
              <div className="font-medium">Lab 1: Basic Circuit Analysis</div>
              <div className="mt-1 text-sm">
                <span className="font-medium">Student:</span> Charlie Brown (SE12347)
              </div>
              <div className="mt-1 text-sm">
                <span className="font-medium">Submitted:</span> May 17, 2025
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="grade">Grade</Label>
                <Input id="grade" type="number" min="0" max="100" placeholder="0-100" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="graded">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="graded">Graded</SelectItem>
                    <SelectItem value="incomplete">Incomplete</SelectItem>
                    <SelectItem value="resubmit">Needs Resubmission</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="feedback">Feedback</Label>
              <Textarea id="feedback" placeholder="Provide feedback to the student..." rows={5} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowGradeDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowGradeDialog(false)}>
              Submit Grade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
