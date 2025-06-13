"use client"
import { useState } from "react"
import Link from "next/link"
import {
    CircuitBoard,
    User,
    Mail,
    Phone,
    Building,
    Calendar,
    Edit3,
    Save,
    X,
    ArrowLeft,
    BookOpen,
    Clock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Label } from "@/src/components/ui/label"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import DashboardLayout from "@/src/components/dashboard-layout"

export default function LecturerProfilePage() {
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        fullName: "Tran Thi Huong",
        email: "huong.tt@fpt.edu.vn",
        phone: "+84 987 654 321",
        department: "Electronics Engineering",
        position: "Senior Lecturer",
        employeeId: "FPT005678",
        joinDate: "2019-03-15",
        bio: "Electronics specialist with focus on circuit design and microcontrollers. Published researcher with industry experience in telecommunications.",
        office: "Building B, Room 205",
        workingHours: "Monday - Friday, 9:00 AM - 5:00 PM",
        specialization: "Circuit Design, Microcontrollers",
        courses: "ELE301 - Digital Electronics, ELE405 - Advanced Circuit Design",
    })

    const [editData, setEditData] = useState(profileData)

    const handleEdit = () => {
        setIsEditing(true)
        setEditData(profileData)
    }

    const handleSave = () => {
        setProfileData(editData)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditData(profileData)
        setIsEditing(false)
    }

    const handleInputChange = (field: string, value: string) => {
        setEditData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    return (
        <DashboardLayout role="lecturer">
            <div className="min-h-screen p-4">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lecturer Profile</h1>
                            <p className="text-gray-600 dark:text-gray-400">Manage your personal information</p>
                        </div>
                        {!isEditing ? (
                            <Button onClick={handleEdit} className="bg-orange-500 hover:bg-orange-600">
                                <Edit3 className="h-4 w-4 mr-2" />
                                Edit Profile
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                                    <Save className="h-4 w-4 mr-2" />
                                    Save
                                </Button>
                                <Button onClick={handleCancel} variant="outline">
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Picture and Basic Info */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="text-center">
                                <div className="flex justify-center mb-4">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                                        <AvatarFallback className="text-2xl bg-orange-100 text-orange-600">
                                            {profileData.fullName
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <CardTitle className="text-xl">{profileData.fullName}</CardTitle>
                                <CardDescription className="text-orange-500 font-medium">{profileData.position}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Building className="h-4 w-4 text-gray-500" />
                                    <span>{profileData.department}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span>{profileData.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span>{profileData.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span>Joined {new Date(profileData.joinDate).toLocaleDateString("vi-VN")}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Detailed Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Your basic personal details</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        {isEditing ? (
                                            <Input
                                                id="fullName"
                                                value={editData.fullName}
                                                onChange={(e) => handleInputChange("fullName", e.target.value)}
                                            />
                                        ) : (
                                            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">{profileData.fullName}</div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="employeeId">Employee ID</Label>
                                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">{profileData.employeeId}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        {isEditing ? (
                                            <Input
                                                id="email"
                                                type="email"
                                                value={editData.email}
                                                onChange={(e) => handleInputChange("email", e.target.value)}
                                            />
                                        ) : (
                                            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">{profileData.email}</div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        {isEditing ? (
                                            <Input
                                                id="phone"
                                                value={editData.phone}
                                                onChange={(e) => handleInputChange("phone", e.target.value)}
                                            />
                                        ) : (
                                            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">{profileData.phone}</div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Work Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Work Information</CardTitle>
                                <CardDescription>Your professional details and work environment</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Department</Label>
                                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">{profileData.department}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="position">Position</Label>
                                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">{profileData.position}</div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="office">Office Location</Label>
                                        {isEditing ? (
                                            <Input
                                                id="office"
                                                value={editData.office}
                                                onChange={(e) => handleInputChange("office", e.target.value)}
                                            />
                                        ) : (
                                            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">{profileData.office}</div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="workingHours">Working Hours</Label>
                                        {isEditing ? (
                                            <Input
                                                id="workingHours"
                                                value={editData.workingHours}
                                                onChange={(e) => handleInputChange("workingHours", e.target.value)}
                                            />
                                        ) : (
                                            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">{profileData.workingHours}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    {isEditing ? (
                                        <Textarea
                                            id="bio"
                                            rows={4}
                                            value={editData.bio}
                                            onChange={(e) => handleInputChange("bio", e.target.value)}
                                            placeholder="Tell us about yourself..."
                                        />
                                    ) : (
                                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md min-h-[100px]">{profileData.bio}</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Teaching Information (Lecturer-specific section) */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Teaching Information</CardTitle>
                                <CardDescription>Your academic specialization and courses</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="specialization">Specialization</Label>
                                    {isEditing ? (
                                        <Input
                                            id="specialization"
                                            value={editData.specialization}
                                            onChange={(e) => handleInputChange("specialization", e.target.value)}
                                        />
                                    ) : (
                                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">{profileData.specialization}</div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="courses">Current Courses</Label>
                                    {isEditing ? (
                                        <Input
                                            id="courses"
                                            value={editData.courses}
                                            onChange={(e) => handleInputChange("courses", e.target.value)}
                                        />
                                    ) : (
                                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md">{profileData.courses}</div>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                        <BookOpen className="h-6 w-6 text-orange-500" />
                                        <span>Course Materials</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                        <Clock className="h-6 w-6 text-orange-500" />
                                        <span>Teaching Schedule</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                        <User className="h-6 w-6 text-orange-500" />
                                        <span>Student List</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Settings</CardTitle>
                                <CardDescription>Manage your account preferences</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                        <User className="h-6 w-6 text-orange-500" />
                                        <span>Change Password</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                        <Mail className="h-6 w-6 text-orange-500" />
                                        <span>Email Settings</span>
                                    </Button>
                                    <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                                        <Phone className="h-6 w-6 text-orange-500" />
                                        <span>Notification Settings</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </DashboardLayout>

    )
}
