import React from 'react';
import TravelNavbar from '../components/TravelNavbar';
import TravelHero from '../components/TravelHero';
import TravelDiscover from '../components/TravelDiscover';
import TravelFeatures from '../components/TravelFeatures';

export const metadata = {
  title: 'Explore World | Luxury Travel Experience',
  description: 'Discover the world\'s most adventurous destinations with our luxury travel experiences.',
};

export default function AnotherOne() {
  return (
    <div className="min-h-screen bg-travel-base font-poppins relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-travel-primary/20 to-travel-secondary/20 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-travel-accent/20 to-travel-primary/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
      </div>
      
      {/* Navigation */}
      <TravelNavbar />
      
      {/* Hero Section */}
      <TravelHero />
      
      {/* Discover Section */}
      <TravelDiscover />
      
      {/* Best Features Section */}
      <TravelFeatures />
    </div>
  );
} 