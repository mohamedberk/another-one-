"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { ActivityModal } from './ActivityModal';
import Image from 'next/image';

// VideoRef component for playing hero video
const VideoPlayer = React.forwardRef<HTMLVideoElement, {src: string; className: string}>(
  ({src, className}, ref) => (
    <video 
      ref={ref}
      src={src}
      className={className}
      autoPlay
      loop
      muted
      playsInline
    />
  )
);
VideoPlayer.displayName = "VideoPlayer";

export function MainHero() {
  // Animation state
  const [isLoaded, setIsLoaded] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Auto-play the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play was prevented:', error);
      });
    }
    
    // Remove the parallax scroll effect to keep video fixed
  }, []);
  
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
    title: 'Ourika / Agafay Desert Discovery',
    type: 'EXCURSION',
    image: 'https://images.unsplash.com/photo-1682687220566-5599dbbebf11?q=80&w=3270&auto=format&fit=crop',
    price: '85.00',
    date: 'Select a date',
    duration: '8 hours',
    location: 'Agafay Desert & Atlas Foothills',
    description: 'Begin your day with a 4x4 drive from Marrakech, exploring the stunning Agafay Desert, Berber villages, and the shimmering Lake Takerkoust. Enjoy camel rides, local tea, and a panoramic break at the Kik Plateau before visiting the sacred village of Moulay Brahim. End with a scenic descent through orchards and the Atlas foothills — a perfect blend of desert, lakes, and mountains in one epic day.',
    highlights: [
      'Explore the stunning limestone plateaus of the Agafay Desert',
      'Visit traditional Berber villages and experience local culture',
      'Enjoy panoramic views of Lake Lalla Takerkoust',
      'Experience a camel ride with stunning desert views',
      'Travel in comfort with air-conditioned 4x4 transportation'
    ],
    included: [
      'Hotel pickup and drop-off',
      'Transportation in air-conditioned 4x4 vehicle',
      'Professional English-speaking guide',
      'Traditional Moroccan tea and snacks',
      'Camel riding session (30 minutes)'
    ],
    rating: 4.9,
    reviewCount: 156,
    maxParticipants: 12
  };
  
  return (
    <div className="relative w-full overflow-hidden py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto transition-all duration-700 transform bg-gray-50"
        style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)' }}>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden relative">
        {/* Content container */}
        <div className="relative p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden">
          {/* Mobile Layout */}
          <div className="md:hidden space-y-8">
            {/* Premium label */}
            <div className="transition-all duration-500" 
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                transitionDelay: '200ms' 
              }}
            >
              <div className="inline-flex items-center py-1.5 px-3 rounded-full bg-white border border-gray-200 shadow-sm">
                <span className="text-xs font-medium bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent tracking-wide uppercase">Premium Experience</span>
              </div>
            </div>
            
            <div className="space-y-4 transition-all duration-500"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                transitionDelay: '300ms' 
              }}
            >
           
            </div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500" 
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'scale(1)' : 'scale(0.98)', 
                transitionDelay: '400ms',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div className="relative w-full" style={{ paddingBottom: "75%" }}>
                <video 
                  src="https://ik.imagekit.io/momh2323/Untitled%20video%20-%20Made%20with%20Clipchamp.mp4?updatedAt=1745790242397"
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ objectPosition: "center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                
                {/* Video overlay content */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <div className="py-1.5 px-3 bg-white/70 backdrop-blur-md rounded-xl shadow-md border border-white/50">
                    <span className="text-sm font-medium text-gray-900">€100 <span className="text-xs text-gray-600">per person</span></span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 transition-all duration-500"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                transitionDelay: '500ms' 
              }}
            >
              Begin your day with a 4x4 drive from Marrakech, exploring the stunning Agafay Desert, Berber villages, and the shimmering Lake Takerkoust. Enjoy camel rides, local tea, and a panoramic break at the Kik Plateau before visiting the sacred village of Moulay Brahim.
            </p>
            
            <div className="flex flex-col gap-3 transition-all duration-500"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                transitionDelay: '600ms' 
              }}
            >
              <Button 
                variant="outline" 
                className="w-full py-3.5 border-[1.5px] border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-xl font-medium transform transition-all duration-300 hover:-translate-y-0.5"
                onClick={scrollToExcursions}
              >
                View Details
              </Button>
            </div>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="pr-4 flex flex-col justify-center">
              {/* Premium label */}
              <div className="transition-all duration-500 mb-6"
                style={{ 
                  opacity: isLoaded ? 1 : 0, 
                  transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                  transitionDelay: '200ms' 
                }}
              >
                <div className="inline-flex items-center py-1.5 px-3 rounded-full bg-white border border-gray-200 shadow-sm">
                  <span className="text-xs font-medium bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent tracking-wide uppercase">Premium Experience</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight transition-all duration-500"
                  style={{ 
                    opacity: isLoaded ? 1 : 0, 
                    transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                    transitionDelay: '300ms' 
                  }}
                >
                  Discover <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Ourika / Agafay Desert</span>
                </h1>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-4 transition-all duration-500"
                  style={{ 
                    opacity: isLoaded ? 1 : 0, 
                    transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                    transitionDelay: '400ms' 
                  }}
                >
                  <div className="flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-800 font-medium">8-hour tour</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span className="text-gray-800 font-medium">Small groups</span>
                  </div>
                </div>
                
                {/* Split valleys content */}
                <div className="space-y-6 transition-all duration-500"
                  style={{ 
                    opacity: isLoaded ? 1 : 0, 
                    transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                    transitionDelay: '450ms' 
                  }}
                >
                  {/* Agafay section */}
                  <div className="bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-2xl p-6 border border-amber-100/50">
                    <h3 className="text-2xl font-display font-semibold mb-3 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Agafay Desert</h3>
                    <p className="text-gray-700">
                      Begin your day with a 4x4 drive from Marrakech, exploring the stunning Agafay Desert, Berber villages, and the shimmering Lake Takerkoust. Enjoy camel rides, local tea, and a panoramic break at the Kik Plateau before visiting the sacred village of Moulay Brahim. End with a scenic descent through orchards and the Atlas foothills — a perfect blend of desert, lakes, and mountains in one epic day.
                    </p>
                  </div>
                  
                  {/* Ourika section */}
                  <div className="bg-gradient-to-r from-orange-50/50 to-amber-50/50 rounded-2xl p-6 border border-orange-100/50">
                    <h3 className="text-2xl font-display font-semibold mb-3 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Ourika Valley</h3>
                    <p className="text-gray-700">
                      Escape the city and dive into the lush beauty of Ourika Valley, where waterfalls, Berber villages, and stunning landscapes await. Breathe fresh mountain air and experience authentic Moroccan culture in one unforgettable day. Join us for a journey that feels a world away — just moments from Marrakech.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 transition-all duration-500 mt-8 mb-10"
                  style={{ 
                    opacity: isLoaded ? 1 : 0, 
                    transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                    transitionDelay: '500ms' 
                  }}
                >
                  <Button 
                    variant="outline" 
                    className="py-3.5 px-8 border-[1.5px] border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-xl font-medium transform transition-all duration-300 hover:-translate-y-0.5"
                    onClick={scrollToExcursions}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="relative transition-all duration-600 mt-10"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'scale(1)' : 'scale(0.98)', 
                transitionDelay: '300ms' 
              }}
            >
              {/* Floating card - support */}
              <div className="absolute -top-4 -left-14 z-10 bg-white rounded-2xl p-4 shadow-lg border border-gray-100 transition-all duration-500 transform hover:-translate-y-1"
                style={{ 
                  opacity: isLoaded ? 1 : 0, 
                  transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)',
                  transitionDelay: '600ms' 
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="text-amber-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm">24/7 Customer Support</p>
                    <p className="text-gray-500 text-xs">Always here when you need us</p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-2xl overflow-hidden shadow-xl" 
                style={{ 
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div className="relative w-full" style={{ paddingBottom: "130%" }}>
                  <VideoPlayer
                    ref={videoRef}
                    src="https://ik.imagekit.io/momh2323/Untitled%20video%20-%20Made%20with%20Clipchamp.mp4?updatedAt=1745790242397"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-10 left-4 right-4">
                    <h3 className="text-white text-2xl font-display font-medium mb-3 drop-shadow-md">
                      Ourika / Agafay Tour
                    </h3>
                    <div className="flex justify-between items-center">
                      <div className="py-1.5 px-3 bg-white/70 backdrop-blur-md rounded-xl shadow-md border border-white/50">
                        <span className="text-sm font-medium text-gray-900">€100 <span className="text-xs text-gray-600">per person</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Details Modal */}
      {isActivityModalOpen && (
        <ActivityModal 
          isOpen={isActivityModalOpen} 
          closeModal={closeActivityModal} 
          activity={activityData}
        />
      )}
    </div>
  );
} 