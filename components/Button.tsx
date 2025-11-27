import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-sans font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide";
  
  const variants = {
    primary: "bg-anthracite text-white hover:bg-neon-purple border-2 border-transparent shadow-[4px_4px_0px_0px_rgba(168,85,247,0.4)] hover:shadow-[2px_2px_0px_0px_rgba(168,85,247,0.4)] hover:translate-x-[2px] hover:translate-y-[2px]",
    secondary: "bg-neon-gold text-anthracite hover:bg-yellow-400 border-2 border-anthracite shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px]",
    outline: "bg-transparent border-2 border-anthracite text-anthracite hover:bg-anthracite hover:text-white"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};