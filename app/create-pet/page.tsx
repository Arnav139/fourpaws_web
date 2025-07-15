"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { petSpecies, petSizes, petGenders } from "@/lib/config";

type PetCreationStep =
  | "essentials"
  | "details"
  | "health"
  | "personality"
  | "documents"
  | "review";

interface PetFormData {
  name: string;
  species: string;
  breed?: string;
  gender?: string;
  age?: string;
  color?: string;
  weight?: number;
  sterilized: boolean;
  photoUrl?: string;
  dateOfBirth?: string;
  size?: string;
  bio?: string;
  registrationNumber?: string;
  governmentRegistered: boolean;
  allergies: string[];
  medications: string[];
  personalityTraits: string[];
}

const initialFormData: PetFormData = {
  name: "",
  species: "",
  sterilized: false,
  governmentRegistered: false,
  allergies: [],
  medications: [],
  personalityTraits: [],
};

export default function CreatePetPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<PetCreationStep>("essentials");
  const [formData, setFormData] = useState<PetFormData>(initialFormData);

  const steps: PetCreationStep[] = [
    "essentials",
    "details",
    "health",
    "personality",
    "documents",
    "review",
  ];

  const updateFormData = (field: keyof PetFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    console.log("Submitting pet profile:", formData);
    router.push("/pets");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "essentials":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Allicant Name</Label>
              <Input
                id="name"
                placeholder="Applicant name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className="border-2 border-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Guardian Name</Label>
              <Input
                id="name"
                placeholder="Guardian name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className="border-2 border-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Residential Address</Label>
              <Input
                id="residentialAddress"
                placeholder="Residential Address"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className="border-2 border-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Pet Name</Label>
              <Input
                id="name"
                placeholder="Pet name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className="border-2 border-black"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="species">Species</Label>
              <Select
                value={formData.species}
                onValueChange={(value) => updateFormData("species", value)}
              >
                <SelectTrigger className="border-2 border-black">
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  {petSpecies.map((species) => (
                    <SelectItem key={species} value={species.toLowerCase()}>
                      {species}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "details":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="breed">Breed</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) => updateFormData("breed", e.target.value)}
                className="border-2 border-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => updateFormData("gender", value)}
              >
                <SelectTrigger className="border-2 border-black">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {petGenders.map((gender) => (
                    <SelectItem key={gender} value={gender.toLowerCase()}>
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Select
                value={formData.size}
                onValueChange={(value) => updateFormData("size", value)}
              >
                <SelectTrigger className="border-2 border-black">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {petSizes.map((size) => (
                    <SelectItem key={size} value={size.toLowerCase()}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "health":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sterilized">Sterilized</Label>
              <Switch
                id="sterilized"
                checked={formData.sterilized}
                onCheckedChange={(checked) =>
                  updateFormData("sterilized", checked)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies (comma-separated)</Label>
              <Input
                id="allergies"
                value={formData.allergies.join(", ")}
                onChange={(e) =>
                  updateFormData("allergies", e.target.value.split(", "))
                }
                className="border-2 border-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medications">Medications (comma-separated)</Label>
              <Input
                id="medications"
                value={formData.medications.join(", ")}
                onChange={(e) =>
                  updateFormData("medications", e.target.value.split(", "))
                }
                className="border-2 border-black"
              />
            </div>
          </div>
        );

      case "personality":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => updateFormData("bio", e.target.value)}
                className="border-2 border-black"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="traits">
                Personality Traits (comma-separated)
              </Label>
              <Input
                id="traits"
                value={formData.personalityTraits.join(", ")}
                onChange={(e) =>
                  updateFormData(
                    "personalityTraits",
                    e.target.value.split(", "),
                  )
                }
                className="border-2 border-black"
              />
            </div>
          </div>
        );

      case "documents":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="registered">Government Registered</Label>
              <Switch
                id="registered"
                checked={formData.governmentRegistered}
                onCheckedChange={(checked) =>
                  updateFormData("governmentRegistered", checked)
                }
              />
            </div>
            {formData.governmentRegistered && (
              <div className="space-y-2">
                <Label htmlFor="regNumber">Registration Number</Label>
                <Input
                  id="regNumber"
                  value={formData.registrationNumber}
                  onChange={(e) =>
                    updateFormData("registrationNumber", e.target.value)
                  }
                  className="border-2 border-black"
                />
              </div>
            )}
          </div>
        );

      case "review":
        return (
          <div className="space-y-4">
            <h3 className="font-bold">Review Pet Profile</h3>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Species:</strong> {formData.species}
              </p>
              <p>
                <strong>Breed:</strong> {formData.breed}
              </p>
              <p>
                <strong>Gender:</strong> {formData.gender}
              </p>
              <p>
                <strong>Size:</strong> {formData.size}
              </p>
              <p>
                <strong>Sterilized:</strong>{" "}
                {formData.sterilized ? "Yes" : "No"}
              </p>
              <p>
                <strong>Government Registered:</strong>{" "}
                {formData.governmentRegistered ? "Yes" : "No"}
              </p>
              {formData.governmentRegistered && (
                <p>
                  <strong>Registration Number:</strong>{" "}
                  {formData.registrationNumber}
                </p>
              )}
              <p>
                <strong>Bio:</strong> {formData.bio}
              </p>
              <p>
                <strong>Allergies:</strong>{" "}
                {formData.allergies.join(", ") || "None"}
              </p>
              <p>
                <strong>Medications:</strong>{" "}
                {formData.medications.join(", ") || "None"}
              </p>
              <p>
                <strong>Personality Traits:</strong>{" "}
                {formData.personalityTraits.join(", ") || "None"}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Pet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`flex items-center ${
                    index === steps.length - 1 ? "" : "flex-1"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center ${
                      steps.indexOf(currentStep) >= index
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        steps.indexOf(currentStep) > index
                          ? "bg-primary"
                          : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 text-center text-sm font-medium">
              {currentStep.charAt(0).toUpperCase() + currentStep.slice(1)}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === "essentials"}
              >
                Back
              </Button>
              {currentStep === "review" ? (
                <Button type="submit">Submit</Button>
              ) : (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
