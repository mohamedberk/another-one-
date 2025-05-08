"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeftIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  TagIcon,
  ArrowRightIcon,
  StarIcon as StarIconOutline,
  CheckCircleIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon,
} from "@heroicons/react/24/solid";
import { getActivityByIdAdapter } from "@/utils/activities6Adapter";
import { notFound } from "next/navigation";
// Import the activityImages constants
import { getActivityImage, ACTIVITY_IMAGES } from "@/utils/activityImages";
import { activities6, Activity6 } from "@/utils/activities";
import { clashDisplay, cabinetGrotesk } from '../fonts';

// Main component for the activity detail page
export default function ActivityDetailPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') as string;
  const activity = getActivityByIdAdapter(id);
  
  // Handle 404 if activity not found
  if (!activity) {
    notFound();
  }
  
  // Get activity images based on the activity type
  const getActivityImages = () => {
    // Determine which images to use based on activity ID
    if (id.includes('quad') && !id.includes('camel')) {
      return [getActivityImage('quad', 0), getActivityImage('quad', 1)];
    } else if (id.includes('camel') && !id.includes('quad')) {
      return [getActivityImage('camel', 0), getActivityImage('camel', 1)];
    } else if (id.includes('buggy')) {
      return [getActivityImage('buggy', 0), getActivityImage('buggy', 1)];
    } else if (id.includes('balloon')) {
      return [getActivityImage('balloon', 0), getActivityImage('balloon', 1)];
    } else if (id.includes('quad-camel')) {
      return [getActivityImage('quadCamel', 0), getActivityImage('quadCamel', 1)];
    }
    
    // Fallback to existing image
    const defaultImage = typeof activity.image === "string" ? activity.image : activity.image.src;
    return [defaultImage, defaultImage];
  };
  
  const [activityImages] = useState(getActivityImages());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === activityImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activityImages.length]);
  
  // Format price with Euro symbol
  const formatPrice = (price: number) => {
    return `€${price.toLocaleString()}`;
  };

  // State for managing visible activities
  const [showNextSet, setShowNextSet] = useState(false);
  const otherActivities = activities6.filter((dest: Activity6) => dest.id !== activity.id);

  // Get the appropriate set of activities
  const visibleActivities = showNextSet 
    ? otherActivities.slice(3, 5) // Show last 2 activities
    : otherActivities.slice(0, 3); // Show first 3 activities

  // Toggle between sets
  const toggleActivities = () => {
    setShowNextSet(!showNextSet);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-amber-50/80 via-white to-amber-50/60 ${cabinetGrotesk.variable} ${clashDisplay.variable}`}>
      {/* Enhanced hero content with improved hierarchy */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-1">
        {/* Streamlined title and metadata in a single line */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className="glassmorphism-icon p-2 rounded-full text-gray-800 transition-colors"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </Link>
            <h1 className={`text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 ${cabinetGrotesk.className}`}>
              {activity.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {activity.tag && (
              <span className="hidden md:flex glassmorphism-badge text-amber-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                {activity.tag}
              </span>
            )}
            <div className="glassmorphism-badge flex items-center gap-1 px-2.5 py-1 rounded-full">
              <StarIcon className="w-3.5 h-3.5 text-amber-500" />
              <div>
                <span className="font-bold text-gray-900 text-sm">{activity.rating}</span>
                <span className="text-gray-500 text-xs ml-0.5">({activity.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image and booking card side by side with enhanced glass morphism */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6 mb-0">
          {/* Left column with enhanced image gallery and details */}
          <div className="lg:col-span-3 space-y-4">
            {/* Main Image - enhanced with premium effect */}
            <div className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-amber-100/30 group transition-all duration-500">
              {activityImages.map((image, index) => (
                <div 
                  key={index}
                  className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
                  style={{ 
                    opacity: currentImageIndex === index ? 1 : 0,
                    zIndex: currentImageIndex === index ? 1 : 0 
                  }}
                >
                  <Image 
                    src={image}
                    alt={`${activity.title} - Image ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover transition-transform duration-10000 ease-out"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    quality={90}
                    style={{
                      transform: currentImageIndex === index ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 5s ease-out'
                    }}
                  />
                </div>
              ))}
              
              {/* Enhanced overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent group-hover:from-black/40 group-hover:via-black/15 transition-all duration-500 z-[2]"></div>
              
              {/* Image indicators with enhanced styling */}
              <div className="absolute bottom-5 right-5 flex space-x-2 z-[3]">
                {activityImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 shadow-md ${
                      currentImageIndex === index 
                        ? "bg-white scale-125 border border-white/50" 
                        : "bg-white/40 hover:bg-white/70 border border-white/30"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Activity key details - enhanced with premium glass card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700/50 transform hover:shadow-xl transition-all duration-300 mt-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-700/50">
                <div className="p-2.5 sm:p-3 hover:bg-gray-800/50 transition-colors duration-300">
                  <div className="flex items-center gap-1 text-emerald-400 mb-1">
                    <ClockIcon className="h-3.5 w-3.5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Duration</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-300">{activity.duration}</p>
                </div>
                
                <div className="p-2.5 sm:p-3 hover:bg-gray-800/50 transition-colors duration-300">
                  <div className="flex items-center gap-1 text-emerald-400 mb-1">
                    <MapPinIcon className="h-3.5 w-3.5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Location</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-300">{activity.location}</p>
                </div>
                
                <div className="p-2.5 sm:p-3 hover:bg-gray-800/50 transition-colors duration-300">
                  <div className="flex items-center gap-1 text-emerald-400 mb-1">
                    <UserGroupIcon className="h-3.5 w-3.5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Group Size</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-300">Max {activity.maxParticipants} people</p>
                </div>
                
                <div className="p-2.5 sm:p-3 hover:bg-gray-800/50 transition-colors duration-300">
                  <div className="flex items-center gap-1 text-emerald-400 mb-1">
                    <CalendarDaysIcon className="h-3.5 w-3.5" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Availability</span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-300">Daily Tours</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking card - enhanced glass morphism */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden flex-grow flex flex-col border border-gray-700/50 shadow-2xl">
              {/* Card header with enhanced gradient */}
              <div className="relative p-6 overflow-hidden bg-transparent border-b border-gray-700/50">
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`text-xl font-black text-white ${cabinetGrotesk.className}`}>
                      Book This Experience
                    </h3>
                    <div className="bg-gray-800/80 backdrop-blur-sm flex items-center gap-1.5 px-2.5 py-1 rounded-full text-emerald-400 border border-emerald-500/20">
                      <ClockIcon className="h-4 w-4" />
                      <span className={`text-sm font-medium ${clashDisplay.className}`}>Duration: {activity.duration}</span>
                    </div>
                  </div>
                  <p className={`text-sm text-gray-400 ${clashDisplay.className}`}>Secure your spot with instant confirmation</p>
                </div>
              </div>
              
              {/* Price cards with enhanced glass effect */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="space-y-4 mb-6">
                  {/* Standard Experience */}
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 flex justify-between items-center mb-2 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="bg-emerald-500/10 p-2 mr-2 rounded-lg border border-emerald-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className={`font-black text-white ${cabinetGrotesk.className}`}>Standard Experience</p>
                        <p className={`text-xs text-gray-400 ${clashDisplay.className}`}>{activity.duration} activity</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-black text-emerald-400 ${cabinetGrotesk.className}`}>{`${activity.groupPrice} MAD`}</p>
                      <p className={`text-xs text-gray-400 ${clashDisplay.className}`}>per person</p>
                    </div>
                  </div>
                  
                  {/* Children Discount */}
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 flex justify-between items-center shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="bg-emerald-500/10 p-2 mr-2 rounded-lg border border-emerald-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                      <div>
                        <p className={`font-black text-white ${cabinetGrotesk.className}`}>Children Discount</p>
                        <p className={`text-xs text-gray-400 ${clashDisplay.className}`}>Under 16 years old</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-black text-emerald-400 ${cabinetGrotesk.className}`}>40% Off</p>
                      <p className={`text-xs text-gray-400 ${clashDisplay.className}`}>of adult price</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  {/* CTA Button with premium glass effect */}
                  <Link 
                    href={`/activities/${id}/booking?from=details`}
                    className="w-full px-4 py-3 rounded-xl text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 inline-flex items-center justify-center gap-2 font-semibold"
                  >
                    <span>Book This Experience</span>
                    <ArrowRightIcon className="h-5 w-5" />
                  </Link>
                  
                  {/* Trust badges with glass effect */}
                  <div className="pt-4 mt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
                        <ShieldCheckIcon className="h-4 w-4 text-emerald-400" />
                      </div>
                      <p className={`text-xs text-gray-300 ${clashDisplay.className}`}>Free cancellation up to 24 hours before</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className={`text-xs text-gray-300 ${clashDisplay.className}`}>Secure payments through our platform</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className={`text-xs text-gray-300 ${clashDisplay.className}`}>24/7 customer support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content section - enhanced with premium typography and layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 pt-2">
        <div className="grid grid-cols-1 gap-8">
          {/* Content section - enhanced with premium design */}
          <div className="space-y-8">
            {/* Description with enhanced typography and styling */}
            <div className="bg-white rounded-2xl shadow-md p-8 w-full overflow-hidden relative border border-amber-100/40 transform hover:shadow-lg transition-all duration-300">
              {/* Background decoration with subtle patterns */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/80 rounded-full opacity-30 transform translate-x-20 -translate-y-20"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-50/50 rounded-full"></div>
              
              {/* Section heading with elegant styling and icon */}
              <div className="relative mb-6 flex items-end">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h2 className={`text-2xl md:text-3xl font-black text-gray-900 ${cabinetGrotesk.className}`}>About This Experience</h2>
                  <div className="absolute -bottom-2 left-11 h-1 w-24 bg-amber-500 rounded-full"></div>
                </div>
              </div>
              
              {/* Main description with enhanced typography */}
              <div className="prose max-w-none relative">
                <p className={`text-gray-700 leading-relaxed text-lg ${clashDisplay.className}`}>{activity.longDescription}</p>
                
                {activity.id.includes("quad") && (
                  <div className="mt-6 space-y-4">
                    <p className={`text-gray-700 leading-relaxed ${clashDisplay.className}`}>
                      Experience the thrill of quad biking through the stunning Palmeraie of Marrakech, a magnificent oasis dotted with over 150,000 palm trees. Your adventure begins with a safety briefing and equipment fitting, ensuring you're comfortable and ready for the exciting journey ahead.
                    </p>
                    <p className={`text-gray-700 leading-relaxed ${clashDisplay.className}`}>
                      Navigate through various terrains as expert guides lead you through challenging trails, dry riverbeds, and traditional Berber villages. Feel the adrenaline rush as you traverse this picturesque landscape, taking in breathtaking views of palm groves against the backdrop of the Atlas Mountains.
                    </p>
                    <p className={`text-gray-700 leading-relaxed ${clashDisplay.className}`}>
                      During your 1-hour expedition, you'll have opportunities to stop and capture stunning photos. Midway through, enjoy a refreshing break with traditional Moroccan mint tea and homemade snacks at an authentic Berber house, allowing you to experience local hospitality and customs.
                    </p>
                  </div>
                )}
                
                {activity.id.includes("camel") && (
                  <div className="mt-6 space-y-4">
                    <p className={`text-gray-700 leading-relaxed ${clashDisplay.className}`}>
                      Embark on a timeless journey through the serene Palmeraie of Marrakech on the back of a gentle camel, the traditional "ship of the desert." This authentic experience connects you with centuries of Moroccan desert tradition and offers a unique perspective of the majestic palm groves.
                    </p>
                    <p className={`text-gray-700 leading-relaxed ${clashDisplay.className}`}>
                      As you sway gently atop your camel, guided by experienced handlers, you'll traverse tranquil paths through lush palm groves and discover hidden Berber villages. Your guide will share insights into local culture and the significance of camels in Moroccan heritage.
                    </p>
                    <p className={`text-gray-700 leading-relaxed ${clashDisplay.className}`}>
                      The peaceful rhythm of the camel's gait allows you to fully absorb the natural beauty surrounding you. During this 1-hour ride, you'll have the perfect opportunity to take memorable photos dressed in traditional Moroccan attire, creating lasting memories of your Marrakech adventure.
                    </p>
                  </div>
                )}
                
                {activity.id.includes("buggy") && (
                  <div className="mt-6 space-y-4">
                    <p className={`text-gray-700 leading-relaxed ${clashDisplay.className}`}>
                      Discover the thrill of driving a powerful buggy through the diverse landscapes of Palmeraie, Marrakech. After a comprehensive safety briefing and vehicle orientation, you'll take control of these robust vehicles designed for off-road adventures.
                    </p>
                    <p className={`text-gray-700 leading-relaxed ${clashDisplay.className}`}>
                      Navigate through challenging terrain as you follow expert guides through palm groves, rocky paths, and open spaces. The buggies offer a unique combination of speed, stability, and maneuverability, making them perfect for exploring this diverse ecosystem.
                    </p>
                    <p className={`text-gray-700 leading-relaxed ${clashDisplay.className}`}>
                      This 1-hour adventure provides an exhilarating experience as you drive through varied landscapes, with stops at scenic viewpoints. Halfway through, enjoy a traditional Moroccan tea break in an authentic setting, offering a perfect contrast to the high-energy driving experience.
                    </p>
                  </div>
                )}
                
                {activity.id.includes("balloon") && (
                  <div className="mt-6 space-y-4">
                    <p className={`text-gray-700 leading-relaxed ${clashDisplay.className}`}>
                      Float peacefully above the magnificent landscapes of Marrakech in a hot air balloon, offering unparalleled panoramic views of the Palmeraie, desert, and Atlas Mountains. Your adventure begins before dawn with pickup from your accommodation and transport to the launch site.
                    </p>
                    <p className={`text-gray-700 leading-relaxed ${clashDisplay.className}`}>
                      Witness the spectacular process of balloon inflation while enjoying Moroccan tea and light refreshments. As you ascend with the sunrise, experience the magical golden light illuminating the landscape below. During your 40-60 minute flight, your pilot will point out significant landmarks and share interesting facts about the region.
                    </p>
                    <p className={`text-gray-700 leading-relaxed ${clashDisplay.className}`}>
                      Upon landing, celebrate your flight with a traditional Berber breakfast in a comfortable tent. This magical experience combines tranquility, adventure, and cultural immersion, creating memories that will last a lifetime.
                    </p>
                  </div>
                )}
                
                {/* Testimonial quote with enhanced design */}
                <blockquote className={`mt-6 border-l-4 border-amber-500 pl-6 italic text-gray-700 bg-amber-50/50 p-5 rounded-r-xl shadow-sm ${clashDisplay.className}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400/40 mb-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-base font-medium italic">
                    "Join us for an unforgettable adventure through Morocco's most breathtaking landscapes and immerse yourself in the rich cultural heritage of the Palmeraie region, just minutes from bustling Marrakech."
                  </p>
                  <footer className="text-sm text-amber-800 mt-2 font-medium">— Morocco Travel Guide</footer>
                </blockquote>
              </div>
            </div>

            {/* What's Included/Excluded with premium design - Moved up */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl p-6 overflow-hidden relative border border-gray-700/50 transform hover:shadow-xl transition-all duration-300">
                {/* Decorative accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-t-xl"></div>
                
                <h3 className={`text-xl font-black text-white mb-4 flex items-center gap-2 ${cabinetGrotesk.className}`}>
                  <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span>What's Included</span>
                </h3>
                
                <ul className={`space-y-3 ${clashDisplay.className}`}>
                  {activity.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 flex-shrink-0 mt-1 border border-emerald-500/20">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activity.excludes && (
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl p-6 overflow-hidden relative border border-gray-700/50 transform hover:shadow-xl transition-all duration-300">
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-t-xl"></div>
                  
                  <h3 className={`text-xl font-black text-white mb-4 flex items-center gap-2 ${cabinetGrotesk.className}`}>
                    <div className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                      <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Not Included</span>
                  </h3>
                  
                  <ul className={`space-y-3 ${clashDisplay.className}`}>
                    {activity.excludes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 flex-shrink-0 mt-1 border border-emerald-500/20">
                          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Experience Highlights with premium design */}
            <div className="bg-gradient-to-br from-white to-amber-50/40 rounded-2xl shadow-md p-8 w-full relative overflow-hidden border border-amber-100/40">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 h-24 w-24 bg-amber-100/70 rounded-full opacity-50 transform translate-x-1/2 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 h-32 w-32 bg-amber-100/70 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
              
              <div className="relative">
                <h2 className={`text-2xl font-black text-gray-900 mb-6 ${cabinetGrotesk.className} flex items-center`}>
                  <span className="flex-shrink-0 p-2 bg-amber-100 rounded-lg mr-3 text-amber-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Experience Highlights
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activity.highlights.map((highlight, index) => (
                    <div 
                      key={index} 
                      className={`flex items-start gap-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-amber-100/50 transform hover:-translate-y-0.5 ${clashDisplay.className}`}
                    >
                      <div className="bg-amber-100 rounded-full p-1.5 text-amber-700 flex-shrink-0 mt-0.5">
                        <CheckCircleIcon className="h-4 w-4" />
                      </div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Activities You Might Like - New Section */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1 bg-amber-600 rounded-full"></div>
                <h2 className={`text-2xl font-black text-gray-900 ${cabinetGrotesk.className}`}>Other Activities You Might Like</h2>
              </div>
              
              <div className="relative">
                {/* Left Navigation Arrow */}
                <button
                  onClick={toggleActivities}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-amber-100/50 hover:bg-amber-50/90 transition-all duration-300 group flex items-center justify-center"
                  aria-label="View previous activities"
                >
                  <div className="relative w-6 h-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <ChevronLeftIcon className="h-6 w-6 text-amber-600 group-hover:text-white relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={toggleActivities}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-amber-100/50 hover:bg-amber-50/90 transition-all duration-300 group flex items-center justify-center"
                  aria-label="View more activities"
                >
                  <div className="relative w-6 h-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <ChevronRightIcon className="h-6 w-6 text-amber-600 group-hover:text-white relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                 
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleActivities.map((otherActivity: Activity6) => {
                    // Get the appropriate image for the activity
                    let imageUrl = otherActivity.image;
                    if (otherActivity.id === 'quad') {
                      imageUrl = getActivityImage('quad', 0);
                    } else if (otherActivity.id === 'camel') {
                      imageUrl = getActivityImage('camel', 0);
                    } else if (otherActivity.id === 'buggy') {
                      imageUrl = getActivityImage('buggy', 0);
                    } else if (otherActivity.id === 'balloon') {
                      imageUrl = getActivityImage('balloon', 0);
                    } else if (otherActivity.id === 'quad-camel') {
                      imageUrl = getActivityImage('quadCamel', 0);
                    }

                    return (
                      <div 
                        key={otherActivity.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 relative flex flex-col border border-amber-100/50 hover:shadow-2xl group hover:-translate-y-2"
                      >
                        <div className="h-48 relative overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={otherActivity.name}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity"></div>
                          
                          {/* Duration badge */}
                          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-md z-10">
                            <ClockIcon className="h-3.5 w-3.5 text-amber-600" />
                            <span className="text-gray-800">{otherActivity.duration}</span>
                          </div>
                        </div>
                        
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className={`text-lg font-black text-gray-800 mb-2 group-hover:text-amber-700 transition-colors ${cabinetGrotesk.className}`}>
                            {otherActivity.name}
                          </h3>
                          
                          <p className={`text-gray-600 text-sm mb-4 line-clamp-2 ${clashDisplay.className}`}>
                            {otherActivity.description}
                          </p>
                          
                          <div className="mt-auto flex justify-between items-center pt-4 border-t border-amber-100/50">
                            <div className="flex flex-col">
                              <span className="text-lg font-bold text-amber-700">{otherActivity.price}</span>
                              <span className="text-xs text-amber-600/70">per person</span>
                            </div>
                            
                            <Link 
                              href={`/activities?id=${otherActivity.id}`}
                              className="px-4 py-2 rounded-lg text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200 transition-all duration-300"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium footer section */}
      <div className="bg-amber-50/60 mt-12 py-10 border-t border-amber-100/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className={`text-xl font-black text-amber-800 mb-4 ${cabinetGrotesk.className}`}>Ready for an Unforgettable Adventure?</h3>
            <p className={`text-amber-700 max-w-2xl mx-auto mb-6 ${clashDisplay.className}`}>Experience the magic of Morocco with our premium tours. Book today and create memories that will last a lifetime!</p>
            <Link 
              href={`/activities/${id}/booking?from=details`}
              className="px-4 py-2 rounded-xl text-white shadow-md shadow-amber-300/20 hover:shadow-lg hover:shadow-amber-300/30 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 bg-gradient-to-r from-amber-500 to-orange-500 inline-flex items-center justify-center"
            >
              <span className="relative z-10">Book Now</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
                  backgroundSize: '200% 100%',
                  animation: 'shine 1.5s infinite linear'
                }}
              ></div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Additional space at bottom */}
      <div className="h-8"></div>
    </div>
  );
} 
