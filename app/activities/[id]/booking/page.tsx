"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getActivityByIdAdapter, calculateTourPrice } from '@/utils/activities6Adapter';
import { Activity } from '@/utils/activities';
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
  const [adultsInput, setAdultsInput] = useState('2');
  const [childrenInput, setChildrenInput] = useState('0');
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
      const activityId = searchParams.get('id') || params.id as string;
      const activityData = getActivityByIdAdapter(activityId);
      if (activityData) {
        setActivity(activityData);
      } else {
        // Redirect if activity not found
        router.push('/activities');
      }
    }
  }, [params.id, router, searchParams]);

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

  const totalPrice = activity ? calculateTourPrice(activity, isPrivate, adults, children, 0) : 0;

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
                ? 'bg-amber-500 text-white shadow-md' 
                : isTodayDate
                  ? 'bg-amber-100 text-amber-700 font-medium hover:bg-amber-200'
                  : 'hover:bg-amber-50 text-gray-700'
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
            <div className="text-sm font-medium text-amber-600">
              Selected: {formatDateForDisplay(date)}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Add custom animations */}
      <style jsx global>{fadeInKeyframes}</style>
      
      {/* Top navigation bar - fixed position */}
      <div className="bg-white shadow-sm sticky top-0 z-30 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href={fromDetails ? `/activities/${activity.id}` : "/"}
              className="flex items-center gap-2 text-gray-800 hover:text-amber-600 transition-colors"
            >
              <ChevronLeftIcon className="h-5 w-5" />
              <span className="font-medium">{fromDetails ? 'Back to Details' : 'Back'}</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center text-xs text-gray-500">
                <ShieldCheckIcon className="h-3.5 w-3.5 mr-1 text-amber-600" />
                Secure booking
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Booking progress indication */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="rounded-full h-7 w-7 flex items-center justify-center bg-amber-600 text-white text-xs font-medium">1</div>
              <div className="ml-2 text-sm font-medium text-gray-900">Details</div>
            </div>
            <div className="mx-2 h-[2px] w-16 bg-amber-200"></div>
            <div className="flex items-center">
              <div className="rounded-full h-7 w-7 flex items-center justify-center bg-gray-200 text-gray-600 text-xs font-medium">2</div>
              <div className="ml-2 text-sm font-medium text-gray-500">Confirmation</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left column - booking form */}
          <div className="lg:col-span-7 h-full flex flex-col">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-grow">
              <div className="p-6 md:p-8 h-full flex flex-col">
                <h1 className="text-2xl md:text-2xl font-bold text-gray-900 mb-5">
                  Complete Your Reservation
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-5 flex-grow">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-gray-900 bg-white"
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
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-gray-900 bg-white"
                        placeholder="you@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                      <div className="relative">
                        <div 
                          className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-amber-500 focus-within:border-amber-500 transition-colors bg-white flex justify-between items-center cursor-pointer ${showCalendar ? 'border-amber-500 ring-2 ring-amber-500' : ''}`}
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
                      <div className="col-span-2">
                        <label htmlFor="adults" className="block text-sm font-medium text-gray-700 mb-1">
                          Adults
                        </label>
                        <input
                          id="adults"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={adultsInput}
                          onChange={(e) => {
                            setAdultsInput(e.target.value);
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) {
                              setAdults(val);
                            } else if (e.target.value === '') {
                              setAdults(1); // Default for calculation
                            }
                          }}
                          onBlur={() => {
                            if (adultsInput === '' || isNaN(parseInt(adultsInput))) {
                              setAdultsInput('1');
                              setAdults(1);
                            } else {
                              const val = parseInt(adultsInput);
                              const validVal = Math.min(30, Math.max(1, val));
                              setAdultsInput(validVal.toString());
                              setAdults(validVal);
                            }
                          }}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-gray-900 bg-white"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-1">
                          Children
                          <span className="text-xs text-gray-500 ml-1">(under 16)</span>
                        </label>
                        <input
                          id="children"
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={childrenInput}
                          onChange={(e) => {
                            setChildrenInput(e.target.value);
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) {
                              setChildren(val);
                            } else if (e.target.value === '') {
                              setChildren(0); // Default for calculation
                            }
                          }}
                          onBlur={() => {
                            if (childrenInput === '' || isNaN(parseInt(childrenInput))) {
                              setChildrenInput('0');
                              setChildren(0);
                            } else {
                              const val = parseInt(childrenInput);
                              const validVal = Math.min(30, Math.max(0, val));
                              setChildrenInput(validVal.toString());
                              setChildren(validVal);
                            }
                          }}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-gray-900 bg-white"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-4">
                        <div 
                          className="flex-1 p-4 rounded-lg border-2 border-amber-500 bg-amber-50/50 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start">
                            <div className="h-5 w-5 rounded-full border-2 flex-shrink-0 mt-0.5 border-amber-500 bg-amber-500">
                              <CheckIcon className="h-3 w-3 text-white m-0.5" />
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-gray-900">Standard Pricing</h4>
                              <p className="text-xs text-gray-700 mt-1">One hour activity in Palmeraie, Marrakech</p>
                              <p className="text-sm font-semibold text-gray-900 mt-2">{`${activity.groupPrice} MAD`} per person</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-amber-50/50 rounded-lg border border-amber-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
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
                  
                  <div className="mt-auto pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium py-4 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center",
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
                      <ShieldCheckIcon className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
                      <span>Secure booking • No booking fees • Free cancellation up to 24h before</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Right column - booking summary */}
          <div className="lg:col-span-5 h-full">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-48 w-full group">
                  <Image
                    src={activityImage}
                    alt={activity.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  {/* Enhanced overlay with better visibility on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/5 group-hover:from-black/50 group-hover:via-black/20 transition-all duration-500"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-1 mb-1">
                      <StarIconSolid className="h-4 w-4 text-amber-400" />
                      <span className="text-sm font-medium text-white">{activity.rating}</span>
                      <span className="text-sm text-white/80">({activity.reviewCount} reviews)</span>
                    </div>
                    <h2 className="text-xl font-bold text-white">{activity.title}</h2>
                  </div>
                </div>
                
                <div className="p-4 border-b border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <ClockIcon className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div className="ml-3">
                        <p className="text-xs text-gray-700">Duration</p>
                        <p className="text-sm font-medium text-gray-900">{activity.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPinIcon className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div className="ml-3">
                        <p className="text-xs text-gray-700">Location</p>
                        <p className="text-sm font-medium text-gray-900">{activity.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Price Details</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Adults ({adults})</span>
                      <span className="font-medium text-gray-900">{`${activity.groupPrice * adults} MAD`}</span>
                    </div>
                    
                    {children > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-700">Children ({children}) <span className="text-amber-600 text-xs font-medium">-40%</span></span>
                        <span className="font-medium text-gray-900">{`${Math.round(activity.groupPrice * 0.6 * children)} MAD`}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>Total</span>
                      <span>{`${Math.round(totalPrice)} MAD`}</span>
                    </div>
                    {children > 0 && (
                      <div className="text-right text-xs text-amber-600 mt-1">
                        Including 40% discount for children
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Free Cancellation</h4>
                    <p className="text-xs text-gray-500">Cancel up to 24 hours before your tour for a full refund</p>
                  </div>
                </div>
                <div className="flex items-start bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex-shrink-0">
                    <ShieldCheckIcon className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">Secure Booking</h4>
                    <p className="text-xs text-gray-500">We use industry-standard encryption to protect your personal information</p>
                  </div>
                </div>
                
                {/* Activity specific information */}
                <div className="bg-white p-3 pb-5 rounded-lg shadow-sm border border-gray-100 min-h-[220px]">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Activity Details</h4>
                  
                  {activity.id.includes("quad") && (
                    <div className="text-xs text-gray-700 space-y-1.5">
                      <p>Experience an exhilarating quad biking adventure through the stunning Palmeraie of Marrakech.</p>
                      <p>Your 1-hour adventure includes:</p>
                      <ul className="list-disc pl-4 space-y-0.5 mb-3">
                        <li>Professional safety briefing and equipment</li>
                        <li>Guided tour through palm groves and traditional Berber villages</li>
                        <li>Photo opportunities at scenic viewpoints</li>
                        <li>Refreshing mint tea break</li>
                      </ul>
                      <p className="text-xs text-amber-600 font-medium mt-1.5 mb-2">Suitable for all skill levels!</p>
                    </div>
                  )}
                  
                  {activity.id.includes("camel") && !activity.id.includes("quad") && !activity.id.includes("buggy") && (
                    <div className="text-xs text-gray-700 space-y-1.5">
                      <p>Embark on a traditional camel ride through the serene Palmeraie of Marrakech.</p>
                      <p>Your 1-hour experience includes:</p>
                      <ul className="list-disc pl-4 space-y-0.5 mb-3">
                        <li>Traditional Moroccan attire for photo opportunities</li>
                        <li>Guided trek through lush palm groves</li>
                        <li>Visit to authentic Berber villages</li>
                        <li>Complimentary mint tea in a traditional setting</li>
                      </ul>
                      <p className="text-xs text-amber-600 font-medium mt-1.5 mb-2">Family-friendly activity for all ages!</p>
                    </div>
                  )}
                  
                  {activity.id.includes("buggy") && !activity.id.includes("camel") && (
                    <div className="text-xs text-gray-700 space-y-1.5">
                      <p>Take control of a powerful buggy through the diverse landscapes of Palmeraie, Marrakech.</p>
                      <p>Your 1-hour experience includes:</p>
                      <ul className="list-disc pl-4 space-y-0.5 mb-3">
                        <li>Safety briefing and vehicle orientation</li>
                        <li>Off-road driving through palm groves and rocky trails</li>
                        <li>Stops at scenic viewpoints for photo opportunities</li>
                        <li>Traditional Moroccan tea break</li>
                      </ul>
                      <p className="text-xs text-amber-600 font-medium mt-1.5 mb-2">Three power options available!</p>
                    </div>
                  )}
                  
                  {activity.id.includes("balloon") && (
                    <div className="text-xs text-gray-700 space-y-1.5">
                      <p>Float peacefully above the magnificent landscapes of Marrakech in a hot air balloon.</p>
                      <p>Your experience includes:</p>
                      <ul className="list-disc pl-4 space-y-0.5 mb-3">
                        <li>Early morning hotel pickup</li>
                        <li>Light refreshments before flight</li>
                        <li>40-60 minute balloon flight at sunrise</li>
                        <li>Traditional Berber breakfast after landing</li>
                        <li>Flight certificate</li>
                      </ul>
                      <p className="text-xs text-amber-600 font-medium mt-1.5 mb-2">Breathtaking views guaranteed!</p>
                    </div>
                  )}
                  
                  {activity.id.includes("quad-camel") && (
                    <div className="text-xs text-gray-700 space-y-1.5">
                      <p>Combination of quad biking and camel riding in the beautiful Palmeraie of Marrakech.</p>
                      <p>Your combo experience includes:</p>
                      <ul className="list-disc pl-4 space-y-0.5 mb-3">
                        <li>1-hour quad biking adventure with safety equipment</li>
                        <li>30-minute camel ride through palm groves</li>
                        <li>Traditional Moroccan dress for photos</li>
                        <li>Refreshing mint tea break</li>
                      </ul>
                      <p className="text-xs text-amber-600 font-medium mt-1.5 mb-2">Perfect adventure and tradition mix!</p>
                    </div>
                  )}
                  
                  {activity.id.includes("buggy-camel") && (
                    <div className="text-xs text-gray-700 space-y-1.5">
                      <p>Experience buggy riding and camel trekking through Palmeraie, Marrakech.</p>
                      <p>Your combo experience includes:</p>
                      <ul className="list-disc pl-4 space-y-0.5 mb-3">
                        <li>1-hour buggy adventure with safety equipment</li>
                        <li>30-minute camel ride through palm groves</li>
                        <li>Photo opportunities in traditional Moroccan attire</li>
                        <li>Refreshing mint tea in an authentic setting</li>
                      </ul>
                      <p className="text-xs text-amber-600 font-medium mt-1.5 mb-2">Three buggy power options available!</p>
                    </div>
                  )}
                  
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <div className="flex items-center justify-center">
                      <span className="text-xs text-gray-500 flex items-center">
                        <ShieldCheckIcon className="h-3.5 w-3.5 mr-1 text-amber-500" />
                        24/7 customer support available
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">By completing this booking, you agree to our <span className="text-amber-600 hover:underline cursor-pointer">Terms & Conditions</span></p>
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