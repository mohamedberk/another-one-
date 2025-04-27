"use client"

import Image from 'next/image';
import { projectImages } from '../utils/uploadthing-urls';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ourikaActivity, threeValleysActivity } from '../utils/activities';
import { PremiumHero } from '@/components/PremiumHero';
import { PremiumTripCard } from '@/components/PremiumTripCard';
import BentoGallery from '@/components/BentoGallery';
import PremiumReviewsScroller from '@/components/PremiumReviewsScroller';
import { WhyUs } from '@/components/WhyUs';
import { Header } from '@/components/Header';
import { EnhancedBookingModal } from '@/components/EnhancedBookingModal';
import { ActivityModal } from '@/components/ActivityModal';
import { Button } from '@/components/Button';
import { MainHero } from '@/components/MainHero';

export default function Home() {
  // Animation state
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);
  
  const openActivityModal = () => setIsActivityModalOpen(true);
  const closeActivityModal = () => setIsActivityModalOpen(false);
  
  // Function to scroll to excursions section
  const scrollToExcursions = () => {
    const excursionsElement = document.getElementById('excursions');
    if (excursionsElement) {
      excursionsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Sample activity data for the details modal
  const activityData = {
    title: '3 Valleys Atlas Adventure',
    type: 'EXCURSION',
    image: 'https://images.unsplash.com/photo-1682687220566-5599dbbebf11?q=80&w=3270&auto=format&fit=crop',
    price: '85.00',
    date: 'Select a date',
    duration: '8 hours',
    location: 'Atlas Mountains',
    description: 'Experience the breathtaking beauty of the Atlas Mountains with our exclusive guided tour. Journey through the scenic valleys of Ourika, Oukaimeden, and Asni with their pristine waterfalls, authentic Berber villages, and majestic snow-capped peaks. This full-day excursion offers a perfect blend of nature, culture, and adventure.',
    highlights: [
      'Visit traditional Berber villages and experience local culture',
      'Enjoy spectacular mountain and valley views',
      'Discover beautiful waterfalls in their natural setting',
      'Savor authentic Moroccan cuisine for lunch',
      'Travel in comfort with air-conditioned transportation'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Transportation in air-conditioned vehicle',
      'Professional English-speaking guide',
      'Traditional Moroccan lunch'
    ],
    rating: 4.9,
    reviewCount: 156,
    maxParticipants: 12
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Enhanced decorative elements with more sophisticated styling */}
      <div className="absolute top-0 left-0 w-[1200px] h-[1200px] rounded-full bg-gradient-to-br from-gray-100/30 to-white/10 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute top-1/3 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-tl from-gray-200/15 to-white/5 translate-x-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-gray-100/15 to-white/5 translate-y-1/3 blur-3xl"></div>
      
      {/* Main content container with premium styling */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Enhanced header */}
        <Header />
        
        {/* Hero section */}
        <MainHero />
        
       
        
        {/* Enhanced popular excursions section */}
        <div id="excursions" className="my-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 delay-300"
             style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)' }}>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center font-display">
              <span className="inline-block w-12 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mr-5"></span>
              Excursions
            </h2>
            
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <PremiumTripCard activity={ourikaActivity} variant="dark" />
            <PremiumTripCard activity={threeValleysActivity} variant="dark" />
          </div>
        </div>
        
        {/* Gallery Section */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 delay-400"
             style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)' }}>
          <BentoGallery />
        </div>
        
        {/* Testimonials section */}
        <div id="guest-experiences" className="my-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 delay-400"
             style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)' }}>
          <PremiumReviewsScroller />
        </div>
        
        {/* Why Us Section */}
        <div className="transition-all duration-700 delay-500"
             style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)' }}>
          <WhyUs />
        </div>
        
        {/* Footer with brand mention */}
        <footer id="contact" className="py-10 text-center max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-lg shadow-amber-200/50 flex items-center justify-center mr-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <span className="font-display font-bold text-gray-800">Atlas<span className="text-gray-600">Tours</span></span>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent font-medium">Atlas</span><span className="font-medium text-gray-800">Tours</span>. All rights reserved.</p>
        </footer>
      </div>

      {/* Booking Modal */}
      <EnhancedBookingModal 
        isOpen={isBookingModalOpen} 
        closeModal={closeBookingModal} 
        excursionTitle={'Ourika & Agafay Desert Discovery'}
        excursionType={'EXCURSION'}
      />
      
      {/* Activity Details Modal */}
      <ActivityModal 
        isOpen={isActivityModalOpen} 
        closeModal={closeActivityModal} 
        activity={activityData}
      />
    </main>
  );
}