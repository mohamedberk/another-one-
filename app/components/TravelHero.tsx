"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { heroBalloonImage, camelImages, balloonImages, quadImages, buggyImages } from '@/utils/activityImages';
import { cabinetGrotesk, clashDisplay, dmSans } from '../fonts';

const TravelHero = () => {
  // Images for the carousel
  const carouselImages = [
    heroBalloonImage,
    ...balloonImages,
    ...camelImages,
    ...quadImages,
    ...buggyImages,
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Render the image carousel
  const renderCarousel = () => (
    <div className="relative w-full h-[300px] md:h-[480px] rounded-3xl overflow-hidden shadow-2xl">
      {carouselImages.map((image, index) => (
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
            alt={`Morocco Adventure Image ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-10000 ease-out"
            style={{
              transform: currentImageIndex === index ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 5s ease-out'
            }}
            priority={index === 0}
          />
        </div>
      ))}
      
      {/* Subtle dark gradient at bottom for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-[2]"></div>
      
      {/* Image indicators */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-[3]">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${currentImageIndex === index ? 'bg-white w-4' : 'bg-white/50'}`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Price badge with premium design - Modified for responsive size */}
      <div className="absolute bottom-6 right-6 bg-gray-900/90 backdrop-blur-sm px-4 py-3 md:px-6 md:py-4 rounded-lg md:rounded-xl shadow-xl z-10 transform rotate-2 border border-gray-800 scale-90 md:scale-100">
        <div className={`text-xs font-bold uppercase tracking-wider text-amber-400 ${clashDisplay.className}`}>From</div>
        <div className={`text-lg md:text-2xl font-bold text-white ${cabinetGrotesk.className}`}>150 MAD</div>
      </div>
      
      {/* Location badge with premium styling - Also make smaller on mobile */}
      <div className="absolute top-6 left-6 bg-gray-900/80 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl shadow-md z-10 flex items-center scale-90 md:scale-100 border border-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 text-amber-400 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className={`text-xs md:text-sm font-medium text-white ${clashDisplay.className}`}>Atlas Mountains</span>
      </div>
    </div>
  );

  return (
   <section id="hero" className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-12 ${cabinetGrotesk.variable} ${clashDisplay.variable} ${dmSans.variable}`}>
      <div className="flex flex-col md:flex-row items-start">
        {/* Content Column - Always render the title first */}
        <div className="w-full md:w-1/2 md:pr-12">
          <div className="inline-flex items-center bg-orange-50 border border-orange-100 px-4 py-2 rounded-lg mb-6 animate-fadeIn shadow-sm">
            <div className="w-2 h-2 rounded-full bg-orange-700 mr-2 animate-pulse"></div>
            <span className={`text-sm font-medium text-orange-900 ${clashDisplay.className}`}>Marrakech Adventure Experts</span>
          </div>
          
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none ${cabinetGrotesk.className}`}>
            <span className="block animate-fadeUp bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent pb-2" style={{ animationDelay: '0.1s' }}>DISCOVER</span>
            <span className="relative bg-gradient-to-r from-orange-700 to-orange-600 bg-clip-text text-transparent">
              MOROCCO
              <span className="absolute -top-6 -right-6 text-4xl animate-float">✨</span>
            </span>
          </h1>
          
          {/* On mobile, render carousel after title but before copy */}
          <div className="block md:hidden mt-8 mb-8">
            {renderCarousel()}
          </div>
          
          <p className={`text-base text-gray-700 mt-6 max-w-lg animate-fadeUp leading-relaxed font-inter`} style={{ animationDelay: '0.3s' }}>
            Experience the magic of Marrakech and beyond with our premium excursions. From thrilling quad adventures in the Agafay Desert to serene camel rides through the Palmeraie, unforgettable experiences await you.
          </p>
          
          <div className="mt-8">
            <a 
              href="#discover" 
              className={`bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 rounded-lg text-white px-8 py-4 shadow-md hover:shadow-lg transition duration-300 flex items-center gap-2 animate-fadeUp font-black inline-flex ${cabinetGrotesk.className}`}
              style={{ animationDelay: '0.4s' }}
            >
              <span className="text-white">Explore Excursions</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          
          {/* Featured activities badges */}
          <div className="mt-6 flex flex-wrap gap-2 animate-fadeUp" style={{ animationDelay: '0.5s' }}>
            <span className={`px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium ${clashDisplay.className}`}>Quad Biking</span>
            <span className={`px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium ${clashDisplay.className}`}>Camel Rides</span>
            <span className={`px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium ${clashDisplay.className}`}>Buggy Adventures</span>
            <span className={`px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium ${clashDisplay.className}`}>Hot Air Balloons</span>
            <span className={`px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium ${clashDisplay.className}`}>Desert Tours</span>
          </div>
        </div>
        
        {/* Image Column - Only show on desktop */}
        <div className="hidden md:block md:w-1/2 relative">
          {renderCarousel()}
        </div>
      </div>
    </section>
  );
};

export default TravelHero; 