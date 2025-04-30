"use client";

import { FileText, Pencil, BarChart, Link as LinkIcon, Megaphone, CalendarCheck, PawPrint as Paw, DollarSign, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PostType } from "@/components/create-post/CreatePostForm";
import { cn } from "@/lib/utils";

interface PostTypeSelectorProps {
  currentType: PostType;
  onTypeChange: (type: PostType) => void;
}

interface PostTypeOption {
  value: PostType;
  label: string;
  icon: React.ReactNode;
  description: string;
}

export function PostTypeSelector({ currentType, onTypeChange }: PostTypeSelectorProps) {
  const postTypes: PostTypeOption[] = [
    {
      value: "standard",
      label: "Standard",
      icon: <Pencil className="h-4 w-4" />,
      description: "Regular text post with optional image",
    },
    {
      value: "story",
      label: "Story",
      icon: <FileText className="h-4 w-4" />,
      description: "Share a story with image or video",
    },
    {
      value: "poll",
      label: "Poll",
      icon: <BarChart className="h-4 w-4" />,
      description: "Create a poll for your audience",
    },
    {
      value: "link",
      label: "Link",
      icon: <LinkIcon className="h-4 w-4" />,
      description: "Share a link with your audience",
    },
    {
      value: "campaign",
      label: "Campaign",
      icon: <Megaphone className="h-4 w-4" />,
      description: "Start a fundraising campaign",
    },
    {
      value: "volunteer",
      label: "Volunteer",
      icon: <CalendarCheck className="h-4 w-4" />,
      description: "Request volunteer help",
    },
    {
      value: "new_profile",
      label: "New Profile",
      icon: <Paw className="h-4 w-4" />,
      description: "Create a new pet profile",
    },
    {
      value: "sponsored",
      label: "Sponsored",
      icon: <DollarSign className="h-4 w-4" />,
      description: "Create a sponsored post",
    },
    {
      value: "emergency",
      label: "Emergency",
      icon: <AlertTriangle className="h-4 w-4" />,
      description: "Report a lost pet or emergency",
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Post Type</h3>
        <p className="text-sm text-muted-foreground">
          Select the type of post you want to create
        </p>
      </div>
      
      <RadioGroup
        defaultValue={currentType}
        onValueChange={(value) => onTypeChange(value as PostType)}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
      >
        {postTypes.map((type) => (
          <div key={type.value}>
            <RadioGroupItem
              value={type.value}
              id={`post-type-${type.value}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`post-type-${type.value}`}
              className={cn(
                "flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all",
                currentType === type.value ? "border-primary bg-accent/50" : ""
              )}
            >
              <div className="flex flex-col items-center gap-1">
                {type.icon}
                <span className="mt-1 font-medium">{type.label}</span>
              </div>
              <span className="text-xs text-center text-muted-foreground mt-2">
                {type.description}
              </span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}