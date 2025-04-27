"use client"

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Authentic Morocco tour reviews
const reviews = [
  {
    id: 1,
    name: "Julia W.",
    country: "Germany",
    rating: 5,
    review: "Our guide Hassan was incredible - showing us hidden spots in Ourika Valley that felt untouched by tourism. The waterfall hike was challenging but so worth it. Authentic Moroccan tea with a Berber family was the highlight!"
  },
  {
    id: 2,
    name: "Mark S.",
    country: "United Kingdom",
    rating: 5,
    review: "The Three Valleys tour blew us away! Omar knew all the best photo spots and explained the Berber culture so well. Lunch in a traditional home was incredible - best tagine of our entire trip."
  },
  {
    id: 3,
    name: "Sophia L.",
    country: "Netherlands",
    rating: 4,
    review: "Oukaimeden in winter was magical! Though it was cold, our guide provided extra layers and kept us warm with plenty of mint tea. The views were breathtaking and unlike anything we'd seen before."
  },
  {
    id: 4,
    name: "Thomas K.",
    country: "USA",
    rating: 5,
    review: "My wife and I did the private Ourika tour and it was worth every dirham. Mohammed customized everything to our pace and interests. The genuine connections with locals made this so special."
  },
  {
    id: 5,
    name: "Yuki T.",
    country: "Japan",
    rating: 5,
    review: "Atlas mountains are spectacular! Our guide Mustafa was patient with my broken French and taught us Arabic phrases. The traditional argan oil workshop visit was fascinating. Highly recommend!"
  },
  {
    id: 6,
    name: "Anna P.",
    country: "Poland",
    rating: 4,
    review: "The Asni Valley trek was challenging but Ibrahim made sure we were comfortable. He shared stories about growing up in the mountains and showed us his village. Truly special experience!"
  },
  {
    id: 7,
    name: "Carlos M.",
    country: "Spain",
    rating: 5,
    review: "The landscape transitions from Marrakech to the mountains were stunning. Ahmed was knowledgeable about the flora and geology. The home-cooked lunch with his family was exceptional - his mother's bread was incredible!"
  },
  {
    id: 8,
    name: "Emilie D.",
    country: "France",
    rating: 4,
    review: "We booked last minute and they still arranged a perfect day trip. The Setti Fatma waterfalls were gorgeous. Appreciated that our guide Karim was environmentally conscious and picked up trash along the trails."
  },
  {
    id: 9,
    name: "Ali R.",
    country: "UAE",
    rating: 5,
    review: "As Muslims we appreciated how Yousef accommodated our prayer times. The Ourika Valley was peaceful and the local markets had high quality crafts without tourist pricing. Will return with family."
  },
  {
    id: 10,
    name: "Nina S.",
    country: "Sweden",
    rating: 5,
    review: "Trekking with Hamid in the Three Valleys was the highlight of our Morocco trip. He knew everyone in the villages and got us invited into homes. The authentic experience we were hoping for!"
  }
];

export default function PremiumReviewsScroller() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Clone reviews for smooth continuous scrolling effect
  const allReviews = [...reviews, ...reviews];
  
  useEffect(() => {
    if (!scrollerRef.current || !contentRef.current) return;
    
    // Set animation duration based on content width for consistent scroll speed
    const scrollWidth = contentRef.current.scrollWidth;
    const duration = scrollWidth * 0.02; // Adjust multiplier for speed
    
    const animation = scrollerRef.current.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${scrollWidth / 2}px)` }
      ],
      {
        duration: duration * 1000, // Convert to milliseconds
        iterations: Infinity,
        easing: 'linear'
      }
    );
    
    return () => {
      animation.cancel();
    };
  }, []);

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="mr-0.5">
            {index < Math.floor(rating) ? (
              <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-amber-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            )}
          </span>
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 overflow-hidden relative bg-white rounded-3xl border border-gray-100 shadow-sm my-16">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 flex items-center font-display">
          <span className="inline-block w-12 h-0.5 bg-gradient-to-r from-neutral-800 to-neutral-600 rounded-full mr-5"></span>
          Traveler Reviews
        </h2>
        <p className="text-neutral-600 mt-2 ml-[68px]">
          Real experiences from Atlas Excursions guests
        </p>
      </div>
      
      {/* Continuous scroll container */}
      <div className="w-full overflow-hidden">
        <div ref={scrollerRef} className="w-fit flex">
          <div ref={contentRef} className="flex gap-5 pl-4">
            {allReviews.map((review, index) => (
              <div 
                key={`${review.id}-${index}`} 
                className="w-[320px] md:w-[350px] flex-shrink-0"
              >
                <div className="bg-white border border-gray-100 h-full rounded-3xl overflow-hidden transition-all duration-500 transform hover:scale-[1.02] shadow-sm hover:shadow-lg p-6">
                  {/* Header with name and rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-neutral-800 text-lg">{review.name}</h3>
                      <p className="text-neutral-500 text-xs">{review.country}</p>
                    </div>
                    {renderRatingStars(review.rating)}
                  </div>
                  
                  {/* Review text */}
                  <div className="relative">
                    <svg className="absolute top-0 left-0 w-8 h-8 text-neutral-200 transform -translate-x-3 -translate-y-3 opacity-50" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-neutral-600 text-sm pl-4 line-clamp-6">{review.review}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 