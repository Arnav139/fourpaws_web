export const petFormSteps = [
  {
    label: "Essentials",
    key: "essentials",
    fields: [
      "petProfileImage",
      "name",
      "applicantName",
      "guardianName",
      "residentialAddress",
    ],
  },
  {
    label: "Details",
    key: "details",
    fields: ["breed", "species", "gender", "size", "dob", "weight"],
  },
  {
    label: "Health",
    key: "health",
    fields: [
      "sterilized",
      "governmentRegistered",
      "allergies",
      "medications",
      "specialHealthNeeds",
    ],
  },
  {
    label: "Personality",
    key: "personality",
    fields: ["bio", "personalityTraits"],
  },
  {
    label: "Documents",
    key: "documents",
    fields: [
      "veterinaryHealthCard",
      "vaccinationCard",
      "passport",
      "imageWithOwner",
      "ownerIdProof",
      "sterilizationCard",
    ],
  },
];
