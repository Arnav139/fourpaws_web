"use client";

import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface PostCardProps {
  id: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: string;
  type: PostType;
}

export type PostType =
  | "standard"
  | "story"
  | "poll"
  | "link"
  | "campaign"
  | "volunteer"
  | "new_profile"
  | "sponsored"
  | "emergency";

const postTypeLabels: Record<PostType, string> = {
  standard: "Standard",
  story: "Story",
  poll: "Poll",
  link: "Link",
  campaign: "Campaign",
  volunteer: "Volunteer",
  new_profile: "New Profile",
  sponsored: "Sponsored",
  emergency: "Emergency",
};

export function PostCard({ id, authorName, authorAvatar, content, createdAt, type }: PostCardProps) {
  return (
    <Card className="max-w-md mx-auto rounded-lg bg-white shadow-sm dark:bg-orange-900 dark:text-orange-200">
      <CardHeader className="flex items-center gap-4 p-4">
        {authorAvatar ? (
          <img
            src={authorAvatar}
            alt={authorName}
            className="h-12 w-12 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/48?text=User";
            }}
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-orange-400 flex items-center justify-center text-white font-bold uppercase">
            {authorName.charAt(0)}
          </div>
        )}
        <div>
          <CardTitle className="text-lg font-semibold">{authorName}</CardTitle>
          <CardDescription className="text-sm text-orange-600 dark:text-orange-400">
            {new Date(createdAt).toLocaleDateString()}
          </CardDescription>
        </div>
        <Badge className="ml-auto" variant="outline">
          {postTypeLabels[type]}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 text-orange-900 dark:text-orange-200">
        {content}
      </CardContent>
    </Card>
  );
}

import { Pencil, FileText, BarChart, Link as LinkIcon, Megaphone, CalendarCheck, PawPrint, DollarSign, AlertTriangle } from "lucide-react";

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
      icon: <PawPrint className="h-4 w-4" />,
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

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {postTypes.map((type) => (
          <label
            key={type.value}
            htmlFor={`post-type-${type.value}`}
            className={`cursor-pointer rounded-md border-2 p-4 transition-all hover:bg-accent hover:text-accent-foreground ${
              currentType === type.value ? "border-primary bg-accent/50" : "border-muted"
            } flex flex-col items-center justify-between`}
          >
            <input
              type="radio"
              id={`post-type-${type.value}`}
              name="postType"
              value={type.value}
              checked={currentType === type.value}
              onChange={() => onTypeChange(type.value)}
              className="hidden peer"
            />
            <div className="flex flex-col items-center gap-1">
              {type.icon}
              <span className="mt-1 font-medium">{type.label}</span>
            </div>
            <span className="text-xs mt-2 text-center text-muted-foreground">
              {type.description}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}