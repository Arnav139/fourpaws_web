import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { truncateText } from "@/lib/utils";

interface FilePickerProps {
  onFileChange: (files: FileList | null) => void;
  multiple?: boolean;
  maxFiles?: number;
}

export const FilePicker: React.FC<FilePickerProps> = ({
  onFileChange,
  multiple = false,
  maxFiles = 1,
}) => {
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length + filePreviews.length > maxFiles) {
      // Handle error: too many files
      return;
    }

    const fileNames = files.map((file) => file.name);
    setFilePreviews([...filePreviews, ...fileNames]);
  };

  const handlePlaceholderClick = useCallback(() => {
    fileInputRef.current?.click();
  }, [fileInputRef]);

  const removeFile = (index: number) => {
    setFilePreviews((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => {
          onFileChange(e.target.files);
          handleFileChange(e);
        }}
        multiple={multiple}
      />
      <div className="flex justify-center gap-2.5 flex-wrap">
        {filePreviews.map((fileName, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              padding: "4px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <span>{truncateText(fileName, 28)}</span>
            <Button
              onClick={() => removeFile(index)}
              variant="destructive"
              className="size-6 cursor-pointer aspect-square p-0 absolute top-0.5 right-0.5"
            >
              <XIcon />
            </Button>
          </div>
        ))}
        {filePreviews.length < maxFiles && (
          <div
            onClick={handlePlaceholderClick}
            className="flex items-center justify-center cursor-pointer"
            style={{
              width: "100px",
              height: "100px",
              border: "2px dashed #ccc",
              borderRadius: "5px",
            }}
          >
            <span>Add File</span>
          </div>
        )}
      </div>
    </div>
  );
};
