"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getActivityByIdAdapter, calculateTourPrice } from '@/utils/activities6Adapter';
import { Activity } from '@/utils/activities86';
import { 
  CalendarDaysIcon, UserIcon, CheckIcon, ClockIcon, MapPinIcon, 
  ChevronLeftIcon, StarIcon, ShieldCheckIcon, CreditCardIcon, UserGroupIcon,
  ArrowRightIcon, CheckCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { getActivityImage } from '@/utils/activityImages';
import { cabinetGrotesk, clashDisplay } from '../fonts';

// Define custom animations
const fadeInKeyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`;

// Define animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
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
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Create today's date for min date of calendar
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  
  // Determine if the user came from the details page
  const fromDetails = searchParams.get('from') === 'details';
  
  useEffect(() => {
    if (params.id) {
      const activityData = getActivityByIdAdapter(params.id as string);
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
      <div className={`flex justify-center items-center min-h-screen bg-gray-50 ${cabinetGrotesk.variable} ${clashDisplay.variable}`}>
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
    
    // Add explicit validation for date
    if (!date) {
      alert("Please select a travel date");
      return;
    }
    
    setIsSubmitting(true);
    
    // Store form data in localStorage for retrieval in confirmation page
    localStorage.setItem('bookingInfo', JSON.stringify({
      name,
      email,
      date,
      adults,
      children,
      youngChildren,
      isPrivate,
      activityId: activity?.id,
      activityTitle: activity?.title,
      totalPrice: totalPrice
    }));
    
    // Generate a random reference number
    const referenceNumber = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Fix: Use setTimeout to ensure localStorage is set before navigation
    setTimeout(() => {
      try {
        // Fix: Use the correct URL format with router.push
        const confirmationUrl = `/activities/${activity!.id}/booking/confirmation?ref=${referenceNumber}`;
        console.log("Navigating to:", confirmationUrl);
        router.push(confirmationUrl);
      } catch (error) {
        console.error("Navigation error:", error);
        // Fallback: try direct navigation as a last resort
        window.location.href = `/activities/${activity!.id}/booking/confirmation?ref=${referenceNumber}`;
      }
    }, 1000);
  };

  const totalPrice = activity ? calculateTourPrice(activity, isPrivate, adults, children, youngChildren) : 0;

  // Get appropriate image based on activity type
  const getImageForActivity = (activity: Activity) => {
    if (activity.id.includes('quad') && !activity.id.includes('camel')) {
      return getActivityImage('quad', 1); // Use the second image (index 1)
    } else if (activity.id.includes('camel') && !activity.id.includes('quad')) {
      return getActivityImage('camel', 1);
    } else if (activity.id.includes('buggy')) {
      return getActivityImage('buggy', 1);
    } else if (activity.id.includes('balloon')) {
      return getActivityImage('balloon', 1);
    } else if (activity.id.includes('quad-camel')) {
      return getActivityImage('quadCamel', 1);
    }
    
    // Fallback to activity's default image
    return typeof activity.image === 'string' ? activity.image : activity.image.src;
  };

  const activityImage = getImageForActivity(activity);

  const formatPrice = (price: number) => {
    return `€${price.toLocaleString()}`;
  };

  // Calendar helper functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  
  const isPastDate = (date: Date) => {
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    return compareDate < todayDate;
  };
  
  const formatDateForDisplay = (dateString: string): string => {
    if (!dateString) return "Select travel date";
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const monthName = currentMonth.toLocaleString('default', { month: 'long' });
    
    // Create array of day names
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    // Generate calendar grid
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9"></div>);
    }
    
    // Add cells for all days in the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dateString = currentDate.toISOString().split('T')[0];
      const isSelected = date === dateString;
      const isPast = isPastDate(currentDate);
      const isTodayDate = isToday(currentDate);
      
      days.push(
        <button
          key={day}
          type="button"
          disabled={isPast}
          onClick={() => {
            setDate(dateString);
            setShowCalendar(false);
          }}
          className={`h-9 w-9 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
            isPast 
              ? 'text-gray-300 cursor-not-allowed'
              : isSelected
                ? 'bg-cyan-500 text-white shadow-md' 
                : isTodayDate
                  ? 'bg-cyan-100 text-cyan-700 font-medium hover:bg-cyan-200'
                  : 'hover:bg-cyan-50 text-gray-700'
          }`}
        >
          {day}
        </button>
      );
    }
    
    return (
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 animate-fadeIn">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={goToPreviousMonth}
              disabled={month === today.getMonth() && year === today.getFullYear()}
              className={`p-1.5 rounded-full ${
                month === today.getMonth() && year === today.getFullYear()
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <h4 className="text-gray-800 font-medium">
              {monthName} {year}
            </h4>
            <button
              type="button"
              onClick={goToNextMonth}
              className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {days}
          </div>
        </div>
        
        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <button
            type="button"
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={() => setShowCalendar(false)}
          >
            Cancel
          </button>
          
          {date && (
            <div className="text-sm font-medium text-cyan-600">
              Selected: {formatDateForDisplay(date)}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${cabinetGrotesk.variable} ${clashDisplay.variable}`}>
      {/* Add custom animations */}
      <style jsx global>{fadeInKeyframes}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href={`/activities?id=${activity.id}`}
            className="glassmorphism-icon p-2 rounded-full text-gray-800 transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className={`text-2xl md:text-3xl font-black text-gray-900 ${cabinetGrotesk.className}`}>
            Book {activity.title}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Booking form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8">
                <h1 className={`text-2xl md:text-3xl font-black text-gray-900 mb-6 ${cabinetGrotesk.className}`}>
                  Complete Your Reservation
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-gray-900 bg-white"
                        placeholder="Enter your full name"
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-gray-900 bg-white"
                        placeholder="you@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                      <div className="relative">
                        <div 
                          className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-cyan-500 transition-colors bg-white flex justify-between items-center cursor-pointer ${showCalendar ? 'border-cyan-500 ring-2 ring-cyan-500' : ''}`}
                          onClick={() => setShowCalendar(!showCalendar)}
                        >
                          <span className={date ? "text-gray-900" : "text-gray-400"}>
                            {formatDateForDisplay(date)}
                          </span>
                          <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        
                        {showCalendar && (
                          <div className="absolute z-20 mt-1 w-full max-w-md">
                            {renderCalendar()}
                          </div>
                        )}
                        <input
                          id="date"
                          type="hidden"
                          value={date}
                          required
                          aria-invalid={!date}
                          aria-required="true"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">
                          Adults
                        </label>
                        <select
                          id="adults"
                          value={adults}
                          onChange={(e) => setAdults(parseInt(e.target.value))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-gray-900 bg-white"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-gray-900 bg-white"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-gray-900 bg-white"
                        >
                          {[...Array(5)].map((_, i) => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-4">
                        <div 
                          className="flex-1 p-4 rounded-lg border-2 border-cyan-500 bg-cyan-50/50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start">
                            <div className="h-5 w-5 rounded-full border-2 flex-shrink-0 mt-0.5 border-cyan-500 bg-cyan-500">
                              <CheckIcon className="h-3 w-3 text-white m-0.5" />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-gray-900">Standard Pricing</h4>
                              <p className="text-xs text-gray-500 mt-1">One hour activity in Palmeraie, Marrakech</p>
                              <p className="text-sm font-semibold text-gray-900 mt-2">{`${activity.groupPrice} MAD`} per person</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold">Children under 16:</span> 40% discount applied automatically
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-medium py-4 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center",
                        isSubmitting && "opacity-70 cursor-not-allowed"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Booking
                          <ArrowRightIcon className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                    
                    <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                      <ShieldCheckIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                      <span>Secure booking • No booking fees • Free cancellation up to 24h before</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Right column - Activity summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-8">
              <div className="relative h-48">
                <Image
                  src={activityImage}
                  alt={activity.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              <div className="p-6">
                <h2 className={`text-xl font-black text-gray-900 mb-2 ${cabinetGrotesk.className}`}>
                  {activity.title}
                </h2>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <StarIconSolid className="w-4 h-4 text-amber-500" />
                    <span className={`ml-1 text-sm font-medium ${clashDisplay.className}`}>
                      {activity.rating}
                    </span>
                  </div>
                  <span className={`text-sm text-gray-500 ${clashDisplay.className}`}>
                    ({activity.reviewCount} rating)
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-gray-400" />
                    <span className={`text-sm text-gray-600 ${clashDisplay.className}`}>
                      Duration: {activity.duration}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5 text-gray-400" />
                    <span className={`text-sm text-gray-600 ${clashDisplay.className}`}>
                      Location: {activity.location}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm text-gray-600 ${clashDisplay.className}`}>Total Price</span>
                    <span className={`text-xl font-black text-gray-900 ${cabinetGrotesk.className}`}>
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  
                  <p className={`text-xs text-gray-500 ${clashDisplay.className}`}>
                    Includes all taxes and fees
                  </p>
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