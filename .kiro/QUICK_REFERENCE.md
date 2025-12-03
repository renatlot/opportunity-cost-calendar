# Kiro Quick Reference

## Running Hooks

### From Kiro UI
1. Open Command Palette (Ctrl/Cmd + Shift + P)
2. Search for "Kiro: Run Hook"
3. Select hook to run

### Available Hooks
- **Pre-Commit Quality Check** - Run before committing code
- **Start Development Server** - Launch Vite dev server
- **Production Build Check** - Verify production build

## Steering Rules

### Always Active
- **project-standards.md** - Core coding standards

### Activated by File Type
| File Pattern | Steering File | Content |
|--------------|---------------|---------|
| `src/components/**/*.tsx` | component-patterns.md | Component structure, hooks, patterns |
| `src/store/**/*.ts` | value-calculation.md | Value calculation formulas |
| `src/components/ui/**/*.tsx` | ui-design-system.md | Design system, colors, typography |
| `src/components/domain/**/*.tsx` | date-handling.md | date-fns usage, calendar logic |

## Spec Workflow

### 1. Requirements Phase
File: `.kiro/specs/opportunity-calendar/requirements.md`
- Review acceptance criteria (AC-1 to AC-8)
- Understand user needs
- Check non-functional requirements

### 2. Design Phase
File: `.kiro/specs/opportunity-calendar/design.md`
- Study architecture decisions
- Review correctness properties (P-1 to P-8)
- Understand data flow

### 3. Implementation Phase
File: `.kiro/specs/opportunity-calendar/tasks.md`
- Follow tasks sequentially
- Check off completed items
- Reference property mappings

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Path Aliases

Use these in imports:

```typescript
import { Button } from '@/components/ui/Button'
import { useProjectStore } from '@/store'
import { Project } from '@/types'
import { cn, formatCurrency } from '@/lib/utils'
import { useCustomHook } from '@/hooks'
```

## Code Standards Checklist

Before committing:
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Component follows naming conventions
- [ ] Props interface defined
- [ ] Accessibility features included
- [ ] Responsive design considered
- [ ] Data persists after refresh (if applicable)
- [ ] Values calculate correctly (if applicable)

## Component Template

```typescript
import React from 'react'
// Third-party imports
// Internal imports using path aliases
// Types
// Utilities

interface ComponentNameProps {
  // Props definition
}

export default function ComponentName({ 
  prop1, 
  prop2 
}: ComponentNameProps) {
  // Hooks at the top
  // Event handlers
  // Computed values
  
  return (
    // JSX
  )
}
```

## Store Template

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { EntityType } from '@/types'

interface EntityStore {
  entities: EntityType[]
  addEntity: (entity: Omit<EntityType, 'id'>) => void
  updateEntity: (id: string, updates: Partial<EntityType>) => void
  deleteEntity: (id: string) => void
}

export const useEntityStore = create<EntityStore>()(
  persist(
    (set, get) => ({
      entities: [],
      addEntity: (entity) => {
        const newEntity = { ...entity, id: crypto.randomUUID() }
        set((state) => ({ entities: [...state.entities, newEntity] }))
      },
      updateEntity: (id, updates) => {
        set((state) => ({
          entities: state.entities.map(e => 
            e.id === id ? { ...e, ...updates } : e
          )
        }))
      },
      deleteEntity: (id) => {
        set((state) => ({
          entities: state.entities.filter(e => e.id !== id)
        }))
      },
    }),
    { name: 'entity-store' }
  )
)
```

## Tailwind Utilities

### Colors
```typescript
// High-value indicators
className="text-wealth-emerald bg-wealth-emerald"

// Value displays
className="text-wealth-gold bg-wealth-gold"

// Backgrounds
className="bg-wealth-light"

// Text
className="text-wealth-dark"
```

### Spacing
```typescript
// Standard card padding
className="p-4"

// Section padding
className="p-6"

// Page padding
className="p-8"
```

### Typography
```typescript
// Dollar amounts
className="text-2xl font-value text-wealth-gold"

// Headings
className="text-xl font-semibold text-wealth-dark"

// Body text
className="text-base font-normal"

// Labels
className="text-sm font-medium text-gray-600"
```

## Value Calculation

```typescript
import { calculateDuration } from '@/lib/utils'

// Calculate duration
const duration = calculateDuration('09:00', '12:00') // 3 hours

// Calculate value
const value = duration * project.hourlyRate

// Format for display
import { formatCurrency } from '@/lib/utils'
const display = formatCurrency(value) // "$1,500"
```

## Date Handling

```typescript
import { format, startOfWeek, addWeeks } from 'date-fns'

// Format for display
const display = format(new Date(), 'EEEE, MMMM d, yyyy')

// Format for storage
const isoDate = format(new Date(), 'yyyy-MM-dd')

// Week navigation
const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 })
const nextWeek = addWeeks(weekStart, 1)
```

## Troubleshooting

### TypeScript Errors
1. Run `npm run build` to see all errors
2. Check path aliases in tsconfig.json
3. Ensure all imports use correct paths

### Styling Issues
1. Verify Tailwind classes are correct
2. Check tailwind.config.js for custom colors
3. Use browser DevTools to inspect

### State Not Persisting
1. Check localStorage in DevTools
2. Verify persist middleware is configured
3. Ensure store name is unique

### Hooks Not Triggering
1. Check file pattern matches
2. Verify hook JSON is valid
3. Restart Kiro if needed

## Resources

- [Full Documentation](./.kiro/README.md)
- [Project Overview](../README.md)
- [Setup Guide](../SETUP.md)
- [Kiro Showcase](../KIRO_SHOWCASE.md)
- [Directory Tree](../DIRECTORY_TREE.md)
