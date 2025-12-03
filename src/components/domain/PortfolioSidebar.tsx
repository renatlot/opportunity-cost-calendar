import { Plus } from 'lucide-react'

import Button from '@/components/ui/Button'
import TotalValueCounter from './TotalValueCounter'
import ProjectCard from './ProjectCard'
import MiniCalendar from './MiniCalendar'
import { useProjectStore } from '@/store'
import { Project } from '@/types'

interface PortfolioSidebarProps {
  onCreateProject?: () => void
  onEditProject?: (project: Project) => void
  onDeleteProject?: (id: string) => void
  startDate?: string
  endDate?: string
  currentDate?: Date
  onDateSelect?: (date: Date) => void
}

export default function PortfolioSidebar({ 
  onCreateProject,
  onEditProject,
  onDeleteProject,
  startDate,
  endDate,
  currentDate,
  onDateSelect
}: PortfolioSidebarProps) {
  const projects = useProjectStore((state) => state.projects)

  return (
    <aside className="w-full lg:w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-wealth-dark mb-4">
          Portfolio
        </h2>
        <TotalValueCounter startDate={startDate} endDate={endDate} />
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-wealth-dark">
          Projects
        </h3>
        {onCreateProject && (
          <Button size="sm" onClick={onCreateProject}>
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto scrollbar-hide">
        {projects.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm mb-4">
              No projects yet
            </p>
            {onCreateProject && (
              <Button onClick={onCreateProject}>
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            )}
          </div>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEditProject}
              onDelete={onDeleteProject}
            />
          ))
        )}
      </div>

      {/* Mini Calendar at Bottom */}
      {currentDate && onDateSelect && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <MiniCalendar currentDate={currentDate} onDateSelect={onDateSelect} />
        </div>
      )}
    </aside>
  )
}
