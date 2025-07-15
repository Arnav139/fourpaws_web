const API_BASE_URL = process.env.NEXT_PUBLIC_PROD_URL || "";

import * as clientApi from "@/services/clientApi";

export async function createPost(formData: FormData) {
  return clientApi.createPost(formData);
}

export async function getPosts() {
  const response = await clientApi.fetchWithAuth(`${API_BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}