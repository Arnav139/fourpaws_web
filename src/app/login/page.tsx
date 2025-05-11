"use client";

import React, { useState } from "react";
import { ArrowRight, DogIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/common/SubmitButton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuthContext } from "@/contexts/AuthContext";
import Loader from "@/components/common/Loader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [canResend, setCanResend] = useState(false);

  const { authStatus, isLoading, requestOtp, verifyOtp } = useAuthContext();

  const handleRequestOtp = async () => {
    try {
      const res = await requestOtp(email);
      if (res?.success) {
        setOtp("");
        setIsOtpSent(true);
        toast.success("Otp sent successfully!");
      } else {
        throw new Error(res?.error || "Failed to send OTP.");
      }
    } catch (err) {
      const error = err as Error;
      console.error("OTP Request Error:", error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setCanResend(false);
      setTimeout(() => setCanResend(true), 120000); // 2 minutes cooldown
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp(otp);

      if (res?.success) {
        toast.success("Otp verified successfully!");
        setIsOtpSent(false);
        setOtp("");
      } else {
        throw new Error(res?.error || "Failed to verify OTP.");
      }
    } catch (err) {
      const error = err as Error;
      console.error("OTP Verification Error:", error);
      toast.error(error.message || "Something went wrong!");
    }
  };

  if (authStatus === "pending") {
    return (
      <div className="flex-1 flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (authStatus === "authorised") {
    return null;
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-background px-4 select-none">
      <Card className="w-full max-w-md border-[6px] border-primary shadow-lg shadow-secondary">
        <CardHeader>
          <CardTitle className="flex justify-center">
            <DogIcon className="h-12 w-12 animate-bounce" />
          </CardTitle>
          <CardDescription>
            <h1 className="text-4xl font-extrabold mb-6 text-center">
              Login to Admin Dashboard
            </h1>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={!isOtpSent ? handleRequestOtp : handleVerifyOtp}>
            {!isOtpSent ? (
              <div className="space-y-4">
                <Input
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  autoFocus
                />
                <SubmitButton
                  className="w-full mt-4"
                  disabled={!email.trim()}
                  render={(isLoading) => (
                    <>
                      <ArrowRight className="mr-2 h-5 w-5" />
                      {isLoading ? "Sending OTP..." : "Send OTP"}
                    </>
                  )}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <InputOTP
                  disabled={isLoading}
                  value={otp}
                  onChange={(val) => setOtp(val)}
                  maxLength={6}
                  className="mx-auto w-fit"
                  autoFocus
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <SubmitButton
                  className="w-full mt-4"
                  disabled={otp.trim().length !== 6}
                  render={(isLoading) => (
                    <>
                      <ArrowRight className="mr-2 h-5 w-5" />
                      {isLoading ? "Verifying OTP..." : "Verify OTP"}
                    </>
                  )}
                />
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  disabled={!canResend}
                  onClick={handleRequestOtp}
                >
                  {canResend ? "Resend OTP" : "Resend OTP in 2 mins"}
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
