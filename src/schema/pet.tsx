import { z } from "zod";
import { DocumentSchema, ImageSchema } from "./common";

export const PetFormSchema = z.object({
  applicantName: z
    .string()
    .min(1, { message: "Applicant name is required and cannot be empty." }),
  guardianName: z
    .string()
    .min(1, { message: "Guardian name is required and must be provided." }),
  residentialAddress: z.string().min(1, {
    message: "Residential address is required and cannot be empty.",
  }),
  name: z
    .string()
    .min(1, { message: "Pet name is required and must be filled in." }),
  species: z
    .string()
    .min(1, { message: "Species is required and cannot be empty." }),
  breed: z.string().min(1, { message: "Breed information is required." }),
  gender: z.string().min(1, { message: "Gender must be specified." }),
  size: z.string().min(1, { message: "Size must be specified." }),
  weight: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "Weight must be a valid number.",
    })
    .transform(parseFloat),
  sterilized: z.boolean().optional(),
  governmentRegistered: z.boolean().optional(),
  registrationNumber: z.string().optional(),
  allergies: z
    .array(z.string())
    .min(1, { message: "Allergy information cannot be empty." }),
  medications: z
    .array(z.string())
    .min(1, { message: "Medication information cannot be empty." }),
  personalityTraits: z
    .array(z.string())
    .min(1, { message: "Personality traits cannot be empty." }),
  bio: z.string().min(1, { message: "A bio must be provided." }),
  petProfileImage: ImageSchema,
  dob: z.any(),

  additionalImages: z.any().optional(),
    // .nullable()
    // .refine((v) => v != null, {
    //   message: "Date of birth must be a valid date.",
    // }),
  // additionalImages: z.array(ImageSchema),

  ownerIdProof: DocumentSchema,
  imageWithOwner: ImageSchema,
  vaccinationCard: DocumentSchema,
  passport: DocumentSchema,
  veterinaryHealthCard: DocumentSchema,
  sterilizationCard: DocumentSchema,
});
