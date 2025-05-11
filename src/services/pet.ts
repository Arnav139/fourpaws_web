import { getToken } from "@/actions/auth";
import ApiClient from "./api";
import { Pet } from "@/types/pet";

const api = new ApiClient(process.env.NEXT_PUBLIC_PROD_URL!, getToken);

export const petService = {
  getPetForms: async () => {
    return api.get<{ data: Pet[] }>("/pets/allPetsForms", {
      cache: "force-cache",
    });
  },
  createPet: async (formData: FormData) => {
    return api.post("/pets/new", formData);
  },
};
