import React, { useState } from 'react';
import Image from 'next/image';
import { Activity } from '../utils/activities';
import { ImprovedActivityModal } from './ImprovedActivityModal';
import { EnhancedBookingModal } from './EnhancedBookingModal';
import { StarIcon, ClockIcon, CalendarDaysIcon, ChevronRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export interface PremiumTripCardProps {
  activity: Activity;
  date?: string;
  variant?: 'light' | 'dark';
}

export function PremiumTripCard({
  activity,
  date = 'Available daily',
  variant = 'light'
}: PremiumTripCardProps) {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Modal controls
  const openActivityModal = () => {
    setIsActivityModalOpen(true);
    document.body.classList.add('modal-open');
  };
  
  const closeActivityModal = () => {
    setIsActivityModalOpen(false);
    document.body.classList.remove('modal-open');
  };
  
  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  // Generate rating stars
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="mr-0.5">
            {index < Math.floor(rating) ? (
              <StarIconSolid className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <StarIcon className="w-3.5 h-3.5 text-amber-400/40" />
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <div 
        className={`relative group h-full ${variant === 'dark' ? 'text-white' : 'text-neutral-800'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Decorative background effects */}
        <div className="absolute -z-10 inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-75 blur-xl"
             style={{ 
               background: variant === 'dark' 
                 ? 'radial-gradient(circle at 50% 50%, rgba(55, 65, 81, 0.08), rgba(17, 24, 39, 0.05))' 
                 : 'radial-gradient(circle at 50% 50%, rgba(229, 231, 235, 0.5), rgba(255, 255, 255, 0.9))'
             }}>
        </div>

        {/* Main card container with premium glass effect */}
        <div 
          className={`h-full rounded-3xl overflow-hidden transition-all duration-500 transform hover:scale-[1.02] shadow-sm hover:shadow-xl ${
            variant === 'dark' 
              ? 'bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-xl border border-white/5' 
              : 'bg-white/90 backdrop-blur-xl border border-neutral-100/80'
          }`}
        >
          {/* Image container with overlay */}
          <div className="relative h-[240px] overflow-hidden">
            <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
                 style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}>
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center"
                quality={90}
                priority
              />
            </div>
            
            {/* Premium gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"></div>
            
            {/* Trip title and rating on image */}
            <div className="absolute bottom-0 inset-x-0 p-6">
              <div className="flex flex-col space-y-1.5">
                <div className="inline-flex items-center space-x-2 mb-1">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-xl rounded-full text-xs font-medium text-white border border-white/10">
                    {activity.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white font-display tracking-tight">
                  {activity.title}
                </h3>
                <div className="flex items-center space-x-1.5">
                  {renderRatingStars(activity.rating)}
                  <span className="text-xs text-white/80">{activity.rating.toFixed(1)} ({activity.reviewCount})</span>
                </div>
              </div>
            </div>
            
            {/* Premium price badges */}
            <div className="absolute top-5 right-5 flex items-center space-x-2">
              <div className="flex flex-col items-end space-y-2">
                <div className="bg-white/70 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/80 shadow-md">
                  <div className="flex items-center">
                    <span className="text-neutral-700 text-xs mr-1.5 font-semibold">Group:</span>
                    <span className="text-neutral-900 font-bold text-sm">€{activity.groupPrice}</span>
                  </div>
                </div>
                <div className="bg-white/70 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/80 shadow-md">
                  <div className="flex items-center">
                    <span className="text-neutral-700 text-xs mr-1.5 font-semibold">Private:</span>
                    <span className="text-neutral-900 font-bold text-sm">€{activity.privatePrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card content */}
          <div className="p-6 flex flex-col h-[calc(100%-240px)]">
            {/* Key features with icons */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  variant === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
                }`}>
                  <ClockIcon className={`w-4 h-4 ${variant === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`} />
                </div>
                <div>
                  <p className={`text-xs ${variant === 'dark' ? 'text-neutral-400' : 'text-neutral-500'} mb-0.5`}>Duration</p>
                  <p className={`text-sm font-medium ${variant === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    {activity.duration}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  variant === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
                }`}>
                  <CalendarDaysIcon className={`w-4 h-4 ${variant === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`} />
                </div>
                <div>
                  <p className={`text-xs ${variant === 'dark' ? 'text-neutral-400' : 'text-neutral-500'} mb-0.5`}>Availability</p>
                  <p className={`text-sm font-medium ${variant === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    {date}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6 flex-grow">
              <p className={`text-sm ${variant === 'dark' ? 'text-neutral-300' : 'text-neutral-600'} line-clamp-3`}>
                {activity.description}
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <button
                onClick={openActivityModal}
                className={`flex items-center justify-center py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                  variant === 'dark'
                    ? 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                    : 'bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md'
                }`}
              >
                <span>Details</span>
                <ChevronRightIcon className="w-4 h-4 ml-1.5" />
              </button>
              
              <button
                onClick={openBookingModal}
                className="flex items-center justify-center py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30"
              >
                <ShieldCheckIcon className="w-4 h-4 mr-1.5" />
                <span>Book Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ImprovedActivityModal 
        isOpen={isActivityModalOpen} 
        closeModal={closeActivityModal} 
        activity={activity}
      />
      
      <EnhancedBookingModal 
        isOpen={isBookingModalOpen} 
        closeModal={closeBookingModal}
        excursionTitle={activity.title}
        excursionType={activity.type}
        activity={activity}
      />
    </>
  );
} 