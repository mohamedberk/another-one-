import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Gallery images - you can replace these with your actual images
const galleryImages = [
  {
    id: 1,
    src: "https://ik.imagekit.io/momh2323/ourika/ourika%202.jpg?updatedAt=1745677832060",
    alt: "Ourika Valley waterfall",
    category: "landscapes",
    aspect: "portrait" // portrait, square, landscape
  },
  {
    id: 2,
    src: "https://ik.imagekit.io/momh2323/ourika/ourika%204.jpg?updatedAt=1745677832138",
    alt: "Berber village in Atlas Mountains",
    category: "culture",
    aspect: "landscape"
  },
  {
    id: 3,
    src: "https://ik.imagekit.io/momh2323/ourika/ourika%205.jpg?updatedAt=1745677832227",
    alt: "Mountain stream in Ourika",
    category: "nature",
    aspect: "landscape"
  },
  {
    id: 4,
    src: "https://ik.imagekit.io/momh2323/ourika/ourika%201.jpg?updatedAt=1745677832233",
    alt: "Terraced gardens in Atlas Mountains",
    category: "landscapes",
    aspect: "portrait"
  },
  {
    id: 5,
    src: "https://ik.imagekit.io/momh2323/ourika/ourika%203.jpg?updatedAt=1745677832247",
    alt: "Local crafts market",
    category: "culture",
    aspect: "landscape"
  },
  {
    id: 6,
    src: "https://ik.imagekit.io/momh2323/aggafay.jpg?updatedAt=1745514931795",
    alt: "Desert camp at sunset",
    category: "landscapes",
    aspect: "landscape"
  }
];

// Categories for filtering
const categories = [
  { id: "all", label: "All Experiences" },
  { id: "landscapes", label: "Scenic Views" },
  { id: "culture", label: "Cultural" },
  { id: "nature", label: "Nature" },
];

export function PremiumGallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(galleryImages);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  // Lightbox navigation
  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(visibleImages[newIndex]);
  };
  
  const goToNext = () => {
    const newIndex = (currentIndex + 1) % visibleImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(visibleImages[newIndex]);
  };
  
  // Filter images by category
  useEffect(() => {
    if (activeCategory === "all") {
      setVisibleImages(galleryImages);
    } else {
      setVisibleImages(galleryImages.filter(img => img.category === activeCategory));
    }
  }, [activeCategory]);
  
  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      switch (e.key) {
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "Escape":
          setIsModalOpen(false);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, currentIndex, visibleImages]);
  
  // Handle image click to open lightbox
  const openLightbox = (image: typeof galleryImages[0], index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setIsModalOpen(true);
    document.body.classList.add('modal-open');
  };
  
  // Close lightbox
  const closeLightbox = () => {
    setIsModalOpen(false);
    document.body.classList.remove('modal-open');
  };
  
  // Calculate aspect ratio classes for masonry layout
  const getAspectClass = (aspect: string) => {
    switch (aspect) {
      case "portrait":
        return "row-span-2 md:col-span-1";
      case "square":
        return "md:col-span-1 md:row-span-1";
      case "landscape":
        return "md:col-span-2 md:row-span-1";
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <div className="relative" ref={galleryRef}>
      {/* Decorative elements */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-neutral-800/5 to-neutral-900/5 blur-[120px] -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-500/5 to-amber-400/5 blur-[120px] -z-10"></div>
      
      {/* Section title */}
      <div className="flex items-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 flex items-center font-display">
          <span className="inline-block w-12 h-0.5 bg-gradient-to-r from-neutral-800 to-neutral-600 rounded-full mr-5"></span>
          Photo Gallery
        </h2>
      </div>
      
      {/* Category filter */}
      <div className="flex flex-nowrap overflow-x-auto hide-scrollbar space-x-3 pb-6 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-neutral-900 to-neutral-800 text-white shadow-md"
                : "bg-white/90 backdrop-blur-md text-neutral-700 border border-neutral-200 hover:border-neutral-300"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Masonry grid gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-auto gap-4 mb-10">
        {visibleImages.map((image, index) => (
          <motion.div
            key={image.id}
            className={`${getAspectClass(image.aspect)} relative group overflow-hidden rounded-2xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div 
              className="relative w-full h-full min-h-[200px] cursor-pointer"
              onClick={() => openLightbox(image, index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                quality={90}
              />
              
              {/* Hover overlay with blur effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] group-hover:backdrop-blur-0">
                <div className="absolute bottom-0 w-full p-4">
                  <p className="text-white text-sm font-medium">{image.alt}</p>
                </div>
              </div>
              
              {/* Subtle play button indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center border border-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* View more button */}
      <div className="flex justify-center">
        <button className="px-6 py-3 bg-white/90 backdrop-blur-md border border-neutral-200 hover:border-neutral-300 rounded-xl text-neutral-800 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md flex items-center">
          Explore More
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
      
      {/* Lightbox modal */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={closeLightbox}
          ></div>
          
          {/* Image container */}
          <div className="relative max-w-7xl w-full h-full px-4 py-10 flex flex-col items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-20 w-9 h-9 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            >
              <XMarkIcon className="w-5 h-5 text-white" />
            </button>
            
            {/* Navigation arrows */}
            <button 
              onClick={goToPrevious}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            >
              <ChevronLeftIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>
            
            <button 
              onClick={goToNext}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
            >
              <ChevronRightIcon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
            </button>
            
            {/* Main image */}
            <div className="relative w-full h-full max-h-[80vh] md:max-h-[80vh] flex items-center justify-center">
              <div className="relative w-full max-w-5xl h-full max-h-full">
                <Image 
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain object-center"
                  quality={95}
                  priority
                />
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="mx-auto max-w-5xl">
                  <p className="text-white text-lg md:text-xl font-medium">{selectedImage.alt}</p>
                </div>
              </div>
            </div>
            
            {/* Image counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-xl rounded-full px-3 py-1 text-xs font-medium text-white border border-white/20">
              {currentIndex + 1} / {visibleImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 