"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  CircuitBoard,
  Plug,
  Calendar,
  Users,
  Database,
  ClipboardList,
  AlertTriangle,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Bell,
  User,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"


interface DashboardLayoutProps {
  children: React.ReactNode
  role: "head" | "lecturer" | "admin"
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const roleTitle = role === "head" ? "Head of Department" : role === "lecturer" ? "Lecturer" : "System Administrator"

  const navItems = [
    {
      title: "Dashboard",
      href: `/${role}/dashboard`,
      icon: <BarChart3 className="h-5 w-5" />,
      roles: ["head", "lecturer", "admin"],
    },
    {
      title: "Schedule",
      href: `/${role}/dashboard/schedule`,
      icon: <Calendar className="h-5 w-5" />,
      roles: ["head", "lecturer"],
    },
    {
      title: "Classes",
      href: `/${role}/dashboard/classes`,
      icon: <Users className="h-5 w-5" />,
      roles: ["head", "lecturer"],
    },
    {
      title: "Equipment",
      href: `/${role}/dashboard/equipment`,
      icon: <Database className="h-5 w-5" />,
      roles: ["head", "lecturer"],
    },
    {
      title: "Assignments",
      href: `/${role}/dashboard/assignments`,
      icon: <ClipboardList className="h-5 w-5" />,
      roles: ["lecturer"],
    },
    {
      title: "Accessory",
      href: `/${role}/dashboard/accessory`,
      icon: <Plug className="h-5 w-5" />,
      roles: ["head", "lecturer"],
    },
    {
      title: "Reports",
      href: `/${role}/dashboard/reports`,
      icon: <BarChart3 className="h-5 w-5" />,
      roles: ["head", "lecturer", "admin"],
    },
    {
      title: "User Management",
      href: `/${role}/dashboard/users`,
      icon: <Users className="h-5 w-5" />,
      roles: ["admin"],
    }
  ]

  const filteredNavItems = navItems.filter((item) => item.roles.includes(role))

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold mr-4">
            <CircuitBoard className="h-6 w-6 text-orange-500" />
            <span className="hidden md:inline">Ohm Electronics Lab</span>
          </div>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 sm:max-w-sm">
              <div className="flex items-center gap-2 font-bold mb-8">
                <CircuitBoard className="h-6 w-6 text-orange-500" />
                <span>Ohm Electronics Lab</span>
              </div>
              <nav className="flex flex-col gap-4">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-orange-500 ${pathname === item.href
                      ? "bg-orange-50 text-orange-500 dark:bg-orange-950 dark:text-orange-400"
                      : "text-muted-foreground"
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <nav className="hidden md:flex md:gap-4 md:ml-4">
            {filteredNavItems.slice(0, 8).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:text-orange-500 ${pathname === item.href
                  ? "bg-orange-50 text-orange-500 dark:bg-orange-950 dark:text-orange-400"
                  : "text-muted-foreground"
                  }`}
              >
                {item.icon}
                <span className="hidden lg:inline">{item.title}</span>
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt={roleTitle} />
                    <AvatarFallback>{roleTitle[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">{roleTitle}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/${role}/profile`} className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/${role}/settings`} className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center gap-2 text-red-500">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6">{children}</div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            © 2025 Ohm Electronics Lab - FPT University Ho Chi Minh City
          </p>
        </div>
      </footer>
    </div>
  )
}