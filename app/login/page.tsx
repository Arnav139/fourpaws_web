"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as clientApi from "@/services/clientApi";
import { ArrowRight, PawPrint as Paw } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/common/SubmitButton";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { refreshUser } = useAuth();

  console.log({ isLoading });

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await clientApi.getAuthStatus();
        if (res.isAuthenticated) {
          setIsAuthenticated(true);
          router.replace("/");
        }
      } catch {
        // Treat as unauthenticated silently
      }
    }
    checkAuth();
  }, [router]);

  const handleRequestOtp = async () => {
    if (isLoading) return;
    setError("");
    setIsLoading(true);
    try {
      const res = await clientApi.sendOtp(email);
      setOtpToken(res.token);
      setIsOtpSent(true);
      setCanResend(false);
      setTimeout(() => setCanResend(true), 120000); // 2 minutes cooldown
    } catch (e: any) {
      setError(e.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setIsLoading(true);
    try {
      await clientApi.verifyOtp(otp, otpToken);
      setIsOtpSent(false);
      setOtp("");
      router.replace("/");
      refreshUser;
    } catch (e: any) {
      setError(e.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-orange-50 dark:bg-orange-950 px-4 select-none">
      <form
        action={isOtpSent ? handleVerifyOtp : handleRequestOtp}
        className="max-w-md w-full bg-white dark:bg-orange-900 rounded-lg shadow-md p-6"
      >
        <div className="flex justify-center mb-6">
          <Paw className="h-16 w-16 text-orange-600 dark:text-orange-400 animate-bounce" />
        </div>

        <h1 className="text-3xl font-extrabold mb-6 text-orange-900 dark:text-orange-200 text-center">
          Login to FourPaws Admin
        </h1>

        {error && (
          <div className="mb-4 text-red-600 dark:text-red-400 font-semibold text-center">
            {error}
          </div>
        )}

        {!isOtpSent ? (
          <div className="space-y-4">
            <input
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-orange-400 p-2 text-lg text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600 dark:border-orange-600 dark:bg-orange-800 dark:text-orange-200 dark:placeholder-orange-400"
              disabled={isLoading}
            />
            <SubmitButton
              className="w-full"
              disabled={!email.trim()}
              render={(loading) => (
                <>
                  {loading ? "Sending OTP..." : "Send OTP"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-md border border-orange-400 p-2 text-lg text-orange-900 placeholder-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-600 dark:border-orange-600 dark:bg-orange-800 dark:text-orange-200 dark:placeholder-orange-400"
              disabled={isLoading}
            />
            <SubmitButton
              className="w-full"
              disabled={otp.trim().length !== 6}
              render={(loading) => (
                <>
                  {loading ? "Verifying OTP..." : "Verify OTP"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            />
            <SubmitButton
              variant="outline"
              className="w-full mt-2"
              disabled={!canResend}
              onClick={handleRequestOtp}
              label="Resend OTP"
              loadingLabel="Resend OTP in 2 mins"
            />
          </div>
        )}
      </form>
    </div>
  );
}
