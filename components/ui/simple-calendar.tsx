"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { addMonths, subMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns"
import { cn } from "@/lib/utils"

interface SimpleCalendarProps {
  selectedDate?: Date
  onDateSelect: (date: Date) => void
  className?: string
}

export function SimpleCalendar({ selectedDate, onDateSelect, className }: SimpleCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())
  
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1))

  return (
    <div className={cn("w-full max-w-md mx-auto p-4 bg-white rounded-3xl border border-neutral-200/80", className)}>
      {/* Calendar Header - More Compact */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-medium text-neutral-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={prevMonth}
            className="h-8 w-8 rounded-lg border border-neutral-200/80 hover:border-orange-500/20 hover:bg-orange-50 hover:text-orange-500 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextMonth}
            className="h-8 w-8 rounded-lg border border-neutral-200/80 hover:border-orange-500/20 hover:bg-orange-50 hover:text-orange-500 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Weekday Headers - More Compact */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-neutral-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid - More Compact */}
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((date, idx) => {
          const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
          const isCurrentMonth = isSameMonth(date, currentMonth)
          const isTodayDate = isToday(date)
          const isDisabled = date < new Date()

          return (
            <button
              key={idx}
              onClick={() => !isDisabled && onDateSelect(date)}
              disabled={isDisabled}
              className={cn(
                "h-8 w-full rounded-lg text-sm font-medium",
                "transition-all duration-200",
                "hover:bg-orange-50 hover:text-orange-500",
                "disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-inherit",
                {
                  "text-neutral-900": isCurrentMonth && !isSelected && !isTodayDate,
                  "bg-orange-500 text-white hover:bg-orange-600 hover:text-white": isSelected,
                  "bg-orange-50 text-orange-500": isTodayDate && !isSelected,
                  "opacity-40": !isCurrentMonth
                }
              )}
            >
              {format(date, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
} 