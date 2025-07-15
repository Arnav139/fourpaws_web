import React, { useState } from "react";
import PawsText from "@/components/atoms/ui/PawsText";
import PawsInput from "@/components/atoms/ui/PawsInput";
import PawsButton from "@/components/atoms/ui/PawsButton";
import PawsChip from "@/components/atoms/ui/PawsChip";
import { usePetCreation } from "../../context/PetCreationContext";
import { Plus } from "lucide-react";

// Health step component for pet creation
const HealthStep: React.FC = () => {
  const { petData, updatePetData, goToNextStep, goToPreviousStep } =
    usePetCreation();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newAllergy, setNewAllergy] = useState("");
  const [newMedication, setNewMedication] = useState("");

  // Initialize arrays if undefined
  const allergies = petData.allergies || [];
  const medications = petData.medications || [];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (allergies.length === 0) {
      newErrors.allergies = "Please enter at least one allergy.";
    }
    if (medications.length === 0) {
      newErrors.medications = "Please enter at least one medication.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      goToNextStep();
    }
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim() !== "") {
      const updatedAllergies = [...allergies, newAllergy.trim()];
      updatePetData({ allergies: updatedAllergies });
      setNewAllergy("");
    }
  };

  const handleRemoveAllergy = (index: number) => {
    const updatedAllergies = [...allergies];
    updatedAllergies.splice(index, 1);
    updatePetData({ allergies: updatedAllergies });
  };

  const handleAddMedication = () => {
    if (newMedication.trim() !== "") {
      const updatedMedications = [...medications, newMedication.trim()];
      updatePetData({ medications: updatedMedications });
      setNewMedication("");
    }
  };

  const handleRemoveMedication = (index: number) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    updatePetData({ medications: updatedMedications });
  };

  return (
    <div className="container mx-auto p-4 bg-card text-card-foreground rounded-lg shadow-md">
      <div>
        <PawsText preset="h5">Health Information</PawsText>

        <PawsText preset="subtitle1">Allergies</PawsText>
        <div style={styles.inputRow}>
          <div className="flex">
            <input
              type="text"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              placeholder="Enter allergy"
              className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring ring-ring"
            />
            <button
              onClick={handleAddAllergy}
              className="ml-2 p-1 border border-border rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus />
            </button>
          </div>
        </div>
        <div style={styles.tagsContainer}>
          {allergies.map((allergy, index) => (
            <PawsChip
              key={`allergy-${index}`}
              label={allergy}
              variant="warning"
              onDelete={() => handleRemoveAllergy(index)}
            />
          ))}
        </div>
        {errors.allergies && (
          <PawsText preset="caption" color="error" style={styles.errorText}>
            {errors.allergies}
          </PawsText>
        )}

        <PawsText preset="subtitle1" style={styles.subSectionTitle}>
          Current Medications
        </PawsText>
        <div style={styles.inputRow}>
          <div className="flex">
            <input
              type="text"
              value={newMedication}
              onChange={(e) => setNewMedication(e.target.value)}
              placeholder="Enter medication"
              className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring ring-ring"
            />
            <button
              onClick={handleAddMedication}
              className="ml-2 p-1 border border-border rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus />
            </button>
          </div>
        </div>
        <div style={styles.tagsContainer}>
          {medications.map((medication, index) => (
            <PawsChip
              key={`medication-${index}`}
              label={medication}
              variant="info"
              onDelete={() => handleRemoveMedication(index)}
            />
          ))}
        </div>
        {errors.medications && (
          <PawsText preset="caption" color="error" style={styles.errorText}>
            {errors.medications}
          </PawsText>
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

export default HealthStep;
