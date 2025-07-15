import React, { createContext, useContext, useState } from "react";

interface PetData {
  name?: string;
  species?: string;
  breed?: string;
  dateOfBirth?: string;
  size?: string;
  weight?: number;
  allergies?: string[];
  medications?: string[];
  personalityTraits?: string[];
  bio?: string;
  additionalPhotos?: string[];
  photoUrl?: string;
}

interface PetCreationContextType {
  petData: PetData;
  updatePetData: (newData: Partial<PetData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  savePet: () => Promise<void>;
}

const PetCreationContext = createContext<PetCreationContextType | undefined>(
  undefined,
);

export const usePetCreation = (): PetCreationContextType => {
  const context = useContext(PetCreationContext);
  if (!context) {
    throw new Error("usePetCreation must be used within a PetCreationProvider");
  }
  return context;
};

export const PetCreationProvider: React.FC = ({ children }) => {
  const [petData, setPetData] = useState<PetData>({});
  const [currentStep, setCurrentStep] = useState(0);

  const updatePetData = (newData: Partial<PetData>) => {
    setPetData((prevData) => ({ ...prevData, ...newData }));
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const savePet = async () => {
    // Simulate a save operation
    console.log("Saving pet data...", petData);
    return new Promise<void>((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <PetCreationContext.Provider
      value={{
        petData,
        updatePetData,
        goToNextStep,
        goToPreviousStep,
        savePet,
      }}
    >
      {children}
    </PetCreationContext.Provider>
  );
};
