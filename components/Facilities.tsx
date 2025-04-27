import React from 'react';
import { Button } from './Button';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface FacilityItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function FacilityItem({ icon, label, active = false }: FacilityItemProps) {
  return (
    <div className={`relative flex items-center space-x-3 p-3 ${
      active 
        ? 'bg-white/50 backdrop-blur-md border border-white/40 shadow-xl shadow-blue-500/5' 
        : 'bg-white/30 border border-white/30 hover:bg-white/40 hover:border-white/50'
      } rounded-xl transition-all duration-300 group transform hover:-translate-y-1 hover:shadow-lg`}>
      {/* Decorative elements */}
      {active && (
        <>
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 animate-pulse-slow"></div>
          <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-xl"></div>
        </>
      )}
      
      <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
        active 
          ? 'bg-gradient-to-br from-blue-400/80 to-blue-500/90 text-white shadow-lg shadow-blue-500/20' 
          : 'bg-blue-50/50 text-blue-500 group-hover:bg-blue-100/70'
        } transition-all duration-300`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className={`text-sm font-medium ${active ? 'text-blue-800' : 'text-gray-700 group-hover:text-gray-900'} transition-colors duration-300`}>
          {label}
        </span>
        {active && (
          <span className="text-xs text-blue-500 font-light flex items-center mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <SparklesIcon className="w-3 h-3 mr-1" />
            <span>Included</span>
          </span>
        )}
      </div>
    </div>
  );
}

export function Facilities() {
  return (
    <div className="relative w-full p-8 overflow-hidden bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/40">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-200/30 to-blue-300/30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-r from-blue-300/30 to-blue-200/30 blur-3xl"></div>
      
      <h2 className="mb-8 text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">Included</h2>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <FacilityItem 
          active={true} 
          label="Transport"
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 19L5 19L5 13.5L8 12.5L8 19Z" fill="currentColor" />
              <path d="M19 19L16 19L16 12.5L19 13.5L19 19Z" fill="currentColor" />
              <path d="M7 2H17L21 6.6V7H3V6.6L7 2Z" fill="currentColor" />
              <path d="M7 10H17L17 19.5C17 20.3284 16.3284 21 15.5 21H8.5C7.67157 21 7 20.3284 7 19.5V10Z" fill="currentColor" />
            </svg>
          }
        />
        <FacilityItem 
          active={true} 
          label="Guide"
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z" fill="currentColor" />
              <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill="currentColor" />
            </svg>
          }
        />
        <FacilityItem 
          active={true} 
          label="Local Visit"
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 9H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V9Z" fill="currentColor" />
              <path d="M2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V9H2V4Z" fill="currentColor" />
              <path d="M8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14H16C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12H8Z" fill="currentColor" />
              <path d="M15 16C14.4477 16 14 16.4477 14 17C14 17.5523 14.4477 18 15 18H16C16.5523 18 17 17.5523 17 17C17 16.4477 16.5523 16 16 16H15Z" fill="currentColor" />
            </svg>
          }
        />
        <FacilityItem 
          active={true} 
          label="Lunch"
          icon={
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4C4 3.44772 4.44772 3 5 3H19C19.5523 3 20 3.44772 20 4V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z" fill="currentColor" />
              <path d="M15 14C14.4477 14 14 14.4477 14 15C14 15.5523 14.4477 16 15 16H17C17.5523 16 18 15.5523 18 15C18 14.4477 17.5523 14 17 14H15Z" fill="currentColor" />
              <path d="M15 10C14.4477 10 14 10.4477 14 11C14 11.5523 14.4477 12 15 12H17C17.5523 12 18 11.5523 18 11C18 10.4477 17.5523 10 17 10H15Z" fill="currentColor" />
              <path d="M15 6C14.4477 6 14 6.44772 14 7C14 7.55228 14.4477 8 15 8H17C17.5523 8 18 7.55228 18 7C18 6.44772 17.5523 6 17 6H15Z" fill="currentColor" />
              <path d="M11 14C10.4477 14 10 14.4477 10 15C10 15.5523 10.4477 16 11 16H11.01C11.5623 16 12.01 15.5523 12.01 15C12.01 14.4477 11.5623 14 11.01 14H11Z" fill="currentColor" />
              <path d="M11 10C10.4477 10 10 10.4477 10 11C10 11.5523 10.4477 12 11 12H11.01C11.5623 12 12.01 11.5523 12.01 11C12.01 10.4477 11.5623 10 11.01 10H11Z" fill="currentColor" />
              <path d="M11 6C10.4477 6 10 6.44772 10 7C10 7.55228 10.4477 8 11 8H11.01C11.5623 8 12.01 7.55228 12.01 7C12.01 6.44772 11.5623 6 11.01 6H11Z" fill="currentColor" />
              <path d="M7 14C6.44772 14 6 14.4477 6 15C6 15.5523 6.44772 16 7 16H7.01C7.56228 16 8.01 15.5523 8.01 15C8.01 14.4477 7.56228 14 7.01 14H7Z" fill="currentColor" />
              <path d="M7 10C6.44772 10 6 10.4477 6 11C6 11.5523 6.44772 12 7 12H7.01C7.56228 12 8.01 11.5523 8.01 11C8.01 10.4477 7.56228 10 7.01 10H7Z" fill="currentColor" />
              <path d="M7 6C6.44772 6 6 6.44772 6 7C6 7.55228 6.44772 8 7 8H7.01C7.56228 8 8.01 7.55228 8.01 7C8.01 6.44772 7.56228 6 7.01 6H7Z" fill="currentColor" />
            </svg>
          }
        />
      </div>
      
      <div className="flex justify-center pt-2">
        <Button variant="primary" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-blue-500/20">
          <span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM10.7 7.29289C10.3095 6.90237 9.67618 6.90237 9.28566 7.29289C8.89513 7.68342 8.89513 8.31658 9.28566 8.70711L12.5854 12.0069L9.3695 15.2229C8.97897 15.6134 8.97897 16.2466 9.3695 16.6371C9.76002 17.0276 10.3932 17.0276 10.7837 16.6371L14.7121 12.7087C14.8 12.6208 14.8695 12.5149 14.9174 12.3997C15.0259 12.1575 15.0227 11.8687 14.9005 11.6286C14.8489 11.5138 14.7757 11.4093 14.6837 11.3229L10.7 7.29289Z" fill="currentColor" />
            </svg>
          </span>
          Book Now
        </Button>
      </div>
    </div>
  );
} 