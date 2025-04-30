"use client";

import { PostType } from "@/components/create-post/CreatePostForm";
import { StandardPostFields } from "@/components/create-post/post-types/StandardPostFields";
import { StoryPostFields } from "@/components/create-post/post-types/StoryPostFields";
import { PollPostFields } from "@/components/create-post/post-types/PollPostFields";
import { LinkPostFields } from "@/components/create-post/post-types/LinkPostFields";
import { CampaignPostFields } from "@/components/create-post/post-types/CampaignPostFields";
import { VolunteerPostFields } from "@/components/create-post/post-types/VolunteerPostFields";
import { NewProfilePostFields } from "@/components/create-post/post-types/NewProfilePostFields";
import { SponsoredPostFields } from "@/components/create-post/post-types/SponsoredPostFields";
import { EmergencyPostFields } from "@/components/create-post/post-types/EmergencyPostFields";

interface PostTypeContentProps {
  type: PostType;
}

export function PostTypeContent({ type }: PostTypeContentProps) {
  // Render the appropriate fields based on post type
  switch (type) {
    case "standard":
      return <StandardPostFields />;
    case "story":
      return <StoryPostFields />;
    case "poll":
      return <PollPostFields />;
    case "link":
      return <LinkPostFields />;
    case "campaign":
      return <CampaignPostFields />;
    case "volunteer":
      return <VolunteerPostFields />;
    case "new_profile":
      return <NewProfilePostFields />;
    case "sponsored":
      return <SponsoredPostFields />;
    case "emergency":
      return <EmergencyPostFields />;
    default:
      return <StandardPostFields />;
  }
}