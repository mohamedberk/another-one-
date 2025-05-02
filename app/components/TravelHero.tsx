import React from 'react';
import Image from 'next/image';

const TravelHero = () => {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
        <div className="inline-flex items-center bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg mb-8 animate-fadeIn shadow-sm">
          <div className="w-2 h-2 rounded-full bg-blue-600 mr-2 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-800">Discover Your Dream Destinations</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-gray-900">
          <span className="block animate-fadeUp" style={{ animationDelay: '0.1s' }}>EXPLORE</span>
          <span className="relative text-blue-600">
            WORLD
            <span className="absolute -top-6 -right-6 text-4xl animate-float">✨</span>
          </span>
        </h1>
        
        <p className="text-base text-gray-600 mt-6 max-w-lg animate-fadeUp opacity-0 leading-relaxed" style={{ animationDelay: '0.3s' }}>
          Discover the world's most adventurous nature and unforgettable destinations. Life is too short not to explore the extraordinary wonders waiting for you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="bg-blue-600 rounded-lg text-white px-7 py-3.5 shadow-md hover:shadow-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2 animate-fadeUp opacity-0 font-medium" style={{ animationDelay: '0.4s' }}>
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          
          <button className="border border-gray-200 bg-white rounded-lg px-7 py-3.5 text-gray-700 hover:bg-gray-50 transition duration-300 flex items-center gap-2 animate-fadeUp opacity-0 shadow-sm" style={{ animationDelay: '0.5s' }}>
            Watch Video
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
          <div className="flex items-center gap-4 text-sm font-medium text-gray-600 animate-fadeUp opacity-0" style={{ animationDelay: '0.6s' }}>
            <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-100 shadow-sm flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span>10,000+ Travel Places</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm font-medium text-gray-600 animate-fadeUp opacity-0" style={{ animationDelay: '0.7s' }}>
            <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-100 shadow-sm flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>Best Price Guarantee</span>
          </div>
        </div>
      </div>
      
      <div className="md:w-1/2 relative">
        {/* Main image container */}
        <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-xl mx-auto relative animate-float">
          {/* Circular border */}
          <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-tr from-blue-600 via-blue-400 to-blue-500 rotate-45">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image 
                src="/destination.jpg" 
                alt="Travel Destination" 
                fill
                sizes="(max-width: 768px) 320px, 420px"
                className="object-cover rounded-full"
                priority
              />
            </div>
          </div>
          
          {/* Decorative icon */}
          <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg z-10 animate-float" style={{ animationDelay: '1s' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </div>
        </div>
        
        {/* Floating card elements */}
        <div className="absolute top-1/4 -left-6 bg-white border border-gray-100 px-5 py-3 rounded-lg shadow-md animate-float" style={{ animationDelay: '0.5s' }}>
          <div className="text-sm font-semibold text-gray-800">Our Story</div>
          <div className="text-xs text-gray-500 mt-1">Discover our journey and values</div>
        </div>
        
        <div className="absolute bottom-1/4 -right-6 bg-white border border-gray-100 px-5 py-3 rounded-lg shadow-md animate-float" style={{ animationDelay: '1.5s' }}>
          <div className="text-sm font-semibold text-gray-800">Features</div>
          <div className="text-xs text-gray-500 mt-1">What makes us special</div>
        </div>
      </div>
    </section>
  );
};

export default TravelHero; 