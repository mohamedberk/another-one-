import React from 'react';
import Link from 'next/link';

const TravelNavbar = () => {
  return (
    <div className="relative z-10">
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
            <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-bold">UX</span>
            </div>
          </div>
          <span className="text-2xl font-bold tracking-tight">UIXSHUVO</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group">
            Discover
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group">
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group">
            Pricing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 relative group">
            Blog
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
        
        <div className="flex items-center gap-5">
          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link href="/activities" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
            Book Now
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default TravelNavbar; 