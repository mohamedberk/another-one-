"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { CheckCircleIcon, CalendarDaysIcon, UserGroupIcon, MapPinIcon, ClockIcon, CurrencyDollarIcon, 
  ChevronLeftIcon, ShieldCheckIcon, InformationCircleIcon, UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { getActivityByIdAdapter } from '@/utils/activities6Adapter';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { CheckCircle2 } from 'lucide-react';
import { clashDisplay, cabinetGrotesk } from '@/app/fonts';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

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
  phone: string;
  adults: number;
  children: number;
  youngChildren: number;
  pickupLocation: string;
  date: Date;
  totalPrice: number;
  excursionTitle: string;
  excursionType: string;
  isPrivate: boolean;
  bookingReference: string;
  adultPrice: number;
  childPrice: number;
  youngChildPrice: number;
  status: string;
}

const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);
  const [activity, setActivity] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const bookingId = searchParams.get('ref');

  useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingId) {
        setLoading(false);
        return;
      }

      try {
        const bookingDoc = await getDoc(doc(db, 'bookings', bookingId));
        if (bookingDoc.exists()) {
          const data = bookingDoc.data() as BookingInfo;
          setBookingInfo(data);
          
          // Get activity details if needed
          if (data.excursionTitle) {
            const act = getActivityByIdAdapter(data.excursionTitle);
            setActivity(act || null);
          }
        }
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50/80 via-white to-amber-50/60">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <div className="text-gray-600">Loading booking details...</div>
        </div>
      </div>
    );
  }

  if (!bookingInfo) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-amber-50/80 via-white to-amber-50/60">
        <div className="text-center space-y-4 bg-white/80 p-10 rounded-2xl shadow-xl border border-amber-100/40">
          <div className="text-2xl font-bold text-gray-700">No booking found</div>
          <button onClick={() => router.push('/')} className="px-6 py-3 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">Go Home</button>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (date: Date): string => {
    try {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-amber-50/80 via-white to-amber-50/60 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center ${cabinetGrotesk.variable} ${clashDisplay.variable}`}>
      <div className="w-full max-w-2xl mx-auto">
        {/* Hero Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-100/40 bg-white/90 backdrop-blur-2xl p-0">
          {/* Decorative gradient top bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 rounded-t-3xl" />
          {/* Hero checkmark */}
          <div className="flex flex-col items-center pt-14 pb-6 bg-gradient-to-b from-white/80 to-amber-50/40">
            <div className="bg-gradient-to-br from-amber-200 to-amber-100 rounded-full p-6 shadow-xl mb-6 border-4 border-white/80">
              <CheckCircle2 className="w-20 h-20 text-amber-600 drop-shadow-lg" />
            </div>
            <h1 className={`text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight leading-tight drop-shadow-xl ${cabinetGrotesk.className}`}>Booking Confirmed</h1>
            <p className={`text-lg md:text-xl text-gray-700 mb-3 font-medium max-w-xl text-center ${clashDisplay.className}`}>Thank you for your reservation. <span className='text-amber-600 font-semibold'>A confirmation has been sent to your email.</span></p>
            <span className="inline-block bg-amber-50 text-amber-700 px-5 py-2 rounded-full text-sm font-bold tracking-wider mb-2 shadow border border-amber-100/60">Ref: {bookingInfo.bookingReference}</span>
          </div>
          {/* Booking summary with icons */}
          <div className="px-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <UserIcon className="h-6 w-6 text-amber-500" />
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Name</div>
                  <div className="text-base font-semibold text-gray-900">{bookingInfo.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-6 w-6 text-amber-500" />
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Email</div>
                  <div className="text-base font-semibold text-gray-900">{bookingInfo.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDaysIcon className="h-6 w-6 text-amber-500" />
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Date</div>
                  <div className="text-base font-semibold text-gray-900">{formatDate(bookingInfo.date)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <UserGroupIcon className="h-6 w-6 text-amber-500" />
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Guests</div>
                  <div className="text-base font-semibold text-gray-900">
                    {bookingInfo.adults} Adults{bookingInfo.children ? `, ${bookingInfo.children} Children` : ''}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <UserIcon className="h-6 w-6 text-amber-500" />
                <div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Activity</div>
                  <div className="text-base font-semibold text-gray-900">{bookingInfo.excursionTitle}</div>
                </div>
              </div>
              {/* Total Price row - always visible */}
              <div className="flex items-center gap-3 md:col-span-2 mt-4">
                <CurrencyDollarIcon className="h-7 w-7 text-amber-500" />
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Price</div>
                  <div className="text-2xl font-extrabold text-amber-700">{bookingInfo.totalPrice} MAD</div>
                </div>
              </div>
            </div>
            {/* Timeline What's Next */}
            <div className="mb-8">
              <h2 className={`text-xl font-bold text-gray-900 mb-4 ${cabinetGrotesk.className}`}>What's Next?</h2>
              <ol className="relative border-l-2 border-amber-100 ml-4">
                <li className="mb-8 ml-6">
                  <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full ring-4 ring-white text-amber-600 font-bold">1</span>
                  <span className="text-gray-700 text-base">Check your email for your booking confirmation and details.</span>
                </li>
                <li className="mb-8 ml-6">
                  <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full ring-4 ring-white text-amber-600 font-bold">2</span>
                  <span className="text-gray-700 text-base">Review your booking and prepare for your experience.</span>
                </li>
                <li className="ml-6">
                  <span className="absolute -left-4 flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full ring-4 ring-white text-amber-600 font-bold">3</span>
                  <span className="text-gray-700 text-base">Contact us if you have any questions or need to make changes.</span>
                </li>
              </ol>
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/" className="px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors shadow-amber-button hover:shadow-amber-button-hover text-center">Return Home</Link>
              <button className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-amber-sm border border-amber-100">Download Receipt</button>
            </div>
            {/* Modern newsletter card */}
            <div className="bg-gradient-to-br from-amber-50/80 to-amber-50/60 border border-amber-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg">
              <h3 className={`text-lg font-bold text-amber-700 mb-2 ${cabinetGrotesk.className}`}>Stay in the Loop</h3>
              <p className="text-gray-600 mb-3">Get exclusive offers, travel tips, and updates. Join our newsletter!</p>
              <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto">
                <input type="email" placeholder="Your email address" className="flex-1 px-4 py-2 rounded-lg border border-amber-200 focus:ring-2 focus:ring-amber-400" defaultValue={bookingInfo.email || ''} />
                <button type="submit" className="px-5 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage; 