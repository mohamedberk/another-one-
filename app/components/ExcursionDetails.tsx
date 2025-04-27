import React from 'react';
import { Excursion } from '../data/excursions';

interface ExcursionDetailsProps {
  excursion: Excursion;
  onBook: () => void;
}

const ExcursionDetails = ({ excursion, onBook }: ExcursionDetailsProps) => {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.2)] mb-16">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-8">Trip Exclusivity Details</h3>
      
      {/* Includes & Excludes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Includes */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-500/30 transition-all duration-300">
          <h4 className="text-amber-400 font-bold flex items-center mb-5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 backdrop-blur-sm flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            Premium Inclusions
          </h4>
          <ul className="space-y-4">
            {excursion.details.includes.map((item, index) => (
              <li key={index} className="flex items-start text-white/70 hover:text-white transition-colors duration-300">
                <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mr-3 flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Excludes */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-500/30 transition-all duration-300">
          <h4 className="text-amber-400 font-bold flex items-center mb-5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 backdrop-blur-sm flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            Additional Services
          </h4>
          <ul className="space-y-4">
            {excursion.details.excludes.map((item, index) => (
              <li key={index} className="flex items-start text-white/70 hover:text-white transition-colors duration-300">
                <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 mr-3 flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Itinerary */}
      <div className="mb-12">
        <h4 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-8">Luxury Journey Itinerary</h4>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gradient-to-b from-amber-400/70 via-amber-400/30 to-amber-400/10"></div>
          <ul className="space-y-8 relative z-10">
            {excursion.details.itinerary.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-full h-3 w-3 mt-4 mr-4 flex-shrink-0 shadow-[0_0_10px_rgba(251,191,36,0.5)] z-20"></div>
                <div className="flex-1">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 hover:border-amber-500/30 transition-all duration-300">
                    <span className="font-bold text-amber-400 block mb-2">{item.time}</span>
                    <p className="text-white font-medium mb-1">{item.activity}</p>
                    {item.description && (
                      <p className="text-white/70 text-sm">{item.description}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Book Now Button */}
      <div className="flex justify-center">
        <button 
          onClick={onBook}
          className="group relative overflow-hidden px-10 py-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full font-medium text-black transition-all duration-300 shadow-[0_5px_15px_rgba(251,191,36,0.4)] hover:shadow-[0_8px_25px_rgba(251,191,36,0.6)]"
        >
          <span className="relative z-10 flex items-center">
            <span className="mr-2">Book This Exclusive Experience</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
        </button>
      </div>
    </div>
  );
};

export default ExcursionDetails; 