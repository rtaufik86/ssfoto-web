import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#E30613] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-ss-surface text-ss-ink border-ss-line",
        red:
          "bg-ss-red-50 text-ss-red-700 border-ss-red-100",
        dark:
          "bg-ss-ink text-white border-ss-ink",
        success:
          "bg-[#E8F8EE] text-[#0E8A3E] border-transparent",
        warning:
          "bg-amber-50 text-amber-700 border-amber-100",
        secondary:
          "bg-ss-surface text-ss-muted border-ss-line",
        destructive:
          "bg-destructive/10 text-destructive border-destructive/20",
        outline:
          "bg-transparent text-ss-ink border-ss-line",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
