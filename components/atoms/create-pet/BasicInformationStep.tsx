import React, { useState } from "react";
import PawsText from "@/components/atoms/ui/PawsText";
import PawsInput from "@/components/atoms/ui/PawsInput";
import PawsButton from "@/components/atoms/ui/PawsButton";
import PawsSelect from "@/components/atoms/ui/PawsSelect";
import { usePetCreation } from "../../context/PetCreationContext";
import { Upload } from "lucide-react";

// Basic information step component for pet creation
const BasicInformationStep: React.FC = () => {
  const [petImg, setPetImg] = useState<string | null>(null);
  const { petData, updatePetData, goToNextStep } = usePetCreation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!petData.name || petData.name.trim() === "") {
      newErrors.name = "Pet name is required";
    }

    if (!petData.species) {
      newErrors.species = "Please select a species";
    }

    if (!petData.breed) {
      newErrors.breed = "Please select a breed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle "Next" button press
  const handleNext = () => {
    if (validateForm()) {
      goToNextStep();
    }
  };

  // Handle pet image selection
  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updatePetData({ photoUrl: imageUrl });
      setPetImg(imageUrl);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-card text-card-foreground rounded-lg shadow-md">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleSelectImage}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-24 h-24 rounded-full border border-border flex items-center justify-center bg-background">
            {petData.photoUrl ? (
              <img
                src={petData.photoUrl}
                alt="Pet"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Upload className="text-muted-foreground" />
            )}
          </div>
        </div>
        {errors.photoUrl && (
          <p className="text-red-500 mt-1">{errors.photoUrl}</p>
        )}
      </div>

      {/* Basic Info Fields */}
      <div>
        <PawsText preset="h5">Basic Information</PawsText>

        <PawsInput
          label="Pet Name"
          value={petData.name || ""}
          onChangeText={(text) => updatePetData({ name: text })}
          error={errors.name}
          helperText={errors.name || ""}
          autoCapitalize="words"
          fullWidth
        />

        <div>
          <PawsText>Select Species</PawsText>
          <PawsSelect
            placeholder="Select species"
            value={petData.species || ""}
            options={[
              { label: "Dog", value: "dog" },
              { label: "Cat", value: "cat" },
              { label: "Other", value: "other" },
            ]}
            error={errors.species}
            onValueChange={(value) => updatePetData({ species: value })}
          />
          {errors.species && (
            <PawsText preset="caption" color="error">
              {errors.species}
            </PawsText>
          )}
        </div>

        <PawsInput
          label="Breed"
          value={petData.breed || ""}
          onChangeText={(text) => updatePetData({ breed: text })}
          autoCapitalize="words"
          error={errors.breed}
          fullWidth
        />
      </div>

      <div className="flex justify-end mt-4">
        <PawsButton onClick={handleNext} variant="primary">Next</PawsButton>
      </div>
    </div>
  );
};

export default BasicInformationStep;
