"use client"

import React, { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ExcursionCard from './components/ExcursionCard';
import ExcursionDetails from './components/ExcursionDetails';
import BookingModal from './components/BookingModal';
import { excursions } from './data/excursions';

// Premium styled components for testimonial stars
const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="h-5 w-5 text-amber-400"
  >
    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  </svg>
);

export default function TravelLandingPage() {
  const [selectedExcursion, setSelectedExcursion] = useState(excursions[0]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const handleBookClick = () => {
    setIsBookingModalOpen(true);
  };
  
  return (
    <div className="bg-[#080B1A] text-white min-h-screen">
      <section id="hero" className="pt-20">
        <HeroSection />
      </section>
      
      {/* Excursions Section */}
      <section id="excursions" className="relative bg-gradient-to-b from-[#080B1A] to-[#111827] px-4 md:px-8 py-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-40 left-20 w-80 h-80 rounded-full opacity-10 bg-gradient-to-r from-amber-400 to-rose-500 blur-[100px]"></div>
          <div className="absolute bottom-20 right-40 w-80 h-80 rounded-full opacity-10 bg-gradient-to-r from-purple-600 to-blue-500 blur-[100px]"></div>
          <div className="absolute top-1/4 right-1/4 w-60 h-60 border border-white/5 rounded-full animate-[spin_40s_linear_infinite]"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div 
            className="text-center mb-16 max-w-3xl mx-auto"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', 
              transition: 'all 0.7s ease',
            }}
          >
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <div className="text-sm font-light tracking-widest uppercase bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  PREMIUM EXCURSIONS
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                Extraordinary Atlas Mountain 
              </span>
              <span className="block mt-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
                Experiences
              </span>
            </h2>
            
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Choose one of our meticulously crafted excursions to experience the best of Morocco's Atlas Mountains.
              Each journey offers an unforgettable perspective on the natural beauty and cultural richness of this majestic region.
            </p>
          </div>
          
          {/* Excursion Cards */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 mb-24"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', 
              transition: 'all 0.7s ease',
              transitionDelay: '200ms'
            }}
          >
            {excursions.map((excursion, index) => (
              <div 
                key={excursion.id}
                style={{ 
                  opacity: isLoaded ? 1 : 0, 
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', 
                  transition: 'all 0.7s ease',
                  transitionDelay: `${200 + (index * 100)}ms`
                }}
              >
                <ExcursionCard
                title={excursion.title}
                description={excursion.description}
                image={excursion.image}
                price={excursion.price}
                highlights={excursion.highlights}
                duration={excursion.duration}
                onClick={() => {
                  setSelectedExcursion(excursion);
                  const detailsElement = document.getElementById('excursion-details');
                  window.scrollTo({
                    top: detailsElement ? detailsElement.offsetTop - 100 : 0,
                    behavior: 'smooth'
                  });
                }}
              />
              </div>
            ))}
          </div>
          
          {/* Selected Excursion Details */}
          <div 
            id="excursion-details"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', 
              transition: 'all 0.7s ease',
              transitionDelay: '500ms'
            }}
          >
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <div className="inline-block mb-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  <div className="text-sm font-light tracking-widest uppercase bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    DETAILED ITINERARY
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-5">
                <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                  {selectedExcursion.title}
                </span>
              </h2>
              
              <p className="text-white/70 text-lg">
                Discover what's included in your excursion, the detailed itinerary, 
                and what to expect during your unforgettable adventure.
              </p>
            </div>
            
            <ExcursionDetails 
              excursion={selectedExcursion} 
              onBook={handleBookClick} 
            />
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section id="gallery" className="relative bg-gradient-to-b from-[#111827] to-[#080B1A] px-4 md:px-8 py-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-40 right-20 w-80 h-80 rounded-full opacity-10 bg-gradient-to-r from-indigo-400 to-purple-500 blur-[100px]"></div>
          <div className="absolute bottom-40 left-40 w-80 h-80 rounded-full opacity-10 bg-gradient-to-r from-amber-400 to-rose-500 blur-[100px]"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div 
            className="text-center mb-16 max-w-3xl mx-auto"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', 
              transition: 'all 0.7s ease',
            }}
          >
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <div className="text-sm font-light tracking-widest uppercase bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  PHOTO GALLERY
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                Capturing the Beauty of 
              </span>
              <span className="block mt-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
                Atlas Mountains
              </span>
            </h2>
            
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Browse through our collection of breathtaking photos showcasing the majesty and wonder 
              of Morocco's Atlas Mountains and the experiences that await you.
            </p>
          </div>
          
          {/* Image Gallery */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', 
              transition: 'all 0.7s ease',
              transitionDelay: '200ms'
            }}
          >
            {[
              { url: '/destination.jpg', caption: 'Atlas Mountain Valleys' },
              { url: 'https://ik.imagekit.io/momh2323/ourikaa.jpg', caption: 'Ourika Waterfall' },
              { url: 'https://ik.imagekit.io/momh2323/Oukaimeden.jpg', caption: 'Oukaimeden Peak' },
              { url: 'https://ik.imagekit.io/momh2323/Asni.jpg', caption: 'Asni Valley' },
              { url: 'https://images.unsplash.com/photo-1550698089-31f9ca66cfc7', caption: 'Berber Village' },
              { url: 'https://images.unsplash.com/photo-1520962880247-cfaf541c8724', caption: 'Mountain Sunset' }
            ].map((image, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500"
                style={{ 
                  opacity: isLoaded ? 1 : 0, 
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', 
                  transition: 'all 0.7s ease',
                  transitionDelay: `${300 + (index * 100)}ms`,
                  height: index === 0 || index === 3 ? '400px' : '300px'
                }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${image.url})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 opacity-70 transition-opacity duration-500 group-hover:opacity-90"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                  <h3 className="text-white font-medium text-lg mb-1">{image.caption}</h3>
                  <div className="w-0 h-0.5 bg-amber-400 transition-all duration-700 group-hover:w-full"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 transition-all duration-300 rounded-full px-8 py-3 text-white">
              <span>View Full Gallery</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="relative bg-gradient-to-b from-[#111827] to-[#080B1A] px-4 md:px-8 py-24 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full opacity-10 bg-gradient-to-r from-purple-600 to-blue-500 blur-[100px]"></div>
          <div className="absolute top-20 right-40 w-80 h-80 rounded-full opacity-10 bg-gradient-to-r from-amber-400 to-rose-500 blur-[100px]"></div>
        </div>
          
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div 
            className="text-center mb-16 max-w-3xl mx-auto"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', 
              transition: 'all 0.7s ease',
            }}
          >
            <div className="inline-block mb-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <div className="text-sm font-light tracking-widest uppercase bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  GUEST EXPERIENCES
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                What Our Guests
              </span>
              <span className="block mt-1 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
                Say About Us
              </span>
            </h2>
            
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Don't just take our word for it. Hear from our valued guests about their unforgettable journeys 
              through the magnificent Atlas Mountains.
            </p>
          </div>
          
          {/* Testimonials Cards */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', 
              transition: 'all 0.7s ease',
              transitionDelay: '200ms'
            }}
          >
            {[
              {
                name: "John Doe",
                initials: "JD",
                color: "amber",
                text: "The Ourika Valley excursion was the highlight of our trip to Morocco. Our guide was knowledgeable and friendly, and the scenery was breathtaking. The private tea ceremony with a local family was an experience we'll never forget.",
              },
              {
                name: "Jane Smith",
                initials: "JS",
                color: "emerald",
                text: "Oukaimeden Peak was an amazing experience. The views were incredible, and our guide made sure we were comfortable throughout the journey. The gourmet picnic lunch at altitude was a wonderful surprise and perfectly prepared!",
              },
              {
                name: "Robert Johnson",
                initials: "RJ",
                color: "purple",
                text: "The Asni Valley tour was perfect for our family. The kids loved seeing the traditional Berber villages, and the market was fascinating. Everything was well-organized and luxurious from start to finish. Would book again!",
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(251,191,36,0.1)] hover:border-amber-500/20 group"
                style={{ 
                  opacity: isLoaded ? 1 : 0, 
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', 
                  transition: 'all 0.7s ease',
                  transitionDelay: `${300 + (index * 100)}ms`
                }}
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full bg-${testimonial.color}-400/20 flex items-center justify-center text-${testimonial.color}-400 font-bold text-lg backdrop-blur-sm`}>
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon key={star} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    "{testimonial.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer id="contact" className="relative bg-[#080B1A] text-white px-4 md:px-8 pt-20 pb-12 overflow-hidden border-t border-white/10">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full opacity-5 bg-gradient-to-r from-amber-400 to-amber-700 blur-[100px]"></div>
        </div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <h3 className="ml-3 text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">ATLAS LUXURY</h3>
              </div>
              <p className="text-white/60 mb-8 max-w-xs">
                Crafting unforgettable, premium adventures in Morocco's Atlas Mountains since 2010.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'twitter'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-amber-500/20 hover:border-amber-500/30 transition-all duration-300"
                  >
                    <span className="sr-only">{social}</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-white/80" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      {social === 'facebook' && (
                        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
                      )}
                      {social === 'instagram' && (
                        <path d="M12.001 2.002c-2.71 0-3.051.011-4.123.06-1.064.048-1.79.218-2.426.465a4.896 4.896 0 0 0-1.771 1.151 4.902 4.902 0 0 0-1.153 1.767c-.247.635-.417 1.36-.465 2.422C2.012 8.95 2 9.29 2 11.999c0 2.709.011 3.049.06 4.121.048 1.063.218 1.787.465 2.422a4.91 4.91 0 0 0 1.153 1.771 4.901 4.901 0 0 0 1.77 1.151c.637.247 1.363.417 2.427.465 1.072.048 1.412.06 4.121.06 2.711 0 3.051-.012 4.123-.06 1.064-.048 1.791-.218 2.428-.465a4.895 4.895 0 0 0 1.77-1.151 4.901 4.901 0 0 0 1.153-1.771c.246-.635.416-1.359.464-2.422.048-1.072.06-1.412.06-4.121 0-2.71-.012-3.05-.06-4.122-.048-1.063-.218-1.787-.464-2.422a4.918 4.918 0 0 0-1.153-1.767 4.901 4.901 0 0 0-1.77-1.151c-.637-.247-1.364-.417-2.428-.465-1.072-.049-1.412-.06-4.123-.06-4.123 0-2.71.012-3.05.06-4.122.045-.976.208-1.505.345-1.858.182-.466.398-.8.747-1.15.35-.349.684-.566 1.15-.748.353-.137.882-.3 1.857-.344 1.055-.048 1.37-.058 4.04-.058Z" />
                      )}
                      {social === 'twitter' && (
                        <path d="M21.543 7.104c.015.209.015.418.015.628 0 6.389-4.864 13.755-13.755 13.755-2.732 0-5.279-.795-7.413-2.175.39.045.765.06 1.17.06 2.27 0 4.365-.765 6.03-2.07a4.823 4.823 0 0 1-4.5-3.345c.3.045.6.075.915.075.435 0 .87-.06 1.275-.165a4.813 4.813 0 0 1-3.86-4.725v-.06c.645.36 1.395.585 2.19.615a4.816 4.816 0 0 1-2.145-4.005c0-.9.24-1.73.66-2.45a13.686 13.686 0 0 0 9.93 5.04 5.45 5.45 0 0 1-.12-1.095 4.811 4.811 0 0 1 4.815-4.814c1.395 0 2.655.585 3.54 1.53a9.49 9.49 0 0 0 3.06-1.17 4.803 4.803 0 0 1-2.115 2.655 9.655 9.655 0 0 0 2.775-.75 10.34 10.34 0 0 1-2.415 2.492Z" />
                      )}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'Excursions', 'Experiences', 'Gallery', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-white/60 hover:text-amber-400 transition-colors duration-300 relative group">
                      {item}
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
              <ul className="space-y-4">
                {[
                  { icon: 'map', text: '123 Jemaa el-Fnaa, Marrakech, Morocco' },
                  { icon: 'mail', text: 'info@atlasluxury.com' },
                  { icon: 'phone', text: '+212 524 123 456' }
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="mt-1 w-8 h-8 rounded-full bg-amber-500/20 backdrop-blur-sm flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        className="w-4 h-4 text-amber-400"
                      >
                        {item.icon === 'map' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        )}
                        {item.icon === 'mail' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        )}
                        {item.icon === 'phone' && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        )}
                  </svg>
                    </div>
                    <span className="text-white/60">{item.text}</span>
                </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Newsletter</h4>
              <p className="text-white/60 mb-6">
                Subscribe to our newsletter for the latest updates on our excursions and exclusive offers.
              </p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full px-5 text-black font-medium hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-white/40">
            <p>&copy; {new Date().getFullYear()} Atlas Luxury Excursions. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        excursion={selectedExcursion}
      />
    </div>
  );
} 