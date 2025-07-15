import React, { useState } from "react";
import PawsText from "@/components/atoms/ui/PawsText";
import PawsButton from "@/components/atoms/ui/PawsButton";
import PawsChip from "@/components/atoms/ui/PawsChip";
import { usePetCreation } from "../../context/PetCreationContext";
import { Plus, Image as ImageIcon, XCircle } from "lucide-react";
import PawsInput from "../ui/PawsInput";

// Predefined personality traits for quick selection
const PERSONALITY_TRAITS = [
  "Playful",
  "Calm",
  "Friendly",
  "Shy",
  "Energetic",
  "Cuddly",
  "Independent",
  "Curious",
  "Loyal",
  "Protective",
  "Smart",
  "Stubborn",
  "Gentle",
  "Confident",
  "Social",
];

const PersonalityStep: React.FC = () => {
  const { petData, updatePetData, goToNextStep, goToPreviousStep } =
    usePetCreation();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newTrait, setNewTrait] = useState("");
  const personalityTraits = petData.personalityTraits || [];
  const additionalPhotos = petData.additionalPhotos || [];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!petData.bio || petData.bio.trim().length < 10) {
      newErrors.bio = "Bio must be at least 10 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      goToNextStep();
    }
  };

  const handleAddTrait = () => {
    if (
      newTrait.trim() !== "" &&
      !personalityTraits.includes(newTrait.trim())
    ) {
      const updatedTraits = [...personalityTraits, newTrait.trim()];
      updatePetData({ personalityTraits: updatedTraits });
      setNewTrait("");
    }
  };

  const handleToggleTrait = (trait: string) => {
    const updatedTraits = personalityTraits.includes(trait)
      ? personalityTraits.filter((t) => t !== trait)
      : [...personalityTraits, trait];
    updatePetData({ personalityTraits: updatedTraits });
  };

  const handleSelectPhotos = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("We need camera roll permissions to add photos of your pet!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const newPhotos = [...additionalPhotos, result.assets[0].uri];
        updatePetData({ additionalPhotos: newPhotos });
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-card text-card-foreground rounded-lg shadow-md">
      <div>
        <PawsText preset="h5">Personality & Photos</PawsText>

        <PawsInput
          label="Pet Bio"
          value={petData.bio || ""}
          onChangeText={(text) => updatePetData({ bio: text })}
          placeholder="Tell us about your pet's personality, likes, dislikes, etc."
          error={errors.bio}
          fullWidth
          placeholder="Tell us about your pet's personality, likes, dislikes, etc."
        />

        <PawsText preset="subtitle1" className="mt-4 mb-2">
          Personality Traits
        </PawsText>

        <div className="flex flex-wrap mb-2">
          {PERSONALITY_TRAITS.map((trait) => (
            <button
              key={trait}
              onClick={() => handleToggleTrait(trait)}
              className={`${
                personalityTraits.includes(trait)
                  ? "bg-primary/10"
                  : "bg-muted"
              } m-1 py-1 px-2 rounded-lg`}
            >
              <PawsText
                preset="body2"
                color={
                  personalityTraits.includes(trait)
                    ? "text-primary-foreground"
                    : "text-muted-foreground"
                }
              >
                {trait}
              </PawsText>
            </button>
          ))}
        </div>

        <PawsText preset="caption" className="mt-2">
          Or add your own custom trait:
        </PawsText>

        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newTrait}
            onChange={(e) => setNewTrait(e.target.value)}
            placeholder="Enter trait"
            className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring ring-ring"
          />
          <button
            onClick={handleAddTrait}
            className="ml-2 p-1 border border-border rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus />
          </button>
        </div>

        <div className="flex flex-wrap mb-4">
          {personalityTraits.map((trait, index) => (
            <PawsChip
              key={`trait-${index}`}
              label={trait}
              variant="primary"
              onDelete={() =>
                updatePetData({
                  personalityTraits: personalityTraits.filter(
                    (_, i) => i !== index,
                  ),
                })
              }
              className="m-1"
            />
          ))}
        </div>

        <PawsText preset="subtitle1" className="mt-4 mb-1">
          Additional Photos
        </PawsText>

        <button
          onClick={handleSelectPhotos}
          className="flex items-center justify-center w-full py-2 border border-dashed border-border bg-background rounded-md mb-4 hover:bg-accent"
        >
          <ImageIcon className="mr-2 text-muted-foreground" />
          <PawsText preset="body2" color="text-foreground">
            Add Photo
          </PawsText>
        </button>

        {additionalPhotos.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {additionalPhotos.map((photo, index) => (
              <div key={`photo-${index}`} className="relative">
                <img
                  src={photo}
                  alt={`Pet photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                />
                <button
                  onClick={() =>
                    updatePetData({
                      additionalPhotos: additionalPhotos.filter(
                        (_, i) => i !== index,
                      ),
                    })
                  }
                  className="absolute top-1 right-1 text-white bg-black bg-opacity-50 rounded-full"
                >
                  <XCircle size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6 space-x-2">
        <PawsButton onClick={goToPreviousStep} variant="outline">
          Back
        </PawsButton>
        <PawsButton onClick={handleNext} variant="primary">Next</PawsButton>
      </div>
    </div>
  );
};

export default PersonalityStep;
