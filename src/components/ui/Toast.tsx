import { useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface ToastProps {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose: (id: string) => void
}

export default function Toast({ 
  id, 
  message, 
  type = 'info', 
  duration = 3000,
  onClose 
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id)
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }

  const Icon = icons[type]

  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg shadow-lg border min-w-[300px] max-w-md",
        "animate-in slide-in-from-right duration-300",
        type === 'success' && "bg-emerald-50 border-emerald-200 text-emerald-900",
        type === 'error' && "bg-red-50 border-red-200 text-red-900",
        type === 'info' && "bg-blue-50 border-blue-200 text-blue-900"
      )}
    >
      <Icon className={cn(
        "w-5 h-5 flex-shrink-0 mt-0.5",
        type === 'success' && "text-emerald-600",
        type === 'error' && "text-red-600",
        type === 'info' && "text-blue-600"
      )} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
