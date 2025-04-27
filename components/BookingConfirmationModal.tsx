import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

interface BookingConfirmationModalProps {
  isOpen: boolean;
  closeModal: () => void;
  activityTitle: string;
  bookingReference: string;
  customerName: string;
  customerEmail: string;
  travelDate: string;
  numberOfGuests?: string;
  pickupLocation?: string;
}

export function BookingConfirmationModal({ 
  isOpen, 
  closeModal, 
  activityTitle,
  bookingReference,
  customerName,
  customerEmail,
  travelDate,
  numberOfGuests = "N/A",
  pickupLocation = "N/A"
}: BookingConfirmationModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={closeModal}>
        {/* Backdrop with blur */}
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

        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-screen h-screen transform transition-all overflow-hidden">
              {/* Colorful background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-neutral-50"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-green-300/10 blur-2xl"></div>
                <div className="absolute top-16 right-10 w-16 h-16 rounded-full bg-green-400/10 blur-xl"></div>
              </div>
              
              {/* Content container - now full viewport with flex layout */}
              <div className="relative z-10 h-full w-full flex flex-col p-6 md:p-10 lg:p-16">
                {/* Header section */}
                <div className="w-full max-w-5xl mx-auto">
                  {/* Success animation and title */}
                  <div className="flex items-start mb-6 gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-md shadow-green-400/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white animate-[checkmark_0.5s_ease-in-out_0.2s_both]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      
                      <div className="absolute inset-0 rounded-full border-2 border-green-400/60 scale-0 animate-[scale_1.5s_ease-in-out_0.2s_both]"></div>
                      <div className="absolute inset-0 rounded-full border-2 border-green-300/40 scale-0 animate-[scale_2s_ease-in-out_0.4s_both]"></div>
                    </div>
                    
                    <div>
                      <div className="mb-1 bg-green-50 border border-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1.5">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        Booking Confirmed
                      </div>
                      <Dialog.Title as="h3" className="text-2xl font-bold text-neutral-800 font-display">
                        Thank You for Your Booking!
                      </Dialog.Title>
                      <p className="text-left text-base text-neutral-500 mt-1">
                        Your <span className="font-medium">{activityTitle}</span> experience has been confirmed
                      </p>
                    </div>
                  </div>
                  
                  {/* Booking reference badge */}
                  <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-neutral-100">
                    <div className="text-sm uppercase tracking-wider text-neutral-500 font-medium">Reference Number</div>
                    <div className="bg-neutral-800 text-white py-1 px-3 rounded-lg text-sm font-mono font-medium shadow-sm">
                      {bookingReference}
                    </div>
                  </div>
                </div>
                
                {/* Main content area - now using flex layout with left alignment */}
                <div className="flex-grow flex flex-col md:flex-row gap-6 w-full max-w-5xl mx-auto">
                  {/* Left column - Booking details */}
                  <div className="w-full md:w-1/2">
                    <h4 className="text-base font-medium uppercase tracking-wider text-neutral-700 mb-3">Booking Details</h4>
                    
                    {/* Booking details card - now left-aligned with flex */}
                    <div className="bg-white rounded-xl border border-neutral-100 p-4 shadow-sm">
                      <div className="flex flex-wrap gap-4">
                        {/* Customer Name */}
                        <div className="flex flex-col min-w-[140px]">
                          <span className="text-neutral-400 text-xs uppercase tracking-wide">Customer</span>
                          <span className="text-neutral-800 font-medium">{customerName}</span>
                        </div>
                        
                        {/* Travel Date */}
                        <div className="flex flex-col min-w-[140px]">
                          <span className="text-neutral-400 text-xs uppercase tracking-wide">Travel Date</span>
                          <span className="text-neutral-800 font-medium">{travelDate}</span>
                        </div>
                        
                        {/* Number of Guests */}
                        <div className="flex flex-col min-w-[140px]">
                          <span className="text-neutral-400 text-xs uppercase tracking-wide">Guests</span>
                          <span className="text-neutral-800 font-medium">{numberOfGuests}</span>
                        </div>
                        
                        {/* Status */}
                        <div className="flex flex-col min-w-[140px]">
                          <span className="text-neutral-400 text-xs uppercase tracking-wide">Status</span>
                          <span className="text-green-600 font-medium">Confirmed</span>
                        </div>
                        
                        {/* Pickup Location */}
                        <div className="flex flex-col min-w-[140px]">
                          <span className="text-neutral-400 text-xs uppercase tracking-wide">Pickup Location</span>
                          <span className="text-neutral-800 font-medium">{pickupLocation}</span>
                        </div>
                        
                        {/* Customer Email */}
                        <div className="flex flex-col min-w-[140px]">
                          <span className="text-neutral-400 text-xs uppercase tracking-wide">Email</span>
                          <span className="text-neutral-800 font-medium">{customerEmail}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right column - What's Next and Support */}
                  <div className="w-full md:w-1/2">
                    {/* What's next - with left-aligned items */}
                    <div className="mb-6">
                      <div className="flex items-center mb-3">
                        <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 text-neutral-600">
                            <path d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.633-.633L6.95 5.684z" />
                          </svg>
                        </div>
                        <h4 className="text-base font-medium uppercase tracking-wider text-neutral-700">What's Next</h4>
                      </div>
                      
                      {/* Left-aligned flex container for steps */}
                      <div className="pl-3 border-l-2 border-neutral-100 ml-2.5 space-y-3">
                        <div className="flex items-start">
                          <div className="min-w-[28px] h-[28px] rounded-full bg-neutral-100 flex items-center justify-center text-sm text-neutral-600 mt-0.5 mr-3 flex-shrink-0">1</div>
                          <p className="text-sm text-neutral-600">Check your email for booking confirmation and details.</p>
                        </div>
                        <div className="flex items-start">
                          <div className="min-w-[28px] h-[28px] rounded-full bg-neutral-100 flex items-center justify-center text-sm text-neutral-600 mt-0.5 mr-3 flex-shrink-0">2</div>
                          <p className="text-sm text-neutral-600">Our team will contact you 24 hours before the activity to confirm details.</p>
                        </div>
                        <div className="flex items-start">
                          <div className="min-w-[28px] h-[28px] rounded-full bg-neutral-100 flex items-center justify-center text-sm text-neutral-600 mt-0.5 mr-3 flex-shrink-0">3</div>
                          <p className="text-sm text-neutral-600">Be ready at your pickup location at the designated time and enjoy your experience!</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact support info */}
                    <div className="bg-neutral-50 rounded-lg p-4 flex items-start gap-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-neutral-800 font-medium">Need help with your booking?</div>
                        <div className="text-sm text-neutral-500 mt-1">Our support team is available 24/7. Contact us at help@easybooknow.com or call +1 (555) 123-4567.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close button - bottom of screen */}
                <div className="mt-6 flex justify-center w-full max-w-5xl mx-auto">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-700 px-6 py-3 text-base font-medium text-white shadow-md shadow-neutral-800/10 hover:shadow-lg hover:from-neutral-700 hover:to-neutral-600 transition-all duration-300 transform hover:-translate-y-0.5"
                    onClick={closeModal}
                  >
                    <span>Close Window</span>
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
} 