import { Input } from "@/components/ui/input";
import React from "react";

interface PawsInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
}

const PawsInput: React.FC<PawsInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helperText,
}) => {
  return (
    <div className="my-2">
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <Input
        type="text"
        className="mt-1 block w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-ring focus:border-primary sm:text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
      />
      {error && <p className="text-destructive text-sm">{error}</p>}
      {helperText && (
        <p className="text-muted-foreground text-sm">{helperText}</p>
      )}
    </div>
  );
};

export default PawsInput;
