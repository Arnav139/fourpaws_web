import React from 'react';

interface PawsTextProps {
  children: React.ReactNode;
  preset?: 'h5' | 'caption' | 'body1' | 'body2' | 'subtitle1';
  style?: React.CSSProperties;
  color?: string;
}

const presetStyles = {
  h5: 'text-xl font-semibold',
  caption: 'text-sm text-muted-foreground',
  body1: 'text-base text-foreground',
  body2: 'text-sm text-muted-foreground',
  subtitle1: 'text-md font-medium text-card-foreground',
};

const PawsText: React.FC<PawsTextProps> = ({ children, preset = 'body1', style, color }) => {
  return (
    <p className={`${presetStyles[preset]} ${color}`} style={style}>
      {children}
    </p>
  );
};

export default PawsText;