import React from 'react';
import Image from 'next/image';

interface TestimonialProps {
  quote: string;
  author: string;
  authorTitle?: string;
  avatarUrl: string;
  rating?: number;
}

export function Testimonial({
  quote,
  author,
  authorTitle = 'Verified Customer',
  avatarUrl,
  rating = 5
}: TestimonialProps) {
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/40 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="md:w-24">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/80 shadow-lg mb-4">
            <Image 
              src={avatarUrl} 
              alt={author} 
              width={80} 
              height={80} 
              className="object-cover"
            />
          </div>
          <div className="flex items-center">
            {[...Array(rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
              </svg>
            ))}
          </div>
        </div>
        
        <div className="flex-1">
          <p className="text-xl md:text-2xl font-medium text-neutral-700 mb-4 leading-relaxed italic relative">
            <span className="absolute -top-4 -left-2 text-5xl text-neutral-200">"</span>
            {quote}
            <span className="absolute -bottom-8 -right-2 text-5xl text-neutral-200">"</span>
          </p>
          <div className="mt-6">
            <p className="text-lg font-bold text-neutral-800">{author}</p>
            <p className="text-sm text-neutral-600">{authorTitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 