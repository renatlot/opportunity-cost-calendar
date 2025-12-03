import { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { TimeLog, Project } from '@/types'
import { useProjectStore } from '@/store'
import { formatCurrency } from '@/lib/utils'

interface TimeLogModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (timeLog: Partial<TimeLog> & { projectId?: string }) => void
  onDelete?: (id: string) => void
  timeLog?: TimeLog
  project?: Project
  date?: string
  hour?: number
}

export default function TimeLogModal({ 
  isOpen, 
  onClose, 
  onSave,
  onDelete,
  timeLog,
  project,
  date,
  hour
}: TimeLogModalProps) {
  const projects = useProjectStore((state) => state.projects)
  const [selectedProjectId, setSelectedProjectId] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (timeLog) {
      setStartTime(timeLog.startTime)
      setEndTime(timeLog.endTime)
      setSelectedProjectId(timeLog.projectId)
    } else if (hour !== undefined) {
      setStartTime(`${hour.toString().padStart(2, '0')}:00`)
      setEndTime(`${(hour + 1).toString().padStart(2, '0')}:00`)
      setSelectedProjectId(projects[0]?.id || '')
    }
    setErrors({})
    setShowDeleteConfirm(false)
  }, [timeLog, hour, isOpen, projects])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!timeLog && !selectedProjectId) {
      newErrors.project = 'Please select a project'
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

    if (onSave) {
      onSave({
        startTime,
        endTime,
        ...(selectedProjectId && { projectId: selectedProjectId }),
      })
    }

    onClose()
  }

  const handleDelete = () => {
    if (timeLog && onDelete) {
      onDelete(timeLog.id)
      onClose()
    }
  }

  const isEditing = !!timeLog

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Time Log' : 'Log Time'}
    >
      {!showDeleteConfirm ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {project && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: project.color }}
                />
                <p className="font-semibold text-wealth-dark">{project.name}</p>
              </div>
              <p className="text-sm text-gray-600">
                Rate: {formatCurrency(project.hourlyRate)}/hour
              </p>
              {date && (
                <p className="text-sm text-gray-600">
                  Date: {date}
                </p>
              )}
            </div>
          )}

          {!timeLog && projects.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-wealth-dark mb-1">
                Project
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wealth-emerald focus:border-transparent"
                required
              >
                <option value="">Select a project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} - {formatCurrency(p.hourlyRate)}/hr
                  </option>
                ))}
              </select>
              {errors.project && (
                <p className="text-sm text-red-600 mt-1">{errors.project}</p>
              )}
            </div>
          )}

          {date && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <span className="font-medium">Date:</span> {date}
              </p>
            </div>
          )}

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

          <div className="flex gap-3 pt-4">
            {isEditing && onDelete && (
              <Button 
                type="button" 
                variant="danger" 
                onClick={() => setShowDeleteConfirm(true)}
                className="flex-1"
              >
                Delete
              </Button>
            )}
            <Button 
              type="button" 
              variant="secondary" 
              onClick={onClose}
              className={isEditing ? '' : 'flex-1'}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {isEditing ? 'Save Changes' : 'Log Time'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900 mb-1">
                Delete Time Log?
              </p>
              <p className="text-sm text-red-800 mb-2">
                You are about to remove a time investment worth:
              </p>
              <p className="text-2xl font-value text-red-600">
                {timeLog && formatCurrency(timeLog.value)}
              </p>
              <p className="text-xs text-red-700 mt-2">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              onClick={() => setShowDeleteConfirm(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDelete}
              className="flex-1"
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
