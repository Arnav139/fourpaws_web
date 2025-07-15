import { getToken, loginAction, logoutAction } from "@/actions/authActions";

const API_BASE_URL = process.env.NEXT_PUBLIC_PROD_URL || "";

async function getAuthToken() {
  if (typeof window === "undefined") {
    return await getToken();
  }
  return localStorage.getItem("auth_token");
}

function removeAuthToken() {
  logoutAction();
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }
}

/**
 * Helper to fetch with authorization header using token from localStorage
 */
export async function fetchWithAuth(
  input: RequestInfo,
  init: RequestInit = {},
) {
  const token = await getAuthToken();

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

export async function sendOtp(email: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to send OTP");
  }
  const data = await res.json();
  return data;
}

export async function verifyOtp(otp: string, otpToken: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${otpToken}`,
    },
    body: JSON.stringify({ otp }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to verify OTP");
  }

  const data = await res.json();

  await loginAction(data.user.accessToken);
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", data.user.accessToken);
  }
}

export async function logout(): Promise<void> {
  removeAuthToken();
}

export async function getProfile<T = any>(): Promise<T | null> {
  try {
    const token = await getToken();
    const res = await fetchWithAuth(`${API_BASE_URL}/user/profile`, {
      headers: {
        Authhorization: `Bearer ${token}`,
      },
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

export async function createPost(formData: FormData) {
  const response = await fetchWithAuth(`${API_BASE_URL}/feed/posts`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create post");
  }

  return await response.json();
}
