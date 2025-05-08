import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "Easy Booking",
    description: "Book your trip with just a few clicks through our intuitive platform",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Best Price Guarantee",
    description: "We offer the best prices on the market with our price-match promise",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Premium Support",
    description: "24/7 customer support for all your needs wherever you are in the world",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  }
];

const TravelFeatures = () => {
  return (
    <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Background elements */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-orange-50/30 rounded-full blur-3xl"></div>

      <div className="relative">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-8 w-1 bg-amber-600 rounded-full shadow-sm"></div>
            <span className="text-amber-700 uppercase tracking-widest text-xs font-semibold">Why Choose Us</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            <span className="block text-gray-900">Our Best Features</span>
            <span className="relative bg-gradient-to-r from-amber-700 to-orange-500 bg-clip-text text-transparent">
              For Your Journey
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-500/50 to-orange-500/50 rounded-full"></span>
            </span>
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            We provide exceptional experiences with features designed to make your journey memorable.
            Explore the world with confidence and premium service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-xl border border-amber-100/50 transition-all duration-500 hover:-translate-y-1 group"
            >
              <div className="bg-amber-50 p-3 rounded-lg w-fit mb-4 group-hover:bg-amber-100 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-amber-700 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelFeatures; 