import { useMemo } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, startOfWeek, endOfWeek } from 'date-fns'

import { cn } from '@/lib/utils'

interface MiniCalendarProps {
  currentDate: Date
  onDateSelect?: (date: Date) => void
}

export default function MiniCalendar({ currentDate, onDateSelect }: MiniCalendarProps) {
  const monthDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 })
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 })
    
    return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  }, [currentDate])

  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <div className="text-center mb-2">
        <p className="text-sm font-semibold text-wealth-dark">
          {format(currentDate, 'MMMM yyyy')}
        </p>
      </div>
      
      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map((day, i) => (
          <div key={i} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isCurrentDay = isToday(day)
          const isSelected = isSameDay(day, currentDate)
          
          return (
            <button
              key={i}
              onClick={() => onDateSelect?.(day)}
              className={cn(
                "aspect-square flex items-center justify-center text-xs rounded transition-colors",
                !isCurrentMonth && "text-gray-300",
                isCurrentMonth && !isSelected && "text-gray-700 hover:bg-gray-100",
                isCurrentDay && !isSelected && "font-bold text-wealth-emerald",
                isSelected && "bg-wealth-emerald text-white font-bold"
              )}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}
