"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin, Star } from "lucide-react";
import { activities6, Activity6 } from "@/utils/activities";
import { getActivityImage } from "@/utils/activityImages";

// Enhanced Booking Modal Component
const EnhancedBookingModal = ({ isOpen, onClose, destination }: { isOpen: boolean; onClose: () => void; destination: Activity6 | null }) => {
  // Prevent background scrolling when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen || !destination) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      {/* Enhanced backdrop with glass-morphism */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xl" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-amber-100/50 transition-all transform"
          style={{
            animation: 'slideUp 0.35s ease-out'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative background elements - amber tones */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-100/30 blur-3xl -z-10"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-100/30 blur-3xl -z-10"></div>
          
          {/* Close button - fixed position */}
          <button 
            onClick={onClose}
            className="absolute right-5 top-5 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg border border-amber-100/50 transition-all duration-300 focus:outline-none"
            aria-label="Close dialog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Progress Bar for booking steps */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-100">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 ease-out"
              style={{ width: '33%' }}
            ></div>
          </div>
          
          {/* Main content container */}
          <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
            
            {/* Left sidebar with activity info and steps - only visible on md+ screens */}
            <div className="hidden md:block md:w-72 lg:w-80 bg-gradient-to-b from-amber-50/80 to-white/50 border-r border-amber-100/50">
              <div className="p-8">
                <h3 className="text-lg font-bold text-amber-900 mb-1">
                  {destination.name}
                </h3>
                <p className="text-sm text-amber-700/70 mb-6">
                  {destination.location}
                </p>
                
                {/* Activity image with overlay */}
                <div className="relative w-full h-40 mb-8 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  {/* Price badge */}
                  <div className="absolute bottom-3 right-3 py-1.5 px-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-amber-100/50">
                    <p className="text-sm font-semibold text-amber-800">
                      From {destination.price}
                    </p>
                  </div>
                </div>
                
                {/* Booking steps */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-amber-800">Booking Steps</h4>
                  
                  <div className="space-y-3">
                    {/* Step 1 */}
                    <div className="flex items-center p-3 rounded-lg transition-all bg-amber-50 border border-amber-100">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-900">
                          Your Details
                        </p>
                        <p className="text-xs text-amber-700/70">Personal information</p>
                      </div>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="flex items-center p-3 rounded-lg transition-all">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-gray-200 text-gray-500">
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-800">
                          Booking Details
                        </p>
                        <p className="text-xs text-amber-700/70">Guests & dates</p>
                      </div>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="flex items-center p-3 rounded-lg transition-all">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-gray-200 text-gray-500">
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-800">
                          Confirmation
                        </p>
                        <p className="text-xs text-amber-700/70">Booking complete</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right content area with the booking form */}
            <div className="flex-1 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-amber-900 mb-2">Personal Details</h2>
                  <p className="text-amber-700/70">Please provide your contact information</p>
                </div>
                
                <form className="space-y-6">
                  {/* Full Name field with premium styling */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-amber-800">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="Your full name"
                        className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Email field with premium styling */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-amber-800">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="you@example.com"
                        className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Phone field with premium styling */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-amber-800">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        required
                        placeholder="+1 (555) 123-4567"
                        className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Pickup location with premium styling */}
                  <div className="space-y-2">
                    <label htmlFor="pickup" className="block text-sm font-medium text-amber-800">
                      Pick-up Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="pickup"
                        required
                        placeholder="Hotel name or address"
                        className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Date field with premium styling */}
                  <div className="space-y-2">
                    <label htmlFor="date" className="block text-sm font-medium text-amber-800">
                      Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                  type="date" 
                        id="date"
                        required
                        className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Participants selection */}
                  <div className="space-y-2">
                    <label htmlFor="participants" className="block text-sm font-medium text-amber-800">
                      Number of Participants
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <select
                        id="participants"
                        className="block w-full pl-12 pr-10 py-3.5 bg-white/70 border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm backdrop-blur-sm appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Special requests */}
                  <div className="space-y-2">
                    <label htmlFor="requests" className="block text-sm font-medium text-amber-800">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="requests"
                      rows={3}
                      placeholder="Any special requirements or requests"
                      className="block w-full p-4 bg-white/70 border border-amber-200 rounded-xl text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                    ></textarea>
                  </div>
                  
                  {/* Price Summary */}
                  <div className="mt-8 p-5 bg-gradient-to-br from-amber-50/80 to-white rounded-xl border border-amber-200 shadow-md">
                    <h3 className="text-lg font-semibold text-amber-900 mb-3">Price Summary</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-amber-700">1 Person × {destination.price}</span>
                        <span className="font-medium text-amber-900">{destination.price}</span>
                      </div>
                      {destination.id && (destination.id.includes("buggy") || destination.id.includes("buggy-camel")) && (
                        <div className="text-xs text-amber-600">
                          {destination.id === "buggy" ? "3 power options available (850/1000/1400 MAD)" : "3 power options available (950/1100/1500 MAD)"}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between pt-3 border-t border-amber-200">
                      <span className="font-semibold text-amber-900">Total Amount</span>
                      <span className="font-bold text-lg text-amber-700">{destination.price}</span>
                    </div>
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-2 mt-4">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="mt-0.5 h-4 w-4 text-amber-600 focus:ring-amber-500/30 border-amber-300 rounded"
                    />
                    <label htmlFor="terms" className="text-sm text-amber-700">
                      I agree to the <a href="#" className="text-amber-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-amber-600 hover:underline">Cancellation Policy</a>
                    </label>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="mt-8 flex gap-4 justify-between items-center">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl border border-amber-300 text-sm text-amber-700 hover:bg-amber-50 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-amber-100/20 hover:shadow-lg hover:shadow-amber-100/30"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-5 py-3 rounded-xl font-medium shadow-md shadow-amber-300/20 hover:shadow-lg hover:shadow-amber-300/30 transition-all duration-300 transform hover:-translate-y-0.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white"
                    >
                      <span className="flex items-center justify-center">
                        Confirm Booking
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Remove the empty customHoverKeyframes and add new keyframes for hover animations
const customHoverKeyframes = `
  @keyframes floatUp {
    0% { transform: translateY(0) scale(1); }
    100% { transform: translateY(-10px) scale(1.02); }
  }
  
  @keyframes shine {
    0% { background-position: -100% 0; }
    100% { background-position: 100% 0; }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes desertSway {
    0% { transform: translateX(0) rotate(0deg); }
    50% { transform: translateX(5px) rotate(1deg); }
    100% { transform: translateX(0) rotate(0deg); }
  }

  @keyframes desertShimmer {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
  }

  @keyframes sandWave {
    0% { transform: translateY(0) scaleX(1); }
    50% { transform: translateY(-2px) scaleX(1.03); }
    100% { transform: translateY(0) scaleX(1); }
  }

  @keyframes slideUp {
    0% { 
      opacity: 0;
      transform: translateY(30px); 
    }
    100% { 
      opacity: 1;
      transform: translateY(0); 
    }
  }

  @keyframes glowPulse {
    0%, 100% { 
      box-shadow: 0 0 5px rgba(245, 158, 11, 0.1),
                 0 0 15px rgba(245, 158, 11, 0.05);
    }
    50% { 
      box-shadow: 0 0 20px rgba(245, 158, 11, 0.2),
                 0 0 30px rgba(245, 158, 11, 0.1);
    }
  }
`;

const TravelDiscover = () => {
  // Remove the hoveredIndex state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Activity6 | null>(null);

  const openBookingModal = (destination: Activity6) => {
    console.log("Opening booking modal for:", destination.name);
    setSelectedDestination(destination);
    setIsBookingModalOpen(true);
  };

  return (
    <section id="discover" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 overflow-hidden">
      {/* Add custom keyframes - now empty */}
      <style jsx global>{customHoverKeyframes}</style>
      
      {/* Premium background elements - using amber/orange colors */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-orange-50/30 rounded-full blur-3xl"></div>
      
      {/* Removing the pattern overlay */}
      
      <div className="relative">
        {/* Section header with Morocco theme and amber color scheme */}
        <div className="flex flex-col mb-8 gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-amber-600 rounded-full shadow-sm"></div>
            <span className="text-amber-700 uppercase tracking-widest text-xs font-semibold letter-spacing-wide animate-fadeIn">Authentic Experiences</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="block text-gray-900 animate-fadeUp" style={{ animationDelay: '0.1s' }}>Explore </span>
            <span className="relative bg-gradient-to-r from-amber-700 to-orange-500 bg-clip-text text-transparent animate-fadeUp" style={{ animationDelay: '0.2s' }}>
              Marrakech
              <span className="absolute -top-6 -right-6 text-4xl animate-float">✨</span>
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-500/50 to-orange-500/50 rounded-full"></span>
            </span>
          </h2>
          <p className="text-gray-600 max-w-xl text-sm leading-relaxed animate-fadeUp" style={{ animationDelay: '0.3s' }}>
            Discover handpicked experiences crafted by local experts to showcase the true essence of Marrakech's culture, adventure, and landscapes.
          </p>
          <div className="flex items-center gap-2 animate-fadeUp" style={{ animationDelay: '0.4s' }}>
            <div className="p-1 rounded-full bg-amber-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-amber-600 font-semibold text-sm">Children under 16 years get 40% discount on all activities</p>
          </div>
        </div>
        
        {/* Destinations grid with hover effects - adjusted card size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 staggered-fade-in">
          {activities6.map((destination, index) => {
            // Determine which image to use based on activity ID
            let imageUrl = destination.image;
            if (destination.id === 'quad') {
              imageUrl = getActivityImage('quad', 0);
            } else if (destination.id === 'camel') {
              imageUrl = getActivityImage('camel', 0);
            } else if (destination.id === 'buggy') {
              imageUrl = getActivityImage('buggy', 0);
            } else if (destination.id === 'balloon') {
              imageUrl = getActivityImage('balloon', 0);
            } else if (destination.id === 'quad-camel') {
              imageUrl = getActivityImage('quadCamel', 0);
            }
            
            return (
            <div 
              key={destination.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 relative flex flex-col border border-amber-100/50 hover:shadow-2xl group hover:-translate-y-2 w-full max-w-sm mx-auto"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div className="h-64 relative overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
                {/* Overlay with gradient for text readability */}
                <div 
                  className="absolute inset-0 transition-all duration-300 group-hover:bg-black/30"
                  style={{ 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.2) 100%)'
                  }}
                ></div>
                
                {/* Remove the desert dust particles effect */}
                
                {/* Rating with styling */}
                <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md z-10 transition-all duration-300 group-hover:bg-amber-50 group-hover:shadow-amber-100/50" style={{ animation: 'desertSway 5s ease-in-out infinite' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-800 font-medium">{destination.rating}</span>
                </div>
                
                {/* Duration badge */}
                <div className="absolute bottom-5 left-5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-md z-10 transition-all duration-300 group-hover:bg-amber-50 group-hover:translate-y-1 group-hover:shadow-amber-100/50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-800">{destination.duration}</span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col relative z-10 transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-white group-hover:to-amber-50/30">
                {/* Subtle highlight line appearing on hover */}
                <div className="absolute left-0 top-0 w-0 h-full bg-amber-500/10 transition-all duration-500 group-hover:w-1"></div>
                
                {/* Accent for hover state - appearing line */}
                <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 transition-all duration-500 group-hover:h-full opacity-0 group-hover:opacity-100"></div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 flex-1 pr-2 transition-all duration-300 group-hover:text-amber-800 transform group-hover:translate-x-1">{destination.name}</h3>
                    
                    <Link 
                      href={`/activities?id=${destination.id}`}
                      className="px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-md shadow-amber-300/20 hover:shadow-lg hover:shadow-amber-300/30 transition-all duration-300 transform hover:-translate-y-0.5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white border border-gray-700/50"
                    >
                      <span className="text-white">Details</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 transition-all duration-300 group-hover:text-gray-700 z-20 relative">{destination.description}</p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-amber-100/50 mt-auto group-hover:border-amber-200/50 transition-all duration-300 relative z-20">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-gray-800 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1 origin-left">{destination.price}</span>
                    <span className="text-xs text-gray-800/80 transition-colors duration-300 group-hover:text-gray-800">per person</span>
                    {destination.id && destination.id.includes("buggy") && (
                      <span className="text-xs text-gray-800 font-medium transition-all duration-300 group-hover:text-gray-800">3 power options available</span>
                    )}
                  </div>
                  
                  <Link 
                    href={`/activities/${destination.id}/booking?id=${destination.id}&from=discover`}
                    className="px-4 py-2 rounded-xl text-white shadow-md shadow-amber-300/20 hover:shadow-lg hover:shadow-amber-300/30 transition-all duration-300 transform hover:-translate-y-0.5 text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400"
                  >
                    <span className="text-white">Book Now</span>
                  </Link>
                </div>
              </div>
            </div>
            );
          })}
        </div>
        
        {/* Decorative element at bottom - make it smaller */}
        <div className="w-16 h-0.5 bg-amber-600/30 rounded-full mx-auto mt-16 mb-4"></div>
      </div>
      
      {/* Booking Modal - Update colors to match amber theme */}
      <EnhancedBookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        destination={selectedDestination}
      />
    </section>
  );
};

export default TravelDiscover; 