import React, { useState, Fragment, useEffect } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { 
  XMarkIcon, 
  CalendarDaysIcon, 
  UserIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ShieldCheckIcon, 
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CreditCardIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ArrowRightIcon,
  CheckIcon,
  LockClosedIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { handleBookingSubmission } from '../firebase/services/bookingService';
import { Activity, calculateTourPrice } from '../utils/activities';
import Image from 'next/image';

// Date format utility
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

interface EnhancedBookingModalProps {
  isOpen?: boolean;
  closeModal?: () => void;
  onClose?: () => void;
  excursionTitle?: string;
  excursionType?: string;
  activity?: Activity;
  onBookingSuccess?: (bookingDetails: any) => void;
}

// This will be our new premium booking modal
export function EnhancedBookingModal({ 
  isOpen, 
  closeModal, 
  onClose,
  excursionTitle = '3 Valleys Atlas Adventure',
  excursionType = 'EXCURSION',
  activity,
  onBookingSuccess
}: EnhancedBookingModalProps) {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0); // Children 3-5 years (half price)
  const [youngChildren, setYoungChildren] = useState(0); // Children under 3 years (free)
  const [pickupLocation, setPickupLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false); // Toggle between group and private tour
  const [currentView, setCurrentView] = useState<'details' | 'guests' | 'payment' | 'confirmation'>('details');
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error', isVisible: false });
  
  // State for booking confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [bookingReference, setBookingReference] = useState('');
  
  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);
  const [datePickerMonth, setDatePickerMonth] = useState(new Date());

  useEffect(() => {
    if (isOpen) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [isOpen]);
  
  // Create proper handlers for closing the modal
  const handleClose = () => {
    if (onClose) onClose();
    else if (closeModal) closeModal();
    
    // Reset form after closing
    setTimeout(() => {
      resetForm();
      setCurrentView('details');
    }, 300);
  };
  
  const dialogCloseHandler = (value: boolean) => {
    if (!value) handleClose();
  };
  
  // Calculate total price based on selected activity or fallback to default pricing
  const getBasePrice = () => {
    if (activity) {
      return isPrivate ? activity.privatePrice : activity.groupPrice;
    }
    // Default fallback prices if no activity provided
    return isPrivate ? 150 : 100;
  };
  
  // Calculate total price
  const adultPrice = getBasePrice();
  const childPrice = adultPrice / 2; // Children 3-5 years pay half price
  const youngChildPrice = 0; // Children under 3 years are free
  
  const totalPrice = activity 
    ? calculateTourPrice(activity, isPrivate, adults, children, youngChildren)
    : (adults * adultPrice) + (children * childPrice) + (youngChildren * youngChildPrice);
  
  // Reset the form
  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAdults(2);
    setChildren(0);
    setYoungChildren(0);
    setPickupLocation('');
    setSelectedDate(null);
    setIsPrivate(false);
    setCurrentView('details');
    setBookingDetails(null);
  };
  
  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
    
    // Auto-hide toast after 4 seconds
    setTimeout(() => {
      hideToast();
    }, 4000);
  };
  
  // Hide toast notification
  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };
  
  // Generate a random booking reference
  const generateBookingReference = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = 'ATL-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  // Navigation between booking steps
  const goToNextStep = () => {
    if (currentView === 'details') {
      if (!name || !email || !phone || !pickupLocation) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      setCurrentView('guests');
    } else if (currentView === 'guests') {
      if (!selectedDate) {
        showToast('Please select a travel date', 'error');
        return;
      }
      handleSubmit();
    }
  };
  
  const goToPreviousStep = () => {
    if (currentView === 'guests') {
      setCurrentView('details');
    }
  };
  
  // Date picker navigation
  const goToPreviousMonth = () => {
    const newDate = new Date(datePickerMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setDatePickerMonth(newDate);
  };
  
  const goToNextMonth = () => {
    const newDate = new Date(datePickerMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setDatePickerMonth(newDate);
  };
  
  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!selectedDate) {
      showToast('Please select a travel date', 'error');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Generate a booking reference
      const reference = generateBookingReference();
      setBookingReference(reference);
      
      // Prepare booking data
      const bookingData = {
        name,
        email,
        phone,
        adults,
        children,
        youngChildren,
        pickupLocation,
        date: selectedDate,
        totalPrice,
        excursionTitle: activity?.title || excursionTitle,
        excursionType: activity?.type || excursionType,
        isPrivate,
        bookingReference: reference,
        adultPrice,
        childPrice,
        youngChildPrice: 0
      };
      
      // Send data to Firestore
      await handleBookingSubmission(bookingData);
      
      // Send confirmation emails
      try {
        const emailResponse = await fetch('/api/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        });
        
        if (!emailResponse.ok) {
          console.error('Failed to send email confirmation');
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Continue with booking process even if email fails
      }
      
      // Show success message
      showToast('Booking successfully created!', 'success');
      
      // Store booking details for confirmation page
      setBookingDetails(bookingData);
      
      // If onBookingSuccess callback is provided, call it with booking details
      if (onBookingSuccess) {
        onBookingSuccess(bookingData);
      } else {
        // Show confirmation page only if no callback provided
        setCurrentView('confirmation');
      }
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      showToast('Failed to create booking. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const date = new Date(datePickerMonth);
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const today = new Date();
    const currentDate = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    // Create array for days
    const days = [];
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-7 w-7"></div>);
    }
    
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isToday = day === currentDate && month === currentMonth && year === currentYear;
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;
      
      // Create a new date for comparison without modifying the reference date
      const todayForComparison = new Date();
      todayForComparison.setHours(0, 0, 0, 0);
      const isPast = date < todayForComparison;
      
      days.push(
        <button
          key={day}
          type="button"
          disabled={isPast}
          onClick={() => {
            setSelectedDate(new Date(year, month, day));
            setShowDatePicker(false);
          }}
          className={`h-7 w-7 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
            isSelected 
              ? 'bg-amber-500 text-white' 
              : isToday 
                ? 'bg-neutral-100 font-medium text-neutral-800' 
                : isPast 
                  ? 'text-neutral-300 cursor-not-allowed' 
                  : 'hover:bg-neutral-100 text-neutral-700'
          }`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };
  
  // Handle counter changes
  const incrementAdults = () => setAdults(prev => prev + 1);
  const decrementAdults = () => setAdults(prev => (prev > 1 ? prev - 1 : 1));
  
  const incrementChildren = () => setChildren(prev => prev + 1);
  const decrementChildren = () => setChildren(prev => (prev > 0 ? prev - 1 : 0));
  
  const incrementYoungChildren = () => setYoungChildren(prev => prev + 1);
  const decrementYoungChildren = () => setYoungChildren(prev => (prev > 0 ? prev - 1 : 0));
  
  // Format month and year for calendar header
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  if (!isOpen) return null;
  
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={dialogCloseHandler}>
          {/* Enhanced backdrop with glass-morphism */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xl" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-400"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel 
                className="relative w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50 transition-all transform"
              >
                {/* Decorative background elements */}
                <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-r from-amber-300/20 to-amber-200/10 blur-3xl -z-10"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-l from-orange-300/20 to-orange-200/10 blur-3xl -z-10"></div>
                
                {/* Close button - fixed position */}
                <button 
                  onClick={handleClose}
                  className="absolute right-5 top-5 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg border border-white/50 transition-all duration-300 focus:outline-none"
                  aria-label="Close dialog"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
                
                {/* Progress Bar for booking steps */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 ease-out"
                    style={{ 
                      width: 
                        currentView === 'details' ? '33%' : 
                        currentView === 'guests' ? '66%' : 
                        currentView === 'confirmation' ? '100%' : 
                        '100%'
                    }}
                  ></div>
                </div>
                
                {/* Main content container */}
                <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                  
                  {/* Left sidebar with activity info and steps - only visible on md+ screens */}
                  <div className="hidden md:block md:w-72 lg:w-80 bg-gradient-to-b from-gray-50/80 to-white/50 border-r border-white/50">
                    <div className="p-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {activity?.title || excursionTitle}
                      </h3>
                      <p className="text-sm text-gray-500 mb-6">
                        {activity?.type || excursionType}
                      </p>
                      
                      {/* Activity image with overlay */}
                      <div className="relative w-full h-40 mb-8 rounded-xl overflow-hidden shadow-lg">
                        {activity?.image ? (
                          <Image
                            src={activity.image}
                            alt={activity.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-amber-500 to-orange-500"></div>
                        )}
                        <div className="absolute inset-0 bg-black/20"></div>
                        
                        {/* Price badge */}
                        <div className="absolute bottom-3 right-3 py-1.5 px-3 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg">
                          <p className="text-sm font-semibold text-gray-900">
                            From €{activity?.groupPrice || 100}
                          </p>
                        </div>
                      </div>
                      
                      {/* Booking steps */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium text-gray-700">Booking Steps</h4>
                        
                        <div className="space-y-3">
                          {/* Step 1 */}
                          <div 
                            className={`flex items-center p-3 rounded-lg transition-all ${
                              currentView === 'details' 
                                ? 'bg-gradient-to-r from-amber-100/50 to-orange-100/30 border border-amber-200/50' 
                                : 'bg-transparent'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              currentView === 'details' || currentView === 'guests' || currentView === 'confirmation'
                                ? 'bg-amber-500 text-white' 
                                : 'bg-gray-200 text-gray-500'
                            }`}>
                              <span className="text-sm font-medium">1</span>
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${
                                currentView === 'details' ? 'text-amber-800' : 'text-gray-700'
                              }`}>
                                Your Details
                              </p>
                              <p className="text-xs text-gray-500">Personal information</p>
                            </div>
                          </div>
                          
                          {/* Step 2 */}
                          <div 
                            className={`flex items-center p-3 rounded-lg transition-all ${
                              currentView === 'guests' 
                                ? 'bg-gradient-to-r from-amber-100/50 to-orange-100/30 border border-amber-200/50' 
                                : 'bg-transparent'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              currentView === 'guests' || currentView === 'confirmation'
                                ? 'bg-amber-500 text-white' 
                                : 'bg-gray-200 text-gray-500'
                            }`}>
                              <span className="text-sm font-medium">2</span>
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${
                                currentView === 'guests' ? 'text-amber-800' : 'text-gray-700'
                              }`}>
                                Booking Details
                              </p>
                              <p className="text-xs text-gray-500">Guests & dates</p>
                            </div>
                          </div>
                          
                          {/* Step 3 */}
                          <div 
                            className={`flex items-center p-3 rounded-lg transition-all ${
                              currentView === 'confirmation'
                                ? 'bg-gradient-to-r from-amber-100/50 to-orange-100/30 border border-amber-200/50' 
                                : 'bg-transparent'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              currentView === 'confirmation'
                                ? 'bg-amber-500 text-white' 
                                : 'bg-gray-200 text-gray-500'
                            }`}>
                              <span className="text-sm font-medium">3</span>
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${
                                currentView === 'confirmation' ? 'text-amber-800' : 'text-gray-700'
                              }`}>
                                Confirmation
                              </p>
                              <p className="text-xs text-gray-500">Booking complete</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right content area with the booking form/confirmation */}
                  <div className="flex-1 max-h-[90vh] overflow-y-auto custom-scrollbar">
                    {/* Step 1: Customer Details */}
                    {currentView === 'details' && (
                      <div className="p-8">
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Details</h2>
                          <p className="text-gray-500">Please provide your contact information</p>
                        </div>
                        
                        <form className="space-y-6">
                          {/* Full Name field with premium styling */}
                          <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Full Name
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <UserIcon className="w-5 h-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Your full name"
                                className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                              />
                            </div>
                          </div>
                          
                          {/* Email field with premium styling */}
                          <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email Address
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                              </div>
                              <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                              />
                            </div>
                          </div>
                          
                          {/* Phone field with premium styling */}
                          <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                              Phone Number
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <PhoneIcon className="w-5 h-5 text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                placeholder="+1 (555) 123-4567"
                                className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                              />
                            </div>
                          </div>
                          
                          {/* Pickup location with premium styling */}
                          <div className="space-y-2">
                            <label htmlFor="pickup" className="block text-sm font-medium text-gray-700">
                              Pick-up Location
                            </label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MapPinIcon className="w-5 h-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                id="pickup"
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                                required
                                placeholder="Hotel name or address"
                                className="block w-full pl-12 pr-4 py-3.5 bg-white/70 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 shadow-sm backdrop-blur-sm"
                              />
                            </div>
                          </div>
                        </form>
                        
                        {/* Action buttons */}
                        <div className="mt-8 flex gap-4 justify-between items-center">
                          {currentView === 'details' && (
                            <button
                              onClick={goToNextStep}
                              className="flex-1 px-5 py-5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 relative overflow-hidden group text-lg"
                              style={{
                                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                              }}
                            >
                              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-100 group-hover:opacity-90 transition-opacity"></span>
                              <span className="absolute -inset-px bg-gradient-to-r from-white/20 to-transparent opacity-50 rounded-xl"></span>
                              <span className="absolute inset-0 flex items-center justify-center text-white font-medium z-10">
                                <span className="flex items-center">
                                  Continue
                                  <ChevronRightIcon className="w-5 h-5 ml-2" />
                                </span>
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Step 2: Guests and Date Selection */}
                    {currentView === 'guests' && (
                      <div className="p-8">
                        <div className="mb-8">
                          <button
                            type="button"
                            onClick={goToPreviousStep}
                            className="flex items-center text-sm font-medium text-gray-600 hover:text-amber-600 mb-6 transition-colors"
                          >
                            <ChevronLeftIcon className="w-5 h-5 mr-1" />
                            <span>Back to personal details</span>
                          </button>
                          
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Details</h2>
                          <p className="text-gray-500">Select your preferred date and number of guests</p>
                        </div>
                        
                        <div className="space-y-8">
                          {/* Tour Type Selector - Group vs Private */}
                          <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Tour Type
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                              {/* Group Tour Option */}
                              <div
                                onClick={() => setIsPrivate(false)}
                                className={`
                                  p-4 border rounded-xl cursor-pointer transition-all duration-300
                                  ${!isPrivate 
                                    ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md' 
                                    : 'border-gray-200 bg-white hover:border-gray-300'}
                                `}
                              >
                                <div className="flex items-center mb-2">
                                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                    !isPrivate ? 'border-amber-500' : 'border-gray-300'
                                  }`}>
                                    {!isPrivate && (
                                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    )}
                                  </div>
                                  <span className={`font-medium ${!isPrivate ? 'text-amber-800' : 'text-gray-700'}`}>
                                    Group Tour
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 ml-8">
                                  Join other travelers on this experience
                                </p>
                                <div className={`mt-3 text-sm font-semibold ${!isPrivate ? 'text-amber-700' : 'text-gray-600'}`}>
                                  €{activity?.groupPrice || 100} per person
                                </div>
                              </div>
                              
                              {/* Private Tour Option */}
                              <div
                                onClick={() => setIsPrivate(true)}
                                className={`
                                  p-4 border rounded-xl cursor-pointer transition-all duration-300
                                  ${isPrivate 
                                    ? 'border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md' 
                                    : 'border-gray-200 bg-white hover:border-gray-300'}
                                `}
                              >
                                <div className="flex items-center mb-2">
                                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                    isPrivate ? 'border-amber-500' : 'border-gray-300'
                                  }`}>
                                    {isPrivate && (
                                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    )}
                                  </div>
                                  <span className={`font-medium ${isPrivate ? 'text-amber-800' : 'text-gray-700'}`}>
                                    Private Tour
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 ml-8">
                                  Exclusive experience for your group only
                                </p>
                                <div className={`mt-3 text-sm font-semibold ${isPrivate ? 'text-amber-700' : 'text-gray-600'}`}>
                                  €{activity?.privatePrice || 150} per person
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Enhanced Date Picker */}
                          <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Select Date
                            </label>
                            
                            <div className="relative">
                              <div 
                                onClick={() => setShowDatePicker(!showDatePicker)}
                                className="p-4 border border-gray-200 rounded-xl bg-white/70 flex items-center justify-between cursor-pointer hover:border-gray-300 transition-all shadow-sm"
                              >
                                <div className="flex items-center">
                                  <CalendarDaysIcon className="w-5 h-5 text-gray-400 mr-3" />
                                  <span className={selectedDate ? 'text-gray-900' : 'text-gray-400'}>
                                    {selectedDate ? formatDate(selectedDate) : 'Select your preferred date'}
                                  </span>
                                </div>
                                <ChevronRightIcon className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${showDatePicker ? 'rotate-90' : 'rotate-0'}`} />
                              </div>
                              
                              {/* Premium Calendar Dropdown */}
                              {showDatePicker && (
                                <div className="absolute z-20 mt-2 p-5 bg-white rounded-xl shadow-xl border border-gray-100 w-full max-w-md">
                                  {/* Month navigation */}
                                  <div className="flex items-center justify-between mb-4">
                                    <button 
                                      type="button"
                                      onClick={goToPreviousMonth}
                                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                      <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                                    </button>
                                    
                                    <h3 className="text-sm font-semibold text-gray-800">
                                      {formatMonthYear(datePickerMonth)}
                                    </h3>
                                    
                                    <button 
                                      type="button"
                                      onClick={goToNextMonth}
                                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                    >
                                      <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                                    </button>
                                  </div>
                                  
                                  {/* Days of week */}
                                  <div className="grid grid-cols-7 gap-1 mb-2">
                                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                      <div key={day} className="h-7 w-7 flex items-center justify-center text-xs text-gray-500 font-medium">
                                        {day}
                                      </div>
                                    ))}
                                  </div>
                                  
                                  {/* Calendar days */}
                                  <div className="grid grid-cols-7 gap-1">
                                    {generateCalendarDays()}
                                  </div>
                                  
                                  {/* Legend */}
                                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                    <div className="flex items-center">
                                      <div className="w-3 h-3 rounded-full border-2 border-amber-400 mr-2"></div>
                                      <span>Today</span>
                                    </div>
                                    <div className="flex items-center">
                                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mr-2"></div>
                                      <span>Selected</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Number of Guests */}
                          <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">
                              Number of Guests
                            </label>
                            
                            {/* Adults counter */}
                            <div className="p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between mb-3">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">Adults</h4>
                                <p className="text-xs text-gray-500">Age 5+</p>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <button
                                  type="button"
                                  onClick={decrementAdults}
                                  disabled={adults <= 1}
                                  className={`
                                    w-9 h-9 flex items-center justify-center rounded-full border text-lg
                                    ${adults <= 1 
                                      ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                                      : 'border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors'}
                                  `}
                                >
                                  -
                                </button>
                                
                                <span className="w-6 text-center font-medium text-gray-900">{adults}</span>
                                
                                <button
                                  type="button"
                                  onClick={incrementAdults}
                                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-lg"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            {/* Children counter */}
                            <div className="p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between mb-3">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">Children</h4>
                                <p className="text-xs text-gray-500">Ages 3-5 (half price)</p>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <button
                                  type="button"
                                  onClick={decrementChildren}
                                  disabled={children <= 0}
                                  className={`
                                    w-9 h-9 flex items-center justify-center rounded-full border text-lg
                                    ${children <= 0 
                                      ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                                      : 'border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors'}
                                  `}
                                >
                                  -
                                </button>
                                
                                <span className="w-6 text-center font-medium text-gray-900">{children}</span>
                                
                                <button
                                  type="button"
                                  onClick={incrementChildren}
                                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-lg"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            {/* Infants counter */}
                            <div className="p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900">Infants</h4>
                                <p className="text-xs text-gray-500">Under 3 (free)</p>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <button
                                  type="button"
                                  onClick={decrementYoungChildren}
                                  disabled={youngChildren <= 0}
                                  className={`
                                    w-9 h-9 flex items-center justify-center rounded-full border text-lg
                                    ${youngChildren <= 0 
                                      ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                                      : 'border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors'}
                                  `}
                                >
                                  -
                                </button>
                                
                                <span className="w-6 text-center font-medium text-gray-900">{youngChildren}</span>
                                
                                <button
                                  type="button"
                                  onClick={incrementYoungChildren}
                                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors text-lg"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Price summary card */}
                        <div className="mt-8 p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-md">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Summary</h3>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">{adults} Adults × €{adultPrice}</span>
                              <span className="font-medium text-gray-800">€{(adults * adultPrice).toFixed(2)}</span>
                            </div>
                            
                            {children > 0 && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">{children} Children × €{childPrice}</span>
                                <span className="font-medium text-gray-800">€{(children * childPrice).toFixed(2)}</span>
                              </div>
                            )}
                            
                            {youngChildren > 0 && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">{youngChildren} Infants</span>
                                <span className="font-medium text-gray-800">Free</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between pt-3 border-t border-gray-200">
                            <span className="font-semibold text-gray-900">Total Amount</span>
                            <span className="font-bold text-lg text-amber-700">€{totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="mt-8 flex gap-4 justify-between items-center">
                          {currentView === 'guests' && (
                            <button
                              onClick={goToNextStep}
                              className="flex-1 px-5 py-5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 relative overflow-hidden group text-lg"
                              style={{
                                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                              }}
                            >
                              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-100 group-hover:opacity-90 transition-opacity"></span>
                              <span className="absolute -inset-px bg-gradient-to-r from-white/20 to-transparent opacity-50 rounded-xl"></span>
                              <span className="absolute inset-0 flex items-center justify-center text-white font-medium z-10">
                                <span className="flex items-center">
                                  Book Now
                                  <CheckIcon className="w-5 h-5 ml-2" />
                                </span>
                              </span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {currentView === 'confirmation' && (
                      <div className="p-8">
                        <div className="text-center mb-8">
                          <div className="w-20 h-20 bg-amber-100 rounded-full mx-auto mb-5 flex items-center justify-center">
                            <CheckCircleIcon className="w-12 h-12 text-amber-600 animate-checkmark" />
                          </div>
                          
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Booking!</h2>
                          <p className="text-gray-600 max-w-md mx-auto">
                            Your booking for {bookingDetails?.excursionTitle} has been confirmed. We'll be in touch soon to coordinate your amazing experience!
                          </p>
                        </div>
                        
                        {/* Booking Reference Card */}
                        <div className="mb-8 p-5 bg-amber-50/50 border border-amber-100 rounded-xl">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-900">Booking Reference</h3>
                            <div className="px-3 py-1 bg-white rounded-lg border border-amber-200 shadow-sm">
                              <span className="font-mono font-medium text-amber-700">{bookingReference}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600">
                            Please save this reference number for any communication regarding your booking.
                          </p>
                        </div>
                        
                        {/* Booking Details Grid */}
                        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Trip Details */}
                          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <h3 className="font-medium text-gray-900 mb-4">Trip Details</h3>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Tour</span>
                                <span className="text-gray-900 font-medium">{bookingDetails?.excursionTitle}</span>
                              </div>
                              
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Date</span>
                                <span className="text-gray-900 font-medium">
                                  {bookingDetails?.date ? formatDate(bookingDetails.date) : ''}
                                </span>
                              </div>
                              
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Tour Type</span>
                                <span className="text-gray-900 font-medium">
                                  {bookingDetails?.isPrivate ? 'Private Tour' : 'Group Tour'}
                                </span>
                              </div>
                              
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Pick-up Location</span>
                                <span className="text-gray-900 font-medium max-w-[60%] text-right">{bookingDetails?.pickupLocation}</span>
                              </div>
                              
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Total Price</span>
                                <span className="text-amber-600 font-semibold">€{bookingDetails?.totalPrice.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Customer Details */}
                          <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
                            <h3 className="font-medium text-gray-900 mb-4">Customer Details</h3>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Name</span>
                                <span className="text-gray-900 font-medium">{bookingDetails?.name}</span>
                              </div>
                              
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Email</span>
                                <span className="text-gray-900 font-medium">{bookingDetails?.email}</span>
                              </div>
                              
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Phone</span>
                                <span className="text-gray-900 font-medium">{bookingDetails?.phone}</span>
                              </div>
                              
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Group Size</span>
                                <span className="text-gray-900 font-medium">
                                  {bookingDetails?.adults} Adults
                                  {bookingDetails?.children > 0 ? `, ${bookingDetails?.children} Children` : ''}
                                  {bookingDetails?.youngChildren > 0 ? `, ${bookingDetails?.youngChildren} Infants` : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* What Happens Next */}
                        <div className="mb-8 p-5 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-xl shadow-sm">
                          <h3 className="font-medium text-gray-900 mb-3">What Happens Next</h3>
                          
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                                <span className="text-amber-700 text-xs font-bold">1</span>
                              </div>
                              <p className="text-sm text-gray-700">
                                We've sent a confirmation email with all your booking details
                              </p>
                            </li>
                            <li className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                                <span className="text-amber-700 text-xs font-bold">2</span>
                              </div>
                              <p className="text-sm text-gray-700">
                                Our team will contact you the day before your tour to confirm pick-up details
                              </p>
                            </li>
                            <li className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center mt-0.5 mr-3">
                                <span className="text-amber-700 text-xs font-bold">3</span>
                              </div>
                              <p className="text-sm text-gray-700">
                                Get ready for an amazing experience in the beautiful Atlas mountains!
                              </p>
                            </li>
                          </ul>
                        </div>
                        
                        {/* Payment note */}
                        <div className="mb-8 p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
                          <div className="flex items-start">
                            <div className="text-amber-500 mt-0.5 mr-3">
                              <InformationCircleIcon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 mb-1">Payment Information</h3>
                              <p className="text-sm text-gray-600">
                                Payment will be collected in cash on the day of your tour. 
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Close Button */}
                        <div className="text-center">
                          <button
                            type="button"
                            onClick={handleClose}
                            className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
        
        {/* Toast Notification */}
        {toast.isVisible && (
          <div className={`fixed top-5 right-5 z-50 p-4 rounded-xl shadow-lg max-w-md bg-white border transform transition-all duration-500 ${
            toast.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          } ${
            toast.type === 'success' ? 'border-amber-500' : 'border-red-500'
          }`}>
            <div className="flex items-start">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                toast.type === 'success' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
              }`}>
                {toast.type === 'success' ? (
                  <CheckCircleIcon className="w-4 h-4" />
                ) : (
                  <XMarkIcon className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 pt-0.5">
                <p className="text-sm text-gray-800">{toast.message}</p>
              </div>
              <button 
                onClick={hideToast}
                className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
} 