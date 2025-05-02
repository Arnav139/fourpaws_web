"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PROD_URL}/feed/posts?cursor=0&limit=50`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
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

  if (loading) return <div className="text-center text-base sm:text-lg py-8">Loading...</div>;

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <Tabs
        defaultValue={selectedType || ""}
        onValueChange={(value) => setSelectedType(value || null)}
        className="w-full"
      >
        <TabsList className="flex  justify-around gap-2 sm:gap-3 mb-4 h-12 sm:mb-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] 
  [&::-webkit-scrollbar]:hidden ">
          {Object.keys(postsByType).map((type) => (
            <TabsTrigger
              key={type}
              value={type}
              className="px-3 py-1.5 text-sm sm:text-base font-medium rounded-md whitespace-nowrap"
            >
              {typeTitles[type] || type}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(postsByType).map(([type, posts]) => (
          <TabsContent key={type} value={type} className="mt-4 sm:mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-card rounded-lg shadow-md h-full flex flex-col transition-transform hover:scale-[1.02]"
                >
                  <CardHeader className="flex flex-row items-center space-x-3 sm:space-x-4 p-4">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                      <AvatarFallback className="text-xs sm:text-sm">
                        {post.authorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-base sm:text-lg font-medium leading-tight">
                        {post.authorName}
                      </CardTitle>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-1 flex flex-col">
                    <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    {post.media.map((mediaItem) => (
                      <img
                        key={mediaItem.id}
                        src={mediaItem.url}
                        alt="Post media"
                        className="w-full h-auto max-h-48 sm:max-h-64 object-cover rounded mb-3 sm:mb-4"
                      />
                    ))}
                    <div className="mt-auto flex justify-between items-center text-xs sm:text-sm text-muted-foreground">
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