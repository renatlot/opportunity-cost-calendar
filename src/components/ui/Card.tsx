import React from 'react'

import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'interactive'
}

export default function Card({ 
  children, 
  className, 
  variant = 'default',
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-4",
        variant === 'default' && "shadow-md",
        variant === 'elevated' && "shadow-lg hover:shadow-xl transition-shadow",
        variant === 'interactive' && "shadow-md cursor-pointer hover:border-wealth-emerald transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
