"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LinkIcon } from "lucide-react";

export function SponsoredPostFields() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="sponsorName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sponsor Name</FormLabel>
            <FormControl>
              <Input placeholder="Name of the sponsoring organization" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="adLink"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Advertisement Link</FormLabel>
            <FormControl>
              <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                <Input
                  className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="https://sponsor-website.com"
                  {...field}
                />
              </div>
            </FormControl>
            <FormDescription>
              Link to the sponsor's website or landing page
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ad Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe the sponsored content..."
                className="min-h-[120px] resize-y"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="text-sm text-muted-foreground mt-2">
        Don't forget to upload the sponsor's logo in the Media tab!
      </div>
    </div>
  );
}