"use client"

import { useState } from "react"
import Link from "next/link"
import { CircuitBoard, ChevronLeft, ChevronRight, Plus, Calendar, Clock, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Badge } from "@/src/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/src/components/ui/dialog"
import DashboardLayout from "@/src/components/dashboard-layout"

const scheduleData = [
    {
        id: 1,
        title: "ELE301 - SE1705",
        status: "completed",
        date: "2025-06-04",
        time: "07:00 - 9:15",
        room: "Lab A-301",
        students: 25,
        color: "bg-green-500",
        class: "SE1705",
    },
    {
        id: 2,
        title: "ELE405 - SE1706",
        status: "completed",
        date: "2025-06-04",
        time: "9:30 - 11:45",
        room: "Lab A-301",
        students: 20,
        color: "bg-green-500",
        class: "SE1706",
    },
    {
        id: 3,
        title: "SDI101m - SE1707",
        status: "absent",
        date: "2025-06-04",
        time: "12:30 - 14:45",
        room: "Lab C-102",
        students: 30,
        color: "bg-red-500",
        class: "SE1707",
    },
    {
        id: 4,
        title: "ELE301 - SE1708",
        status: "completed",
        date: "2025-06-04",
        time: "15:00 - 17:15",
        room: "Lab A-301",
        students: 25,
        color: "bg-green-500",
        class: "SE1708",
    },
    {
        id: 5,
        title: "ELE405 - SE1709",
        status: "upcoming",
        date: "2025-06-12",
        time: "12:30 - 14:45",
        room: "Lab B-205",
        students: 20,
        color: "bg-gray-500",
        class: "SE1709",
    },
    {
        id: 6,
        title: "ELE301 - SE1710",
        status: "upcoming",
        date: "2025-06-18",
        time: "15:00 - 17:00",
        room: "Hall A",
        students: 50,
        color: "bg-gray-500",
        class: "SE1710",
    },
]

const courses = [
    { value: "all", label: "All courses" },
    { value: "ele301", label: "ELE301 - Digital Electronics" },
    { value: "ele405", label: "ELE405 - Advanced Circuit Design" },
    { value: "se1806", label: "SE1806 - Software Engineering" },
]

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

