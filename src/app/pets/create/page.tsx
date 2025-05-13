"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { DetailsStep } from "@/components/pet/create-form/DetailsStep";
import { DocumentsStep } from "@/components/pet/create-form/DocumentsStep";
import { EssentialsStep } from "@/components/pet/create-form/EssentialsStep";
import { HealthStep } from "@/components/pet/create-form/HealthStep";
import { PersonalityStep } from "@/components/pet/create-form/PersonalityStep";

import { PetFormSchema } from "@/schema/pet";
import { petService } from "@/services";
import { calculateAgeFromDOB, downloadPDF } from "@/lib/utils";
import { petFormSteps } from "@/lib/config/pet";
import { toast } from "sonner";
import SubmitButton from "@/components/common/SubmitButton";

type FormData = z.infer<typeof PetFormSchema>;

const getFieldsForStep = (stepToValidate: string) => {
  return petFormSteps.find((step) => step.key === stepToValidate)?.fields ?? [];
};

export default function CreatePetPage() {
  const [currentStep, setCurrentStep] = useState("essentials");
  const [petProfileImage, setPetProfileImage] = useState<File | null>(null);
  const [additionalImages, setadditionalImages] = useState<File[] | null>(null);

  // const [petProfileImage, setPetProfileImage] = useState<File | null>(null);
  // const [petProfileImage, setPetProfileImage] = useState<File | null>(null);

  const methods = useForm<FormData>({
    resolver: zodResolver(PetFormSchema),
    defaultValues: {},
  });

  const formValues = methods.getValues();

  console.log("petProfileImage", petProfileImage);

  const handleSubmit = async () => {
    console.log(
      "Please ensure all fields are filled out correctly before proceeding.",
    );
    try {
      const data = methods.getValues();
      const allFieldsValid = await methods.trigger();
      if (!allFieldsValid) {
        return;
      }
      console.log("Submitting pet profile:", data, petProfileImage);

      const formData = new FormData();

      // Add each property from data to formData
      for (const [key, value] of Object.entries(data)) {
        if (
          key === "age" ||
          key === "size" ||
          key === "color" ||
          key === "weight"
        ) {
          continue;
        }
        if (
          [
            "ownerIdProof",
            "imageWithOwner",
            "vaccinationCard",
            "passport",
            "veterinaryHealthCard",
            "sterilizationCard",
            "registrationNumber",
            "governmentRegistered",
            "sterilized",
            "name",
            "species",
            "breed",
            "gender",
            "bio",
            "dateOfBirth",
            "personalityTraits",
            "allergies",
            "medications",
            "additionalImages",
          ].includes(key)
        ) {
          if (["allergies", "medications", "personalityTraits"].includes(key)) {
            formData.append(key, JSON.stringify(value));
          } else if (["governmentRegistered", "sterilized"].includes(key)) {
            formData.append(key, value ? "true" : "false");
          } else {
            formData.append(key, value);
          }
        }
      }

      formData.append("image", petProfileImage!);
      formData.append(
        "metaData",
        JSON.stringify({
          age: calculateAgeFromDOB(data.dob),
          size: data.size,
          color: data.color,
          weight: data.weight,
        }),
      );

      const response = await petService.createPet(formData);
      console.log(response);

      if (!response.success) {
        toast.error(
          response.error || "Something went wrong, please try again later!",
        );
      } else if (response.data) {
        toast.success("Pet added successfully!");
        console.log((response.data as { mergedPdfBase64: string }).mergedPdfBase64)
        downloadPDF((response.data as { mergedPdfBase64: string }).mergedPdfBase64)
        sessionStorage.setItem("petFormData", JSON.stringify({}));
        setTimeout(() => {window.navigation.reload()} , 1000)
      }
    } catch (err) {
      console.log("ejkdvhkdfjvdkvgsdfg", err);
    }
  };

  const nextStep = async () => {
    const currentIndex = petFormSteps.findIndex(
      (step) => step.key === currentStep,
    );
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await methods.trigger(
      fieldsToValidate as unknown as keyof FormData,
    );

    if (isValid && currentIndex < petFormSteps.length - 1) {
      setCurrentStep(petFormSteps[currentIndex + 1].key);
    }

    console.log(methods.getValues());
    sessionStorage.setItem("petFormData", JSON.stringify(methods.getValues()));
  };

  const prevStep = () => {
    const currentIndex = petFormSteps.findIndex(
      (step) => step.key === currentStep,
    );
    if (currentIndex > 0) {
      setCurrentStep(petFormSteps[currentIndex - 1].key);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "essentials":
        return <EssentialsStep />;
      case "details":
        return <DetailsStep />;
      case "health":
        return <HealthStep />;
      case "personality":
        return <PersonalityStep />;
      case "documents":
        return <DocumentsStep />;
      default:
        return null;
    }
  };

  useEffect(() => {
    setPetProfileImage(formValues.petProfileImage);
    // setadditionalImages(formValues.ad)
  }, [formValues]);

  useEffect(() => {
    const petDataString = sessionStorage.getItem("petFormData");
    const petFormData: FormData = petDataString
      ? JSON.parse(petDataString)
      : {};
    console.log(petFormData);
    for (const [key, value] of Object.entries(petFormData)) {
      methods.setValue(key, value);
    }
  }, []);

  return (
    <div className="flex-1 grid place-items-center">
      <Card className="container max-w-2xl py-8">
        <CardHeader>
          <CardTitle>Add New Pet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {petFormSteps.map((step, index) => (
                <div
                  key={step.label}
                  className={`flex pb-4 items-center ${index === petFormSteps.length - 1 ? "" : "flex-1"}`}
                >
                  <div className="relative">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${petFormSteps.findIndex(
                        (step) => step.key === currentStep,
                      ) >= index
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                        }`}
                    >
                      {index + 1}
                    </div>
                    {step.key === currentStep && (
                      <div className="mt-2 absolute left-1/2 -translate-x-1/2 text-center text-xs font-medium">
                        {
                          petFormSteps.find((step) => step.key === currentStep)
                            ?.label
                        }
                      </div>
                    )}
                  </div>
                  {index < petFormSteps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${petFormSteps.findIndex(
                        (step) => step.key === currentStep,
                      ) > index
                          ? "bg-primary"
                          : "bg-secondary"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <FormProvider {...methods}>
            <form action={handleSubmit} className="space-y-6">
              {renderStepContent()}
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === petFormSteps[0].key}
                >
                  Back
                </Button>
                {currentStep === petFormSteps[petFormSteps.length - 1].key ? (
                  <SubmitButton label="Submit" />
                ) : (
                  <Button type="button" onClick={nextStep}>
                    Next
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
