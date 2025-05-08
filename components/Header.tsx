import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { EnhancedBookingModal } from './EnhancedBookingModal';
import { Activity } from '../utils/activities86';

// Globe icon for the logo - white on black
const GlobeIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="28" 
    height="28" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#FFFFFF"
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// Hamburger menu icon
const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-6 h-6">
    <span className={`absolute block w-6 h-0.5 bg-neutral-800 transition-all duration-300 ${isOpen ? 'top-3 rotate-45' : 'top-1'}`}></span>
    <span className={`absolute block w-6 h-0.5 bg-neutral-800 transition-all duration-300 ${isOpen ? 'opacity-0' : 'top-3'}`}></span>
    <span className={`absolute block w-6 h-0.5 bg-neutral-800 transition-all duration-300 ${isOpen ? 'top-3 -rotate-45' : 'top-5'}`}></span>
  </div>
);

// Updated navigation items to ensure they match the actual sections in page.tsx
const navItems = [
  { label: "Home", href: "/", sectionId: "home" },
  { label: "Excursions", href: "/#excursions", sectionId: "excursions" },
  { label: "Gallery", href: "/#gallery", sectionId: "gallery" },
  { label: "Guest Experiences", href: "/#guest-experiences", sectionId: "guest-experiences" },
  { label: "Why Us", href: "/#contact", sectionId: "contact" }
];

export function Header() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  
  // Track scroll position for determining the active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Get all section elements
      const sections = navItems.map(item => {
        return {
          id: item.sectionId,
          element: document.getElementById(item.sectionId)
        };
      }).filter(section => section.element !== null);
      
      // If we're at the top of the page, set Home as active
      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }
      
      // Check if user is at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      
      // If at bottom, set "About Us" (contact section) as active
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }
      
      // Determine which section is currently in view
      // We'll consider a section "in view" if its top is above the viewport's middle
      // and its bottom is below the viewport's middle
      const viewportHeight = window.innerHeight;
      const viewportMiddle = window.scrollY + (viewportHeight / 2);
      
      // Get the header height to adjust calculations
      const headerHeight = headerRef.current?.offsetHeight || 100;
      
      // Find the section that's currently in view
      // Sort sections by their position from top to bottom
      const sortedSections = [...sections].sort((a, b) => {
        const aTop = a.element?.getBoundingClientRect().top || 0;
        const bTop = b.element?.getBoundingClientRect().top || 0;
        return aTop - bTop;
      });
      
      // Find the first section that's currently in view
      for (const section of sortedSections) {
        if (!section.element) continue;
        
        const rect = section.element.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        const sectionBottom = sectionTop + rect.height;
        
        // Check if section is in view with offset for header
        if (sectionTop <= viewportMiddle + headerHeight && sectionBottom >= viewportMiddle - headerHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initial call to set the active section on load
    setTimeout(handleScroll, 500);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const openBookingModal = () => {
    setSelectedActivity(null);
    setIsBookingModalOpen(true);
  };
  
  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedActivity(null);
  };

  // Handle smooth scrolling for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Special case for home - scroll to top
    if (href === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMenuOpen(false);
      setActiveSection("home");
      return;
    }
    
    // Only apply to hash links on the same page
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        // Scroll with offset to account for fixed header
        const headerOffset = headerRef.current?.offsetHeight || 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        setActiveSection(targetId); // Update active section immediately
        setIsMenuOpen(false);
      }
    }
  };

  // NavLink component for both desktop and mobile
  const NavLink = ({ item, isMobile = false }: { item: typeof navItems[0], isMobile?: boolean }) => {
    const isActive = item.sectionId === activeSection;
    
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={(e) => handleAnchorClick(e, item.href)}
        className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
          isMobile 
            ? "text-neutral-800 w-full flex items-center"
            : isActive 
              ? "text-orange-600"
              : "text-neutral-600 hover:text-orange-600"
        }`}
      >
        {item.label}
        {isActive && (
          <motion.span 
            layoutId={isMobile ? "mobile-active-indicator" : "active-indicator"}
            className={`absolute inset-0 bg-orange-50 rounded-xl -z-10 ${isMobile ? "" : "shadow-sm"}`}
            transition={{ type: "spring", duration: 0.6 }}
          />
        )}
      </Link>
    );
  };

  return (
    <>
      <header 
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "py-2 bg-white shadow-md border-b border-neutral-100" 
            : "py-4 bg-white"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" onClick={(e) => handleAnchorClick(e, "/")}>
            <div className="flex items-center group cursor-pointer">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-600 to-amber-500 rounded-xl shadow-lg shadow-orange-800/15 transition-all duration-300 transform group-hover:scale-105">
                <GlobeIcon />
              </div>
              <h1 className="font-display font-bold text-2xl ml-3.5">
                <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Atlas</span>
                <span className="text-neutral-900">Tours</span>
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:gap-0">
            {/* Book Now Button (always visible) */}
            <button 
              onClick={openBookingModal}
              className="hidden md:inline-flex px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-medium rounded-xl shadow-md shadow-orange-300/20 hover:shadow-lg hover:shadow-orange-300/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Book Now
            </button>
            
            <button 
              className="md:hidden flex items-center justify-center ml-2 p-2 rounded-lg hover:bg-neutral-100 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <MenuIcon isOpen={isMenuOpen} />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl p-4 border-t border-neutral-100 transition-all duration-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <NavLink key={item.href} item={item} isMobile={true} />
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div id="home" className="h-20"></div>

      {/* Booking Modal */}
      {isBookingModalOpen && selectedActivity && (
        <EnhancedBookingModal 
          isOpen={isBookingModalOpen}
          closeModal={closeBookingModal}
          excursionTitle={selectedActivity.title}
          excursionType={selectedActivity.type}
          activity={selectedActivity}
        />
      )}
    </>
  );
} 