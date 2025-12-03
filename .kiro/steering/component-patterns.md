---
inclusion: fileMatch
fileMatchPattern: "src/components/**/*.tsx"
---

# Component Development Patterns

## Component Template

When creating a new component, follow this structure:

```typescript
import React from 'react'
// Third-party imports
// Internal imports using path aliases
// Types
// Utilities

interface ComponentNameProps {
  // Props definition
}

export default function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // Hooks at the top
  // Event handlers
  // Computed values
  
  return (
    // JSX
  )
}
```

## Common Patterns

### UI Components (Atomic)
Located in `src/components/ui/`

Characteristics:
- Reusable across the application
- No business logic
- Accept all styling via props or className
- Fully controlled (stateless when possible)

Example: Button, Input, Card, Badge, Modal

### Domain Components (Feature-Specific)
Located in `src/components/domain/`

Characteristics:
- Connected to Zustand stores
- Contain business logic
- Specific to Opportunity Cost Calendar features
- May compose multiple UI components

Example: ProjectCard, CalendarView, PortfolioSidebar

## State Management in Components

### Using Zustand Stores

```typescript
import { useProjectStore } from '@/store'

export default function ProjectList() {
  // Select only what you need
  const projects = useProjectStore((state) => state.projects)
  const addProject = useProjectStore((state) => state.addProject)
  
  // Component logic
}
```

### Local State with useState

Use for:
- UI state (modals open/closed, form inputs)
- Temporary state that doesn't need persistence
- Component-specific state

```typescript
const [isModalOpen, setIsModalOpen] = useState(false)
const [searchQuery, setSearchQuery] = useState('')
```

## Event Handlers

### Naming Convention
- Prefix with `handle`: `handleClick`, `handleSubmit`, `handleDragStart`
- Be specific: `handleProjectDelete` vs `handleDelete`

### Inline vs Extracted
```typescript
// Good: Extract when logic is complex
const handleProjectSubmit = (data: ProjectFormData) => {
  const project = {
    ...data,
    id: crypto.randomUUID(),
    totalHours: 0,
    totalValue: 0,
  }
  addProject(project)
  setIsModalOpen(false)
}

// Good: Inline when simple
<button onClick={() => setIsOpen(false)}>Close</button>

// Bad: Unnecessary extraction
const handleClose = () => setIsOpen(false)
<button onClick={handleClose}>Close</button>
```

## Drag and Drop Pattern

For time logging functionality:

```typescript
// In ProjectCard (draggable)
const handleDragStart = (e: React.DragEvent) => {
  e.dataTransfer.setData('projectId', project.id)
  e.dataTransfer.effectAllowed = 'copy'
}

<div draggable onDragStart={handleDragStart}>
  {/* content */}
</div>

// In TimeSlot (drop target)
const handleDrop = (e: React.DragEvent) => {
  e.preventDefault()
  const projectId = e.dataTransfer.getData('projectId')
  // Create time log
}

const handleDragOver = (e: React.DragEvent) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}

<div onDrop={handleDrop} onDragOver={handleDragOver}>
  {/* content */}
</div>
```

## Conditional Rendering

```typescript
// Good: Early return for loading/error states
if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />

// Good: Ternary for simple conditions
{isActive ? <ActiveIcon /> : <InactiveIcon />}

// Good: Logical AND for conditional rendering
{hasProjects && <ProjectList projects={projects} />}

// Bad: Nested ternaries
{isActive ? (hasData ? <Data /> : <NoData />) : <Inactive />}
```

## Accessibility Checklist

When creating components:
- [ ] All interactive elements are keyboard accessible
- [ ] ARIA labels added where needed
- [ ] Focus states are visible
- [ ] Color is not the only indicator of state
- [ ] Text has sufficient contrast
- [ ] Form inputs have associated labels

## Performance Considerations

### When to Use React.memo()
- Component renders frequently with same props
- Component is expensive to render
- Parent re-renders often but props rarely change

```typescript
import React, { memo } from 'react'

interface ProjectCardProps {
  project: Project
  onEdit: (id: string) => void
}

const ProjectCard = memo(function ProjectCard({ project, onEdit }: ProjectCardProps) {
  // Component logic
})

export default ProjectCard
```

### When to Use useMemo()
- Expensive calculations
- Creating objects/arrays that are passed as props
- Filtering/sorting large lists

```typescript
const totalValue = useMemo(() => {
  return timeLogs.reduce((sum, log) => sum + log.value, 0)
}, [timeLogs])
```

## Error Handling

Always handle potential errors:

```typescript
const handleDeleteProject = async (id: string) => {
  try {
    // Check if project has time logs
    const logs = getLogsByProject(id)
    if (logs.length > 0) {
      const confirmed = window.confirm(
        `This project has ${logs.length} time logs. Delete anyway?`
      )
      if (!confirmed) return
    }
    
    deleteProject(id)
  } catch (error) {
    console.error('Failed to delete project:', error)
    // Show user-friendly error message
  }
}
```

## Component Documentation

Add JSDoc comments for complex components:

```typescript
/**
 * TimeSlot represents a single hour block in the calendar grid.
 * It can display a background TimeBox template and/or a foreground TimeLog.
 * Supports drag-and-drop for creating new time logs.
 * 
 * @param date - ISO date string for this slot
 * @param hour - Hour of day (0-23)
 * @param timeBox - Optional background template
 * @param timeLog - Optional logged time entry
 */
interface TimeSlotProps {
  date: string
  hour: number
  timeBox?: TimeBox
  timeLog?: TimeLog
}
```
