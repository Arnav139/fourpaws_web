import { z } from "zod";

// Add size validation for images and videos
const MAX_IMAGE_SIZE_MB = 2;
const MAX_VIDEO_SIZE_MB = 20;

function isValidFileSize(file: { size: number } | null, maxSizeMB: number) {
  if (!file) return true; // If no file, it's valid
  const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
  return fileSizeMB <= maxSizeMB;
}

// Base post schema that all posts share
export const basePostSchema = z.object({
  content: z.string().optional(),
  type: z.enum([
    "standard", 
    "story", 
    "poll", 
    "link", 
    "campaign", 
    "volunteer", 
    "new_profile", 
    "sponsored", 
    "emergency"
  ]),
  postImage: z.any().optional().refine(
    (file) => isValidFileSize(file, MAX_IMAGE_SIZE_MB),
    {
      message: `Image size should not exceed ${MAX_IMAGE_SIZE_MB}MB`,
      path: ["postImage"],
    }
  ),
  postVideo: z.any().optional().refine(
    (file) => isValidFileSize(file, MAX_VIDEO_SIZE_MB),
    {
      message: `Video size should not exceed ${MAX_VIDEO_SIZE_MB}MB`,
      path: ["postVideo"],
    }
  ),
  
  // Poll type fields
  pollOptions: z.array(z.string()).optional(),
  pollDuration: z.number().positive().optional(),
  
  // Link type fields
  linkUrl: z.string().url().optional(),
  
  // Campaign type fields
  campaignTitle: z.string().optional(),
  campaignGoal: z.number().positive().optional(),
  deadline: z.string().optional(), // Date as ISO string
  
  // Volunteer type fields
  volunteerRole: z.string().optional(),
  eventDate: z.string().optional(), // Date as ISO string
  location: z.string().optional(),
  
  // New Profile type fields
  petProfileId: z.string().optional(),
  petName: z.string().optional(),
  petBreed: z.string().optional(),
  customBreed: z.string().optional(),
  petAge: z.number().positive().optional(),
  
  // Sponsored type fields
  sponsorName: z.string().optional(),
  sponsorLogo: z.any().optional(),
  adLink: z.string().url().optional(),
  adDescription: z.string().optional(),
  
  // Emergency type fields
  emergencyType: z.string().optional(),
  lastSeen: z.string().optional(),
  contactPhone: z.string().optional(),
  isCritical: z.boolean().optional(),
});

// Refined schemas for each post type with specific validations
export const standardPostSchema = basePostSchema.refine(
  (data) => {
    if (data.type !== "standard") return true;
    return !!data.content || !!data.postImage;
  },
  {
    message: "Standard posts require either content or an image",
    path: ["content"],
  }
);

export const storyPostSchema = basePostSchema.refine(
  (data) => {
    if (data.type !== "story") return true;
    return !!data.postImage || !!data.postVideo;
  },
  {
    message: "Story posts require either an image or video",
    path: ["postImage"],
  }
);

export const pollPostSchema = basePostSchema
  .refine(
    (data) => {
      if (data.type !== "poll") return true;
      return !!data.content;
    },
    {
      message: "Poll posts require a question",
      path: ["content"],
    }
  )
  .refine(
    (data) => {
      if (data.type !== "poll") return true;
      return Array.isArray(data.pollOptions) && data.pollOptions.length >= 2;
    },
    {
      message: "Poll posts require at least 2 options",
      path: ["pollOptions"],
    }
  )
  .refine(
    (data) => {
      if (data.type !== "poll") return true;
      return !!data.pollDuration && data.pollDuration > 0;
    },
    {
      message: "Poll posts require a positive duration",
      path: ["pollDuration"],
    }
  );

export const linkPostSchema = basePostSchema.refine(
  (data) => {
    if (data.type !== "link") return true;
    return !!data.linkUrl;
  },
  {
    message: "Link posts require a valid URL",
    path: ["linkUrl"],
  }
);

