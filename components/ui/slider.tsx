"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-neutral-100/70 shadow-inner"
    >
      <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-primary-500 to-primary-400 shadow-sm" />
    </SliderPrimitive.Track>
    {props.value?.map((_, i: number) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block h-6 w-6 rounded-full bg-white border border-white/40 shadow-md backdrop-blur-sm ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/30 focus-visible:ring-offset-2 hover:shadow-lg hover:scale-110 disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider } 