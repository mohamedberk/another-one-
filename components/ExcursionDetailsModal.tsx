import React, { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

interface ExcursionDetailsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  excursion: {
    title: string;
    description: string;
    image?: string;
    price: string;
    duration?: string;
    highlights?: string[];
    includes?: string[];
    videoSrc?: string;
  };
}

export function ExcursionDetailsModal({ isOpen, closeModal, excursion }: ExcursionDetailsModalProps) {
  const closeButtonRef = useRef(null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog 
        as="div" 
        className="fixed inset-0 z-50 overflow-y-auto" 
        onClose={closeModal}
        initialFocus={closeButtonRef}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-6xl max-h-[90vh] overflow-hidden my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="relative w-full">
                {/* Close button */}
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md hover:bg-white transition-colors duration-200"
                  onClick={closeModal}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <div className="flex flex-col md:flex-row">
                  {/* Left side - Image/Video */}
                  <div className="w-full md:w-1/2 relative">
                    {excursion.videoSrc ? (
                      <div className="relative h-[300px] md:h-[600px] w-full">
                        <video 
                          autoPlay 
                          muted 
                          loop 
                          playsInline
                          className="w-full h-full object-cover"
                        >
                          <source src={excursion.videoSrc} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                      </div>
                    ) : excursion.image ? (
                      <div className="relative h-[300px] md:h-[600px]">
                        <Image 
                          src={excursion.image} 
                          alt={excursion.title} 
                          fill 
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                      </div>
                    ) : null}
                  </div>

                  {/* Right side - Details */}
                  <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto max-h-[600px]">
                    <Dialog.Title as="h3" className="text-3xl font-bold text-neutral-900 mb-2">
                      {excursion.title}
                    </Dialog.Title>
                    
                    <div className="flex items-center mb-6">
                      <div className="bg-neutral-800 text-white px-4 py-2 rounded-xl">
                        <span className="font-semibold">{excursion.price}</span>
                      </div>
                      {excursion.duration && (
                        <div className="ml-4 text-neutral-600 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {excursion.duration}
                        </div>
                      )}
                    </div>
                    
                    <p className="text-neutral-700 mb-8">{excursion.description}</p>
                    
                    {/* Highlights section */}
                    {excursion.highlights && excursion.highlights.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold text-neutral-900 mb-4">Highlights</h4>
                        <ul className="space-y-2">
                          {excursion.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              <span className="text-neutral-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* What's included section */}
                    {excursion.includes && excursion.includes.length > 0 && (
                      <div className="mb-8">
                        <h4 className="text-xl font-semibold text-neutral-900 mb-4">What's Included</h4>
                        <ul className="space-y-2">
                          {excursion.includes.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-800 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-neutral-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Book now button */}
                    <button className="w-full py-4 px-6 bg-gradient-to-r from-neutral-800 to-neutral-700 hover:from-neutral-700 hover:to-neutral-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
} 