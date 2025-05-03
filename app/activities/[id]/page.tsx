"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  HeartIcon,
  StarIcon as StarIconOutline,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import { getActivityByIdAdapter } from "@/utils/activities6Adapter";
import { notFound } from "next/navigation";
// Import the activityImages constants
import { getActivityImage, ACTIVITY_IMAGES } from "@/utils/activityImages";

// Main component for the activity detail page
export default function ActivityDetailPage() {
  const params = useParams();
  const id = params.id as string;
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
  
  // Format price with Euro symbol
  const formatPrice = (price: number) => {
    return `€${price.toLocaleString()}`;
  };

  // State for like button
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation bar - fixed position */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-800 hover:text-cyan-600 transition-colors"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </Link>
            
            <div>
              <button 
                className={`p-2 rounded-full ${isLiked ? "text-pink-500" : "text-gray-400"} hover:bg-gray-100 transition-all`}
                onClick={() => setIsLiked(!isLiked)}
                aria-label="Like this activity"
              >
                {isLiked ? (
                  <HeartIconSolid className="h-6 w-6" />
                ) : (
                  <HeartIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero content with simplified layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Activity tag & rating */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          {activity.tag && (
            <span className="inline-block bg-cyan-100 text-cyan-800 text-xs font-semibold px-3 py-1 rounded-full">
              {activity.tag}
            </span>
          )}
          
          <div className="flex items-center gap-1 bg-white rounded-lg px-3 py-1.5 shadow-sm">
            <StarIcon className="w-5 h-5 text-yellow-500" />
            <div>
              <span className="font-bold text-gray-900">{activity.rating}</span>
              <span className="text-gray-500 text-sm">({activity.reviewCount})</span>
            </div>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-serif">
          {activity.title}
        </h1>
        
        {/* Image and booking card side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-0">
          {/* Left column with Image and Activity Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Main Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg group transition-all duration-500">
              <Image
                src={activityImages[currentImageIndex]}
                alt={activity.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={90}
              />
              
              {/* Semi-transparent overlay - darker to ensure visibility on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent group-hover:from-black/30 group-hover:via-black/10 transition-all duration-500"></div>
              
              {/* Image navigation controls */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {activityImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentImageIndex === index 
                        ? "bg-white" 
                        : "bg-white/50 hover:bg-white/70"
                    } transition-all duration-200 shadow-md`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Image thumbnails with enhanced hover effect */}
            <div className="flex space-x-4 mt-4">
              {activityImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative h-24 w-36 rounded-lg overflow-hidden transform transition-all duration-300 ${
                    currentImageIndex === index 
                      ? "ring-2 ring-cyan-500 shadow-md scale-105" 
                      : "opacity-80 hover:opacity-100 hover:scale-105 hover:shadow-md"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${activity.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {/* Hover overlay with text indicator */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                      {index === 0 ? "Main View" : "Secondary View"}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Activity key details */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
                <div className="p-2 sm:p-3">
                  <div className="flex items-center gap-1 text-gray-500 mb-0.5">
                    <ClockIcon className="h-3 w-3" />
                    <span className="text-xs font-medium uppercase">Duration</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{activity.duration}</p>
                </div>
                
                <div className="p-2 sm:p-3">
                  <div className="flex items-center gap-1 text-gray-500 mb-0.5">
                    <MapPinIcon className="h-3 w-3" />
                    <span className="text-xs font-medium uppercase">Location</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{activity.location}</p>
                </div>
                
                <div className="p-2 sm:p-3">
                  <div className="flex items-center gap-1 text-gray-500 mb-0.5">
                    <UserGroupIcon className="h-3 w-3" />
                    <span className="text-xs font-medium uppercase">Group Size</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Max {activity.maxParticipants} people</p>
                </div>
                
                <div className="p-2 sm:p-3">
                  <div className="flex items-center gap-1 text-gray-500 mb-0.5">
                    <CalendarDaysIcon className="h-3 w-3" />
                    <span className="text-xs font-medium uppercase">Availability</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">Daily Tours</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking card - spans 2 columns on desktop */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex-grow flex flex-col">
              {/* Pricing card header */}
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">Book This Experience</h3>
                <p className="text-sm text-cyan-100">Secure your spot with easy online booking</p>
              </div>
              
              {/* Pricing options */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="space-y-5 mb-5">
                  {/* Group tour option */}
                  <div className="flex justify-between items-center p-4 bg-cyan-50 rounded-lg border border-cyan-100 relative overflow-hidden">
                    <div className="absolute left-0 inset-y-0 w-1 bg-cyan-500"></div>
                    <div>
                      <p className="font-medium text-gray-900 flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-cyan-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Standard Pricing
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">1 hour activity</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-cyan-700">{`${activity.groupPrice} MAD`}</p>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                  </div>
                  
                  {/* Children discount info */}
                  <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-green-200 hover:border-green-300 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900 flex items-center text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                        Children Discount
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Under 16 years old</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-600">40% Off</p>
                      <p className="text-xs text-gray-500">of adult price</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  {/* CTA Button */}
                  <Link 
                    href={`/activities/${params.id}/booking?from=details`}
                    className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3.5 px-4 rounded-lg text-center transition-colors duration-300 text-base shadow-md"
                  >
                    Book Now
                  </Link>
                  
                  {/* Trust badges */}
                  <div className="pt-5 border-t border-gray-200 space-y-3 mt-6">
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon className="h-5 w-5 text-cyan-600" />
                      <p className="text-sm text-gray-700">Free cancellation up to 24 hours before</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon className="h-5 w-5 text-cyan-600" />
                      <p className="text-sm text-gray-700">Secure payments through our platform</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheckIcon className="h-5 w-5 text-cyan-600" />
                      <p className="text-sm text-gray-700">24/7 customer support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-0 pt-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Content section - full width */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">About This Experience</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700">{activity.longDescription}</p>
                
                {activity.id.includes("quad") && (
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-700">
                      Experience the thrill of quad biking through the stunning Palmeraie of Marrakech, a magnificent oasis dotted with over 150,000 palm trees. Your adventure begins with a safety briefing and equipment fitting, ensuring you're comfortable and ready for the exciting journey ahead.
                    </p>
                    <p className="text-gray-700">
                      Navigate through various terrains as expert guides lead you through challenging trails, dry riverbeds, and traditional Berber villages. Feel the adrenaline rush as you traverse this picturesque landscape, taking in breathtaking views of palm groves against the backdrop of the Atlas Mountains.
                    </p>
                    <p className="text-gray-700">
                      During your 1-hour expedition, you'll have opportunities to stop and capture stunning photos. Midway through, enjoy a refreshing break with traditional Moroccan mint tea and homemade snacks at an authentic Berber house, allowing you to experience local hospitality and customs.
                    </p>
                  </div>
                )}
                
                {activity.id.includes("camel") && (
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-700">
                      Embark on a timeless journey through the serene Palmeraie of Marrakech on the back of a gentle camel, the traditional "ship of the desert." This authentic experience connects you with centuries of Moroccan desert tradition and offers a unique perspective of the majestic palm groves.
                    </p>
                    <p className="text-gray-700">
                      As you sway gently atop your camel, guided by experienced handlers, you'll traverse tranquil paths through lush palm groves and discover hidden Berber villages. Your guide will share insights into local culture and the significance of camels in Moroccan heritage.
                    </p>
                    <p className="text-gray-700">
                      The peaceful rhythm of the camel's gait allows you to fully absorb the natural beauty surrounding you. During this 1-hour ride, you'll have the perfect opportunity to take memorable photos dressed in traditional Moroccan attire, creating lasting memories of your Marrakech adventure.
                    </p>
                  </div>
                )}
                
                {activity.id.includes("buggy") && (
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-700">
                      Discover the thrill of driving a powerful buggy through the diverse landscapes of Palmeraie, Marrakech. After a comprehensive safety briefing and vehicle orientation, you'll take control of these robust vehicles designed for off-road adventures.
                    </p>
                    <p className="text-gray-700">
                      Navigate through challenging terrain as you follow expert guides through palm groves, rocky paths, and open spaces. The buggies offer a unique combination of speed, stability, and maneuverability, making them perfect for exploring this diverse ecosystem.
                    </p>
                    <p className="text-gray-700">
                      This 1-hour adventure provides an exhilarating experience as you drive through varied landscapes, with stops at scenic viewpoints. Halfway through, enjoy a traditional Moroccan tea break in an authentic setting, offering a perfect contrast to the high-energy driving experience.
                    </p>
                  </div>
                )}
                
                {activity.id.includes("balloon") && (
                  <div className="mt-4 space-y-4">
                    <p className="text-gray-700">
                      Float peacefully above the magnificent landscapes of Marrakech in a hot air balloon, offering unparalleled panoramic views of the Palmeraie, desert, and Atlas Mountains. Your adventure begins before dawn with pickup from your accommodation and transport to the launch site.
                    </p>
                    <p className="text-gray-700">
                      Witness the spectacular process of balloon inflation while enjoying Moroccan tea and light refreshments. As you ascend with the sunrise, experience the magical golden light illuminating the landscape below. During your 40-60 minute flight, your pilot will point out significant landmarks and share interesting facts about the region.
                    </p>
                    <p className="text-gray-700">
                      Upon landing, celebrate your flight with a traditional Berber breakfast in a comfortable tent. This magical experience combines tranquility, adventure, and cultural immersion, creating memories that will last a lifetime.
                    </p>
                  </div>
                )}
                
                <blockquote className="mt-4 border-l-4 border-cyan-500 pl-4 italic text-gray-700">
                  "Join us for an unforgettable adventure through Morocco's most breathtaking landscapes and immerse yourself in the rich cultural heritage of the Palmeraie region, just minutes from bustling Marrakech."
                </blockquote>
              </div>
            </div>

            {/* Experience Highlights */}
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 font-serif">Experience Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activity.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="bg-cyan-100 rounded-lg p-1.5 text-cyan-700">
                      <CheckCircleIcon className="h-5 w-5" />
                    </div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included/Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {activity.included.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1 text-green-600">
                        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activity.excludes && (
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Not Included
                  </h3>
                  <ul className="space-y-2">
                    {activity.excludes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 text-red-500">
                          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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

            {/* Itinerary */}
            {activity.itinerary && (
              <div className="bg-white rounded-xl shadow-md p-5 w-full">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h2 className="text-lg font-bold text-gray-900">Tour Itinerary</h2>
                  <span className="ml-auto text-xs px-2 py-1 bg-cyan-50 text-cyan-700 rounded-full">{activity.duration}</span>
                </div>
                
                <div className="space-y-2 relative pl-6">
                  {/* Vertical line */}
                  <div className="absolute top-0 bottom-0 left-2.5 w-0.5 bg-gray-200"></div>
                  
                  {activity.itinerary.map((step, index) => (
                    <div key={index} className="relative">
                      {/* Step dot */}
                      <div className="absolute left-[-18px] top-1.5 w-5 h-5 rounded-full bg-cyan-100 border-2 border-cyan-500 z-10"></div>
                      
                      {/* Step content */}
                      <div className="py-1 pl-2">
                        <p className="text-sm text-gray-700 leading-tight">
                          <span className="font-semibold text-cyan-700">
                            {index === 0 ? "Start: " : 
                             index === (activity.itinerary?.length || 0) - 1 ? "Finish: " : 
                             `Step ${index + 1}: `}
                          </span>
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Tour footer */}
                <div className="mt-3 text-center">
                  <span className="inline-flex items-center text-xs text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Total duration: {activity.duration}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Additional space at bottom */}
      <div className="h-16"></div>
    </div>
  );
} 