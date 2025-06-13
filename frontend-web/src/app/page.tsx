import Link from "next/link"
import { CircuitBoard, Calendar, Users, Database, ClipboardList, AlertTriangle, BarChart3 } from "lucide-react"
import { Button } from "../components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold">
            <CircuitBoard className="h-6 w-6 text-orange-500" />
            <span>Ohm Electronics Lab</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/login" className="text-sm font-medium">
              Login
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Electronics Lab Activity Management System
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Streamline lab management, equipment tracking, and practical assignments for FPT University Ho Chi
                  Minh City.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Electronics Lab"
                  className="rounded-lg object-cover shadow-lg"
                  width={500}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our system provides comprehensive tools for managing all aspects of the electronics lab
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Calendar className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Lab Schedule Management</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Schedule and manage lab usage for courses, resolve conflicts, and notify users.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Users className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Class Management</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Update class lists, assign lecturers, and manage student information.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Database className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Equipment Management</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Track equipment status, usage history, and manage borrowing/returning.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <ClipboardList className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Assignment Management</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Create assignments, grade submissions, and provide feedback to students.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <AlertTriangle className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Incident Management</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Record and track incidents, manage the handling process, and notify relevant parties.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BarChart3 className="h-12 w-12 text-orange-500" />
                <h3 className="text-xl font-bold">Reporting & Statistics</h3>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Generate reports on lab usage, equipment status, and practical results.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © 2025 Ohm Electronics Lab - FPT University Ho Chi Minh City. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
