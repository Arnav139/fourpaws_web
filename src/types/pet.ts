export type Pet = {
  id: string;
  photoUrl?: string;
  name: string;
  species: string;
  breed?: string;
  gender?: string;
  age?: number;
  weight?: number;
  governmentRegistered: boolean;
  bio?: string;
  createdAt: Date;
  personalityTraits?: string[];
  allergies?: string[];
  medications?: string[];
  mergedPdf?: string;
};
