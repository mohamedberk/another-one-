import React, { useEffect, useRef, useState } from 'react';
import SunIcon from './icons/SunIcon';
import CloverIcon from './icons/CloverIcon';
import AsteriskIcon from './icons/AsteriskIcon';
import ArrowIcon from './icons/ArrowIcon';
import Image from 'next/image';
import Link from 'next/link';

// Fix linter errors by updating these components to accept className props with proper types
interface IconProps {
  className?: string;
  [key: string]: any;
}

const EnhancedSunIcon = ({ className, ...props }: IconProps) => <SunIcon {...props} />;
const EnhancedCloverIcon = ({ className, ...props }: IconProps) => <CloverIcon {...props} />;
const EnhancedAsteriskIcon = ({ className, ...props }: IconProps) => <AsteriskIcon {...props} />;
const EnhancedArrowIcon = ({ className, ...props }: IconProps) => <ArrowIcon {...props} />;

// New component for play icon
const PlayIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clipRule="evenodd" />
  </svg>
);

// Sparkles icon component
const SparklesIcon = ({ className = "w-3.5 h-3.5 mr-1.5" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3v5m4-3-3 3m6-1h-5m2 4-3-3m5 6h-5m0 0 3-3m0 0V7m0 0-3-3m0 0H9m0 0v5m0 0-3-3m0 0H6m0 4h5m-5 0 3-3m0 0V7m0 0 3-3m0 0h5m0 0v5m0 0 3-3m0 0h3" />
  </svg>
);

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // Auto-play the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play was prevented:', error);
      });
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const elements = heroRef.current.querySelectorAll('.parallax-element');
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const moveX = (e.clientX - centerX) / 40;
      const moveY = (e.clientY - centerY) / 40;
      
      elements.forEach((el, index) => {
        const htmlEl = el as HTMLElement;
        const factor = parseInt(htmlEl.dataset.factor || '1');
        htmlEl.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  
  return (
    <section 
      ref={heroRef}
      className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-[#080B1A] to-[#1A1B25] text-white"
    >
      {/* Luxury Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-80 h-80 rounded-full opacity-10 bg-gradient-to-r from-purple-600 to-blue-500 blur-[100px] parallax-element" data-factor="2"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 rounded-full opacity-10 bg-gradient-to-r from-amber-400 to-rose-500 blur-[100px] parallax-element" data-factor="3"></div>
        
        <div className="absolute top-[15%] right-[15%] w-72 h-72 border border-white/5 rounded-full parallax-element" data-factor="1"></div>
        <div className="absolute top-[20%] right-[15%] w-64 h-64 border border-white/5 rounded-full parallax-element" data-factor="1.5"></div>
        <div className="absolute top-[25%] right-[15%] w-56 h-56 border border-white/5 rounded-full parallax-element" data-factor="2"></div>
        </div>
        
      <div className="max-w-[1400px] mx-auto px-8 relative z-10 flex lg:flex-row flex-col items-center">
        {/* Left Side Content */}
        <div className="lg:w-1/2 w-full space-y-12">
          <div className="space-y-8">
            <div 
              className="inline-block transition-all duration-500"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                transitionDelay: '200ms' 
              }}
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <div className="flex items-center text-sm font-light tracking-widest uppercase bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                  <SparklesIcon />
                  <span>PREMIUM EXCURSION</span>
                </div>
              </div>
            </div>
            
            <h1 
              className="text-7xl font-bold leading-tight tracking-tight transition-all duration-500"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                transitionDelay: '300ms' 
              }}
            >
              <span className="block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent mb-2">3 Valleys Atlas</span>
              <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">Adventure</span>
            </h1>
            
            <p 
              className="text-white/70 text-lg max-w-lg leading-relaxed transition-all duration-500"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                transitionDelay: '400ms' 
              }}
            >
              Experience the breathtaking beauty of the Atlas Mountains with our exclusive guided tour. 
              Journey through the scenic valleys of Ourika, Oukaimeden, and Asni with their pristine waterfalls, 
              authentic Berber villages, and majestic snow-capped peaks.
            </p>
            
            <div 
              className="flex gap-6 items-center transition-all duration-500"
              style={{ 
                opacity: isLoaded ? 1 : 0, 
                transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
                transitionDelay: '500ms' 
              }}
            >
              <Link href="/book-excursion" className="group">
                <button className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full font-medium text-black transition-all duration-300 shadow-[0_5px_15px_rgba(251,191,36,0.4)] hover:shadow-[0_8px_25px_rgba(251,191,36,0.6)]">
                  <span className="relative z-10">Book Excursion</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </button>
              </Link>
              
              <Link href="/excursion-details" className="group flex items-center gap-2 text-white transition-all duration-300 hover:text-amber-300">
                <span>View Details</span>
                <EnhancedArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          {/* Stats */}
          <div 
            className="pt-10 border-t border-white/10 transition-all duration-500"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transform: isLoaded ? 'translateY(0)' : 'translateY(10px)', 
              transitionDelay: '600ms' 
            }}
          >
            <div className="grid grid-cols-3 gap-8">
              <div className="space-y-2">
                <p className="text-4xl font-bold bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">8+</p>
                <p className="text-white/70 text-sm">Hours of Adventure</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">$85</p>
                <p className="text-white/70 text-sm">All-Inclusive</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">4.9</p>
                <p className="text-white/70 text-sm">★ (156 Reviews)</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side Hero Video/Image */}
        <div className="lg:w-1/2 w-full h-full relative mt-12 lg:mt-0">
          <div 
            className="relative aspect-square max-w-[600px] mx-auto transition-all duration-600"
            style={{ 
              opacity: isLoaded ? 1 : 0, 
              transform: isLoaded ? 'scale(1)' : 'scale(0.98)', 
              transitionDelay: '300ms' 
            }}
          >
            {/* Glowing circle backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-gradient-to-br from-amber-400/20 to-rose-500/20 blur-[50px] parallax-element" data-factor="1"></div>
            
            {/* Main video container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[85%] rounded-[1.8rem] overflow-hidden border-2 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10">
              <div className="w-full h-full bg-gradient-to-br from-[#1C2039] to-[#101219] overflow-hidden relative">
                {/* Video player */}
                <div className="absolute inset-0">
                  <video 
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/atlas_mountains.mp4"
                    poster="/destination.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    onError={(e) => {
                      const target = e.currentTarget as HTMLVideoElement;
                      target.style.display = 'none';
                      const fallbackContainer = document.getElementById('video-fallback');
                      if (fallbackContainer) fallbackContainer.style.display = 'block';
                    }}
                  />
                  <div id="video-fallback" style={{ display: 'none' }} className="absolute inset-0 flex items-center justify-center">
                    <Image 
                      src="/destination.jpg" 
                      alt="Atlas Mountains excursion" 
                      width={600} 
                      height={500}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=500&q=80";
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none"></div>
                </div>
                
                {/* Video overlay content */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-white text-xl font-semibold mb-3 drop-shadow-md">3 Valleys Day Trip</h3>
                  <div className="flex items-center justify-between">
                    <div className="bg-white/20 backdrop-blur-lg border border-white/40 px-4 py-2 rounded-xl">
                      <span className="text-white font-semibold text-base">USD $85.00</span>
                    </div>
                    <button 
                      className="w-10 h-10 backdrop-blur-xl bg-white/30 border border-white/50 rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 transform hover:scale-105"
                      onClick={toggleMute}
                    >
                      {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white drop-shadow-md">
                          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                          <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white drop-shadow-md">
                          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rotating ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] rounded-full border border-white/10 animate-[spin_30s_linear_infinite] z-20"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-[5%] right-[20%] bg-gradient-to-br from-amber-400 to-amber-500 rounded-full h-16 w-16 flex items-center justify-center shadow-[0_5px_15px_rgba(251,191,36,0.4)] z-30 parallax-element" data-factor="3">
              <EnhancedCloverIcon className="h-8 w-8 text-black" />
            </div>
            
            <div className="absolute bottom-[5%] left-[20%] bg-white/10 backdrop-blur-md rounded-full h-20 w-20 flex items-center justify-center border border-white/20 z-30 parallax-element" data-factor="2">
              <EnhancedAsteriskIcon className="h-10 w-10 text-amber-300" />
            </div>
          </div>
        </div>
      </div>
      
      {/* 8 Hour Journey Card - positioned at bottom left */}
      <div 
        className="hidden lg:block absolute bottom-16 left-16 z-50 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] parallax-element"
        data-factor="1"
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.7s ease',
          transitionDelay: '700ms'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-300/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-white">8 Hour Journey</p>
            <p className="text-xs text-white/70">Full day adventure</p>
          </div>
        </div>
      </div>
      
      {/* Customer Support Card - keeping it at the original position */}
      <div 
        className="hidden lg:block absolute top-16 right-16 z-50 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.2)] parallax-element"
        data-factor="1"
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'all 0.7s ease',
          transitionDelay: '900ms'
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-300/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-white">24/7 Customer Support</p>
            <p className="text-xs text-white/70">Always here to help</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 