"use client";

import { PostType } from "@/components/post/create-form/CreatePostForm";
import { StandardPostFields } from "@/components/post/create-form/post-types/StandardPostFields";
import { StoryPostFields } from "@/components/post/create-form/post-types/StoryPostFields";
import { PollPostFields } from "@/components/post/create-form/post-types/PollPostFields";
import { LinkPostFields } from "@/components/post/create-form/post-types/LinkPostFields";
import { CampaignPostFields } from "@/components/post/create-form/post-types/CampaignPostFields";
import { VolunteerPostFields } from "@/components/post/create-form/post-types/VolunteerPostFields";
import { NewProfilePostFields } from "@/components/post/create-form/post-types/NewProfilePostFields";
import { SponsoredPostFields } from "@/components/post/create-form/post-types/SponsoredPostFields";
import { EmergencyPostFields } from "@/components/post/create-form/post-types/EmergencyPostFields";

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
