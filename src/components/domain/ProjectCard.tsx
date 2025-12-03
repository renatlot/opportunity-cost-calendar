import React from 'react'
import { Edit2, Trash2 } from 'lucide-react'

import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Project } from '@/types'
import { formatCurrency } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  onEdit?: (project: Project) => void
  onDelete?: (id: string) => void
  draggable?: boolean
}

export default function ProjectCard({ 
  project, 
  onEdit, 
  onDelete,
  draggable = true 
}: ProjectCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    console.log('Drag started for project:', project.id, project.name)
    e.dataTransfer.setData('projectId', project.id)
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit?.(project)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(project.id)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent drag from buttons
    if ((e.target as HTMLElement).closest('button')) {
      e.stopPropagation()
    }
  }

  return (
    <Card 
      variant="interactive"
      className="transition-transform hover:scale-105"
      draggable={draggable}
      onDragStart={handleDragStart}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0" 
            style={{ backgroundColor: project.color }}
            aria-label={`Project color: ${project.color}`}
          />
          <h3 className="text-xl font-semibold text-wealth-dark truncate">
            {project.name}
          </h3>
        </div>
        <Badge value={project.hourlyRate} size="sm" />
      </div>

      {project.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {project.description}
        </p>
      )}

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs text-gray-500">Total Value</p>
          <p className="text-2xl font-value text-wealth-gold">
            {formatCurrency(project.totalValue)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Hours Logged</p>
          <p className="text-lg font-semibold text-wealth-dark">
            {project.totalHours.toFixed(1)}h
          </p>
        </div>
      </div>

      {(onEdit || onDelete) && (
        <div className="flex gap-2 pt-3 border-t border-gray-200">
          {onEdit && (
            <button
              onClick={handleEdit}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-wealth-emerald"
              aria-label={`Edit ${project.name}`}
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label={`Delete ${project.name}`}
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      )}
    </Card>
  )
}
