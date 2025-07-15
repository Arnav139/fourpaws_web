import React, { useState } from "react";
import PawsText from "@/components/atoms/ui/PawsText";
import PawsInput from "@/components/atoms/ui/PawsInput";
import PawsButton from "@/components/atoms/ui/PawsButton";
import PawsSelect from "@/components/atoms/ui/PawsSelect";
import { usePetCreation } from "../../context/PetCreationContext";
import { Calendar } from "lucide-react";

// Details step component for pet creation
const DetailsStep: React.FC = () => {
  const { petData, updatePetData, goToNextStep, goToPreviousStep } =
    usePetCreation();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!petData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    if (!petData.size) {
      newErrors.size = "Please select a size";
    }
    if (!petData.weight) {
      newErrors.weight = "Weight is required";
    } else if (isNaN(Number(petData.weight)) || Number(petData.weight) <= 0) {
      newErrors.weight = "Please enter a valid weight";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      goToNextStep();
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      updatePetData({ dateOfBirth: selectedDate.toISOString().split("T")[0] });
    }
  };

  return (
    <div className="container mx-auto p-4 bg-card text-card-foreground rounded-lg shadow-md">
      <div>
        <PawsText preset="h5">More Details</PawsText>

        <PawsInput
          label="Date of Birth"
          value={petData.dateOfBirth || ""}
          onFocus={() => setShowDatePicker(true)}
          placeholder="YYYY-MM-DD"
          error={errors.dateOfBirth}
        />

        {showDatePicker && (
          <Calendar values={petData.dateOfBirth} onChange={handleDateChange} />
        )}

        <div className="my-4">
          <PawsSelect
            placeholder="Select size"
            value={petData.size || ""}
            options={[
              { label: "Small", value: "Small" },
              { label: "Medium", value: "Medium" },
              { label: "Large", value: "Large" },
              { label: "X-Large", value: "X-Large" },
            ]}
            onValueChange={(value) => updatePetData({ size: value })}
          />
          {errors.size && (
            <PawsText preset="caption" color="error">
              {errors.size}
            </PawsText>
          )}
        </div>

        <PawsInput
          label="Weight in kg"
          value={petData.weight ? String(petData.weight) : ""}
          onChangeText={(text) => {
            const weight = parseFloat(text);
            if (!isNaN(weight) || text === "") {
              updatePetData({ weight: text === "" ? undefined : weight });
            }
          }}
          keyboardType="numeric"
          error={errors.weight}
          fullWidth
        />
      </div>

      <div className="flex justify-between mt-6 space-x-2">
        <PawsButton onClick={goToPreviousStep} variant="outline" fullWidth>
          Back
        </PawsButton>
        <PawsButton onClick={handleNext} fullWidth variant="primary">
          Next
        </PawsButton>
      </div>
    </div>
  );
};

export default DetailsStep;
