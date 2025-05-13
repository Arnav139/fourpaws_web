"use client";

import { useEffect, useState } from "react";
import { postService } from "@/services";
import { Post, PostsResponse } from "@/types/post";

export default function PostsPage() {
  const [loading, setLoading] = useState(true);
  const [postsByType, setPostsByType] = useState<Record<string, Post[]>>({});
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getPosts();
        if (response?.success) {
          const data = response.data as PostsResponse["data"];
          
          if (data?.posts) {
            const grouped: Record<string, Post[]> = {};
            data.posts.forEach((post: Post) => {
              if (!grouped[post.type]) {
                grouped[post.type] = [];
              }
              grouped[post.type].push(post);
            });
            
            setPostsByType(grouped);
            const types = Object.keys(grouped);
            if (types.length > 0) {
              setSelectedType(types[0]);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-4 mb-6">
        {Object.keys(postsByType).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded ${
              selectedType === type
                ? "bg-primary text-white"
                : "bg-gray-200"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {postsByType[selectedType]?.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4 mb-4">
              {post.authorAvatar && (
                <img
                  src={post.authorAvatar}
                  alt={post.authorName || "User"}
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div>
                <h3 className="font-semibold">
                  {post.authorName || "Anonymous"}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="mb-4">{post.content}</p>
            {post.media && post.media.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                {post.media.map((media) => (
                  <img
                    key={media.id}
                    src={media.url}
                    alt="Post media"
                    className="w-full h-48 object-cover rounded"
                  />
                ))}
              </div>
            )}
            <div className="flex items-center gap-4 text-gray-500">
              <button className="flex items-center gap-2">
                <span>{post.likesCount} Likes</span>
              </button>
              <button className="flex items-center gap-2">
                <span>{post.commentsCount} Comments</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
