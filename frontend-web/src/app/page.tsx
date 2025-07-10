"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CircuitBoard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { toast } from "react-toastify";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { loginGoogle } from "../services/userServices";
import config from "../config/config";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (response: CredentialResponse) => {
    if (!response.credential) {
      console.error("Error: Google credential is undefined");
      return;
    }

    setIsLoading(true);
    const googleId = response.credential;
    console.log("Google ID:", googleId);
    try {
      const apiResponse = await loginGoogle({ googleId });

      if (apiResponse) {
        const userRole = apiResponse.user?.userRollNumber;
        localStorage.setItem('googleId', googleId);

        switch (userRole) {
          case "adm":
            router.push("/admin/dashboard");
            break;
          case "head":
            router.push("/head/dashboard");
            break;
          case "lecturer":
            router.push("/lecturer/dashboard");
            break;
          default:
            toast.error("Unknown user role");
            return;
        }
      } else {
        throw new Error(apiResponse.message);
      }
    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error(error.message || "Failed to login with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID || ""}>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 font-bold">
          <CircuitBoard className="h-6 w-6 text-orange-500" />
          <span>Ohm Electronics Lab</span>
        </Link>

        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Sign in with your @fpt.edu.vn account to access the lab management system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <GoogleLogin
                onSuccess={handleLogin}
                onError={() => {
                  console.error("Login Failed");
                  toast.error("Google login failed");
                  setIsLoading(false);
                }}
                theme="outline"
                size="large"
                text="signin_with"
                shape="rectangular"
                logo_alignment="center"
                width="100%"
              />
              {isLoading && (
                <span className="text-gray-700 dark:text-gray-300">Logging in...</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </GoogleOAuthProvider>
  );
}