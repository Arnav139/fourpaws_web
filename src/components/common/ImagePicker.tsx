import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useCallback } from "react";

interface ImagePickerProps {
  onImageChange: (files: FileList | null) => void;
  multiple?: boolean;
  maxImages?: number;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  onImageChange,
  multiple = false,
  maxImages = 1,
}) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length + imagePreviews.length > maxImages) {
      // Handle error: too many images
      return;
    }

    const readers = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => {
      setImagePreviews([...imagePreviews, ...results]);
    });
  };

  const handlePlaceholderClick = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  const removeImage = (index: number) => {
    setImagePreviews((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => {
          onImageChange(e.target.files);
          handleImageChange(e);
        }}
        multiple={multiple}
      />
      <div className="flex justify-center gap-2.5 flex-wrap">
        {imagePreviews.map((preview, index) => (
          <div key={index} style={{ position: "relative" }}>
            <Image
              width={100}
              height={100}
              src={preview}
              alt={`Pet Profile Preview ${index + 1}`}
              className="w-[100px] h-[100px] rounded-4xl object-cover border-none"
            />
            <Button
              onClick={() => removeImage(index)}
              variant="destructive"
              className="size-6 cursor-pointer aspect-square p-0 absolute top-0.5 right-0.5"
            >
              <XIcon />
            </Button>
          </div>
        ))}
        {imagePreviews.length < maxImages && (
          <div
            onClick={handlePlaceholderClick}
            className="w-[100px] h-[100px] rounded-4xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
          >
            <span>Add Image</span>
          </div>
        )}
      </div>
    </div>
  );
};
