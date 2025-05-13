import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

interface ImagePickerProps {
  onImageChange: (files: FileList | null) => void;
  multiple?: boolean;
  maxImages?: number;
  defaultImages?: File[];
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  onImageChange,
  multiple = false,
  maxImages = 1,
  defaultImages = [], // Default to empty array for default images
}) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  console.log(defaultImages);

  const imageUpdate = (files: File[]) => {
    const readers = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((results) => {
      if (multiple) {
        setImagePreviews((prev) => [...prev, ...results]);
      } else {
        setImagePreviews(results);
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    imageUpdate(files);
    onImageChange(e.target.files);
  };

  useEffect(() => {
    imageUpdate(defaultImages);
  }, []);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
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
              onClick={() => {
                setImagePreviews((prev) => prev.filter((_, i) => i !== index));
              }}
              variant="destructive"
              className="size-6 cursor-pointer aspect-square p-0 absolute top-0.5 right-0.5"
            >
              <XIcon />
            </Button>
          </div>
        ))}
        {imagePreviews.length < maxImages && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-[100px] h-[100px] rounded-4xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
          >
            <span>Add Image</span>
          </div>
        )}
      </div>
    </div>
  );
};
