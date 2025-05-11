"use client";

import { Badge } from "../ui/badge";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Pet } from "@/types/pet";

export default function PetCard({ pet }: { pet: Pet }) {
  return (
    <Card className="overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-lg">
      <CardContent className="flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-lg bg-background aspect-[4/3]">
          <Image
            width={400}
            height={300}
            src={pet.photoUrl || "https://via.placeholder.com/400x300?text=No+Image"}
            alt={pet.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
          <div className="absolute top-2 left-2 rounded bg-primary/80 text-primary-foreground text-xs font-semibold px-2 py-0.5 select-none">
            {pet.species}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-muted-foreground">
          <h2 className="text-lg font-bold truncate">{pet.name}</h2>
          <p className="text-sm line-clamp-2">{pet.bio || "No description available."}</p>

          <div className="flex flex-wrap gap-2 mt-1">
            <Badge>Breed: {pet.breed}</Badge>
            <Badge>Age: {pet.age} yrs</Badge>
            <Badge>Weight: {pet.weight} kg</Badge>
          </div>

          {pet.personalityTraits && pet.personalityTraits.length > 0 && (
            <div>
              <h3 className={cn("font-semibold mt-2")}>Personality Traits:</h3>
              <div className={cn("flex flex-wrap gap-1 mt-1")}>
                {pet.personalityTraits.map((trait, idx) => (
                  <Badge key={idx} className="bg-yellow-200 text-yellow-900">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {pet.allergies && pet.allergies.length > 0 && (
            <div>
              <h3 className={cn("font-semibold mt-2")}>Allergies:</h3>
              <div className={cn("flex flex-wrap gap-1 mt-1")}>
                {pet.allergies.map((allergy, idx) => (
                  <Badge key={idx} className="bg-red-200 text-red-900">
                    {allergy}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {pet.medications && pet.medications.length > 0 && (
            <div>
              <h3 className={cn("font-semibold mt-2")}>Medications:</h3>
              <div className={cn("flex flex-wrap gap-1 mt-1")}>
                {pet.medications.map((med, idx) => (
                  <Badge key={idx} className="bg-green-200 text-green-900">
                    {med}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 text-xs text-muted-foreground text-right select-none">
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
          className="block text-center text-sm text-primary hover:underline font-semibold border-t py-2 rounded-b-lg select-none"
        >
          Download PDF
        </a>
      )}
    </Card>
  );
}
