"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/services";
import { getAuthStatus, loginAction, logoutAction } from "@/actions/auth";

export function useAuth() {
  const [authStatus, setAuthSratus] = useState<
    "pending" | "authorised" | "unauthorised"
  >("pending");
  const [isLoading, setIsLoading] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await getAuthStatus();

      if (authStatus?.isAuthenticated) {
        setAuthSratus("authorised");
      } else {
        setAuthSratus("unauthorised");
      }
    };
    checkAuth();
  }, []);

  const requestOtp = useCallback(
    async (email: string) => {
      if (isLoading) return;
      setIsLoading(true);
      try {
        const res = await userService.sendOtp(email);
        if (res.success) {
          setOtpToken(res.data?.token || "");
          return { success: true };
        } else {
          throw new Error(res.error || "Failed to send OTP.");
        }
      } catch (err) {
        const error = err as Error;
        return {
          success: false,
          error: error?.message || "Something went wrong!",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  const verifyOtp = useCallback(
    async (otp: string) => {
      if (isLoading || !otpToken) return;
      setIsLoading(true);
      try {
        const res = await userService.verifyOtp(otp, otpToken);
        if (res.success) {
          const user = res.data?.user;
          sessionStorage.setItem("user", JSON.stringify(user));
          await loginAction(user?.accessToken || "");
          setAuthSratus("authorised");
          setOtpToken("");
          router.replace("/");
          return { success: true };
        } else {
          throw new Error(res.error || "Failed to verify OTP.");
        }
      } catch (err) {
        const error = err as Error;
        return {
          success: false,
          error: error?.message || "Something went wrong!",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [otpToken, isLoading, router],
  );

  const logout = useCallback(async () => {
    await logoutAction();
    sessionStorage.removeItem("user");
    setAuthSratus("unauthorised");
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }, []);

  return {
    authStatus,
    isLoading,
    requestOtp,
    verifyOtp,
    logout,
  };
}
