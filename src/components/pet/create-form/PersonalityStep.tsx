"use client";

import { ImagePicker } from "@/components/common/ImagePicker";
import { InputTags } from "@/components/common/InputTags";
import { PawFormField } from "@/components/common/PawFormField";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function PersonalityStep() {
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

  const handleImageChange = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      if (fileArray.length + additionalImages.length <= 6) {
        setAdditionalImages([...additionalImages, ...fileArray]);
      }
    }
  };

  return (
    <>
      <PawFormField
        name="bio"
        label="Bio"
        render={(field) => (
          <Textarea placeholder="Enter a brief bio" rows={4} {...field} />
        )}
      />
      <PawFormField
        name="personalityTraits"
        label="Personality Traits (comma-separated)"
        render={(field) => (
          <InputTags placeholder="e.g., playful, friendly" {...field} />
        )}
      />
      <PawFormField
        name="additionalImages"
        label="Additional Images"
        render={(field) => (
          <ImagePicker
            multiple
            maxImages={6}
            defaultImages={field.value ? [field.value] as File[] : []}
            onImageChange={(files) => {handleImageChange(files); field.onChange(files || null)}}
          />
        )}
      />
    </>
  );
}
