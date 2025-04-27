import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  className = '',
  onClick 
}: ButtonProps) {
  const baseStyles = "font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2";
  
  const variantStyles = {
    primary: "text-white bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 focus:ring-[rgba(234,88,12,0.5)] shadow-md shadow-orange-300/30 transform hover:-translate-y-0.5",
    outline: "text-neutral-700 border border-neutral-300 bg-transparent hover:bg-neutral-50 focus:ring-neutral-300 transform hover:-translate-y-0.5",
    text: "text-neutral-700 hover:bg-neutral-50 focus:ring-neutral-200"
  };
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-base"
  };
  
  const iconStyles = icon ? "inline-flex items-center" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${iconStyles} ${className}`}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
} 