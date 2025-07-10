import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"

const courses = [
    { value: "ele301", label: "ELE301 - Digital Electronics" },
    { value: "ele405", label: "ELE405 - Advanced Circuit Design" },
    { value: "se1806", label: "SE1806 - Software Engineering" },
]

const rooms = [
    { value: "lab-a-301", label: "Lab A-301" },
    { value: "lab-b-205", label: "Lab B-205" },
    { value: "lab-c-102", label: "Lab C-102" },
    { value: "hall-a", label: "Hall A" },
]

const timeSlots = [
    { value: "07:00 - 09:15", label: "Slot 1 (07:00 - 09:15)" },
    { value: "09:30 - 11:45", label: "Slot 2 (09:30 - 11:45)" },
    { value: "12:30 - 14:45", label: "Slot 3 (12:30 - 14:45)" },
    { value: "15:00 - 17:15", label: "Slot 4 (15:00 - 17:15)" },
]

interface CreateLabBookingProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (booking: { date: string; time: string; course: string; room: string }) => void
}

export default function CreateLabBooking({ isOpen, onOpenChange, onSubmit }: CreateLabBookingProps) {
    const [newBooking, setNewBooking] = useState({
        date: "",
        time: "",
        course: "",
        room: "",
    })

    const handleSubmit = () => {
        onSubmit(newBooking)
        setNewBooking({ date: "", time: "", course: "", room: "" })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-orange-50">
                <DialogHeader>
                    <DialogTitle>Book Lab Schedule</DialogTitle>
                </DialogHeader>
                <div className="p-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={newBooking.date}
                            onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                            className="w-full"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="time">Time Slot</Label>
                        <Select
                            value={newBooking.time}
                            onValueChange={(value) => setNewBooking({ ...newBooking, time: value })}
                        >
                            <SelectTrigger id="time">
                                <SelectValue placeholder="Select time slot" />
                            </SelectTrigger>
                            <SelectContent>
                                {timeSlots.map((slot) => (
                                    <SelectItem key={slot.value} value={slot.value}>
                                        {slot.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="course">Course</Label>
                        <Select
                            value={newBooking.course}
                            onValueChange={(value) => setNewBooking({ ...newBooking, course: value })}
                        >
                            <SelectTrigger id="course">
                                <SelectValue placeholder="Select course" />
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
                    <div className="space-y-2">
                        <Label htmlFor="room">Room</Label>
                        <Select
                            value={newBooking.room}
                            onValueChange={(value) => setNewBooking({ ...newBooking, room: value })}
                        >
                            <SelectTrigger id="room">
                                <SelectValue placeholder="Select room" />
                            </SelectTrigger>
                            <SelectContent>
                                {rooms.map((room) => (
                                    <SelectItem key={room.value} value={room.value}>
                                        {room.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button
                        className="w-full bg-orange-500 hover:bg-orange-600"
                        onClick={handleSubmit}
                    >
                        Book Schedule
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}