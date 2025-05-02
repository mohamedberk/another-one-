"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getActivityById, calculateTourPrice, Activity } from '@/utils/activities';
import { 
  CalendarDaysIcon, UserIcon, CheckCircleIcon, ClockIcon, MapPinIcon, 
  ChevronLeftIcon, StarIcon, ShieldCheckIcon, CreditCardIcon, UserGroupIcon 
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

// Define animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInStaggered = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const ActivityBookingPage = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [youngChildren, setYoungChildren] = useState(0);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Determine if the user came from the details page
  const fromDetails = searchParams.get('from') === 'details';
  
  useEffect(() => {
    if (params.id) {
      const activityData = getActivityById(params.id as string);
      if (activityData) {
        setActivity(activityData);
      } else {
        // Redirect if activity not found
        router.push('/activities');
      }
    }
  }, [params.id, router]);

  // Add a subtle loading animation while waiting for data
  if (!activity) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="space-y-8 w-full max-w-sm px-4">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-full animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded-full animate-pulse w-4/6"></div>
          </div>
          <div className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      router.push(`/activities/${activity.id}/booking/confirmation?ref=${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
    }, 1200);
  };

  const totalPrice = activity ? calculateTourPrice(activity, isPrivate, adults, children, youngChildren) : 0;
  const activityImage = typeof activity.image === 'string' ? activity.image : activity.image.src;

  const formatPrice = (price: number) => {
    return `€${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation bar - fixed position */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href={fromDetails ? `/activities/${activity.id}` : "/"}
              className="flex items-center gap-2 text-gray-800 hover:text-cyan-600 transition-colors"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              <span className="font-medium">{fromDetails ? 'Back to Details' : 'Back'}</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Activity tag & rating */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          {activity.tag && (
            <span className="inline-block bg-cyan-100 text-cyan-800 text-xs font-semibold px-3 py-1 rounded-full">
              {activity.tag}
            </span>
          )}
          
          <div className="flex items-center gap-1 bg-white rounded-lg px-3 py-1.5 shadow-sm">
            <StarIconSolid className="w-5 h-5 text-yellow-500" />
            <div>
              <span className="font-bold text-gray-900">{activity.rating}</span>
              <span className="text-gray-500 text-sm">({activity.reviewCount})</span>
            </div>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-serif">
          Book Your {activity.title}
        </h1>
        
        {/* Image and booking form side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
          {/* Left column with Image and Activity Details */}
          <div className="lg:col-span-3 space-y-6">
            {/* Main Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={activityImage}
            alt={activity.title}
            fill
            priority
            className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={90}
              />
            </div>
            
            {/* Activity key details */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
                <div className="p-4">
                  <div className="flex items-center gap-1 text-gray-500 mb-1">
                    <ClockIcon className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Duration</span>
                  </div>
                  <p className="font-semibold text-gray-900">{activity.duration}</p>
          </div>
          
                <div className="p-4">
                  <div className="flex items-center gap-1 text-gray-500 mb-1">
                    <MapPinIcon className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Location</span>
              </div>
                  <p className="font-semibold text-gray-900">{activity.location}</p>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-1 text-gray-500 mb-1">
                    <UserGroupIcon className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Group Size</span>
                  </div>
                  <p className="font-semibold text-gray-900">Max {activity.maxParticipants} people</p>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-1 text-gray-500 mb-1">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase">Availability</span>
                  </div>
                  <p className="font-semibold text-gray-900">Daily Tours</p>
              </div>
            </div>
          </div>
        </div>
        
          {/* Booking form - right column */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex-grow flex flex-col">
              {/* Booking form header */}
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">Complete Your Booking</h3>
                <p className="text-sm text-cyan-100">Fill in your details to secure your spot</p>
            </div>
            
              {/* Booking form */}
              <div className="p-6 flex-grow flex flex-col">
                <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Full Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                  <div className="relative">
                    <input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />
                      <CalendarDaysIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                    </div>
                </div>
                
                  <div className="grid grid-cols-3 gap-3">
                  <div>
                      <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">Adults</label>
                    <select
                      id="adults"
                      value={adults}
                      onChange={(e) => setAdults(parseInt(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                      <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">
                      Children
                      <span className="text-xs text-gray-500 ml-1">(6-12)</span>
                    </label>
                    <select
                      id="children"
                      value={children}
                      onChange={(e) => setChildren(parseInt(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                      <label htmlFor="youngChildren" className="block text-sm font-medium text-gray-700 mb-1">
                      Under 6
                    </label>
                    <select
                      id="youngChildren"
                      value={youngChildren}
                      onChange={(e) => setYoungChildren(parseInt(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                      {[...Array(5)].map((_, i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                        className="h-4 w-4 text-cyan-600 rounded focus:ring-cyan-500 border-gray-300"
                    />
                      <span className="ml-2 text-sm text-gray-700">Book as private tour (exclusive to your group)</span>
                  </label>
                  </div>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Price Details</h4>
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Base price ({adults} {adults > 1 ? 'adults' : 'adult'})</span>
                        <span>{formatPrice(activity.groupPrice * adults)}</span>
                  </div>
                  
                  {children > 0 && (
                        <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{children} × Child discount</span>
                      <span>-{formatPrice(activity.groupPrice * 0.3 * children)}</span>
                    </div>
                  )}
                  
                  {youngChildren > 0 && (
                        <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{youngChildren} × Under 6 (free)</span>
                      <span>€0</span>
                    </div>
                  )}
                  
                  {isPrivate && (
                        <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Private tour premium</span>
                      <span>{formatPrice(activity.groupPrice * 0.5)}</span>
                    </div>
                  )}
                </div>
                
                    <div className="flex justify-between items-center font-medium text-gray-900 pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span className="text-xl font-bold text-cyan-700">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                      "mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3.5 px-4 rounded-lg text-center transition-colors duration-300 shadow-md",
                  isSubmitting && "opacity-70 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                      <>Complete Booking</>
                )}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-2">
                    <ShieldCheckIcon className="h-4 w-4" />
                    <span>Secure payment • Free cancellation up to 24h before • Instant confirmation</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional info section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Important Booking Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-gray-200 hover:border-cyan-200 transition-colors">
              <div className="flex items-start gap-3">
                <div className="bg-cyan-100 rounded-full p-2 text-cyan-700">
                  <ShieldCheckIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Free Cancellation</h3>
                  <p className="text-sm text-gray-600">Cancel up to 24 hours before your tour for a full refund</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-gray-200 hover:border-cyan-200 transition-colors">
              <div className="flex items-start gap-3">
                <div className="bg-cyan-100 rounded-full p-2 text-cyan-700">
                  <CreditCardIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Secure Payment</h3>
                  <p className="text-sm text-gray-600">All payments are processed securely through our platform</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg border border-gray-200 hover:border-cyan-200 transition-colors">
              <div className="flex items-start gap-3">
                <div className="bg-cyan-100 rounded-full p-2 text-cyan-700">
                  <UserGroupIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Expert Local Guides</h3>
                  <p className="text-sm text-gray-600">All tours led by experienced professionals with local knowledge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityBookingPage;