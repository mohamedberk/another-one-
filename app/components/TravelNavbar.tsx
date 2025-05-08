"use client";

import React from 'react';
import Link from 'next/link';

const TravelNavbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-4">
      <nav className="bg-white/90 backdrop-blur-sm w-full max-w-5xl px-6 py-3 rounded-xl shadow-md border border-gray-100 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-tr from-amber-500 to-orange-400 rounded-full flex items-center justify-center shadow-sm">
            <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-amber-600 text-xs font-bold">UX</span>
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">UIXSHUVO</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="#hero" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors duration-300">
            Home
          </Link>
          <Link href="#discover" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors duration-300">
            Discover
          </Link>
          <Link href="#reviews" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors duration-300">
            Reviews
          </Link>
          <Link href="#features" className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors duration-300">
            Features
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link href="/activities" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg text-xs hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-sm hover:shadow-md font-medium">
            Book Now
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default TravelNavbar; 