import React from 'react'

import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ 
  label, 
  error, 
  className,
  ...props 
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-wealth-dark mb-1">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full px-3 py-2 border rounded-lg transition-colors bg-white text-black",
          "focus:ring-2 focus:outline-none placeholder:text-gray-400",
          error 
            ? "border-red-500 focus:ring-red-500 focus:border-red-500" 
            : "border-gray-300 focus:ring-wealth-emerald focus:border-transparent",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  )
}
