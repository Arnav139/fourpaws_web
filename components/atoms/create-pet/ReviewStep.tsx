import React, { useState } from "react";
import PawsText from "@/components/atoms/ui/PawsText";
import PawsButton from "@/components/atoms/ui/PawsButton";
import { usePetCreation } from "@/components/context/PetCreationContext";

const ReviewStep: React.FC = () => {
  const { petData, goToPreviousStep, savePet } = usePetCreation();
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePet = async () => {
    try {
      setIsSaving(true);
      await savePet();
      // Navigate to another page or show success message
    } catch (error) {
      console.error("Error saving pet:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const calculateCompletion = () => {
    let completedFields = 0;
    const totalFields = 7; // Total fields to be counted for completion percentage
    if (petData.name) completedFields++;
    if (petData.species) completedFields++;
    if (petData.breed) completedFields++;
    // Add other fields as necessary

    return (completedFields / totalFields) * 100;
  };

  return (
    <div className="container mx-auto p-4 bg-card text-card-foreground rounded-lg shadow-md">
      <div>
        <PawsText preset="h5">Review Pet Information</PawsText>

        <div>
          <PawsText preset="body2">Name:</PawsText>
          <PawsText preset="body1">{petData.name || "Not specified"}</PawsText>
        </div>

        <div className="flex justify-between mt-2">
          <PawsText preset="body2" style={styles.infoLabel}>
            Species:
          </PawsText>
          <PawsText preset="body1">
            {petData.species || "Not specified"}
          </PawsText>
        </div>

        {/* Add more fields for review as necessary */}

        <div className="mt-4 p-2 bg-muted rounded-md">
          <PawsText preset="body2" color="text-muted-foreground">
            Completion: {calculateCompletion()}%
          </PawsText>
        </div>
      </div>

      <div className="flex justify-end mt-6 space-x-2">
        <PawsButton onClick={goToPreviousStep} variant="outline">
          Back
        </PawsButton>
        <PawsButton onClick={handleSavePet} disabled={isSaving} variant="primary">
          {isSaving ? <span>Saving...</span> : "Save Pet"}
        </PawsButton>
      </div>
    </div>
  );
};

export default ReviewStep;
