"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { postService } from "@/services";

interface Media {
  id: string;
  url: string;
  type: string;
}

interface Post {
  id: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  type: string;
  likesCount: string;
  commentsCount: string;
  isLiked: boolean;
  media: Media[];
}

export default function UserPostsPage() {
  const [postsByType, setPostsByType] = useState<Record<string, Post[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getPosts();
        if (response?.success) {
          const data = response?.data;
          const grouped: Record<string, Post[]> = {};
          data.posts.forEach((post: Post) => {
            if (!grouped[post.type]) grouped[post.type] = [];
            grouped[post.type].push(post);
          });
          setPostsByType(grouped);
          setSelectedType(Object.keys(grouped)[0]);
        }
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const typeTitles: Record<string, string> = {
    standard: "Standard Posts",
    emergency: "Emergency Posts",
    volunteer: "Volunteer Posts",
    campaign: "Campaigns",
    link: "Link Posts",
    poll: "Polls",
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-orange-600 dark:text-orange-400" />
      </div>
    );

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-orange-900 dark:text-orange-200 select-none">
        My Posts
      </h1>
      <Tabs
        defaultValue={selectedType || ""}
        onValueChange={(value) => setSelectedType(value || null)}
        className="w-full"
      >
        <TabsList className="flex justify-center gap-3 mb-6 overflow-x-auto scrollbar-none">
          {Object.keys(postsByType).map((type) => (
            <TabsTrigger
              key={type}
              value={type}
              className="px-4 py-2 text-sm sm:text-base font-semibold rounded-md whitespace-nowrap cursor-pointer bg-orange-200 dark:bg-orange-700 text-orange-900 dark:text-orange-200 hover:bg-orange-300 dark:hover:bg-orange-600 transition-colors"
            >
              {typeTitles[type] || type}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(postsByType).map(([type, posts]) => (
          <TabsContent key={type} value={type} className="mt-4 sm:mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-orange-100 dark:bg-orange-900 rounded-lg shadow-md h-full flex flex-col transition-transform hover:scale-[1.02] cursor-default"
                >
                  <CardHeader className="flex items-center space-x-3 p-4 pb-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={post.authorAvatar}
                        alt={post.authorName}
                      />
                      <AvatarFallback>
                        {post.authorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-orange-900 dark:text-orange-200">
                        {post.authorName}
                      </CardTitle>
                      <p className="text-xs text-orange-700 dark:text-orange-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-1 flex flex-col">
                    <p className="text-sm text-orange-800 dark:text-orange-300 mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    {post.media.map((mediaItem) => (
                      <img
                        key={mediaItem.id}
                        src={mediaItem.url}
                        alt="Post media"
                        className="w-full h-auto max-h-48 object-cover rounded mb-4"
                      />
                    ))}
                    <div className="mt-auto flex justify-between text-xs text-orange-700 dark:text-orange-400">
                      <span>{post.likesCount} Likes</span>
                      <span>{post.commentsCount} Comments</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
