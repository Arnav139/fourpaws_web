"use client";

import { PawFormField } from "@/components/common/PawFormField";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { petGenders, petSizes, petSpecies } from "@/lib/config";

export function DetailsStep() {
  return (
    <>
      <PawFormField
        name="breed"
        label="Breed"
        render={(field) => <Input placeholder="Breed" {...field} />}
      />

      <div className="flex flex-wrap gap-2.5 h-max items-start">
        <PawFormField
          label="Species"
          name="species"
          render={(field) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select species" />
              </SelectTrigger>
              <SelectContent>
                {petSpecies.map((species) => (
                  <SelectItem key={species} value={species}>
                    {species}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <PawFormField
          name="gender"
          label="Gender"
          render={(field) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {petGenders.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <PawFormField
          name="size"
          label="Size"
          render={(field) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {petSizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="flex gap-2.5 flex-wrap">
        <PawFormField
          name="dob"
          label="Date of Birth"
          render={(field) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
        <PawFormField
          name="weight"
          label="Weight"
          render={(field) => (
            <Input type="number" placeholder="Weight in kg" {...field} />
          )}
        />
      </div>
    </>
  );
}
