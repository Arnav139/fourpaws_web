import { getToken } from "@/actions/authActions";

const API_BASE_URL = process.env.NEXT_PUBLIC_PROD_URL || "";

function getAuthToken() {
  if (typeof window === "undefined") {
    return getToken();
  }
  return localStorage.getItem("auth_token");
}

function removeAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }
}

/**
 * Helper to fetch with authorization header using token from localStorage
 */
async function fetchWithAuth(input: RequestInfo, init: RequestInit = {}) {
  const token = getAuthToken();
  if (!token) {
    removeAuthToken();
    throw new Error("Authentication required");
  }

  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    removeAuthToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Unauthorized");
  }

  return response;
}

export async function sendOtp(email: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to send OTP");
  }
}

export async function verifyOtp(otp: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ otp }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to verify OTP");
  }

  const data = await res.json();
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", data.token);
  }
}

export async function logout(): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Logout failed");
  }
  removeAuthToken();
}

export async function getProfile<T = any>(): Promise<T | null> {
  try {
    const token = getAuthToken();

    const res = await fetchWithAuth(`${API_BASE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getAuthStatus(): Promise<{
  isAuthenticated: boolean;
  user: any | null;
  token: string | null;
}> {
  const token = getAuthToken();

  if (!token) {
    return { isAuthenticated: false, user: null, token: null };
  }

  try {
    const user = await getProfile();
    if (!user) {
      removeAuthToken();
      return { isAuthenticated: false, user: null, token: null };
    }
    return { isAuthenticated: true, user, token };
  } catch {
    removeAuthToken();
    return { isAuthenticated: false, user: null, token: null };
  }
}
