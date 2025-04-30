"use client";

/**
 * API functions for creating and managing posts
 */

// Function to create a new post
export async function createPost(formData: FormData) {
  try {
    // Get auth token from local storage or context
    const token = localStorage.getItem("auth_token") || "";
    
    // In a real app, you would check if token exists and redirect to login if not
    if (!token) {
      throw new Error("Authentication required");
    }
    
    const response = await fetch("http://localhost:3004/api/v1/feed/posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Note: Don't set Content-Type for multipart/form-data
        // The browser will set the correct boundary
      },
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create post");
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// Function to get posts (for future use)
export async function getPosts() {
  try {
    // Get auth token
    const token = localStorage.getItem("auth_token") || "";
    
    const response = await fetch("/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}