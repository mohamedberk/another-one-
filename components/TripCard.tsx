import React, { useState, useEffect } from 'react';
import { ImprovedActivityModal } from './ImprovedActivityModal';
import { EnhancedBookingModal } from './EnhancedBookingModal';
import Image from 'next/image';
import { Activity, ourikaActivity, threeValleysActivity } from '../utils/activities';
import { ImageKitGallery } from './ImageKitImage';
import { ShieldCheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

// Custom icon components with premium styling
const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={`w-5 h-5 ${filled ? 'text-red-500' : 'text-white/90'}`}
  >
    <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

// Define our gallery images for different activities
const tripGalleryImages = {
  "Ourika Valley": [
    "https://ik.imagekit.io/momh2323/ourika/ourika%202.jpg?updatedAt=1745677832060",
    "https://ik.imagekit.io/momh2323/ourika/ourika%204.jpg?updatedAt=1745677832138",
    "https://ik.imagekit.io/momh2323/ourika/ourika%205.jpg?updatedAt=1745677832227",
    "https://ik.imagekit.io/momh2323/ourika/ourika%201.jpg?updatedAt=1745677832233",
    "https://ik.imagekit.io/momh2323/ourika/ourika%203.jpg?updatedAt=1745677832247"
  ],
  "Three Valleys Atlas Adventure": [
    "https://ik.imagekit.io/momh2323/aggafay.jpg?updatedAt=1745514931795",
    "https://images.unsplash.com/photo-1519160558534-579f5106e43f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1515862514226-7146137a5f41?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ]
};

const CalendarIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className="w-4 h-4 text-neutral-700"
  >
    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
  </svg>
);

// Image optimization component using Next.js Image
const OptimizedImage = (props: any) => {
  if (props.fill) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={props.src}
          alt={props.alt || ""}
          fill
          sizes={props.sizes || "100vw"}
          className={props.className || "object-cover"}
          quality={props.quality || 90}
        />
      </div>
    );
  }
  
  return (
    <Image
      src={props.src}
      alt={props.alt || ""}
      width={props.width || 100}
      height={props.height || 100}
      className={props.className}
      quality={props.quality || 90}
    />
  );
};

export interface TripCardProps {
  activity: Activity;
  date?: string;
  isFavorite?: boolean;
}

