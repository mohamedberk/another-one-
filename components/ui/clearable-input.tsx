'use client';

import * as React from "react";
import { XCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ClearableInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onClear?: () => void;
  showClearButton?: boolean;
  wrapperClassName?: string;
  onChange?: ((value: string) => void) | React.ChangeEventHandler<HTMLInputElement>;
  compact?: boolean;
}

export function ClearableInput({
  className,
  wrapperClassName,
  onClear,
  onChange,
  showClearButton = true,
  compact = false,
  ...props
}: ClearableInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(props.defaultValue?.toString() || props.value?.toString() || "");

  // Update internal value when props.value changes
  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value.toString());
    }
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (onChange) {
      if (typeof onChange === 'function') {
        // Check if the function expects one parameter (string) or an event
        if (onChange.length === 1) {
          // Function expects a string parameter
          (onChange as (value: string) => void)(newValue);
        } else {
          // Function expects an event
          (onChange as React.ChangeEventHandler<HTMLInputElement>)(e);
        }
      }
    }
  };

  const handleClear = () => {
    if (ref.current) {
      ref.current.value = "";
      ref.current.focus();
    }
    setValue("");
    onClear?.();
    
    // Call onChange with empty string if provided
    if (onChange && typeof onChange === 'function' && onChange.length === 1) {
      (onChange as (value: string) => void)("");
    }
    
    // Trigger change event for standard onChange handlers
    const event = new Event("input", { bubbles: true });
    ref.current?.dispatchEvent(event);
  };

  return (
    <div className={cn("relative", wrapperClassName)}>
      <input
        ref={ref}
        value={value}
        onChange={handleChange}
        className={cn(
          compact 
            ? "flex h-8 w-full rounded-xl border border-neutral-200 bg-white px-3 py-1 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:border-transparent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm transition-all"
            : "flex h-11 w-full rounded-full border border-white/40 bg-white/80 px-4 py-2.5 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/30 focus-visible:border-white/60 focus-visible:ring-offset-2 focus-visible:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50 backdrop-blur-lg shadow-sm transition-all hover:shadow-md",
          className
        )}
        {...props}
      />
      {showClearButton && value && value.toString().length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            "absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-500 focus:outline-none transition-all duration-200 hover:scale-110 focus:ring-2 focus:ring-primary-400/20 focus:ring-offset-2 rounded-full",
            compact && "right-2.5"
          )}
        >
          <XCircle className={cn("h-5 w-5", compact && "h-4 w-4")} />
        </button>
      )}
    </div>
  );
} 