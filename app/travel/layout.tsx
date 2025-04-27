import React from 'react';
import type { Metadata } from 'next';
import ClientLayout from '../components/ClientLayout';

export const metadata: Metadata = {
  title: 'ATLAS LUXURY - Mountain Experiences',
  description: 'Discover extraordinary adventures in the Atlas Mountains',
};

export default function TravelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
} 