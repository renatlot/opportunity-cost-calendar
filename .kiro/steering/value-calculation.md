---
inclusion: fileMatch
fileMatchPattern: "src/store/**/*.ts"
---

# Value Calculation Guidelines

## Core Principle
Every time log must accurately calculate and store its financial value based on duration and project hourly rate.

## Calculation Formula

```typescript
// Step 1: Calculate duration in hours
const duration = calculateDuration(startTime, endTime)

// Step 2: Get project hourly rate
const project = getProjectById(projectId)
const hourlyRate = project.hourlyRate

// Step 3: Calculate value
const value = duration * hourlyRate
```

## Time Duration Calculation

The `calculateDuration` utility converts time strings to hours:

```typescript
/**
 * Calculate duration in hours between two time strings
 * @param startTime - Format: "HH:mm" (e.g., "09:00")
 * @param endTime - Format: "HH:mm" (e.g., "12:30")
 * @returns Duration in hours (e.g., 3.5)
 */
export function calculateDuration(startTime: string, endTime: string): number {
  const [startHour, startMin] = startTime.split(':').map(Number)
  const [endHour, endMin] = endTime.split(':').map(Number)
  
  const startMinutes = startHour * 60 + startMin
  const endMinutes = endHour * 60 + endMin
  
  return (endMinutes - startMinutes) / 60
}
```

### Edge Cases to Handle
- **Overnight spans**: If endTime < startTime, add 24 hours
- **Same time**: If start === end, duration = 0
- **Invalid times**: Validate format and range (0-23 hours, 0-59 minutes)

## TimeLog Creation

When creating a time log, always calculate and store all three values:

```typescript
addTimeLog: (log: Omit<TimeLog, 'id' | 'duration' | 'value'>) => {
  const project = get().projects.find(p => p.id === log.projectId)
  if (!project) throw new Error('Project not found')
  
  const duration = calculateDuration(log.startTime, log.endTime)
  const value = duration * project.hourlyRate
  
  const newLog: TimeLog = {
    ...log,
    id: crypto.randomUUID(),
    duration,
    value,
  }
  
  set((state) => ({
    timeLogs: [...state.timeLogs, newLog]
  }))
}
```

## Project Total Value

Project total value is the sum of all time log values for that project:

```typescript
const getProjectTotalValue = (projectId: string): number => {
  const logs = timeLogs.filter(log => log.projectId === projectId)
  return logs.reduce((sum, log) => sum + log.value, 0)
}

const getProjectTotalHours = (projectId: string): number => {
  const logs = timeLogs.filter(log => log.projectId === projectId)
  return logs.reduce((sum, log) => sum + log.duration, 0)
}
```

## Portfolio Total Value

Calculate total value across all projects for a date range:

```typescript
getTotalValue: (startDate?: string, endDate?: string): number => {
  let logs = get().timeLogs
  
  if (startDate) {
    logs = logs.filter(log => log.date >= startDate)
  }
  
  if (endDate) {
    logs = logs.filter(log => log.date <= endDate)
  }
  
  return logs.reduce((sum, log) => sum + log.value, 0)
}
```

## Recalculation Scenarios

### When Project Rate Changes
If a project's hourly rate is updated, you have two options:

**Option 1: Historical Accuracy (Recommended)**
- Keep existing time log values unchanged
- They represent the rate at the time of logging
- New logs use the new rate

**Option 2: Retroactive Update**
- Recalculate all time logs for that project
- Update stored values
- Useful if rate was entered incorrectly

```typescript
updateProject: (id: string, updates: Partial<Project>) => {
  set((state) => ({
    projects: state.projects.map(p => 
      p.id === id ? { ...p, ...updates } : p
    )
  }))
  
  // If rate changed and retroactive update desired:
  if (updates.hourlyRate !== undefined) {
    set((state) => ({
      timeLogs: state.timeLogs.map(log => 
        log.projectId === id 
          ? { ...log, value: log.duration * updates.hourlyRate! }
          : log
      )
    }))
  }
}
```

### When Time Changes
If a time log's start or end time is updated:

```typescript
updateTimeLog: (id: string, updates: Partial<TimeLog>) => {
  set((state) => {
    const log = state.timeLogs.find(l => l.id === id)
    if (!log) return state
    
    const project = state.projects.find(p => p.id === log.projectId)
    if (!project) return state
    
    // Recalculate if times changed
    const startTime = updates.startTime ?? log.startTime
    const endTime = updates.endTime ?? log.endTime
    const duration = calculateDuration(startTime, endTime)
    const value = duration * project.hourlyRate
    
    return {
      timeLogs: state.timeLogs.map(l =>
        l.id === id ? { ...l, ...updates, duration, value } : l
      )
    }
  })
}
```

## Validation Rules

Before creating or updating a time log:

1. **Project exists**: Verify projectId is valid
2. **Time format**: Validate "HH:mm" format
3. **Time range**: Ensure 00:00 to 23:59
4. **Duration positive**: endTime must be after startTime
5. **Rate positive**: hourlyRate must be > 0

```typescript
const validateTimeLog = (log: Partial<TimeLog>, project: Project): string[] => {
  const errors: string[] = []
  
  if (!project) {
    errors.push('Project not found')
  }
  
  if (project.hourlyRate <= 0) {
    errors.push('Project hourly rate must be greater than 0')
  }
  
  if (log.startTime && log.endTime) {
    const duration = calculateDuration(log.startTime, log.endTime)
    if (duration <= 0) {
      errors.push('End time must be after start time')
    }
  }
  
  return errors
}
```

## Display Formatting

Always use the `formatCurrency` utility for displaying values:

```typescript
import { formatCurrency } from '@/lib/utils'

// In components
<span className="text-2xl font-value text-wealth-gold">
  {formatCurrency(timeLog.value)}
</span>

// Output: "$1,500" (no decimals for whole numbers)
// Output: "$1,250" (no decimals even for .00)
```

## Testing Value Calculations

Key test cases:
- 1 hour at $100/hr = $100
- 30 minutes at $100/hr = $50
- 2.5 hours at $200/hr = $500
- 0 hours at any rate = $0
- Verify persistence after page refresh
- Verify totals aggregate correctly
