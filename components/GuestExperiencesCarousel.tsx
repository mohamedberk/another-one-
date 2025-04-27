"use client"

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

// Testimonials data with updated ratings: 4 with 5 stars, 3 with 4 stars, 1 with 3 stars
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    quote: "Amazing trip to the mountains! The guide was super friendly and knew all the best spots for photos. Definitely coming back next year!",
    rating: 5
  },
  {
    id: 2,
    name: "Ahmed Al-Farsi",
    quote: "Best tour I've ever been on. The views were breathtaking and our guide made us feel like family. Worth every penny!",
    rating: 4
  },
  {
    id: 3,
    name: "Emma Taylor",
    quote: "Loved the authentic experience in the Berber villages. The food was incredible and the people were so welcoming!",
    rating: 5
  },
  {
    id: 4,
    name: "Khalid Benghani",
    quote: "My wife and I had such a great time. The mountain air was so refreshing and our guide knew all the history of the area. 100% recommend!",
    rating: 5
  },
  {
    id: 5,
    name: "Michael Rodriguez",
    quote: "Great day trip! Got some awesome photos and the lunch they provided was delicious. The whole experience was so well organized.",
    rating: 4
  },
  {
    id: 6,
    name: "Leila Zidane",
    quote: "Just wow! The hike was perfect for our family - not too difficult but still adventurous. The kids are still talking about it weeks later!",
    rating: 3
  },
  {
    id: 7,
    name: "David Wilson",
    quote: "Really enjoyed our time in the mountains. The tour was well-paced and our guide was super knowledgeable. Will definitely book again!",
    rating: 4
  },
  {
    id: 8,
    name: "Fatima El-Mansouri",
    quote: "Such an awesome experience! I'm not usually an outdoorsy person but this tour converted me. The valleys are just stunning!",
    rating: 5
  }
];

// Configure the autoplay plugin for continuous scrolling
const autoplayPlugin = Autoplay({
  delay: 2000, // Faster delay for more continuous movement
  rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement as HTMLElement,
  stopOnInteraction: false,
  stopOnMouseEnter: false, // Never stop automatically scrolling
  playOnInit: true // Start playing immediately
});

const options: EmblaOptionsType = {
  align: 'start',
  loop: true,
  skipSnaps: false,
  inViewThreshold: 0.7,
  dragFree: false // Disable drag-free to maintain consistent scrolling speed
};

export function GuestExperiencesCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplayPlugin]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on('select', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden pb-10" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="flex-[0_0_100%] sm:flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_30%] px-4"
            >
              <div className="backdrop-blur-md bg-white/70 border border-white/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg h-full">
                <div className="mb-4">
                  <div className="flex flex-col">
                    <h3 className="font-bold text-neutral-800 text-lg">{testimonial.name}</h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} fill-current`} 
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-neutral-700 italic text-sm">"{testimonial.quote}"</blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === selectedIndex ? "bg-neutral-800" : "bg-neutral-400"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 