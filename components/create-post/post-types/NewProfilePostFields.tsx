"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function NewProfilePostFields() {
  const { control } = useFormContext();

  const commonPetBreeds = {
    dog: ["Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Beagle", "Poodle", "Mixed Breed"],
    cat: ["Domestic Shorthair", "Siamese", "Maine Coon", "Persian", "Ragdoll", "Bengal", "Mixed Breed"],
    other: ["Rabbit", "Guinea Pig", "Hamster", "Bird", "Reptile", "Fish"]
  };

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="petName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pet Name</FormLabel>
            <FormControl>
              <Input placeholder="Name of the pet" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="petBreed"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pet Breed/Species</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select breed or species" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="other_custom">Other/Custom</SelectItem>
                
                <SelectItem value="dog_category" disabled>Dogs</SelectItem>
                {commonPetBreeds.dog.map(breed => (
                  <SelectItem key={`dog_${breed}`} value={breed}>
                    {breed}
                  </SelectItem>
                ))}
                
                <SelectItem value="cat_category" disabled>Cats</SelectItem>
                {commonPetBreeds.cat.map(breed => (
                  <SelectItem key={`cat_${breed}`} value={breed}>
                    {breed}
                  </SelectItem>
                ))}
                
                <SelectItem value="other_category" disabled>Other Pets</SelectItem>
                {commonPetBreeds.other.map(breed => (
                  <SelectItem key={`other_${breed}`} value={breed}>
                    {breed}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Conditional field for custom breed */}
      <FormField
        control={control}
        name="customBreed"
        render={({ field }) => (
          <FormItem className={control._formValues.petBreed === "other_custom" ? "block" : "hidden"}>
            <FormLabel>Custom Breed/Species</FormLabel>
            <FormControl>
              <Input placeholder="Enter breed or species" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="petAge"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pet Age (Optional)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Age in years" 
                min="0" 
                step="0.1" 
                {...field} 
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              Approximate age if known
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pet Bio</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about this pet..."
                className="min-h-[120px] resize-y"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="text-sm text-muted-foreground mt-2">
        Don't forget to upload a photo of the pet in the Media tab!
      </div>
    </div>
  );
}