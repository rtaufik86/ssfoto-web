import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-ss-red text-white shadow-sh-cta hover:bg-ss-red-600 active:translate-y-px",
        primary:
          "bg-ss-red text-white shadow-sh-cta hover:bg-ss-red-600 active:translate-y-px",
        secondary:
          "bg-white text-ss-ink border border-ss-line shadow-sh-1 hover:border-ss-ink",
        outline:
          "bg-white text-ss-ink border border-ss-line shadow-sh-1 hover:border-ss-ink",
        ghost:
          "bg-transparent text-ss-ink hover:bg-ss-surface",
        dark:
          "bg-ss-ink text-white hover:bg-black active:translate-y-px",
        wa:
          "bg-ss-wa text-white hover:bg-ss-wa-600 active:translate-y-px",
        maps:
          "bg-ss-maps text-white hover:bg-[#1557B0] active:translate-y-px",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        link:
          "text-ss-red underline-offset-4 hover:underline rounded-none shadow-none",
      },
      size: {
        default: "px-5 py-2.5",
        sm:      "px-4 py-2 text-xs",
        lg:      "px-7 py-3.5 text-base",
        icon:    "h-9 w-9",
        block:   "w-full px-5 py-2.5",
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
