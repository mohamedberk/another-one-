import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'error' | 'accent' | 'primary' | 'gray';
  withDot?: boolean;
}

export function Badge({ 
  children, 
  color = 'error', 
  withDot = false 
}: BadgeProps) {
  const colorMap = {
    error: 'text-brand-error',
    accent: 'text-brand-accent',
    primary: 'text-brand-primary',
    gray: 'text-gray-900'
  };

  return (
    <span className={`inline-flex items-center text-xs font-medium ${colorMap[color]} uppercase tracking-wide bg-gray-100 px-2 py-1 rounded`}>  
      {withDot && (
        <span className={`w-1 h-1 bg-${color === 'error' ? 'brand-error' : color === 'accent' ? 'brand-accent' : color === 'primary' ? 'brand-primary' : 'gray-900'} rounded-full mr-1`}></span>
      )}
      {children}
    </span>
  );
} 