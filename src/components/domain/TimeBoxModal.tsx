import { useState, useEffect } from 'react'

import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { TimeBox } from '@/types'

interface TimeBoxModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (timeBox: Omit<TimeBox, 'id'>) => void
  timeBox?: TimeBox
}

const DEFAULT_COLORS = [
  '#10b981', // emerald
  '#3b82f6', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#f59e0b', // gold
  '#14b8a6', // teal
]

export default function TimeBoxModal({ 
  isOpen, 
  onClose, 
  onSave,
  timeBox 
}: TimeBoxModalProps) {
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [color, setColor] = useState(DEFAULT_COLORS[0])
  const [opacity, setOpacity] = useState(0.2)
  const [recurrence, setRecurrence] = useState<'everyday' | 'workdays' | 'custom'>('everyday')
  const [customDays, setCustomDays] = useState<number[]>([1, 2, 3, 4, 5]) // Mon-Fri default
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (timeBox) {
      setName(timeBox.name)
      setStartTime(timeBox.startTime)
      setEndTime(timeBox.endTime)
      setColor(timeBox.color)
      setOpacity(timeBox.opacity)
      setRecurrence(timeBox.recurrence)
      setCustomDays(timeBox.customDays || [1, 2, 3, 4, 5])
    } else {
      setName('')
      setStartTime('09:00')
      setEndTime('17:00')
      setColor(DEFAULT_COLORS[0])
      setOpacity(0.2)
      setRecurrence('everyday')
      setCustomDays([1, 2, 3, 4, 5])
    }
    setErrors({})
  }, [timeBox, isOpen])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = 'Time box name is required'
    }

    if (!startTime) {
      newErrors.startTime = 'Start time is required'
    }

    if (!endTime) {
      newErrors.endTime = 'End time is required'
    }

    if (startTime && endTime) {
      const [startHour, startMin] = startTime.split(':').map(Number)
      const [endHour, endMin] = endTime.split(':').map(Number)
      const startMinutes = startHour * 60 + startMin
      const endMinutes = endHour * 60 + endMin

      if (endMinutes <= startMinutes) {
        newErrors.endTime = 'End time must be after start time'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    onSave({
      name: name.trim(),
      startTime,
      endTime,
      color,
      opacity,
      recurrence,
      customDays: recurrence === 'custom' ? customDays : undefined,
    })

    onClose()
  }

  const toggleCustomDay = (day: number) => {
    setCustomDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day].sort()
    )
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={timeBox ? 'Edit Time Box' : 'Create Time Box'}
      className="max-w-lg max-h-[90vh] overflow-y-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            Time boxes are recurring templates that appear on your calendar.
            Use them to structure your ideal day (e.g., "Deep Work", "Meetings", "Admin").
          </p>
          <p className="text-xs text-blue-600 mt-1">
            💡 Tip: Create multiple time boxes with the same name for different time intervals (e.g., "Work" 9-12 and "Work" 14-17).
          </p>
        </div>

        <Input
          label="Time Box Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Deep Work"
          error={errors.name}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            error={errors.startTime}
            required
          />

          <Input
            label="End Time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            error={errors.endTime}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-wealth-dark mb-2">
            Color
          </label>
          <div className="flex gap-2 flex-wrap">
            {DEFAULT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-10 h-10 rounded-lg transition-transform ${
                  color === c ? 'ring-2 ring-wealth-emerald ring-offset-2 scale-110' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: c }}
                aria-label={`Select color ${c}`}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Recurrence
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="everyday"
                checked={recurrence === 'everyday'}
                onChange={(e) => setRecurrence(e.target.value as 'everyday')}
                className="w-4 h-4 text-wealth-emerald"
              />
              <span className="text-sm text-black">Every day</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="workdays"
                checked={recurrence === 'workdays'}
                onChange={(e) => setRecurrence(e.target.value as 'workdays')}
                className="w-4 h-4 text-wealth-emerald"
              />
              <span className="text-sm text-black">Working days (Mon-Fri)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="custom"
                checked={recurrence === 'custom'}
                onChange={(e) => setRecurrence(e.target.value as 'custom')}
                className="w-4 h-4 text-wealth-emerald"
              />
              <span className="text-sm text-black">Custom days</span>
            </label>
          </div>
          
          {recurrence === 'custom' && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {dayNames.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleCustomDay(index)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    customDays.includes(index)
                      ? 'bg-wealth-emerald text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-wealth-dark mb-2">
            Opacity: {Math.round(opacity * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="0.5"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Subtle</span>
            <span>Visible</span>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-600 mb-2">Preview:</p>
          <div 
            className="h-12 rounded flex items-center justify-center"
            style={{ 
              backgroundColor: color,
              opacity: opacity 
            }}
          >
            <span className="text-sm font-medium" style={{ opacity: 1 / opacity }}>
              {name || 'Time Box Name'}
            </span>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            {timeBox ? 'Save Changes' : 'Create Time Box'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
