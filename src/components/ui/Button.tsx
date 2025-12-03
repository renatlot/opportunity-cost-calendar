import React from 'react'

import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  className,
  children,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === 'primary' && "bg-wealth-emerald text-white hover:bg-emerald-600 focus:ring-wealth-emerald",
        variant === 'secondary' && "bg-gray-200 text-wealth-dark hover:bg-gray-300 focus:ring-gray-400",
        variant === 'danger' && "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
        size === 'sm' && "px-3 py-1.5 text-sm",
        size === 'md' && "px-4 py-2 text-base",
        size === 'lg' && "px-6 py-3 text-lg",
        props.disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
