import React from 'react';
import { TourItem } from '../../components/TourItem';
import Image from 'next/image';
import { cabinetGrotesk, clashDisplay } from '../fonts';

export default function ToursPage() {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${cabinetGrotesk.variable} ${clashDisplay.variable}`}>
      <div className="text-center mb-12">
        <h1 className={`text-4xl font-black text-neutral-900 mb-4 ${cabinetGrotesk.className}`}>Atlas Mountains & Desert Experiences</h1>
        <p className={`text-xl text-neutral-600 max-w-3xl mx-auto ${clashDisplay.className}`}>
          Discover the natural wonders and authentic culture of Morocco with our exclusive day tours from Marrakech
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TourItem />
        
        {/* More tour items can be added here */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 bg-white hover:shadow-xl transition-all duration-300">
          <div className="relative h-64">
            <Image 
              src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
              alt="Ourika Valley" 
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-neutral-800 z-10">
              7 hours
            </div>
          </div>
          
          <div className="p-6">
            <h3 className={`text-xl font-black mb-2 ${cabinetGrotesk.className}`}>Ourika Valley & Setti Fatma Waterfalls</h3>
            
            <p className={`text-neutral-600 mb-4 line-clamp-3 ${clashDisplay.className}`}>
              Escape to the lush Ourika Valley and visit traditional Berber villages nestled in the Atlas foothills. Hike to the spectacular seven waterfalls of Setti Fatma and enjoy a traditional lunch with panoramic mountain views.
            </p>
            
            <div className="flex justify-between items-center">
              <div>
                <span className={`text-xl font-bold text-orange-600 ${cabinetGrotesk.className}`}>€75</span>
                <span className={`text-neutral-500 ml-1 ${clashDisplay.className}`}>per person</span>
              </div>
              
              <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl shadow transition-all hover:-translate-y-0.5 hover:shadow-lg">
                Book Now
              </button>
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200 bg-white hover:shadow-xl transition-all duration-300">
          <div className="relative h-64">
            <Image 
              src="https://images.unsplash.com/photo-1548018560-c7196548e84d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1376&q=80" 
              alt="Ouzoud Waterfalls" 
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-neutral-800 z-10">
              10 hours
            </div>
          </div>
          
          <div className="p-6">
            <h3 className={`text-xl font-black mb-2 ${cabinetGrotesk.className}`}>Ouzoud Waterfalls Day Trip</h3>
            
            <p className={`text-neutral-600 mb-4 line-clamp-3 ${clashDisplay.className}`}>
              Experience the majestic Ouzoud Waterfalls, one of Morocco's natural wonders. Take in the spectacular 110-meter cascades, spot wild Barbary monkeys, and relax with lunch at a riverside restaurant.
            </p>
            
            <div className="flex justify-between items-center">
              <div>
                <span className={`text-xl font-bold text-orange-600 ${cabinetGrotesk.className}`}>€85</span>
                <span className={`text-neutral-500 ml-1 ${clashDisplay.className}`}>per person</span>
              </div>
              
              <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl shadow transition-all hover:-translate-y-0.5 hover:shadow-lg">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 