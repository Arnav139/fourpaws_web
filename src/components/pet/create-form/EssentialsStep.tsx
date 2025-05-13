"use client";

import { ImagePicker } from "@/components/common/ImagePicker";
import { PawFormField } from "@/components/common/PawFormField";
import { Input } from "@/components/ui/input";

export function EssentialsStep() {
  return (
    <>
      <PawFormField
        label="Pet Profile Image"
        name="petProfileImage"
        render={(field) => (
          <ImagePicker
            defaultImages={field.value ? [field.value as File] : []}
            onImageChange={(files) => field.onChange(files?.[0] || null)}
          />
        )}
      />
      <PawFormField
        label="Pet Name"
        name="name"
        render={(field) => (
          <Input
            placeholder="Pet name"
            defaultValue={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <PawFormField
        label="Applicant Name"
        name="applicantName"
        render={(field) => (
          <Input
            placeholder="Applicant name"
            defaultValue={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <PawFormField
        label="Guardian Name"
        name="guardianName"
        render={(field) => (
          <Input
            placeholder="Guardian name"
            defaultValue={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <PawFormField
        label="Residential Address"
        name="residentialAddress"
        render={(field) => (
          <Input
            placeholder="Residential address"
            defaultValue={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </>
  );
}
