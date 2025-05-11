"use client";

import { PawFormField } from "@/components/common/PawFormField";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { InputTags } from "@/components/common/InputTags";

export function HealthStep() {
  return (
    <>
      <PawFormField
        name="sterilized"
        label="Sterilized"
        render={(field) => (
          <div className="flex items-center justify-between">
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </div>
        )}
      />
      <PawFormField
        name="allergies"
        label="Allergies (comma-separated)"
        render={(field) => (
          <InputTags placeholder="e.g., pollen, dust" {...field} />
        )}
      />
      <PawFormField
        name="medications"
        label="Medications (comma-separated)"
        render={(field) => (
          <InputTags placeholder="e.g., aspirin, ibuprofen" {...field} />
        )}
      />
      <PawFormField
        name="specialHealthNeeds"
        label="Special Health Needs"
        render={(field) => (
          <Textarea
            placeholder="Describe any special health needs"
            {...field}
          />
        )}
      />
    </>
  );
}
