"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostType } from "@/components/create-post/CreatePostForm";
import { cn } from "@/lib/utils";

interface FileUploadSectionProps {
  postType: PostType;
  postImage?: File | null;
  postVideo?: File | null;
}

export function FileUploadSection({ postType, postImage, postVideo }: FileUploadSectionProps) {
  const { control, setValue } = useFormContext();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  // Determine if image/video is allowed for this post type
  const allowedTypes = {
    image: ["standard", "story", "new_profile", "sponsored", "emergency", "campaign"],
    video: ["story", "campaign"]
  };

  const allowImage = allowedTypes.image.includes(postType);
  const allowVideo = allowedTypes.video.includes(postType);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("postImage", file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle video upload
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("postVideo", file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setVideoSrc(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Clear image
  const clearImage = () => {
    setValue("postImage", null);
    setImageSrc(null);
  };

  // Clear video
  const clearVideo = () => {
    setValue("postVideo", null);
    setVideoSrc(null);
  };

  return (
    <div className="space-y-6">
      {allowImage && (
        <FormField
          control={control}
          name="postImage"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {!imageSrc ? (
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-medium">Click to upload image</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG or GIF
                          </p>
                        </div>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                          {...field}
                        />
                      </label>
                    </div>
                  ) : (
                    <Card className="overflow-hidden relative">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                        onClick={clearImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <img
                        src={imageSrc}
                        alt="Image preview"
                        className="w-full h-auto object-contain max-h-[300px]"
                      />
                    </Card>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {allowVideo && (
        <FormField
          control={control}
          name="postVideo"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Upload Video</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {!videoSrc ? (
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="video-upload"
                        className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-lg cursor-pointer bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-medium">Click to upload video</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            MP4, WebM or MOV
                          </p>
                        </div>
                        <Input
                          id="video-upload"
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={handleVideoChange}
                          {...field}
                        />
                      </label>
                    </div>
                  ) : (
                    <Card className="overflow-hidden relative">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 z-10"
                        onClick={clearVideo}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <video
                        src={videoSrc}
                        controls
                        className="w-full h-auto max-h-[300px]"
                      />
                    </Card>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <div className={cn("text-sm", (!allowImage && !allowVideo) ? "text-muted-foreground italic" : "hidden")}>
        This post type does not require media uploads.
      </div>
    </div>
  );
}