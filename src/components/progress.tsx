"use client"

import * as React from "react"
import { Line, Circle } from 'rc-progress'
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  strokeWidth?: number
  strokeColor?: string
  trailWidth?: number
  trailColor?: string
  strokeLinecap?: "butt" | "square" | "round"
  type?: "line" | "circle"
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({
    className,
    value = 0,
    strokeWidth = 4,
    strokeColor = "hsl(var(--primary))",
    trailWidth = 4,
    trailColor = "hsl(var(--secondary))",
    strokeLinecap = "round",
    type = "line",
    ...props
  }, ref) => {
    const ProgressComponent = type === "circle" ? Circle : Line
    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <ProgressComponent
          percent={value}
          strokeWidth={strokeWidth}
          strokeColor={strokeColor}
          trailWidth={trailWidth}
          trailColor={trailColor}
          strokeLinecap={strokeLinecap}
        />
      </div>
    )
  }
)

Progress.displayName = "Progress"

export { Progress }