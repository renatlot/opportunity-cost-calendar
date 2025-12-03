import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { TimeBox } from '@/types'

interface TimeBoxStore {
  timeBoxes: TimeBox[]
  addTimeBox: (timeBox: Omit<TimeBox, 'id'>) => void
  updateTimeBox: (id: string, updates: Partial<TimeBox>) => void
  deleteTimeBox: (id: string) => void
  getTimeBoxById: (id: string) => TimeBox | undefined
}

export const useTimeBoxStore = create<TimeBoxStore>()(
  persist(
    (set, get) => ({
      timeBoxes: [],
      
      addTimeBox: (timeBox) => {
        const newTimeBox: TimeBox = {
          ...timeBox,
          id: crypto.randomUUID(),
          recurrence: timeBox.recurrence || 'everyday',
          customDays: timeBox.customDays || undefined,
        }
        
        set((state) => ({
          timeBoxes: [...state.timeBoxes, newTimeBox]
        }))
      },
      
      updateTimeBox: (id, updates) => {
        set((state) => ({
          timeBoxes: state.timeBoxes.map(tb => 
            tb.id === id ? { ...tb, ...updates } : tb
          )
        }))
      },
      
      deleteTimeBox: (id) => {
        set((state) => ({
          timeBoxes: state.timeBoxes.filter(tb => tb.id !== id)
        }))
      },
      
      getTimeBoxById: (id) => {
        return get().timeBoxes.find(tb => tb.id === id)
      },
    }),
    { 
      name: 'timebox-store',
    }
  )
)
