const API_BASE_URL = process.env.NEXT_PUBLIC_PROD_URL || "";

export async function sendOtp(email: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Error requesting OTP");
  }
  return await res.json();
}

export async function verifyOtp(otp: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ otp }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "OTP verification failed");
  }
  return await res.json();
}

export async function logout() {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error("Logout failed");
  }
  return true;
}
