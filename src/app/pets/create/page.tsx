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

type FormData = z.infer<typeof PetFormSchema>;
const steps: { label: string; key: keyof FormData }[] = [
  { label: "Essentials", key: "applicantName" },
  { label: "Details", key: "breed" },
  { label: "Health", key: "sterilized" },
  { label: "Personality", key: "bio" },
  { label: "Documents", key: "vaccinationCard" },
];

const getFieldsForStep = (step: keyof FormData) => {
  switch (step) {
    case "applicantName":
      return [
        "applicantName",
        "guardianName",
        "residentialAddress",
        "petName",
        "petProfileImage",
      ];
    case "breed":
      return ["breed", "gender", "size", "species"];
    case "sterilized":
      return ["sterilized", "allergies", "medications"];
    case "bio":
      return ["bio", "personalityTraits"];
    case "vaccinationCard":
      return [
        "veterinaryHealthCard",
        "vaccinationCard",
        "passport",
        "imageWithOwner",
        "ownerIdProof",
        "sterilizationCard",
      ];

    default:
      return [];
  }
};

export default function CreatePetPage() {
  const [currentStep, setCurrentStep] =
    useState<keyof FormData>("applicantName");

  const methods = useForm<FormData>({
    resolver: zodResolver(PetFormSchema),
    defaultValues: {},
  });

  const handleSubmit = async (data: FormData) => {
    console.log("Submitting pet profile:", data);

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
          "registrationNumber",
          "governmentRegistered",
          "name",
          "species",
          "breed",
          "gender",
          "sterilized",
          "bio",
          "dateOfBirth",
          "personalityTraits",
          "allergies",
          "medications",
          "additionalImages",
        ].includes(key)
      ) {
        formData.append(key, value);
      } else if (key === "petProfileImage") {
        formData.append("image", value);
      }
    }

    formData.append(
      "metaData",
      JSON.stringify({
        age: data.age,
        size: data.size,
        color: data.color,
        weight: data.weight,
      }),
    );

    console.log(await petService.createPet(formData));
  };

  const nextStep = async () => {
    const currentIndex = steps.findIndex((step) => step.key === currentStep);
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await methods.trigger(
      fieldsToValidate as unknown as keyof FormData,
    );

    if (isValid && currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].key);
    }
    sessionStorage.setItem("petFormData", JSON.stringify(methods.getValues()));
  };

  const prevStep = () => {
    const currentIndex = steps.findIndex((step) => step.key === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].key);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "applicantName":
        return <EssentialsStep />;
      case "breed":
        return <DetailsStep />;
      case "sterilized":
        return <HealthStep />;
      case "bio":
        return <PersonalityStep />;
      case "vaccinationCard":
        return <DocumentsStep />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const petDataString = sessionStorage.getItem("petFormData");
    const petFormData: FormData = petDataString
      ? JSON.parse(petDataString)
      : {};
    console.log(petFormData);
    for (const [key, value] of Object.entries(petFormData)) {
      methods.setValue(key, value);
    }
  });

  return (
    <div className="flex-1 grid place-items-center">
      <Card className="container max-w-2xl py-8">
        <CardHeader>
          <CardTitle>Add New Pet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div
                  key={step.label}
                  className={`flex pb-4 items-center ${index === steps.length - 1 ? "" : "flex-1"}`}
                >
                  <div className="relative">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        steps.findIndex((step) => step.key === currentStep) >=
                        index
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>
                    {step.key === currentStep && (
                      <div className="mt-2 absolute left-1/2 -translate-x-1/2 text-center text-xs font-medium">
                        {steps.find((step) => step.key === currentStep)?.label}
                      </div>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        steps.findIndex((step) => step.key === currentStep) >
                        index
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
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {renderStepContent()}
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === steps[0].key}
                >
                  Back
                </Button>
                {currentStep === steps[steps.length - 1].key ? (
                  <Button type="submit">Submit</Button>
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
