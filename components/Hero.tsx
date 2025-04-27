import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { EnhancedBookingModal } from './EnhancedBookingModal';
import { ActivityModal } from './ActivityModal';
import Image from 'next/image';
import { projectImages } from '../utils/uploadthing-urls';
import { threeValleysActivity } from '../utils/activities';

// Handle Next.js Image component properly
const OptimizedImage = (props: any) => {
  if (props.fill) {
    return (
      <div className={props.className} style={{ position: 'relative', height: '100%', width: '100%' }}>
        <Image
          src={props.src}
          alt={props.alt || ""}
          fill
          quality={props.quality || 80}
          sizes={props.sizes || "100vw"}
          className="object-cover w-full h-full"
          priority={props.priority}
        />
      </div>
    );
  }
  
  return (
    <Image
      src={props.src}
      alt={props.alt || ""}
      width={props.width || 100}
      height={props.height || 100}
      className={props.className}
      quality={props.quality || 80}
    />
  );
};

// Shimmer effect component for the title
const ShimmerEffect = () => (
  <div className="absolute inset-0 w-full h-full">
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 animate-shimmer" />
    </div>
  </div>
);

// Icon components as inline SVGs to avoid dependencies
const CalendarIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="w-5 h-5 text-neutral-600"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="w-5 h-5 text-neutral-600"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PhoneIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="w-5 h-5 text-neutral-600"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const SparklesIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="w-3.5 h-3.5 mr-1.5 text-neutral-700"
  >
    <path d="M12 3v5m4-3-3 3m6-1h-5m2 4-3-3m5 6h-5m0 0 3-3m0 0V7m0 0-3-3m0 0H9m0 0v5m0 0-3-3m0 0H6m0 4h5m-5 0 3-3m0 0V7m0 0 3-3m0 0h5m0 0v5m0 0 3-3m0 0h3" />
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white drop-shadow-md">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
  </svg>
);

interface HeroProps {
  profileImage?: string;
  travelBgImage?: string;
}

export function Hero({ 
  profileImage = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  travelBgImage = 'https://images.unsplash.com/photo-1682687220566-5599dbbebf11?q=80&w=3270&auto=format&fit=crop'
}: HeroProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const excursionsRef = useRef<HTMLDivElement>(null);

  // Create a compatible activity object from threeValleysActivity
  const formattedActivity = {
    title: threeValleysActivity.title,
    type: threeValleysActivity.type,
    image: typeof threeValleysActivity.image === 'string' ? threeValleysActivity.image : '',
    price: `Group: €${threeValleysActivity.groupPrice} | Private: €${threeValleysActivity.privatePrice}`,
    date: 'Available Daily',
    duration: threeValleysActivity.duration,
    location: threeValleysActivity.location,
    description: threeValleysActivity.description,
    highlights: threeValleysActivity.highlights,
    included: threeValleysActivity.included,
    rating: threeValleysActivity.rating,
    reviewCount: threeValleysActivity.reviewCount,
    maxParticipants: threeValleysActivity.maxParticipants
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  const openActivityModal = () => setIsActivityModalOpen(true);
  const closeActivityModal = () => setIsActivityModalOpen(false);

  
  const scrollToExcursions = () => {
    excursionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <OptimizedImage 
            src={travelBgImage}
            alt="Marrakech landscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Marrakech - Agafay Desert - Lake Lalla Takerkoust
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              Experience the stunning landscapes of Morocco in a one-day private 4x4 tour. Discover the Agafay desert with its undulating limestone plateaus, visit traditional Berber villages, and enjoy the scenic views at Lake Lalla Takerkoust - all within a day's journey from Marrakech.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                onClick={openBookingModal}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:from-orange-500 hover:to-amber-400 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Book Now
              </Button>
              
              <button 
                onClick={openActivityModal}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <PlayIcon />
                <span className="ml-2">Tour Details</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-6 mt-12">
              <div className="flex items-center">
                <CalendarIcon />
                <span className="ml-2 text-white">Available Daily</span>
              </div>
              <div className="flex items-center">
                <ClockIcon />
                <span className="ml-2 text-white">9 Hours</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon />
                <span className="ml-2 text-white">24/7 Support</span>
              </div>
              <div className="flex items-center">
                <SparklesIcon />
                <span className="ml-2 text-white">Private Tour</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {isBookingModalOpen && (
        <EnhancedBookingModal 
          isOpen={isBookingModalOpen} 
          closeModal={closeBookingModal}
          excursionTitle={threeValleysActivity.title}
          excursionType={threeValleysActivity.type}
          activity={threeValleysActivity}
        />
      )}
      
      {isActivityModalOpen && (
        <ActivityModal 
          isOpen={isActivityModalOpen}
          closeModal={closeActivityModal}
          activity={formattedActivity} 
        />
      )}
      
      <div ref={excursionsRef} />
    </div>
  );
} 