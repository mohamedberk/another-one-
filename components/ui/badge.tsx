import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-200 shadow-sm backdrop-blur-sm hover:shadow-md hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-neutral-50/80 text-neutral-600 border-white/40",
        primary: "bg-primary-50/80 text-primary-700 border-primary-100/40",
        secondary: "bg-blue-50/80 text-blue-700 border-blue-100/40",
        success: "bg-emerald-50/80 text-emerald-700 border-emerald-100/40",
        warning: "bg-amber-50/80 text-amber-700 border-amber-100/40",
        danger: "bg-red-50/80 text-red-700 border-red-100/40",
        info: "bg-sky-50/80 text-sky-700 border-sky-100/40",
        purple: "bg-purple-50/80 text-purple-700 border-purple-100/40",
        outline: "bg-white/60 text-neutral-700 border-white/40 hover:bg-neutral-50/80",
        glass: "bg-white/60 backdrop-blur-lg text-neutral-700 border-white/40 hover:bg-white/80",
        gradient: "bg-gradient-to-r from-primary-500 to-primary-400 text-white border-transparent shadow-md shadow-primary-500/20",
      },
      size: {
        default: "px-2.5 py-1 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1.5 text-sm",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
}

function Badge({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </div>
  )
}

export { Badge, badgeVariants } 