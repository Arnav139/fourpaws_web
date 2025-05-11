"use client";

import { FilePicker } from "@/components/common/FilePicker";
import { ImagePicker } from "@/components/common/ImagePicker";
import { PawFormField } from "@/components/common/PawFormField";

export const documents = [
  { name: "ownerIdProof", label: "Owner ID Proof", type: "file" },
  { name: "imageWithOwner", label: "Image of Owner with Pet", type: "image" },
  { name: "vaccinationCard", label: "Vaccination Card", type: "file" },
  { name: "passport", label: "Passport of Pet", type: "file" },
  {
    name: "veterinaryHealthCard",
    label: "Veterinary Health Card",
    type: "file",
  },
  { name: "sterilizationCard", label: "Sterilization Card", type: "file" },
];

export function DocumentsStep() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {documents.map(({ name, label, type }) => (
        <PawFormField
          key={name}
          name={name}
          label={label}
          render={(field) =>
            type === "image" ? (
              <ImagePicker
                onImageChange={(files) => field.onChange(files?.[0] || null)}
              />
            ) : (
              <FilePicker
                onFileChange={(files) => field.onChange(files?.[0] || null)}
              />
            )
          }
        />
      ))}
    </div>
  );
}
