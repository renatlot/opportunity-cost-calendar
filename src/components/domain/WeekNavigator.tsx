import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, startOfWeek, endOfWeek } from 'date-fns'

import Button from '@/components/ui/Button'

interface WeekNavigatorProps {
  currentDate: Date
  onPrevWeek: () => void
  onNextWeek: () => void
  onToday: () => void
}

export default function WeekNavigator({ 
  currentDate, 
  onPrevWeek, 
  onNextWeek, 
  onToday 
}: WeekNavigatorProps) {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }) // Monday
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 })
  
  const displayRange = `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold text-wealth-dark">
        {displayRange}
      </h2>
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant="secondary" 
          onClick={onPrevWeek}
          aria-label="Previous week"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button 
          size="sm" 
          variant="secondary" 
          onClick={onToday}
        >
          Today
        </Button>
        <Button 
          size="sm" 
          variant="secondary" 
          onClick={onNextWeek}
          aria-label="Next week"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
