"use client";

import { PawFormField } from "@/components/common/PawFormField";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { InputTags } from "@/components/common/InputTags";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";

export function HealthStep() {
  const [governmentRegistered, setGovernmentRegistered] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-6 h-max items-start">
        <PawFormField
          name="sterilized"
          render={(field) => (
            <div className="inline-flex gap-2 items-center justify-between">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
              <FormLabel>Sterilized</FormLabel>
            </div>
          )}
        />
        <PawFormField
          name="governmentRegistered"
          render={(field) => (
            <div className="inline-flex gap-2 items-center justify-between">
              <Switch
                checked={field.value}
                onCheckedChange={(registered) => {
                  field.onChange(registered);
                  setGovernmentRegistered(registered);
                }}
              />
              <FormLabel>Government Registered</FormLabel>
            </div>
          )}
        />
      </div>

      {governmentRegistered && (
        <PawFormField
          label="Registration Number"
          name="registrationNumber"
          render={(field) => (
            <Input
              placeholder="Registration number"
              defaultValue={field.value}
              onChange={field.onChange}
            />
          )}
        />
      )}

      <PawFormField
        name="allergies"
        label="Allergies (comma-separated)"
        render={(field) => (
          <InputTags
            placeholder="e.g., pollen, dust"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <PawFormField
        name="medications"
        label="Medications (comma-separated)"
        render={(field) => (
          <InputTags
            placeholder="e.g., aspirin, ibuprofen"
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <PawFormField
        name="specialHealthNeeds"
        label="Special Health Needs"
        render={(field) => (
          <Textarea
            placeholder="Describe any special health needs"
            defaultValue={field.value}
            onChange={field.onChange}
          />
        )}
      />
    </>
  );
}
