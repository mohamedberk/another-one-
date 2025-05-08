'use client';

import React, { useEffect, useRef } from 'react';

interface Review {
  id: number;
  name: string;
  location: string;
  comment: string;
  rating: number;
  activity: string;
}

export default function TravelReviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Reduced number of reviews and shortened comments
  const reviews: Review[] = [
    {
      id: 1,
      name: "Courtney S",
      location: "London, UK",
      comment: "The quad biking through the Palmeraie was incredible with breathtaking views of the Atlas Mountains!",
      rating: 5,
      activity: "Quad Biking"
    },
    {
      id: 2,
      name: "Amabel B",
      location: "Berlin, Germany",
      comment: "Hot air balloon experience was absolutely magical! Floating over the Atlas Mountains at sunrise is unforgettable.",
      rating: 5,
      activity: "Hot Air Balloon"
    },
    {
      id: 3,
      name: "Matt C",
      location: "New York, USA",
      comment: "Superb hospitality and organization. The perfect experience and we thoroughly recommend it.",
      rating: 5,
      activity: "Hot Air Balloon"
    },
    {
      id: 4,
      name: "Lisa P",
      location: "Sydney, Australia",
      comment: "Incredible sunrise views over the desert and Atlas Mountains. Would highly recommend!",
      rating: 5,
      activity: "Desert Tour"
    }
  ];

  // Create multiple copies for continuous scrolling
  const allReviews = [...reviews, ...reviews, ...reviews];

  // Simple scroll animation with slower speed
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const scrollAnimation = () => {
      // Check if the container has been scrolled to the middle section
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth * 2/3) {
        // Reset to the first set of duplicates without animation to create illusion of infinite scroll
        scrollContainer.style.scrollBehavior = 'auto';
        scrollContainer.scrollLeft = scrollContainer.scrollWidth / 3;
        setTimeout(() => {
          scrollContainer.style.scrollBehavior = 'smooth';
        }, 50);
      } else {
        // Slower scrolling speed
        scrollContainer.scrollLeft += 0.5;
      }
    };

    // Slower interval for more gentle scrolling
    const animationInterval = setInterval(scrollAnimation, 40);
    
    return () => clearInterval(animationInterval);
  }, []);

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className={`w-3 h-3 ${index < rating ? 'text-amber-500' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ));
  };

  return (
    <section id="reviews" className="py-10 bg-[#FFFBF5] relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-amber-900">
            Traveler Experiences
          </h2>
          <p className="text-sm text-amber-800 max-w-xl mx-auto">
            Real adventures from Morocco explorers
          </p>
        </div>
        
        {/* Reviews container with horizontal scroll */}
        <div className="relative overflow-hidden py-2">
          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto pb-2"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {allReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm p-4 border border-amber-100 hover:shadow-md transition duration-300"
              >
                <div className="flex items-center mb-2">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium text-amber-900">{review.name}</p>
                    <p className="text-xs text-amber-700">{review.location}</p>
                  </div>
                </div>
                
                <div className="mb-1 flex">
                  {renderStars(review.rating)}
                </div>
                
                <div className="mb-2">
                  <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs">
                    {review.activity}
                  </span>
                </div>
                
                <p className="text-xs text-gray-700 line-clamp-3">{review.comment}</p>
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for scroll effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FFFBF5] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FFFBF5] to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
} 