export default function LecturerSchedulePage() {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)) // June 2025
    const [viewMode, setViewMode] = useState<"month" | "week">("month")
    const [selectedCourse, setSelectedCourse] = useState("all")
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const today = new Date()
        const startOfWeek = new Date(today)
        startOfWeek.setDate(today.getDate() - today.getDay() + 1) // Monday
        return startOfWeek
    })
    const [selectedEvent, setSelectedEvent] = useState<typeof scheduleData[0] | null>(null)

    const weekDays: Date[] = (() => {
        const days: Date[] = []
        for (let i = 0; i < 7; i++) {
            const day = new Date(currentWeekStart)
            day.setDate(currentWeekStart.getDate() + i)
            days.push(day)
        }
        return days
    })()

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
        return firstDay === 0 ? 6 : firstDay - 1 // Convert Sunday (0) to 6, Monday (1) to 0, etc.
    }

    const navigatePeriod = (direction: "prev" | "next") => {
        if (viewMode === "month") {
            setCurrentDate((prev) => {
                const newDate = new Date(prev)
                if (direction === "prev") {
                    newDate.setMonth(prev.getMonth() - 1)
                } else {
                    newDate.setMonth(prev.getMonth() + 1)
                }
                return newDate
            })
        } else {
            setCurrentWeekStart((prev) => {
                const newWeekStart = new Date(prev)
                if (direction === "prev") {
                    newWeekStart.setDate(prev.getDate() - 7)
                } else {
                    newWeekStart.setDate(prev.getDate() + 7)
                }
                return newWeekStart
            })
        }
    }

    const getEventsForDate = (day: number) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
        return scheduleData.filter((event) => event.date === dateStr)
    }

    const renderCalendarGrid = () => {
        const daysInMonth = getDaysInMonth(currentDate)
        const firstDay = getFirstDayOfMonth(currentDate)
        const days = []

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-32 border border-gray-200 dark:border-gray-700"></div>)
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const events = getEventsForDate(day)
            const isToday =
                new Date().getDate() === day &&
                new Date().getMonth() === currentDate.getMonth() &&
                new Date().getFullYear() === currentDate.getFullYear()

            days.push(
                <div
                    key={day}
                    className="h-32 border border-gray-200 dark:border-gray-700 p-1 overflow-hidden hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                    <div
                        className={`text-sm font-medium mb-1 ${isToday ? "text-orange-500" : "text-gray-900 dark:text-gray-100"}`}
                    >
                        {isToday && (
                            <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                                {day}
                            </span>
                        )}
                        {!isToday && day}
                    </div>
                    <div className="space-y-1">
                        {events.slice(0, 2).map((event) => (
                            <div
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className={`text-xs p-1 rounded text-white truncate ${event.status === "completed" ? "bg-green-500" : event.status === "upcoming" ? "bg-gray-500" : "bg-red-500"} cursor-pointer hover:opacity-80`}
                                title={`${event.title} - ${event.time}`}
                            >
                                {event.title}
                            </div>
                        ))}
                        {events.length > 2 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400">+{events.length - 2} more</div>
                        )}
                    </div>
                </div>
            )
        }

        return days
    }

    const renderWeekView = () => {
        // Define the time slots
        const timeSlots = [
            { label: "Slot 1 (07:00 - 09:15)", start: "07:00" },
            { label: "Slot 2 (09:30 - 11:45)", start: "09:30" },
            { label: "Slot 3 (12:30 - 14:45)", start: "12:30" },
            { label: "Slot 4 (15:00 - 17:15)", start: "15:00" },
        ]

        return (
            <div className="grid grid-cols-8 gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                {/* Time column header */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</span>
                </div>

                {/* Day headers */}
                {weekDays.map((day, index) => (
                    <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-800 p-4 text-center border-r border-gray-200 dark:border-gray-700 last:border-r-0"
                    >
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {day.toLocaleDateString("en-US", { weekday: "short" })}
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{day.getDate()}</div>
                    </div>
                ))}

                {/* Time slots */}
                {timeSlots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="contents">
                        {/* Time label */}
                        <div className="p-2 text-sm text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700 border-t">
                            {slot.label}
                        </div>

                        {/* Day columns */}
                        {weekDays.map((day, dayIndex) => {
                            const dayEvents = scheduleData.filter((event) => {
                                const eventDate = new Date(event.date)
                                const eventStartTime = event.time.split(" - ")[0]
                                return (
                                    eventDate.toDateString() === day.toDateString() &&
                                    eventStartTime === slot.start
                                )
                            })

                            return (
                                <div
                                    key={dayIndex}
                                    className="p-1 h-24 border-r border-t border-gray-200 dark:border-gray-700 last:border-r-0"
                                >
                                    {dayEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            onClick={() => setSelectedEvent(event)}
                                            className={`${event.status === "completed" ? "bg-green-500" : event.status === "upcoming" ? "bg-gray-500" : "bg-red-500"} text-white text-xs p-1 rounded mb-1 truncate cursor-pointer hover:opacity-80`}
                                            title={`${event.title} - ${event.time}`}
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <DashboardLayout role="lecturer">
            <div className="min-h-screen p-4">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Schedule</h1>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 rounded-full bg-gray-500"></span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Upcoming</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Absent</span>
                                </div>
                            </div>
                        </div>
                        <Button className="bg-orange-500 hover:bg-orange-600">
                            <Plus className="h-4 w-4 mr-2" />
                            New Event
                        </Button>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex gap-2">
                        <Select value={viewMode} onValueChange={(value: "month" | "week") => setViewMode(value)}>
                            <SelectTrigger className="w-32">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="month">Month</SelectItem>
                                <SelectItem value="week">Week</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                            <SelectTrigger className="w-64">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {courses.map((course) => (
                                    <SelectItem key={course.value} value={course.value}>
                                        {course.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <Button variant="outline" size="sm" onClick={() => navigatePeriod("prev")}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white min-w-[120px] text-center">
                            {viewMode === "month"
                                ? `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                                : `${weekDays[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${weekDays[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                        </span>
                        <Button variant="outline" size="sm" onClick={() => navigatePeriod("next")}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Calendar */}
                {viewMode === "month" ? (
                    <Card>
                        <CardContent className="p-0">
                            {/* Calendar Header */}
                            <div className="grid grid-cols-7 bg-gray-50 dark:bg-gray-800">
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                                    <div
                                        key={day}
                                        className="p-4 text-center font-medium text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0"
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7">{renderCalendarGrid()}</div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardContent className="p-4">{renderWeekView()}</CardContent>
                    </Card>
                )}

                {/* Event Dialog */}
                <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
                    <DialogContent className="sm:max-w-[425px] bg-orange-50">
                        <DialogHeader>
                            <DialogTitle>{selectedEvent?.title}</DialogTitle>
                        </DialogHeader>
                        <div className="p-4 space-y-2 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{selectedEvent?.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{selectedEvent?.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                <span>{selectedEvent?.class}</span>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    )
}