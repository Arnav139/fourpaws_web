"use server";

import { userService } from "@/services";
import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  return token ?? null;
}

export async function loginAction(token: string) {
  (await cookies()).set({
    name: "auth_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function logoutAction() {
  (await cookies()).set({
    name: "auth_token",
    value: "",
    maxAge: 0,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getAuthStatus() {
  const token = await getToken();
  if (!token) {
    return { isAuthenticated: false, user: null, token: null };
  }

  const res = await userService.getUser(token);
  if (!res.success) {
    return { isAuthenticated: false, user: null, token: null };
  }

  return { isAuthenticated: true, user: res.data?.user, token };
}
