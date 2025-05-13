export interface PostMedia {
  id: string;
  url: string;
  type: string;
}

export interface Post {
  id: string;
  authorName: string | null;
  authorAvatar: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  likesCount: string;
  commentsCount: string;
  isLiked: boolean;
  media: PostMedia[];
}

export interface PostsResponse {
  success: boolean;
  data: {
    posts: Post[];
  };
  error: string | null;
  status: number;
} 