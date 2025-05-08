"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { CheckCircleIcon, CalendarDaysIcon, UserGroupIcon, MapPinIcon, ClockIcon, CurrencyDollarIcon, 
  ChevronLeftIcon, ShieldCheckIcon, InformationCircleIcon, UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { getActivityById, Activity } from '@/utils/activities86';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

// Define animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInStaggered = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const confettiVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      delay: 0.5 
    }
  }
};

interface BookingInfo {
  name: string;
  email: string;
  date: string;
  adults: number;
  children: number;
  youngChildren: number;
  isPrivate: boolean;
  activityId?: string;
  activityTitle?: string;
}

const BookingConfirmationPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  
  // Get the reference number from URL parameters
  const referenceNumber = searchParams.get('ref') || 'N/A';
  
  useEffect(() => {
    if (params.id) {
      const activityData = getActivityById(params.id as string);
      if (activityData) {
        setActivity(activityData);
      } else {
        router.push('/activities');
      }
    }
    
    // Retrieve booking information from localStorage
    const savedBookingInfo = localStorage.getItem('bookingInfo');
    if (savedBookingInfo) {
      try {
        const parsedInfo = JSON.parse(savedBookingInfo) as BookingInfo;
        setBookingInfo(parsedInfo);
      } catch (error) {
        console.error('Error parsing booking info:', error);
      }
    }
  }, [params.id, router]);

  // Format date for display
  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };
  
  // Calculate total guests
  const getTotalGuests = (): number => {
    if (!bookingInfo) return 0;
    return (bookingInfo.adults || 0) + (bookingInfo.children || 0) + (bookingInfo.youngChildren || 0);
  };
  
  // Format price
  const formatPrice = (price: number): string => {
    return `€${price.toLocaleString()}`;
  };
  
  // Calculate total price
  const calculateTotal = (): string => {
    if (!activity || !bookingInfo) return '€0';
    
    const basePrice = activity.groupPrice;
    const privatePremium = bookingInfo.isPrivate ? 1.5 : 1;
    
    const adultsCost = basePrice * (bookingInfo.adults || 0) * privatePremium;
    const childrenCost = basePrice * 0.7 * (bookingInfo.children || 0) * privatePremium;
    // Young children are free
    
    return formatPrice(adultsCost + childrenCost);
  };

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

  const activityImage = typeof activity.image === 'string' ? activity.image : activity.image.src;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
      {/* Add typography styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', serif;
        }
        
        body, p, span, a, div, button {
          font-family: 'Inter', sans-serif;
        }
        
        .font-playfair {
          font-family: 'Playfair Display', serif;
        }
        
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-checkmark {
          animation: checkmark 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      {/* Premium hero section with refined aesthetics */}
      <div className="relative h-[40vh] md:h-[45vh] w-full overflow-hidden">
        {/* Background image with premium treatment */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={activityImage}
            alt={activity.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={95}
          />
          
          {/* Enhanced overlays for depth and luxury feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-blue-900/30 to-black/30 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 via-transparent to-transparent z-10"></div>
          
          {/* Confetti pattern overlay for celebration effect */}
          <div className="absolute inset-0 opacity-10 mix-blend-soft-light bg-repeat z-10" 
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.3\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
              backgroundSize: '180px 180px',
            }}
          ></div>
        </div>
        
        {/* Premium navigation */}
        <div className="absolute top-0 left-0 right-0 px-8 py-6 backdrop-blur-sm bg-gradient-to-b from-black/40 to-transparent z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/" 
              className="group flex items-center gap-2 px-5 py-2.5 bg-white/90 backdrop-blur-md rounded-full text-sm font-medium text-gray-800 hover:bg-white hover:shadow-xl transition-all duration-300 border border-white/50"
            >
              <span className="relative w-5 h-5 overflow-hidden rounded-full">
                <ChevronLeftIcon className="h-5 w-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:-translate-x-3/4" />
              </span>
              <span className="transition-all duration-300 group-hover:translate-x-[-4px] uppercase tracking-wider text-xs font-semibold">Home</span>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Premium confirmation content with modern design */}
      <div className="relative -mt-16 z-20">
        <div className="container mx-auto px-4 md:px-8 pb-24">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeInStaggered}
          >
            {/* Success Card with premium styling */}
            <motion.div 
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              variants={fadeIn}
            >
              {/* Success header with animation */}
              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-blue-100/80 py-10 px-6 md:px-12 border-b border-gray-100 text-center relative overflow-hidden"
                variants={fadeIn}
              >
                {/* Decorative circles */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-200/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-200/30 rounded-full blur-2xl"></div>
                
                {/* Confetti animation */}
                <motion.div 
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  variants={confettiVariants}
                >
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
                        opacity: Math.random() * 0.6 + 0.2,
                        transform: `scale(${Math.random() * 1 + 0.5})`,
                        animation: `float ${Math.random() * 4 + 3}s ease-in-out infinite ${Math.random() * 2}s`,
                      }}
                    ></div>
                  ))}
                </motion.div>
                
                <div className="flex justify-center mb-5 relative">
                  <motion.div 
                    className="relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20,
                      delay: 0.3 
                    }}
                  >
                    <div className="absolute inset-0 rounded-full scale-[1.15] animate-pulse-subtle bg-gradient-to-r from-green-200/50 to-blue-200/50 blur-xl"></div>
                    <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100">
                      <CheckCircleIcon className="w-12 h-12 text-green-500 animate-checkmark" />
                    </div>
                  </motion.div>
                </div>
                
                <motion.h1 
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 font-playfair relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Booking Confirmed!
                </motion.h1>
                
                <motion.p 
                  className="text-gray-600 mb-6 text-base max-w-md mx-auto relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Thank you for booking with us. We're thrilled to have you join this unforgettable experience!
                </motion.p>
                
                {/* Reference number with copy ability */}
                <motion.div 
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-xl border border-blue-100 text-blue-800 shadow-md relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <span className="font-medium text-sm">Confirmation Code:</span>
                  <span className="font-mono font-semibold tracking-wider text-sm">{referenceNumber}</span>
                  <button 
                    className="ml-2 p-1 text-blue-500 hover:text-blue-700 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(referenceNumber);
                      alert('Reference number copied to clipboard!');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </motion.div>
              </motion.div>
              
              {/* Booking details with premium styling */}
              <motion.div 
                className="p-8 md:p-12"
                variants={fadeIn}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-3 font-playfair">Booking Details</h2>
                
                {/* Client information section */}
                <div className="bg-blue-50/50 rounded-xl p-6 mb-8 border border-blue-100/50">
                  <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                    <UserIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Client Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-base font-medium text-gray-800">
                        {bookingInfo?.name || 'Not provided'}
                      </p>
                    </div>
                    
                    <div className="space-y-1.5">
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="text-base font-medium text-gray-800">
                        {bookingInfo?.email || 'Not provided'}
                      </p>
                    </div>
                    
                    <div className="space-y-1.5">
                      <p className="text-sm text-gray-500">Travel Date</p>
                      <p className="text-base font-medium text-gray-800">
                        {formatDate(bookingInfo?.date)}
                      </p>
                    </div>
                    
                    <div className="space-y-1.5">
                      <p className="text-sm text-gray-500">Tour Type</p>
                      <p className="text-base font-medium text-gray-800">
                        {bookingInfo?.isPrivate ? 'Private Tour' : 'Group Tour'}
                      </p>
                    </div>
                    
                    <div className="space-y-1.5">
                      <p className="text-sm text-gray-500">Number of Guests</p>
                      <div className="flex flex-col text-base font-medium text-gray-800">
                        <span>{getTotalGuests()} Total</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {bookingInfo?.adults ? (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                              {bookingInfo.adults} {bookingInfo.adults === 1 ? 'Adult' : 'Adults'}
                            </span>
                          ) : null}
                          
                          {bookingInfo?.children ? (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                              {bookingInfo.children} {bookingInfo.children === 1 ? 'Child' : 'Children'} (6-12)
                            </span>
                          ) : null}
                          
                          {bookingInfo?.youngChildren ? (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                              {bookingInfo.youngChildren} Under 6
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <p className="text-sm text-gray-500">Total Price</p>
                      <p className="text-xl font-bold text-blue-700">
                        {calculateTotal()}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Activity information - enhanced layout */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-10">
                  <div className="flex-1 space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 font-playfair">{activity.title}</h3>
                    
                    <div className="space-y-4 text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-50 rounded-full text-blue-600 shadow-sm">
                          <MapPinIcon className="w-5 h-5" />
                        </div>
                        <span className="text-gray-700">{activity.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-50 rounded-full text-blue-600 shadow-sm">
                          <ClockIcon className="w-5 h-5" />
                        </div>
                        <span className="text-gray-700">{activity.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* What's next section */}
                <div className="border-t border-gray-100 pt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">What's Next?</h3>
                  
                  <div className="bg-green-50 rounded-xl p-5 border border-green-100 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green-100 rounded-full text-green-600 mt-1">
                        <EnvelopeIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Check Your Email</h4>
                        <p className="text-sm text-gray-600">We've sent a confirmation email to {bookingInfo?.email || 'your email address'} with all the details of your booking.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Activity-specific preparation instructions */}
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 rounded-full text-blue-600 mt-1">
                        <InformationCircleIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Preparing for Your Adventure in Palmeraie, Marrakech</h4>
                        
                        {bookingInfo?.activityId?.includes('quad') && (
                          <p className="text-sm text-gray-600">
                            For your quad biking adventure, we recommend wearing comfortable clothes that you don't mind getting dusty, closed-toe shoes, and bringing sunglasses. We'll provide all safety equipment including helmets. Arrive 15 minutes early for your safety briefing and equipment fitting.
                          </p>
                        )}
                        
                        {bookingInfo?.activityId?.includes('camel') && (
                          <p className="text-sm text-gray-600">
                            For your camel ride experience, wear comfortable clothing and bring a hat, sunglasses, and sunscreen. Long pants are recommended for comfort during the ride. We'll provide traditional Moroccan attire for photos. Please arrive 15 minutes before your scheduled time.
                          </p>
                        )}
                        
                        {bookingInfo?.activityId?.includes('buggy') && (
                          <p className="text-sm text-gray-600">
                            For your buggy adventure, wear clothes that can get dusty, closed-toe shoes, and bring sunglasses. A light jacket may be useful in cooler weather. We'll provide driving instructions and all necessary safety equipment. Please arrive 15 minutes early for your briefing.
                          </p>
                        )}
                        
                        {bookingInfo?.activityId?.includes('balloon') && (
                          <p className="text-sm text-gray-600">
                            For your hot air balloon experience, dress in layers as mornings can be cool but warm up quickly. Wear comfortable closed-toe shoes. We'll pick you up very early (around 5am) to reach the launch site before sunrise. Bring your camera for spectacular photos!
                          </p>
                        )}
                        
                        {!bookingInfo?.activityId?.includes('quad') && 
                         !bookingInfo?.activityId?.includes('camel') && 
                         !bookingInfo?.activityId?.includes('buggy') && 
                         !bookingInfo?.activityId?.includes('balloon') && (
                          <p className="text-sm text-gray-600">
                            For your adventure, wear comfortable clothes suitable for the weather, closed-toe shoes, and bring sun protection. We recommend arriving 15 minutes early to complete check-in and prepare for your experience.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Meeting point information */}
                  <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 mb-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-amber-100 rounded-full text-amber-600 mt-1">
                        <MapPinIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">Meeting Point</h4>
                        <p className="text-sm text-gray-600">Your adventure will start at our meeting point in Palmeraie, Marrakech. Hotel pickup is included with your booking - our driver will collect you from your accommodation at the scheduled time on your selected date. Please be ready in your hotel lobby 10 minutes before the scheduled pickup time.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
                    <Link 
                      href="/"
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                      Back to Home
                    </Link>
                    
                    <button 
                      onClick={() => window.print()}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      Print Confirmation
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage; 