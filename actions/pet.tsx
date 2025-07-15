"use server";

import { getToken } from "./authActions";

export const getPetFormsData = async () => {
  try {
    const token = await getToken();
    if (!token) return { petData: [], error: "User not logged in" };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PROD_URL}/pets/allPetsForms`,
    );
    const data = await response.json();

    console.log({ data });

    if (data.success) {
      const sortedPets = data.data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      return { petData: [], error: null };
    } else {
      return { petData: [], error: "Failed to fetch pet data" };
    }
  } catch (err) {
    console.log(err);
    return {
      petData: [],
      error: "An error occurred while fetching pet data",
    };
  }
};
