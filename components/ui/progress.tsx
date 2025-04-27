"use client"

import { cn } from "@/lib/utils"

interface ProgressProps {
  value?: number; 
  className?: string;
  indicatorClassName?: string;
}

export function Progress({ 
  value = 0, 
  className, 
  indicatorClassName 
}: ProgressProps) {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-neutral-100",
        className
      )}
    >
      <div
        className={cn(
          "h-full bg-orange-500 transition-all",
          indicatorClassName
        )}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
} 