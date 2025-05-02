"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { activities } from '@/utils/activities';

// Enhanced Booking Modal Component
const EnhancedBookingModal = ({ isOpen, onClose, destination }: { isOpen: boolean; onClose: () => void; destination: Destination | null }) => {
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
          className="relative w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50 transition-all transform"
          style={{
            animation: 'slideUp 0.35s ease-out'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative background elements - simplified */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gray-100/30 blur-3xl -z-10"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gray-100/30 blur-3xl -z-10"></div>
          
          {/* Close button - fixed position */}
          <button 
            onClick={onClose}
            className="absolute right-5 top-5 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg border border-white/50 transition-all duration-300 focus:outline-none"
            aria-label="Close dialog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Progress Bar for booking steps */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 ease-out"
              style={{ width: '33%' }}
            ></div>
          </div>
          
          {/* Main content container */}
          <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
            
            {/* Left sidebar with activity info and steps - only visible on md+ screens */}
            <div className="hidden md:block md:w-72 lg:w-80 bg-gradient-to-b from-gray-50/80 to-white/50 border-r border-white/50">
              <div className="p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {destination.name}
                </h3>
                <p className="text-sm text-gray-500 mb-6">
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
                  <div className="absolute bottom-3 right-3 py-1.5 px-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                    <p className="text-sm font-semibold text-gray-900">
                      From {destination.price}
                    </p>
                  </div>
                </div>
                
                {/* Booking steps */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">Booking Steps</h4>
                  
                  <div className="space-y-3">
                    {/* Step 1 */}
                    <div className="flex items-center p-3 rounded-lg transition-all bg-blue-50 border border-blue-100">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-blue-600 text-white">
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Your Details
                        </p>
                        <p className="text-xs text-gray-500">Personal information</p>
                      </div>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="flex items-center p-3 rounded-lg transition-all">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-gray-200 text-gray-500">
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Booking Details
                        </p>
                        <p className="text-xs text-gray-500">Guests & dates</p>
                      </div>
                    </div>
                    
                    {/* Step 3 */}
                    <div className="flex items-center p-3 rounded-lg transition-all">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 bg-gray-200 text-gray-500">
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Confirmation
                        </p>
                        <p className="text-xs text-gray-500">Booking complete</p>
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Details</h2>
                  <p className="text-gray-500">Please provide your contact information</p>
                </div>
                
                <form className="space-y-6">
                  {/* Full Name field with premium styling */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="Your full name"
                        className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Email field with premium styling */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="you@example.com"
                        className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Phone field with premium styling */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        required
                        placeholder="+1 (555) 123-4567"
                        className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Pickup location with premium styling */}
                  <div className="space-y-2">
                    <label htmlFor="pickup" className="block text-sm font-medium text-gray-700">
                      Pick-up Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="pickup"
                        required
                        placeholder="Hotel name or address"
                        className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Date field with premium styling */}
                  <div className="space-y-2">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <input
                        type="date"
                        id="date"
                        required
                        className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Participants selection */}
                  <div className="space-y-2">
                    <label htmlFor="participants" className="block text-sm font-medium text-gray-700">
                      Number of Participants
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <select
                        id="participants"
                        className="block w-full pl-12 pr-10 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm backdrop-blur-sm appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Special requests */}
                  <div className="space-y-2">
                    <label htmlFor="requests" className="block text-sm font-medium text-gray-700">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="requests"
                      rows={3}
                      placeholder="Any special requirements or requests"
                      className="block w-full p-4 bg-white/70 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                    ></textarea>
                  </div>
                  
                  {/* Price Summary */}
                  <div className="mt-8 p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Summary</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">1 Person × {destination.price}</span>
                        <span className="font-medium text-gray-800">{destination.price}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-3 border-t border-gray-200">
                      <span className="font-semibold text-gray-900">Total Amount</span>
                      <span className="font-bold text-lg text-blue-700">{destination.price}</span>
                    </div>
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-2 mt-4">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500/30 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Cancellation Policy</a>
                    </label>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="mt-8 flex gap-4 justify-between items-center">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-1.5 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-5 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 relative overflow-hidden group text-base"
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      }}
                    >
                      <span className="absolute inset-0 w-full h-full bg-blue-600 opacity-100 group-hover:opacity-90 transition-opacity"></span>
                      <span className="absolute -inset-px bg-gradient-to-r from-white/20 to-transparent opacity-50 rounded-xl"></span>
                      <span className="absolute inset-0 flex items-center justify-center text-white font-medium z-10">
                        <span className="flex items-center">
                          Confirm Booking
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
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