export const campaignPostSchema = basePostSchema
  .refine(
    (data) => {
      if (data.type !== "campaign") return true;
      return !!data.campaignTitle;
    },
    {
      message: "Campaign posts require a title",
      path: ["campaignTitle"],
    }
  )
  .refine(
    (data) => {
      if (data.type !== "campaign") return true;
      return !!data.campaignGoal && data.campaignGoal > 0;
    },
    {
      message: "Campaign posts require a positive goal amount",
      path: ["campaignGoal"],
    }
  )
  .refine(
    (data) => {
      if (data.type !== "campaign") return true;
      return !!data.deadline;
    },
    {
      message: "Campaign posts require a deadline",
      path: ["deadline"],
    }
  );

export const volunteerPostSchema = basePostSchema
  .refine(
    (data) => {
      if (data.type !== "volunteer") return true;
      return !!data.volunteerRole;
    },
    {
      message: "Volunteer posts require a role",
      path: ["volunteerRole"],
    }
  )
  .refine(
    (data) => {
      if (data.type !== "volunteer") return true;
      return !!data.eventDate;
    },
    {
      message: "Volunteer posts require an event date",
      path: ["eventDate"],
    }
  )
  .refine(
    (data) => {
      if (data.type !== "volunteer") return true;
      return !!data.location;
    },
    {
      message: "Volunteer posts require a location",
      path: ["location"],
    }
  );

export const newProfilePostSchema = basePostSchema
  .refine(
    (data) => {
      if (data.type !== "new_profile") return true;
      return !!data.petName;
    },
    {
      message: "New profile posts require a pet name",
      path: ["petName"],
    }
  )
  .refine(
    (data) => {
      if (data.type !== "new_profile") return true;
      return (!!data.petBreed && data.petBreed !== "other_custom") || !!data.customBreed;
    },
    {
      message: "New profile posts require a pet breed",
      path: ["petBreed"],
    }
  )
  .refine(
    (data) => {
      if (data.type !== "new_profile") return true;
      return !!data.postImage;
    },
    {
      message: "New profile posts require a pet image",
      path: ["postImage"],
    }
  );

export const sponsoredPostSchema = basePostSchema
  .refine(
    (data) => {
      if (data.type !== "sponsored") return true;
      return !!data.sponsorName;
    },
    {
      message: "Sponsored posts require a sponsor name",
      path: ["sponsorName"],
    }
  )
  .refine(
    (data) => {
      if (data.type !== "sponsored") return true;
      return !!data.adLink;
    },
    {
      message: "Sponsored posts require an ad link",
      path: ["adLink"],
    }
  );

export const emergencyPostSchema = basePostSchema
  .refine(
    (data) => {
      if (data.type !== "emergency") return true;
      return !!data.emergencyType;
    },
    {
      message: "Emergency posts require an emergency type",
      path: ["emergencyType"],
    }
  )
  .refine(
    (data) => {
      if (data.type !== "emergency") return true;
      return !!data.petName;
    },
    {
      message: "Emergency posts require a pet name",
      path: ["petName"],
    }
  )
  .refine(
    (data) => {
      if (data.type !== "emergency") return true;
      return !!data.lastSeen;
    },
    {
      message: "Emergency posts require a last seen location",
      path: ["lastSeen"],
    }
  )
  .refine(
    (data) => {
      if (data.type !== "emergency") return true;
      return !!data.contactPhone;
    },
    {
      message: "Emergency posts require a contact phone",
      path: ["contactPhone"],
    }
  );

// Combined schema for form validation
export const postFormSchema = z.union([
  standardPostSchema,
  storyPostSchema,
  pollPostSchema,
  linkPostSchema,
  campaignPostSchema,
  volunteerPostSchema,
  newProfilePostSchema,
  sponsoredPostSchema,
  emergencyPostSchema,
]);