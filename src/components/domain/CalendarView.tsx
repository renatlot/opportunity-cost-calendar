import { useMemo } from 'react'
import { format, startOfWeek, addDays, isToday } from 'date-fns'

import TimeSlot from './TimeSlot'
import { useTimeBoxStore, useTimeLogStore } from '@/store'
import { TimeLog } from '@/types'
import { cn } from '@/lib/utils'

interface CalendarViewProps {
  currentDate: Date
  onTimeSlotClick?: (date: string, hour: number) => void
  onTimeSlotDrop?: (projectId: string, date: string, hour: number) => void
  onTimeLogClick?: (timeLog: TimeLog) => void
  onToggleCompletion?: (timeLogId: string) => void
}

export default function CalendarView({ 
  currentDate,
  onTimeSlotClick,
  onTimeSlotDrop,
  onTimeLogClick,
  onToggleCompletion
}: CalendarViewProps) {
  const timeBoxes = useTimeBoxStore((state) => state.timeBoxes)
  const timeLogs = useTimeLogStore((state) => state.timeLogs) // Subscribe to all logs for re-render

  const weekDays = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }) // Monday
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(weekStart, i)
      return {
        date: format(date, 'yyyy-MM-dd'),
        dayName: format(date, 'EEE'),
        dayNumber: format(date, 'd'),
        isToday: isToday(date),
      }
    })
  }, [currentDate])

  const hours = useMemo(() => {
    // Only show 6 AM to 10 PM (6-22)
    return Array.from({ length: 17 }, (_, i) => {
      const hour = i + 6
      return {
        hour,
        displayTime: `${hour.toString().padStart(2, '0')}:00`,
        label: hour === 12 ? '12 PM'
             : hour < 12 ? `${hour} AM`
             : `${hour - 12} PM`,
      }
    })
  }, [])

  return (
    <div className="flex-1 overflow-auto">
      <div className="min-w-[800px]">
        {/* Header Row */}
        <div className="grid sticky top-0 bg-white z-10 border-b-2 border-gray-300" style={{ gridTemplateColumns: '64px repeat(7, 1fr)' }}>
          <div className="p-2 border-r border-gray-200">
            <span className="text-xs font-medium text-gray-500">Time</span>
          </div>
          {weekDays.map((day) => (
            <div 
              key={day.date}
              className={cn(
                "p-4 text-center border-r border-gray-200",
                day.isToday && "bg-wealth-emerald/5"
              )}
            >
              <p className="text-xs text-gray-500 uppercase">{day.dayName}</p>
              <p className={cn(
                "text-lg font-semibold",
                day.isToday ? "text-wealth-emerald" : "text-wealth-dark"
              )}>
                {day.dayNumber}
              </p>
            </div>
          ))}
        </div>

        {/* Time Grid */}
        {hours.map(({ hour, label }) => (
          <div key={hour} className="grid" style={{ gridTemplateColumns: '64px repeat(7, 1fr)' }}>
            {/* Time Label - Narrower */}
            <div className="p-1 border-r border-gray-200 text-right">
              <span className="text-xs text-gray-500">{label}</span>
            </div>

            {/* Time Slots for Each Day */}
            {weekDays.map((day) => {
              const logs = timeLogs.filter(log => log.date === day.date)
              const timeLog = logs.find(log => {
                const logHour = parseInt(log.startTime.split(':')[0])
                return logHour === hour
              })

              // Find matching time box for this hour and day
              const dayOfWeek = new Date(day.date).getDay()
              const timeBox = timeBoxes.find(tb => {
                const startHour = parseInt(tb.startTime.split(':')[0])
                const endHour = parseInt(tb.endTime.split(':')[0])
                const hourMatches = hour >= startHour && hour < endHour
                
                if (!hourMatches) return false
                
                // Check recurrence
                if (tb.recurrence === 'everyday') return true
                if (tb.recurrence === 'workdays') return dayOfWeek >= 1 && dayOfWeek <= 5
                if (tb.recurrence === 'custom') return tb.customDays?.includes(dayOfWeek)
                
                return false
              })

              return (
                <TimeSlot
                  key={`${day.date}-${hour}`}
                  date={day.date}
                  hour={hour}
                  timeBox={timeBox}
                  timeLog={timeLog}
                  onDrop={onTimeSlotDrop}
                  onClick={() => onTimeSlotClick?.(day.date, hour)}
                  onTimeLogClick={onTimeLogClick}
                  onToggleCompletion={onToggleCompletion}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
