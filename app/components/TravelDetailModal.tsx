"use client";

import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { XMarkIcon, CalendarDaysIcon, MapPinIcon, StarIcon, ClockIcon, CheckIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Destination {
  name: string;
  location: string;
  price: string;
  image: string;
  rating: number;
  duration: string;
  description: string;
}

interface TravelDetailModalProps {
  isOpen: boolean;
  closeModal: () => void;
  destination: Destination | null;
}

const TravelDetailModal = ({ isOpen, closeModal, destination }: TravelDetailModalProps) => {
  useEffect(() => {
    if (isOpen) {
      console.log("Detail modal opened", destination);
    }
  }, [isOpen, destination]);

  if (!destination) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-400"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-300"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100/50 transition-all transform">
              {/* Close button */}
              <button 
                onClick={closeModal}
                className="absolute right-5 top-5 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-md transition-all duration-300 focus:outline-none"
                aria-label="Close dialog"
              >
                <XMarkIcon className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex flex-col w-full">
                {/* Image area with gradient overlay */}
                <div className="relative h-80 w-full">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Destination name overlay */}
                  <div className="absolute bottom-0 left-0 p-8">
                    <h2 className="text-3xl font-bold text-white mb-2 leading-tight">{destination.name}</h2>
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-blue-400" />
                      <span className="text-white/90">{destination.location}</span>
                    </div>
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 shadow-md">
                    <StarSolidIcon className="h-5 w-5 text-amber-500" />
                    <span className="text-gray-800">{destination.rating} rating</span>
                  </div>
                </div>

                {/* Activity key details - spans full width below image */}
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100 border-b border-gray-200 w-full bg-gray-50">
                  <div className="p-3 sm:p-5 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <ClockIcon className="h-5 w-5 text-blue-500" />
                      <span className="text-xs font-medium uppercase">Duration</span>
                    </div>
                    <p className="font-semibold text-gray-900">{destination.duration}</p>
                  </div>
                  
                  <div className="p-3 sm:p-5 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <MapPinIcon className="h-5 w-5 text-blue-500" />
                      <span className="text-xs font-medium uppercase">Location</span>
                    </div>
                    <p className="font-semibold text-gray-900">{destination.location}</p>
                  </div>
                  
                  <div className="p-3 sm:p-5 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-xs font-medium uppercase">Group Size</span>
                    </div>
                    <p className="font-semibold text-gray-900">Max 12 people</p>
                  </div>
                  
                  <div className="p-3 sm:p-5 flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <CalendarDaysIcon className="h-5 w-5 text-blue-500" />
                      <span className="text-xs font-medium uppercase">Availability</span>
                    </div>
                    <p className="font-semibold text-gray-900">Daily Tours</p>
                  </div>
                </div>
              </div>

              {/* Content area */}
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  
                  {/* Left column - Details */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">About This Experience</h3>
                    <p className="text-gray-600 mb-7 leading-relaxed">{destination.description}</p>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">What's Included</h3>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <CheckIcon className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-600">Professional local guide</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <CheckIcon className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-600">Hotel pickup and drop-off</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <CheckIcon className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-600">Transport by air-conditioned vehicle</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <CheckIcon className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-gray-600">Bottled water</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Right column - Booking summary */}
                  <div className="md:w-80 flex-shrink-0">
                    <div className="rounded-2xl overflow-hidden p-6 shadow-md border border-gray-200 bg-white">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">Price Details</h3>
                      
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between items-baseline">
                          <span className="text-gray-500 text-sm">Price</span>
                          <span className="text-2xl font-bold text-blue-700">{destination.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 text-sm">Per Person</span>
                          <span></span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200 mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Group Tour</span>
                          <span className="text-sm font-medium text-gray-800">from {destination.price}/person</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Private Tour</span>
                          <span className="text-sm font-medium text-gray-800">from ${parseInt(destination.price.replace('$', '')) * 1.5}/person</span>
                        </div>
                      </div>
                      
                      <button 
                        onClick={closeModal}
                        className="w-full bg-blue-600 hover:bg-blue-700 px-5 py-3.5 rounded-xl text-white font-medium shadow-md hover:shadow-lg transition-all"
                      >
                        Book This Experience
                      </button>
                      
                      <p className="text-xs text-center text-gray-500 mt-4">
                        Free cancellation up to 24 hours before the experience
                      </p>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <div className="flex items-start gap-3">
                        <StarIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-900">Travel tip:</span> Book in advance to secure your spot as this experience often sells out.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TravelDetailModal; 