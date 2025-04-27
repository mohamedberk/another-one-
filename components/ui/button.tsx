import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform-gpu backface-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary-500 to-primary-400 text-white hover:shadow-md hover:shadow-primary-500/20 hover:-translate-y-0.5 border border-transparent",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-400 text-white hover:shadow-md hover:shadow-red-500/20 hover:-translate-y-0.5 border border-transparent",
        outline:
          "border border-neutral-200/80 bg-white/90 backdrop-blur-sm hover:bg-neutral-50/90 hover:border-neutral-300/80 text-neutral-700 shadow-sm",
        secondary:
          "bg-neutral-100/90 backdrop-blur-sm text-neutral-700 hover:bg-neutral-200/90 hover:shadow-sm hover:-translate-y-0.5 border border-transparent",
        ghost: "text-neutral-700 hover:bg-neutral-100/80 backdrop-blur-sm border border-transparent",
        link: "text-primary-500 underline-offset-4 hover:underline border-none",
        danger: "bg-red-50/90 backdrop-blur-sm text-red-700 hover:bg-red-100/90 hover:shadow-sm hover:-translate-y-0.5 border border-red-100/50",
        success: "bg-emerald-50/90 backdrop-blur-sm text-emerald-700 hover:bg-emerald-100/90 hover:shadow-sm hover:-translate-y-0.5 border border-emerald-100/50",
        info: "bg-blue-50/90 backdrop-blur-sm text-blue-700 hover:bg-blue-100/90 hover:shadow-sm hover:-translate-y-0.5 border border-blue-100/50",
        premium: "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 border border-transparent",
        glass: "bg-white/80 backdrop-blur-lg border border-white/40 text-neutral-700 shadow-sm hover:shadow-md hover:bg-white/90 hover:-translate-y-0.5"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-xs",
        xs: "h-7 px-2.5 text-xs",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-base",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-xs": "h-6 w-6 p-0",
        "round": "h-12 w-12 rounded-full p-0 flex items-center justify-center"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }