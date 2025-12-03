import { useState, useEffect } from 'react'

import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Project } from '@/types'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (project: Omit<Project, 'id' | 'totalHours' | 'totalValue'>) => void
  project?: Project
}

const DEFAULT_COLORS = [
  '#10b981', // emerald
  '#f59e0b', // gold
  '#3b82f6', // blue
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#14b8a6', // teal
  '#f97316', // orange
]

export default function ProjectModal({ 
  isOpen, 
  onClose, 
  onSave,
  project 
}: ProjectModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [hourlyRate, setHourlyRate] = useState('')
  const [color, setColor] = useState(DEFAULT_COLORS[0])
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (project) {
      setName(project.name)
      setDescription(project.description)
      setHourlyRate(project.hourlyRate.toString())
      setColor(project.color)
    } else {
      setName('')
      setDescription('')
      setHourlyRate('')
      setColor(DEFAULT_COLORS[0])
    }
    setErrors({})
  }, [project, isOpen])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = 'Project name is required'
    }

    const rate = parseFloat(hourlyRate)
    if (!hourlyRate || isNaN(rate) || rate <= 0) {
      newErrors.hourlyRate = 'Hourly rate must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    onSave({
      name: name.trim(),
      description: description.trim(),
      hourlyRate: parseFloat(hourlyRate),
      color,
    })

    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project ? 'Edit Project' : 'Create Project'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., SaaS Startup"
          error={errors.name}
          required
        />

        <div>
          <label className="block text-sm font-medium text-wealth-dark mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the project"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-black focus:ring-2 focus:ring-wealth-emerald focus:border-transparent placeholder:text-gray-400"
          />
        </div>

        <Input
          label="Hourly Rate ($)"
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(e.target.value)}
          placeholder="e.g., 500"
          min="0"
          step="0.01"
          error={errors.hourlyRate}
          required
        />

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

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            {project ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
