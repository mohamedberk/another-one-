import React, { useState, useEffect } from 'react';

// Logo component that accepts className prop
const Logo = ({ className }: { className?: string }) => (
  <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 0L36.6025 11.6667V29.1667L20 40L3.39746 29.1667V11.6667L20 0Z" fill="currentColor" />
    <path d="M20 8L29.2819 13.8333V24.5833L20 30.8333L10.7181 24.5833V13.8333L20 8Z" fill="#080B1A" />
  </svg>
);

// Premium search icon with amber accent
const SearchIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
);

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close the mobile menu if it's open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 backdrop-blur-xl bg-[#080B1A]/90' : 'py-5 bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between max-w-[1400px] mx-auto px-8">
        {/* Logo */}
        <div 
          className="flex items-center transition-all duration-500"
          style={{ 
            opacity: isLoaded ? 1 : 0, 
            transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)', 
            transitionDelay: '100ms' 
          }}
        >
          <Logo className="h-10 w-10 text-amber-400" />
          <span className="ml-2 font-bold text-xl bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">ATLAS LUXURY</span>
        </div>
        
        {/* Navigation */}
        <nav 
          className="hidden lg:flex items-center space-x-10"
          style={{ 
            opacity: isLoaded ? 1 : 0, 
            transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)', 
            transitionDelay: '200ms' 
          }}
        >
          {[
            { name: 'Home', id: 'hero' },
            { name: 'Excursions', id: 'excursions' },
            { name: 'Experiences', id: 'excursion-details' },
            { name: 'Gallery', id: 'gallery' },
            { name: 'Testimonials', id: 'testimonials' },
            { name: 'Contact', id: 'contact' }
          ].map((item, index) => (
            <button 
              key={item.name} 
              onClick={() => handleNavClick(item.id)}
              className="text-sm text-white/80 hover:text-white transition-all duration-300 relative group"
              style={{ transitionDelay: `${100 + (index * 50)}ms` }}
            >
              {item.name}
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>
        
        {/* Action Buttons */}
        <div 
          className="flex items-center space-x-5"
          style={{ 
            opacity: isLoaded ? 1 : 0, 
            transform: isLoaded ? 'translateY(0)' : 'translateY(-10px)', 
            transitionDelay: '300ms' 
          }}
        >
          <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <SearchIcon />
          </button>
          
          <button 
            onClick={() => handleNavClick('excursions')}
            className="relative overflow-hidden px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full font-medium text-black transition-all duration-300 shadow-[0_5px_15px_rgba(251,191,36,0.4)] hover:shadow-[0_8px_25px_rgba(251,191,36,0.6)] group"
          >
            <span className="relative z-10">Book Excursion</span>
            <span className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
          </button>
          
          {/* Mobile menu button - visible on small screens */}
          <button 
            className="lg:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#080B1A]/95 backdrop-blur-xl border-t border-white/10 py-6 px-8 animate-[fadeIn_0.3s_ease-out]">
          <nav className="flex flex-col space-y-4">
            {[
              { name: 'Home', id: 'hero' },
              { name: 'Excursions', id: 'excursions' },
              { name: 'Experiences', id: 'excursion-details' },
              { name: 'Gallery', id: 'gallery' },
              { name: 'Testimonials', id: 'testimonials' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleNavClick(item.id)}
                className="text-white/80 hover:text-white py-2 transition-all duration-300 relative group flex items-center justify-between"
              >
                <span>{item.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 