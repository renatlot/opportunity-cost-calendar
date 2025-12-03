import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { TimeLog } from '@/types'
import { calculateDuration } from '@/lib/utils'
import { useProjectStore } from './projectStore'

interface TimeLogStore {
  timeLogs: TimeLog[]
  addTimeLog: (log: Omit<TimeLog, 'id' | 'duration' | 'value' | 'isCompleted'>) => void
  updateTimeLog: (id: string, updates: Partial<TimeLog>) => void
  deleteTimeLog: (id: string) => void
  getLogsByDate: (date: string) => TimeLog[]
  getLogsByProject: (projectId: string) => TimeLog[]
  getTotalValue: (startDate?: string, endDate?: string) => number
  getProjectTotalHours: (projectId: string) => number
  getProjectTotalValue: (projectId: string) => number
  toggleCompletion: (id: string) => void
}

export const useTimeLogStore = create<TimeLogStore>()(
  persist(
    (set, get) => ({
      timeLogs: [],
      
      addTimeLog: (log) => {
        const project = useProjectStore.getState().getProjectById(log.projectId)
        if (!project) {
          throw new Error('Project not found')
        }
        
        const duration = calculateDuration(log.startTime, log.endTime)
        const value = duration * project.hourlyRate
        
        const newLog: TimeLog = {
          ...log,
          id: crypto.randomUUID(),
          duration,
          value,
          isCompleted: false, // New time logs start as planned, not completed
        }
        
        set((state) => ({
          timeLogs: [...state.timeLogs, newLog]
        }))
        
        // Update project totals (only count completed logs)
        const totalHours = get().getProjectTotalHours(log.projectId)
        const totalValue = get().getProjectTotalValue(log.projectId)
        useProjectStore.getState().updateProject(log.projectId, {
          totalHours,
          totalValue,
        })
      },
      
      updateTimeLog: (id, updates) => {
        const log = get().timeLogs.find(l => l.id === id)
        if (!log) return
        
        const project = useProjectStore.getState().getProjectById(log.projectId)
        if (!project) return
        
        // Recalculate if times changed
        const startTime = updates.startTime ?? log.startTime
        const endTime = updates.endTime ?? log.endTime
        const duration = calculateDuration(startTime, endTime)
        const value = duration * project.hourlyRate
        
        set((state) => ({
          timeLogs: state.timeLogs.map(l =>
            l.id === id ? { ...l, ...updates, duration, value } : l
          )
        }))
        
        // Update project totals
        const totalHours = get().getProjectTotalHours(log.projectId)
        const totalValue = get().getProjectTotalValue(log.projectId)
        useProjectStore.getState().updateProject(log.projectId, {
          totalHours,
          totalValue,
        })
      },
      
      deleteTimeLog: (id) => {
        const log = get().timeLogs.find(l => l.id === id)
        const projectId = log?.projectId
        
        set((state) => ({
          timeLogs: state.timeLogs.filter(l => l.id !== id)
        }))
        
        // Update project totals
        if (projectId) {
          const totalHours = get().getProjectTotalHours(projectId)
          const totalValue = get().getProjectTotalValue(projectId)
          useProjectStore.getState().updateProject(projectId, {
            totalHours,
            totalValue,
          })
        }
      },
      
      getLogsByDate: (date) => {
        return get().timeLogs.filter(log => log.date === date)
      },
      
      getLogsByProject: (projectId) => {
        return get().timeLogs.filter(log => log.projectId === projectId)
      },
      
      getTotalValue: (startDate, endDate) => {
        let logs = get().timeLogs
        
        if (startDate) {
          logs = logs.filter(log => log.date >= startDate)
        }
        
        if (endDate) {
          logs = logs.filter(log => log.date <= endDate)
        }
        
        return logs.reduce((sum, log) => sum + log.value, 0)
      },
      
      getProjectTotalHours: (projectId) => {
        const logs = get().getLogsByProject(projectId)
        // Only count completed logs
        return logs.filter(log => log.isCompleted).reduce((sum, log) => sum + log.duration, 0)
      },
      
      getProjectTotalValue: (projectId) => {
        const logs = get().getLogsByProject(projectId)
        // Only count completed logs
        return logs.filter(log => log.isCompleted).reduce((sum, log) => sum + log.value, 0)
      },
      
      toggleCompletion: (id) => {
        const log = get().timeLogs.find(l => l.id === id)
        if (!log) return
        
        set((state) => ({
          timeLogs: state.timeLogs.map(l =>
            l.id === id ? { ...l, isCompleted: !l.isCompleted } : l
          )
        }))
        
        // Update project totals
        const totalHours = get().getProjectTotalHours(log.projectId)
        const totalValue = get().getProjectTotalValue(log.projectId)
        useProjectStore.getState().updateProject(log.projectId, {
          totalHours,
          totalValue,
        })
      },
    }),
    { 
      name: 'timelog-store',
    }
  )
)
