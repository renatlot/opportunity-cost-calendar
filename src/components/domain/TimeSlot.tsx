import React, { useState } from 'react'
import { Check } from 'lucide-react'

import Badge from '@/components/ui/Badge'
import { TimeBox, TimeLog } from '@/types'
import { useProjectStore } from '@/store'
import { cn } from '@/lib/utils'

interface TimeSlotProps {
  date: string
  hour: number
  timeBox?: TimeBox
  timeLog?: TimeLog
  onDrop?: (projectId: string, date: string, hour: number) => void
  onClick?: () => void
  onTimeLogClick?: (timeLog: TimeLog) => void
  onToggleCompletion?: (timeLogId: string) => void
}

export default function TimeSlot({ 
  date, 
  hour, 
  timeBox, 
  timeLog,
  onDrop,
  onClick,
  onTimeLogClick,
  onToggleCompletion
}: TimeSlotProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const getProjectById = useProjectStore((state) => state.getProjectById)

  const project = timeLog ? getProjectById(timeLog.projectId) : undefined

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    
    const projectId = e.dataTransfer.getData('projectId')
    console.log('Drop event - projectId:', projectId, 'date:', date, 'hour:', hour)
    
    if (projectId && onDrop) {
      console.log('Calling onDrop handler')
      onDrop(projectId, date, hour)
    } else {
      console.log('No projectId or onDrop handler')
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on completion checkbox
    if ((e.target as HTMLElement).closest('.completion-checkbox')) {
      return
    }
    
    if (timeLog && onTimeLogClick) {
      onTimeLogClick(timeLog)
    } else if (onClick) {
      onClick()
    }
  }

  const handleToggleCompletion = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (timeLog && onToggleCompletion) {
      onToggleCompletion(timeLog.id)
    }
  }

  return (
    <div
      className={cn(
        "relative min-h-[60px] border-b border-r border-gray-200 transition-colors",
        isDragOver && "bg-wealth-emerald/10 border-wealth-emerald",
        (onClick || timeLog) && "cursor-pointer hover:bg-gray-50",
        !timeLog && !isDragOver && "hover:bg-gray-50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {/* Time Box Background Layer */}
      {timeBox && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            backgroundColor: timeBox.color,
            opacity: timeBox.opacity 
          }}
        />
      )}

      {/* Time Log Foreground Layer */}
      {timeLog && project && (
        <div 
          className="absolute inset-0 p-2 flex flex-col justify-between hover:shadow-md transition-shadow pointer-events-none"
          style={{ 
            backgroundColor: `${project.color}20`,
            borderLeft: `3px solid ${project.color}` 
          }}
        >
          <div className="flex items-start justify-between gap-1 pointer-events-auto">
            <div className="flex-1 min-w-0 cursor-pointer">
              <p className="text-xs font-semibold text-wealth-dark truncate">
                {project.name}
              </p>
              <p className="text-xs text-gray-600">
                {timeLog.startTime} - {timeLog.endTime}
              </p>
            </div>
            <button
              onClick={handleToggleCompletion}
              className={cn(
                "completion-checkbox flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors z-10",
                timeLog.isCompleted 
                  ? "bg-wealth-emerald border-wealth-emerald" 
                  : "border-gray-300 hover:border-wealth-emerald"
              )}
              aria-label={timeLog.isCompleted ? "Mark as incomplete" : "Mark as complete"}
            >
              {timeLog.isCompleted && <Check className="w-3 h-3 text-white pointer-events-none" />}
            </button>
          </div>
          {timeLog.isCompleted && <div className="pointer-events-auto"><Badge value={timeLog.value} size="sm" /></div>}
        </div>
      )}


    </div>
  )
}
