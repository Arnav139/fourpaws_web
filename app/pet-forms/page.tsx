import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { fetchWithAuth } from "@/services/clientApi";
import Spinner from "@/components/common/Spinner";
import Image from "next/image";
import { getPetFormsData } from "@/actions/pet";

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  color: string;
  weight: number;
  photoUrl: string;
  bio: string;
  personalityTraits: string[];
  allergies: string[];
  medications: string[];
  createdAt: string;
  mergedPdf?: string;
}

// const getPetFormsData = async () => {
//   try {
//     const response = await fetchWithAuth(
//       `${process.env.NEXT_PUBLIC_PROD_URL}/pets/allPetsForms`,
//     );
//     const data = await response.json();

//     console.log({ data });

//     if (data.success) {
//       const sortedPets = data.data.sort(
//         (a: Pet, b: Pet) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
//       );
//       return { petData: [], error: null };
//     } else {
//       return { petData: [], error: "Failed to fetch pet data" };
//     }
//   } catch (err) {
//     console.log(err);
//     return {
//       petData: [],
//       error: "An error occurred while fetching pet data",
//     };
//   }
// };

// export const dynamic = "force-dynamic";

export default async function PetFormsPage({
  params,
}: {
  params: Promise<void>;
}) {
  const pageParams = await params;
  const { petData, error } = await getPetFormsData();

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  if (petData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-orange-900 dark:text-orange-300 select-none px-4 text-center">
        <div className="mb-6 text-6xl animate-bounce">🐾</div>
        <h2 className="text-3xl font-extrabold mb-2">No Pets Found</h2>
        <p className="max-w-md text-lg">
          There are no pet profiles available. Please create a new pet profile
          to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-orange-900 dark:text-orange-200 select-none">
        Pet Profiles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {petData.map((pet) => (
          <Card
            key={pet.id}
            className={cn(
              "overflow-hidden border-4 border-orange-600 hover:shadow-lg transition-shadow relative bg-orange-100 dark:bg-orange-900 dark:border-orange-700 rounded-lg",
            )}
          >
            <CardContent className="p-3 flex flex-col gap-3">
              <div className="relative bg-white rounded-lg shadow-inner overflow-hidden aspect-[4/3]">
                <Image
                  src={pet.photoUrl}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
                <div className="absolute top-2 left-2 rounded bg-orange-600 bg-opacity-90 text-orange-50 text-xs font-bold px-2 py-0.5 select-none">
                  {pet.species}
                </div>
              </div>

              <div className="flex flex-col gap-1 text-orange-900 dark:text-orange-300">
                <h2 className="text-xl font-bold truncate">{pet.name}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {pet.bio || "No description available."}
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge
                    variant="default"
                    className="bg-orange-200 dark:bg-orange-700 text-orange-700 dark:text-orange-300 px-2 py-0.5"
                  >
                    Breed: {pet.breed}
                  </Badge>
                  <Badge
                    variant="default"
                    className="bg-orange-200 dark:bg-orange-700 text-orange-700 dark:text-orange-300 px-2 py-0.5"
                  >
                    Age: {pet.age} yrs
                  </Badge>
                  <Badge
                    variant="default"
                    className="bg-orange-200 dark:bg-orange-700 text-orange-700 dark:text-orange-300 px-2 py-0.5"
                  >
                    Weight: {pet.weight} kg
                  </Badge>
                </div>

                {pet.personalityTraits.length > 0 && (
                  <div>
                    <h3 className="font-semibold mt-2">Personality Traits:</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {pet.personalityTraits.map((trait, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded bg-yellow-200 text-yellow-900"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {pet.allergies.length > 0 && (
                  <div>
                    <h3 className="font-semibold mt-2">Allergies:</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {pet.allergies.map((allergy, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded bg-red-200 text-red-900"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {pet.medications.length > 0 && (
                  <div>
                    <h3 className="font-semibold mt-2">Medications:</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {pet.medications.map((med, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 rounded bg-green-200 text-green-900"
                        >
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-3 text-xs text-orange-700 dark:text-orange-400 text-right select-none">
                  Registered: {new Date(pet.createdAt).toLocaleDateString()}
                </div>
              </div>
            </CardContent>

            {pet.mergedPdf && (
              <a
                href={pet.mergedPdf}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-orange-700 dark:text-orange-300 hover:underline font-semibold border-t border-orange-600 dark:border-orange-700 py-2 rounded-b-lg select-none"
              >
                Download PDF
              </a>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
