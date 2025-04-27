import React from 'react';
import { Button } from './Button';
import Image from 'next/image';

interface TourItemProps {
  onClick?: () => void;
}

export function TourItem({ onClick }: TourItemProps) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 bg-white hover:shadow-xl transition-all duration-300">
      <div className="relative h-64">
        <Image 
          src="https://images.unsplash.com/photo-1511185307590-3c29c11275ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
          alt="Agafay Desert" 
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-neutral-800 z-10">
          9 hours
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">Marrakech - Agafay Desert - Lake Lalla Takerkoust Day Tour</h3>
        
        <p className="text-neutral-600 mb-4 line-clamp-3">
          Discover the Agafay desert, just 30 mins from Marrakech. Unlike the Sahara, this is a limestone and clay plateau with sandstone crags, traditional villages, and spectacular scenery. Visit Berber villages, enjoy optional camel rides, and see Lake Lalla Takerkoust, Kik Plateau, Moulay Brahim shrine, and Asni market town.
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-orange-600">€95</span>
            <span className="text-neutral-500 ml-1">per person</span>
          </div>
          
          <Button 
            variant="primary" 
            onClick={onClick}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
} 