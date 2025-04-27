import { useState, useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CalendarPickerProps {
  availableDates: string[];
  selectedDate: string;
  onSelect: (date: string) => void;
}

export function CalendarPicker({ availableDates, selectedDate, onSelect }: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    // If a date is selected, start with that month, otherwise use current month
    if (selectedDate) {
      return new Date(selectedDate);
    }
    // Default to current month if no selected date
    return new Date();
  });
  
  // Format available dates for easy lookup
  const availableDateMap = useMemo(() => {
    const map = new Map();
    availableDates.forEach(date => {
      // Store the original string format
      console.log('Processing available date:', date);
      const dateObj = new Date(date);
      const dateStr = dateObj.toDateString();
      console.log('Mapped to:', dateStr);
      map.set(dateStr, date);
    });
    return map;
  }, [availableDates]);
  
  // Generate days for the current month view
  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const daysArray = [];
    // Add empty cells for days before the first day of month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      daysArray.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateStr = date.toDateString();
      const isAvailable = availableDateMap.has(dateStr);
      
      daysArray.push({
        date: isAvailable ? availableDateMap.get(dateStr) : null,
        dayNumber: i,
        isCurrentMonth: true,
        isAvailable
      });
    }
    
    return daysArray;
  }, [currentMonth, availableDateMap]);
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(prev => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prev.getMonth() - 1);
      return prevMonth;
    });
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(prev => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(prev.getMonth() + 1);
      return nextMonth;
    });
  };
  
  // Format month for display
  const formattedMonth = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Day names for header (S M T W T F S)
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="glass-morph-light rounded-xl border border-white/50 p-4 w-[450px]">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4 px-2">
        <button 
          type="button"
          onClick={prevMonth}
          className="p-2 rounded-full bg-white/70 text-neutral-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <h4 className="text-lg font-medium text-neutral-800">{formattedMonth}</h4>
        <button 
          type="button"
          onClick={nextMonth}
          className="p-2 rounded-full bg-white/70 text-neutral-600 hover:bg-blue-50 hover:text-blue-600 transition-all">
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {dayNames.map((day, index) => (
          <div key={index} className="text-center text-sm text-neutral-500 font-medium py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {daysInMonth.map((day, index) => {
          if (day === null) {
            // Empty cell
            return <div key={`empty-${index}`} className="aspect-square p-1" />;
          }
          
          // Check if this day is the selected date by comparing the formatted date strings
          console.log('Checking day:', day.date, 'against selected:', selectedDate);
          
          const isSelected = day.date && 
            day.date === selectedDate;
            
          if (day.date === selectedDate) {
            console.log('MATCH FOUND!');
          }
          
          const isDateAvailable = day.isAvailable;
          
          return (
            <button
              key={`day-${index}`}
              type="button"
              disabled={!isDateAvailable}
              onClick={() => {
                if (isDateAvailable && day.date) {
                  console.log('Selecting date:', day.date);
                  onSelect(day.date);
                }
              }}
              className={`
                aspect-square rounded-lg p-2 text-center relative
                ${isSelected 
                  ? 'bg-blue-50/70 border-2 border-blue-500 shadow-sm' 
                  : isDateAvailable 
                    ? 'hover:bg-blue-50/50 border border-white/50 hover:border-blue-200'
                    : 'text-neutral-400 border border-transparent'}
                transition-all duration-150
              `}
            >
              <span className={`
                text-base block w-full h-full flex items-center justify-center
                ${isSelected ? 'font-bold text-blue-600' : isDateAvailable ? 'font-medium text-neutral-700' : 'font-normal'}
              `}>
                {day.dayNumber}
              </span>
              
              {/* Selection indicator */}
              {isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
} 