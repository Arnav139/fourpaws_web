import React from 'react';

interface PawsButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  fullWidth?: boolean;
  variant?: 'default' | 'outline';
  disabled?: boolean;
}

const PawsButton: React.FC<PawsButtonProps> = ({
  children,
  onClick,
  fullWidth,
  variant = 'default',
  disabled,
}) => {
  const baseStyle =
    'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none transition';
  const fullWidthStyle = fullWidth ? 'w-full' : '';
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-border text-foreground hover:bg-muted',
  };

  return (
    <button
      type="button"
      className={`${baseStyle} ${variantStyles[variant]} ${fullWidthStyle}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PawsButton;