import React from 'react';

interface PawsChipProps {
  label: string;
  onDelete?: () => void;
  variant?: 'default' | 'warning' | 'info' | 'primary';
  className?: string;
}

const variantStyles = {
  default: 'bg-muted text-muted-foreground',
  warning: 'bg-destructive text-destructive-foreground',
  info: 'bg-accent text-accent-foreground',
  primary: 'bg-primary/10 text-primary-foreground',
};

const PawsChip: React.FC<PawsChipProps> = ({ label, onDelete, variant = 'default', className }) => {
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]} ${className}`}>
      {label}
      {onDelete && (
        <button onClick={onDelete} className="ml-2 text-lg leading-none text-muted-foreground hover:text-foreground focus:outline-none">
          &times;
        </button>
      )}
    </div>
  );
};

export default PawsChip;