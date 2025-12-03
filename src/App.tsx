import { useState } from 'react'
import { format, addWeeks, subWeeks, startOfWeek, endOfWeek } from 'date-fns'
import { Settings, BarChart3 } from 'lucide-react'

import PortfolioSidebar from '@/components/domain/PortfolioSidebar'
import CalendarView from '@/components/domain/CalendarView'
import WeekNavigator from '@/components/domain/WeekNavigator'
import ProjectModal from '@/components/domain/ProjectModal'
import TimeLogModal from '@/components/domain/TimeLogModal'
import TimeBoxModal from '@/components/domain/TimeBoxModal'
import TimeBoxList from '@/components/domain/TimeBoxList'
import AnalyticsDashboard from '@/components/domain/AnalyticsDashboard'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import ToastContainer from '@/components/ui/ToastContainer'
import { useProjectStore, useTimeLogStore, useTimeBoxStore } from '@/store'
import { useToast } from '@/hooks/useToast'
import { Project, TimeLog, TimeBox } from '@/types'

function App() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [isTimeLogModalOpen, setIsTimeLogModalOpen] = useState(false)
  const [isTimeBoxModalOpen, setIsTimeBoxModalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | undefined>()
  const [editingTimeLog, setEditingTimeLog] = useState<TimeLog | undefined>()
  const [editingTimeBox, setEditingTimeBox] = useState<TimeBox | undefined>()
  const [newTimeLogContext, setNewTimeLogContext] = useState<{ date: string; hour: number; projectId?: string } | undefined>()
  
  const { toasts, removeToast, success, error } = useToast()

  const addProject = useProjectStore((state) => state.addProject)
  const updateProject = useProjectStore((state) => state.updateProject)
  const deleteProject = useProjectStore((state) => state.deleteProject)
  const getProjectById = useProjectStore((state) => state.getProjectById)
  
  const addTimeLog = useTimeLogStore((state) => state.addTimeLog)
  const updateTimeLog = useTimeLogStore((state) => state.updateTimeLog)
  const deleteTimeLog = useTimeLogStore((state) => state.deleteTimeLog)
  
  const addTimeBox = useTimeBoxStore((state) => state.addTimeBox)
  const updateTimeBox = useTimeBoxStore((state) => state.updateTimeBox)
  const deleteTimeBox = useTimeBoxStore((state) => state.deleteTimeBox)

  const weekStart = format(startOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd')
  const weekEnd = format(endOfWeek(currentDate, { weekStartsOn: 1 }), 'yyyy-MM-dd')

  const handlePrevWeek = () => {
    setCurrentDate(prev => subWeeks(prev, 1))
  }

  const handleNextWeek = () => {
    setCurrentDate(prev => addWeeks(prev, 1))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleCreateProject = () => {
    setEditingProject(undefined)
    setIsProjectModalOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsProjectModalOpen(true)
  }

  const handleDeleteProject = (id: string) => {
    const project = getProjectById(id)
    if (!project) return

    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"? This action cannot be undone.`
    )
    
    if (confirmed) {
      deleteProject(id)
      success(`Project "${project.name}" deleted`)
    }
  }

  const handleSaveProject = (projectData: Omit<Project, 'id' | 'totalHours' | 'totalValue'>) => {
    if (editingProject) {
      updateProject(editingProject.id, projectData)
      success(`Project "${projectData.name}" updated`)
    } else {
      addProject(projectData)
      success(`Project "${projectData.name}" created`)
    }
  }

  const handleTimeSlotDrop = (projectId: string, date: string, hour: number) => {
    console.log('handleTimeSlotDrop called with:', { projectId, date, hour })
    const startTime = `${hour.toString().padStart(2, '0')}:00`
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`
    console.log('Calculated times:', { startTime, endTime })

    try {
      console.log('Calling addTimeLog...')
      addTimeLog({
        projectId,
        date,
        startTime,
        endTime,
      })
      console.log('addTimeLog completed successfully')
      const project = getProjectById(projectId)
      if (project) {
        console.log('Project found:', project.name)
        success(`Time logged for ${project.name}`)
      } else {
        console.log('Project not found!')
      }
    } catch (err) {
      console.error('Failed to add time log:', err)
      error('Failed to log time. Please try again.')
    }
  }

  const handleTimeSlotClick = (date: string, hour: number) => {
    setNewTimeLogContext({ date, hour })
    setEditingTimeLog(undefined)
    setIsTimeLogModalOpen(true)
  }

  const handleTimeLogClick = (timeLog: TimeLog) => {
    setEditingTimeLog(timeLog)
    setNewTimeLogContext(undefined)
    setIsTimeLogModalOpen(true)
  }

  const handleSaveTimeLog = (updates: Partial<TimeLog> & { projectId?: string }) => {
    if (editingTimeLog) {
      updateTimeLog(editingTimeLog.id, updates)
      success('Time log updated')
    } else if (newTimeLogContext && updates.projectId) {
      // Manual time entry with project selection
      addTimeLog({
        projectId: updates.projectId,
        date: newTimeLogContext.date,
        startTime: updates.startTime!,
        endTime: updates.endTime!,
      })
      const project = getProjectById(updates.projectId)
      if (project) {
        success(`Time logged for ${project.name}`)
      }
    }
  }

  const handleDeleteTimeLog = (id: string) => {
    deleteTimeLog(id)
    success('Time log deleted')
  }

  const handleCreateTimeBox = () => {
    setEditingTimeBox(undefined)
    setIsTimeBoxModalOpen(true)
  }

  const handleEditTimeBox = (timeBox: TimeBox) => {
    setEditingTimeBox(timeBox)
    setIsTimeBoxModalOpen(true)
  }

  const handleSaveTimeBox = (timeBoxData: Omit<TimeBox, 'id'>) => {
    if (editingTimeBox) {
      updateTimeBox(editingTimeBox.id, timeBoxData)
      success(`Time box "${timeBoxData.name}" updated`)
    } else {
      addTimeBox(timeBoxData)
      success(`Time box "${timeBoxData.name}" created`)
    }
  }

  const handleDeleteTimeBox = (id: string) => {
    deleteTimeBox(id)
    success('Time box deleted')
  }

  const handleToggleCompletion = (timeLogId: string) => {
    const toggleCompletion = useTimeLogStore.getState().toggleCompletion
    toggleCompletion(timeLogId)
  }

  return (
    <div className="flex h-screen bg-wealth-light">
      {/* Sidebar */}
      <PortfolioSidebar
        onCreateProject={handleCreateProject}
        onEditProject={handleEditProject}
        onDeleteProject={handleDeleteProject}
        startDate={weekStart}
        endDate={weekEnd}
        currentDate={currentDate}
        onDateSelect={setCurrentDate}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-wealth-dark" style={{ fontSize: '1.6rem' }}>
              Opportunity Cost Calendar
            </h1>
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setIsAnalyticsOpen(true)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setIsSettingsOpen(true)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Time Boxes
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-hidden flex flex-col">
          <WeekNavigator
            currentDate={currentDate}
            onPrevWeek={handlePrevWeek}
            onNextWeek={handleNextWeek}
            onToday={handleToday}
          />

          <CalendarView
            currentDate={currentDate}
            onTimeSlotClick={handleTimeSlotClick}
            onTimeSlotDrop={handleTimeSlotDrop}
            onTimeLogClick={handleTimeLogClick}
            onToggleCompletion={handleToggleCompletion}
          />
        </div>
      </main>

      {/* Modals */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleSaveProject}
        project={editingProject}
      />

      <TimeLogModal
        isOpen={isTimeLogModalOpen}
        onClose={() => setIsTimeLogModalOpen(false)}
        onSave={handleSaveTimeLog}
        onDelete={handleDeleteTimeLog}
        timeLog={editingTimeLog}
        project={editingTimeLog ? getProjectById(editingTimeLog.projectId) : undefined}
        date={newTimeLogContext?.date}
        hour={newTimeLogContext?.hour}
      />

      <TimeBoxModal
        isOpen={isTimeBoxModalOpen}
        onClose={() => setIsTimeBoxModalOpen(false)}
        onSave={handleSaveTimeBox}
        timeBox={editingTimeBox}
      />

      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Time Box Templates"
        className="max-w-2xl"
      >
        <TimeBoxList
          onCreateTimeBox={handleCreateTimeBox}
          onEditTimeBox={handleEditTimeBox}
          onDeleteTimeBox={handleDeleteTimeBox}
        />
      </Modal>

      <Modal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        title="Analytics Dashboard"
        className="max-w-4xl"
      >
        <AnalyticsDashboard startDate={weekStart} endDate={weekEnd} />
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  )
}

export default App
