"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return null;
  }

  return <>{children}</>;
}