import { z } from "zod";
import { DocumentSchema, ImageSchema } from "./common";

export const PetFormSchema = z.object({
  applicantName: z.string().min(1, { message: "Applicant name is required." }),
  guardianName: z.string().min(1, { message: "Guardian name is required." }),
  residentialAddress: z
    .string()
    .min(1, { message: "Residential address is required." }),
  name: z.string().min(1, { message: "Pet name is required." }),
  species: z.string().min(1, { message: "Species is required." }),
  breed: z.string(),
  gender: z.string(),
  size: z.string(),
  sterilized: z.boolean().optional(),
  governmentRegistered: z.boolean().optional(),
  registrationNumber: z.string().optional(),
  allergies: z.array(z.string()),
  medications: z.array(z.string()),
  personalityTraits: z.array(z.string()),
  bio: z.string(),
  petProfileImage: ImageSchema,
  dob: z.string(),
  // additionalImages: z.array(ImageSchema),

  ownerIdProof: ImageSchema,
  imageWithOwner: DocumentSchema,
  vaccinationCard: DocumentSchema,
  passport: DocumentSchema,
  veterinaryHealthCard: DocumentSchema,
  sterilizationCard: DocumentSchema,
});
