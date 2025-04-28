import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CalendarDaysIcon, ClockIcon, MapPinIcon, UserGroupIcon, CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { Button } from './Button';
import Image from 'next/image';
import { EnhancedBookingModal } from './EnhancedBookingModal';
import { BookingConfirmationModal } from './BookingConfirmationModal';
import { Activity } from '../utils/activities';

interface ActivityModalProps {
  isOpen: boolean;
  closeModal: () => void;
  activity: Activity;
}

export function ImprovedActivityModal({ isOpen, closeModal, activity }: ActivityModalProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    reference: '',
    name: '',
    email: '',
    date: '',
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  
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
    closeModal();
  };
  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    }
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Autoplay effect
  useEffect(() => {
    if (activity.gallery.length > 1 && isOpen) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % activity.gallery.length);
      }, 4000);
      return () => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
      };
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [activity.gallery, isOpen]);

  // Manual navigation resets autoplay timer
  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % activity.gallery.length);
      }, 4000);
    }
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? activity.gallery.length - 1 : prev - 1));
    resetAutoplay();
  };
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % activity.gallery.length);
    resetAutoplay();
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          {/* Premium backdrop with subtle blur effect */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xl will-change-transform" />
          </Transition.Child>

          {/* Fixed modal container to prevent body scroll */}
          <div className="fixed inset-0 overflow-hidden">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel 
                  className="relative w-full max-w-6xl transform text-left transition-all max-h-[90vh] hardware-accelerated modal-google"
                >
                  {/* Decorative elements with enhanced subtle styling */}
                  <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-brand-teal-400/10 to-brand-teal-300/5 blur-[120px] -z-10 animate-pulse-subtle"></div>
                  <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-brand-blue-400/10 to-brand-blue-300/5 blur-[120px] -z-10 animate-pulse-subtle"></div>
                  
                  {/* Premium content container */}
                  <div className="rounded-3xl overflow-hidden shadow-premium h-[calc(90vh-2rem)] max-h-[850px] bg-white">
                    <div className="relative flex flex-col md:flex-row h-full">
                      {/* Left side - Gallery or Single Image */}
                      <div className="relative w-full md:w-5/12 h-56 md:h-full flex-shrink-0">
                        <div className="relative w-full h-full overflow-hidden">
                          {activity.gallery.length > 1 ? (
                            <>
                              <Image
                                src={activity.gallery[currentImageIndex]}
                                alt={activity.title}
                                fill
                                quality={95}
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="object-cover object-center transition-all duration-700 scale-[1.01] hover:scale-[1.03] image-premium pinterest-image"
                                priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                              {/* Navigation arrows */}
                              <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10 group"
                                aria-label="Previous image"
                              >
                                <ChevronLeftIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
                              </button>
                              <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300 z-10 group"
                                aria-label="Next image"
                              >
                                <ChevronRightIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
                              </button>
                              {/* Indicator dots */}
                              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-10">
                                {activity.gallery.map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => { setCurrentImageIndex(idx); resetAutoplay(); }}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-brand-teal-400 w-6 shadow-teal-glow' : 'bg-white/40 w-1.5 hover:bg-white/70'}`}
                                    aria-label={`Go to image ${idx + 1}`}
                                  />
                                ))}
                              </div>
                              {/* Image counter badge */}
                              <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium text-white border border-white/10 md:block hidden">
                                {currentImageIndex + 1} / {activity.gallery.length}
                              </div>
                            </>
                          ) : (
                            <>
                              <Image
                                src={activity.image}
                                alt={activity.title}
                                fill
                                quality={95}
                                sizes="(max-width: 768px) 100vw, 40vw"
                                className="object-cover object-center transition-all duration-700 scale-[1.01] hover:scale-[1.03] image-premium pinterest-image"
                                priority
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Right side - Content with INDEPENDENT scrolling - restructured for sticky button */}
                      <div className="flex-1 flex flex-col bg-white overflow-hidden md:h-full">
                        {/* Scrollable content area - now has more vertical space */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 text-premium">
                          {/* Close button - cleaner and more premium */}
                          <button
                            onClick={closeModal}
                            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-all duration-300 z-10"
                            aria-label="Close modal"
                          >
                            <XMarkIcon className="w-5 h-5 text-neutral-700" />
                          </button>
                          
                          <div className="pt-2 staggered-fade-in">
                            {/* Activity type badge - cleaner styling */}
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-neutral-100 text-neutral-700 font-medium text-sm mb-3">
                              {activity.type}
                            </div>
                            
                            {/* Activity title - more premium typography */}
                            <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2 font-display tracking-tight text-gradient-premium">
                              {activity.title}
                            </h2>
                            
                            {/* Ratings - enhanced styling */}
                            <div className="flex items-center mb-5">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon 
                                    key={i} 
                                    className={`w-5 h-5 ${i < Math.round(activity.rating) ? 'text-amber-400' : 'text-neutral-200'}`} 
                                  />
                                ))}
                              </div>
                              <span className="ml-2 text-neutral-600 text-sm font-medium">
                                {activity.rating.toFixed(1)} ({activity.reviewCount} verified reviews)
                              </span>
                            </div>
                            
                            {/* Price options - premium styling with enhanced visibility */}
                            <div className="grid grid-cols-2 gap-5 mb-6">
                              <div className="price-card bg-white rounded-2xl p-4 flex flex-col items-center justify-center transition-all border border-neutral-200 google-card-hover shadow-premium relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-20 h-20 bg-neutral-100 rounded-full"></div>
                                <span className="text-sm font-medium text-neutral-500 mb-1">Group</span>
                                <span className="text-3xl font-bold text-neutral-900 price-pop">€{activity.groupPrice}</span>
                                <span className="text-xs text-neutral-500 mt-1">per person</span>
                              </div>
                              <div className="price-card-featured bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl p-4 flex flex-col items-center justify-center transition-all border border-neutral-800 google-card-hover shadow-premium relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-20 h-20 bg-neutral-700 rounded-full"></div>
                                <span className="text-sm font-medium text-neutral-300 mb-1">Private</span>
                                <span className="text-3xl font-bold text-white price-pop-accent">€{activity.privatePrice}</span>
                                <span className="text-xs text-neutral-400 mt-1">per tour</span>
                              </div>
                            </div>
                            
                            {/* Key information - cleaner layout with elegant icons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                              <div className="flex items-start">
                                <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center mr-3 flex-shrink-0">
                                  <ClockIcon className="w-4 h-4 text-neutral-700" />
                                </div>
                                <div>
                                  <span className="text-sm text-neutral-500 font-medium">Duration</span>
                                  <p className="text-neutral-800 font-medium">{activity.duration}</p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center mr-3 flex-shrink-0">
                                  <MapPinIcon className="w-4 h-4 text-neutral-700" />
                                </div>
                                <div>
                                  <span className="text-sm text-neutral-500 font-medium">Location</span>
                                  <p className="text-neutral-800 font-medium">{activity.location}</p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center mr-3 flex-shrink-0">
                                  <CalendarDaysIcon className="w-4 h-4 text-neutral-700" />
                                </div>
                                <div>
                                  <span className="text-sm text-neutral-500 font-medium">Available Dates</span>
                                  <p className="text-neutral-800 font-medium">Daily</p>
                                </div>
                              </div>
                              <div className="flex items-start">
                                <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center mr-3 flex-shrink-0">
                                  <UserGroupIcon className="w-4 h-4 text-neutral-700" />
                                </div>
                                <div>
                                  <span className="text-sm text-neutral-500 font-medium">Group Size</span>
                                  <p className="text-neutral-800 font-medium">Max {activity.maxParticipants} people</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Description - clean elegant typography */}
                            <div className="mb-6">
                              <h3 className="text-xl font-bold text-neutral-800 mb-2">About This Excursion</h3>
                              <p className="text-neutral-600 leading-relaxed">
                                {activity.longDescription}
                              </p>
                            </div>
                            
                            {/* Highlights - cleaner styling */}
                            <div className="mb-6">
                              <h3 className="text-xl font-bold text-neutral-800 mb-2">Highlights</h3>
                              <ul className="space-y-2">
                                {activity.highlights.map((highlight, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircleIcon className="w-5 h-5 text-neutral-700 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-neutral-600">{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Included - cleaner styling */}
                            <div className="mb-16">
                              <h3 className="text-xl font-bold text-neutral-800 mb-2">What's Included</h3>
                              <ul className="space-y-2">
                                {activity.included.map((item, index) => (
                                  <li key={index} className="flex items-start">
                                    <CheckCircleIcon className="w-5 h-5 text-neutral-700 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="text-neutral-600">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        {/* Sticky bottom section - simplified with just the button */}
                        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-neutral-100 p-3 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
                          <Button 
                            onClick={openBookingModal} 
                            className="w-full py-3 bg-black text-white font-medium rounded-xl hover:bg-neutral-900 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
                          >
                            <ShieldCheckIcon className="w-5 h-5 mr-2 text-white" />
                            Book Now
                          </Button>
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
      
      {/* Booking modal */}
      <EnhancedBookingModal 
        isOpen={isBookingModalOpen} 
        closeModal={closeBookingModal} 
        excursionTitle={activity.title}
        excursionType={activity.type}
        onBookingSuccess={openConfirmationModal}
        activity={activity}
      />
      
      {/* Confirmation modal */}
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