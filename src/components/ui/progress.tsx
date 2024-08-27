"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <div className="flex items-center gap-2">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-green-900/20  shadow-shape",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-gradient-to-tr to-green-600 from-gray-900/60 shadow-container transition-all "
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />

    </ProgressPrimitive.Root>
    <p className="text-white text-xs">{value}%</p>
  </div>

))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
