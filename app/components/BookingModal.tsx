import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Excursion } from '../data/excursions';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  excursion: Excursion;
}

const BookingModal = ({ isOpen, onClose, excursion }: BookingModalProps) => {
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [date, setDate] = useState('');
  const [numGuests, setNumGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Calculate total price
  const totalPrice = excursion.price * numGuests;
  
  // Reset form
  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setPickupLocation('');
    setDate('');
    setNumGuests(1);
    setLoading(false);
    setSuccess(false);
    setError('');
  };
  
  // Close modal with reset
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  // Handle booking submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Create booking data object
      const bookingData = {
        fullName,
        email,
        phone,
        pickupLocation,
        date,
        numGuests,
        excursion: excursion.title,
        totalPrice,
        bookingDate: new Date(),
        status: 'pending'
      };
      
      // Add document to Firestore
      const bookingsRef = collection(db, 'bookings');
      await addDoc(bookingsRef, bookingData);
      
      // Show success message
      setSuccess(true);
      setLoading(false);
      
      // Reset form after 3 seconds and close
      setTimeout(() => {
        handleClose();
      }, 3000);
      
    } catch (err) {
      console.error('Error adding booking:', err);
      setError('Failed to submit booking. Please try again.');
      setLoading(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-gradient-to-b from-[#111827] to-[#080B1A] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/10">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">Reserve Your Experience</h2>
            <button 
              onClick={handleClose}
              className="text-white/70 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {success ? (
            <div className="bg-emerald-900/30 backdrop-blur-md border border-emerald-500/30 text-emerald-300 px-6 py-4 rounded-xl mb-6">
              <p className="font-medium mb-1">Booking Confirmed!</p>
              <p className="text-emerald-300/80 text-sm">Thank you for your booking. A confirmation has been sent to your email with all the details.</p>
            </div>
          ) : error ? (
            <div className="bg-rose-900/30 backdrop-blur-md border border-rose-500/30 text-rose-300 px-6 py-4 rounded-xl mb-6">
              <p className="font-medium mb-1">Booking Error</p>
              <p className="text-rose-300/80 text-sm">{error}</p>
            </div>
          ) : (
            <>
              <div className="bg-amber-900/20 backdrop-blur-md border border-amber-500/30 text-amber-300 px-6 py-4 rounded-xl mb-8">
                <p className="font-medium mb-1">
                  {excursion.title}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-amber-300/80">Per person</span>
                  <span className="font-bold">${excursion.price}</span>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-white/80 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300"
                      placeholder="name@example.com"
                    />
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  {/* Pickup Location */}
                  <div>
                    <label htmlFor="pickupLocation" className="block text-sm font-medium text-white/80 mb-2">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      id="pickupLocation"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300"
                      placeholder="Hotel name or address"
                    />
                  </div>
                  
                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-white/80 mb-2">
                      Excursion Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300"
                    />
                  </div>
                  
                  {/* Number of Guests */}
                  <div>
                    <label htmlFor="numGuests" className="block text-sm font-medium text-white/80 mb-2">
                      Number of Guests
                    </label>
                    <select
                      id="numGuests"
                      value={numGuests}
                      onChange={(e) => setNumGuests(Number(e.target.value))}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:border-amber-500/50 focus:bg-white/10 transition-all duration-300"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff80' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 1rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em` }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num} className="bg-[#111827] text-white">
                          {num} {num === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Total Price Display */}
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-5 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white/80">Total Amount:</span>
                      <span className="text-xl font-bold bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 mt-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl font-medium text-black flex items-center justify-center transition-all duration-300 shadow-[0_5px_15px_rgba(251,191,36,0.2)] hover:shadow-[0_8px_25px_rgba(251,191,36,0.4)] ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal; 