export function TripCard({
  activity,
  date = 'Available daily',
  isFavorite = false
}: TripCardProps) {
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  
  // Preload images to prevent flickering when scrolling
  useEffect(() => {
    const activityImages = ImageKitGallery.activities[activity.title as keyof typeof ImageKitGallery.activities] || [];
    
    // Preload images
    const preloadImages = () => {
      // Preload main image
      const mainImage = new window.Image() as HTMLImageElement;
      mainImage.src = activity.image.toString();
      
      // Preload gallery images
      activityImages.forEach(img => {
        const imgElement = new window.Image() as HTMLImageElement;
        imgElement.src = img;
      });
    };
    
    preloadImages();
    setGalleryImages(activityImages);
  }, [activity.title, activity.image]);

  // Activity Modal controls with body scroll locking
  const openActivityModal = () => {
    setIsActivityModalOpen(true);
    // Add class to body to prevent scrolling
    document.body.classList.add('modal-open');
  };
  
  const closeActivityModal = () => {
    setIsActivityModalOpen(false);
    // Remove class from body to re-enable scrolling
    document.body.classList.remove('modal-open');
  };
  
  // Booking Modal controls
  const openBookingModal = () => setIsBookingModalOpen(true);
  const closeBookingModal = () => setIsBookingModalOpen(false);

  return (
    <>
      <div className="relative z-10 group h-full content-visibility-auto hardware-accelerated">
        {/* Premium decorative background elements */}
        <div className="absolute -z-10 inset-0 rounded-[2rem] bg-gradient-to-br from-neutral-50/40 to-white/80 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
        <div className="absolute -z-20 -inset-3 bg-gradient-to-r from-neutral-300/5 to-neutral-200/5 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-gradient-to-r from-amber-400/5 to-amber-300/5 blur-[120px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div className="backdrop-blur-lg bg-white/90 border border-white/50 rounded-2xl overflow-hidden transition-all duration-500 transform hover:-translate-y-1 hover:shadow-premium h-full flex flex-col will-change-transform">
          <div className="relative flex-1 flex flex-col">
            {/* Image section with premium overlay gradient */}
            <div className="relative h-52 overflow-hidden">
              <OptimizedImage
                src={activity.image}
                alt={activity.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pinterest-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              
              {/* Premium rating badge */}
              <div className="absolute top-4 left-4 flex items-center">
                <div className="flex items-center space-x-1 bg-white/15 backdrop-blur-xl rounded-full px-3 py-1 border border-white/20">
                  <StarIcon className="w-4 h-4 text-amber-400" />
                  <span className="text-white text-xs font-medium">{activity.rating.toFixed(1)}</span>
                </div>
              </div>
              
              {/* Premium pricing cards with improved glass effect */}
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <div className="bg-white/15 backdrop-blur-xl border border-white/30 px-3 py-1.5 rounded-xl">
                  <div className="flex items-center space-x-1">
                    <span className="text-white text-xs">Group:</span>
                    <span className="text-white font-semibold text-sm">€{activity.groupPrice}</span>
                  </div>
                </div>
                <div className="bg-white/15 backdrop-blur-xl border border-white/30 px-3 py-1.5 rounded-xl">
                  <div className="flex items-center space-x-1">
                    <span className="text-white text-xs">Private:</span>
                    <span className="text-white font-semibold text-sm">€{activity.privatePrice}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card body with premium content styling */}
            <div className="p-6 space-y-5 flex-1 flex flex-col">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium tracking-wide text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full">
                    {activity.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-neutral-800 group-hover:text-neutral-900 transition-colors duration-300 font-display">{activity.title}</h3>
                <p className="text-sm text-neutral-600 line-clamp-2 mt-2">{activity.description}</p>
                
                {/* Premium key info icons */}
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center mr-2">
                      <CalendarIcon />
                    </div>
                    <span className="text-xs text-neutral-600">{date}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-neutral-700">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs text-neutral-600">{activity.duration}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Premium buttons with consistent styling */}
            <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={openActivityModal}
                className="flex items-center justify-center py-3 px-5 rounded-xl bg-white text-neutral-800 border border-neutral-200 hover:border-neutral-300 text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
              >
                <span>View Details</span>
                <ChevronRightIcon className="w-4 h-4 ml-2" />
              </button>
              
              <button
                onClick={openBookingModal}
                className="flex items-center justify-center py-3 px-5 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-neutral-800 hover:to-neutral-700 text-white text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-neutral-900/10"
              >
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                <span>Book Now</span>
              </button>
            </div>
          </div>
          
          {/* Premium accent decorative element */}
          <div className="absolute bottom-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-amber-500 to-amber-400 rounded-r-full transform translate-x-0 group-hover:translate-x-1/4 transition-transform duration-700"></div>
        </div>
      </div>

      {/* Improved Activity Modal with fixed scrolling */}
      <ImprovedActivityModal 
        isOpen={isActivityModalOpen} 
        closeModal={closeActivityModal} 
        activity={{
          title: activity.title,
          type: activity.type,
          image: activity.image.toString(),
          price: `Group: €${activity.groupPrice} | Private: €${activity.privatePrice}`,
          date: date,
          duration: activity.duration,
          location: activity.location,
          description: activity.longDescription,
          highlights: activity.highlights,
          included: activity.included,
          rating: activity.rating,
          reviewCount: activity.reviewCount,
          maxParticipants: activity.maxParticipants
        }}
      />
      
      {/* Booking Modal */}
      <EnhancedBookingModal 
        isOpen={isBookingModalOpen} 
        closeModal={closeBookingModal}
        excursionTitle={activity.title}
        excursionType={activity.type}
        activity={activity}
      />
    </>
  );
} 