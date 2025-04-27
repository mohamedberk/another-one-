import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { NewBookingModal } from './NewBookingModal';
import { 
  ChevronRightIcon,
  MapPinIcon, 
  UserIcon, 
  CalendarDaysIcon, 
  CheckIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  SunIcon,
  GlobeAltIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import { StarIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface PremiumHeroProps {
  backgroundImage?: string;
  destinations?: string[];
}

export function PremiumHero({ 
  backgroundImage = 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=85&w=3270&auto=format&fit=crop',
  destinations = ['Agafay Desert', 'Lake Lalla Takerkoust', 'Kik Plateau', 'Asni']
}: PremiumHeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [hoverState, setHoverState] = useState({
    bookButton: false,
    exploreButton: false,
    imageHover: false
  });
  
  const imageGallery = [
    'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=85&w=3270&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1635170414417-5f1586d4e9e3?q=85&w=3270&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1597826368712-07e27937789a?q=85&w=3270&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1548026140-aa708a86f8a7?q=85&w=3270&auto=format&fit=crop',
  ];
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const imageIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Auto rotate destinations for a dynamic feel
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentDestination(prev => (prev + 1) % destinations.length);
    }, 3000);
    
    imageIntervalRef.current = setInterval(() => {
      setActiveImage(prev => (prev + 1) % imageGallery.length);
    }, 5000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (imageIntervalRef.current) {
        clearInterval(imageIntervalRef.current);
      }
    };
  }, [destinations.length, imageGallery.length]);
  
  // Set loaded state after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => {
      clearTimeout(timer);
      setIsLoaded(false);
    };
  }, []);
  
  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);
  
  // Scroll to excursions section
  const scrollToExcursions = () => {
    const excursionsElement = document.getElementById('excursions');
    if (excursionsElement) {
      excursionsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF9F0] to-white">
      {/* Ambient background elements - removed shadow background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-32 h-[600px] w-[600px] rounded-full bg-gradient-radial from-[#FFC978]/10 to-transparent blur-3xl opacity-60"></div>
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-radial from-[#FF9D4D]/10 to-transparent blur-3xl opacity-50"></div>
      </div>
      
      {/* Decorative patterns */}
      <div className="absolute top-20 left-20 w-12 h-12">
        <div className="absolute h-4 w-4 rounded-full bg-[#FF9D4D]/10"></div>
        <div className="absolute h-2 w-2 rounded-full bg-[#FF9D4D]/20 top-8 left-6"></div>
        <div className="absolute h-3 w-3 rounded-full bg-[#FF9D4D]/15 top-10 left-2"></div>
      </div>
      <div className="absolute bottom-20 right-20 w-16 h-16">
        <div className="absolute h-3 w-3 rounded-full bg-[#FF9D4D]/10"></div>
        <div className="absolute h-5 w-5 rounded-full bg-[#FF9D4D]/20 top-10 right-8"></div>
        <div className="absolute h-2 w-2 rounded-full bg-[#FF9D4D]/15 top-4 right-2"></div>
      </div>
      
      <div 
        className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:pt-28 lg:pb-28"
        style={{ 
          opacity: isLoaded ? 1 : 0, 
          transition: 'opacity 1s ease-out, transform 1s ease-out',
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)' 
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 xl:gap-24">
          {/* Left content column */}
          <div className="w-full lg:w-[45%] relative z-10">
            {/* Premium badge */}
            <div 
              className="inline-flex items-center px-3 py-1.5 mb-7 text-xs font-medium tracking-wide rounded-full text-[#B45309] bg-gradient-to-r from-[#FEF3C7] to-[#FFFBEB] shadow-[0_2px_10px_-2px_rgba(251,191,36,0.15)] border border-[#FDE68A]/80"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
                transitionDelay: '0.2s'
              }}
            >
              <SparklesIcon className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
              PREMIUM EXPERIENCE
            </div>
            
            {/* Headline with staggered animation */}
            <div className="overflow-hidden mb-4">
              <h2 
                className="text-sm font-medium text-[#B45309] tracking-wide uppercase mb-3"
                style={{ 
                  opacity: isLoaded ? 1 : 0, 
                  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                  transform: isLoaded ? 'translateY(0)' : 'translateY(10px)',
                  transitionDelay: '0.3s'
                }}
              >
                Discover the Beauty of Morocco
              </h2>
            </div>
            
            <div className="overflow-hidden mb-5">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#0F172A] leading-[1.15]"
                style={{ 
                  opacity: isLoaded ? 1 : 0, 
                  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '0.4s'
                }}
              >
                Marrakech - Agafay Desert - Lake Lalla Takerkoust - Kik Plateau - Asni - Marrakech
              </h1>
            </div>
            
            {/* Description with animation */}
            <div className="overflow-hidden mb-9">
              <p 
                className="text-[#475569] text-lg leading-relaxed max-w-xl"
                style={{ 
                  opacity: isLoaded ? 1 : 0, 
                  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '0.5s'
                }}
              >
                An early departure in 4x4 for your private day tour, you start from Marrakech at 9:00 a.m. and set off to discover the Agafay desert, just 30 mins from Marrakech city. For those who haven't got sufficient time for a desert tour from Marrakech, all the way south to the Sahara dunes, then Agafay desert is the next best thing. Unlike the Sahara though this is not a sand desert - its more of an undulating, baked limestone and clay plateau. Sandstone crags, traditional earth-built villages, dusty river beds are interspersed with spectacular lush pasture and flora in the spring.
              </p>
            </div>
            
            {/* Feature highlights with animation */}
            <div 
              className="grid grid-cols-2 gap-y-5 gap-x-8 mb-10"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '0.6s'
              }}
            >
              {[
                { icon: <CheckIcon className="w-4 h-4 text-[#B45309]" />, text: 'Expert local Berber guides' },
                { icon: <UserIcon className="w-4 h-4 text-[#B45309]" />, text: 'Small groups (6-8 travelers)' },
                { icon: <SunIcon className="w-4 h-4 text-[#B45309]" />, text: 'Authentic cultural experiences' },
                { icon: <CurrencyDollarIcon className="w-4 h-4 text-[#B45309]" />, text: 'All-inclusive packages' },
              ].map((feature, index) => (
                <div key={index} className="flex items-center group">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center border border-[#FDE68A] bg-[#FFFBEB] shadow-sm mr-3">
                    {feature.icon}
                  </div>
                  <span className="text-[#334155] text-sm font-medium group-hover:text-[#0F172A] transition-colors duration-300">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Rating and reviews */}
            <div 
              className="mb-10 flex items-center"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '0.7s'
              }}
            >
              <div className="flex mr-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-[#F59E0B]" />
                ))}
              </div>
              <div className="text-[#334155] text-sm font-medium">
                <span className="text-[#0F172A]">4.9</span> (487 verified reviews)
              </div>
            </div>
            
            {/* CTA buttons with staggered animation */}
            <div 
              className="flex flex-wrap gap-4"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '0.8s'
              }}
            >
              <button
                onClick={openBookingModal}
                onMouseEnter={() => setHoverState(prev => ({...prev, bookButton: true}))}
                onMouseLeave={() => setHoverState(prev => ({...prev, bookButton: false}))}
                className="relative group inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-[#B45309] to-[#D97706] px-6 py-3.5 font-medium text-white shadow-lg shadow-amber-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2"
              >
                <div className="absolute inset-0 transform scale-x-0 origin-left rounded-lg bg-gradient-to-r from-[#92400E] to-[#B45309] transition-transform duration-500 ease-out group-hover:scale-x-100"></div>
                <span className="relative flex items-center">
                  <ShieldCheckIcon className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:scale-110" />
                  <span>Book Your Experience</span>
                  <ChevronRightIcon 
                    className={`w-5 h-5 ml-2 transition-all duration-300 ease-in-out ${hoverState.bookButton ? 'translate-x-1 opacity-100' : 'opacity-70'}`}
                  />
                </span>
              </button>
              
              <button
                onClick={scrollToExcursions}
                onMouseEnter={() => setHoverState(prev => ({...prev, exploreButton: true}))}
                onMouseLeave={() => setHoverState(prev => ({...prev, exploreButton: false}))}
                className="group inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-6 py-3.5 font-medium text-[#334155] shadow-sm transition-all duration-300 hover:border-[#CBD5E1] hover:bg-[#F8FAFC] hover:text-[#0F172A] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:ring-offset-2"
              >
                <span className="flex items-center">
                  <span>Explore Our Tours</span>
                  <ArrowRightIcon
                    className={`w-4 h-4 ml-2 transition-all duration-300 ease-in-out ${hoverState.exploreButton ? 'translate-x-1 opacity-100' : 'opacity-70'}`}
                  />
                </span>
              </button>
            </div>
          </div>
          
          {/* Right image column */}
          <div 
            className="w-full lg:w-[55%] relative z-10"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transition: 'opacity 1s ease-out, transform 1s ease-out',
              transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
              transitionDelay: '0.4s'
            }}
          >
            <div 
              className="relative rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-white/50"
              onMouseEnter={() => setHoverState(prev => ({...prev, imageHover: true}))}
              onMouseLeave={() => setHoverState(prev => ({...prev, imageHover: false}))}
            >
              {/* Main image carousel */}
              <div className="aspect-[4/3] relative">
                {imageGallery.map((image, index) => (
                  <div 
                    key={index}
                    className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                    style={{ opacity: activeImage === index ? 1 : 0 }}
                  >
                    <Image 
                      src={image}
                      alt={`Morocco ${destinations[index % destinations.length]} Experience`}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      className={`object-cover object-center transition-transform duration-1000 ease-out ${hoverState.imageHover ? 'scale-105' : 'scale-100'}`}
                      priority={index === 0}
                      quality={95}
                    />
                  </div>
                ))}
                
                {/* Premium overlay with glass effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/30 to-transparent pointer-events-none"></div>
                
                {/* Image indicators */}
                <div className="absolute bottom-5 inset-x-0 flex justify-center space-x-2 z-10">
                  {imageGallery.map((_, index) => (
                    <button 
                      key={index} 
                      className={`w-2 h-2 rounded-full transition-all duration-300 ease-out focus:outline-none
                      ${activeImage === index ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'}`}
                      onClick={() => setActiveImage(index)}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Top badges */}
              <div className="absolute top-5 left-5 flex items-center space-x-3">
                <div className="flex items-center rounded-lg bg-black/30 backdrop-blur-md border border-white/10 px-3.5 py-2 text-white text-sm font-medium">
                  <CalendarDaysIcon className="w-4 h-4 mr-2 text-amber-400" />
                  Available Daily
                </div>
              </div>
              
              <div className="absolute top-5 right-5">
                <div className="flex items-center rounded-lg bg-black/30 backdrop-blur-md border border-white/10 px-3.5 py-2 text-white text-sm font-medium">
                  <GlobeAltIcon className="w-4 h-4 mr-2 text-amber-400" />
                  Morocco
                </div>
              </div>
              
              {/* Bottom info cards */}
              <div className="absolute left-5 right-5 bottom-5 grid grid-cols-2 gap-3">
                <div className="bg-white/90 backdrop-blur-md rounded-lg border border-white/80 p-3 shadow-lg flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-full p-2 flex-shrink-0">
                    <MapPinIcon className="w-5 h-5 text-[#B45309]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide">Destinations</p>
                    <p className="text-sm text-[#0F172A] font-semibold">25+ locations</p>
                  </div>
                </div>
                
                <div className="bg-white/90 backdrop-blur-md rounded-lg border border-white/80 p-3 shadow-lg flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-full p-2 flex-shrink-0">
                    <UserIcon className="w-5 h-5 text-[#B45309]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] font-medium uppercase tracking-wide">Travelers</p>
                    <p className="text-sm text-[#0F172A] font-semibold">10k+ annually</p>
                  </div>
                </div>
              </div>
              
              {/* Highlight effect on corners */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-b from-white/20 to-transparent rounded-bl-[100%] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-t from-white/10 to-transparent rounded-tr-[100%] pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Booking modal */}
      <NewBookingModal 
        isOpen={isBookingModalOpen} 
        closeModal={closeBookingModal} 
        excursionTitle="Morocco Experience"
        excursionType="EXCURSION"
        onBookingSuccess={() => {}}
      />
    </section>
  );
} 