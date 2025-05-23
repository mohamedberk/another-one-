import React from 'react';

export function WhyUs() {
  return (
    <div id="about" className="max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 my-6">
      <div className="py-4 sm:py-8 bg-white/70 backdrop-blur-md rounded-xl overflow-hidden relative border border-gray-100 shadow-lg">
        {/* Luxe glassmorphism background accent for mobile only */}
        <div className="absolute inset-0 z-0 md:hidden bg-gradient-to-br from-amber-100/60 via-white/60 to-orange-100/40 blur-xl" />
        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          {/* Section label */}
          <div className="flex flex-col items-center mb-2 sm:mb-4">
            <div className="px-3 py-0.5 bg-amber-50 rounded-full text-amber-500 text-xs sm:text-sm font-medium shadow-sm border border-amber-100/50">
              Why Choose Us
            </div>
            {/* Luxe accent divider */}
            <div className="w-10 h-0.5 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 rounded-full mt-2 mb-1 md:hidden" />
          </div>
          {/* Headline */}
          <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-center mb-1 sm:mb-2 font-display text-gray-900 tracking-tight">
            Authentic. Memorable. Exceptional.
          </h2>
          <p className="text-center text-gray-700 mb-4 sm:mb-8 max-w-2xl mx-auto text-xs sm:text-sm">
            Travel with guides who share your passion for adventure and discovery
          </p>
          {/* Grid layout without cards */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {/* Item 1 */}
            <div className="min-w-0 aspect-square sm:aspect-auto p-2 sm:p-4 flex flex-col items-center justify-center text-center snap-center transition-all duration-300 hover:-translate-y-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 sm:h-5 sm:w-5 text-white' viewBox='0 0 20 20' fill='currentColor'><path fillRule='evenodd' d='M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' /></svg>
              </div>
              <h3 className="text-xs sm:text-base font-semibold text-gray-900 mb-1 tracking-tight">Premium Quality</h3>
              <p className="text-gray-600 text-[10px] sm:text-xs leading-snug">
                Every detail meticulously planned
              </p>
            </div>
            {/* Item 2 */}
            <div className="min-w-0 aspect-square sm:aspect-auto p-2 sm:p-4 flex flex-col items-center justify-center text-center snap-center transition-all duration-300 hover:-translate-y-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 sm:h-5 sm:w-5 text-white' viewBox='0 0 20 20' fill='currentColor'><path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' /></svg>
              </div>
              <h3 className="text-xs sm:text-base font-semibold text-gray-900 mb-1 tracking-tight">Intimate Experiences</h3>
              <p className="text-gray-600 text-[10px] sm:text-xs leading-snug">
                Small groups for personalized attention
              </p>
            </div>
            {/* Item 3 */}
            <div className="min-w-0 aspect-square sm:aspect-auto p-2 sm:p-4 flex flex-col items-center justify-center text-center snap-center transition-all duration-300 hover:-translate-y-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 sm:h-5 sm:w-5 text-white' viewBox='0 0 20 20' fill='currentColor'><path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' /></svg>
              </div>
              <h3 className="text-xs sm:text-base font-semibold text-gray-900 mb-1 tracking-tight">Local Expertise</h3>
              <p className="text-gray-600 text-[10px] sm:text-xs leading-snug">
                Native guides sharing their knowledge
              </p>
            </div>
            {/* Item 4 */}
            <div className="min-w-0 aspect-square sm:aspect-auto p-2 sm:p-4 flex flex-col items-center justify-center text-center snap-center transition-all duration-300 hover:-translate-y-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 sm:h-5 sm:w-5 text-white' viewBox='0 0 20 20' fill='currentColor'><path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V4z' clipRule='evenodd' /></svg>
              </div>
              <h3 className="text-xs sm:text-base font-semibold text-gray-900 mb-1 tracking-tight">Reliable Service</h3>
              <p className="text-gray-600 text-[10px] sm:text-xs leading-snug">
                On-time pickups and clear communication
              </p>
            </div>
            {/* Item 5 */}
            <div className="min-w-0 aspect-square sm:aspect-auto p-2 sm:p-4 flex flex-col items-center justify-center text-center snap-center transition-all duration-300 hover:-translate-y-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 sm:h-5 sm:w-5 text-white' viewBox='0 0 20 20' fill='currentColor'><path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' /></svg>
              </div>
              <h3 className="text-xs sm:text-base font-semibold text-gray-900 mb-1 tracking-tight">Unforgettable Moments</h3>
              <p className="text-gray-600 text-[10px] sm:text-xs leading-snug">
                Creating magical experiences
              </p>
            </div>
            {/* Item 6 */}
            <div className="min-w-0 aspect-square sm:aspect-auto p-2 sm:p-4 flex flex-col items-center justify-center text-center snap-center transition-all duration-300 hover:-translate-y-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 mb-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 sm:h-5 sm:w-5 text-white' viewBox='0 0 20 20' fill='currentColor'><path fillRule='evenodd' d='M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z' clipRule='evenodd' /><path fillRule='evenodd' d='M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z' clipRule='evenodd' /></svg>
              </div>
              <h3 className="text-xs sm:text-base font-semibold text-gray-900 mb-1 tracking-tight">Connected Experience</h3>
              <p className="text-gray-600 text-[10px] sm:text-xs leading-snug">
                Free Wi-Fi to share your adventure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 