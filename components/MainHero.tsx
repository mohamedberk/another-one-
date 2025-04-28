"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { EnhancedBookingModal } from './EnhancedBookingModal';
import Image from 'next/image';
import { Activity, ourikaActivity, threeValleysActivity } from '../utils/activities';

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
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
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
  
  const openBookingModal = (activityType: string) => {
    if (activityType === 'agafay') {
      setSelectedActivity(threeValleysActivity);
    } else if (activityType === 'ourika') {
      setSelectedActivity(ourikaActivity);
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedActivity(null);
  };
  
  // Function to scroll to excursions section
  const scrollToExcursions = () => {
    const excursionsElement = document.getElementById('excursions');
    if (excursionsElement) {
      excursionsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
 
  return (
    <div className="relative w-full py-2 sm:py-4 px-2 sm:px-4 lg:px-6 max-w-[1440px] mx-auto transition-all duration-700 transform bg-gray-50 min-h-screen"
        style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)' }}>
      
      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg relative h-full">
        {/* Content container */}
        <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 h-full">
          {/* Mobile Layout */}
          <div className="md:hidden space-y-8 h-full">
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
            
            {/* Title */}
            <h1 className="text-3xl font-display font-bold text-gray-900 leading-tight transition-all duration-500"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                transitionDelay: '300ms' 
              }}
            >
              Discover <span className="text-gray-900">Ourika / 3 Valleys Excursion</span>
            </h1>

            {/* Video section */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-[300px] sm:h-[400px]" 
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'scale(1)' : 'scale(0.98)', 
                transitionDelay: '400ms',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div className="relative w-full h-full">
                <VideoPlayer
                  ref={videoRef}
                  src="https://ik.imagekit.io/momh2323/Untitled%20video%20-%20Made%20with%20Clipchamp.mp4?updatedAt=1745790242397"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-7 left-6 flex flex-col items-start">
                  <h3 className="text-white text-2xl font-display font-medium mb-2 drop-shadow-md bg-black/30 px-3 py-1 rounded-lg">
                    Ourika / 3 Valleys
 
                  </h3>
                  <div className="py-1.5 px-3 bg-white/50 backdrop-blur-sm rounded-xl shadow-md border border-white/30">
                    <span className="text-sm font-medium text-gray-900">From 30€</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Split valleys content */}
            <div className="space-y-4 transition-all duration-500"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                transitionDelay: '500ms' 
              }}
            >
              {/* Agafay section */}
              <div className="bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-2xl p-4 border border-amber-100/50">
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-display font-semibold text-gray-900">3 Valleys</h3>
                  <p className="text-gray-700 text-sm">
                    Begin your day with a 4x4 drive from Marrakech, exploring the stunning Agafay Desert, Berber villages, and the shimmering Lake Takerkoust.
                  </p>
                  <button
                    onClick={() => openBookingModal('agafay')}
                    className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-medium rounded-xl shadow-md shadow-orange-300/20 hover:shadow-lg hover:shadow-orange-300/30 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Book Now
                  </button>
                </div>
              </div>
              
              {/* Ourika section */}
              <div className="bg-gradient-to-r from-orange-50/50 to-amber-50/50 rounded-2xl p-4 border border-orange-100/50">
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-display font-semibold text-gray-900">Ourika Valley</h3>
                  <p className="text-gray-700 text-sm">
                    Escape the city and dive into the lush beauty of Ourika Valley, where waterfalls, Berber villages, and stunning landscapes await.
                  </p>
                  <button
                    onClick={() => openBookingModal('ourika')}
                    className="w-full py-3 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-medium rounded-xl shadow-md shadow-orange-300/20 hover:shadow-lg hover:shadow-orange-300/30 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
            
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
          <div className="hidden md:grid md:grid-cols-2 gap-8 lg:gap-12 items-stretch h-full min-h-[500px]">
            <div className="pr-4 flex flex-col justify-center h-full">
              {/* Premium label */}
              <div className="transition-all duration-500 mb-3"
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
              
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 leading-tight transition-all duration-500"
                  style={{ 
                    opacity: isLoaded ? 1 : 0, 
                    transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                    transitionDelay: '300ms' 
                  }}
                >
                  Discover <span className="text-gray-900">Ourika / 3 Valleys excursion</span>
                </h1>
                
                {/* Split valleys content */}
                <div className="space-y-4 transition-all duration-500"
                  style={{ 
                    opacity: isLoaded ? 1 : 0, 
                    transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                    transitionDelay: '450ms' 
                  }}
                >
                  {/* Agafay section */}
                  <div className="bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-2xl p-4 border border-amber-100/50">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-display font-semibold text-gray-900">3 Valleys</h3>
                      <button
                        onClick={() => openBookingModal('agafay')}
                        className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-medium rounded-xl shadow-md shadow-orange-300/20 hover:shadow-lg hover:shadow-orange-300/30 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        Book Now
                      </button>
                    </div>
                    <p className="text-gray-700">
                      Begin your day with a 4x4 drive from Marrakech, exploring the stunning Agafay Desert, Berber villages, and the shimmering Lake Takerkoust. Enjoy camel rides, local tea, and a panoramic break at the Kik Plateau before visiting the sacred village of Moulay Brahim. End with a scenic descent through orchards and the Atlas foothills — a perfect blend of desert, lakes, and mountains in one epic day.
                    </p>
                  </div>
                  
                  {/* Ourika section */}
                  <div className="bg-gradient-to-r from-orange-50/50 to-amber-50/50 rounded-2xl p-4 border border-orange-100/50">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-display font-semibold text-gray-900">Ourika Valley</h3>
                      <button
                        onClick={() => openBookingModal('ourika')}
                        className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-medium rounded-xl shadow-md shadow-orange-300/20 hover:shadow-lg hover:shadow-orange-300/30 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        Book Now
                      </button>
                    </div>
                    <p className="text-gray-700">
                      Escape the city and dive into the lush beauty of Ourika Valley, where waterfalls, Berber villages, and stunning landscapes await. Breathe fresh mountain air and experience authentic Moroccan culture in one unforgettable day. Join us for a journey that feels a world away — just moments from Marrakech.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 transition-all duration-500 mt-4 mb-10"
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
            
            <div className="relative transition-all duration-600 h-full md:sticky md:top-0"
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
              
              <div className="rounded-2xl overflow-hidden shadow-xl h-[580px]" 
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
                <div className="relative w-full h-full">
                  <VideoPlayer
                    ref={videoRef}
                    src="https://ik.imagekit.io/momh2323/Untitled%20video%20-%20Made%20with%20Clipchamp.mp4?updatedAt=1745790242397"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-7 left-6 flex flex-col items-start">
                    <h3 className="text-white text-2xl font-display font-medium mb-2 drop-shadow-md bg-black/30 px-3 py-1 rounded-lg">
                      Ourika / 3 Valleys

                    </h3>
                    <div className="py-1.5 px-3 bg-white/50 backdrop-blur-sm rounded-xl shadow-md border border-white/30">
                      <span className="text-sm font-medium text-gray-900">From 30€</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedActivity && (
        <EnhancedBookingModal 
          isOpen={isBookingModalOpen}
          closeModal={closeBookingModal}
          excursionTitle={selectedActivity.title}
          excursionType={selectedActivity.type}
          activity={selectedActivity}
        />
      )}
    </div>
  );
} 