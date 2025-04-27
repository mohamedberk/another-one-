"use client"
import React from 'react';
import { PremiumHero } from '../../components/PremiumHero';

export default function TravelPage() {
  return (
    <main className="min-h-screen">
      {/* Uncomment either Hero component to preview it */}
      
      {/* Original Hero Component */}
      {/* <Hero /> */}
      
      {/* New Premium Hero Component */}
      <PremiumHero />
      
      {/* Other page content would go here */}
      <div id="experiences" className="h-32"></div>
    </main>
  );
} 