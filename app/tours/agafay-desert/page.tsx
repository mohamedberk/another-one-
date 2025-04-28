"use client"

import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import { EnhancedBookingModal } from '../../../components/EnhancedBookingModal';
import Image from 'next/image';

export default function AgafayDesertTourPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);
  
  // Define activity data for the booking modal
  const agafayActivity = {
    id: "agafay-desert-tour",
    title: "Marrakech - Agafay Desert - Lake Lalla Takerkoust Day Tour",
    type: "EXCURSION",
    image: "https://images.unsplash.com/photo-1511185307590-3c29c11275ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511185307590-3c29c11275ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1490782300182-697b80ad4293?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
      "https://images.unsplash.com/photo-1517309250587-7c3e9693561c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80",
      "https://images.unsplash.com/photo-1596970101747-450d3f4b36d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      "https://images.unsplash.com/photo-1595232791733-ff380dc83cf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
    ],
    description: "An early departure in 4x4 for your private day tour from Marrakech to discover the Agafay desert.",
    longDescription: "An early departure in 4x4 for your private day tour, you start from Marrakech at 9:00 a.m. and set off to discover the Agafay desert, just 30 mins from Marrakech city.",
    duration: "9 hours",
    location: "Agafay Desert & Lake Lalla Takerkoust",
    groupPrice: 95,
    privatePrice: 150,
    rating: 4.9,
    reviewCount: 156,
    maxParticipants: 10,
    highlights: [
      'Discover the unique Agafay desert landscape just 30 minutes from Marrakech',
      'Experience traditional Berber villages and authentic rural life',
      'Optional camel riding and tea in a Berber home',
      'Visit Lake Lalla Takerkoust and enjoy scenic views',
      'Explore the Kik Plateau with its stunning panoramic views'
    ],
    included: [
      'Private transportation in comfortable 4x4 vehicle',
      'English-speaking driver/guide',
      'Bottled water',
      'Pick-up and drop-off at your Marrakech accommodation'
    ]
  };
  
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left column - Tour details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Marrakech - Agafay Desert - Lake Lalla Takerkoust Day Tour
            </h1>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1 text-neutral-800 font-medium">4.9</span>
                <span className="ml-1 text-neutral-500">(156 reviews)</span>
              </div>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-600">9 hours</span>
            </div>
            
            <p className="text-neutral-600 mb-6">
              An early departure in 4x4 for your private day tour, you start from Marrakech at 9:00 a.m. and set off to discover the Agafay desert, just 30 mins from Marrakech city. For those who haven't got sufficient time for a desert tour from Marrakech, all the way south to the Sahara dunes, then Agafay desert is the next best thing. Unlike the Sahara though this is not a sand desert - its more of an undulating, baked limestone and clay plateau. Sandstone crags, traditional earth-built villages, dusty river beds are interspersed with spectacular lush pasture and flora in the spring. The scenery in spring is remarkable and varied with wild flowers wild grasses, palm trees, olive trees, oleander, eucalyptus and abundant cactus.
            </p>
            
            <p className="text-neutral-600 mb-6">
              You travel off-road passing a small lake and Berber villages and have time to get out and walk for a while along the tracks if you wish. You can also choose to take a camel ride and have tea in a Berber village. The road then heads towards the lake of Lalla Takerkoust which is in fact a hydro-electricity reservoir. It's a popular spot for picnics on the edge of the lake, restaurants serving grilled food and salads and also for horse-riding or jet-skiing. (Let us know if you wish to include this in your day). Lunch will be in one of the lakeside restaurants (not inc. in the price). After lunch you continue your journey eastwards and head for the Kik Plateau where you will stop for refreshments form a high vantage point, before then taking the road to the village of Moulay Brahim, with its famous holy shrine. Finally the road descends into the market town of Asni at the foot of the Atlas Mountains.
            </p>
            
            <p className="text-neutral-600 mb-6 italic">
              NB On Saturdays there is a lively local souk well worth stopping to visit to witness livestock trading, local produce and authentic rural life. Passing through orchards of apple, cherry and apricot trees you descend towards the agricultural plains of Marrakech to reach the city at around 6:00 p.m. after a thrilling mix of desert, mountains, lakes and villages all within a one-day tour from Marrakech.
            </p>
            
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Tour Highlights</h3>
                <ul className="space-y-2">
                  {[
                    'Discover the unique Agafay desert landscape just 30 minutes from Marrakech',
                    'Experience traditional Berber villages and authentic rural life',
                    'Optional camel riding and tea in a Berber home',
                    'Visit Lake Lalla Takerkoust and enjoy scenic views',
                    'Explore the Kik Plateau with its stunning panoramic views',
                    'See the holy shrine at Moulay Brahim village',
                    'Visit the market town of Asni with its Saturday souk (market)'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">What's Included</h3>
                <ul className="space-y-2">
                  {[
                    'Private transportation in comfortable 4x4 vehicle',
                    'English-speaking driver/guide',
                    'Bottled water',
                    'Pick-up and drop-off at your Marrakech accommodation'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Not Included</h3>
                <ul className="space-y-2">
                  {[
                    'Lunch at lakeside restaurant',
                    'Optional camel ride (approx. €15 per person)',
                    'Personal expenses and gratuities'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right column - Booking information and images */}
          <div>
            <div className="sticky top-6">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 bg-white mb-8">
                <div className="relative h-64">
                  <Image 
                    src="https://images.unsplash.com/photo-1511185307590-3c29c11275ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Agafay Desert" 
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <span className="text-2xl font-bold text-orange-600">€95</span>
                      <span className="text-neutral-500 ml-1">per person</span>
                    </div>
                    
                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      Private Tour
                    </div>
                  </div>
                  
                  <Button 
                    variant="primary" 
                    className="w-full py-3 mb-4"
                    onClick={openBookingModal}
                  >
                    Book Now
                  </Button>
                  
                  <div className="text-neutral-500 text-sm text-center mb-4">
                    No payment required to book - pay later
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <svg className="h-6 w-6 text-neutral-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <div className="font-medium text-neutral-800">Availability</div>
                        <div className="text-neutral-600">Daily, year-round</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="h-6 w-6 text-neutral-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="font-medium text-neutral-800">Duration</div>
                        <div className="text-neutral-600">9 hours (9:00 AM - 6:00 PM)</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="h-6 w-6 text-neutral-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <div>
                        <div className="font-medium text-neutral-800">Group Size</div>
                        <div className="text-neutral-600">Private tour for your group only</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="h-6 w-6 text-neutral-500 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <div className="font-medium text-neutral-800">Need Help?</div>
                        <div className="text-neutral-600">+212 661-123456</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-32">
                  <Image 
                    src="https://images.unsplash.com/photo-1490782300182-697b80ad4293?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                    alt="Lake Lalla Takerkoust" 
                    className="object-cover rounded-lg"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-32">
                  <Image 
                    src="https://images.unsplash.com/photo-1517309250587-7c3e9693561c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80" 
                    alt="Atlas Mountains" 
                    className="object-cover rounded-lg"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-32">
                  <Image
                    src="https://images.unsplash.com/photo-1596970101747-450d3f4b36d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80" 
                    alt="Berber Village" 
                    className="object-cover rounded-lg"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative h-32">
                  <Image 
                    src="https://images.unsplash.com/photo-1595232791733-ff380dc83cf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80" 
                    alt="Camel Ride" 
                    className="object-cover rounded-lg"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Booking Modal */}
      <EnhancedBookingModal 
        isOpen={isBookingModalOpen}
        closeModal={closeBookingModal}
        excursionTitle={agafayActivity.title}
        excursionType={agafayActivity.type}
        activity={agafayActivity}
      />
    </>
  );
} 