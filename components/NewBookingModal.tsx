import React, { useState, Fragment } from 'react';
import { XIcon, CalendarIcon, UserIcon, UserPlusIcon, HomeIcon, PhoneIcon, MailIcon, GlobeIcon } from './Icons';
import { handleBookingSubmission } from '../firebase/services/bookingService';
import { Toast } from './Toast';
import Link from 'next/link';
import { Transition, Dialog } from '@headlessui/react';
import { Activity, calculateTourPrice } from '../utils/activities86';

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

interface NewBookingModalProps {
  isOpen?: boolean;
  closeModal?: () => void;
  onClose?: () => void;
  excursionTitle?: string;
  excursionType?: string;
  activity?: Activity;
  onBookingSuccess?: (bookingDetails: any) => void;
}

export function NewBookingModal({ 
  isOpen, 
  closeModal, 
  onClose,
  excursionTitle = '3 Valleys Atlas Adventure',
  excursionType = 'EXCURSION',
  activity,
  onBookingSuccess
}: NewBookingModalProps) {
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
  
  // State for booking confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [bookingReference, setBookingReference] = useState('');
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ 
    message: '', 
    type: 'success' as 'success' | 'error', 
    isVisible: false 
  });
  
  // Create proper handlers for closing the modal
  const handleClose = () => {
    if (onClose) onClose();
    else if (closeModal) closeModal();
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
    setShowConfirmation(false);
    setBookingDetails(null);
  };
  
  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  };
  
  // Hide toast notification
  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };
  
  // Generate a random booking reference
  const generateBookingReference = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
        setShowConfirmation(true);
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
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();
    
    const daysInMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    
    const firstDayOfMonth = new Date(
      currentYear,
      currentMonth,
      1
    ).getDay();
    
    // Create array for days
    const days = [];
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = day === currentDate;
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;
      
      // Create a new date for comparison without modifying the reference date
      const todayForComparison = new Date(currentYear, currentMonth, currentDate);
      todayForComparison.setHours(0, 0, 0, 0);
      const isPast = date < todayForComparison;
      
      days.push(
        <button
          key={day}
          type="button"
          disabled={isPast}
          onClick={() => {
            setSelectedDate(new Date(currentYear, currentMonth, day));
            setShowDatePicker(false);
          }}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm transition-all duration-200 ${
            isSelected 
              ? 'bg-neutral-800 text-white' 
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
  
  // Handle adult count changes
  const incrementAdults = () => setAdults(prev => prev + 1);
  const decrementAdults = () => setAdults(prev => (prev > 1 ? prev - 1 : 1));
  
  // Handle children count changes
  const incrementChildren = () => setChildren(prev => prev + 1);
  const decrementChildren = () => setChildren(prev => (prev > 0 ? prev - 1 : 0));
  
  // Handle young children count changes
  const incrementYoungChildren = () => setYoungChildren(prev => prev + 1);
  const decrementYoungChildren = () => setYoungChildren(prev => (prev > 0 ? prev - 1 : 0));
  
  if (!isOpen) return null;
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={dialogCloseHandler}>
        {/* Fixed backdrop with blur effect */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>
        
        {/* Centered modal container */}
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform rounded-3xl bg-neutral-50 shadow-2xl transition-all">
                {/* Close button */}
                <button 
                  onClick={handleClose}
                  className="absolute right-5 top-5 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200"
                >
                  <XIcon />
                </button>
                
                {!showConfirmation ? (
                  /* Booking Form */
                  <>
                    {/* Header */}
                    <div className="p-6 pb-2">
                      <h2 className="text-xl sm:text-2xl font-bold font-display text-neutral-800">Book Your Experience</h2>
                      <p className="text-neutral-500 mt-1 text-sm">Fill out the form below to reserve your {excursionTitle}</p>
                    </div>
                    
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 bg-neutral-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Left column */}
                        <div className="space-y-4">
                          {/* Name field */}
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Full Name</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="w-4 h-4 text-neutral-400" />
                              </div>
                              <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="Your name"
                                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-200 focus:border-neutral-300 transition-all duration-200"
                              />
                            </div>
                          </div>
                          
                          {/* Email field */}
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <MailIcon className="w-4 h-4 text-neutral-400" />
                              </div>
                              <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-200 focus:border-neutral-300 transition-all duration-200"
                              />
                            </div>
                          </div>
                          
                          {/* Phone field */}
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <PhoneIcon className="w-4 h-4 text-neutral-400" />
                              </div>
                              <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                placeholder="+1 (555) 123-4567"
                                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-200 focus:border-neutral-300 transition-all duration-200"
                              />
                            </div>
                          </div>
                          
                          {/* Date field */}
                          <div>
                            <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-1">Travel Date</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <CalendarIcon className="w-4 h-4 text-neutral-400" />
                              </div>
                              <input
                                type="text"
                                id="date"
                                readOnly
                                value={selectedDate ? formatDate(selectedDate) : ''}
                                placeholder="Select a date"
                                onClick={() => setShowDatePicker(!showDatePicker)}
                                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-200 focus:border-neutral-300 transition-all duration-200 cursor-pointer"
                              />
                              
                              {/* Calendar dropdown */}
                              {showDatePicker && (
                                <div className="absolute bottom-full left-0 mb-1 p-3 bg-white rounded-xl shadow-xl border border-neutral-100 z-10">
                                  <div className="mb-2">
                                    <h4 className="text-center font-medium text-neutral-800 text-sm">
                                      {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                                    </h4>
                                  </div>
                                  <div className="grid grid-cols-7 gap-1 mb-1">
                                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                      <div key={day} className="h-6 w-6 flex items-center justify-center text-xs text-neutral-500 font-medium">
                                        {day}
                                      </div>
                                    ))}
                                  </div>
                                  <div className="grid grid-cols-7 gap-1">
                                    {generateCalendarDays()}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Right column */}
                        <div className="space-y-4">
                          {/* Guests fields */}
                          <div className="space-y-3">
                            <h3 className="text-sm font-medium text-neutral-700">Number of Guests</h3>
                            
                            {/* Tour type selector */}
                            <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl mb-3">
                              <div>
                                <span className="block text-sm font-medium text-neutral-800">Tour Type</span>
                                <span className="text-xs text-neutral-500">Select your preferred option</span>
                              </div>
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() => setIsPrivate(false)}
                                  className={`px-3 py-1 text-xs font-medium rounded-full mr-2 transition-all ${
                                    !isPrivate 
                                      ? 'bg-neutral-800 text-white' 
                                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                  }`}
                                >
                                  Group
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setIsPrivate(true)}
                                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                                    isPrivate 
                                      ? 'bg-neutral-800 text-white' 
                                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                  }`}
                                >
                                  Private
                                </button>
                              </div>
                            </div>
                            
                            {/* Adults counter */}
                            <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl">
                              <div>
                                <span className="block text-sm font-medium text-neutral-800">Adults</span>
                                <span className="text-xs text-neutral-500">Age 5+</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button 
                                  type="button"
                                  onClick={decrementAdults}
                                  className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 transition-colors duration-200"
                                >
                                  <span className="text-lg">-</span>
                                </button>
                                <span className="w-7 text-center font-medium">{adults}</span>
                                <button 
                                  type="button"
                                  onClick={incrementAdults}
                                  className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 transition-colors duration-200"
                                >
                                  <span className="text-lg">+</span>
                                </button>
                              </div>
                            </div>
                            
                            {/* Children 3-5 counter */}
                            <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl">
                              <div>
                                <span className="block text-sm font-medium text-neutral-800">Children</span>
                                <span className="text-xs text-neutral-500">Age 3-5 (Half price)</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button 
                                  type="button"
                                  onClick={decrementChildren}
                                  className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 transition-colors duration-200"
                                >
                                  <span className="text-lg">-</span>
                                </button>
                                <span className="w-7 text-center font-medium">{children}</span>
                                <button 
                                  type="button"
                                  onClick={incrementChildren}
                                  className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 transition-colors duration-200"
                                >
                                  <span className="text-lg">+</span>
                                </button>
                              </div>
                            </div>
                            
                            {/* Children under 3 counter */}
                            <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl">
                              <div>
                                <span className="block text-sm font-medium text-neutral-800">Infants</span>
                                <span className="text-xs text-neutral-500">Under 3 years (Free)</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button 
                                  type="button"
                                  onClick={() => setYoungChildren(prev => (prev > 0 ? prev - 1 : 0))}
                                  className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 transition-colors duration-200"
                                >
                                  <span className="text-lg">-</span>
                                </button>
                                <span className="w-7 text-center font-medium">{youngChildren}</span>
                                <button 
                                  type="button"
                                  onClick={() => setYoungChildren(prev => prev + 1)}
                                  className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-100 transition-colors duration-200"
                                >
                                  <span className="text-lg">+</span>
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          {/* Pickup location */}
                          <div>
                            <label htmlFor="pickup" className="block text-sm font-medium text-neutral-700 mb-1">Pick-up Location</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <GlobeIcon className="w-4 h-4 text-neutral-400" />
                              </div>
                              <input
                                type="text"
                                id="pickup"
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                                required
                                placeholder="Hotel name or address"
                                className="block w-full pl-10 pr-3 py-2.5 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-neutral-200 focus:border-neutral-300 transition-all duration-200"
                              />
                            </div>
                          </div>
                          
                          {/* Package info */}
                          <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                            <h3 className="font-medium text-neutral-800 text-sm">{activity?.title || excursionTitle}</h3>
                            <div className="text-xs text-neutral-600 mt-1 flex items-center">
                              <span className={`inline-block px-2 py-0.5 rounded-full mr-2 text-[10px] font-medium ${
                                isPrivate 
                                  ? 'bg-neutral-800 text-white' 
                                  : 'bg-neutral-200 text-neutral-700'
                              }`}>
                                {isPrivate ? 'PRIVATE' : 'GROUP'}
                              </span>
                              {activity?.duration || 'Full-day excursion'}
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs text-neutral-500">Base price per adult</span>
                              <span className="font-medium text-sm">€{adultPrice.toFixed(2)}</span>
                            </div>
                            <div className="mt-1 flex items-center justify-between">
                              <span className="text-xs text-neutral-500">Children (3-5 years)</span>
                              <span className="font-medium text-sm">€{childPrice.toFixed(2)}</span>
                            </div>
                            <div className="mt-1 flex items-center justify-between">
                              <span className="text-xs text-neutral-500">Infants (under 3 years)</span>
                              <span className="font-medium text-sm">Free</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Summary and submit */}
                      <div className="mt-6 pt-4 border-t border-neutral-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="mb-3 sm:mb-0">
                            <p className="text-neutral-700 text-sm">Total: <span className="font-bold text-lg">€{totalPrice.toFixed(2)}</span></p>
                            <p className="text-xs text-neutral-500">
                              {adults} {adults === 1 ? 'Adult' : 'Adults'}: €{(adults * adultPrice).toFixed(2)}
                              {children > 0 ? ` / ${children} ${children === 1 ? 'Child' : 'Children'} (3-5): €${(children * childPrice).toFixed(2)}` : ''}
                              {youngChildren > 0 ? ` / ${youngChildren} ${youngChildren === 1 ? 'Infant' : 'Infants'} (under 3): Free` : ''}
                            </p>
                          </div>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-medium rounded-xl shadow-md shadow-orange-300/20 transition-all duration-300 transform hover:-translate-y-0.5 ${
                              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                          >
                            {isSubmitting ? 'Processing...' : 'Complete Booking'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  /* Booking Confirmation - exactly matching the form's structure and sizing */
                  <>
                    {/* Header - identical to the form header */}
                    <div className="p-6 pb-2">
                      <h2 className="text-xl sm:text-2xl font-bold font-display text-neutral-800">Booking Confirmed</h2>
                      <p className="text-neutral-500 mt-1 text-sm">Your {excursionTitle} experience has been reserved</p>
                    </div>
                    
                    {/* Content - same padding as the form */}
                    <div className="p-6">
                      {/* Success animation - centered and compact */}
                      <div className="flex flex-col items-center justify-center mb-7">
                        <div className="relative">
                          {/* Success checkmark animation with enhanced styling */}
                          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-50 to-green-100 flex items-center justify-center shadow-md shadow-green-100/40">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500 animate-[checkmark_0.6s_ease-in-out_0.4s_both] drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          
                          {/* Multiple layers of pulsing animations for a more dramatic effect */}
                          <div className="absolute inset-0 rounded-full border-2 border-green-400 scale-0 animate-[scale_2s_ease-in-out_0.2s_both]"></div>
                          <div className="absolute inset-0 rounded-full border-4 border-green-300 scale-0 animate-[scale_2.5s_ease-in-out_0.4s_both]"></div>
                        </div>
                        
                        <p className="mt-5 text-neutral-600 text-center max-w-md text-sm animate-[fadeUp_0.6s_ease-in-out_0.6s_both]">
                          Thank you for booking with us. We've sent a confirmation email to <span className="font-medium text-neutral-700">{bookingDetails?.email}</span>.
                        </p>
                      </div>
                      
                      {/* Booking details - using the same grid structure as the form */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Left column */}
                        <div className="space-y-4">
                          {/* Customer info sections - styled like form inputs */}
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Customer Details</label>
                            <div className="relative p-3 border border-neutral-200 rounded-xl">
                              <div className="flex items-start">
                                <UserIcon className="w-4 h-4 text-neutral-400 mt-0.5 mr-3" />
                                <div>
                                  <p className="text-sm font-medium text-neutral-800">{bookingDetails?.name}</p>
                                  <p className="text-xs text-neutral-500">{bookingDetails?.email}</p>
                                  <p className="text-xs text-neutral-500">{bookingDetails?.phone}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Number of Guests</label>
                            <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-xl">
                              <div>
                                <span className="block text-sm font-medium text-neutral-800">Travelers</span>
                                <span className="text-xs text-neutral-500">
                                  {bookingDetails?.adults} {bookingDetails?.adults === 1 ? 'Adult' : 'Adults'}
                                  {bookingDetails?.children > 0 ? `, ${bookingDetails?.children} ${bookingDetails?.children === 1 ? 'Child' : 'Children'} (3-5)` : ''}
                                  {bookingDetails?.youngChildren > 0 ? `, ${bookingDetails?.youngChildren} ${bookingDetails?.youngChildren === 1 ? 'Infant' : 'Infants'} (under 3)` : ''}
                                </span>
                              </div>
                              <div className="bg-neutral-100 rounded-full px-3 py-1">
                                <span className="text-sm font-medium">{(bookingDetails?.adults || 0) + (bookingDetails?.children || 0) + (bookingDetails?.youngChildren || 0)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Pick-up Location</label>
                            <div className="relative">
                              <div className="flex items-center p-3 border border-neutral-200 rounded-xl">
                                <GlobeIcon className="w-4 h-4 text-neutral-400 mr-3" />
                                <p className="text-sm text-neutral-800">{bookingDetails?.pickupLocation}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Right column */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Travel Date</label>
                            <div className="relative">
                              <div className="flex items-center p-3 border border-neutral-200 rounded-xl">
                                <CalendarIcon className="w-4 h-4 text-neutral-400 mr-3" />
                                <p className="text-sm text-neutral-800">{bookingDetails?.date ? formatDate(bookingDetails.date) : ''}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <label className="block text-sm font-medium text-neutral-700 mb-1">Booking Details</label>
                            
                            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-neutral-800 text-sm">{bookingDetails?.excursionTitle || excursionTitle}</h3>
                                <div className="bg-white py-1 px-2 rounded-lg border border-neutral-200 text-xs font-mono">
                                  {bookingReference}
                                </div>
                              </div>
                              <div className="flex items-center">
                                <span className={`inline-block px-2 py-0.5 rounded-full mr-2 text-[10px] font-medium ${
                                  bookingDetails?.isPrivate 
                                    ? 'bg-neutral-800 text-white' 
                                    : 'bg-neutral-200 text-neutral-700'
                                }`}>
                                  {bookingDetails?.isPrivate ? 'PRIVATE' : 'GROUP'}
                                </span>
                                <p className="text-xs text-neutral-600">Full-day excursion</p>
                              </div>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-xs text-neutral-500">Total price</span>
                                <span className="font-medium text-sm">€{bookingDetails?.totalPrice.toFixed(2)}</span>
                              </div>
                            </div>
                            
                            <div className="p-3 border border-neutral-200 rounded-xl bg-green-50/50">
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                  <p className="text-sm font-medium text-green-700">Booking Confirmed</p>
                                  <p className="text-xs text-green-600">Your booking is confirmed</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* What's next - styled like the form summary area */}
                      <div className="mt-6 pt-4 border-t border-neutral-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="mb-3 sm:mb-0">
                            <h3 className="text-sm font-medium text-neutral-700 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Next Steps
                            </h3>
                            <ul className="mt-2 space-y-1 text-xs text-neutral-500">
                              <li className="flex items-center">
                                <span className="mr-1">•</span>
                                <p>Check your email for detailed confirmation</p>
                              </li>
                              <li className="flex items-center">
                                <span className="mr-1">•</span>
                                <p>Our team will contact you before your excursion</p>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3">
                            <button 
                              onClick={handleClose}
                              className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium rounded-xl transition-all duration-300 text-sm"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
      
      {/* Toast Notification */}
      <Toast 
        message={toast.message} 
        type={toast.type} 
        isVisible={toast.isVisible} 
        onClose={hideToast} 
      />
    </Transition>
  );
} 