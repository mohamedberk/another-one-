import React from 'react';
import TravelNavbar from '../components/TravelNavbar';
import TravelHero from '../components/TravelHero';
import TravelDiscover from '../components/TravelDiscover';
import TravelFeatures from '../components/TravelFeatures';

export const metadata = {
  title: 'Explore Morocco | Luxury Travel Experience',
  description: 'Discover Morocco\'s most adventurous destinations with our luxury travel experiences.',
};

export default function AnotherOne() {
  return (
    <div className="min-h-screen bg-[#FFFBF5] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-500/10 to-amber-500/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
      </div>
      
      {/* Fixed Navigation */}
      <TravelNavbar />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section>
          <TravelHero />
        </section>
        
        {/* Discover Section */}
        <section className="mt-8">
          <TravelDiscover />
        </section>
        
        {/* Best Features Section */}
        <section className="mt-8">
          <TravelFeatures />
        </section>
      </main>
    </div>
  );
} 