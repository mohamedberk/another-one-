import React from 'react';
import PinIcon from './icons/PinIcon';

interface DestinationCardProps {
  title: string;
  location: string;
  price: number;
  image: string;
}

const DestinationCard = ({ title, location, price, image }: DestinationCardProps) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <div 
          className={`w-full h-full bg-gradient-to-r ${image} flex items-center justify-center`}
        >
          <span className="text-white font-medium">{title}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 bg-white">
        {/* Location */}
        <div className="flex items-center mb-2">
          <PinIcon />
          <span className="ml-2 text-sm text-gray-600">{location}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">${price}<span className="text-sm text-gray-500 font-normal">/person</span></span>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard; 