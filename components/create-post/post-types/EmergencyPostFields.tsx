"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle } from "lucide-react";

export function EmergencyPostFields() {
  const { control, watch } = useFormContext();
  const isCritical = watch("isCritical");
  const emergencyType = watch("emergencyType");

  const emergencyTypes = [
    "PawwLice Alert",  
    "Medical Emergency",
  ];

  return (
    <div className="space-y-6">
      <div className={isCritical ? "p-4 border border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-900 rounded-lg" : "hidden"}>
        <div className="flex gap-2 items-center text-red-600 dark:text-red-400">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-semibold">Critical Emergency</span>
        </div>
        <p className="text-sm mt-1 text-red-600/80 dark:text-red-400/80">
          This post will be highlighted as a critical emergency.
        </p>
      </div>
    
      <FormField
        control={control}
        name="emergencyType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emergency Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select emergency type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {emergencyTypes.map(type => (
                  <SelectItem key={type} value={type.toLowerCase().replace(' ', '_')}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="petName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pet Name</FormLabel>
            <FormControl>
              <Input placeholder="Name of the pet (if applicable)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {emergencyType === 'pawwlice_alert' ? (
        <FormField
          control={control}
          name="lastSeen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Seen Location</FormLabel>
              <FormControl>
                <Input placeholder="Where was the pet last seen?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <FormField
          control={control}
          name="symptoms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Symptoms/Condition</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the symptoms or condition..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name="contactPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Contact Phone</FormLabel>
            <FormControl>
              <Input placeholder="Phone number for contact" {...field} />
            </FormControl>
            <FormDescription>
              Number that people can call if they have information
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="isCritical"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Critical Emergency</FormLabel>
              <FormDescription>
                Mark this as a critical emergency to highlight it prominently
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Emergency Details</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Provide detailed information about the emergency..."
                className="min-h-[120px] resize-y"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="text-sm text-muted-foreground mt-2">
        Consider adding a photo in the Media tab to help with identification.
      </div>
    </div>
  );
}