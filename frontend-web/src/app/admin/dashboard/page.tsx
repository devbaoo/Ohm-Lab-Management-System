"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Users, Database, AlertTriangle, Activity, TrendingUp, TrendingDown, Eye, Settings } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
    // Mock data - trong thực tế sẽ fetch từ API
    const stats = {
        totalUsers: 156,
        activeUsers: 142,
        totalEquipment: 89,
        maintenanceAlerts: 7,
        systemUptime: "99.8%",
        storageUsed: "67%"
    }

    const recentActivities = [
        {
            id: 1,
            user: "Dr. Nguyen Van A",
            action: "Created new class",
            time: "2 minutes ago",
            type: "create"
        },
        {
            id: 2,
            user: "Lecturer Tran Thi B",
            action: "Updated equipment status",
            time: "15 minutes ago",
            type: "update"
        },
        {
            id: 3,
            user: "System",
            action: "Backup completed successfully",
            time: "1 hour ago",
            type: "system"
        },
        {
            id: 4,
            user: "Dr. Le Van C",
            action: "Submitted maintenance request",
            time: "2 hours ago",
            type: "maintenance"
        }
    ]

    const systemAlerts = [
        {
            id: 1,
            message: "Server disk usage is above 80%",
            severity: "warning",
            time: "30 minutes ago"
        },
        {
            id: 2,
            message: "Equipment #EQ-001 requires maintenance",
            severity: "error",
            time: "1 hour ago"
        },
        {
            id: 3,
            message: "New user registration pending approval",
            severity: "info",
            time: "2 hours ago"
        }
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">
                        System overview and management tools
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <Link href="/admin/dashboard/settings">
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-600 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                +12% from last month
                            </span>
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeUsers}</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-green-600 flex items-center">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                +8% from last week
                            </span>
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Equipment</CardTitle>
                        <Database className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalEquipment}</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-red-600 flex items-center">
                                <TrendingDown className="h-3 w-3 mr-1" />
                                -2 from maintenance
                            </span>
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.systemUptime}</div>
                        <p className="text-xs text-muted-foreground">
                            Last 30 days average
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Activities */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activities</CardTitle>
                        <CardDescription>
                            Latest system activities and user actions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        {activity.type === "create" && (
                                            <div className="h-2 w-2 bg-green-500 rounded-full" />
                                        )}
                                        {activity.type === "update" && (
                                            <div className="h-2 w-2 bg-blue-500 rounded-full" />
                                        )}
                                        {activity.type === "system" && (
                                            <div className="h-2 w-2 bg-purple-500 rounded-full" />
                                        )}
                                        {activity.type === "maintenance" && (
                                            <div className="h-2 w-2 bg-orange-500 rounded-full" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {activity.user}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.action}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 text-xs text-muted-foreground">
                                        {activity.time}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/admin/dashboard/activities">
                                    <Eye className="h-4 w-4 mr-2" />
                                    View All Activities
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* System Alerts */}
                <Card>
                    <CardHeader>
                        <CardTitle>System Alerts</CardTitle>
                        <CardDescription>
                            Important notifications and warnings
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {systemAlerts.map((alert) => (
                                <div key={alert.id} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 mt-1">
                                        {alert.severity === "error" && (
                                            <AlertTriangle className="h-4 w-4 text-red-500" />
                                        )}
                                        {alert.severity === "warning" && (
                                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                        )}
                                        {alert.severity === "info" && (
                                            <AlertTriangle className="h-4 w-4 text-blue-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {alert.message}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge
                                                variant={
                                                    alert.severity === "error" ? "destructive" :
                                                        alert.severity === "warning" ? "secondary" : "default"
                                                }
                                                className="text-xs"
                                            >
                                                {alert.severity.toUpperCase()}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {alert.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/admin/dashboard/alerts">
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                    View All Alerts
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                        Common administrative tasks
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <Button asChild className="h-20 flex-col">
                            <Link href="/admin/dashboard/users">
                                <Users className="h-6 w-6 mb-2" />
                                Manage Users
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="h-20 flex-col">
                            <Link href="/admin/dashboard/reports">
                                <Database className="h-6 w-6 mb-2" />
                                System Reports
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="h-20 flex-col">
                            <Link href="/admin/dashboard/settings">
                                <Settings className="h-6 w-6 mb-2" />
                                System Settings
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 