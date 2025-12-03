import { DollarSign } from 'lucide-react'

import { cn, formatCurrency } from '@/lib/utils'

interface BadgeProps {
  value: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'gold' | 'emerald'
  showIcon?: boolean
  className?: string
}

export default function Badge({ 
  value, 
  size = 'md', 
  variant = 'gold',
  showIcon = false, // Default to false to avoid double dollar sign
  className 
}: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-full font-value border",
      variant === 'gold' && "bg-wealth-gold/10 text-wealth-gold border-wealth-gold/20",
      variant === 'emerald' && "bg-wealth-emerald/10 text-wealth-emerald border-wealth-emerald/20",
      size === 'sm' && "px-2 py-0.5 text-xs",
      size === 'md' && "px-2.5 py-0.5 text-sm",
      size === 'lg' && "px-3 py-1 text-base",
      className
    )}>
      {showIcon && (
        <DollarSign className={cn(
          size === 'sm' && "w-3 h-3",
          size === 'md' && "w-4 h-4",
          size === 'lg' && "w-5 h-5"
        )} />
      )}
      {formatCurrency(value)}
    </span>
  )
}
