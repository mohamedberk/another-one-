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
} from "@heroicons/react/24/outline";
import {
  StarIcon,
} from "@heroicons/react/24/solid";
import { getActivityByIdAdapter } from "@/utils/activities6Adapter";
import { notFound } from "next/navigation";
// Import the activityImages constants
import { getActivityImage, ACTIVITY_IMAGES } from "@/utils/activityImages";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Premium header bar - enhanced with glass morphism */}
      <div className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-30 border-b border-amber-100/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-800 hover:text-amber-600 transition-colors"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              <span className="font-medium">Back to Experiences</span>
            </Link>
            
            {/* Share button */}
            <button className="p-2 rounded-full text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced hero content with improved hierarchy */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        {/* Breadcrumb + Tag + Rating with improved hierarchy */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 text-amber-800/70 text-sm">
            <span>Home</span>
            <ArrowRightIcon className="h-3 w-3" />
            <span>Experiences</span>
            <ArrowRightIcon className="h-3 w-3" />
            <span className="text-amber-800 font-medium">{activity.title.split(' ').slice(0, 2).join(' ')}</span>
          </div>
          <div className="flex items-center gap-3">
          {activity.tag && (
            <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
              {activity.tag}
            </span>
          )}
          
            <div className="flex items-center gap-1 bg-white rounded-lg px-3 py-1.5 shadow-sm border border-amber-100/50">
              <StarIcon className="w-4 h-4 text-amber-500" />
            <div>
              <span className="font-bold text-gray-900">{activity.rating}</span>
                <span className="text-gray-500 text-sm ml-0.5">({activity.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Title with enhanced typography */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif leading-tight">
          {activity.title}
        </h1>
        
        {/* Enhanced subtitle with location */}
        <div className="flex items-center gap-1.5 text-amber-700 mb-6">
          <MapPinIcon className="h-4 w-4" />
          <p className="text-base">{activity.location}</p>
        </div>
        
        {/* Image and booking card side by side with enhanced spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-0">
          {/* Left column with enhanced image gallery and details */}
          <div className="lg:col-span-3 space-y-8">
            {/* Main Image - enhanced with premium shadows and borders */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-amber-100/30 group transition-all duration-500">
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
                    quality={95}
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
                        ? "bg-white scale-125" 
                        : "bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Activity key details - enhanced with premium card styling */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100/50 transform hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-amber-100/50">
                <div className="p-4 sm:p-5 hover:bg-amber-50/50 transition-colors duration-300">
                  <div className="flex items-center gap-1.5 text-amber-700 mb-1.5">
                    <ClockIcon className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Duration</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{activity.duration}</p>
                </div>
                
                <div className="p-4 sm:p-5 hover:bg-amber-50/50 transition-colors duration-300">
                  <div className="flex items-center gap-1.5 text-amber-700 mb-1.5">
                    <MapPinIcon className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Location</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{activity.location}</p>
                </div>
                
                <div className="p-4 sm:p-5 hover:bg-amber-50/50 transition-colors duration-300">
                  <div className="flex items-center gap-1.5 text-amber-700 mb-1.5">
                    <UserGroupIcon className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Group Size</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Max {activity.maxParticipants} people</p>
                </div>
                
                <div className="p-4 sm:p-5 hover:bg-amber-50/50 transition-colors duration-300">
                  <div className="flex items-center gap-1.5 text-amber-700 mb-1.5">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-wide">Availability</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Daily Tours</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking card - enhanced with premium design */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden flex-grow flex flex-col border border-amber-100/40 transform hover:shadow-2xl transition-all duration-500">
              {/* Pricing card header with enhanced gradient */}
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white relative overflow-hidden">
                {/* Background texture */}
                <div className="absolute inset-0 opacity-10 bg-repeat" style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '20px 20px'
                }}></div>
                
                {/* Content with enhanced spacing and typography */}
                <div className="relative">
                  <h3 className="text-xl font-bold mb-1 flex items-center">
                    Book This Experience
                    <span className="ml-2 bg-white/20 text-white text-xs font-medium px-2 py-0.5 rounded-full">Verified</span>
                  </h3>
                  <p className="text-sm text-amber-50">Secure your spot with instant confirmation</p>
                </div>
              </div>
              
              {/* Pricing options with enhanced styling */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="space-y-5 mb-6">
                  {/* Group tour option with premium design */}
                  <div className="flex justify-between items-center p-5 bg-amber-50 rounded-lg border border-amber-100 relative overflow-hidden hover:shadow-md transition-all duration-300">
                    <div className="absolute left-0 inset-y-0 w-1 bg-amber-500"></div>
                    <div>
                      <p className="font-medium text-gray-900 flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Standard Experience
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{activity.duration} activity</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-700 transition-all duration-300 hover:scale-105">{`${activity.groupPrice} MAD`}</p>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                  </div>
                  
                  {/* Children discount info with enhanced UI */}
                  <div className="flex justify-between items-center p-5 bg-white rounded-lg border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-md">
                    <div>
                      <p className="font-medium text-gray-900 flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        Children Discount
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Under 16 years old</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600 transition-all duration-300 hover:scale-105">40% Off</p>
                      <p className="text-xs text-gray-500">of adult price</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  {/* CTA Button with enhanced premium styling */}
                  <Link 
                    href={`/activities/${id}/booking?from=details`}
                    className="block w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-4 px-6 rounded-lg text-center transition-all duration-300 text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    Book Now
                  </Link>
                  
                  {/* Enhanced trust badges */}
                  <div className="pt-5 border-t border-amber-100/50 space-y-3 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-amber-50 rounded-full border border-amber-100/50">
                        <ShieldCheckIcon className="h-4 w-4 text-amber-600" />
                      </div>
                      <p className="text-sm text-gray-700">Free cancellation up to 24 hours before</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-amber-50 rounded-full border border-amber-100/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">Secure payments through our platform</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-amber-50 rounded-full border border-amber-100/50">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-700">24/7 customer support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content section - enhanced with premium typography and layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pt-4">
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
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-serif">About This Experience</h2>
                  <div className="absolute -bottom-2 left-11 h-1 w-24 bg-amber-500 rounded-full"></div>
                </div>
              </div>
              
              {/* Main description with enhanced typography */}
              <div className="prose max-w-none relative">
                <p className="text-gray-700 leading-relaxed text-lg">{activity.longDescription}</p>
                
                {activity.id.includes("quad") && (
                  <div className="mt-6 space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Experience the thrill of quad biking through the stunning Palmeraie of Marrakech, a magnificent oasis dotted with over 150,000 palm trees. Your adventure begins with a safety briefing and equipment fitting, ensuring you're comfortable and ready for the exciting journey ahead.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Navigate through various terrains as expert guides lead you through challenging trails, dry riverbeds, and traditional Berber villages. Feel the adrenaline rush as you traverse this picturesque landscape, taking in breathtaking views of palm groves against the backdrop of the Atlas Mountains.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      During your 1-hour expedition, you'll have opportunities to stop and capture stunning photos. Midway through, enjoy a refreshing break with traditional Moroccan mint tea and homemade snacks at an authentic Berber house, allowing you to experience local hospitality and customs.
                    </p>
                  </div>
                )}
                
                {activity.id.includes("camel") && (
                  <div className="mt-6 space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Embark on a timeless journey through the serene Palmeraie of Marrakech on the back of a gentle camel, the traditional "ship of the desert." This authentic experience connects you with centuries of Moroccan desert tradition and offers a unique perspective of the majestic palm groves.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      As you sway gently atop your camel, guided by experienced handlers, you'll traverse tranquil paths through lush palm groves and discover hidden Berber villages. Your guide will share insights into local culture and the significance of camels in Moroccan heritage.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      The peaceful rhythm of the camel's gait allows you to fully absorb the natural beauty surrounding you. During this 1-hour ride, you'll have the perfect opportunity to take memorable photos dressed in traditional Moroccan attire, creating lasting memories of your Marrakech adventure.
                    </p>
                  </div>
                )}
                
                {activity.id.includes("buggy") && (
                  <div className="mt-6 space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Discover the thrill of driving a powerful buggy through the diverse landscapes of Palmeraie, Marrakech. After a comprehensive safety briefing and vehicle orientation, you'll take control of these robust vehicles designed for off-road adventures.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Navigate through challenging terrain as you follow expert guides through palm groves, rocky paths, and open spaces. The buggies offer a unique combination of speed, stability, and maneuverability, making them perfect for exploring this diverse ecosystem.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      This 1-hour adventure provides an exhilarating experience as you drive through varied landscapes, with stops at scenic viewpoints. Halfway through, enjoy a traditional Moroccan tea break in an authentic setting, offering a perfect contrast to the high-energy driving experience.
                    </p>
                  </div>
                )}
                
                {activity.id.includes("balloon") && (
                  <div className="mt-6 space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                      Float peacefully above the magnificent landscapes of Marrakech in a hot air balloon, offering unparalleled panoramic views of the Palmeraie, desert, and Atlas Mountains. Your adventure begins before dawn with pickup from your accommodation and transport to the launch site.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Witness the spectacular process of balloon inflation while enjoying Moroccan tea and light refreshments. As you ascend with the sunrise, experience the magical golden light illuminating the landscape below. During your 40-60 minute flight, your pilot will point out significant landmarks and share interesting facts about the region.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Upon landing, celebrate your flight with a traditional Berber breakfast in a comfortable tent. This magical experience combines tranquility, adventure, and cultural immersion, creating memories that will last a lifetime.
                    </p>
                  </div>
                )}
                
                {/* Testimonial quote with enhanced design */}
                <blockquote className="mt-6 border-l-4 border-amber-500 pl-6 italic text-gray-700 bg-amber-50/50 p-5 rounded-r-xl shadow-sm">
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

            {/* Experience Highlights with premium design */}
            <div className="bg-gradient-to-br from-white to-amber-50/40 rounded-2xl shadow-md p-8 w-full relative overflow-hidden border border-amber-100/40">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 h-24 w-24 bg-amber-100/70 rounded-full opacity-50 transform translate-x-1/2 -translate-y-1/3"></div>
              <div className="absolute bottom-0 left-0 h-32 w-32 bg-amber-100/70 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
              
              <div className="relative">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif flex items-center">
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
                      className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-amber-100/50 transform hover:-translate-y-0.5"
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

            {/* What's Included/Excluded with premium design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden relative border border-green-200/50 transform hover:shadow-lg transition-all duration-300">
                {/* Decorative accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-500 to-green-300 rounded-t-xl"></div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="p-1.5 bg-green-100 rounded-lg">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <span>What's Included</span>
                </h3>
                
                <ul className="space-y-3">
                  {activity.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="p-1 rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-1">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activity.excludes && (
                <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden relative border border-red-200/50 transform hover:shadow-lg transition-all duration-300">
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 to-red-300 rounded-t-xl"></div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="p-1.5 bg-red-100 rounded-lg">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    </div>
                    <span>Not Included</span>
                  </h3>
                  
                  <ul className="space-y-3">
                    {activity.excludes.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="p-1 rounded-full bg-red-100 text-red-600 flex-shrink-0 mt-1">
                          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Itinerary with premium design */}
            {activity.itinerary && (
              <div className="bg-white rounded-xl shadow-md p-8 w-full overflow-hidden relative border border-amber-100/40 transform hover:shadow-lg transition-all duration-300">
                {/* Background decoration - subtle pattern */}
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-amber-50/80 rounded-full opacity-50"></div>
                <div className="absolute inset-0 opacity-5 bg-repeat" style={{ 
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
                
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="bg-amber-100 p-2 rounded-lg mr-4 text-amber-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 font-serif">Tour Itinerary</h2>
                      <p className="text-gray-600 text-sm mt-1">Follow your adventure step by step</p>
                    </div>
                    <span className="ml-auto text-sm px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full font-medium">{activity.duration}</span>
                  </div>
                  
                  <div className="space-y-0 relative pl-10">
                    {/* Vertical line with gradient */}
                    <div className="absolute top-0 bottom-0 left-3 w-1 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-300 rounded-full"></div>
                    
                    {activity.itinerary.map((step, index) => (
                      <div key={index} className="relative mb-6 last:mb-0">
                        {/* Step dot with animation effect */}
                        <div className="absolute left-[-20px] top-0 w-6 h-6 rounded-full bg-white border-2 border-amber-500 z-10 flex items-center justify-center shadow-md">
                          <span className="text-[10px] font-bold text-amber-600">{index + 1}</span>
                        </div>
                        
                        {/* Step content with enhanced card design */}
                        <div className="py-1 pl-4">
                          <div className="bg-white rounded-lg p-4 shadow-sm border border-amber-100/50 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 transform">
                            <p className="text-gray-700">
                              <span className="font-semibold text-amber-700 inline-block mr-1.5">
                                {index === 0 ? "Start: " : 
                                index === (activity.itinerary?.length || 0) - 1 ? "Finish: " : 
                                `Step ${index + 1}: `}
                              </span>
                              {step}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Tour footer with enhanced styling */}
                  <div className="mt-6 flex items-center justify-center">
                    <span className="inline-flex items-center px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-100/50 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Total duration: {activity.duration}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Premium footer section */}
      <div className="bg-amber-50/60 mt-12 py-10 border-t border-amber-100/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-amber-800 mb-4">Ready for an Unforgettable Adventure?</h3>
            <p className="text-amber-700 max-w-2xl mx-auto mb-6">Experience the magic of Morocco with our premium tours. Book today and create memories that will last a lifetime!</p>
            <Link 
              href={`/activities/${id}/booking?from=details`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300"
            >
              Book This Experience
              <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Additional space at bottom */}
      <div className="h-8"></div>
    </div>
  );
} 