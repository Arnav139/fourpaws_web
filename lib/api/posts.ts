"use client";

const API_BASE_URL = process.env.NEXT_PUBLIC_PROD_URL || "";

class ApiService {
  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  }

  private logoutOnUnauthorized() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      window.location.href = "/";
    }
  }

  private async fetchWithAuth(input: RequestInfo, init: RequestInit = {}) {
    const token = this.getAuthToken();
    if (!token) {
      this.logoutOnUnauthorized();
      throw new Error("Authentication required");
    }

    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${token}`);

    const response = await fetch(input, {
      ...init,
      headers,
    });

    if (response.status === 401) {
      this.logoutOnUnauthorized();
      throw new Error("Unauthorized. Logging out.");
    }

    return response;
  }

  async createPost(formData: FormData) {
    const response = await this.fetchWithAuth(`${API_BASE_URL}/feed/posts`, {
      method: "POST",
      // Important: Do NOT set Content-Type explicitly for FormData
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to create post");
    }

    return await response.json();
  }

  async getPosts() {
    const response = await this.fetchWithAuth(`${API_BASE_URL}/posts`);

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    return await response.json();
  }
}

export const apiService = new ApiService();
