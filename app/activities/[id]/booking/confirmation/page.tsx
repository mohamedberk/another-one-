"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { CheckCircleIcon, CalendarDaysIcon, UserGroupIcon, MapPinIcon, ClockIcon, CurrencyDollarIcon, 
  ChevronLeftIcon, ShieldCheckIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { getActivityById, Activity } from '@/utils/activities';
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

const BookingConfirmationPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activity, setActivity] = useState<Activity | null>(null);
  
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
  }, [params.id, router]);

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
                      
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-50 rounded-full text-blue-600 shadow-sm">
                          <CalendarDaysIcon className="w-5 h-5" />
                        </div>
                        <span className="text-gray-700">Date: <span className="font-medium">To be confirmed via email</span></span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-50 rounded-full text-blue-600 shadow-sm">
                          <UserGroupIcon className="w-5 h-5" />
                        </div>
                        <span className="text-gray-700">Group size: <span className="font-medium">To be confirmed</span></span>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-50 rounded-full text-blue-600 shadow-sm">
                          <CurrencyDollarIcon className="w-5 h-5" />
                        </div>
                        <span className="text-gray-700">Total: <span className="font-medium">Paid in full</span></span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Activity thumbnail with premium treatment */}
                  <div className="md:w-1/3 aspect-video md:aspect-square rounded-2xl overflow-hidden relative shadow-lg border border-gray-100 self-start group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image 
                      src={activityImage} 
                      alt={activity.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <HeartIcon className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                </div>
                
                {/* Next steps with premium styling */}
                <motion.div 
                  className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl p-8 mb-10 border border-blue-100/70 shadow-sm relative overflow-hidden"
                  variants={fadeIn}
                >
                  {/* Decorative shapes */}
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl"></div>
                  <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-indigo-100/40 rounded-full blur-2xl"></div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2 relative font-playfair">
                    <InformationCircleIcon className="h-5 w-5 text-blue-600" />
                    What's Next?
                  </h3>
                  
                  <ul className="space-y-5 text-gray-700 relative">
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mt-0.5 shadow-sm">
                        <span className="text-sm font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Check your email</p>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">We've sent a confirmation email with all the details and any necessary preparation tips to your inbox.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mt-0.5 shadow-sm">
                        <span className="text-sm font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Save your confirmation code</p>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">Keep your confirmation code ({referenceNumber}) handy for any inquiries or updates about your booking.</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mt-0.5 shadow-sm">
                        <span className="text-sm font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Prepare for your adventure</p>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">Review our suggested packing list and guidelines that will be sent to your email to ensure you're ready for this amazing experience.</p>
                      </div>
                    </li>
                  </ul>
                </motion.div>
                
                {/* Action buttons with premium styling */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  variants={fadeIn}
                >
                  <Link 
                    href={`/activities/${activity.id}`}
                    className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-300 text-center"
                  >
                    <span>View Activity Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                  
                  <Link 
                    href="/activities"
                    className="group flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-white hover:shadow-lg transition-all duration-300 text-center relative overflow-hidden"
                  >
                    {/* Shine effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-20 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-out"></div>
                    
                    <span className="relative">Browse More Activities</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Add animation styles */}
      <style jsx global>{`
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        
        @keyframes checkmark {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-checkmark {
          animation: checkmark 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
};

export default BookingConfirmationPage; 