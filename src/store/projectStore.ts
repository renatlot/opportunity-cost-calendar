import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Project } from '@/types'

interface ProjectStore {
  projects: Project[]
  addProject: (project: Omit<Project, 'id' | 'totalHours' | 'totalValue'>) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  getProjectById: (id: string) => Project | undefined
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [],
      
      addProject: (project) => {
        const newProject: Project = {
          ...project,
          id: crypto.randomUUID(),
          totalHours: 0,
          totalValue: 0,
        }
        
        set((state) => ({
          projects: [...state.projects, newProject]
        }))
      },
      
      updateProject: (id, updates) => {
        set((state) => ({
          projects: state.projects.map(p => 
            p.id === id ? { ...p, ...updates } : p
          )
        }))
      },
      
      deleteProject: (id) => {
        set((state) => ({
          projects: state.projects.filter(p => p.id !== id)
        }))
      },
      
      getProjectById: (id) => {
        return get().projects.find(p => p.id === id)
      },
    }),
    { 
      name: 'project-store',
    }
  )
)
