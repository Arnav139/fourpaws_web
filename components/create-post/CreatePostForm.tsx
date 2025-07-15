"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { PostTypeContent } from "@/components/create-post/PostTypeContent";
import { PostTypeSelector } from "@/components/create-post/PostTypeSelector";
import { FileUploadSection } from "@/components/create-post/FileUploadSection";
import * as apiPosts from "@/services/apiPosts";
import * as clientApi from "@/services/clientApi";
import { useRouter } from "next/navigation";

export type PostType =
  | "standard"
  | "story"
  | "poll"
  | "link"
  | "campaign"
  | "volunteer"
  | "new_profile"
  | "sponsored"
  | "emergency";

const basePostSchema = z.object({
  type: z.enum([
    "standard",
    "story",
    "poll",
    "link",
    "campaign",
    "volunteer",
    "new_profile",
    "sponsored",
    "emergency",
  ]),
  content: z.string().optional(),
  pollOptions: z.array(z.string()).optional(),
  pollDuration: z.number().min(1).max(168).optional(),
  postImage: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, "Invalid image file"),
  postVideo: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, "Invalid video file"),
  // Additional fields can be added per post type dynamically if needed
});

export type PostFormData = z.infer<typeof basePostSchema>;

export function CreatePostForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postType, setPostType] = useState<PostType>("standard");

  const methods = useForm<PostFormData>({
    resolver: zodResolver(basePostSchema),
    defaultValues: {
      content: "",
      type: "standard",
      pollOptions: ["", ""],
      pollDuration: 24,
      postImage: null,
      postVideo: null,
    },
    mode: "onChange",
  });

  const { handleSubmit, reset, setValue, watch } = methods;

  const postImage = watch("postImage");
  const postVideo = watch("postVideo");

  useEffect(() => {
    const token = clientApi.getAuthToken();
    if (!token) {
      router.replace("/"); // Redirect to home page if not authenticated
    }
  }, [router]);

  const handlePostTypeChange = (type: PostType) => {
    setPostType(type);
    setValue("type", type);
  };

  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Add primitive fields except file uploads
      Object.entries(data).forEach(([key, value]) => {
        if (key === "postImage" || key === "postVideo") return;

        if (Array.isArray(value)) {
          value.forEach((val, idx) => {
            formData.append(`${key}[${idx}]`, String(val));
          });
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      if (data.postImage instanceof File) {
        formData.append("postImage", data.postImage);
      }

      if (data.postVideo instanceof File) {
        formData.append("postVideo", data.postVideo);
      }

      await apiPosts.createPost(formData);

      toast.success("Post created successfully!");
      reset();
      setPostType("standard");
      router.refresh();
    } catch (err) {
      console.error("Failed to create post:", err);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <PostTypeSelector currentType={postType} onTypeChange={handlePostTypeChange} />

          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4 pt-4">
              <PostTypeContent type={postType} />
            </TabsContent>

            <TabsContent value="media" className="space-y-4 pt-4">
              <FileUploadSection postType={postType} postImage={postImage} postVideo={postVideo} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Post
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}