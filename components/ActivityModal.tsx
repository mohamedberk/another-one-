import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CalendarDaysIcon, ClockIcon, MapPinIcon, UserGroupIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { Button } from './Button';
import Image from 'next/image';
import { EnhancedBookingModal } from './EnhancedBookingModal';
import { BookingConfirmationModal } from './BookingConfirmationModal';
import { ImageKitGallery } from './ImageKitImage';

interface ActivityModalProps {
  isOpen: boolean;
  closeModal: () => void;
  activity?: {
    title: string;
    type: string;
    image: string;
    price: string;
    date: string;
    duration: string;
    location: string;
    description: string;
    highlights: string[];
    included: string[];
    rating: number;
    reviewCount: number;
    maxParticipants: number;
  };
}

export function ActivityModal({ isOpen, closeModal, activity }: ActivityModalProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [modalHeight, setModalHeight] = useState('auto');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [bookingDetails, setBookingDetails] = useState({
    reference: '',
    name: '',
    email: '',
    date: '',
  });
  
  // Extract group and private prices
  const getGroupPrice = () => {
    if (!activity || !activity.price) return '';
    const match = activity.price.match(/Group: (€\d+)/);
    return match ? match[1] : '';
  };
  
  const getPrivatePrice = () => {
    if (!activity || !activity.price) return '';
    const match = activity.price.match(/Private: (€\d+)/);
    return match ? match[1] : '';
  };
  
  // Set up images based on activity title
  useEffect(() => {
    if (activity) {
      // Get activity-specific images from the centralized gallery
      const activityImages = ImageKitGallery.activities[activity.title as keyof typeof ImageKitGallery.activities] || 
                          ImageKitGallery.default;
      
      // Add the activity's main image at the start if it's not already in the array
      const mainImage = activity.image;
      const galleryImages = [...activityImages];
      
      if (mainImage && !galleryImages.includes(mainImage)) {
        galleryImages.unshift(mainImage);
      }
      
      setImages(galleryImages);
      setCurrentImageIndex(0);
    }
  }, [activity]);
  
  // Start carousel effect when modal is open
  useEffect(() => {
    if (isOpen && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isOpen, images.length]);
  
  // Navigate to previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    
    // Reset the timer to prevent immediate transition after manual navigation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }
  };
  
  // Navigate to next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    
    // Reset the timer to prevent immediate transition after manual navigation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }
  };
  
  // Adjust modal height based on viewport
  useEffect(() => {
    if (isOpen) {
      const updateHeight = () => {
        const viewportHeight = window.innerHeight;
        // Set modal height to 90% of viewport height
        setModalHeight(`${Math.min(850, viewportHeight * 0.9)}px`);
      };
      
      updateHeight();
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [isOpen]);
  
  const openBookingModal = () => setIsBookingModalOpen(true);
  
  const closeBookingModal = () => setIsBookingModalOpen(false);
  
  const openConfirmationModal = (details: any) => {
    setBookingDetails({
      reference: details.bookingReference || 'ATLAS-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      name: details.name || 'Valued Customer',
      email: details.email || 'customer@example.com',
      date: details.date ? new Date(details.date).toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }) : 'Scheduled Date',
    });
    setIsConfirmationModalOpen(true);
    closeBookingModal();
  };
  
  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    closeModal(); // Close the activity modal too when confirmation is closed
  };
  
  if (!activity) return null;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          {/* Enhanced backdrop with our premium glass effect */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-2xl" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-400"
                enterFrom="opacity-0 scale-95 translate-y-4"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 translate-y-4"
              >
                <Dialog.Panel 
                  className="relative w-full max-w-5xl transform rounded-[2.5rem] text-left align-middle transition-all"
                  style={{ maxHeight: modalHeight }}
                >
                  {/* Enhanced decorative blobs with brand teal palette */}
                  <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-brand-teal-300/20 to-brand-teal-200/10 blur-[120px] -z-10 animate-pulse-subtle"></div>
                  <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-l from-brand-blue-300/20 to-brand-blue-200/10 blur-[120px] -z-10 animate-pulse-subtle"></div>
                  <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-brand-sand-200/10 to-brand-sand-100/5 blur-[100px] -z-10"></div>
                  
                  {/* Premium glass effect container */}
                  <div className="ebn-glass rounded-[2.5rem] overflow-hidden border border-white/50 shadow-teal-lg" style={{ height: modalHeight }}>
                    {/* Vertical layout with image on the left and content on the right */}
                    <div className="flex flex-col md:flex-row h-full">
                      {/* Left side - Enhanced Image Gallery */}
                      <div className="relative w-full md:w-2/5 h-64 md:h-full">
                        <div className="relative w-full h-full overflow-hidden">
                          {/* Image Carousel with premium styling */}
                          <div className="relative w-full h-full">
                            {images.length > 0 && (
                              <div className="relative w-full h-full">
                                <Image 
                                  src={images[currentImageIndex]} 
                                  alt={activity.title}
                                  fill
                                  quality={95}
                                  sizes="(max-width: 768px) 100vw, 40vw"
                                  className="object-cover object-center transition-all duration-700 scale-[1.01] hover:scale-[1.03] rounded-tl-[2.5rem] rounded-bl-none md:rounded-bl-[2.5rem] rounded-tr-[2.5rem] md:rounded-tr-none"
                                  priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-tl-[2.5rem] rounded-bl-none md:rounded-bl-[2.5rem] rounded-tr-[2.5rem] md:rounded-tr-none"></div>
                                
                                {/* Image counter badge */}
                                <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium text-white border border-white/10 md:block hidden">
                                  {currentImageIndex + 1} / {images.length}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Enhanced navigation arrows */}
                          {images.length > 1 && (
                            <>
                              <button 
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10 group shadow-teal-md"
                                aria-label="Previous image"
                              >
                                <ChevronLeftIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
                              </button>
                              <button 
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10 group shadow-teal-md"
                                aria-label="Next image"
                              >
                                <ChevronRightIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
                              </button>
                            </>
                          )}
                          
                          {/* Enhanced image indicator dots */}
                          {images.length > 1 && (
                            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
                              {images.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setCurrentImageIndex(idx)}
                                  className={`h-1.5 rounded-full transition-all duration-300 ${
                                    idx === currentImageIndex 
                                      ? 'bg-brand-teal-400 w-6 shadow-teal-glow' 
                                      : 'bg-white/40 w-1.5 hover:bg-white/70'
                                  }`}
                                  aria-label={`Go to image ${idx + 1}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Enhanced title and badge overlay on mobile */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="inline-block text-xs font-medium uppercase tracking-wider text-white bg-brand-teal-600/80 backdrop-blur-sm px-3 py-1 rounded-full mb-2 shadow-sm border border-white/10 animate-pulse-subtle">
                                {activity.type}
                              </span>
                              <h2 className="text-2xl font-bold text-white drop-shadow-lg font-display">
                                {activity.title}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right side - Enhanced Content Area */}
                      <div className="p-6 sm:p-8 w-full md:w-3/5 overflow-y-auto custom-scrollbar" style={{ maxHeight: '100%' }}>
                        {/* Enhanced close button with glass effect */}
                        <button 
                          onClick={closeModal}
                          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/60 backdrop-blur-xl border border-white/50 flex items-center justify-center text-neutral-700 hover:bg-white transition-all duration-300 z-10 group shadow-teal-sm"
                        >
                          <XMarkIcon className="w-5 h-5 text-brand-teal-700 group-hover:scale-110 transition-transform duration-200" />
                        </button>
                        
                        {/* Enhanced title and price - desktop only */}
                        <div className="hidden md:block mb-8 relative">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div className="max-w-md">
                              <span className="inline-block text-xs font-medium uppercase tracking-wider text-white bg-gradient-to-r from-brand-teal-500 to-brand-teal-600 backdrop-blur-sm px-3 py-1 rounded-full mb-3 shadow-sm border border-white/10">
                                {activity.type}
                              </span>
                              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 font-display">
                                {activity.title}
                              </h2>
                              
                              {/* Rating stars display */}
                              <div className="flex items-center mt-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIcon 
                                      key={i} 
                                      className={`w-4 h-4 ${i < activity.rating ? 'text-brand-teal-400' : 'text-neutral-200'}`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-neutral-500 ml-2 font-medium">{activity.reviewCount} verified reviews</span>
                              </div>
                            </div>
                            
                            {/* Premium pricing cards */}
                            <div className="flex space-x-3 ebn-animate-float">
                              <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-teal-md border border-white/50 px-5 py-3">
                                <div className="flex flex-col items-center space-y-0.5">
                                  <span className="text-neutral-500 text-xs font-medium">Group</span>
                                  <span className="text-brand-teal-600 font-bold text-lg">{getGroupPrice()}</span>
                                </div>
                              </div>
                              <div className="bg-gradient-to-br from-amber-500/60 to-orange-500/60 backdrop-blur-md rounded-2xl shadow-teal-md border border-white/50 px-5 py-3">
                                <div className="flex flex-col items-center space-y-0.5">
                                  <span className="text-white text-xs font-medium">Private</span>
                                  <span className="text-white font-bold text-lg">{getPrivatePrice()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Decorative element */}
                          <div className="w-24 h-1 bg-gradient-to-r from-brand-teal-400 to-brand-blue-400 rounded-full mt-4 opacity-70"></div>
                        </div>
                        
                        {/* Enhanced mobile price badge */}
                        <div className="md:hidden flex justify-center mt-4 mb-6 space-x-3 ebn-animate-float">
                          <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-teal-md border border-white/50 px-5 py-2">
                            <div className="flex flex-col items-center space-y-0.5">
                              <span className="text-neutral-500 text-xs font-medium">Group</span>
                              <span className="text-brand-teal-600 font-bold text-lg">{getGroupPrice()}</span>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-amber-500/60 to-orange-500/60 backdrop-blur-md rounded-xl shadow-teal-md border border-white/50 px-5 py-2">
                            <div className="flex flex-col items-center space-y-0.5">
                              <span className="text-white text-xs font-medium">Private</span>
                              <span className="text-white font-bold text-lg">{getPrivatePrice()}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Enhanced info cards with glass morphism */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-7">
                          <div className="ebn-glass-light rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center border border-white/60 shadow-teal-sm group hover:shadow-teal-md transition-all duration-300 ease-out cursor-default">
                            <div className="w-9 h-9 rounded-full bg-brand-teal-100/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                              <ClockIcon className="w-5 h-5 text-brand-teal-600" />
                            </div>
                            <span className="text-xs text-neutral-500 font-medium">Duration</span>
                            <span className="text-sm font-semibold text-neutral-700">{activity.duration}</span>
                          </div>
                          
                          <div className="ebn-glass-light rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center border border-white/60 shadow-teal-sm group hover:shadow-teal-md transition-all duration-300 ease-out cursor-default">
                            <div className="w-9 h-9 rounded-full bg-brand-teal-100/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                              <MapPinIcon className="w-5 h-5 text-brand-teal-600" />
                            </div>
                            <span className="text-xs text-neutral-500 font-medium">Location</span>
                            <span className="text-sm font-semibold text-neutral-700">{activity.location}</span>
                          </div>
                          
                          <div className="ebn-glass-light rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center border border-white/60 shadow-teal-sm group hover:shadow-teal-md transition-all duration-300 ease-out cursor-default">
                            <div className="w-9 h-9 rounded-full bg-brand-teal-100/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                              <UserGroupIcon className="w-5 h-5 text-brand-teal-600" />
                            </div>
                            <span className="text-xs text-neutral-500 font-medium">Group Size</span>
                            <span className="text-sm font-semibold text-neutral-700">Max {activity.maxParticipants}</span>
                          </div>
                          
                          <div className="ebn-glass-light rounded-xl p-3 md:p-4 flex flex-col items-center justify-center text-center border border-white/60 shadow-teal-sm group hover:shadow-teal-md transition-all duration-300 ease-out cursor-default">
                            <div className="w-9 h-9 rounded-full bg-brand-teal-100/50 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                              <div className="flex">
                                <StarIcon className="w-4 h-4 text-brand-teal-500" />
                              </div>
                            </div>
                            <span className="text-xs text-neutral-500 font-medium">Reviews</span>
                            <span className="text-sm font-semibold text-neutral-700">{activity.reviewCount} reviews</span>
                          </div>
                        </div>
                        
                        {/* Enhanced description with premium styling */}
                        <div className="mb-8 bg-gradient-to-br from-brand-teal-50/40 to-white/30 backdrop-blur-sm rounded-xl p-5 border border-white/60 shadow-teal-sm">
                          <h3 className="text-xl font-bold text-brand-teal-800 mb-3 font-display flex items-center">
                            <span className="w-1 h-5 bg-gradient-to-b from-brand-teal-400 to-brand-teal-600 rounded-full mr-3"></span>
                            About This Excursion
                          </h3>
                          <p className="text-neutral-600 leading-relaxed text-sm">{activity.description}</p>
                        </div>
                        
                        <div className="space-y-8">
                          {/* Enhanced highlights with premium cards */}
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-white/60 shadow-teal-sm">
                            <h3 className="text-lg font-bold text-brand-teal-800 mb-4 flex items-center font-display">
                              <span className="w-1 h-5 bg-gradient-to-b from-brand-blue-400 to-brand-blue-600 rounded-full mr-3"></span>
                              Experience Highlights
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {activity.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start bg-gradient-to-br from-white/70 to-brand-blue-50/20 rounded-lg p-3 border border-white/60 shadow-sm group hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
                                  <div className="w-6 h-6 rounded-full bg-brand-blue-100/60 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-brand-blue-700 text-xs font-bold">•</span>
                                  </div>
                                  <span className="text-neutral-700 text-sm">{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {/* Enhanced included with premium cards */}
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-white/60 shadow-teal-sm">
                            <h3 className="text-lg font-bold text-brand-teal-800 mb-4 flex items-center font-display">
                              <span className="w-1 h-5 bg-gradient-to-b from-brand-teal-400 to-brand-teal-600 rounded-full mr-3"></span>
                              What's Included
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {activity.included.map((item, index) => (
                                <li key={index} className="flex items-start bg-gradient-to-br from-white/70 to-brand-teal-50/20 rounded-lg p-3 border border-white/60 shadow-sm group hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
                                  <div className="w-6 h-6 rounded-full bg-brand-teal-100/60 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                                    <CheckCircleIcon className="w-4 h-4 text-brand-teal-700" />
                                  </div>
                                  <span className="text-neutral-700 text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        {/* Enhanced action buttons with premium styling */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-8 border-t border-brand-teal-100/50">
                          <div className="w-full">
                            {/* Enhanced trust indicators */}
                            <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
                              <div className="flex items-center">
                                <div className="w-5 h-5 rounded-full bg-brand-teal-100 flex items-center justify-center mr-2">
                                  <div className="w-2.5 h-2.5 rounded-full bg-brand-teal-500 animate-pulse"></div>
                                </div>
                                <span className="text-sm text-brand-teal-700 font-medium">Instant confirmation</span>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <div className="flex items-center">
                                  <ShieldCheckIcon className="w-4 h-4 text-brand-teal-600 mr-1.5" />
                                  <span className="text-xs text-neutral-600">Secure booking</span>
                                </div>
                                <div className="h-4 w-px bg-neutral-300"></div>
                                <div className="flex items-center">
                                  <span className="text-xs text-neutral-600">Free cancellation up to 24h before</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Premium styled button */}
                            <button 
                              onClick={openBookingModal}
                              className="w-full py-4 px-6 rounded-[1.5rem] bg-gradient-to-r from-brand-teal-500 to-brand-blue-500 hover:from-brand-teal-400 hover:to-brand-blue-400 text-white text-base font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-teal-xl shadow-teal-lg border border-white/20 flex items-center justify-center space-x-2 group"
                            >
                              <span>Book Your Experience Now</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </button>
                            
                            {/* Trust message */}
                            <p className="text-xs text-center text-neutral-500 mt-3">Secure, easy booking with instant confirmation</p>
                            
                            {/* Trust badges */}
                            <div className="flex justify-center items-center space-x-3 mt-4">
                              <div className="flex items-center space-x-1 bg-white/80 rounded-md px-2 py-0.5 border border-neutral-100 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span className="text-[10px] text-neutral-600 font-medium">Secure Payment</span>
                              </div>
                              <div className="flex items-center space-x-1 bg-white/80 rounded-md px-2 py-0.5 border border-neutral-100 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-[10px] text-neutral-600 font-medium">Verified Activity</span>
                              </div>
                              <div className="flex items-center space-x-1 bg-white/80 rounded-md px-2 py-0.5 border border-neutral-100 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-[10px] text-neutral-600 font-medium">Flexible Dates</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      
      {/* Modals */}
      <EnhancedBookingModal 
        isOpen={isBookingModalOpen} 
        closeModal={closeBookingModal}
        excursionTitle={activity.title}
        excursionType={activity.type}
        onBookingSuccess={openConfirmationModal}
        activity={{
          id: activity.title.toLowerCase().replace(/\s+/g, '-'),
          title: activity.title,
          type: activity.type,
          image: activity.image,
          gallery: images,
          description: activity.description,
          longDescription: activity.description,
          duration: activity.duration,
          location: activity.location,
          groupPrice: parseInt(getGroupPrice().replace('€', '') || "100"),
          privatePrice: parseInt(getPrivatePrice().replace('€', '') || "150"),
          rating: activity.rating,
          reviewCount: activity.reviewCount,
          maxParticipants: activity.maxParticipants,
          highlights: activity.highlights,
          included: activity.included
        }}
      />
      
      <BookingConfirmationModal 
        isOpen={isConfirmationModalOpen}
        closeModal={closeConfirmationModal}
        activityTitle={activity.title}
        bookingReference={bookingDetails.reference}
        customerName={bookingDetails.name}
        customerEmail={bookingDetails.email}
        travelDate={bookingDetails.date}
      />
    </>
  );
} 