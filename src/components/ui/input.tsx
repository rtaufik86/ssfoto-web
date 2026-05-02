import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-r-md border border-ss-line bg-white px-4 py-3 text-sm text-ss-ink shadow-none transition-colors",
          "placeholder:text-ss-soft",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD9D9] focus-visible:border-ss-red",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
