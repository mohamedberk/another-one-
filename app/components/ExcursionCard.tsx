import React, { useState } from 'react';
import Image from 'next/image';
import { Excursion } from '../data/excursions';
import { imagekitImages } from '../../utils/imagekitUrls';

// Premium styled icon components
const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={`w-5 h-5 ${filled ? 'text-rose-400' : 'text-white/90'}`}
  >
    <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const CalendarIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="h-4 w-4 text-neutral-500"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="h-4 w-4 text-amber-400"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

// Valley-specific content
const getValleyContent = (title: string) => {
  if (title.includes('Ourika')) {
    return {
      description: "Explore waterfalls and authentic Berber villages nestled in the foothills of the Atlas Mountains.",
      highlights: [
        "Visit seven picturesque waterfalls with local guides",
        "Explore authentic Berber villages",
        "Experience traditional Moroccan cuisine",
        "Enjoy panoramic mountain views"
      ],
      duration: "Full Day (8-9 hours)"
    };
  } else if (title.includes('Oukaimeden')) {
    return {
      description: "Discover the highest ski resort in Africa with breathtaking views of mountain peaks and landscapes.",
      highlights: [
        "Visit the highest ski resort in Africa",
        "Spectacular mountain views and photo opportunities",
        "Experience the unique alpine atmosphere",
        "Visit traditional mountain villages"
      ],
      duration: "Full Day (9-10 hours)"
    };
  } else if (title.includes('Asni')) {
    return {
      description: "Visit traditional Berber markets and enjoy panoramic views of the beautiful Asni valley landscapes.",
      highlights: [
        "Visit the famous Saturday Berber market (souk)",
        "Panoramic views of the majestic Toubkal mountain",
        "Experience authentic Berber culture",
        "Discover traditional crafts and cuisine"
      ],
      duration: "Full Day (7-8 hours)"
    };
  }
  return null;
};

// Get price display
const getValleyPrice = (title: string, defaultPrice: number) => {
  if (title.includes('Ourika')) {
    return 85;
  } else if (title.includes('Oukaimeden')) {
    return 95;
  } else if (title.includes('Asni')) {
    return 75;
  }
  return defaultPrice;
};

interface ExcursionCardProps {
  title: string;
  description: string;
  image: string;
  price: number;
  highlights: string[];
  duration: string;
  onClick: () => void;
  isFavorite?: boolean;
}

const ExcursionCard = ({
  title,
  description,
  image,
  price,
  highlights,
  duration,
  onClick,
  isFavorite = false
}: ExcursionCardProps) => {
  // Get valley-specific content
  const valleyContent = getValleyContent(title);
  const displayDescription = valleyContent?.description || description;
  const displayHighlights = valleyContent?.highlights || highlights;
  const displayDuration = valleyContent?.duration || duration;
  const displayPrice = getValleyPrice(title, price);
  
  // Determine background image and style
  const getValleyImage = () => {
    if (title.includes('Ourika')) {
      return "https://ik.imagekit.io/momh2323/ourikaa.jpg?updatedAt=1745258287408";
    } else if (title.includes('Oukaimeden')) {
      return "https://ik.imagekit.io/momh2323/Oukaimeden.jpg?updatedAt=1745258287453";
    } else if (title.includes('Asni')) {
      return "https://ik.imagekit.io/momh2323/Asni.jpg?updatedAt=1745258287547";
    }
    return image;
  };
  
  // Get theme colors based on valley
  const getThemeColors = () => {
    if (title.includes('Ourika')) {
      return {
        gradient: 'from-emerald-500/30 to-teal-600/40',
        accent: 'bg-emerald-500',
        text: 'text-emerald-500',
        border: 'border-emerald-200',
        button: 'from-emerald-500 to-teal-600'
      };
    } else if (title.includes('Oukaimeden')) {
      return {
        gradient: 'from-blue-500/30 to-indigo-600/40',
        accent: 'bg-blue-500',
        text: 'text-blue-500',
        border: 'border-blue-200',
        button: 'from-blue-500 to-indigo-600'
      };
    } else if (title.includes('Asni')) {
      return {
        gradient: 'from-amber-400/30 to-amber-600/40',
        accent: 'bg-amber-500',
        text: 'text-amber-500',
        border: 'border-amber-200',
        button: 'from-amber-400 to-amber-600'
      };
    }
    return {
      gradient: 'from-neutral-500/30 to-neutral-700/40',
      accent: 'bg-neutral-500',
      text: 'text-neutral-500',
      border: 'border-neutral-200',
      button: 'from-neutral-500 to-neutral-700'
    };
  };
  
  const colors = getThemeColors();

  return (
    <div className="group flex flex-col h-full overflow-hidden rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-[#111827] border border-white/10 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
      {/* Image container */}
      <div className="relative w-full h-[220px] overflow-hidden">
        {/* Price tag */}
        <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-1.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
          <span className="font-medium text-white tracking-wide">USD ${displayPrice}</span>
        </div>
        
        {/* Favorite button */}
        <button className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-300 hover:bg-white/20">
          <HeartIcon filled={isFavorite} />
        </button>
        
        {/* Image */}
        <div 
          className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
          style={{
            backgroundImage: `url(${getValleyImage()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </div>
      
      {/* Content container */}
      <div className="flex flex-col p-6 flex-grow">
        {/* Title and duration */}
        <div className="mb-3">
          <h2 className="font-display text-2xl font-medium text-white mb-1 tracking-tight">{title}</h2>
          <div className="flex items-center space-x-2 text-sm text-white/70">
            <ClockIcon />
            <span>{displayDuration}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-white/70 text-sm leading-relaxed mb-4">
          {displayDescription}
        </p>
        
        {/* Highlights */}
        <div className="space-y-1 mb-5 flex-grow">
          <h4 className={`text-xs uppercase font-medium tracking-widest ${colors.text} mb-2`}>HIGHLIGHTS</h4>
          <ul className="space-y-2">
            {displayHighlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="flex items-start">
                <div className={`h-4 w-4 mt-0.5 ${colors.accent} rounded-full flex items-center justify-center mr-2 flex-shrink-0`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="white"
                    className="w-2.5 h-2.5"
                  >
                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white/80 text-sm">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Action button */}
        <button
          onClick={onClick}
          className={`w-full mt-auto flex items-center justify-between bg-gradient-to-r ${colors.button} text-white py-3 px-6 rounded-xl font-medium tracking-wide transition-all duration-500 hover:shadow-lg hover:shadow-${colors.accent}/20`}
        >
          <span>Explore Experience</span>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default ExcursionCard; 