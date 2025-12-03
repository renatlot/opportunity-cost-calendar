import { DollarSign } from 'lucide-react'

import { useTimeLogStore } from '@/store'
import { formatCurrency } from '@/lib/utils'

interface TotalValueCounterProps {
  dateRange?: 'week' | 'month'
  startDate?: string
  endDate?: string
}

export default function TotalValueCounter({ 
  startDate, 
  endDate 
}: TotalValueCounterProps) {
  const getTotalValue = useTimeLogStore((state) => state.getTotalValue)
  
  const totalValue = getTotalValue(startDate, endDate)

  return (
    <div className="bg-gradient-to-br from-wealth-emerald to-emerald-600 text-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-white/20 p-2 rounded-lg">
          <DollarSign className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium opacity-90">
          Total Portfolio Value
        </p>
      </div>
      <p className="text-4xl font-value flex items-center gap-2">
        {formatCurrency(totalValue)}
      </p>
      {totalValue === 0 && (
        <p className="text-xs opacity-75 mt-2">
          Start logging time to see your portfolio grow
        </p>
      )}
    </div>
  )
}
