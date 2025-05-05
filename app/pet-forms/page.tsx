"use client";

import React, { useEffect, useState } from "react";

interface Pet {
  id: number;
  ownerId: number;
  registrationNumber: string;
  governmentRegistered: boolean;
  name: string;
  species: string;
  breed: string;
  gender: string;
  sterilized: boolean;
  bio: string;
  image: string;
  additionalImages: string[];
  dateOfBirth: string;
  metaData: {
    age: number;
    size: string;
    color: string;
    weight: number;
  };
  personalityTraits: string[];
  allergies: string[];
  medications: string[];
  createdAt: string;
  documents: {
    ownerIdProof: string;
    imageWithOwner: string;
    vaccinationCard: string;
    sterilizationCard: string;
    veterinaryHealthCard: string;
  };
  age: number;
  size: string;
  color: string;
  weight: number;
  photoUrl: string;
  mergedPdf: string | undefined;
}

const PetFormsPage = () => {
  const [petData, setPetData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const fetchPetData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_PROD_URL}/pets/allPetsForms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        if (data.success) {
          // Sort pets by createdAt date (newest to oldest)
          const sortedPets = data.data.sort(
            (a: Pet, b: Pet) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          setPetData(sortedPets);
        } else {
          setError("Failed to fetch pet data");
        }
      } catch (err) {
        setError("An error occurred while fetching pet data");
      } finally {
        setLoading(false);
      }
    };

    fetchPetData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Pet Profiles
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {petData?.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col overflow-hidden"
          >
            <img
              src={pet?.photoUrl}
              alt={pet?.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/300?text=No+Image";
              }}
            />
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                {pet?.name}
              </h2>
              <p className="text-gray-700 text-sm mb-2">
                {pet?.species} | {pet?.breed} | {pet?.gender}
              </p>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {pet?.bio}
              </p>
              <div className="text-sm text-gray-600 mb-2 grid grid-cols-2 gap-1">
                <p>
                  <span className="font-medium">Born:</span>{" "}
                  {new Date(pet?.dateOfBirth).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Age:</span> {pet?.age} yrs
                </p>
                <p>
                  <span className="font-medium">Color:</span> {pet?.color}
                </p>
                <p>
                  <span className="font-medium">Weight:</span> {pet?.weight} kg
                </p>
              </div>
              <div className="mb-2">
                <h3 className="text-sm font-medium text-gray-800">Traits</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {pet?.personalityTraits?.slice(0, 3)?.map((trait, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              {pet?.allergies.length > 0 && (
                <div className="mb-2">
                  <h3 className="text-sm font-medium text-gray-800">
                    Allergies
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {pet?.allergies?.slice(0, 3)?.map((allergy, index) => (
                      <span
                        key={index}
                        className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {pet?.medications.length > 0 && (
                <div className="mb-2">
                  <h3 className="text-sm font-medium text-gray-800">
                    Medications
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {pet?.medications?.slice(0, 3)?.map((medication, index) => (
                      <span
                        key={index}
                        className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                      >
                        {medication}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-500 text-right">
                Registered: {new Date(pet?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <a
              href={pet?.mergedPdf}
              download
              target="_blank"
              className="text-blue-500 hover:underline mt-2"
            >
              Download PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetFormsPage;
