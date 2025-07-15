import React from 'react';

interface PawsSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  error?: string;
}

const PawsSelect: React.FC<PawsSelectProps> = ({ value, onValueChange, options, placeholder, error }) => {
  return (
    <div className="my-2">
      <select
        className="mt-1 block w-full py-2 pl-3 pr-10 border border-border bg-background rounded-md focus:outline-none focus:ring-ring focus:border-primary sm:text-sm text-foreground"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};

export default PawsSelect;