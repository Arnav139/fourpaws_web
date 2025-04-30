"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash2 } from "lucide-react";

export function PollPostFields() {
  const { control, watch, setValue } = useFormContext();
  const pollOptions = watch("pollOptions") || ["", ""];
  const pollDuration = watch("pollDuration") || 24;

  const handleAddOption = () => {
    setValue("pollOptions", [...pollOptions, ""]);
  };

  const handleRemoveOption = (index: number) => {
    if (pollOptions.length <= 2) return; // Maintain minimum 2 options
    const newOptions = [...pollOptions];
    newOptions.splice(index, 1);
    setValue("pollOptions", newOptions);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setValue("pollOptions", newOptions);
  };

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Poll Question</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Ask a question..."
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <FormLabel>Poll Options</FormLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddOption}
            className="h-8"
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add Option
          </Button>
        </div>
        <FormDescription>Add at least 2 options for your poll.</FormDescription>

        <div className="space-y-3">
          {pollOptions.map((option, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveOption(index)}
                disabled={pollOptions.length <= 2}
                className="shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <FormField
        control={control}
        name="pollDuration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Poll Duration (hours)</FormLabel>
            <div className="space-y-2">
              <FormControl>
                <Slider
                  min={1}
                  max={168} // 1 week in hours
                  step={1}
                  value={[field.value]}
                  onValueChange={(values) => field.onChange(values[0])}
                />
              </FormControl>
              <div className="flex justify-between">
                <span className="text-xs text-muted-foreground">1 hour</span>
                <span className="text-sm font-medium">{field.value} hours</span>
                <span className="text-xs text-muted-foreground">1 week</span>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}