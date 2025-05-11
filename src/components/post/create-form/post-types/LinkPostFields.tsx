"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LinkIcon } from "lucide-react";

export function LinkPostFields() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="linkUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Link URL</FormLabel>
            <FormControl>
              <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                <Input
                  className="border-0 p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="https://example.com"
                  {...field}
                />
              </div>
            </FormControl>
            <FormDescription>
              Enter the full URL including https://
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
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe this link..."
                className="resize-y"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}