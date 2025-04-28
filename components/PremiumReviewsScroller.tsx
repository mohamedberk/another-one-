"use client"

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Tour reviews
const reviews = [
  {
    id: 1,
    name: "Davide",
 
    rating: 5,
    review: "We had a beautiful day visiting Ourika valley. Our guide took care of us, very great place to visit and beautiful lunch on the river."
  },
  {
    id: 2,
    name: "Adrian",
    rating: 5,
    review: "100% recommended! We did the complete route of the 7 waterfalls on our own. We agreed with the driver a specific time to be back at the parking lot. Everything was great."
  },
  {
    id: 3,
    name: "Paula",

    rating: 4,
    review: "It was an incredible experience, the town is beautiful! And the guide Mohammed was very friendly. We loved meeting him, and the tour was very well organized."
  },
  {
    id: 4,
    name: "Sarah",

    rating: 5,
    review: "Our guide made us feel like we were exploring Morocco with a friend who happened to know all the best places. An absolutely unforgettable experience."
  },
 
  {
    id: 6,
    name: "Mohammed",

    rating: 4,
    review: "The Setti Fatma waterfalls were gorgeous. Appreciated that our guide was environmentally conscious and the whole valley was much cleaner than I expected."
  },
  {
    id: 7,
    name: "Carlos",

    rating: 5,
    review: "The landscape from Marrakech to the mountains was stunning. Ahmed knew everything about the flora. The home-cooked lunch with his family was exceptional!"
  },
  {
    id: 8,
    name: "Ibrahim",

    rating: 4,
    review: "As a local, I was impressed with how the guide explained our Berber culture to tourists. The Ourika Valley shows the real beauty of Morocco away from the city."
  },
  {
    id: 9,
    name: "Karim",

    rating: 5,
    review: "Our guide accommodated prayer times. Ourika Valley was peaceful and the local markets had high quality crafts without tourist pricing. Will recommend to family."
  },
  {
    id: 10,
    name: "Nina",

    rating: 5,
    review: "The Agafay Desert overnight stay was magical! Sleeping under the stars after a traditional dinner and show. Completely different experience from the mountains."
  }
];

export default function PremiumReviewsScroller() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Clone reviews for smooth continuous scrolling effect
  const allReviews = [...reviews, ...reviews];
  
  useEffect(() => {
    if (!scrollerRef.current || !contentRef.current) return;
    const scrollWidth = contentRef.current.scrollWidth;
    const duration = scrollWidth * 0.02;
    const animation = scrollerRef.current.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${scrollWidth / 2}px)` }
      ],
      {
        duration: duration * 1000,
        iterations: Infinity,
        easing: 'linear',
      }
    );
    animationRef.current = animation;
    if (isPaused) animation.pause();
    return () => {
      animation.cancel();
    };
  }, [isPaused]);

  // Pause/resume handler
  const handleReviewClick = () => {
    setIsPaused((prev) => {
      const next = !prev;
      if (animationRef.current) {
        if (next) animationRef.current.pause();
        else animationRef.current.play();
      }
      return next;
    });
  };

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
      </div>
      
      {/* Continuous scroll container */}
      <div className="w-full overflow-x-auto md:overflow-hidden">
        <div ref={scrollerRef} className={`w-fit flex ${isMobile ? 'px-4' : ''}`}>
          <div ref={contentRef} className="flex gap-5 pl-4">
            {allReviews.map((review, index) => (
              <div 
                key={`${review.id}-${index}`} 
                className="w-[280px] md:w-[350px] flex-shrink-0 cursor-pointer"
                onClick={handleReviewClick}
              >
                <div className={`bg-white border border-gray-100 h-full rounded-3xl overflow-hidden transition-all duration-500 transform hover:scale-[1.02] shadow-sm hover:shadow-lg p-6 ${isPaused ? 'ring-2 ring-amber-500' : ''}`}>
                  {/* Header with name and rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-neutral-800 text-lg">{review.name}</h3>
                    </div>
                    {renderRatingStars(review.rating)}
                  </div>
                  
                  {/* Review text */}
                  <div className="relative">
                    <p className="text-neutral-600 text-sm line-clamp-6">{review.review}</p>
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