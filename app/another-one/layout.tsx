import React from 'react';
import { clashDisplay, cabinetGrotesk } from '../fonts';

export const metadata = {
  title: 'Explore World | Luxury Travel Experience',
  description: 'Discover the world\'s most adventurous destinations with our luxury travel experiences.',
};

export default function AnotherOneLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${clashDisplay.variable} ${cabinetGrotesk.variable}`}>
      {children}
    </div>
  );
} 