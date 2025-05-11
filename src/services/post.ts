import { getToken } from "@/actions/auth";
import ApiClient from "./api";

const api = new ApiClient(process.env.NEXT_PUBLIC_PROD_URL!, getToken);

export const postService = {
  getPosts: async () => {
    return api.get("/feed/posts?cursor=0&limit=50");
  },
  createPost: async (formData: FormData) => {
    return api.post("/feed/posts", formData);
  },
};
