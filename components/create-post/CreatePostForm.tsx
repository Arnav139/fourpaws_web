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
import { basePostSchema } from "@/lib/validation/post-schemas";
import { createPost } from "@/lib/api/posts";
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
    },
    mode: "onChange"
  });

  const { handleSubmit, reset, setValue, watch } = methods;
  
  // Watch for files
  const postImage = watch("postImage");
  const postVideo = watch("postVideo");

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/'); // Redirect to home page if not authenticated
    }
  }, [router]);

  // Handle post type change
  const handlePostTypeChange = (type: PostType) => {
    setPostType(type);
    setValue("type", type);
  };

  // Handle form submission
  const onSubmit = async (data: PostFormData) => {
    setIsSubmitting(true);
    
    try {
      // Create form data for multipart submission
      const formData = new FormData();
      
      // Add all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "postImage" && key !== "postVideo") {
          if (key === "pollOptions" && Array.isArray(value)) {
            // Handle array of poll options
            value.forEach((option, index) => {
              formData.append(`pollOptions[${index}]`, option);
            });
          } else if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        }
      });
      
      // Add files if they exist
      if (data.postImage && data.postImage instanceof File) {
        formData.append("postImage", data.postImage);
      }
      
      if (data.postVideo && data.postVideo instanceof File) {
        formData.append("postVideo", data.postVideo);
      }
      
      // Submit the form
      await createPost(formData);
      
      toast.success("Post created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <PostTypeSelector 
            currentType={postType} 
            onTypeChange={handlePostTypeChange} 
          />
          
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4 pt-4">
              <PostTypeContent type={postType} />
            </TabsContent>
            
            <TabsContent value="media" className="space-y-4 pt-4">
              <FileUploadSection 
                postType={postType} 
                postImage={postImage} 
                postVideo={postVideo} 
              />
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