import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heroBalloonImage } from '@/utils/activityImages';

const TravelHero = () => {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
        <div className="inline-flex items-center bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg mb-8 animate-fadeIn shadow-sm">
          <div className="w-2 h-2 rounded-full bg-blue-600 mr-2 animate-pulse"></div>
          <span className="text-sm font-medium text-gray-800">Marrakech Adventure Experts</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none text-gray-900">
          <span className="block animate-fadeUp" style={{ animationDelay: '0.1s' }}>DISCOVER</span>
          <span className="relative text-blue-600">
            MOROCCO
            <span className="absolute -top-6 -right-6 text-4xl animate-float">✨</span>
          </span>
        </h1>
        
        <p className="text-base text-gray-600 mt-6 max-w-lg animate-fadeUp opacity-0 leading-relaxed" style={{ animationDelay: '0.3s' }}>
          Experience the magic of Marrakech and beyond with our premium excursions. From thrilling quad adventures in the Agafay Desert to serene camel rides through the Palmeraie, unforgettable experiences await you.
        </p>
        
        <div className="mt-8">
          <a 
            href="#discover" 
            className="bg-blue-600 rounded-lg text-white px-8 py-4 shadow-md hover:shadow-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2 animate-fadeUp opacity-0 font-medium inline-flex" 
            style={{ animationDelay: '0.4s' }}
          >
            Explore Excursions
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
        
        {/* Featured activities badges */}
        <div className="mt-8 flex flex-wrap gap-2 animate-fadeUp opacity-0" style={{ animationDelay: '0.5s' }}>
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Quad Biking</span>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Camel Rides</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Buggy Adventures</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Hot Air Balloons</span>
          <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium">Desert Tours</span>
        </div>
      </div>
      
      <div className="md:w-1/2 relative">
        {/* Hot air balloon image with modern styling */}
        <div className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl">
          <Image 
            src={heroBalloonImage}
            alt="Hot Air Balloon Adventure in Morocco" 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
          
          {/* Price badge */}
          <div className="absolute bottom-6 right-6 bg-white px-6 py-4 rounded-lg shadow-xl z-10 transform rotate-3 animate-pulse-slow">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">From</div>
            <div className="text-2xl font-bold text-blue-700">1500 MAD</div>
          </div>
          
          {/* Location badge */}
          <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md z-10 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-800">Atlas Mountains</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelHero; 