"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CircuitBoard } from "lucide-react"
import google from "@/public/google.png"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Label } from "@/src/components/ui/label"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState("lecturer")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would authenticate with your backend here
    // For now, we'll just redirect based on the selected role
    if (role === "head") {
      router.push("/head/dashboard")
    } else if (role === "lecturer") {
      router.push("/lecturer/dashboard")
    } else if (role === "admin") {
      router.push("/admin/dashboard")
    }
  }

  const handleGoogleLogin = () => {
    router.push("/auth/google")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 font-bold">
        <CircuitBoard className="h-6 w-6 text-orange-500" />
        <span>Ohm Electronics Lab</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>Enter your credentials to access the lab management system</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m.example@fpt.edu.vn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-orange-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Login
            </Button>
            <div className="relative w-full text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700" />
              </div>
              <div className="relative bg-white dark:bg-gray-900 px-2 text-sm text-gray-500 dark:text-gray-400">
                OR
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center gap-2"
              onClick={handleGoogleLogin}
            >
              <Image src={google} alt="Google" width={20} height={20} />
              Login with @fpt.edu.vn
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