interface Destination {
  name: string;
  location: string;
  price: string;
  image: string;
  rating: number;
  duration: string;
  description: string;
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary?: string[];
  tag?: string;
  id?: string;
}

// Convert activities to the Destination format
const destinations: Destination[] = activities.map(activity => ({
  id: activity.id,
  name: activity.title,
  location: activity.location,
  price: `$${activity.groupPrice}`,
  image: typeof activity.image === 'string' ? activity.image : '/destination.jpg',
  rating: activity.rating,
  duration: activity.duration,
  description: activity.description,
  highlights: activity.highlights,
  includes: activity.included,
  excludes: activity.excludes || [],
  itinerary: activity.itinerary,
  tag: activity.tag
}));

const TravelDiscover = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const openBookingModal = (destination: Destination) => {
    console.log("Opening booking modal for:", destination.name);
    setSelectedDestination(destination);
    setIsBookingModalOpen(true);
  };

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-blue-50/30 rounded-full blur-3xl"></div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '20px 20px'
        }}
      ></div>

      <div className="relative">
        {/* Section header with premium hierarchy */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-1.5 bg-blue-600 rounded-full shadow-sm"></div>
              <span className="text-blue-700 uppercase tracking-widest text-xs font-semibold letter-spacing-wide">Authentic Experiences</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="block text-gray-900 mb-2">Explore</span>
              <span className="block text-blue-700">Marrakech</span>
            </h2>
            <p className="text-gray-500 max-w-xl text-sm md:text-base leading-relaxed">
              Discover handpicked experiences crafted by local experts to showcase the true essence of Marrakech's culture, cuisine, and landscapes.
            </p>
          </div>
          <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group mt-8 md:mt-0">
            <span className="font-medium text-gray-800">View All Excursions</span>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white transform group-hover:translate-x-1 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        </div>
        
        {/* Destinations grid with premium card styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 staggered-fade-in">
          {destinations.map((destination, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group relative flex flex-col border border-gray-100"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="h-72 relative overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"
                  style={{ 
                    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%)' 
                  }}
                ></div>
                
                {/* Tag with refined styling */}
                {destination.tag && (
                  <div 
                    key={`tag-${index}`} 
                    className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse-slow"></span>
                    <span className="text-gray-800">{destination.tag}</span>
                  </div>
                )}
                
                {/* Rating with refined styling */}
                <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-800 font-medium">{destination.rating}</span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 flex-1 pr-2">{destination.name}</h3>
                    
                    <Link 
                      href={`/activities/${destination.id}`}
                      className="px-5 py-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 text-sm font-medium flex items-center gap-2 shadow-sm"
                    >
                      <span>Details</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{destination.description.substring(0, 120)}...</p>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-blue-700">{destination.price}</span>
                    <span className="text-xs text-gray-500 ml-1">per person</span>
                  </div>
                  
                  <Link 
                    href={`/activities/${destination.id}/booking?from=discover`}
                    className="bg-amber-600 px-4 py-2 rounded-md text-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 focus:ring-2 focus:ring-amber-300 focus:outline-none hover:bg-amber-700 text-sm font-medium"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View more button for mobile with enhanced styling */}
        <div className="mt-16 flex justify-center md:hidden">
          <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-white shadow-xl hover:shadow-2xl transition-all duration-300 group">
            <span className="font-medium text-gray-800">View All Excursions</span>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white transform group-hover:translate-x-1 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </button>
        </div>
        
        {/* Decorative element at bottom */}
        <div className="w-24 h-1 bg-blue-600/30 rounded-full mx-auto mt-24 mb-6"></div>
      </div>
      
      {/* Booking Modal - Using enhanced styling */}
      <EnhancedBookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        destination={selectedDestination}
      />
    </section>
  );
};

export default TravelDiscover; 