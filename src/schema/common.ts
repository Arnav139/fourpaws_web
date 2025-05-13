import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/lib/config";
import { z } from "zod";

export const ImageSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine((file) => {
    console.log({ file });
    return ACCEPTED_IMAGE_TYPES.includes(file?.type);
  }, "Only .jpg, .jpeg, .png and .webp formats are supported.");

export const DocumentSchema = z
  .any()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max document size is 5MB.`)
  .refine(
    (file) => [...ACCEPTED_IMAGE_TYPES, "application/pdf"].includes(file?.type),
    "Only .pdf, .jpg, .jpeg, .png and .webp formats are supported.",
  );
