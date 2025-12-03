---
inclusion: always
---

# Project Standards: Opportunity Cost Calendar

## Code Style Guidelines

### TypeScript
- Always use explicit types, avoid `any`
- Use interfaces for object shapes
- Use type aliases for unions and primitives
- Prefer `const` over `let`, never use `var`
- Use optional chaining (`?.`) and nullish coalescing (`??`)

### React Components
- Use functional components with hooks
- One component per file
- Export component as default
- Props interface named `{ComponentName}Props`
- Use destructuring for props

Example:
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ variant, onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}
```

### File Naming
- Components: PascalCase (e.g., `ProjectCard.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Stores: camelCase with "Store" suffix (e.g., `projectStore.ts`)
- Types: PascalCase for interfaces (e.g., `Project`, `TimeLog`)

### Import Order
1. React imports
2. Third-party libraries
3. Internal components (using path aliases)
4. Types
5. Utilities
6. Styles

Example:
```typescript
import React, { useState } from 'react'
import { format } from 'date-fns'
import { DollarSign } from 'lucide-react'

import Button from '@/components/ui/Button'
import { Project } from '@/types'
import { cn, formatCurrency } from '@/lib/utils'
```

## State Management with Zustand

### Store Structure
- One store per domain entity (projects, timeLogs, timeBoxes)
- Use `persist` middleware for localStorage
- Keep stores flat, avoid deep nesting
- Use selectors for computed values

Example:
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Project } from '@/types'

interface ProjectStore {
  projects: Project[]
  addProject: (project: Omit<Project, 'id'>) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projects: [],
      addProject: (project) => set((state) => ({
        projects: [...state.projects, { ...project, id: crypto.randomUUID() }]
      })),
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter(p => p.id !== id)
      })),
    }),
    { name: 'project-store' }
  )
)
```

## Styling with Tailwind

### Principles
- Mobile-first responsive design
- Use utility classes, avoid custom CSS
- Use `cn()` utility for conditional classes
- Maintain consistent spacing scale (4, 8, 16, 24, 32px)

### Color Usage
- High-value projects: `text-wealth-emerald`, `bg-wealth-emerald`
- Value displays: `text-wealth-gold`, `bg-wealth-gold`
- Backgrounds: `bg-wealth-light`
- Text: `text-wealth-dark`

### Component Patterns
```typescript
// Good: Using cn() for conditional classes
<div className={cn(
  "p-4 rounded-lg",
  isActive && "bg-wealth-emerald",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>

// Bad: Inline styles
<div style={{ padding: '16px', borderRadius: '8px' }}>
```

## Value Calculation Standards

### Always Calculate Value
When creating or updating a time log:
1. Calculate duration: `(endTime - startTime) / 60` (in hours)
2. Get project hourly rate
3. Calculate value: `duration × hourlyRate`
4. Store all three values (duration, rate, value)

### Currency Formatting
Always use `formatCurrency()` utility:
```typescript
import { formatCurrency } from '@/lib/utils'

// Good
<span>{formatCurrency(1500)}</span> // "$1,500"

// Bad
<span>${value}</span> // "$1500"
```

## Testing Checklist

Before committing code, verify:
- [ ] No TypeScript errors (`npm run build`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Component renders without errors
- [ ] Data persists after page refresh
- [ ] Responsive on mobile (320px), tablet (768px), desktop (1024px+)
- [ ] Keyboard navigation works
- [ ] Values calculate correctly

## Performance Guidelines

### Optimization Techniques
- Use `React.memo()` for pure components that render frequently
- Memoize expensive calculations with `useMemo()`
- Debounce user input for search/filter
- Lazy load modals and heavy components

### What NOT to Optimize Prematurely
- Don't memoize everything
- Don't optimize until you measure
- Calendar with <100 time logs doesn't need virtualization

## Accessibility Requirements

### Minimum Standards
- All interactive elements must be keyboard accessible
- Use semantic HTML (`<button>`, `<nav>`, `<main>`)
- Add ARIA labels where semantic HTML isn't enough
- Maintain 4.5:1 contrast ratio for text
- Focus indicators must be visible

Example:
```typescript
<button
  onClick={handleDelete}
  aria-label={`Delete ${project.name} project`}
  className="focus:ring-2 focus:ring-wealth-emerald"
>
  <Trash2 className="w-4 h-4" />
</button>
```

## Git Commit Messages

Format: `<type>: <description>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code restructuring
- `style`: Formatting, styling
- `docs`: Documentation
- `test`: Adding tests
- `chore`: Maintenance

Examples:
- `feat: add project CRUD operations`
- `fix: correct value calculation for time logs`
- `refactor: extract time slot logic to custom hook`
